export const USER_ROLES = ["seeker", "recruiter", "admin"] as const

export type UserRole = (typeof USER_ROLES)[number]

export function isUserRole(value: unknown): value is UserRole {
  return (
    typeof value === "string" && (USER_ROLES as readonly string[]).includes(value)
  )
}

/** Fallback used whenever a persisted user has no role yet. */
export const DEFAULT_ROLE: UserRole = "seeker"

export function resolveRole(value: unknown): UserRole {
  return isUserRole(value) ? value : DEFAULT_ROLE
}

/** Dashboard home path for each role. */
export const ROLE_HOME: Record<UserRole, string> = {
  seeker: "/dashboard/seeker",
  recruiter: "/dashboard/recruiter",
  admin: "/dashboard/admin",
}
