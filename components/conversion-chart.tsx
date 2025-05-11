"use client"

import { useMemo } from "react"
import { useOrcamentosStore } from "@/lib/store"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

export function ConversionChart() {
  const { orcamentos } = useOrcamentosStore()
  const nomesMeses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]

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
          aprovados: 0,
        })
      }

      const mesData = mesesMap.get(mesAno)
      mesData.total += 1

      if (orcamento.status.toLowerCase().includes("aprovado")) {
        mesData.aprovados += 1
      }
    })

    // Converter para array e calcular taxa
    return Array.from(mesesMap.entries())
      .map(([mesAno, dados]) => {
        const [ano, mes] = mesAno.split("-")
        const taxa = dados.total > 0 ? (dados.aprovados / dados.total) * 100 : 0

        return {
          mes: `${nomesMeses[Number.parseInt(mes) - 1]}/${ano.slice(2)}`,
          taxa: Number.parseFloat(taxa.toFixed(1)),
          total: dados.total,
          aprovados: dados.aprovados,
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

  if (data.length === 0) {
    return <div className="flex items-center justify-center h-full">Sem dados suficientes</div>
  }

  return (
    <ChartContainer
      config={{
        taxa: {
          label: "Taxa de Conversão",
          color: "hsl(var(--chart-1))",
        },
      }}
      className="h-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
          <XAxis dataKey="mes" tickLine={false} axisLine={false} tickMargin={8} />
          <YAxis tickFormatter={(value) => `${value}%`} tickLine={false} axisLine={false} tickMargin={8} />
          <ChartTooltip
            content={
              <ChartTooltipContent
                style={{ backgroundColor: "hsl(var(--background))" }}
                formatter={(value, name) => {
                  if (name === "taxa") return [`${value}%`, "Taxa de Conversão"]
                  return [value, name]
                }}
                labelFormatter={(label) => label}
                itemStyle={{ color: "hsl(var(--foreground))" }}
              />
            }
          />
          <Line
            type="monotone"
            dataKey="taxa"
            stroke="var(--color-taxa)"
            strokeWidth={2}
            dot={{ r: 4, strokeWidth: 2 }}
            activeDot={{ r: 6, strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
