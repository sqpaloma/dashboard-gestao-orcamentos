"use client"

import { create } from "zustand"

export interface Orcamento {
  data: string
  responsavel: string
  status: string
  valor: number
}

interface OrcamentosStore {
  orcamentos: Orcamento[]
  setOrcamentos: (orcamentos: Orcamento[]) => void
}

export const useOrcamentosStore = create<OrcamentosStore>((set) => ({
  orcamentos: [],
  setOrcamentos: (orcamentos) => set({ orcamentos: orcamentos || [] }),
}))
