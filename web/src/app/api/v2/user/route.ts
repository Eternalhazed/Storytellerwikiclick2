import { withUser } from "@/auth"
import { UserPermissionSet } from "@/database/users"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

/**
 * @summary Get the current user details
 * @desc '
 */
export const GET = withUser((request) => {
  const user = request.auth.user

  return NextResponse.json({
    id: user.id,
    name: user.name,
    username: user.username,
    email: user.email,
    permissions: {
      bookCreate: user.permissions?.bookCreate ?? false,
      bookDelete: user.permissions?.bookDelete ?? false,
      bookDownload: user.permissions?.bookDownload ?? false,
      bookList: user.permissions?.bookList ?? false,
      bookProcess: user.permissions?.bookProcess ?? false,
      bookRead: user.permissions?.bookRead ?? false,
      bookUpdate: user.permissions?.bookUpdate ?? false,
      collectionCreate: user.permissions?.collectionCreate ?? false,
      inviteDelete: user.permissions?.inviteDelete ?? false,
      inviteList: user.permissions?.inviteList ?? false,
      settingsUpdate: user.permissions?.settingsUpdate ?? false,
      userCreate: user.permissions?.userCreate ?? false,
      userDelete: user.permissions?.userDelete ?? false,
      userList: user.permissions?.userList ?? false,
      userRead: user.permissions?.userRead ?? false,
      userUpdate: user.permissions?.userUpdate ?? false,
    } satisfies UserPermissionSet,
  })
})
