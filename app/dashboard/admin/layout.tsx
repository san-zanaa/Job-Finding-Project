import { requireRole } from "@/lib/dashboard-user"

export default async function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  await requireRole("admin")

  return children
}
