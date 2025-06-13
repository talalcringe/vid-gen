"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface VideoPlayerProps {
  videoUrl: string
}

export function VideoPlayer({ videoUrl }: VideoPlayerProps) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [videoUrl])

  return (
    <div className="w-full aspect-video rounded-lg overflow-hidden bg-black/50 relative">
      {isLoading ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <motion.video
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          src={videoUrl}
          controls
          className="w-full h-full object-cover"
        />
      )}
    </div>
  )
}
