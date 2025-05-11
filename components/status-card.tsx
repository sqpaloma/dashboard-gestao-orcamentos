import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, CheckCircle, AlertCircle } from "lucide-react"

interface StatusCardProps {
  title: string
  total: number
  emDia: number
  atrasados: number
  icon?: React.ReactNode
}

export function StatusCard({ title, total, emDia, atrasados, icon }: StatusCardProps) {
  const percentEmDia = total > 0 ? Math.round((emDia / total) * 100) : 0
  const percentAtrasados = total > 0 ? Math.round((atrasados / total) * 100) : 0

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon || <Clock className="h-4 w-4 text-muted-foreground" />}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold mb-2">{total}</div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-emerald-500 mr-2" />
              <span>Em dia</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">{emDia}</span>
              <Badge
                variant="outline"
                className="bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
              >
                {percentEmDia}%
              </Badge>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <AlertCircle className="h-4 w-4 text-rose-500 mr-2" />
              <span>Atrasados</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">{atrasados}</span>
              <Badge variant="outline" className="bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300">
                {percentAtrasados}%
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
