"use client"

import { useState } from "react"
import { PassoAPassoModal } from "./passo-a-passo-modal"

interface PassoAPassoProps {
  children: string
  id: string
}

export function PassoAPasso({ children, id }: PassoAPassoProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Função para encontrar e destacar "passo a passo" ou "passo-a-passo" no texto
  const highlightPassoAPasso = (text: string) => {
    // Regex para encontrar variações de "passo a passo" com ou sem hífen, case insensitive
    const regex = /(passo[- ]a[- ]passo)(\s+\d+)?/gi

    // Dividir o texto em partes, alternando entre texto normal e "passo a passo"
    const parts = text.split(regex)

    if (parts.length === 1) {
      return text
    }

    return parts.map((part, index) => {
      // Verificar se a parte atual corresponde ao padrão "passo a passo"
      if (part && part.toLowerCase().match(/^passo[- ]a[- ]passo/)) {
        // Extrair o número, se houver
        const numMatch = parts[index + 1]?.trim()
        const displayText = numMatch ? `${part} ${numMatch}` : part

        return (
          <button key={index} onClick={() => setIsModalOpen(true)} className="text-primary hover:underline font-medium">
            {displayText}
          </button>
        )
      } else if (index % 3 !== 0) {
        // Pular as partes que são capturadas pelo grupo de regex mas não são o texto principal
        return null
      } else {
        return part
      }
    })
  }

  return (
    <>
      <span>{highlightPassoAPasso(children)}</span>
      <PassoAPassoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`Passo a Passo ${id}`}
        id={id}
      />
    </>
  )
}
