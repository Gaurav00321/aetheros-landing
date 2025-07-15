"use client"

import { motion } from "framer-motion"
import ParticleBackground from "@/components/particle-background"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ExplorePage() {
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
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center mb-8 space-x-4"
          >
            <Link href="/" className="group">
              <Button
                variant="ghost"
                className="text-slate-400 hover:text-blue-400 p-2 -ml-2 transition-colors duration-200"
              >
                <svg
                  className="w-6 h-6 transform group-hover:-translate-x-1 transition-transform duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </Button>
            </Link>
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              Explore AetherOS
            </h1>
          </motion.div>
          
          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group p-6 rounded-xl bg-slate-900/50 backdrop-blur border border-blue-500/10 
                  hover:border-blue-400/30 hover:bg-slate-800/60 transition-all duration-300
                  hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] hover:-translate-y-1"
              >
                <feature.icon className="w-10 h-10 text-blue-400 mb-4 transform group-hover:scale-110 transition-transform duration-200" />
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-300 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Interactive Demo Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="p-8 rounded-xl bg-slate-900/50 backdrop-blur border border-blue-500/10 hover:border-blue-400/20 transition-all duration-300"
          >
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-6">Interactive Neural Shell</h2>
            <div className="bg-slate-950 rounded-lg p-4 font-mono">
              <p className="text-blue-400">{"$ aether-shell"}</p>
              <p className="text-slate-300 mt-2">{">"} Initializing Neural Core...</p>
              <p className="text-slate-300">{">"} AI Subsystems Online</p>
              <p className="text-slate-300">{">"} Ready for natural language input</p>
              <div className="mt-4 flex items-center">
                <span className="text-blue-400">$</span>
                <span className="ml-2 text-slate-300 animate-pulse">_</span>
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <Link href="/download">
                <Button 
                  className="relative group px-8 py-6 bg-gradient-to-r from-blue-600 to-cyan-600 
                    text-white hover:from-blue-500 hover:to-cyan-500 transition-all duration-300 
                    hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] hover:-translate-y-1 overflow-hidden"
                >
                  <span className="relative z-10 text-lg font-medium flex items-center">
                    Try AetherOS Now
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
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

const features = [
  {
    title: "Neural Shell",
    description: "A revolutionary command interface that understands natural language and learns from your interactions.",
    icon: BrainIcon
  },
  {
    title: "Adaptive Workflow",
    description: "Self-learning system that adapts to your habits and optimizes your daily routines.",
    icon: WorkflowIcon
  },
  {
    title: "AI Copilot",
    description: "Your personal AI assistant that helps with coding, system management, and task automation.",
    icon: CopilotIcon
  },
  {
    title: "Context Memory",
    description: "Advanced system that remembers your preferences and usage patterns for a truly personalized experience.",
    icon: MemoryIcon
  },
]

// Icons
function BrainIcon(props: any) {
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
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-2.5 2.5H9a2.5 2.5 0 0 1-2.5-2.5V4.5A2.5 2.5 0 0 1 9 2h.5z" />
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 2.5 2.5h.5a2.5 2.5 0 0 0 2.5-2.5V4.5A2.5 2.5 0 0 0 15 2h-.5z" />
    </svg>
  )
}

function WorkflowIcon(props: any) {
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
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3Z" />
    </svg>
  )
}

function CopilotIcon(props: any) {
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
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" x2="12" y1="19" y2="22" />
    </svg>
  )
}

function MemoryIcon(props: any) {
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
      <rect width="16" height="20" x="4" y="2" rx="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01" />
      <path d="M16 6h.01" />
      <path d="M12 6h.01" />
      <path d="M8 10h.01" />
      <path d="M16 10h.01" />
      <path d="M12 10h.01" />
      <path d="M8 14h.01" />
      <path d="M16 14h.01" />
      <path d="M12 14h.01" />
    </svg>
  )
}
