import { UUID } from "@/uuid"
import { getDatabase } from "./connection"
import { Insertable, Selectable, Updateable } from "kysely"
import { DB } from "./schema"
import { jsonObjectFrom } from "kysely/helpers/sqlite"

export type UserPermission = Selectable<DB["userPermission"]>
export type NewUserPermission = Insertable<DB["userPermission"]>
export type UserPermissionUpdate = Updateable<DB["userPermission"]>

export type UserPermissionSet = Omit<
  UserPermission,
  "uuid" | "id" | "createdAt" | "updatedAt"
>

export type Permission = keyof UserPermissionSet

export type User = Selectable<DB["user"]>
export type NewUser = Insertable<DB["user"]>

export async function getUserByUsernameOrEmail(usernameOrEmail: string) {
  const db = getDatabase()

  const row = await db
    .selectFrom("user")
    .selectAll("user")
    .select((eb) => [
      jsonObjectFrom(
        eb
          .selectFrom("userPermission")
          .select([
            "bookCreate",
            "bookDelete",
            "bookRead",
            "bookProcess",
            "bookDownload",
            "bookUpdate",
            "bookList",
            "collectionCreate",
            "inviteList",
            "inviteDelete",
            "userCreate",
            "userList",
            "userRead",
            "userDelete",
            "userUpdate",
            "settingsUpdate",
          ])
          .whereRef("user.userPermissionUuid", "=", "userPermission.uuid"),
      ).as("permissions"),
    ])
    .where((eb) =>
      eb.or([
        eb("username", "=", usernameOrEmail.toLowerCase()),
        eb("email", "=", usernameOrEmail.toLowerCase()),
      ]),
    )
    .executeTakeFirst()

  return row ?? null
}

export async function getUserByAccount(
  providerAccountId: string,
  provider: string,
) {
  const db = getDatabase()

  const row = await db
    .selectFrom("user")
    .innerJoin("account", "user.id", "account.userId")
    .selectAll("user")
    .select((eb) => [
      jsonObjectFrom(
        eb
          .selectFrom("userPermission")
          .select([
            "bookCreate",
            "bookDelete",
            "bookRead",
            "bookProcess",
            "bookDownload",
            "bookUpdate",
            "bookList",
            "collectionCreate",
            "inviteList",
            "inviteDelete",
            "userCreate",
            "userList",
            "userRead",
            "userDelete",
            "userUpdate",
            "settingsUpdate",
          ])
          .whereRef("user.userPermissionUuid", "=", "userPermission.uuid"),
      ).as("permissions"),
    ])
    .where("account.providerAccountId", "=", providerAccountId)
    .where("account.provider", "=", provider)
    .executeTakeFirst()

  return row ?? null
}

export async function getUser(id: UUID) {
  const db = getDatabase()

  const row = await db
    .selectFrom("user")
    .selectAll("user")
    .select((eb) => [
      jsonObjectFrom(
        eb
          .selectFrom("userPermission")
          .select([
            "bookCreate",
            "bookDelete",
            "bookRead",
            "bookProcess",
            "bookDownload",
            "bookUpdate",
            "bookList",
            "collectionCreate",
            "inviteList",
            "inviteDelete",
            "userCreate",
            "userList",
            "userRead",
            "userDelete",
            "userUpdate",
            "settingsUpdate",
          ])
          .whereRef("user.userPermissionUuid", "=", "userPermission.uuid"),
      ).as("permissions"),
    ])
    .where("id", "=", id)
    .executeTakeFirst()

  return row ?? null
}

export async function getUserCount() {
  const db = getDatabase()

  const { count } = await db
    .selectFrom("user")
    .select([(eb) => eb.fn.count("id").as("count")])
    .executeTakeFirstOrThrow()

  return count as number
}

export async function getUsers() {
  const db = getDatabase()

  const rows = await db
    .selectFrom("user")
    .selectAll("user")
    .select((eb) => [
      jsonObjectFrom(
        eb
          .selectFrom("userPermission")
          .select([
            "bookCreate",
            "bookDelete",
            "bookRead",
            "bookProcess",
            "bookDownload",
            "bookUpdate",
            "bookList",
            "collectionCreate",
            "inviteList",
            "inviteDelete",
            "userCreate",
            "userList",
            "userRead",
            "userDelete",
            "userUpdate",
            "settingsUpdate",
          ])
          .whereRef("user.userPermissionUuid", "=", "userPermission.uuid"),
      ).as("permissions"),
    ])
    .execute()

  return rows
}

export async function createAdminUser(
  username: string,
  name: string,
  email: string,
  hashedPassword: string,
) {
  const db = getDatabase()

  const { uuid } = await db
    .insertInto("userPermission")
    .columns([
      "bookCreate",
      "bookDelete",
      "bookRead",
      "bookProcess",
      "bookDownload",
      "bookUpdate",
      "bookList",
      "collectionCreate",
      "inviteList",
      "inviteDelete",
      "userCreate",
      "userList",
      "userRead",
      "userDelete",
      "userUpdate",
      "settingsUpdate",
    ])
    .expression((eb) =>
      db
        .selectNoFrom([
          eb.lit(1).as("bookCreate"),
          eb.lit(1).as("bookDelete"),
          eb.lit(1).as("bookRead"),
          eb.lit(1).as("bookProcess"),
          eb.lit(1).as("bookDownload"),
          eb.lit(1).as("bookUpdate"),
          eb.lit(1).as("bookList"),
          eb.lit(1).as("collectionCreate"),
          eb.lit(1).as("inviteList"),
          eb.lit(1).as("inviteDelete"),
          eb.lit(1).as("userCreate"),
          eb.lit(1).as("userList"),
          eb.lit(1).as("userRead"),
          eb.lit(1).as("userDelete"),
          eb.lit(1).as("userUpdate"),
          eb.lit(1).as("settingsUpdate"),
        ])
        .where((web) =>
          web.not(
            web.exists(web.selectFrom("userPermission").select(["uuid"])),
          ),
        ),
    )
    .returning(["uuid"])
    .executeTakeFirstOrThrow()

  await db
    .insertInto("user")
    .values({
      username: username.toLowerCase(),
      name,
      email,
      hashedPassword,
      userPermissionUuid: uuid,
    })
    .execute()
}

export async function deleteUser(userUuid: UUID) {
  const db = getDatabase()

  const { userPermissionUuid } = await db
    .selectFrom("user")
    .select(["userPermissionUuid"])
    .where("id", "=", userUuid)
    .executeTakeFirstOrThrow()

  await db.deleteFrom("user").where("id", "=", userUuid).execute()

  await db
    .deleteFrom("userPermission")
    .where("uuid", "=", userPermissionUuid)
    .execute()
}

export async function createUser(
  email: string,
  inviteKey: string,
  permissions: UserPermissionSet,
) {
  const db = getDatabase()

  const { uuid } = await db
    .insertInto("userPermission")
    .values({
      bookCreate: permissions.bookCreate,
      bookUpdate: permissions.bookUpdate,
      bookList: permissions.bookList,
      bookDelete: permissions.bookDelete,
      bookDownload: permissions.bookDownload,
      bookProcess: permissions.bookProcess,
      inviteDelete: permissions.inviteDelete,
      inviteList: permissions.inviteList,
      settingsUpdate: permissions.settingsUpdate,
      userCreate: permissions.userCreate,
      userList: permissions.userList,
      userRead: permissions.userRead,
      userDelete: permissions.userDelete,
      userUpdate: permissions.userUpdate,
    })
    .returning(["uuid as uuid"])
    .executeTakeFirstOrThrow()

  await db
    .insertInto("user")
    .values({
      email,
      inviteKey,
      userPermissionUuid: uuid,
    })
    .execute()
}

export async function acceptInvite(
  username: string,
  name: string,
  email: string,
  hashedPassword: string,
  inviteKey: string,
) {
  const db = getDatabase()

  const { id } = await db
    .updateTable("user")
    .set({ username, name, hashedPassword, inviteAccepted: new Date() })
    .where("email", "=", email)
    .where("inviteKey", "=", inviteKey)
    .where("inviteAccepted", "is", null)
    .returning("id as id")
    .executeTakeFirstOrThrow()

  await db
    .insertInto("account")
    .values({
      userId: id,
      type: "credentials",
      provider: "credentials",
      providerAccountId: id,
    })
    .execute()
}

export async function getInvites(): Promise<
  { email: string; inviteKey: string }[]
> {
  const db = getDatabase()

  const results = await db
    .selectFrom("user")
    .select(["user.email", "user.inviteKey"])
    .where("user.inviteKey", "is not", null)
    .where("user.inviteAccepted", "is", null)
    .execute()

  return results as { email: string; inviteKey: string }[]
}

export async function getInvite(key: string) {
  const db = getDatabase()

  const row = await db
    .selectFrom("user")
    .select(["user.email", "user.inviteKey"])
    .where("user.inviteKey", "=", key)
    .where("user.inviteAccepted", "is", null)
    .executeTakeFirstOrThrow()

  return row as { email: string; inviteKey: string }
}

export async function verifyInvite(email: string, inviteKey: string) {
  const db = getDatabase()

  const row = await db
    .selectFrom("user")
    .select(["user.id"])
    .where("user.inviteKey", "=", inviteKey)
    .where("user.inviteAccepted", "is", null)
    .where("user.email", "=", email)
    .executeTakeFirst()

  return !!row
}

export async function deleteInvite(key: string) {
  const db = getDatabase()
  await db.deleteFrom("user").where("inviteKey", "=", key).execute()
}

export async function userHasPermission(
  username: string,
  permission: Permission,
) {
  const db = getDatabase()

  const result = await db
    .selectFrom("userPermission")
    .select([permission])
    .innerJoin("user", "user.userPermissionUuid", "userPermission.uuid")
    .where("user.username", "=", username)
    .executeTakeFirst()

  if (!result) return false

  const { [permission]: hasPermission } = result

  return hasPermission
}

export async function updateUserPermissions(
  userUuid: UUID,
  permissions: UserPermissionUpdate,
) {
  const db = getDatabase()

  const { userPermissionUuid } = await db
    .selectFrom("userPermission")
    .select(["userPermission.uuid as userPermissionUuid"])
    .innerJoin("user", "user.userPermissionUuid", "userPermission.uuid")
    .where("user.id", "=", userUuid)
    .executeTakeFirstOrThrow()

  await db
    .updateTable("userPermission")
    .set({
      bookCreate: permissions.bookCreate,
      bookUpdate: permissions.bookUpdate,
      bookList: permissions.bookList,
      bookDelete: permissions.bookDelete,
      bookDownload: permissions.bookDownload,
      bookProcess: permissions.bookProcess,
      collectionCreate: permissions.collectionCreate,
      inviteDelete: permissions.inviteDelete,
      inviteList: permissions.inviteList,
      settingsUpdate: permissions.settingsUpdate,
      userCreate: permissions.userCreate,
      userList: permissions.userList,
      userRead: permissions.userRead,
      userDelete: permissions.userDelete,
      userUpdate: permissions.userUpdate,
    })
    .where("uuid", "=", userPermissionUuid)
    .execute()
}

export async function getCurrentUserSession(usernameOrEmail: string) {
  const db = getDatabase()

  return await db
    .selectFrom("session")
    .selectAll("session")
    .innerJoin("user", "user.id", "session.userId")
    .where((eb) =>
      eb.or([
        eb("user.username", "=", usernameOrEmail),
        eb("user.email", "=", usernameOrEmail),
      ]),
    )
    .orderBy("session.createdAt", "desc")
    .limit(1)
    .executeTakeFirstOrThrow()
}
