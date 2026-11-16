import { redirect } from "next/navigation"

import { requireDashboardUser } from "@/lib/dashboard-user"
import { ROLE_HOME } from "@/lib/roles"

export default async function DashboardIndex() {
  const user = await requireDashboardUser()

  redirect(ROLE_HOME[user.role])
}
