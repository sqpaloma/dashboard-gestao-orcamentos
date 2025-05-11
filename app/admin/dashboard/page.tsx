"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SimpleStatusChart } from "@/components/simple-status-chart"
import { SimpleBarChart } from "@/components/simple-bar-chart"
import { SimpleTable } from "@/components/simple-table"
import { UploadButton } from "@/components/upload-button"
import { ArrowLeft, Download, Printer } from "lucide-react"

// Dados simulados para cada departamento
const departamentosData = {
  "bombas-motores-pistao": "Bombas e Motores de Pistão",
  "bombas-motores-engrenagem": "Bombas e Motores de Engrenagem",
  "bombas-motores-escavadeira": "Bombas, Motores e Comandos de Escavadeira",
  "blocos-valvulas": "Blocos, Válvulas, Orbitrol e Pedal de Freio",
}

export default function AdminDashboardPage() {
  const searchParams = useSearchParams()
  const [mounted, setMounted] = useState(false)
  const [departamento, setDepartamento] = useState(searchParams.get("departamento") || "todos")

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const handleDepartamentoChange = (value: string) => {
    setDepartamento(value)
  }

  const handleExportPDF = () => {
    // Implementação real seria feita aqui
    alert("Exportação de PDF em desenvolvimento")
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-8">
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Button variant="ghost" size="sm" asChild className="p-0 h-8">
                <Link href="/">
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Voltar para página inicial
                </Link>
              </Button>
            </div>
            <h1 className="text-3xl font-bold">Dashboard Administrativo</h1>
            <p className="text-muted-foreground mt-1">Gerenciamento Consultoria</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleExportPDF} variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Exportar PDF
            </Button>
            <Button onClick={handlePrint} variant="outline">
              <Printer className="mr-2 h-4 w-4" />
              Imprimir
            </Button>
            <UploadButton variant="outline" size="default" />
          </div>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Filtros</CardTitle>
            <CardDescription>Selecione um departamento para visualizar dados específicos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-full sm:w-1/3">
                <Select value={departamento} onValueChange={handleDepartamentoChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um departamento" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos os departamentos</SelectItem>
                    {Object.entries(departamentosData || {}).map(([id, nome]) => (
                      <SelectItem key={id} value={id}>
                        {nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="resumo" className="mt-8">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="resumo">Resumo</TabsTrigger>
            <TabsTrigger value="graficos">Gráficos</TabsTrigger>
            <TabsTrigger value="dados">Dados</TabsTrigger>
          </TabsList>

          <TabsContent value="resumo" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 print:block print:space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Distribuição por Status</CardTitle>
                  <CardDescription>Proporção de orçamentos por status</CardDescription>
                </CardHeader>
                <CardContent className="h-80">{mounted ? <SimpleStatusChart /> : null}</CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Valores por Mês</CardTitle>
                  <CardDescription>Valores aprovados por mês</CardDescription>
                </CardHeader>
                <CardContent className="h-80">{mounted ? <SimpleBarChart dataType="valores" /> : null}</CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="graficos" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Desempenho por Responsável</CardTitle>
                <CardDescription>Valores aprovados por responsável</CardDescription>
              </CardHeader>
              <CardContent className="h-80">{mounted ? <SimpleBarChart dataType="responsaveis" /> : null}</CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="dados">
            <Card>
              <CardHeader>
                <CardTitle>Dados dos Orçamentos</CardTitle>
                <CardDescription>Visualização em tabela dos dados importados</CardDescription>
              </CardHeader>
              <CardContent>{mounted ? <SimpleTable /> : null}</CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
