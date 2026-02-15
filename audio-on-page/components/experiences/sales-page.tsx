"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Crown, Check } from "lucide-react"

export function SalesPage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

  const handleSelect = (plan: 'normal' | 'vip') => {
    setSelectedPlan(plan)
    // In production, redirect to checkout
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="px-6 py-16 md:py-24 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight text-balance">
            Dejar tu trabajo no es el primer paso.
            <br />
            <span className="text-primary glow-green">Ordenar tu vocacion si.</span>
          </h1>
        </div>
      </section>

      {/* Opening */}
      <section className="px-6 py-12 bg-card/50">
        <div className="max-w-2xl mx-auto space-y-4 text-center">
          <p className="text-lg text-foreground">No odias tu trabajo.</p>
          <p className="text-lg text-foreground">Pero cada domingo pesa mas.</p>
          <p className="text-lg text-foreground">Y no es cansancio.</p>
          <p className="text-xl text-primary glow-green font-semibold">Es incoherencia.</p>
        </div>
      </section>

      {/* Villain */}
      <section className="px-6 py-12">
        <div className="max-w-2xl mx-auto space-y-4 text-center">
          <p className="text-lg text-foreground">Te ensenaron que ayudar no da dinero.</p>
          <p className="text-lg text-foreground">Que la seguridad es quedarse.</p>
          <p className="text-lg text-foreground">Que sentir vocacion es un hobby, no una profesion.</p>
        </div>
      </section>

      {/* Revelation */}
      <section className="px-6 py-12 bg-card/50">
        <div className="max-w-2xl mx-auto space-y-4 text-center">
          <p className="text-xl text-primary glow-green font-semibold">No fallaste.</p>
          <p className="text-lg text-foreground">
            Intentaste crecer con modelos que no fueron creados para personas empaticas.
          </p>
        </div>
      </section>

      {/* Mechanism */}
      <section className="px-6 py-12">
        <div className="max-w-2xl mx-auto space-y-6 text-center">
          <p className="text-lg text-foreground">
            Existe una ruta estructurada para comenzar a vivir del acompanamiento emocional.
          </p>
          <p className="text-lg text-foreground">No empieza con redes.</p>
          <p className="text-xl text-primary glow-green font-semibold">
            Empieza con orden interno y sistema.
          </p>
        </div>
      </section>

      {/* Proof */}
      <section className="px-6 py-12 bg-card/50">
        <div className="max-w-2xl mx-auto space-y-4 text-center">
          <p className="text-lg text-foreground">No somos gurus.</p>
          <p className="text-lg text-foreground">
            Somos personas que salieron del mismo sistema
          </p>
          <p className="text-lg text-foreground">
            y ahora acompanan a otros a hacerlo.
          </p>
        </div>
      </section>

      {/* OFFERS */}
      <section className="px-6 py-16" id="ofertas">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">

          {/* NORMAL */}
          <Card className="p-6 bg-card border-border hover:border-primary/50 transition-colors space-y-6">
            <h3 className="text-xl font-bold text-foreground">Inmersion en vivo</h3>

            <div className="space-y-3">
              {[
                "Inmersion en vivo de 2 dias",
                "Demostracion en vivo",
                "Ordenar tu vocacion en una ruta realista y sostenible",
                "Pasos concretos para salir del trabajo convencional"
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0" strokeWidth={2} />
                  <p className="text-foreground">{item}</p>
                </div>
              ))}
            </div>

            <div className="space-y-1 pt-4">
              <p className="text-muted-foreground line-through">$67</p>
              <p className="text-4xl font-bold text-primary glow-green">$19</p>
            </div>

            <Button
              onClick={() => handleSelect('normal')}
              variant="outline"
              className="w-full py-6 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              Acceder
            </Button>
          </Card>

          {/* VIP */}
          <Card className="p-6 bg-card border-accent glow-box-accent relative space-y-6">
            <div className="absolute top-3 right-3 flex items-center gap-1 bg-accent/20 px-2 py-1 rounded-full">
              <Crown className="h-4 w-4 text-accent" />
              <span className="text-xs font-semibold text-accent">VIP</span>
            </div>

            <div className="flex items-center gap-2">
              <Crown className="h-5 w-5 text-accent" />
              <h3 className="text-xl font-bold text-foreground">{"VIP \u2014 Acceso exclusivo"}</h3>
            </div>

            <div className="space-y-3">
              {[
                "Inmersion en vivo de 2 dias",
                "Demostracion en vivo",
                "Ordenar tu vocacion en una ruta realista y sostenible",
                "Pasos concretos para salir del trabajo convencional",
                "Espacio intimo de preguntas y respuestas",
                "Tecnicas adicionales"
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-accent flex-shrink-0" strokeWidth={2} />
                  <p className="text-foreground">{item}</p>
                </div>
              ))}
            </div>

            <div className="space-y-1 pt-4">
              <p className="text-muted-foreground line-through">$97</p>
              <p className="text-4xl font-bold text-accent">$49</p>
            </div>

            <Button
              onClick={() => handleSelect('vip')}
              className="w-full py-6 bg-accent hover:bg-accent/90 text-accent-foreground glow-box-accent"
            >
              Acceder VIP
            </Button>
          </Card>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 py-16 bg-card/50">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground text-center mb-8">Preguntas frecuentes</h2>
          <Accordion type="single" collapsible className="space-y-2">
            <AccordionItem value="1" className="border-border bg-card px-4 rounded-lg">
              <AccordionTrigger>{"Necesito ser terapeuta o profesional?"}</AccordionTrigger>
              <AccordionContent>No.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="2" className="border-border bg-card px-4 rounded-lg">
              <AccordionTrigger>{"Necesito seguidores o presencia en redes?"}</AccordionTrigger>
              <AccordionContent>No.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="3" className="border-border bg-card px-4 rounded-lg">
              <AccordionTrigger>{"Y si ya lo intente y no funciono?"}</AccordionTrigger>
              <AccordionContent>Entonces este es el primer paso bien disenado.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="4" className="border-border bg-card px-4 rounded-lg">
              <AccordionTrigger>{"Y si renuncie a mi trabajo?"}</AccordionTrigger>
              <AccordionContent>Si tienes el proposito genuino de ayudar a otros, esto es para ti.</AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* CTA Final */}
      <section className="px-6 py-16">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <p className="text-lg text-foreground">Seguir donde estas tambien es una decision.</p>
          <p className="text-lg text-foreground">La pregunta es:</p>
          <p className="text-xl text-primary glow-green font-semibold">{"Te esta costando demasiado?"}</p>
          <div className="pt-4">
            <Button
              onClick={() => {
                document.getElementById('ofertas')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 px-12 text-base glow-box"
            >
              Accede ahora
            </Button>
          </div>
        </div>
      </section>

      {/* Sticky CTA Mobile */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/90 backdrop-blur-sm border-t border-border md:hidden z-50">
        <Button
          onClick={() => {
            document.getElementById('ofertas')?.scrollIntoView({ behavior: 'smooth' })
          }}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-5 text-base glow-box"
        >
          Accede ahora
        </Button>
      </div>

      {/* Bottom spacer for sticky CTA */}
      <div className="h-20 md:hidden" />

      {selectedPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-6">
          <Card className="p-8 max-w-sm w-full bg-card border-border text-center space-y-4">
            <p className="text-foreground text-xl font-semibold">
              Plan seleccionado: {selectedPlan === 'vip' ? 'VIP' : 'Normal'}
            </p>
            <p className="text-muted-foreground">
              Redirigiendo al checkout...
            </p>
            <Button
              variant="ghost"
              onClick={() => setSelectedPlan(null)}
              className="text-muted-foreground"
            >
              Cerrar
            </Button>
          </Card>
        </div>
      )}
    </div>
  )
}
