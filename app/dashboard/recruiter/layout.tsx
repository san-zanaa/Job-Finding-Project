import { requireRole } from "@/lib/dashboard-user"

export default async function RecruiterLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  await requireRole("recruiter")

  return children
}
