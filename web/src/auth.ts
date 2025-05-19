import { hash, verify as verifyPassword } from "argon2"

import {
  Permission,
  UserPermissionSet,
  getUserByUsernameOrEmail,
} from "./database/users"
import { add } from "date-fns/fp/add"
import { sign } from "jsonwebtoken"
import { NextRequest, NextResponse } from "next/server"
import { readFileSync } from "node:fs"
import NextAuth, {
  type NextAuthResult,
  type DefaultSession,
  NextAuthConfig,
} from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { KyselyAdapter } from "./database/authAdapter"
import { getDatabase } from "./database/connection"
import { NextAuthRequest } from "next-auth"
import { Session } from "next-auth"
import { UUID } from "./uuid"
import { randomUUID } from "node:crypto"

declare module "next-auth" {
  interface Session {
    user: Awaited<ReturnType<typeof getUserByUsernameOrEmail>> &
      DefaultSession["user"]
  }

  interface User {
    username: string | null
    permissions: UserPermissionSet | null
    userPermissionUuid: UUID
  }
}

function fromDate(time: number, date = Date.now()) {
  return new Date(date + time * 1000)
}

const adapter = KyselyAdapter(getDatabase())

// 30 days
const maxAge = 30 * 24 * 60 * 60

export const config: NextAuthConfig = {
  providers: [
    Credentials({
      credentials: {
        usernameOrEmail: {
          type: "text",
          label: "Username or email",
        },
        password: {
          type: "password",
          label: "Password",
          placeholder: "********",
        },
      },
      async authorize(credentials) {
        return authenticateUser(
          credentials.usernameOrEmail as string,
          credentials.password as string,
        )
      },
    }),
  ],
  cookies: {
    sessionToken: { name: "st_token" },
  },
  session: {
    maxAge,
  },
  adapter,
  jwt: {
    encode() {
      return ""
    },
    decode() {
      return null
    },
  },
  callbacks: {
    session({ session, user }) {
      return {
        ...session,
        user,
      }
    },
    async signIn({ user, credentials }) {
      if (credentials) {
        const sessionToken = randomUUID()
        const sessionExpiry = fromDate(maxAge)
        await adapter.createSession?.({
          sessionToken,
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          userId: user.id!,
          expires: sessionExpiry,
        })
      }
      return true
    },
  },
  basePath: "/api/v2/auth",
}

const authResult = NextAuth(config)

export const { handlers, signIn, signOut } = authResult
export const auth: NextAuthResult["auth"] = authResult.auth

/**
 * AppRouteHandlerFnContext is the context that is passed to the handler as the
 * second argument.
 */
export type AppRouteHandlerFnContext = {
  params: Promise<unknown>
}
/**
 * Handler function for app routes. If a non-Response value is returned, an error
 * will be thrown.
 */
export type AppRouteHandlerFn = (
  /**
   * Incoming request object.
   */
  req: NextRequest,
  /**
   * Context properties on the request (including the parameters if this was a
   * dynamic route).
   */
  ctx: AppRouteHandlerFnContext,
  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
) => void | Response | Promise<void | Response>

const JWT_SECRET_KEY_FILE = process.env["STORYTELLER_SECRET_KEY_FILE"]
const DEFAULT_SECRET_KEY_FILE = "/run/secrets/secret_key"

/**
 * There was a period of time where Storyteller's example
 * compose.yaml file incorrectly set the STORYTELLER_SECRET_KEY
 * environment variable to the string `/run/secrets/secret_key`,
 * rather than the contents of that file.
 *
 * To mitigate this security risk even for users that don't
 * update their configuration, if that's the value of the env
 * variable, we read the value from the file instead.
 */
function readSecretKey() {
  if (JWT_SECRET_KEY_FILE) {
    return readFileSync(JWT_SECRET_KEY_FILE, { encoding: "utf-8" })
  }
  if (process.env["STORYTELLER_SECRET_KEY"] === DEFAULT_SECRET_KEY_FILE) {
    return readFileSync(DEFAULT_SECRET_KEY_FILE, { encoding: "utf-8" })
  }
  return process.env["STORYTELLER_SECRET_KEY"] ?? "<notsosecret>"
}

const JWT_SECRET_KEY = readSecretKey()
const JWT_ALGORITHM = "HS256"
export const ACCESS_TOKEN_EXPIRE_DAYS = 10

const addAccessTokenExpireDays = add({ days: ACCESS_TOKEN_EXPIRE_DAYS })

export function getAccessTokenExpireDate() {
  return addAccessTokenExpireDays(Date.now())
}

export async function hashPassword(password: string) {
  return await hash(password)
}

export async function authenticateUser(
  usernameOrEmail: string,
  password: string,
) {
  const user = await getUserByUsernameOrEmail(usernameOrEmail)

  if (!user?.hashedPassword) return null

  if (!(await verifyPassword(user.hashedPassword, password))) {
    return null
  }

  return user
}

export function createAccessToken(data: Record<string, string>, expires: Date) {
  const payload = {
    ...data,
    exp: expires.valueOf(),
  }

  return sign(payload, JWT_SECRET_KEY, { algorithm: JWT_ALGORITHM })
}

function extractTokenFromHeader(request: NextRequest) {
  const bearer = request.headers.get("Authorization")
  if (!bearer) return null

  const match = bearer.match(/Bearer (.*)/)
  if (!match) return null

  const authToken = match[1]
  if (!authToken) return null

  return authToken
}

// function extractTokenFromCookie(cookie: RequestCookie | undefined) {
//   if (!cookie) return null

//   return cookie.value
// }

export function extractToken(request: NextAuthRequest) {
  return request.auth?.user
}

type VerifiedAuthRequest = NextRequest & { auth: Session }

export function withUser<
  Params extends Promise<Record<string, unknown>> = Promise<
    Record<string, unknown>
  >,
>(
  handler: (
    request: VerifiedAuthRequest,
    context: { params: Promise<Params> },
  ) => Promise<Response> | Response,
): AppRouteHandlerFn {
  return function (request, context) {
    const token = extractTokenFromHeader(request)
    if (token) {
      request.cookies.set("st_token", token)
    }
    return auth(async (request, context) => {
      const user = request.auth?.user
      if (!user) {
        return NextResponse.json(
          { message: "Not authenticated" },
          { status: 401, headers: { "WWW-Authenticate": "Bearer" } },
        )
      }

      return handler(request as VerifiedAuthRequest, context)
    })(request, context)
  }
}

export function withHasPermission<
  Params extends Promise<Record<string, unknown>> = Promise<
    Record<string, unknown>
  >,
>(permission: Permission) {
  return function (
    handler: (
      request: VerifiedAuthRequest,
      context: { params: Promise<Params> },
    ) => Promise<Response> | Response,
  ): AppRouteHandlerFn {
    return function (request, context) {
      const token = extractTokenFromHeader(request)
      if (token) {
        request.cookies.set("st_token", token)
      }
      return auth(async (request, context) => {
        if (!request.auth) {
          return NextResponse.json(
            { message: "Not authenticated" },
            { status: 401, headers: { "WWW-Authenticate": "Bearer" } },
          )
        }
        const hasPermission = request.auth.user.permissions?.[permission]

        if (!hasPermission) {
          return NextResponse.json({ message: "Forbidden" }, { status: 403 })
        }

        return handler(request as VerifiedAuthRequest, context)
      })(request, context)
    }
  }
}

export function hasPermission(
  permission: Permission,
  user: Session["user"] | undefined,
) {
  return !!user?.permissions?.[permission]
}
