import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getAuth } from "@/lib/auth";
import { resolveRole, ROLE_HOME, type UserRole } from "@/lib/roles";

export type DashboardUser = {
  id: string;
  name: string;
  email: string;
  image: string | null;
  role: UserRole;
};

export async function getDashboardUser(): Promise<DashboardUser | null> {
  const session = await getAuth().api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  if (!user?.id || !user.email) {
    return null;
  }

  return {
    id: user.id,
    name: user.name || user.email.split("@")[0],
    email: user.email,
    image: user.image ?? null,
    role: resolveRole(user.role),
  };
}

export async function requireDashboardUser(): Promise<DashboardUser> {
  const user = await getDashboardUser();

  if (!user) {
    redirect("/signin");
  }

  return user;
}


export async function requireRole(...allowed: UserRole[]): Promise<DashboardUser> {
  const user = await requireDashboardUser();

  if (!allowed.includes(user.role)) {
    redirect(ROLE_HOME[user.role]);
  }

  return user;
}
