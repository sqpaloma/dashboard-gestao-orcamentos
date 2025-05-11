"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useOrcamentosStore } from "@/lib/store"
import { MetricCards } from "@/components/metric-cards"
import { ConversionChart } from "@/components/conversion-chart"
import { ResponsaveisChart } from "@/components/responsaveis-chart"
import { StatusChart } from "@/components/status-chart"
import { ValoresChart } from "@/components/valores-chart"
import { TabelaOrcamentos } from "@/components/tabela-orcamentos"
import { ResumoAnual } from "@/components/resumo-anual"
import { DesempenhoMensal } from "@/components/desempenho-mensal"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { ArrowLeft, Download, Printer, FileSpreadsheet } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { UploadButton } from "@/components/upload-button"

export function AnaliseCompleta() {
  const { orcamentos } = useOrcamentosStore()
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  if (orcamentos.length === 0) {
    return (
      <Card>
        <CardHeader className="text-center">
          <div className="flex justify-center mb-2">
            <FileSpreadsheet className="h-12 w-12 text-muted-foreground" />
          </div>
          <CardTitle>Sem dados para análise</CardTitle>
          <CardDescription>Faça upload de uma planilha para visualizar a análise completa</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          <UploadButton />
          <Button onClick={() => router.push("/")} variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para página inicial
          </Button>
        </CardContent>
      </Card>
    )
  }

  const handleExportPDF = () => {
    toast({
      title: "Exportação de PDF",
      description: "Funcionalidade em desenvolvimento",
    })
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <Button onClick={() => router.push("/")} variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar para página inicial
        </Button>
        <div className="flex gap-2">
          <Button onClick={handleExportPDF} variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exportar PDF
          </Button>
          <Button onClick={handlePrint} variant="outline">
            <Printer className="mr-2 h-4 w-4" />
            Imprimir
          </Button>
        </div>
      </div>

      <div className="print:block">
        <MetricCards />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 print:block print:space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Resumo Anual</CardTitle>
            <CardDescription>Visão geral dos orçamentos por ano</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResumoAnual />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Distribuição por Status</CardTitle>
            <CardDescription>Proporção de orçamentos por status</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <StatusChart />
          </CardContent>
        </Card>
      </div>

      <Card className="print:break-before-page">
        <CardHeader>
          <CardTitle>Taxa de Conversão Mensal</CardTitle>
          <CardDescription>Percentual de orçamentos aprovados por mês</CardDescription>
        </CardHeader>
        <CardContent className="h-80">
          <ConversionChart />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Valores Mensais</CardTitle>
          <CardDescription>Valor total de orçamentos por mês</CardDescription>
        </CardHeader>
        <CardContent className="h-80">
          <ValoresChart />
        </CardContent>
      </Card>

      <Card className="print:break-before-page">
        <CardHeader>
          <CardTitle>Desempenho por Responsável</CardTitle>
          <CardDescription>Comparativo de orçamentos e valores por responsável</CardDescription>
        </CardHeader>
        <CardContent className="h-[500px]">
          <ResponsaveisChart />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Desempenho Mensal</CardTitle>
          <CardDescription>Análise detalhada por mês</CardDescription>
        </CardHeader>
        <CardContent className="h-80">
          <DesempenhoMensal />
        </CardContent>
      </Card>

      <Card className="print:break-before-page">
        <CardHeader>
          <CardTitle>Dados Completos</CardTitle>
          <CardDescription>Todos os orçamentos importados</CardDescription>
        </CardHeader>
        <CardContent>
          <TabelaOrcamentos />
        </CardContent>
      </Card>

      <style jsx global>{`
        @media print {
          nav, header, footer, .no-print {
            display: none !important;
          }
          body {
            background: white;
          }
          .print\\:block {
            display: block !important;
          }
          .print\\:break-before-page {
            break-before: page;
          }
          .print\\:space-y-8 > * + * {
            margin-top: 2rem;
          }
        }
      `}</style>
    </div>
  )
}
