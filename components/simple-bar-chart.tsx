"use client"

import { useEffect, useRef, useState } from "react"
import { useOrcamentos } from "@/lib/context"

interface BarChartData {
  label: string
  value: number
  color: string
}

export function SimpleBarChart({ dataType = "valores" }: { dataType?: "valores" | "responsaveis" }) {
  const { orcamentos } = useOrcamentos()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [chartData, setChartData] = useState<BarChartData[]>([])
  const [maxValue, setMaxValue] = useState(0)

  useEffect(() => {
    if (!orcamentos || orcamentos.length === 0) {
      setChartData([])
      return
    }

    if (dataType === "valores") {
      // Agrupar por mês
      const mesesMap: Record<string, { aprovado: number; recusado: number; pendente: number }> = {}
      const nomesMeses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]

      orcamentos.forEach((orcamento) => {
        try {
          const data = new Date(orcamento.data)
          const mesAno = `${nomesMeses[data.getMonth()]}/${data.getFullYear().toString().slice(2)}`

          if (!mesesMap[mesAno]) {
            mesesMap[mesAno] = { aprovado: 0, recusado: 0, pendente: 0 }
          }

          const status = orcamento.status?.toLowerCase() || ""

          if (status.includes("aprovado")) {
            mesesMap[mesAno].aprovado += orcamento.valor || 0
          } else if (status.includes("recusado") || status.includes("reprovado")) {
            mesesMap[mesAno].recusado += orcamento.valor || 0
          } else {
            mesesMap[mesAno].pendente += orcamento.valor || 0
          }
        } catch (error) {
          console.error("Erro ao processar data:", error)
        }
      })

      // Converter para array e ordenar por mês
      const data: BarChartData[] = []

      Object.entries(mesesMap).forEach(([mesAno, valores]) => {
        data.push({
          label: mesAno,
          value: valores.aprovado,
          color: "#3b82f6", // Azul
        })
      })

      // Ordenar por mês
      data.sort((a, b) => {
        const [mesA, anoA] = a.label.split("/")
        const [mesB, anoB] = b.label.split("/")
        const nomesMesesIndex = nomesMeses.reduce(
          (acc, mes, index) => ({ ...acc, [mes]: index }),
          {} as Record<string, number>,
        )

        if (anoA !== anoB) return Number(anoA) - Number(anoB)
        return nomesMesesIndex[mesA] - nomesMesesIndex[mesB]
      })

      setChartData(data)
      setMaxValue(Math.max(...data.map((item) => item.value)))
    } else {
      // Agrupar por responsável
      const responsaveisMap: Record<string, { valorAprovado: number }> = {}

      orcamentos.forEach((orcamento) => {
        const responsavel = orcamento.responsavel || "Não especificado"

        if (!responsaveisMap[responsavel]) {
          responsaveisMap[responsavel] = { valorAprovado: 0 }
        }

        const status = orcamento.status?.toLowerCase() || ""

        if (status.includes("aprovado")) {
          responsaveisMap[responsavel].valorAprovado += orcamento.valor || 0
        }
      })

      // Converter para array
      const data = Object.entries(responsaveisMap)
        .map(([responsavel, valores]) => ({
          label: responsavel,
          value: valores.valorAprovado,
          color: "#10b981", // Verde
        }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 5) // Top 5 responsáveis

      setChartData(data)
      setMaxValue(Math.max(...data.map((item) => item.value)))
    }
  }, [orcamentos, dataType])

  useEffect(() => {
    if (!canvasRef.current || chartData.length === 0) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Limpar canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Configurações
    const padding = { top: 20, right: 20, bottom: 60, left: 60 }
    const chartWidth = canvas.width - padding.left - padding.right
    const chartHeight = canvas.height - padding.top - padding.bottom

    // Desenhar eixos
    ctx.beginPath()
    ctx.strokeStyle = "#d1d5db" // Cinza claro
    ctx.moveTo(padding.left, padding.top)
    ctx.lineTo(padding.left, canvas.height - padding.bottom)
    ctx.lineTo(canvas.width - padding.right, canvas.height - padding.bottom)
    ctx.stroke()

    // Desenhar barras
    const barWidth = chartWidth / chartData.length / 1.5
    const barSpacing = chartWidth / chartData.length

    chartData.forEach((item, index) => {
      const barHeight = (item.value / maxValue) * chartHeight
      const x = padding.left + index * barSpacing + barSpacing / 2 - barWidth / 2
      const y = canvas.height - padding.bottom - barHeight

      // Barra
      ctx.fillStyle = item.color
      ctx.fillRect(x, y, barWidth, barHeight)

      // Rótulo do eixo X
      ctx.fillStyle = "#374151" // Cinza escuro
      ctx.font = "12px sans-serif"
      ctx.textAlign = "center"
      ctx.fillText(item.label, padding.left + index * barSpacing + barSpacing / 2, canvas.height - padding.bottom + 20)

      // Valor
      ctx.fillStyle = "#374151"
      ctx.textAlign = "center"
      ctx.fillText(formatCurrency(item.value), padding.left + index * barSpacing + barSpacing / 2, y - 10)
    })

    // Desenhar linhas de grade horizontais
    const gridLines = 5
    ctx.beginPath()
    ctx.strokeStyle = "#e5e7eb" // Cinza mais claro

    for (let i = 0; i <= gridLines; i++) {
      const y = padding.top + (chartHeight / gridLines) * i
      ctx.moveTo(padding.left, y)
      ctx.lineTo(canvas.width - padding.right, y)

      // Valor do eixo Y
      const value = maxValue - (maxValue / gridLines) * i
      ctx.fillStyle = "#6b7280" // Cinza médio
      ctx.textAlign = "right"
      ctx.fillText(formatCurrency(value), padding.left - 10, y + 5)
    }

    ctx.stroke()
  }, [chartData, maxValue])

  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(0)}K`
    }
    return value.toFixed(0)
  }

  if (!orcamentos || orcamentos.length === 0) {
    return <div className="flex items-center justify-center h-full">Sem dados suficientes</div>
  }

  return (
    <div className="h-full">
      <canvas ref={canvasRef} width={600} height={400} className="w-full h-full" />
    </div>
  )
}
