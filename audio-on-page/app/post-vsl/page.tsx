import { WhatsAppChat } from "@/components/experiences/whatsapp-chat"

const MESSAGES = [
  "Lo que sentiste viendo esto no es normal.",
  "Es lo que pasa cuando algo encaja por primera vez.",
  "Solo no ignores lo que ya entendiste."
]

export default function Page() {
  return (
    <main className="min-h-screen bg-background">
      <WhatsAppChat
        messages={MESSAGES}
        nextRoute="/login"
        buttonText="SEGUIR"
        hasAudioMessage
        audioDuration={15}
      />
    </main>
  )
}
