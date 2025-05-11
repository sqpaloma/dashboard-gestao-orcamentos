"use client"

import { useMemo } from "react"
import { useOrcamentosStore } from "@/lib/store"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

export function ResponsaveisChart() {
  const { orcamentos } = useOrcamentosStore()

  const data = useMemo(() => {
    // Se não houver orçamentos, retorne um array vazio
    if (!orcamentos || orcamentos.length === 0) {
      return []
    }

    // Agrupar por responsável
    const responsaveisMap = new Map()

    orcamentos.forEach((orcamento) => {
      const responsavel = orcamento.responsavel || "Não especificado"

      if (!responsaveisMap.has(responsavel)) {
        responsaveisMap.set(responsavel, {
          total: 0,
          aprovados: 0,
          recusados: 0,
          pendentes: 0,
          valorTotal: 0,
          valorAprovado: 0,
        })
      }

      const respData = responsaveisMap.get(responsavel)
      const status = orcamento.status ? orcamento.status.toLowerCase() : ""

      respData.total += 1
      respData.valorTotal += orcamento.valor || 0

      if (status.includes("aprovado")) {
        respData.aprovados += 1
        respData.valorAprovado += orcamento.valor || 0
      } else if (status.includes("recusado") || status.includes("reprovado")) {
        respData.recusados += 1
      } else {
        respData.pendentes += 1
      }
    })

    // Converter para array e calcular taxa
    return Array.from(responsaveisMap.entries())
      .map(([responsavel, dados]) => {
        const taxaConversao = dados.total > 0 ? (dados.aprovados / dados.total) * 100 : 0

        return {
          responsavel,
          total: dados.total,
          aprovados: dados.aprovados,
          recusados: dados.recusados,
          pendentes: dados.pendentes,
          valorTotal: Number.parseFloat(dados.valorTotal.toFixed(2)),
          valorAprovado: Number.parseFloat(dados.valorAprovado.toFixed(2)),
          taxaConversao: Number.parseFloat(taxaConversao.toFixed(1)),
        }
      })
      .sort((a, b) => b.valorAprovado - a.valorAprovado)
      .slice(0, 10) // Limitar aos 10 principais
  }, [orcamentos])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  if (data.length === 0) {
    return <div className="flex items-center justify-center h-full">Sem dados suficientes</div>
  }

  return (
    <ChartContainer
      config={{
        valorAprovado: {
          label: "Valor Aprovado",
          color: "hsl(var(--chart-1))",
        },
        taxaConversao: {
          label: "Taxa de Conversão (%)",
          color: "hsl(var(--chart-2))",
        },
      }}
      className="h-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }} layout="vertical">
          <XAxis type="number" tickLine={false} axisLine={false} />
          <YAxis type="category" dataKey="responsavel" tickLine={false} axisLine={false} />
          <ChartTooltip
            content={
              <ChartTooltipContent
                style={{ backgroundColor: "hsl(var(--background))" }}
                formatter={(value, name) => {
                  if (name === "valorAprovado") return [formatCurrency(value as number), "Valor Aprovado"]
                  if (name === "taxaConversao") return [`${value}%`, "Taxa de Conversão"]
                  return [value, name]
                }}
                labelFormatter={(label) => label}
                itemStyle={{ color: "hsl(var(--foreground))" }}
              />
            }
          />
          <Bar dataKey="valorAprovado" fill="var(--color-valorAprovado)" radius={[0, 4, 4, 0]} barSize={20} />
          <Bar dataKey="taxaConversao" fill="var(--color-taxaConversao)" radius={[0, 4, 4, 0]} barSize={20} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
