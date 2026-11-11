"use client"

import { FormEvent, useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Check, Send } from "lucide-react"

type FooterColumn = {
  heading: string
  links: string[]
}

const footerColumns: FooterColumn[] = [
  {
    heading: "Product",
    links: ["Job discovery", "Worker AI", "Companies", "Salary data"],
  },
  {
    heading: "Navigations",
    links: ["Help center", "Career library", "Contact"],
  },
  {
    heading: "Resources",
    links: ["Brand Guideline", "Newsroom"],
  },
]

function ProductHuntIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9 17V7h4.2a3.3 3.3 0 0 1 0 6.6H11V17H9Zm2-8.2v2.8h2.2a1.4 1.4 0 1 0 0-2.8H11Z"
      />
    </svg>
  )
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true">
      <path d="M13.5 21v-7.2h2.42l.36-2.8h-2.78V9.2c0-.81.22-1.36 1.39-1.36h1.48V5.35c-.26-.03-1.13-.11-2.15-.11-2.13 0-3.58 1.3-3.58 3.68v2.08H8.2v2.8h2.44V21h2.86z" />
    </svg>
  )
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true">
      <path d="M6.94 5a2 2 0 1 1-4-.002 2 2 0 0 1 4 .002zM7 8.48H3V21h4V8.48zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91l.04-1.68z" />
    </svg>
  )
}

export function Footer() {
  const sectionRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)
  const [subscribed, setSubscribed] = useState(false)
  const year = new Date().getFullYear()

  useEffect(() => {
    const element = sectionRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  function handleSubscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubscribed(true)
  }

  const reveal = (delay: number, extra = "") => ({
    className: `transition-all duration-1000 ease-out ${
      visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
    } ${extra}`,
    style: { transitionDelay: visible ? `${delay}ms` : "0ms" },
  })

  return (
    <footer ref={sectionRef} className="relative overflow-hidden bg-[#050506]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-64 w-[720px] -translate-x-1/2 rounded-full bg-indigo-600/[0.07] blur-[120px]" />
        <div className="absolute -left-24 bottom-0 h-56 w-56 rounded-full bg-violet-600/[0.05] blur-[100px]" />
      </div>
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-10 pt-16 sm:px-6 sm:pt-20 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
          <div {...reveal(0)}>
            <Link href="/" className="inline-block">
              <Image
                src="/assets/logo.png"
                alt="HireLoop"
                width={154}
                height={44}
                className="h-9 w-auto"/>
            </Link>

            <p className="mt-5 max-w-xs text-sm leading-relaxed text-zinc-500">
              The AI-native career platform. Built for people who take their
              work seriously.
            </p>

            <div className="mt-8 max-w-sm">
              <p className="text-sm font-medium text-white">
                Get the weekly digest
              </p>
              <p className="mt-1 text-xs text-zinc-500">
                Fresh matches and salary insights, every Friday.
              </p>

              {subscribed ? (
                <div
                  className="animate-price-in mt-4 flex items-center gap-2 rounded-xl border border-indigo-400/20 bg-indigo-500/10 px-4 py-3 text-sm text-indigo-200">
                  <Check className="size-4 shrink-0" aria-hidden="true" />
                  You&apos;re on the list — see you Friday.
                </div>
              ) : (
                <form
                  onSubmit={handleSubscribe}
                  className="mt-4 flex gap-2">
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    aria-label="Email address"
                    className="h-10 w-full min-w-0 flex-1 rounded-xl border border-white/10 bg-white/[0.05] px-3.5 text-sm text-white transition-colors outline-none placeholder:text-zinc-500 focus:border-indigo-400/50 focus:bg-white/[0.08]"/>
                  <button
                    type="submit"
                    aria-label="Subscribe"
                    className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white transition-all duration-300 hover:bg-indigo-500 hover:shadow-[0_0_24px_-4px_rgba(99,102,241,0.6)] focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:outline-none">
                    <Send className="size-4 cursor-pointer" aria-hidden="true" />
                  </button>
                </form>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 sm:gap-8">
            {footerColumns.map((column, colIndex) => (
              <div key={column.heading} {...reveal(150 + colIndex * 100)}>
                <h3 className="text-sm font-semibold text-indigo-300">
                  {column.heading}
                </h3>
                <ul className="mt-5 space-y-3.5">
                  {column.links.map((link) => (
                    <li key={link}>
                      <Link
                        href="#"
                        className="group inline-flex items-center gap-0 text-sm text-zinc-400 transition-all duration-300 hover:translate-x-1 hover:text-white">
                        <span
                          className="h-px w-0 bg-indigo-400 transition-all duration-300 group-hover:mr-1.5 group-hover:w-3"
                          aria-hidden="true"/>
                        <span className="group-focus-visible:text-white">
                          {link}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div
          {...reveal(
            450,
            "mt-14 flex flex-col gap-6 border-t border-white/5 pt-8 sm:mt-16 sm:flex-row sm:items-center sm:justify-between"
          )}>
          <div className="flex items-center gap-3">
            <a
              href="#"
              aria-label="Facebook"
              className="flex size-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.05] text-zinc-300 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-400/40 hover:bg-indigo-500/15 hover:text-white hover:shadow-[0_0_24px_-4px_rgba(99,102,241,0.5)]">
              <FacebookIcon className="size-4" />
            </a>
            <a
              href="#"
              aria-label="Product Hunt"
              className="flex size-9 items-center justify-center rounded-full bg-violet-600 text-white transition-all duration-300 hover:-translate-y-1 hover:bg-violet-500 hover:shadow-[0_0_24px_-4px_rgba(139,92,246,0.6)]">
              <ProductHuntIcon className="size-4" />
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="flex size-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.05] text-zinc-300 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-400/40 hover:bg-indigo-500/15 hover:text-white hover:shadow-[0_0_24px_-4px_rgba(99,102,241,0.5)]">
              <LinkedinIcon className="size-4" />
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-zinc-500">
            <span>Copyright {year} — HireLoop</span>
            <Link
              href="#"
              className="transition-colors duration-300 hover:text-white">
              Terms &amp; Policy
            </Link>
            <span className="text-zinc-700" aria-hidden="true">
              -
            </span>
            <Link
              href="#"
              className="transition-colors duration-300 hover:text-white">
              Privacy Guideline
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
