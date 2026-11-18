"use client"

import { useEffect, useId, useState, type RefObject } from "react"
import { motion, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"

export interface AnimatedBeamProps {
  className?: string
  containerRef: RefObject<HTMLElement | null>
  fromRef: RefObject<HTMLElement | null>
  toRef: RefObject<HTMLElement | null>
  curvature?: number
  reverse?: boolean
  /** Seconds for one pass of the beam. Fixed default (no Math.random) so server and client render the same. */
  duration?: number
  delay?: number
  pathColor?: string
  pathWidth?: number
  pathOpacity?: number
  gradientStartColor?: string
  gradientStopColor?: string
  startXOffset?: number
  startYOffset?: number
  endXOffset?: number
  endYOffset?: number
}

/* Adaptado do Animated Beam (Magic UI): uma linha entre dois elementos com um feixe de luz que corre por ela. */
export function AnimatedBeam({
  className,
  containerRef,
  fromRef,
  toRef,
  curvature = 0,
  reverse = false,
  duration = 5,
  delay = 0,
  pathColor = "var(--line)",
  pathWidth = 2,
  pathOpacity = 1,
  gradientStartColor = "var(--accent)",
  gradientStopColor = "var(--accent)",
  startXOffset = 0,
  startYOffset = 0,
  endXOffset = 0,
  endYOffset = 0,
}: AnimatedBeamProps) {
  const id = useId()
  const reduceMotion = useReducedMotion()
  const [pathD, setPathD] = useState("")
  const [svgDimensions, setSvgDimensions] = useState({ width: 0, height: 0 })

  const gradientCoordinates = reverse
    ? { x1: ["90%", "-10%"], x2: ["100%", "0%"], y1: ["0%", "0%"], y2: ["0%", "0%"] }
    : { x1: ["10%", "110%"], x2: ["0%", "100%"], y1: ["0%", "0%"], y2: ["0%", "0%"] }

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const updatePath = () => {
      if (!containerRef.current || !fromRef.current || !toRef.current) return
      const containerRect = containerRef.current.getBoundingClientRect()
      const rectA = fromRef.current.getBoundingClientRect()
      const rectB = toRef.current.getBoundingClientRect()

      setSvgDimensions({ width: containerRect.width, height: containerRect.height })

      const startX = rectA.left - containerRect.left + rectA.width / 2 + startXOffset
      const startY = rectA.top - containerRect.top + rectA.height / 2 + startYOffset
      const endX = rectB.left - containerRect.left + rectB.width / 2 + endXOffset
      const endY = rectB.top - containerRect.top + rectB.height / 2 + endYOffset

      const controlY = startY - curvature
      setPathD(`M ${startX},${startY} Q ${(startX + endX) / 2},${controlY} ${endX},${endY}`)
    }

    const observer = new ResizeObserver(updatePath)
    observer.observe(container)
    updatePath()
    return () => observer.disconnect()
  }, [containerRef, fromRef, toRef, curvature, startXOffset, startYOffset, endXOffset, endYOffset])

  return (
    <svg
      fill="none"
      width={svgDimensions.width}
      height={svgDimensions.height}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={cn("pointer-events-none absolute left-0 top-0 transform-gpu stroke-2", className)}
      viewBox={`0 0 ${svgDimensions.width} ${svgDimensions.height}`}
    >
      <path d={pathD} stroke={pathColor} strokeWidth={pathWidth} strokeOpacity={pathOpacity} strokeLinecap="round" />
      {!reduceMotion && (
        <>
          <path d={pathD} strokeWidth={pathWidth} stroke={`url(#${id})`} strokeOpacity="1" strokeLinecap="round" />
          <defs>
            <motion.linearGradient
              className="transform-gpu"
              id={id}
              gradientUnits="userSpaceOnUse"
              initial={{ x1: "0%", x2: "0%", y1: "0%", y2: "0%" }}
              animate={{
                x1: gradientCoordinates.x1,
                x2: gradientCoordinates.x2,
                y1: gradientCoordinates.y1,
                y2: gradientCoordinates.y2,
              }}
              transition={{ delay, duration, ease: [0.4, 0, 0.2, 1], repeat: Infinity, repeatDelay: 0 }}
            >
              <stop stopColor={gradientStartColor} stopOpacity="0" />
              <stop stopColor={gradientStartColor} />
              <stop offset="32.5%" stopColor={gradientStopColor} />
              <stop offset="100%" stopColor={gradientStopColor} stopOpacity="0" />
            </motion.linearGradient>
          </defs>
        </>
      )}
    </svg>
  )
}
