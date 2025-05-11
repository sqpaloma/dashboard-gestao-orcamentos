"use client"

import { useMemo } from "react"
import { useOrcamentosStore } from "@/lib/store"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

export function ValoresChart() {
  const { orcamentos } = useOrcamentosStore()

  const data = useMemo(() => {
    // Se não houver orçamentos, retorne um array vazio
    if (!orcamentos || orcamentos.length === 0) {
      return []
    }

    // Agrupar por mês
    const mesesMap = new Map()

    orcamentos.forEach((orcamento) => {
      const data = new Date(orcamento.data)
      const mesAno = `${data.getFullYear()}-${String(data.getMonth() + 1).padStart(2, "0")}`

      if (!mesesMap.has(mesAno)) {
        mesesMap.set(mesAno, {
          total: 0,
          aprovado: 0,
          recusado: 0,
          pendente: 0,
        })
      }

      const mesData = mesesMap.get(mesAno)
      const status = orcamento.status.toLowerCase()

      if (status.includes("aprovado")) {
        mesData.aprovado += orcamento.valor
      } else if (status.includes("recusado") || status.includes("reprovado")) {
        mesData.recusado += orcamento.valor
      } else {
        mesData.pendente += orcamento.valor
      }

      mesData.total += orcamento.valor
    })

    // Converter para array
    const nomesMeses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]

    return Array.from(mesesMap.entries())
      .map(([mesAno, dados]) => {
        const [ano, mes] = mesAno.split("-")

        return {
          mes: `${nomesMeses[Number.parseInt(mes) - 1]}/${ano.slice(2)}`,
          aprovado: Number.parseFloat(dados.aprovado.toFixed(2)),
          recusado: Number.parseFloat(dados.recusado.toFixed(2)),
          pendente: Number.parseFloat(dados.pendente.toFixed(2)),
          total: Number.parseFloat(dados.total.toFixed(2)),
        }
      })
      .sort((a, b) => {
        const [mesA, anoA] = a.mes.split("/")
        const [mesB, anoB] = b.mes.split("/")

        const indiceA = nomesMeses.indexOf(mesA) + Number.parseInt(anoA) * 12
        const indiceB = nomesMeses.indexOf(mesB) + Number.parseInt(anoB) * 12

        return indiceA - indiceB
      })
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
          label: "Aprovado",
          color: "hsl(var(--chart-1))",
        },
        recusado: {
          label: "Recusado",
          color: "hsl(var(--chart-2))",
        },
        pendente: {
          label: "Pendente",
          color: "hsl(var(--chart-3))",
        },
      }}
      className="h-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <XAxis dataKey="mes" tickLine={false} axisLine={false} />
          <YAxis
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
          <ChartTooltip
            content={
              <ChartTooltipContent
                style={{ backgroundColor: "hsl(var(--background))" }}
                formatter={(value, name) => {
                  return [formatCurrency(value as number), name]
                }}
                labelFormatter={(label) => label}
                itemStyle={{ color: "hsl(var(--foreground))" }}
              />
            }
          />
          <Bar dataKey="aprovado" fill="var(--color-aprovado)" radius={[4, 4, 0, 0]} />
          <Bar dataKey="recusado" fill="var(--color-recusado)" radius={[4, 4, 0, 0]} />
          <Bar dataKey="pendente" fill="var(--color-pendente)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
