import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

let client: MongoClient | undefined;
let auth: ReturnType<typeof buildAuth> | undefined;

function getClient() {
  if (!client) {
    const url = process.env.MONGODB_URL;

    if (!url) {
      throw new Error(
        "MONGODB_URL is not set. Add it to your .env file locally, or to your deployment environment variables."
      );
    }

    client = new MongoClient(url);
  }

  return client;
}

function buildAuth() {
  const mongoClient = getClient();

  return betterAuth({
    baseURL: process.env.BETTER_AUTH_URL,
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
    database: mongodbAdapter(mongoClient.db("job-hiring"), {
      client: mongoClient,
    }),
  });
}

export function getAuth() {
  if (!auth) {
    auth = buildAuth();
  }

  return auth;
}
