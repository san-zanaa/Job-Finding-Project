import type { Metadata } from "next"

import { requireDashboardUser } from "@/lib/dashboard-user"
import { DashboardShell } from "@/components/dashboard/shell"

export const metadata: Metadata = {
  title: "HireLoop — Dashboard",
}

export default async function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const user = await requireDashboardUser()

  return (
    <DashboardShell role={user.role} name={user.name} email={user.email}>
      {children}
    </DashboardShell>
  )
}
