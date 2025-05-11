import { ManualContent } from "@/components/manual-content"

export default function ManualPage() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-8">
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold mb-2">Manual do Departamento</h1>
            <p className="text-muted-foreground">Consultores de Serviços – Engenharia</p>
          </div>
        </div>
        <ManualContent />
      </div>
    </main>
  )
}
