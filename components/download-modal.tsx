"use client"

import { motion } from "framer-motion"
import { X, Download, Monitor, Smartphone, Tablet, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface DownloadModalProps {
  onClose: () => void
}

export function DownloadModal({ onClose }: DownloadModalProps) {
  const [selectedPlatform, setSelectedPlatform] = useState<string>("desktop")
  const [isDownloading, setIsDownloading] = useState(false)
  const [downloadProgress, setDownloadProgress] = useState(0)

  const platforms = [
    {
      id: "desktop",
      name: "Desktop",
      icon: Monitor,
      version: "v2.1.0",
      size: "4.2 GB",
      description: "Full-featured AetherOS for desktop computers",
    },
    {
      id: "mobile",
      name: "Mobile",
      icon: Smartphone,
      version: "v2.0.8",
      size: "1.8 GB",
      description: "Optimized AetherOS for mobile devices",
    },
    {
      id: "tablet",
      name: "Tablet",
      icon: Tablet,
      version: "v2.1.0",
      size: "3.1 GB",
      description: "Touch-optimized AetherOS for tablets",
    },
  ]

  const handleDownload = () => {
    setIsDownloading(true)
    setDownloadProgress(0)

    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsDownloading(false)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 200)
  }

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
        className="bg-slate-900/90 backdrop-blur-xl border border-blue-500/20 rounded-2xl p-8 max-w-2xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-white">Download AetherOS</h2>
          <Button onClick={onClose} variant="ghost" size="icon" className="text-slate-400 hover:text-white">
            <X className="w-6 h-6" />
          </Button>
        </div>

        <div className="space-y-4 mb-8">
          {platforms.map((platform) => (
            <motion.div
              key={platform.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className={`p-4 border rounded-xl cursor-pointer transition-all duration-300 ${
                selectedPlatform === platform.id
                  ? "border-blue-500 bg-blue-500/10"
                  : "border-slate-700 bg-slate-800/50 hover:border-blue-500/50"
              }`}
              onClick={() => setSelectedPlatform(platform.id)}
            >
              <div className="flex items-center space-x-4">
                <platform.icon className="w-8 h-8 text-blue-400" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-white">{platform.name}</h3>
                    <span className="text-sm text-slate-400">{platform.version}</span>
                  </div>
                  <p className="text-sm text-slate-300">{platform.description}</p>
                  <p className="text-xs text-slate-400 mt-1">Size: {platform.size}</p>
                </div>
                {selectedPlatform === platform.id && <CheckCircle className="w-6 h-6 text-blue-400" />}
              </div>
            </motion.div>
          ))}
        </div>

        {isDownloading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-slate-800/50 rounded-xl"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-white font-medium">Downloading...</span>
              <span className="text-blue-400">{Math.round(downloadProgress)}%</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 relative"
                initial={{ width: 0 }}
                animate={{ width: `${downloadProgress}%` }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
              </motion.div>
            </div>
          </motion.div>
        )}

        <div className="flex space-x-4">
          <Button
            onClick={handleDownload}
            disabled={isDownloading}
            className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 disabled:opacity-50"
          >
            <Download className="w-4 h-4 mr-2" />
            {isDownloading ? "Downloading..." : "Download Now"}
          </Button>
          <Button
            onClick={onClose}
            variant="outline"
            className="border-slate-600 text-slate-300 hover:text-white bg-transparent"
          >
            Cancel
          </Button>
        </div>

        <div className="mt-6 p-4 bg-slate-800/30 rounded-xl">
          <p className="text-xs text-slate-400 leading-relaxed">
            By downloading AetherOS, you agree to our Terms of Service and Privacy Policy. This is a beta release
            intended for testing and development purposes.
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}
