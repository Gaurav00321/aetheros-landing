"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export function AetherOSLogo() {
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="flex items-center justify-center">
      <motion.div
        animate={
          animate
            ? {
                rotate: 360,
                scale: [1, 1.05, 1],
                opacity: 1,
              }
            : {
                opacity: 0,
                scale: 0.8,
              }
        }
        transition={{
          rotate: { duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
          scale: { duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
        }}
        className="relative"
        initial={{ opacity: 0, scale: 0.8 }}
      >
        <motion.img
          src="/aether-logo.png"
          alt="AetherOS Logo"
          width={80}
          height={80}
          className="drop-shadow-[0_0_15px_rgba(59,130,246,0.5)] filter brightness-110"
          initial={{ opacity: 0 }}
          animate={animate ? { opacity: 1 } : {}}
          transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
        />
      </motion.div>
    </div>
  )
}
