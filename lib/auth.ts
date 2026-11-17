import { betterAuth } from "better-auth"
import { MongoClient } from "mongodb"
import { mongodbAdapter } from "@better-auth/mongo-adapter"
import { DEFAULT_ROLE, isUserRole } from "@/lib/roles"

let client: MongoClient | undefined
let auth: ReturnType<typeof buildAuth> | undefined

function getClient() {
  if (!client) {
    const url = process.env.MONGODB_URL

    if (!url) {
      throw new Error(
        "MONGODB_URL is not set. Add it to your .env file locally, or to your deployment environment variables."
      )
    }

    client = new MongoClient(url)
  }

  return client
}

/** Comma separated list of emails that are granted the admin role on signup. */
function adminEmails() {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean)
}

/** Local dev origins trusted in addition to baseURL. */
const trustedOrigins =
  process.env.NODE_ENV === "production"
    ? []
    : [
        "http://localhost:3000",
        "http://localhost:3001",
        "http://localhost:3002",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:3001",
        "http://127.0.0.1:3002",
      ]

function buildAuth() {
  const mongoClient = getClient()

  return betterAuth({
    baseURL: process.env.BETTER_AUTH_URL,
    trustedOrigins,
    emailAndPassword: {
      enabled: true,
    },
    socialProviders: {
      ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
        ? {
            google: {
              clientId: process.env.GOOGLE_CLIENT_ID,
              clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            },
          }
        : {}),
    },
    user: {
      additionalFields: {
        role: {
          type: "string",
          required: false,
          defaultValue: DEFAULT_ROLE,
          // Allow clients to pick a role (seeker/recruiter) while signing up.
          input: true,
        },
      },
    },
    databaseHooks: {
      user: {
        create: {
          before: async (user) => {
            // Grant the admin role to designated platform-operator emails.
            if (adminEmails().includes(user.email.toLowerCase())) {
              return { data: { ...user, role: "admin" as const } }
            }

            // Sanitize whatever the client sent during signup.
            const role = isUserRole(user.role) ? user.role : DEFAULT_ROLE
            return { data: { ...user, role } }
          },
        },
      },
    },
    database: mongodbAdapter(mongoClient.db("job-hiring"), {
      client: mongoClient,
    }),
  })
}

export function getAuth() {
  if (!auth) {
    auth = buildAuth()
  }

  return auth
}

/** Inferred better-auth instance type, usable from client code for plugins. */
export type Auth = ReturnType<typeof buildAuth>
