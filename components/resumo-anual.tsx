"use client"

import { useMemo } from "react"
import { useOrcamentosStore } from "@/lib/store"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

export function ResumoAnual() {
  const { orcamentos } = useOrcamentosStore()

  const data = useMemo(() => {
    if (!orcamentos || orcamentos.length === 0) {
      return []
    }

    // Agrupar por ano
    const anosMap = new Map()

    orcamentos.forEach((orcamento) => {
      const data = new Date(orcamento.data)
      const ano = data.getFullYear().toString()

      if (!anosMap.has(ano)) {
        anosMap.set(ano, {
          total: 0,
          aprovado: 0,
          recusado: 0,
          pendente: 0,
          quantidade: 0,
          qtdAprovados: 0,
          qtdRecusados: 0,
          qtdPendentes: 0,
        })
      }

      const anoData = anosMap.get(ano)
      const status = orcamento.status.toLowerCase()

      anoData.quantidade += 1

      if (status.includes("aprovado")) {
        anoData.aprovado += orcamento.valor
        anoData.qtdAprovados += 1
      } else if (status.includes("recusado") || status.includes("reprovado")) {
        anoData.recusado += orcamento.valor
        anoData.qtdRecusados += 1
      } else {
        anoData.pendente += orcamento.valor
        anoData.qtdPendentes += 1
      }

      anoData.total += orcamento.valor
    })

    // Converter para array
    return Array.from(anosMap.entries())
      .map(([ano, dados]) => {
        const taxaConversao = dados.quantidade > 0 ? (dados.qtdAprovados / dados.quantidade) * 100 : 0

        return {
          ano,
          total: Number.parseFloat(dados.total.toFixed(2)),
          aprovado: Number.parseFloat(dados.aprovado.toFixed(2)),
          recusado: Number.parseFloat(dados.recusado.toFixed(2)),
          pendente: Number.parseFloat(dados.pendente.toFixed(2)),
          quantidade: dados.quantidade,
          qtdAprovados: dados.qtdAprovados,
          qtdRecusados: dados.qtdRecusados,
          qtdPendentes: dados.qtdPendentes,
          taxaConversao: Number.parseFloat(taxaConversao.toFixed(1)),
        }
      })
      .sort((a, b) => a.ano.localeCompare(b.ano))
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
        aprovado: {
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
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <XAxis dataKey="ano" tickLine={false} axisLine={false} />
          <YAxis
            yAxisId="left"
            orientation="left"
            tickFormatter={(value) =>
              value >= 1000000
                ? `${(value / 1000000).toFixed(1)}M`
                : value >= 1000
                  ? `${(value / 1000).toFixed(0)}K`
                  : value.toString()
            }
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            tickFormatter={(value) => `${value}%`}
            domain={[0, 100]}
            tickLine={false}
            axisLine={false}
          />
          <ChartTooltip
            content={
              <ChartTooltipContent
                style={{ backgroundColor: "hsl(var(--background))" }}
                formatter={(value, name, props) => {
                  if (name === "aprovado") return [formatCurrency(value as number), "Valor Aprovado"]
                  if (name === "taxaConversao") return [`${value}%`, "Taxa de Conversão"]
                  if (name === "quantidade") return [`${value}`, "Total de Orçamentos"]
                  if (name === "qtdAprovados") return [`${value}`, "Orçamentos Aprovados"]
                  return [value, name]
                }}
                labelFormatter={(label) => `Ano: ${label}`}
                itemStyle={{ color: "hsl(var(--foreground))" }}
              />
            }
          />
          <Bar yAxisId="left" dataKey="aprovado" fill="var(--color-aprovado)" radius={[4, 4, 0, 0]} />
          <Bar yAxisId="right" dataKey="taxaConversao" fill="var(--color-taxaConversao)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
