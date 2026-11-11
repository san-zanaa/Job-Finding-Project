
"use client"

import { useEffect, useRef, useState } from "react"
import {
  ArrowRight,
  Check,
  Crown,
  Sparkles,
  TrendingUp,
  Zap,
  type LucideIcon,
} from "lucide-react"

type Plan = {
  name: string
  description: string
  icon: LucideIcon
  monthlyPrice: number
  yearlyPrice: number
  yearlyTotal: number
  recommended: boolean
  features: string[]
}

const plans: Plan[] = [
  {
    name: "Starter",
    description: "Everything you need to get started.",
    icon: Crown,
    monthlyPrice: 0,
    yearlyPrice: 0,
    yearlyTotal: 0,
    recommended: false,
    features: [
      "Daily AI match brief (top 5)",
      "Verified salary bands",
      "Company insight dashboards",
      "1-click apply, unlimited",
    ],
  },
  {
    name: "Growth",
    description: "For ambitious professionals ready to grow.",
    icon: TrendingUp,
    monthlyPrice: 17,
    yearlyPrice: 12.75,
    yearlyTotal: 153,
    recommended: true,
    features: [
      "Everything in Starter",
      "Unlimited AI career matching",
      "Advanced salary insights",
      "Priority application tracking",
      "Personalized career roadmap",
      "AI-powered resume optimization",
    ],
  },
  {
    name: "Premium",
    description: "Maximum leverage for career professionals.",
    icon: Zap,
    monthlyPrice: 99,
    yearlyPrice: 74.25,
    yearlyTotal: 891,
    recommended: false,
    features: [
      "Everything in Pro",
      "Multi-profile career portfolios",
      "Shared talent rooms",
      "Recruiter view (read-only)",
      "Dedicated career analytics",
      "Premium support",
    ],
  },
]

export function PricingSection() {
  const sectionRef = useRef<HTMLElement>(null)

  const [visible, setVisible] = useState(false)
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly")
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

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
      {
        threshold: 0.15,
      }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="pricing"
      className="relative overflow-hidden bg-[#050506] px-5 py-20 text-white sm:px-8 sm:py-24 lg:px-12 lg:py-28">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-20 h-72 w-72 -translate-x-1/2 rounded-full bg-indigo-600/10 blur-[120px]" />
        <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-purple-600/10 blur-[120px]" />
        <div className="absolute right-0 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-fuchsia-600/5 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div
          className={`mx-auto mb-12 max-w-2xl text-center transition-all duration-300 ease-out sm:mb-16 ${
            visible
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"}`}>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-500/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-indigo-300">
            <span className="size-1.5 rounded-[2px] bg-indigo-400" />
            Pricing
            <span className="size-1.5 rounded-[2px] bg-indigo-400" />
          </div>

          <h2 className="text-balance text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Pay for the leverage,
            <br />
            <span className="bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
              not the listings.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-zinc-400 sm:text-base">
            Choose the right tools to accelerate your career.
            Simple pricing, powerful possibilities.
          </p>
        </div>

        <div
          className={`mb-12 flex justify-center transition-all duration-700 ease-out sm:mb-14 ${
            visible
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          }`}
          style={{
            transitionDelay: visible ? "200ms" : "0ms",
          }}>
          <div className="flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.06] p-1.5 shadow-xl backdrop-blur-xl">

            <button
              type="button"
              onClick={() => setBilling("monthly")}
              aria-pressed={billing === "monthly"}
              className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                billing === "monthly"
                  ? "bg-white text-black shadow-lg"
                  : "text-zinc-400 hover:text-white"}`}>
              Monthly
            </button>

            <button
              type="button"
              onClick={() => setBilling("yearly")}
              aria-pressed={billing === "yearly"}
              className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                billing === "yearly"
                  ? "bg-white text-black shadow-lg"
                  : "text-zinc-400 hover:text-white"}`}>
              Yearly

              <span className="rounded-full bg-fuchsia-600 px-2 py-0.5 text-[10px] font-bold text-white">
                -25%
              </span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 xl:gap-6">
          {plans.map((plan, index) => {
            const Icon = plan.icon
            const price = billing === "monthly"
                ? plan.monthlyPrice
                : plan.yearlyPrice

            const isSelected = selectedPlan === plan.name

            return (
              <div
                key={plan.name}
                style={{
                  transitionDelay: visible
                    ? `${300 + index * 180}ms`
                    : "0ms"}}
                className={`group relative flex flex-col overflow-hidden rounded-3xl border p-6 transition-all duration-700 ease-out hover:-translate-y-2 sm:p-7 ${
                  visible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-12 opacity-0"
                } ${
                  plan.recommended
                    ? "border-indigo-400/50 bg-gradient-to-b from-indigo-500/[0.13] via-[#15151d] to-[#101014] shadow-[0_0_50px_rgba(99,102,241,0.12)]"
                    : "border-white/10 bg-white/[0.025] hover:border-white/25 hover:bg-white/[0.045]"}`}>

                {plan.recommended && (
                  <div className="absolute right-5 top-5 flex items-center gap-1.5 rounded-full border border-indigo-400/30 bg-indigo-500/15 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-indigo-300">
                    <Sparkles size={12} />
                    Most popular
                  </div>
                )}

                <div className="mb-7">
                  <div
                    className={`mb-5 flex h-11 w-11 items-center justify-center rounded-xl border transition-all duration-300 group-hover:scale-110 ${
                      plan.recommended
                        ? "border-indigo-400/30 bg-indigo-500/15 text-indigo-300"
                        : "border-white/10 bg-white/[0.06] text-purple-300"}`}>
                    <Icon size={21} />
                  </div>

                  <h3 className="text-xl font-medium tracking-tight">
                    {plan.name}
                  </h3>

                  <p className="mt-2 text-sm text-zinc-500">
                    {plan.description}
                  </p>

                </div>

                <div className="mb-3 min-h-[105px]">
                  <div className="flex items-end gap-2">
                    <span
                      key={`${plan.name}-${billing}`}
                      className="animate-in fade-in duration-300 text-5xl font-semibold tracking-tight sm:text-6xl">
                      ${price}
                    </span>
                    <span className="mb-2 text-xs text-zinc-500">
                      /month
                    </span>

                  </div>
                  {billing === "yearly" && plan.monthlyPrice > 0 ? (
                    <p className="mt-3 text-xs text-zinc-500">
                      ${plan.yearlyTotal} billed annually
                    </p>
                  ) : (
                    <p className="mt-3 text-xs text-zinc-500">
                      {price === 0
                        ? "Free forever"
                        : "Billed monthly"}
                    </p>
                  )}

                </div>

                <div className="mb-5 h-px bg-gradient-to-r from-white/15 via-white/5 to-transparent" />
                <div className="flex-1">
                  <p className="mb-5 text-sm font-medium text-zinc-300">
                    What&apos;s included:
                  </p>

                  <ul className="space-y-4">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 text-sm leading-5 text-zinc-400 transition-colors duration-300">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-white/[0.08] text-indigo-300">
                          <Check
                            size={13}
                            strokeWidth={2.5}/>
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedPlan(plan.name)}
                  aria-pressed={isSelected}
                  className={`mt-10 flex w-full items-center justify-between rounded-xl px-5 py-4 text-sm font-medium transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? "bg-indigo-600 text-white"
                      : plan.recommended
                        ? "bg-white text-black hover:bg-indigo-100"
                        : "bg-white/[0.10] text-white hover:bg-white/[0.18]"
                  }`}>
                  {isSelected
                    ? "Plan Selected"
                    : "Choose This Plan"}

                  <ArrowRight
                    size={17}
                    className={`transition-transform duration-300 ${
                      isSelected
                        ? "rotate-90"
                        : "group-hover:translate-x-1"}`}/>
                </button>
              </div>
            )
          })}

        </div>

        {selectedPlan && (
          <div className="mx-auto mt-8 flex max-w-xl flex-wrap items-center justify-center gap-3 rounded-2xl border border-indigo-400/20 bg-indigo-500/10 px-5 py-4 text-center animate-in fade-in slide-in-from-bottom-3 duration-500">
            <Check size={18} className="text-indigo-300" />
            <p className="text-sm text-zinc-300">
              You&apos;ve selected the{" "}
              <span className="font-semibold text-white">
                {selectedPlan}
              </span>{" "}
              plan with {billing} billing.
            </p>

            <button
              type="button"
              onClick={() => setSelectedPlan(null)}
              className="text-xs text-indigo-300 underline underline-offset-4 transition-colors hover:text-white">
              Change
            </button>

          </div>
        )}

        <div
          className={`mt-12 text-center transition-all duration-700 ease-out ${
            visible
              ? "translate-y-0 opacity-100"
              : "translate-y-6 opacity-0"
          }`}
          style={{
            transitionDelay: visible ? "850ms" : "0ms"}}>
          <p className="text-sm text-zinc-500">
            All plans include secure access and regular product updates.
          </p>

          <p className="mt-2 text-xs text-zinc-600">
            Need a custom solution? Contact our team.
          </p>
        </div>

      </div>
    </section>
  )
}
