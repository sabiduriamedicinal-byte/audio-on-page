"use client"

import React, { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { ChevronUp } from "lucide-react"
import { MatrixRain } from "@/components/experiences/matrix-rain"

interface InstagramLoginProps {
  nextRoute: string
}

export function InstagramLogin({ nextRoute }: InstagramLoginProps) {
  const router = useRouter()
  const [dragY, setDragY] = useState(0)
  const startY = useRef(0)
  const isDragging = useRef(false)

  const goNext = () => router.push(nextRoute)

  const handleTouchStart = (e: React.TouchEvent) => {
    startY.current = e.touches[0].clientY
    isDragging.current = true
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return
    const currentY = e.touches[0].clientY
    const diff = startY.current - currentY
    if (diff > 0) {
      setDragY(Math.min(diff, 200))
    }
  }

  const handleTouchEnd = () => {
    isDragging.current = false
    if (dragY > 100) {
      goNext()
    } else {
      setDragY(0)
    }
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    startY.current = e.clientY
    isDragging.current = true
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return
    const diff = startY.current - e.clientY
    if (diff > 0) {
      setDragY(Math.min(diff, 200))
    }
  }

  const handleMouseUp = () => {
    isDragging.current = false
    if (dragY > 100) {
      goNext()
    } else {
      setDragY(0)
    }
  }

  return (
    <div
      className="relative flex flex-col items-center justify-center min-h-screen bg-background p-6 select-none cursor-grab active:cursor-grabbing overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Matrix background */}
      <MatrixRain opacity={0.33} />

      {/* Content */}
      <div
        className="relative z-10 w-full max-w-sm text-center space-y-8 transition-transform duration-200"
        style={{ transform: `translateY(-${dragY}px)` }}
      >
        {/* Lock Icon */}
        <div className="w-20 h-20 mx-auto rounded-full border-2 border-primary flex items-center justify-center glow-box">
          <div className="w-8 h-8 border-2 border-primary rounded-sm relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-6 h-5 border-2 border-primary rounded-t-full border-b-0" />
          </div>
        </div>

        {/* Text */}
        <div className="space-y-4">
          <p className="text-primary glow-green text-xl font-semibold">
            Acceso privado generado.
          </p>
          <p className="text-white text-lg">
  Este contenido no es publico.
</p>

          <p className="text-foreground text-lg font-medium pt-4">
            Desliza.
          </p>
        </div>

        {/* Swipe Indicator */}
        <div className="pt-8">
          <div className="flex flex-col items-center gap-2 animate-bounce">
            <ChevronUp className="h-6 w-6 text-primary" />
            <ChevronUp className="h-6 w-6 text-primary/60 -mt-4" />
            <ChevronUp className="h-6 w-6 text-primary/30 -mt-4" />
          </div>
        </div>

        {/* Progress Indicator */}
        {dragY > 0 && (
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2">
            <div className="w-32 h-1 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all"
                style={{ width: `${(dragY / 100) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
