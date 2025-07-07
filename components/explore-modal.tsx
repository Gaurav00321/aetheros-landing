"use client"

import { motion } from "framer-motion"
import { X, Cpu, Brain, Zap, Shield, Layers, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ExploreModalProps {
  onClose: () => void
}

export function ExploreModal({ onClose }: ExploreModalProps) {
  const features = [
    {
      icon: Brain,
      title: "Adaptive Intelligence",
      description: "AI that learns your patterns and preferences to optimize your workflow",
    },
    {
      icon: Zap,
      title: "Quantum Processing",
      description: "Lightning-fast processing with quantum-inspired algorithms",
    },
    {
      icon: Shield,
      title: "Neural Security",
      description: "Advanced AI-powered security that evolves with emerging threats",
    },
    {
      icon: Layers,
      title: "Contextual Awareness",
      description: "Deep understanding of your work context and environment",
    },
    {
      icon: Globe,
      title: "Universal Compatibility",
      description: "Seamlessly integrates with all your existing tools and workflows",
    },
    {
      icon: Cpu,
      title: "Conscious Computing",
      description: "An OS that thinks, reasons, and makes intelligent decisions",
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="bg-slate-900/90 backdrop-blur-xl border border-blue-500/20 rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-white">Explore AetherOS</h2>
          <Button onClick={onClose} variant="ghost" size="icon" className="text-slate-400 hover:text-white">
            <X className="w-6 h-6" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group p-6 bg-slate-800/50 backdrop-blur-sm border border-blue-500/10 rounded-xl hover:border-blue-500/30 transition-all duration-300 hover:shadow-[0_0_20px_rgba(59,130,246,0.1)]"
            >
              <feature.icon className="w-8 h-8 text-blue-400 mb-4 group-hover:text-blue-300 transition-colors" />
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-slate-300 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8 p-6 bg-gradient-to-r from-blue-900/20 to-cyan-900/20 border border-blue-500/20 rounded-xl"
        >
          <h3 className="text-xl font-semibold text-white mb-3">Ready to Experience the Future?</h3>
          <p className="text-slate-300 mb-4">
            AetherOS represents the next evolution in operating systems, where artificial intelligence and human
            intuition work in perfect harmony.
          </p>
          <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500">
            Get Early Access
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
