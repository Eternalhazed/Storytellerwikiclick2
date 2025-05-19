import { signOut } from "@/auth"

export const dynamic = "force-dynamic"

/**
 * @summary Log out
 * @desc '
 */
export const POST = async () => {
  await signOut({ redirectTo: "/" })
}
