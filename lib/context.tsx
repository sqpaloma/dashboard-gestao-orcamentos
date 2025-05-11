"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export interface Orcamento {
  data: string
  responsavel: string
  status: string
  valor: number
}

interface OrcamentosContextType {
  orcamentos: Orcamento[]
  setOrcamentos: (orcamentos: Orcamento[]) => void
}

const OrcamentosContext = createContext<OrcamentosContextType | undefined>(undefined)

export function OrcamentosProvider({ children }: { children: ReactNode }) {
  const [orcamentos, setOrcamentos] = useState<Orcamento[]>([])

  // Persistir dados no localStorage (apenas no cliente)
  useEffect(() => {
    // Carregar dados do localStorage na inicialização
    const savedOrcamentos = localStorage.getItem("orcamentos")
    if (savedOrcamentos) {
      try {
        setOrcamentos(JSON.parse(savedOrcamentos))
      } catch (error) {
        console.error("Erro ao carregar orçamentos:", error)
      }
    }
  }, [])

  // Salvar dados no localStorage quando mudam
  useEffect(() => {
    if (orcamentos.length > 0) {
      localStorage.setItem("orcamentos", JSON.stringify(orcamentos))
    }
  }, [orcamentos])

  const handleSetOrcamentos = (newOrcamentos: Orcamento[]) => {
    setOrcamentos(newOrcamentos || [])
  }

  return (
    <OrcamentosContext.Provider value={{ orcamentos, setOrcamentos: handleSetOrcamentos }}>
      {children}
    </OrcamentosContext.Provider>
  )
}

export function useOrcamentos() {
  const context = useContext(OrcamentosContext)
  if (context === undefined) {
    throw new Error("useOrcamentos deve ser usado dentro de um OrcamentosProvider")
  }
  return context
}
