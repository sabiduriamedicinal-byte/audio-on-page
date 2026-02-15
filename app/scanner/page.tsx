import { ScannerDiagnostic } from "@/components/experiences/scanner-diagnostic"

export default function Page() {
  return (
    <main className="min-h-screen bg-background">
      <ScannerDiagnostic nextRoute="/quiz" />
    </main>
  )
}
