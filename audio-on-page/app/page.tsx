"use client"

import { CallInterface } from "@/components/experiences/call-interface"

export default function Page() {
  return (
    <main className="min-h-screen bg-background">
      <CallInterface nextRoute="/scanner" duration={90} />
    </main>
  )
}
