"use client"

import { motion } from "framer-motion"

export default function SpiralBackground() {
  // Generate spiral paths with horizontal stretching
  const generateSpiralPath = (
    startRadius: number,
    endRadius: number,
    turns: number,
    offset = 0,
    horizontalStretch = 1.5,
  ) => {
    const points = []
    const steps = 100 // Reduced steps for better performance

    for (let i = 0; i <= steps; i++) {
      const progress = i / steps
      const angle = progress * turns * 2 * Math.PI + offset
      const radius = startRadius + (endRadius - startRadius) * progress
      const x = 1600 + Math.cos(angle) * radius * horizontalStretch
      const y = 1200 + Math.sin(angle) * radius
      points.push(`${x},${y}`)
    }

    return `M ${points.join(" L ")}`
  }

  // Reduced number of spirals and simplified parameters
  const spirals = [
    { startRadius: 100, endRadius: 1200, turns: 3, opacity: 0.8, strokeWidth: 2, delay: 0, stretch: 1.6 },
    { startRadius: 120, endRadius: 1250, turns: 3.2, opacity: 0.6, strokeWidth: 1.5, delay: 0.5, stretch: 1.7 },
    { startRadius: 80, endRadius: 1150, turns: 2.8, opacity: 0.7, strokeWidth: 2.5, delay: 1, stretch: 1.5 },
    { startRadius: 140, endRadius: 1300, turns: 3.5, opacity: 0.5, strokeWidth: 1, delay: 1.5, stretch: 1.8 },
    { startRadius: 60, endRadius: 1100, turns: 2.5, opacity: 0.9, strokeWidth: 3, delay: 2, stretch: 1.4 }
  ]

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden pointer-events-none">
      <motion.svg
        width="3200"
        height="2400"
        viewBox="0 0 3200 2400"
        className="absolute inset-0 w-full h-full"
        style={{
          minWidth: "100vw",
          minHeight: "100vh",
          filter: "blur(1px)", // Slight blur for performance
          opacity: 0.7
        }}
      >
        <g>
          {spirals.map((spiral, index) => (
            <motion.path
              key={index}
              d={generateSpiralPath(
                spiral.startRadius,
                spiral.endRadius,
                spiral.turns,
                index * (Math.PI / spirals.length),
                spiral.stretch
              )}
              stroke="rgba(59, 130, 246, 0.3)"
              strokeWidth={spiral.strokeWidth}
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: 1,
                opacity: spiral.opacity,
                rotateZ: 360
              }}
              transition={{
                duration: 20,
                ease: "linear",
                repeat: Infinity,
                delay: spiral.delay,
              }}
              style={{
                transformOrigin: "center",
                willChange: "transform",
              }}
            />
          ))}
        </g>
      </motion.svg>
    </div>
  )
}
