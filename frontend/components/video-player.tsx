"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface VideoPlayerProps {
  videoUrl: string
  isMock?: boolean
  mockReason?: string
}

export function VideoPlayer({ videoUrl, isMock, mockReason }: VideoPlayerProps) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [videoUrl])

  return (
    <div className="w-full">
      {isMock && mockReason && (
        <div className="mb-2 p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg text-amber-400 text-sm">
          <p className="font-medium">Note: This is a mock video</p>
          <p className="text-amber-300/80">Reason: {mockReason}</p>
        </div>
      )}
      
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
    </div>
  )
}
