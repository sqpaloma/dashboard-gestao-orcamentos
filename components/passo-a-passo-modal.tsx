"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

interface PassoAPassoModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  id: string
}

// Mapeamento de IDs para imagens de exemplo
// Na implementação real, isso seria substituído por imagens reais
const passoAPassoImages: Record<string, string[]> = {
  "1": [
    "/acessar-sistema-sankhya.png",
    "/passo-2-central-de-vendas.png",
    "/passo-3-orcamento.png",
    "/adicionar-pecas-orcamento.png",
  ],
  "2": [
    "/passo-1-registrar-aprovacao.png",
    "/placeholder.svg?height=400&width=600&query=Passo 2: Solicitar peças no Portal de Vendas",
    "/placeholder.svg?height=400&width=600&query=Passo 3: Atualizar status da Sub-OS",
  ],
  "3": [
    "/placeholder.svg?height=400&width=600&query=Passo 1: Alterar status para Faturamento",
    "/placeholder.svg?height=400&width=600&query=Passo 2: Explicar motivo da devolução",
    "/placeholder.svg?height=400&width=600&query=Passo 3: Solicitar Nota Fiscal de Retorno",
  ],
  "4": [
    "/placeholder.svg?height=400&width=600&query=Passo 1: Acessar Portal de Movimentação Interna",
    "/placeholder.svg?height=400&width=600&query=Passo 2: Selecionar peças para devolução",
    "/placeholder.svg?height=400&width=600&query=Passo 3: Confirmar devolução no sistema",
  ],
  "5": [
    "/placeholder.svg?height=400&width=600&query=Passo 1: Acessar Portal de Movimentação Interna",
    "/placeholder.svg?height=400&width=600&query=Passo 2: Selecionar TOP 99",
    "/placeholder.svg?height=400&width=600&query=Passo 3: Alterar cliente para Novak",
    "/placeholder.svg?height=400&width=600&query=Passo 4: Registrar motivo da baixa",
  ],
  // Adicione mais IDs conforme necessário
}

export function PassoAPassoModal({ isOpen, onClose, title, id }: PassoAPassoModalProps) {
  const [currentSlide, setCurrentSlide] = useState(0)

  // Obter imagens para o ID específico ou usar um array vazio se não existir
  const images = passoAPassoImages[id] || []

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold flex items-center justify-between">
            <span>{title}</span>
            <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        {images.length > 0 ? (
          <div className="relative">
            <div className="overflow-hidden rounded-md">
              <div className="relative aspect-video">
                <img
                  src={images[currentSlide] || "/placeholder.svg"}
                  alt={`Passo ${currentSlide + 1}`}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            <div className="absolute inset-y-0 left-0 flex items-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={prevSlide}
                className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </div>

            <div className="absolute inset-y-0 right-0 flex items-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={nextSlide}
                className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              {images.map((_, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="icon"
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 w-2 rounded-full ${currentSlide === index ? "bg-primary" : "bg-muted"}`}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="py-8 text-center">
            <p>Imagens não disponíveis para este passo a passo.</p>
          </div>
        )}

        <div className="flex justify-between items-center mt-4">
          <div className="text-sm text-muted-foreground">
            {images.length > 0 ? `Passo ${currentSlide + 1} de ${images.length}` : ""}
          </div>
          <Button onClick={onClose}>Fechar</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
