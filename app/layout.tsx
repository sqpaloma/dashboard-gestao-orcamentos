import type React from "react";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { Navbar } from "@/components/navbar";
import { OrcamentosProvider } from "@/lib/context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gerenciamento Consultoria | Painel de Orçamentos",
  description:
    "Visualização interativa de dados de orçamentos para Gerenciamento Consultoria",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <OrcamentosProvider>
          <Navbar />
          {children}
          <Toaster />
        </OrcamentosProvider>
      </body>
    </html>
  );
}
