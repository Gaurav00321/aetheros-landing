"use client"

import { motion } from "framer-motion"

export function SpiralBackground() {
  // Generate spiral paths with horizontal stretching
  const generateSpiralPath = (
    startRadius: number,
    endRadius: number,
    turns: number,
    offset = 0,
    horizontalStretch = 1.5,
  ) => {
    const points = []
    const steps = 200

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

  const spirals = [
    { startRadius: 100, endRadius: 1200, turns: 3, opacity: 0.8, strokeWidth: 2, delay: 0, stretch: 1.6 },
    { startRadius: 120, endRadius: 1250, turns: 3.2, opacity: 0.6, strokeWidth: 1.5, delay: 0.5, stretch: 1.7 },
    { startRadius: 80, endRadius: 1150, turns: 2.8, opacity: 0.7, strokeWidth: 2.5, delay: 1, stretch: 1.5 },
    { startRadius: 140, endRadius: 1300, turns: 3.5, opacity: 0.5, strokeWidth: 1, delay: 1.5, stretch: 1.8 },
    { startRadius: 60, endRadius: 1100, turns: 2.5, opacity: 0.9, strokeWidth: 3, delay: 2, stretch: 1.4 },
    { startRadius: 160, endRadius: 1350, turns: 3.8, opacity: 0.4, strokeWidth: 1.5, delay: 2.5, stretch: 1.9 },
    { startRadius: 90, endRadius: 1175, turns: 2.9, opacity: 0.6, strokeWidth: 2, delay: 3, stretch: 1.6 },
    { startRadius: 130, endRadius: 1275, turns: 3.3, opacity: 0.5, strokeWidth: 1.8, delay: 3.5, stretch: 1.7 },
    { startRadius: 110, endRadius: 1225, turns: 3.1, opacity: 0.7, strokeWidth: 2.2, delay: 4, stretch: 1.5 },
    { startRadius: 70, endRadius: 1125, turns: 2.7, opacity: 0.8, strokeWidth: 1.8, delay: 4.5, stretch: 1.8 },
  ]

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden">
      <motion.svg
        width="3200"
        height="2400"
        viewBox="0 0 3200 2400"
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          minWidth: "100vw",
          minHeight: "100vh",
          transform: "scaleX(1.2) scaleY(1.1)",
        }}
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 60,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      >
        <defs>
          <radialGradient id="spiralGradient" cx="50%" cy="50%" rx="40%" ry="50%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
            <stop offset="30%" stopColor="#06b6d4" stopOpacity="0.7" />
            <stop offset="70%" stopColor="#1e40af" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#0f172a" stopOpacity="0.1" />
          </radialGradient>

          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {spirals.map((spiral, index) => (
          <motion.path
            key={index}
            d={generateSpiralPath(spiral.startRadius, spiral.endRadius, spiral.turns, index * 0.3, spiral.stretch)}
            fill="none"
            stroke="url(#spiralGradient)"
            strokeWidth={spiral.strokeWidth}
            strokeOpacity={spiral.opacity}
            filter="url(#glow)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: 1,
              opacity: spiral.opacity,
              strokeOpacity: [spiral.opacity * 0.3, spiral.opacity, spiral.opacity * 0.5, spiral.opacity],
            }}
            transition={{
              pathLength: { duration: 3, delay: spiral.delay, ease: "easeInOut" },
              opacity: { duration: 2, delay: spiral.delay },
              strokeOpacity: {
                duration: 4,
                delay: spiral.delay,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                ease: "easeInOut",
              },
            }}
          />
        ))}

        {/* Horizontally extended radial lines */}
        {Array.from({ length: 20 }).map((_, index) => {
          const angle = index * 18 * (Math.PI / 180)
          const startX = 1600 + Math.cos(angle) * 200 * 1.6
          const startY = 1200 + Math.sin(angle) * 200
          const endX = 1600 + Math.cos(angle) * 1400 * 1.6
          const endY = 1200 + Math.sin(angle) * 1400

          return (
            <motion.line
              key={`radial-${index}`}
              x1={startX}
              y1={startY}
              x2={endX}
              y2={endY}
              stroke="url(#spiralGradient)"
              strokeWidth="1.5"
              strokeOpacity="0.3"
              filter="url(#glow)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: 1,
                opacity: 0.3,
                strokeOpacity: [0.1, 0.4, 0.1],
              }}
              transition={{
                pathLength: { duration: 2, delay: index * 0.1, ease: "easeOut" },
                opacity: { duration: 1.5, delay: index * 0.1 },
                strokeOpacity: {
                  duration: 3,
                  delay: index * 0.2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                  ease: "easeInOut",
                },
              }}
            />
          )
        })}

        {/* Horizontally stretched concentric ellipses */}
        {[300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200].map((radius, index) => (
          <motion.ellipse
            key={`ellipse-${index}`}
            cx="1600"
            cy="1200"
            rx={radius * 1.6}
            ry={radius}
            fill="none"
            stroke="url(#spiralGradient)"
            strokeWidth="0.8"
            strokeOpacity="0.2"
            strokeDasharray="8,15"
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: 0.2,
              strokeDashoffset: [0, -23],
            }}
            transition={{
              scale: { duration: 2, delay: index * 0.2, ease: "easeOut" },
              opacity: { duration: 1.5, delay: index * 0.2 },
              strokeDashoffset: {
                duration: 10,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              },
            }}
          />
        ))}
      </motion.svg>

      {/* Secondary rotating layer with horizontal stretch */}
      <motion.svg
        width="3200"
        height="2400"
        viewBox="0 0 3200 2400"
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          minWidth: "100vw",
          minHeight: "100vh",
          transform: "scaleX(1.2) scaleY(1.1)",
        }}
        initial={{ rotate: 0 }}
        animate={{ rotate: -360 }}
        transition={{
          duration: 80,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      >
        {spirals.slice(0, 5).map((spiral, index) => (
          <motion.path
            key={`secondary-${index}`}
            d={generateSpiralPath(
              spiral.startRadius + 40,
              spiral.endRadius + 40,
              spiral.turns - 0.5,
              index * 0.5,
              spiral.stretch + 0.2,
            )}
            fill="none"
            stroke="#06b6d4"
            strokeWidth={spiral.strokeWidth * 0.7}
            strokeOpacity={spiral.opacity * 0.4}
            filter="url(#glow)"
            initial={{ pathLength: 0 }}
            animate={{
              pathLength: 1,
              strokeOpacity: [spiral.opacity * 0.2, spiral.opacity * 0.6, spiral.opacity * 0.2],
            }}
            transition={{
              pathLength: { duration: 4, delay: spiral.delay + 1, ease: "easeInOut" },
              strokeOpacity: {
                duration: 6,
                delay: spiral.delay + 1,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                ease: "easeInOut",
              },
            }}
          />
        ))}

        {/* Additional horizontally stretched outer spiral layer */}
        {Array.from({ length: 8 }).map((_, index) => {
          const outerSpiral = {
            startRadius: 200 + index * 30,
            endRadius: 1300 + index * 50,
            turns: 2.5 + index * 0.3,
            opacity: 0.3 - index * 0.03,
            strokeWidth: 1.5 - index * 0.08,
            stretch: 1.7 + index * 0.1,
          }

          return (
            <motion.path
              key={`outer-${index}`}
              d={generateSpiralPath(
                outerSpiral.startRadius,
                outerSpiral.endRadius,
                outerSpiral.turns,
                index * 0.7,
                outerSpiral.stretch,
              )}
              fill="none"
              stroke="#1e40af"
              strokeWidth={outerSpiral.strokeWidth}
              strokeOpacity={outerSpiral.opacity}
              filter="url(#glow)"
              initial={{ pathLength: 0 }}
              animate={{
                pathLength: 1,
                strokeOpacity: [outerSpiral.opacity * 0.5, outerSpiral.opacity, outerSpiral.opacity * 0.5],
              }}
              transition={{
                pathLength: { duration: 5, delay: index * 0.5, ease: "easeInOut" },
                strokeOpacity: {
                  duration: 8,
                  delay: index * 0.5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                  ease: "easeInOut",
                },
              }}
            />
          )
        })}
      </motion.svg>
    </div>
  )
}
