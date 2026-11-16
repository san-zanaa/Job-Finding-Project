import { requireRole } from "@/lib/dashboard-user"

export default async function SeekerLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  await requireRole("seeker")

  return children
}
