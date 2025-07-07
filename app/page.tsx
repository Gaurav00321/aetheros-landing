"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { AetherOSLogo } from "@/components/aether-logo"
import { ParticleBackground } from "@/components/particle-background"
import { ExploreModal } from "@/components/explore-modal"
import { DownloadModal } from "@/components/download-modal"
import { Button } from "@/components/ui/button"
import { SpiralBackground } from "@/components/spiral-background"

export default function AetherOSLanding() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [showExplore, setShowExplore] = useState(false)
  const [showDownload, setShowDownload] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    // Trigger load animation after component mounts
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950">
      {/* Animated Spiral Background */}
      <div className="absolute inset-0 overflow-hidden">
        <SpiralBackground />
      </div>

      {/* Particle Background */}
      <ParticleBackground />

      {/* Cursor Trail */}
      <motion.div
        className="fixed w-4 h-4 bg-blue-400/30 rounded-full pointer-events-none z-50 mix-blend-screen"
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-3">
        <div className="text-center max-w-4xl mx-auto">
          {/* Title with Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 1, ease: "easeOut" }}
            className="flex items-center justify-center mb-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
              className="flex-shrink-0"
            >
              <AetherOSLogo />
            </motion.div>
            <h1 className="text-6xl md:text-7xl font-bold text-white tracking-tight">AetherOS</h1>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 1.2, ease: "easeOut" }}
            className="text-xl md:text-2xl text-blue-200 mb-4 font-light"
          >
            The Conscious AI Operating System
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 1.4, ease: "easeOut" }}
            className="text-lg text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            An OS that adapts to you, learns, perceives context, and thinks with the user in mind.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 1.6, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <Button
              onClick={() => setShowExplore(true)}
              className="group relative px-8 py-4 bg-transparent border-2 border-blue-500 text-blue-400 hover:text-white transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] hover:-translate-y-1 overflow-hidden"
            >
              <span className="relative z-10 text-lg font-medium">Explore OS</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </Button>

            <Button
              onClick={() => setShowDownload(true)}
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-500 hover:to-cyan-500 transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] hover:-translate-y-1 overflow-hidden"
            >
              <span className="relative z-10 text-lg font-medium">Download OS</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {showExplore && <ExploreModal onClose={() => setShowExplore(false)} />}
        {showDownload && <DownloadModal onClose={() => setShowDownload(false)} />}
      </AnimatePresence>
    </div>
  )
}
