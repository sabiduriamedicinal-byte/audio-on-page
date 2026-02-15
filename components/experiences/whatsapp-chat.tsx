"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Phone, Video, MoreVertical, Play, Pause } from "lucide-react"

interface WhatsAppChatProps {
  messages: string[]
  nextRoute: string
  buttonText?: string
  hasAudioMessage?: boolean
  audioDuration?: number
}

export function WhatsAppChat({ messages, nextRoute, buttonText = "CONTINUAR", hasAudioMessage = false, audioDuration = 15 }: WhatsAppChatProps) {
  const router = useRouter()
  const [visibleMessages, setVisibleMessages] = useState<string[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [showSeen, setShowSeen] = useState(false)
  const [showButton, setShowButton] = useState(false)
  const [showAudio, setShowAudio] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [audioProgress, setAudioProgress] = useState(0)
  const audioIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const chatEndRef = useRef<HTMLDivElement>(null)
  const notifAudioRef = useRef<HTMLAudioElement | null>(null)

  // Pre-load notification sound
  useEffect(() => {
    const audio = new Audio("/sonido-whatsapp.mp3")
    audio.preload = "auto"
    notifAudioRef.current = audio
  }, [])

  const onComplete = () => {
    router.push(nextRoute)
  }

  const scrollToBottom = useCallback(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])

  const toggleAudio = useCallback(() => {
    if (isPlaying) {
      setIsPlaying(false)
      if (audioIntervalRef.current) clearInterval(audioIntervalRef.current)
    } else {
      setIsPlaying(true)
      const step = 100 / (audioDuration * 10)
      audioIntervalRef.current = setInterval(() => {
        setAudioProgress(prev => {
          if (prev >= 100) {
            setIsPlaying(false)
            if (audioIntervalRef.current) clearInterval(audioIntervalRef.current)
            return 0
          }
          return prev + step
        })
      }, 100)
    }
  }, [isPlaying, audioDuration])

  useEffect(() => {
    return () => {
      if (audioIntervalRef.current) clearInterval(audioIntervalRef.current)
    }
  }, [])

  useEffect(() => {
    if (currentIndex >= messages.length) {
      if (hasAudioMessage) {
        setIsTyping(true)
        const audioTimer = setTimeout(() => {
          setIsTyping(false)
          setShowAudio(true)
          if (notifAudioRef.current) {
            notifAudioRef.current.currentTime = 0
            notifAudioRef.current.play().catch(() => {})
          }
          setTimeout(() => scrollToBottom(), 100)
          setTimeout(() => setShowButton(true), 1500)
        }, 3000)
        return () => clearTimeout(audioTimer)
      }
      setShowButton(true)
      return
    }

    setIsTyping(true)

    const typingTimer = setTimeout(() => {
      setIsTyping(false)
      setVisibleMessages(prev => [...prev, messages[currentIndex]])

      // Play WhatsApp notification sound
      if (notifAudioRef.current) {
        notifAudioRef.current.currentTime = 0
        notifAudioRef.current.play().catch(() => {})
      }

      if (currentIndex === 0) {
        setShowSeen(true)
        setTimeout(() => setShowSeen(false), 1500)
      }

      setTimeout(() => scrollToBottom(), 100)
      setCurrentIndex(prev => prev + 1)
    }, 3000)

    return () => clearTimeout(typingTimer)
  }, [currentIndex, messages, hasAudioMessage, scrollToBottom])

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
    const s = Math.floor(seconds % 60)
    return `${m}:${s.toString().padStart(2, "0")}`
  }

  const currentTime = formatTime((audioProgress / 100) * audioDuration)
  const totalTime = formatTime(audioDuration)

  return (
    <div className="flex flex-col h-screen bg-[#0b141a] min-w-[320px]">
      {/* Header */}
      <header className="flex items-center gap-3 px-3 py-2 bg-[#075E54] border-b border-[#064d44]">
        <Button variant="ghost" size="icon" className="text-[#8696a0] hover:bg-[#2a373f] p-0 h-8 w-8">
          <ChevronLeft className="h-6 w-6" />
        </Button>

        <Avatar className="h-10 w-10 border border-[#2a373f]">
          <AvatarImage src="/tony-avatar.png" alt="Tony" />
        </Avatar>

        <div className="flex-1 min-w-0">
          <h1 className="text-[#e9edef] font-medium text-base truncate">Tony</h1>
          <p className="text-[#8696a0] text-xs">en linea</p>
        </div>

        <div className="flex items-center gap-4">
          <Video className="h-5 w-5 text-[#8696a0]" />
          <Phone className="h-5 w-5 text-[#8696a0]" />
          <MoreVertical className="h-5 w-5 text-[#8696a0]" />
        </div>
      </header>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto px-3 py-4">
        {visibleMessages.map((message, index) => (
          <div key={index} className="flex justify-start mb-2">
            <div className="w-[85%] bg-[#1f2c34] rounded-lg rounded-tl-none px-3 py-1.5 shadow-sm">
              <p className="text-[#e9edef] text-sm leading-snug break-words">
                {message}
              </p>
              <div className="flex justify-end mt-0.5">
                <span className="text-[#8696a0] text-[10px]">
                  {new Date().toLocaleTimeString("es-ES", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          </div>
        ))}

        {/* Audio Message */}
        {showAudio && (
          <div className="flex justify-start animate-in fade-in slide-in-from-bottom-2 duration-300 w-full mb-2">
            <div className="w-[92%] bg-[#1f2c34] rounded-lg rounded-tl-none px-3 py-2.5 shadow-sm">
              <div className="flex items-center gap-3">
                <button
                  onClick={toggleAudio}
                  type="button"
                  className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-[#8696a0] hover:text-[#e9edef] transition-colors"
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6 fill-current" />
                  ) : (
                    <Play className="w-6 h-6 fill-current" />
                  )}
                </button>

                <div className="flex-1 flex flex-col gap-1 min-w-0">
                  <div className="relative h-6 flex items-center">
                    <div className="flex items-center gap-[1.5px] w-full h-full">
                      {Array.from({ length: 50 }).map((_, i) => {
                        const heights = [2, 4, 3, 7, 4, 2, 5, 3, 8, 5, 3, 10, 4, 2, 6, 8, 3, 5, 12, 4, 3, 7, 5, 2, 9, 6, 3, 11, 4, 2, 7, 5, 8, 3, 6, 10, 4, 2, 5, 8, 3, 7, 4, 9, 5, 2, 6, 11, 3, 4]
                        const barProgress = (i / 50) * 100
                        const isActive = barProgress <= audioProgress
                        return (
                          <div
                            key={i}
                            className="flex-1 rounded-full transition-colors duration-150"
                            style={{
                              height: `${heights[i % heights.length]}px`,
                              backgroundColor: isActive ? "#34B7F1" : "#3b4a54",
                            }}
                          />
                        )
                      })}
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-[10px] text-[#8696a0]">
                      {isPlaying ? currentTime : totalTime}
                    </span>
                    <span className="text-[10px] text-[#8696a0]">
                      {new Date().toLocaleTimeString("es-ES", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>

                <div className="relative flex-shrink-0">
                  <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-[#2a373f]">
                    <img src="/tony-avatar.png" alt="Tony" className="w-full h-full object-cover" />
                  </div>

                  <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full bg-[#1f2c34] flex items-center justify-center">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path d="M12 1C10.34 1 9 2.34 9 4V12C9 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12V4C15 2.34 13.66 1 12 1Z" fill="#34B7F1"/>
                      <path d="M17 12C17 14.76 14.76 17 12 17C9.24 17 7 14.76 7 12H5C5 15.53 7.61 18.43 11 18.93V22H13V18.93C16.39 18.43 19 15.53 19 12H17Z" fill="#34B7F1"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {isTyping && (
          <div className="flex justify-start mb-2">
            <div className="bg-[#1f2c34] rounded-lg rounded-tl-none px-4 py-3">
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 bg-[#8696a0] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 bg-[#8696a0] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 bg-[#8696a0] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      <div className="p-4 bg-[#0b141a] border-t border-[#2a373f]">
        {showButton ? (
          <Button
            onClick={onComplete}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 text-base glow-box"
          >
            {buttonText}
          </Button>
        ) : (
          <div className="h-14 flex items-center justify-center">
            <span className="text-[#8696a0] text-sm">escribiendo...</span>
          </div>
        )}
      </div>
    </div>
  )
}
