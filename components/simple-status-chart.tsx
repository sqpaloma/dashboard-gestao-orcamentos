"use client"

import { useEffect, useRef, useState } from "react"
import { useOrcamentos } from "@/lib/context"

export function SimpleStatusChart() {
  const { orcamentos } = useOrcamentos()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [statusData, setStatusData] = useState<{ name: string; value: number; color: string }[]>([])

  useEffect(() => {
    if (!orcamentos || orcamentos.length === 0) {
      setStatusData([])
      return
    }

    // Contar status
    const statusCount: Record<string, number> = {}

    orcamentos.forEach((orcamento) => {
      const status = orcamento.status?.toLowerCase() || ""

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

    // Cores para cada status
    const colors = ["#3b82f6", "#10b981", "#ef4444", "#f59e0b"]

    // Converter para array
    const data = Object.entries(statusCount).map(([name, value], index) => ({
      name,
      value,
      color: colors[index % colors.length],
    }))

    setStatusData(data)
  }, [orcamentos])

  useEffect(() => {
    if (!canvasRef.current || statusData.length === 0) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Limpar canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Desenhar gráfico de pizza
    const total = statusData.reduce((sum, item) => sum + item.value, 0)
    let startAngle = 0

    statusData.forEach((item) => {
      const sliceAngle = (2 * Math.PI * item.value) / total

      ctx.beginPath()
      ctx.fillStyle = item.color
      ctx.moveTo(canvas.width / 2, canvas.height / 2)
      ctx.arc(
        canvas.width / 2,
        canvas.height / 2,
        Math.min(canvas.width, canvas.height) / 2 - 10,
        startAngle,
        startAngle + sliceAngle,
      )
      ctx.closePath()
      ctx.fill()

      startAngle += sliceAngle
    })

    // Desenhar círculo central (opcional, para fazer um donut chart)
    ctx.beginPath()
    ctx.fillStyle = "white"
    ctx.arc(canvas.width / 2, canvas.height / 2, Math.min(canvas.width, canvas.height) / 6, 0, 2 * Math.PI)
    ctx.fill()
  }, [statusData])

  if (!orcamentos || orcamentos.length === 0) {
    return <div className="flex items-center justify-center h-full">Sem dados suficientes</div>
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 relative">
        <canvas ref={canvasRef} width={300} height={300} className="w-full h-full" />
      </div>
      <div className="mt-4 flex flex-wrap justify-center gap-4">
        {statusData.map((item, index) => (
          <div key={index} className="flex items-center">
            <div className="w-4 h-4 mr-2" style={{ backgroundColor: item.color }} />
            <span>
              {item.name}: {Math.round((item.value / orcamentos.length) * 100)}% ({item.value})
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
