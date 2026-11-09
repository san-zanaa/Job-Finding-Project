"use client"

import { FormEvent } from "react"
import Image from "next/image"
import {
  Search,
  MapPin,
  Briefcase,
  Building2,
  Users,
  Star,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const trendingPositions = [
  "Product Designer",
  "AI Engineering",
  "Dev-ops Engineer",
]

const stats = [
  { icon: Briefcase, value: "50K", label: "Active Jobs" },
  { icon: Building2, value: "12K", label: "Companies" },
  { icon: Users, value: "2M", label: "Job Seekers" },
  { icon: Star, value: "97%", label: "Satisfaction Rate" },
]

export function Banner() {
  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
  }

  return (
    <section className="relative overflow-hidden bg-[#0a0a0f]">
      <div className="absolute inset-0">
        <Image
          src="/assets/cta-bg.png"
          alt=""
          fill
          className="object-cover opacity-40"/>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-[600px] flex-col items-center pb-64 pt-16 sm:min-h-[700px] sm:pb-72 sm:pt-20 lg:min-h-[800px] lg:pb-80">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur">
            <Briefcase className="size-4 text-indigo-400" />
            <span className="text-sm font-semibold text-white">50,000+</span>
            <span className="text-xs font-medium tracking-wider text-gray-400">
              NEW JOBS THIS MONTH
            </span>
          </div>

          <h1 className="text-center text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Find Your Dream Job Today
          </h1>

          <p className="mt-4 max-w-2xl text-center text-sm leading-relaxed text-gray-400 sm:text-base">
            HireLoop connects top talent with world-class companies. Browse
            thousands of curated opportunities and land your next role — faster.
          </p>

          <form onSubmit={handleSearch} className="mt-8 w-full max-w-3xl">
            <div className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/5 p-2 backdrop-blur sm:flex-row sm:items-center">
              <div className="flex flex-1 items-center gap-2 px-3 py-2">
                <Search className="size-5 shrink-0 text-gray-400" />
                <input
                  type="search"
                  placeholder="Job title, skill or company"
                  aria-label="Job title, skill or company"
                  className="w-full bg-transparent text-sm text-white placeholder-gray-500 outline-none"/>
              </div>
              <div className="hidden h-8 w-px bg-white/10 sm:block" />
              <div className="flex flex-1 items-center gap-2 px-3 py-2">
                <MapPin className="size-5 shrink-0 text-gray-400" />
                <input
                  type="search"
                  placeholder="Location or Remote"
                  aria-label="Location or Remote"
                  className="w-full bg-transparent text-sm text-white placeholder-gray-500 outline-none"/>
              </div>
              <Button
                type="submit"
                className="size-11 shrink-0 rounded-xl bg-indigo-600 px-0 text-white hover:bg-indigo-500">
                <Search className="size-5" />
              </Button>
            </div>
          </form>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            <span className="text-sm text-gray-500">Trending Position</span>
            {trendingPositions.map((position) => (
              <button
                key={position}
                type="button"
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300 transition-colors hover:border-indigo-500/50 hover:text-white">
                {position}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-1/2 w-[160%] -translate-x-1/2 sm:w-[140%] lg:w-full lg:max-w-6xl">
        <Image
          src="/assets/globe.png"
          alt=""
          width={1440}
          height={1882}
          className="w-full"/>
      </div>

      <div className="absolute inset-x-0 bottom-48 left-1/2 z-20 w-full -translate-x-1/2 px-4 text-center sm:bottom-56 lg:bottom-64">
        <p className="text-lg leading-relaxed text-white/90 sm:text-xl lg:text-2xl">
          Assisting over 15,000 job seekers
          <br />
          find their dream positions.
        </p>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-30">
        <div className="mx-auto max-w-7xl px-4 pb-4 sm:px-6 sm:pb-6 lg:px-8">
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/10 bg-[#12121a]/80 p-4 backdrop-blur transition-colors hover:border-white/20 sm:p-6">
                <stat.icon className="mb-3 size-5 text-indigo-400 sm:mb-4" />
                <div className="text-2xl font-bold text-white sm:text-3xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-xs text-gray-400 sm:text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
