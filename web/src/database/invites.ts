import { getDatabase } from "./connection"
import { NewUserPermission } from "./users"
import { asSqliteBoolean } from "./plugins/booleanPlugin"

export type Invite = {
  email: string
  key: string
}

export async function createInvite(
  email: string,
  key: string,
  permissions: NewUserPermission,
) {
  const db = getDatabase()

  const { uuid } = await db
    .insertInto("userPermission")
    .values({
      bookCreate: asSqliteBoolean(permissions.bookCreate),
      bookUpdate: asSqliteBoolean(permissions.bookUpdate),
      bookList: asSqliteBoolean(permissions.bookList),
      bookDelete: asSqliteBoolean(permissions.bookDelete),
      bookDownload: asSqliteBoolean(permissions.bookDownload),
      bookProcess: asSqliteBoolean(permissions.bookProcess),
      inviteDelete: asSqliteBoolean(permissions.inviteDelete),
      inviteList: asSqliteBoolean(permissions.inviteList),
      settingsUpdate: asSqliteBoolean(permissions.settingsUpdate),
      userCreate: asSqliteBoolean(permissions.userCreate),
      userList: asSqliteBoolean(permissions.userList),
      userRead: asSqliteBoolean(permissions.userRead),
      userDelete: asSqliteBoolean(permissions.userDelete),
      userUpdate: asSqliteBoolean(permissions.userUpdate),
    })
    .returning(["uuid"])
    .executeTakeFirstOrThrow()

  await db
    .insertInto("invite")
    .values({ email, key, userPermissionUuid: uuid })
    .execute()
}

export async function getInvite(key: string): Promise<Invite> {
  const db = getDatabase()

  const { email } = await db
    .selectFrom("invite")
    .select(["email"])
    .where("key", "=", key)
    .executeTakeFirstOrThrow()

  return { email, key }
}

export async function getInvites(): Promise<Invite[]> {
  const db = getDatabase()

  return await db
    .selectFrom("invite")
    .select(["invite.email", "key"])
    .innerJoin(
      "userPermission",
      "userPermission.uuid",
      "invite.userPermissionUuid",
    )
    .leftJoin("user", "user.userPermissionUuid", "userPermission.uuid")
    .execute()
}

export async function verifyInvite(email: string, key: string) {
  const db = getDatabase()

  const rows = await db
    .selectFrom("invite")
    .select(["uuid"])
    .where("email", "=", email)
    .where("key", "=", key)
    .execute()

  return !!rows.length
}

export async function deleteInvite(key: string) {
  const db = getDatabase()

  const acceptedUser = await db
    .selectFrom("user")
    .innerJoin(
      "userPermission",
      "user.userPermissionUuid",
      "userPermission.uuid",
    )
    .innerJoin("invite", "invite.userPermissionUuid", "userPermission.uuid")
    .executeTakeFirst()

  if (acceptedUser) {
    throw new Error("User has already accepted this invite")
  }

  const { userPermissionUuid } = await db
    .selectFrom("invite")
    .select(["userPermissionUuid"])
    .where("invite.key", "=", key)
    .executeTakeFirstOrThrow()

  await db.deleteFrom("invite").where("key", "=", key).execute()

  await db
    .deleteFrom("userPermission")
    .where("uuid", "=", userPermissionUuid)
    .execute()
}
