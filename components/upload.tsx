"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { read, utils } from "xlsx";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UploadIcon, FileSpreadsheet } from "lucide-react";
import { Orcamento, useOrcamentos } from "@/lib/context";

interface UploadProps {
  onSuccess?: () => void;
}

export function Upload({ onSuccess }: UploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const { setOrcamentos } = useOrcamentos();

  const handleFile = async (file: File) => {
    if (!file) return;

    if (!file.name.endsWith(".xlsx")) {
      toast({
        title: "Formato inválido",
        description: "Por favor, selecione um arquivo Excel (.xlsx)",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      setFileName(file.name);

      const data = await file.arrayBuffer();
      const workbook = read(data);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = utils.sheet_to_json(worksheet);

      // Validar estrutura esperada
      if (jsonData.length === 0) {
        throw new Error("Planilha vazia");
      }

      const firstRow = jsonData[0] as any;
      const requiredColumns = [
        "Data do Orçamento",
        "Responsável",
        "Status",
        "Valor",
      ];

      const missingColumns = requiredColumns.filter(
        (col) =>
          !Object.keys(firstRow).some(
            (key) =>
              key.toLowerCase() === col.toLowerCase() ||
              key.toLowerCase().includes(col.toLowerCase())
          )
      );

      if (missingColumns.length > 0) {
        throw new Error(
          `Colunas obrigatórias não encontradas: ${missingColumns.join(", ")}`
        );
      }

      // Processar e normalizar dados
      const processedData = jsonData
        .map((row: any) => {
          // Encontrar as chaves correspondentes às colunas necessárias
          const dataKey =
            Object.keys(row).find(
              (k) =>
                k.toLowerCase().includes("data") ||
                k.toLowerCase().includes("date")
            ) || "Data do Orçamento";

          const responsavelKey =
            Object.keys(row).find(
              (k) =>
                k.toLowerCase().includes("responsável") ||
                k.toLowerCase().includes("responsavel")
            ) || "Responsável";

          const statusKey =
            Object.keys(row).find((k) => k.toLowerCase().includes("status")) ||
            "Status";

          const valorKey =
            Object.keys(row).find(
              (k) =>
                k.toLowerCase().includes("valor") ||
                k.toLowerCase().includes("value")
            ) || "Valor";

          // Converter data para formato padrão
          let data = row[dataKey];
          if (typeof data === "number") {
            // Converter número Excel para data
            data = new Date(Math.round((data - 25569) * 86400 * 1000));
          } else if (typeof data === "string") {
            data = new Date(data);
          }

          // Normalizar valor
          let valor = row[valorKey];
          if (typeof valor === "string") {
            valor = Number.parseFloat(
              valor.replace(/[^\d.,]/g, "").replace(",", ".")
            );
          }

          return {
            data:
              data instanceof Date && !isNaN(data.getTime())
                ? data.toISOString().split("T")[0]
                : typeof data === "string"
                ? data
                : null,
            responsavel: String(row[responsavelKey] || ""),
            status: String(row[statusKey] || "").toLowerCase(),
            valor: isNaN(valor) ? 0 : valor,
          };
        })
        .filter((item): item is Orcamento => {
          return Boolean(item.data && item.responsavel && item.status);
        });

      setOrcamentos(processedData);

      toast({
        title: "Arquivo processado com sucesso",
        description: `${processedData.length} orçamentos carregados`,
      });

      router.refresh();

      if (onSuccess) {
        onSuccess();
      }
    } catch (error: any) {
      toast({
        title: "Erro ao processar arquivo",
        description:
          error.message || "Verifique se o arquivo está no formato correto",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  };

  return (
    <div>
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center ${
          isDragging ? "border-primary bg-primary/5" : "border-border"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center gap-2">
          <FileSpreadsheet className="h-10 w-10 text-muted-foreground" />
          <h3 className="text-lg font-medium">
            {fileName ? fileName : "Arraste e solte seu arquivo aqui"}
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            ou clique para selecionar um arquivo
          </p>
          <div className="relative">
            <Input
              id="file-upload"
              type="file"
              accept=".xlsx"
              className="absolute inset-0 opacity-0 w-full cursor-pointer"
              onChange={handleInputChange}
              disabled={isLoading}
            />
            <Button disabled={isLoading}>
              <UploadIcon className="mr-2 h-4 w-4" />
              {isLoading ? "Processando..." : "Selecionar arquivo"}
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-4 text-sm text-muted-foreground">
        <p>Estrutura esperada da planilha:</p>
        <ul className="list-disc list-inside mt-2">
          <li>Data do Orçamento</li>
          <li>Responsável</li>
          <li>Status (enviado, aprovado, recusado)</li>
          <li>Valor</li>
        </ul>
      </div>
    </div>
  );
}
