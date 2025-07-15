"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import ParticleBackground from "@/components/particle-background"
import Link from "next/link"

export default function DownloadPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950">
      {/* Background Layer */}
      <div className="fixed inset-0 z-0">
        <ParticleBackground />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight">
            Download AetherOS
          </h1>

          {/* Version Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {versions.map((version, index) => (
              <motion.div
                key={version.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-xl bg-slate-900/50 backdrop-blur border border-blue-500/10 hover:border-blue-500/20 transition-all"
              >
                <h3 className="text-xl font-semibold text-white mb-2">{version.name}</h3>
                <p className="text-slate-300 mb-4">{version.description}</p>
                <div className="space-y-2 mb-6">
                  {version.features.map((feature, i) => (
                    <div key={i} className="flex items-center text-slate-300">
                      <CheckIcon className="w-5 h-5 text-blue-400 mr-2" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                <Button
                  className="w-full group relative px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-500 hover:to-cyan-500 transition-all duration-300 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] overflow-hidden"
                >
                  <span className="relative z-10">Download {version.size}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                </Button>
              </motion.div>
            ))}
          </div>

          {/* System Requirements */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="p-8 rounded-xl bg-slate-900/50 backdrop-blur border border-blue-500/10"
          >
            <h2 className="text-2xl font-bold text-white mb-6">System Requirements</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {requirements.map((req, index) => (
                <div key={index} className="space-y-2">
                  <h3 className="text-lg font-semibold text-blue-400">{req.name}</h3>
                  <p className="text-slate-300">{req.value}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Documentation Link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="mt-8 text-center"
          >
            <Link
              href="/docs"
              className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
            >
              <BookIcon className="w-5 h-5 mr-2" />
              View Installation Guide
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

const versions = [
  {
    name: "AetherOS Core",
    description: "The essential AetherOS experience with core AI features.",
    size: "(2.1 GB)",
    features: [
      "Neural Shell",
      "Basic AI Capabilities",
      "Core System Tools",
      "Standard Desktop Environment"
    ]
  },
  {
    name: "AetherOS Pro",
    description: "Full featured version with advanced AI capabilities.",
    size: "(3.8 GB)",
    features: [
      "All Core Features",
      "Advanced AI Tools",
      "Development Environment",
      "Extended Plugin Support"
    ]
  }
]

const requirements = [
  {
    name: "Processor",
    value: "64-bit processor (x86-64) @ 2.0 GHz or better"
  },
  {
    name: "Memory",
    value: "Minimum 8GB RAM (16GB Recommended)"
  },
  {
    name: "Storage",
    value: "30GB available space (SSD Recommended)"
  },
  {
    name: "Graphics",
    value: "OpenGL 3.3 or higher compatible"
  }
]

// Icons
function CheckIcon(props: any) {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

function BookIcon(props: any) {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
    )
  }
