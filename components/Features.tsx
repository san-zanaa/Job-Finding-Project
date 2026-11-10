"use client"

import { useEffect, useRef, useState } from "react"
import {
  Search,
  ChartLine,
  Building,
  Bookmark,
  MousePointerClick,
  IdCard,
  Hexagon,
  TrendingUp,
  type LucideIcon,
} from "lucide-react"

type Feature = {
  icon: LucideIcon
  title: string
  description: string
}

const features: Feature[] = [
  {
    icon: Search,
    title: "Smart Search",
    description: "Find your ideal job with advanced filters.",
  },
  {
    icon: ChartLine,
    title: "Salary Insights",
    description: "Get real salary data to negotiate confidently.",
  },
  {
    icon: Building,
    title: "Top Companies",
    description: "Apply to vetted companies that are hiring.",
  },
  {
    icon: Bookmark,
    title: "Saved Jobs",
    description: "Manage apps & favorites on your dashboard.",
  },
  {
    icon: MousePointerClick,
    title: "One-Click Apply",
    description: "Simplify your job applications for an easier process!",
  },
  {
    icon: IdCard,
    title: "Resume Builder",
    description: "Create professional resumes with modern templates.",
  },
  {
    icon: Hexagon,
    title: "Skill-Based Matching",
    description: "Discover jobs that match your skills and experience.",
  },
  {
    icon: TrendingUp,
    title: "Career Growth Resources",
    description: "Boost your career with quick interview tips.",
  },
]

export function Features() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

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

  return (
    <section className="relative overflow-hidden bg-[#0a0a0f] py-20 sm:py-24 lg:py-28">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[480px] w-[900px] -translate-x-1/2 rounded-full bg-indigo-600/10 blur-[140px]" />
        <div className="absolute bottom-0 left-1/2 h-[320px] w-[700px] -translate-x-1/2 rounded-full bg-indigo-500/5 blur-[120px]" />
      </div>

      <div
        ref={sectionRef}
        className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={`mx-auto max-w-3xl text-center transition-all duration-700 ease-out ${
            visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}>
          <div className="mb-6 inline-flex items-center gap-3">
            <span className="size-1.5 rounded-[2px] bg-indigo-500" />
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-400">
              Features Job
            </span>
            <span className="size-1.5 rounded-[2px] bg-indigo-500" />
          </div>

          <h2 className="text-balance text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Everything you need
            <br className="hidden sm:block" /> to succeed
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-x-10">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`group flex items-start gap-4 transition-all duration-700 ease-out ${
                visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{
                transitionDelay: visible ? `${120 + index * 70}ms` : "0ms",
              }}>
              <div className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-indigo-500/40 group-hover:shadow-[0_0_28px_-6px_var(--color-indigo-500)]">
                <feature.icon className="size-5 text-indigo-400 transition-all duration-300 group-hover:scale-110 group-hover:text-indigo-300" />
              </div>

              <div className="min-w-0">
                <h3 className="text-[15px] font-medium text-white transition-colors duration-300 group-hover:text-indigo-200">
                  {feature.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-gray-400 transition-colors duration-300 group-hover:text-gray-300">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
