import { InstagramLogin } from "@/components/experiences/instagram-login"

export default function Page() {
  return (
    <main className="min-h-screen bg-background">
      <InstagramLogin nextRoute="/feed" />
    </main>
  )
}
