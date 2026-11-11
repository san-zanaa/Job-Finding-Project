"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"


const VIEW_W = 2000
const VIEW_H = 720
const CENTER_X = 1000
const CENTER_Y = 1797 
const RIM_RADIUS = 1677 

const RING_COUNT = 11
const rings = Array.from({ length: RING_COUNT }, (_, i) => {
  const theta = (((i + 1) * 4) * Math.PI) / 180
  return RIM_RADIUS * Math.cos(theta)
})

const RAY_ANGLES = [
  -40, -32, -24, -16, -8, 0, 8, 16, 24, 32, 40,
]

function rayEnd(angleDeg: number) {
  const a = (angleDeg * Math.PI) / 180
  return {
    x: CENTER_X + RIM_RADIUS * Math.sin(a),
    y: CENTER_Y - RIM_RADIUS * Math.cos(a),
  }
}

function mulberry32(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const stars = (() => {
  const rand = mulberry32(42)
  return Array.from({ length: 70 }, (_, i) => ({
    id: i,
    x: -40 + rand() * (VIEW_W + 80),
    y: -20 + rand() * 520,
    r: 0.6 + rand() * 1.1,
    opacity: 0.1 + rand() * 0.35,
    twinkle: rand() > 0.78,
    delay: rand() * 6,
    duration: 3 + rand() * 4,
  }))
})()

export function CtaSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const starsRef = useRef<SVGGElement>(null)
  const glowRef = useRef<SVGGElement>(null)
  const gridRef = useRef<SVGGElement>(null)
  const rimRef = useRef<SVGGElement>(null)
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
      { threshold: 0.2 }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)")
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (!canHover.matches || reducedMotion.matches) return

    let targetX = 0
    let targetY = 0
    let currentX = 0
    let currentY = 0
    let frame = 0

    const onMove = (event: PointerEvent) => {
      const rect = section.getBoundingClientRect()
      targetX = ((event.clientX - rect.left) / rect.width) * 2 - 1
      targetY = ((event.clientY - rect.top) / rect.height) * 2 - 1
    }

    const onLeave = () => {
      targetX = 0
      targetY = 0
    }

    const tick = () => {
      currentX += (targetX - currentX) * 0.06
      currentY += (targetY - currentY) * 0.06

      if (starsRef.current) {
        starsRef.current.style.transform = `translate3d(${currentX * -6}px, ${currentY * -4}px, 0)`
      }
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${currentX * 14}px, ${currentY * 10}px, 0)`
      }
      if (gridRef.current) {
        gridRef.current.style.transform = `translate3d(${currentX * 8}px, ${currentY * 6}px, 0)`
      }
      if (rimRef.current) {
        rimRef.current.style.transform = `translate3d(${currentX * 11}px, ${currentY * 8}px, 0)`
      }

      frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    section.addEventListener("pointermove", onMove)
    section.addEventListener("pointerleave", onLeave)

    return () => {
      cancelAnimationFrame(frame)
      section.removeEventListener("pointermove", onMove)
      section.removeEventListener("pointerleave", onLeave)
    }
  }, [])

  const reveal = (delay: number, extra = "") => ({
    className: `transition-all duration-1000 ease-out ${
      visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
    } ${extra}`,
    style: { transitionDelay: visible ? `${delay}ms` : "0ms" },
  })

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#050506]">
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
        className={`absolute inset-0 h-full w-full transition-all duration-[1400ms] ease-out ${
          visible ? "scale-100 opacity-100" : "scale-105 opacity-0"}`}>
        <defs>
          <radialGradient
            id="cta-dome-fill"
            gradientUnits="userSpaceOnUse"
            cx={CENTER_X}
            cy={130}
            r={1750}>
            <stop offset="0" stopColor="#818cf8" stopOpacity="0.32" />
            <stop offset="0.25" stopColor="#6366f1" stopOpacity="0.18" />
            <stop offset="0.5" stopColor="#4f46e5" stopOpacity="0.08" />
            <stop offset="0.78" stopColor="#4f46e5" stopOpacity="0.02" />
            <stop offset="1" stopColor="#4f46e5" stopOpacity="0" />
          </radialGradient>
          <radialGradient
            id="cta-ambient"
            gradientUnits="userSpaceOnUse"
            cx={CENTER_X}
            cy={150}
            r={920}>
            <stop offset="0" stopColor="#a5b4fc" stopOpacity="0.5" />
            <stop offset="0.35" stopColor="#6366f1" stopOpacity="0.2" />
            <stop offset="1" stopColor="#6366f1" stopOpacity="0" />
          </radialGradient>
          <linearGradient
            id="cta-rim"
            gradientUnits="userSpaceOnUse"
            x1={CENTER_X}
            y1={124}
            x2={CENTER_X}
            y2={540}>
            <stop offset="0" stopColor="#e0e7ff" stopOpacity="0.9" />
            <stop offset="0.4" stopColor="#a5b4fc" stopOpacity="0.4" />
            <stop offset="1" stopColor="#6366f1" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="cta-sheen" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#c7d2fe" stopOpacity="0" />
            <stop offset="0.5" stopColor="#c7d2fe" stopOpacity="0.08" />
            <stop offset="1" stopColor="#c7d2fe" stopOpacity="0" />
          </linearGradient>
          <linearGradient
            id="cta-fade"
            gradientUnits="userSpaceOnUse"
            x1={CENTER_X}
            y1={400}
            x2={CENTER_X}
            y2={618}>
            <stop offset="0" stopColor="#050506" stopOpacity="0" />
            <stop offset="1" stopColor="#050506" stopOpacity="1" />
          </linearGradient>
          <linearGradient
            id="cta-grid-fade"
            gradientUnits="userSpaceOnUse"
            x1={CENTER_X}
            y1={110}
            x2={CENTER_X}
            y2={600}>
            <stop offset="0" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="0.4" stopColor="#ffffff" stopOpacity="0.55" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
          <mask
            id="cta-grid-mask"
            maskUnits="userSpaceOnUse"
            x={0}
            y={0}
            width={VIEW_W}
            height={VIEW_H}>
            <rect
              x={0}
              y={0}
              width={VIEW_W}
              height={VIEW_H}
              fill="url(#cta-grid-fade)"/>
          </mask>
          <clipPath id="cta-dome-clip">
            <circle cx={CENTER_X} cy={CENTER_Y} r={RIM_RADIUS} />
          </clipPath>
        </defs>

        <g ref={starsRef}>
          {stars.map((star) => (
            <circle
              key={star.id}
              cx={star.x}
              cy={star.y}
              r={star.r}
              fill="#e0e7ff"
              opacity={star.opacity}
              className={star.twinkle ? "animate-star-twinkle" : undefined}
              style={
                star.twinkle
                  ? {
                      animationDelay: `${star.delay}s`,
                      animationDuration: `${star.duration}s`,
                    }
                  : undefined
              }/>
          ))}
        </g>

        <g ref={glowRef} className="animate-glow-breathe">
          <ellipse
            cx={CENTER_X}
            cy={170}
            rx={1300}
            ry={420}
            fill="url(#cta-ambient)"
            opacity="0.45"/>
          <ellipse
            cx={CENTER_X}
            cy={160}
            rx={850}
            ry={300}
            fill="url(#cta-ambient)"/>
        </g>

        <circle
          cx={CENTER_X}
          cy={CENTER_Y}
          r={RIM_RADIUS}
          fill="url(#cta-dome-fill)"/>

        <g clipPath="url(#cta-dome-clip)" mask="url(#cta-grid-mask)">
          <g ref={gridRef} stroke="#818cf8" strokeWidth="1" fill="none">
            {rings.map((r, i) => (
              <circle
                key={`ring-${i}`}
                cx={CENTER_X}
                cy={CENTER_Y}
                r={r}
                opacity="0.55"/>
            ))}
            {RAY_ANGLES.map((angle) => {
              const end = rayEnd(angle)
              return (
                <line
                  key={`ray-${angle}`}
                  x1={CENTER_X}
                  y1={CENTER_Y}
                  x2={end.x}
                  y2={end.y}
                  opacity="0.5"/>
              )
            })}
          </g>
        </g>

        <g ref={rimRef} fill="none">
          <circle
            cx={CENTER_X}
            cy={CENTER_Y}
            r={RIM_RADIUS}
            stroke="url(#cta-rim)"
            strokeWidth="14"
            opacity="0.16"/>
          <circle
            cx={CENTER_X}
            cy={CENTER_Y}
            r={RIM_RADIUS}
            stroke="url(#cta-rim)"
            strokeWidth="6"
            opacity="0.35"/>
          <circle
            cx={CENTER_X}
            cy={CENTER_Y}
            r={RIM_RADIUS}
            stroke="url(#cta-rim)"
            strokeWidth="1.5"/>
        </g>

        <g clipPath="url(#cta-dome-clip)" mask="url(#cta-grid-mask)">
          <rect
            x={-300}
            y={40}
            width={300}
            height={660}
            fill="url(#cta-sheen)"
            className="animate-sheen-sweep"/>
        </g>

        <rect
          x={0}
          y={400}
          width={VIEW_W}
          height={VIEW_H - 400}
          fill="url(#cta-fade)"/>
      </svg>

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-4 pt-28 pb-24 text-center sm:px-6 sm:pt-36 sm:pb-28 lg:pt-40 lg:pb-32">
        <div {...reveal(0)}>
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-500/10 px-4 py-1.5 backdrop-blur">
            <Sparkles className="size-3.5 text-indigo-300" aria-hidden="true" />
            <span className="text-xs font-medium tracking-[0.2em] text-indigo-200 uppercase">
              AI-powered matching
            </span>
          </div>
        </div>

        <h1
          {...reveal(
            120,
            "mt-8 text-4xl font-semibold tracking-tight text-balance text-white sm:text-6xl lg:text-7xl"
          )}>
          Your next role is
          <br className="hidden sm:block" /> already looking for you
        </h1>

        <p
          {...reveal(240, "mt-6 max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-lg")}>
          Build a profile in three minutes. The matches start arriving tomorrow
          morning.
        </p>

        <div
          {...reveal(
            360,
            "mt-10 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-4"
          )}>
          <Link
            href="/signup"
            className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-white px-7 text-sm font-semibold text-black transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_40px_-4px_rgba(129,140,248,0.6)] focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:outline-none">
            Create a free account
            <ArrowRight
              className="size-4 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"/>
          </Link>
          <Link
            href="#pricing"
            className="inline-flex h-12 items-center justify-center rounded-xl border border-white/15 bg-white/[0.04] px-7 text-sm font-medium text-white backdrop-blur transition-all duration-300 hover:border-white/30 hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:outline-none">
            View pricing
          </Link>
        </div>

        <p
          {...reveal(
            480,
            "mt-8 flex flex-wrap items-center justify-center gap-x-2 text-xs text-zinc-500"
          )}>
          <span>Free to start</span>
          <span className="text-zinc-700" aria-hidden="true">·</span>
          <span>No credit card required</span>
          <span className="text-zinc-700" aria-hidden="true">·</span>
          <span>Cancel anytime</span>
        </p>
      </div>
    </section>
  )
}
