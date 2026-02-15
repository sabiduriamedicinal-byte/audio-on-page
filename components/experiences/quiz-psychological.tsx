"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { MatrixRain } from "@/components/experiences/matrix-rain"

interface QuizPsychologicalProps {
  nextRoute: string
}

const QUESTIONS = [
  {
    question: "Cuando piensas en dejar tu trabajo, lo que más pesa es:",
    options: [
      { label: "A", text: "El dinero" },
      { label: "B", text: "El juicio de otros" },
      { label: "C", text: "No saber por dónde empezar" },
      { label: "D", text: "Todo a la vez" },
    ],
  },
  {
    question: "Lo que más has intentado hasta ahora fue:",
    options: [
      { label: "A", text: "Cursos o certificaciones" },
      { label: "B", text: "Redes sociales sin estructura" },
      { label: "C", text: "Cambios pequeños que no sostuviste" },
      { label: "D", text: "Todo… pero sin resultados reales" },
    ],
  },
  {
    question: "Cuando ayudas a otros, en el fondo sientes que:",
    options: [
      { label: "A", text: "Debería hacerlo gratis o como algo secundario" },
      { label: "B", text: "Aún no estoy listo para cobrar por esto" },
      { label: "C", text: "Me falta validación para tomarlo en serio" },
      { label: "D", text: "Esto es lo que haría si no tuviera miedo" },
    ],
  },
]

export function QuizPsychological({ nextRoute }: QuizPsychologicalProps) {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [showResult, setShowResult] = useState(false)

  const handleAnswer = () => {
    setTimeout(() => {
      if (currentQuestion < QUESTIONS.length - 1) {
        setCurrentQuestion(prev => prev + 1)
      } else {
        setShowResult(true)
      }
    }, 300)
  }

  const progress = ((currentQuestion + 1) / QUESTIONS.length) * 100

  if (showResult) {
    return (
      <div className="relative flex flex-col items-center justify-center min-h-screen bg-[#050505] p-6 overflow-hidden">
        <MatrixRain opacity={0.33} />

        <div className="relative z-10 w-full max-w-md space-y-8 text-center animate-in fade-in duration-700">
          <div className="space-y-4">
            <p className="text-white text-xl leading-relaxed">
              No fallaste por falta de talento.
            </p>
            <p className="text-white text-xl leading-relaxed">
              Elegiste rutas sin estructura.
            </p>
            <p className="text-primary glow-green text-xl leading-relaxed font-semibold pt-4">
              Eso tiene solución.
            </p>
          </div>

          <div className="pt-8">
            <Button
              onClick={() => router.push(nextRoute)}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 text-base glow-box"
            >
              SEGUIR
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const question = QUESTIONS[currentQuestion]

  return (
    <div className="relative flex flex-col min-h-screen bg-[#050505] p-6 overflow-hidden">
      <MatrixRain opacity={0.33} />

      {/* Progress */}
      <div className="relative z-10 w-full max-w-md mx-auto mb-8">
        <div className="h-1 bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-muted-foreground text-sm mt-2 text-center">
          {currentQuestion + 1} / {QUESTIONS.length}
        </p>
      </div>

      {/* Question */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center w-full max-w-md mx-auto">
        <h2 className="text-white text-xl md:text-2xl text-center mb-8 leading-relaxed">
          {question.question}
        </h2>

        {/* Options */}
        <div className="w-full space-y-3">
          {question.options.map((option, index) => (
            <Card
              key={index}
              onClick={handleAnswer}
              className="p-4 cursor-pointer border-border bg-card hover:bg-secondary hover:border-primary/50 transition-all duration-200 active:scale-[0.98]"
            >
              <div className="flex items-center gap-4">
                <span className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-primary font-mono text-sm font-bold">
                  {option.label}
                </span>
                <span className="text-card-foreground text-base break-words flex-1">
                  {option.text}
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
