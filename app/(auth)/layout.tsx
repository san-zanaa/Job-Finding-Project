import Image from "next/image"
import Link from "next/link"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0a0a0f] px-4 py-12">
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-indigo-600/20 blur-[140px]"
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <Link href="/" aria-label="HireLoop home">
            <Image
              src="/assets/logo.png"
              alt="HireLoop"
              width={154}
              height={44}
              priority
              className="h-10 w-auto"
            />
          </Link>
        </div>

        {children}
      </div>
    </div>
  )
}
