"use client"

import { useMemo } from "react"
import { useOrcamentosStore } from "@/lib/store"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

export function DesempenhoMensal() {
  const { orcamentos } = useOrcamentosStore()
  const nomesMeses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]

  const data = useMemo(() => {
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
          quantidade: 0,
          aprovados: 0,
          valorTotal: 0,
          valorAprovado: 0,
        })
      }

      const mesData = mesesMap.get(mesAno)
      const status = orcamento.status.toLowerCase()

      mesData.quantidade += 1
      mesData.valorTotal += orcamento.valor

      if (status.includes("aprovado")) {
        mesData.aprovados += 1
        mesData.valorAprovado += orcamento.valor
      }
    })

    // Converter para array
    return Array.from(mesesMap.entries())
      .map(([mesAno, dados]) => {
        const [ano, mes] = mesAno.split("-")
        const taxaConversao = dados.quantidade > 0 ? (dados.aprovados / dados.quantidade) * 100 : 0
        const ticketMedio = dados.aprovados > 0 ? dados.valorAprovado / dados.aprovados : 0

        return {
          mes: `${nomesMeses[Number.parseInt(mes) - 1]}/${ano.slice(2)}`,
          quantidade: dados.quantidade,
          aprovados: dados.aprovados,
          valorTotal: Number.parseFloat(dados.valorTotal.toFixed(2)),
          valorAprovado: Number.parseFloat(dados.valorAprovado.toFixed(2)),
          taxaConversao: Number.parseFloat(taxaConversao.toFixed(1)),
          ticketMedio: Number.parseFloat(ticketMedio.toFixed(2)),
        }
      })
      .sort((a, b) => {
        const [mesA, anoA] = a.mes.split("/")
        const [mesB, anoB] = b.mes.split("/")

        const indiceA = nomesMeses.indexOf(mesA) + Number.parseInt(anoA) * 12
        const indiceB = nomesMeses.indexOf(mesB) + Number.parseInt(anoB) * 12

        return indiceA - indiceB
      })
  }, [orcamentos, nomesMeses])

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
        quantidade: {
          label: "Quantidade de Orçamentos",
          color: "hsl(var(--chart-1))",
        },
        ticketMedio: {
          label: "Ticket Médio",
          color: "hsl(var(--chart-2))",
        },
      }}
      className="h-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <XAxis dataKey="mes" tickLine={false} axisLine={false} />
          <YAxis yAxisId="left" orientation="left" tickLine={false} axisLine={false} />
          <YAxis
            yAxisId="right"
            orientation="right"
            tickFormatter={(value) => formatCurrency(value)}
            tickLine={false}
            axisLine={false}
          />
          <ChartTooltip
            content={
              <ChartTooltipContent
                style={{ backgroundColor: "hsl(var(--background))" }}
                formatter={(value, name, props) => {
                  if (name === "quantidade") return [`${value}`, "Quantidade"]
                  if (name === "ticketMedio") return [formatCurrency(value as number), "Ticket Médio"]
                  if (name === "valorAprovado") return [formatCurrency(value as number), "Valor Aprovado"]
                  if (name === "taxaConversao") return [`${value}%`, "Taxa de Conversão"]
                  return [value, name]
                }}
                labelFormatter={(label) => label}
                itemStyle={{ color: "hsl(var(--foreground))" }}
              />
            }
          />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="quantidade"
            stroke="var(--color-quantidade)"
            strokeWidth={2}
            dot={{ r: 4, strokeWidth: 2 }}
            activeDot={{ r: 6, strokeWidth: 2 }}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="ticketMedio"
            stroke="var(--color-ticketMedio)"
            strokeWidth={2}
            dot={{ r: 4, strokeWidth: 2 }}
            activeDot={{ r: 6, strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
