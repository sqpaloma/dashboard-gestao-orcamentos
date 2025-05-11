"use client"

import { useMemo } from "react"
import { useOrcamentosStore } from "@/lib/store"
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

export function StatusChart() {
  const { orcamentos } = useOrcamentosStore()

  const data = useMemo(() => {
    // Inicializar com um objeto vazio para garantir que nunca seja nulo
    const statusCount: Record<string, number> = {}

    // Verificar se orcamentos existe e não é vazio
    if (!orcamentos || orcamentos.length === 0) {
      return []
    }

    orcamentos.forEach((curr) => {
      const status = curr.status.toLowerCase()

      // Normalizar status
      let normalizedStatus = "Outros"

      if (status.includes("aprovado")) {
        normalizedStatus = "Aprovado"
      } else if (status.includes("recusado") || status.includes("reprovado")) {
        normalizedStatus = "Recusado"
      } else if (status.includes("enviado") || status.includes("pendente")) {
        normalizedStatus = "Enviado/Pendente"
      }

      if (!statusCount[normalizedStatus]) {
        statusCount[normalizedStatus] = 0
      }

      statusCount[normalizedStatus] += 1
    })

    return Object.entries(statusCount).map(([name, value]) => ({
      name,
      value,
    }))
  }, [orcamentos])

  const COLORS = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))", "hsl(var(--chart-4))"]

  if (data.length === 0) {
    return <div className="flex items-center justify-center h-full">Sem dados suficientes</div>
  }

  return (
    <ChartContainer className="h-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <ChartTooltip
            content={
              <ChartTooltipContent
                style={{ backgroundColor: "hsl(var(--background))" }}
                formatter={(value, name, props) => {
                  return [`${value} orçamentos`, props.payload.name]
                }}
                labelFormatter={() => ""}
                itemStyle={{ color: "hsl(var(--foreground))" }}
              />
            }
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
