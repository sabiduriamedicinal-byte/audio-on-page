"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Play, Loader2 } from "lucide-react"
import { MatrixRain } from "@/components/experiences/matrix-rain"

interface VSLPlayerProps {
  nextRoute: string
}

export function VSLPlayer({ nextRoute }: VSLPlayerProps) {
  const router = useRouter()
  const videoRef = useRef<HTMLVideoElement | null>(null)

  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handlePlay = () => {
    if (!videoRef.current) return

    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
      videoRef.current?.play()
      setIsPlaying(true)
    }, 1200)
  }

  return (
    <div className="fixed inset-0 w-screen h-screen bg-black overflow-hidden">
      
      {/* Matrix background */}
      <MatrixRain opacity={0.25} />

      {/* Video Fullscreen */}
      <video
        ref={videoRef}
        src="/video.mp4" // 🔥 CAMBIA ESTO POR TU VIDEO
        className="absolute inset-0 w-full h-full object-cover"
        playsInline
      />

      {/* Overlay de interacción */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 z-20">
          
          {!isLoading && (
            <button
              onClick={handlePlay}
              className="w-24 h-24 rounded-full bg-primary hover:bg-primary/90 flex items-center justify-center transition-transform hover:scale-110 glow-box"
            >
              <Play className="w-12 h-12 text-primary-foreground ml-1" fill="currentColor" />
            </button>
          )}

          {isLoading && (
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="h-12 w-12 text-primary animate-spin" />
              <p className="text-primary text-sm font-mono glow-green">
                Cargando...
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
