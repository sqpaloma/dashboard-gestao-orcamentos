"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useOrcamentosStore } from "@/lib/store"
import { MetricCards } from "@/components/metric-cards"
import { ConversionChart } from "@/components/conversion-chart"
import { ResponsaveisChart } from "@/components/responsaveis-chart"
import { StatusChart } from "@/components/status-chart"
import { ValoresChart } from "@/components/valores-chart"
import { TabelaOrcamentos } from "@/components/tabela-orcamentos"
import { Skeleton } from "@/components/ui/skeleton"
import { UploadButton } from "@/components/upload-button"
import { FileSpreadsheet } from "lucide-react"

interface DashboardShellProps {
  showEmptyState?: boolean
}

export function DashboardShell({ showEmptyState = false }: DashboardShellProps) {
  const { orcamentos } = useOrcamentosStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <DashboardSkeleton />
  }

  if (orcamentos.length === 0 && !showEmptyState) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Sem dados</CardTitle>
          <CardDescription>Faça upload de uma planilha para visualizar o dashboard</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <div className="space-y-8">
      <MetricCards />

      {orcamentos.length === 0 && showEmptyState ? (
        <Card className="border-dashed">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-2">
              <FileSpreadsheet className="h-12 w-12 text-muted-foreground" />
            </div>
            <CardTitle>Nenhum dado carregado</CardTitle>
            <CardDescription>Faça upload de uma planilha Excel para visualizar os dados dos orçamentos</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <UploadButton />
          </CardContent>
        </Card>
      ) : (
        <Tabs defaultValue="graficos" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="graficos">Gráficos</TabsTrigger>
            <TabsTrigger value="responsaveis">Desempenho por Responsável</TabsTrigger>
            <TabsTrigger value="dados">Dados</TabsTrigger>
          </TabsList>

          <TabsContent value="graficos" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
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
                  <CardTitle>Distribuição por Status</CardTitle>
                  <CardDescription>Proporção de orçamentos por status</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <StatusChart />
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Valores Mensais</CardTitle>
                <CardDescription>Valor total de orçamentos por mês</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ValoresChart />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="responsaveis">
            <Card>
              <CardHeader>
                <CardTitle>Desempenho por Responsável</CardTitle>
                <CardDescription>Comparativo de orçamentos e valores por responsável</CardDescription>
              </CardHeader>
              <CardContent className="h-[500px]">
                <ResponsaveisChart />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="dados">
            <Card>
              <CardHeader>
                <CardTitle>Dados dos Orçamentos</CardTitle>
                <CardDescription>Visualização em tabela dos dados importados</CardDescription>
              </CardHeader>
              <CardContent>
                <TabelaOrcamentos />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}

function DashboardSkeleton() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array(4)
          .fill(0)
          .map((_, i) => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-20 mb-2" />
                <Skeleton className="h-4 w-1/3" />
              </CardContent>
            </Card>
          ))}
      </div>

      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-1/4" />
          <Skeleton className="h-4 w-1/3" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[300px] w-full" />
        </CardContent>
      </Card>
    </div>
  )
}
