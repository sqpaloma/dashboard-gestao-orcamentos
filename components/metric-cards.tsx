"use client"

import { useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useOrcamentosStore } from "@/lib/store"
import { ArrowUpIcon, ArrowDownIcon, DollarSign, FileText, CheckCircle, PercentIcon } from "lucide-react"

export function MetricCards() {
  const { orcamentos } = useOrcamentosStore()

  const metrics = useMemo(() => {
    // Se não houver orçamentos, retorne valores padrão
    if (!orcamentos || orcamentos.length === 0) {
      return {
        totalOrcamentos: 0,
        orcamentosAprovados: 0,
        taxaConversao: 0,
        valorTotalAprovado: 0,
        variacaoTotal: 0,
        variacaoAprovados: 0,
        variacaoValor: 0,
      }
    }

    // Total de orçamentos
    const totalOrcamentos = orcamentos.length

    // Orçamentos aprovados
    const orcamentosAprovados = orcamentos.filter((o) => o.status.toLowerCase().includes("aprovado")).length

    // Taxa de conversão
    const taxaConversao = totalOrcamentos > 0 ? (orcamentosAprovados / totalOrcamentos) * 100 : 0

    // Valor total aprovado
    const valorTotalAprovado = orcamentos
      .filter((o) => o.status.toLowerCase().includes("aprovado"))
      .reduce((acc, curr) => acc + curr.valor, 0)

    // Comparação com mês anterior (simulação)
    const dataAtual = new Date()
    const mesAtual = dataAtual.getMonth()
    const anoAtual = dataAtual.getFullYear()

    const orcamentosMesAtual = orcamentos.filter((o) => {
      const data = new Date(o.data)
      return data.getMonth() === mesAtual && data.getFullYear() === anoAtual
    })

    const orcamentosMesAnterior = orcamentos.filter((o) => {
      const data = new Date(o.data)
      const mesAnterior = mesAtual === 0 ? 11 : mesAtual - 1
      const anoAnterior = mesAtual === 0 ? anoAtual - 1 : anoAtual
      return data.getMonth() === mesAnterior && data.getFullYear() === anoAnterior
    })

    const totalMesAtual = orcamentosMesAtual.length
    const totalMesAnterior = orcamentosMesAnterior.length

    const variacaoTotal = totalMesAnterior > 0 ? ((totalMesAtual - totalMesAnterior) / totalMesAnterior) * 100 : 100

    const aprovadosMesAtual = orcamentosMesAtual.filter((o) => o.status.toLowerCase().includes("aprovado")).length

    const aprovadosMesAnterior = orcamentosMesAnterior.filter((o) => o.status.toLowerCase().includes("aprovado")).length

    const variacaoAprovados =
      aprovadosMesAnterior > 0 ? ((aprovadosMesAtual - aprovadosMesAnterior) / aprovadosMesAnterior) * 100 : 100

    const valorMesAtual = orcamentosMesAtual
      .filter((o) => o.status.toLowerCase().includes("aprovado"))
      .reduce((acc, curr) => acc + curr.valor, 0)

    const valorMesAnterior = orcamentosMesAnterior
      .filter((o) => o.status.toLowerCase().includes("aprovado"))
      .reduce((acc, curr) => acc + curr.valor, 0)

    const variacaoValor = valorMesAnterior > 0 ? ((valorMesAtual - valorMesAnterior) / valorMesAnterior) * 100 : 100

    return {
      totalOrcamentos,
      orcamentosAprovados,
      taxaConversao,
      valorTotalAprovado,
      variacaoTotal,
      variacaoAprovados,
      variacaoValor,
    }
  }, [orcamentos])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total de Orçamentos</CardTitle>
          <FileText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.totalOrcamentos}</div>
          <div className="flex items-center text-xs text-muted-foreground mt-1">
            {metrics.variacaoTotal > 0 ? (
              <>
                <ArrowUpIcon className="h-3 w-3 mr-1 text-emerald-500" />
                <span className="text-emerald-500">{Math.abs(metrics.variacaoTotal).toFixed(1)}%</span>
              </>
            ) : (
              <>
                <ArrowDownIcon className="h-3 w-3 mr-1 text-rose-500" />
                <span className="text-rose-500">{Math.abs(metrics.variacaoTotal).toFixed(1)}%</span>
              </>
            )}
            <span className="ml-1">em relação ao mês anterior</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Orçamentos Aprovados</CardTitle>
          <CheckCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.orcamentosAprovados}</div>
          <div className="flex items-center text-xs text-muted-foreground mt-1">
            {metrics.variacaoAprovados > 0 ? (
              <>
                <ArrowUpIcon className="h-3 w-3 mr-1 text-emerald-500" />
                <span className="text-emerald-500">{Math.abs(metrics.variacaoAprovados).toFixed(1)}%</span>
              </>
            ) : (
              <>
                <ArrowDownIcon className="h-3 w-3 mr-1 text-rose-500" />
                <span className="text-rose-500">{Math.abs(metrics.variacaoAprovados).toFixed(1)}%</span>
              </>
            )}
            <span className="ml-1">em relação ao mês anterior</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Valor Total Aprovado</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(metrics.valorTotalAprovado)}</div>
          <div className="flex items-center text-xs text-muted-foreground mt-1">
            {metrics.variacaoValor > 0 ? (
              <>
                <ArrowUpIcon className="h-3 w-3 mr-1 text-emerald-500" />
                <span className="text-emerald-500">{Math.abs(metrics.variacaoValor).toFixed(1)}%</span>
              </>
            ) : (
              <>
                <ArrowDownIcon className="h-3 w-3 mr-1 text-rose-500" />
                <span className="text-rose-500">{Math.abs(metrics.variacaoValor).toFixed(1)}%</span>
              </>
            )}
            <span className="ml-1">em relação ao mês anterior</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Taxa de Conversão</CardTitle>
          <PercentIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.taxaConversao.toFixed(1)}%</div>
          <p className="text-xs text-muted-foreground mt-1">Orçamentos aprovados / total</p>
        </CardContent>
      </Card>
    </div>
  )
}
