import { VideoFeed } from "@/components/experiences/video-feed"

export default function Page() {
  return (
    <main className="min-h-screen bg-background">
      <VideoFeed nextRoute="/oferta" />
    </main>
  )
}
