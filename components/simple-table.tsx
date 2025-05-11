"use client"

import { useState } from "react"
import { useOrcamentos } from "@/lib/context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

export function SimpleTable() {
  const { orcamentos } = useOrcamentos()
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortField, setSortField] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  const itemsPerPage = 10

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)
  }

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString("pt-BR")
    } catch (error) {
      return dateString
    }
  }

  const getStatusVariant = (status: string) => {
    const statusLower = status.toLowerCase()
    if (statusLower.includes("aprovado")) return "success"
    if (statusLower.includes("recusado") || statusLower.includes("reprovado")) return "destructive"
    return "default"
  }

  // Filtrar dados
  const filteredData = orcamentos.filter((orcamento) => {
    const searchLower = searchTerm.toLowerCase()
    return (
      orcamento.responsavel?.toLowerCase().includes(searchLower) ||
      orcamento.status?.toLowerCase().includes(searchLower) ||
      formatDate(orcamento.data).includes(searchTerm) ||
      String(orcamento.valor).includes(searchTerm)
    )
  })

  // Ordenar dados
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortField) return 0

    let valueA: any = a[sortField as keyof typeof a]
    let valueB: any = b[sortField as keyof typeof b]

    if (sortField === "data") {
      valueA = new Date(valueA).getTime()
      valueB = new Date(valueB).getTime()
    }

    if (valueA < valueB) return sortDirection === "asc" ? -1 : 1
    if (valueA > valueB) return sortDirection === "asc" ? 1 : -1
    return 0
  })

  // Paginar dados
  const totalPages = Math.ceil(sortedData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage)

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const getSortIcon = (field: string) => {
    if (sortField !== field) return null
    return sortDirection === "asc" ? "↑" : "↓"
  }

  return (
    <div>
      <div className="flex items-center py-4">
        <Input
          placeholder="Filtrar orçamentos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="rounded-md border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr>
              <th
                className="px-4 py-3 text-left font-medium cursor-pointer hover:bg-muted"
                onClick={() => handleSort("data")}
              >
                Data {getSortIcon("data")}
              </th>
              <th
                className="px-4 py-3 text-left font-medium cursor-pointer hover:bg-muted"
                onClick={() => handleSort("responsavel")}
              >
                Responsável {getSortIcon("responsavel")}
              </th>
              <th
                className="px-4 py-3 text-left font-medium cursor-pointer hover:bg-muted"
                onClick={() => handleSort("status")}
              >
                Status {getSortIcon("status")}
              </th>
              <th
                className="px-4 py-3 text-left font-medium cursor-pointer hover:bg-muted"
                onClick={() => handleSort("valor")}
              >
                Valor {getSortIcon("valor")}
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((orcamento, index) => (
                <tr key={index} className="border-t hover:bg-muted/50">
                  <td className="px-4 py-3">{formatDate(orcamento.data)}</td>
                  <td className="px-4 py-3">{orcamento.responsavel}</td>
                  <td className="px-4 py-3">
                    <Badge variant={getStatusVariant(orcamento.status)}>{orcamento.status}</Badge>
                  </td>
                  <td className="px-4 py-3">{formatCurrency(orcamento.valor)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="h-24 text-center">
                  Nenhum resultado encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Anterior
          </Button>
          <span className="text-sm">
            Página {currentPage} de {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Próximo
          </Button>
        </div>
      )}
    </div>
  )
}
