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

/**
 * Reads the better-auth session on the server and normalizes the user into a
 * strongly typed dashboard user (role is guaranteed).
 */
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

/**
 * Same as `getDashboardUser`, but redirects unauthenticated visitors to the
 * sign-in page.
 */
export async function requireDashboardUser(): Promise<DashboardUser> {
  const user = await getDashboardUser();

  if (!user) {
    redirect("/signin");
  }

  return user;
}

/**
 * Enforces the role allowed on a dashboard route segment. Users with another
 * role are bounced to their own dashboard home.
 */
export async function requireRole(...allowed: UserRole[]): Promise<DashboardUser> {
  const user = await requireDashboardUser();

  if (!allowed.includes(user.role)) {
    redirect(ROLE_HOME[user.role]);
  }

  return user;
}
