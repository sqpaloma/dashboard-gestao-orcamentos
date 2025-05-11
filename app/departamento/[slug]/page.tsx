"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { StatusCard } from "@/components/status-card";
import { UploadButton } from "@/components/upload-button";
import { ArrowLeft, FileSpreadsheet, BarChart3 } from "lucide-react";
import Link from "next/link";

// Dados simulados para cada departamento
const departamentosData = {
  "bombas-motores-pistao": {
    titulo: "Bombas e Motores de Pistão",
    descricao: "Consultoria especializada em componentes hidráulicos de pistão",
    orcamentos: { total: 24, emDia: 18, atrasados: 6 },
    execucao: { total: 15, emDia: 12, atrasados: 3 },
    followup: { total: 32, emDia: 25, atrasados: 7 },
  },
  "bombas-motores-engrenagem": {
    titulo: "Bombas e Motores de Engrenagem",
    descricao:
      "Consultoria especializada em componentes hidráulicos de engrenagem",
    orcamentos: { total: 18, emDia: 15, atrasados: 3 },
    execucao: { total: 12, emDia: 9, atrasados: 3 },
    followup: { total: 25, emDia: 20, atrasados: 5 },
  },
  "bombas-motores-escavadeira": {
    titulo: "Bombas, Motores e Comandos de Escavadeira",
    descricao:
      "Consultoria especializada em sistemas hidráulicos para escavadeiras",
    orcamentos: { total: 30, emDia: 22, atrasados: 8 },
    execucao: { total: 20, emDia: 16, atrasados: 4 },
    followup: { total: 35, emDia: 28, atrasados: 7 },
  },
  "blocos-valvulas": {
    titulo: "Blocos, Válvulas, Orbitrol e Pedal de Freio",
    descricao:
      "Consultoria especializada em componentes de controle hidráulico",
    orcamentos: { total: 22, emDia: 16, atrasados: 6 },
    execucao: { total: 18, emDia: 14, atrasados: 4 },
    followup: { total: 28, emDia: 22, atrasados: 6 },
  },
};

export default function DepartamentoPage() {
  const params = useParams();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const slug = params?.slug as string;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  // Verificar se o departamento existe
  if (!(slug in departamentosData)) {
    router.push("/");
    return null;
  }

  const departamento =
    departamentosData[slug as keyof typeof departamentosData];

  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-8">
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push("/")}
                className="p-0 h-8"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Voltar
              </Button>
            </div>
            <h1 className="text-3xl font-bold">{departamento.titulo}</h1>
            <p className="text-muted-foreground mt-1">
              {departamento.descricao}
            </p>
          </div>
          <div className="flex gap-2">
            <Link href={`/admin/dashboard?departamento=${slug}`} passHref>
              <Button variant="outline">
                <BarChart3 className="mr-2 h-4 w-4" />
                Ver Dashboard
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatusCard
            title="Orçamentos"
            total={departamento.orcamentos.total}
            emDia={departamento.orcamentos.emDia}
            atrasados={departamento.orcamentos.atrasados}
          />
          <StatusCard
            title="Em Execução"
            total={departamento.execucao.total}
            emDia={departamento.execucao.emDia}
            atrasados={departamento.execucao.atrasados}
          />
          <StatusCard
            title="Follow-up"
            total={departamento.followup.total}
            emDia={departamento.followup.emDia}
            atrasados={departamento.followup.atrasados}
          />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Atualização Semanal</CardTitle>
            <CardDescription>
              Faça upload da planilha semanal para atualizar os dados do
              departamento
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="border-2 border-dashed rounded-lg p-8 text-center w-full max-w-md">
              <div className="flex flex-col items-center justify-center gap-2">
                <FileSpreadsheet className="h-10 w-10 text-muted-foreground" />
                <h3 className="text-lg font-medium">
                  Arraste e solte sua planilha aqui
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  ou clique para selecionar um arquivo
                </p>
                <UploadButton variant="default" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
