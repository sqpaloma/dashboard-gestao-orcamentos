"use client"

import { useState } from "react"
import { TextoReferenciaModal } from "./texto-referencia-modal"

interface TextoReferenciaProps {
  children: string
  id: string
}

export function TextoReferencia({ children, id }: TextoReferenciaProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Função para encontrar e destacar "Texto X" ou "Texto X - Anexos" no texto
  const highlightTextoReferencia = (text: string) => {
    // Regex para encontrar padrões como "Texto 1", "Texto 1 - Anexos", etc.
    const regex = /(texto\s+\d+)(?:\s*[-–]\s*anexos?)?/gi

    // Dividir o texto em partes, alternando entre texto normal e "Texto X"
    const parts = text.split(regex)

    if (parts.length === 1) {
      return text
    }

    return parts.map((part, index) => {
      // Verificar se a parte atual corresponde ao padrão "Texto X"
      if (part && part.toLowerCase().match(/^texto\s+\d+/)) {
        return (
          <button key={index} onClick={() => setIsModalOpen(true)} className="text-primary hover:underline font-medium">
            {part}
          </button>
        )
      } else {
        return part
      }
    })
  }

  return (
    <>
      <span>{highlightTextoReferencia(children)}</span>
      <TextoReferenciaModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={`Texto ${id}`} id={id} />
    </>
  )
}
