"use client"

import { useState, useEffect, Suspense } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { AetherOSLogo } from "@/components/aether-logo"
import { Button } from "@/components/ui/button"
import ParticleBackground from "@/components/particle-background"

export default function AetherOSLanding() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950">
      {/* Background Layer */}
      <div className="fixed inset-0 z-0">
        <Suspense fallback={<div className="absolute inset-0 bg-slate-950" />}>
          <ParticleBackground />
        </Suspense>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-6">
        <div className="text-center max-w-4xl mx-auto">
          {/* Logo and Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
            className="flex items-center justify-center mb-6 space-x-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1.5, delay: 0.5 }}
              className="w-16 h-16 sm:w-20 sm:h-20"
            >
              <AetherOSLogo />
            </motion.div>
            <h1 className="text-5xl sm:text-7xl font-bold text-white tracking-tight">
              AetherOS
            </h1>
          </motion.div>

          {/* Taglines */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.7 }}
            className="text-xl sm:text-2xl text-blue-200 mb-4 font-light"
          >
            The Conscious AI Operating System
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.9 }}
            className="text-lg text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed px-4"
          >
            An OS that adapts to you, learns, perceives context, and thinks with the user in mind.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 1.1 }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-4"
          >
            <Link href="/explore" className="w-full sm:w-auto">
              <Button 
                className="w-full sm:w-auto relative group px-8 py-6 bg-slate-900/50 backdrop-blur 
                  border border-blue-500/20 text-blue-400 hover:text-blue-300 hover:border-blue-400/40 
                  hover:bg-slate-800/60 transition-all duration-300 
                  hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] hover:-translate-y-1 overflow-hidden"
              >
                <span className="relative z-10 text-lg font-medium flex items-center">
                  Explore OS
                  <svg
                    className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Button>
            </Link>

            <Link href="/download" className="w-full sm:w-auto">
              <Button 
                className="w-full sm:w-auto group relative px-8 py-6 bg-gradient-to-r from-blue-600 to-cyan-600 
                  text-white hover:from-blue-500 hover:to-cyan-500 transition-all duration-300 
                  hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] hover:translate-y-1 overflow-hidden"
              >
                <span className="relative z-10 text-lg font-medium">Download OS</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
