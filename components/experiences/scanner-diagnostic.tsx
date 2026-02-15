"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { MatrixRain } from "./matrix-rain"

interface ScannerDiagnosticProps {
  nextRoute: string
}

const TEXT_STEPS = [
  { time: 0, text: "Inicializando protocolo interno..." },
  { time: 1.5, text: "Sincronizando identidad vocacional..." },
  { time: 3, text: "Leyendo memoria emocional..." },
  { time: 4.5, text: "Detectando patrones heredados..." },
  { time: 6, text: "Analizando conflicto proposito / sistema..." },
  { time: 7.5, text: "Buscando coherencia interna..." },
  { time: 9, text: "Diagnostico completo" },
]

const TOTAL_DURATION = 10

export function ScannerDiagnostic({ nextRoute }: ScannerDiagnosticProps) {
  const router = useRouter()
  const [elapsedTime, setElapsedTime] = useState(0)
  const [showResult, setShowResult] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime(prev => {
        if (prev >= TOTAL_DURATION) {
          clearInterval(interval)
          return TOTAL_DURATION
        }
        return +(prev + 0.1).toFixed(1)
      })
    }, 100)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (elapsedTime >= 8) setShowResult(true)
  }, [elapsedTime])

  const currentText =
    [...TEXT_STEPS]
      .reverse()
      .find(step => elapsedTime >= step.time)?.text || TEXT_STEPS[0].text

  const easedProgress = Math.pow(elapsedTime / TOTAL_DURATION, 0.85)
  const displayPercent = Math.min(100, Math.floor(easedProgress * 100))

  const totalBars = 13
  const filledBars = Math.round((displayPercent / 100) * totalBars)
  const barVisual =
    "[" + "\u2588".repeat(filledBars) + "\u2591".repeat(totalBars - filledBars) + "]"

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#050505] p-6 font-mono relative overflow-hidden">
      <MatrixRain opacity={0.33} />
      <div className="relative z-10 w-full flex flex-col items-center justify-center">
        {!showResult ? (
          <div className="w-full max-w-md space-y-8 text-center">
            <div className="text-primary glow-green text-xl tracking-wider">
              {barVisual} {displayPercent}%
            </div>

            <p className="text-primary glow-green text-lg transition-opacity duration-500">
              {currentText}
            </p>

            <div className="space-y-1 opacity-30">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="h-px bg-primary/50"
                  style={{
                    animation: `pulse 3s ease-in-out infinite`,
                    animationDelay: `${i * 0.4}s`,
                  }}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="w-full max-w-md space-y-8 text-center animate-in fade-in duration-700">
            <div className="space-y-4">
              <h1 className="text-primary glow-green text-2xl md:text-3xl font-bold tracking-wider">
                PROPÓSITO ACTIVO
              </h1>
              <div className="text-primary/80 text-xl">—</div>
              <h2 className="text-red-500 glow-red text-xl md:text-2xl font-bold tracking-wider">
                SISTEMA INCORRECTO
              </h2>
            </div>

            <div className="space-y-2 pt-4">
              <p className="text-white text-base">
                TIENES EL DON DE AYUDAR.
              </p>
              <p className="text-white text-base">
                SOLO ESTÁS ATRAPADO EN TU TRABAJO
              </p>
            </div>

            <div className="pt-6 animate-in fade-in slide-in-from-bottom-4 duration-400">
              <Button
                onClick={() => router.push(nextRoute)}
                className="w-full bg-[#00ff88] hover:bg-[#00ff88]/90 text-black font-semibold py-6 text-base shadow-[0_0_25px_rgba(0,255,136,0.9)]"
              >
                TEST DE ESCAPE
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
