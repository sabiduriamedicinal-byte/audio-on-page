"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Phone, Mic, Volume2, Video } from "lucide-react"
import { MatrixRain } from "@/components/experiences/matrix-rain"

const CALL_CUTOFF_TIME = 33 // momento exacto donde termina la frase
const END_SCREEN_DURATION = 4000 // 4 segundos para que suene TU TU TU

interface CallInterfaceProps {
  nextRoute: string
}

export function CallInterface({ nextRoute }: CallInterfaceProps) {
  const router = useRouter()
  const [phase, setPhase] = useState<"incoming" | "active" | "ended">("incoming")
  const [elapsed, setElapsed] = useState(0)
  const [fadeOut, setFadeOut] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const goNext = useCallback(() => {
    router.push(nextRoute)
  }, [router, nextRoute])

  /* =============================
     RINGTONE (incoming)
  ============================== */
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    if (phase !== "incoming") return

    const tryPlay = () => {
      audio.play().catch(() => {})
    }

    tryPlay()

    const handleInteraction = () => {
      if (audio.paused) tryPlay()
      document.removeEventListener("touchstart", handleInteraction)
      document.removeEventListener("click", handleInteraction)
    }

    document.addEventListener("touchstart", handleInteraction, { once: true })
    document.addEventListener("click", handleInteraction, { once: true })

    return () => {
      document.removeEventListener("touchstart", handleInteraction)
      document.removeEventListener("click", handleInteraction)
    }
  }, [phase])

  /* =============================
     ACTIVE CALL TIMER
  ============================== */
  useEffect(() => {
    if (phase !== "active") return

    const interval = setInterval(() => {
      setElapsed(prev => {
        const next = prev + 1

        if (next >= CALL_CUTOFF_TIME) {
          setPhase("ended")
          return CALL_CUTOFF_TIME // congela en 33
        }

        return next
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [phase])

  /* =============================
     END SCREEN (4s TU TU TU)
  ============================== */
  useEffect(() => {
    if (phase !== "ended") return

    const fadeTimer = setTimeout(() => {
      setFadeOut(true)
    }, END_SCREEN_DURATION - 700)

    const routeTimer = setTimeout(() => {
      goNext()
    }, END_SCREEN_DURATION)

    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(routeTimer)
    }
  }, [phase, goNext])

  const formatTime = (s: number) =>
    `00:${s.toString().padStart(2, "0")}`

  return (
    <div
      className={`relative min-h-screen bg-[#0a0a0a] overflow-hidden transition-opacity duration-700 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <audio
        ref={audioRef}
        src="/voz-llamada.mp3" 
        playsInline
        preload="auto"
        autoPlay={phase === "active"}
      />

      <MatrixRain opacity={0.15} />

      {/* BLOQUE SUPERIOR */}
      <div className="relative z-10 pt-10 flex flex-col items-center text-center space-y-2 px-4">
        <p className="text-white text-sm font-medium tracking-widest uppercase break-words drop-shadow-[0_0_6px_rgba(255,255,255,0.35)]">
          {phase === "incoming"
            ? "Llamada entrante"
            : phase === "active"
            ? "Llamada en curso"
            : "Llamada finalizada"}
        </p>

        <div className="h-8">
          {phase === "active" && (
            <p className="text-white text-2xl font-mono break-words drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]">
              {formatTime(elapsed)}
            </p>
          )}
        </div>

        <div className="pt-6 flex flex-col items-center space-y-4">
          <div className="relative">
            {phase !== "ended" && (
              <>
                <div className="absolute -inset-3 rounded-full border-2 border-primary/40 animate-ping" />
                <div className="absolute -inset-3 rounded-full border border-primary/20 animate-pulse" />
              </>
            )}

            <Avatar className="h-32 w-32 border-2 border-primary glow-box">
              <AvatarImage src="/tony-avatar.png" alt="Tony" />
              <AvatarFallback>T</AvatarFallback>
            </Avatar>
          </div>

          <h2 className="text-white text-2xl font-semibold break-words drop-shadow-[0_0_6px_rgba(255,255,255,0.35)]">
            Tony
          </h2>
        </div>
      </div>

      {/* PARTE INFERIOR */}
      <div className="absolute bottom-24 w-full flex justify-center z-10 px-4">
        {phase === "incoming" && (
          <Button
            onClick={() => {
              if (audioRef.current) {
                audioRef.current.currentTime = 0
                audioRef.current.play().catch(() => {})
              }
              setPhase("active")
            }}
            className="px-14 py-5 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg tracking-normal glow-box flex items-center gap-2"
          >
            <Phone className="h-5 w-5" />
            CONTESTAR
          </Button>
        )}

        {phase === "active" && (
          <div className="flex gap-10 opacity-70">
            <Mic className="h-6 w-6 text-white" />
            <Volume2 className="h-6 w-6 text-white" />
            <Video className="h-6 w-6 text-white" />
          </div>
        )}
      </div>
    </div>
  )
}
