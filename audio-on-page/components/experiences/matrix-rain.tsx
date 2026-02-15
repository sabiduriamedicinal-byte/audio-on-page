"use client"

import { useEffect, useRef } from "react"

interface MatrixRainProps {
  opacity?: number
}

export function MatrixRain({ opacity = 0.33 }: MatrixRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    // SOLO CARACTERES OCCIDENTALES
    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%&+-=*/<>?"

    // PATRONES NUMÉRICOS (se dibujan vertical)
    const numberPatterns = ["111", "2222", "3333", "444", "5555", "666", "7777", "888", "9999"]

    // FRASES CLAVE (se dibujan vertical, letra por letra)
    const phrases = [
      "RENUNCIA A TU TRABAJO",
      "VIVE DE TU PROPOSITO",
      "AYUDA A LA GENTE",
    ]

    const fontSize = 14
    const columns = Math.floor(canvas.width / fontSize)

    const drops: number[] = Array.from({ length: columns }, () =>
      Math.random() * -canvas.height / fontSize
    )

    const speeds: number[] = Array.from({ length: columns }, () =>
      0.3 + Math.random() * 0.7
    )

    const brightColumns = new Set<number>()
    for (let i = 0; i < Math.floor(columns * 0.08); i++) {
      brightColumns.add(Math.floor(Math.random() * columns))
    }

    const draw = () => {
      ctx.fillStyle = "rgba(5, 5, 5, 0.06)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < drops.length; i++) {
        const x = i * fontSize
        let y = drops[i] * fontSize

        const isBright = brightColumns.has(i)

        if (isBright) {
          ctx.shadowColor = "#22c55e"
          ctx.shadowBlur = 12
          ctx.fillStyle = "rgba(34,197,94,0.9)"
          ctx.font = `bold ${fontSize + 2}px monospace`
        } else {
          ctx.shadowColor = "transparent"
          ctx.shadowBlur = 0
          ctx.fillStyle = `rgba(34,197,94,${0.15 + Math.random() * 0.45})`
          ctx.font = `${fontSize}px monospace`
        }

        // 🔹 FRASES (muy raras)
        if (isBright && Math.random() < 0.002) {
          const phrase = phrases[Math.floor(Math.random() * phrases.length)]
          for (const letter of phrase) {
            ctx.fillText(letter, x, y)
            y += fontSize
          }
          drops[i] += speeds[i]
          continue
        }

        // 🔹 PATRONES NUMÉRICOS (verticales)
        if (Math.random() < 0.12) {
          const pattern = numberPatterns[Math.floor(Math.random() * numberPatterns.length)]
          for (const digit of pattern) {
            ctx.fillText(digit, x, y)
            y += fontSize
          }
          drops[i] += speeds[i]
          continue
        }

        // 🔹 CARACTER NORMAL
        const char = chars[Math.floor(Math.random() * chars.length)]
        ctx.fillText(char, x, y)

        // Glow en la cabeza
        if (y > 0 && y < canvas.height) {
          ctx.shadowColor = "#22c55e"
          ctx.shadowBlur = 20
          ctx.fillStyle = "rgba(34,197,94,0.95)"
          ctx.fillText(char, x, y)
          ctx.shadowBlur = 0
          ctx.shadowColor = "transparent"
        }

        drops[i] += speeds[i]

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = Math.random() * -20
          speeds[i] = 0.3 + Math.random() * 0.7
        }
      }

      animationId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ opacity, zIndex: 0 }}
      aria-hidden="true"
    />
  )
}
