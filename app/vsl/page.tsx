import { VSLPlayer } from "@/components/experiences/vsl-player"

export default function Page() {
  return (
    <main className="min-h-screen bg-background">
      <VSLPlayer nextRoute="/post-vsl" />
    </main>
  )
}
