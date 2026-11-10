"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { authClient } from "@/lib/auth-client"
import { GoogleIcon } from "./google-icon"

export function SocialAuth() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleGoogle() {
    setLoading(true)
    setError(null)

    const { error } = await authClient.signIn.social({ provider: "google" })

    if (error) {
      setError(error.message || "Could not sign in with Google.")
      setLoading(false)
    }
  }

  return (
    <div className="mt-6 flex flex-col gap-4">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator className="bg-white/10" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-[#12121a]/80 px-2 text-gray-500">
            Or continue with
          </span>
        </div>
      </div>

      {error ? (
        <p className="text-center text-sm text-red-400">{error}</p>
      ) : null}

      <Button
        type="button"
        variant="outline"
        onClick={handleGoogle}
        disabled={loading}
        className="w-full border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white">
        <GoogleIcon className="size-4" />
        {loading ? "Connecting to Google..." : "Continue with Google"}
      </Button>
    </div>
  )
}
