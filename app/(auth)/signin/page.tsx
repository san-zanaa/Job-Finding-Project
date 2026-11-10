import type { Metadata } from "next"
import { SignInForm } from "@/components/auth/signin-form"

export const metadata: Metadata = {
  title: "Sign in | HireLoop",
}

export default function SignInPage() {
  return <SignInForm />
}
