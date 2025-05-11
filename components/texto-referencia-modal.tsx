"use client"

import type React from "react"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface TextoReferenciaModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  id: string
}

// Mapeamento de IDs para textos de referência
const textosReferencia: Record<string, { title: string; content: React.ReactNode }> = {
  "1": {
    title: "Apresentação da Empresa e Serviços Prestados",
    content: (
      <>
        <p className="mb-4">
          Nossa empresa é especializada no recondicionamento de componentes hidráulicos, oferecendo serviços técnicos de
          alta qualidade para diversos setores da indústria. Contamos com uma equipe qualificada e infraestrutura
          moderna para garantir soluções eficientes e seguras para nossos clientes.
        </p>
        <h4 className="text-lg font-semibold mb-2">Serviços Prestados:</h4>
        <ul className="list-disc pl-8 mb-4">
          <li>Diagnóstico e análise técnica de componentes hidráulicos.</li>
          <li>Recondicionamento de bombas, motores, comandos hidráulicos e válvulas.</li>
          <li>Emissão de laudos técnicos detalhados.</li>
          <li>Testes em bancada para validação do desempenho dos componentes.</li>
          <li>Suporte técnico especializado para aplicação dos componentes em diferentes equipamentos.</li>
        </ul>
        <h4 className="text-lg font-semibold mb-2">Cartela de Produtos</h4>
        <p className="mb-2">
          Além dos serviços prestados, oferecemos uma linha completa de produtos para sistemas hidráulicos, incluindo:
        </p>
        <ul className="list-disc pl-8 mb-4">
          <li>Bombas hidráulicas</li>
          <li>Motores hidráulicos</li>
          <li>Comandos direcionais</li>
          <li>Válvulas proporcionais</li>
          <li>Orbitrols</li>
          <li>Pedais hidráulicos</li>
          <li>Redutores</li>
          <li>Servostatos</li>
          <li>Cilindros hidráulicos</li>
          <li>Unidades hidráulicas</li>
        </ul>
        <p className="mb-2">O orçamento é realizado sem custo para o cliente.</p>
        <p className="mb-2">Caso o orçamento não seja aprovado, o componente será devolvido desmontado.</p>
        <p className="mb-2">
          Caso o cliente solicite a remontagem do componente, será cobrado um valor adicional, definido conforme
          análise, com um prazo de execução de até 7 dias úteis.
        </p>
        <p className="mb-2">
          Além do orçamento, oferecemos o serviço de laudo técnico, que possui um custo específico e pode ser enviado
          junto com o orçamento.
        </p>
        <p className="mb-4">
          Nosso compromisso é oferecer um serviço confiável e transparente, garantindo a melhor solução para a
          manutenção dos sistemas hidráulicos de nossos clientes.
        </p>
        <p>
          Para mais detalhes sobre nossos produtos e serviços, acesse:{" "}
          <a
            href="https://www.novakgouveia.com.br/home/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            www.novakgouveia.com.br
          </a>
        </p>
      </>
    ),
  },
  "2": {
    title: "Confirmação de CNPJ",
    content: (
      <>
        <p className="mb-4">Prezado cliente,</p>
        <p className="mb-4">
          Agradecemos pelo interesse em nossos serviços. Para prosseguirmos com o orçamento aprovado, precisamos
          confirmar o CNPJ que será utilizado para faturamento.
        </p>
        <p className="mb-4">
          Caso não possua um pedido de compras formal, solicitamos gentilmente que nos informe o CNPJ correto para
          emissão da nota fiscal.
        </p>
        <p className="mb-4">
          Esta confirmação é essencial para evitarmos problemas no faturamento e garantir que o processo ocorra sem
          intercorrências.
        </p>
        <p className="mb-4">
          Agradecemos pela atenção e permanecemos à disposição para quaisquer esclarecimentos adicionais.
        </p>
        <p>
          Atenciosamente,
          <br />
          Equipe de Consultoria de Serviços
        </p>
      </>
    ),
  },
  "3": {
    title: "Informações para Faturamento",
    content: (
      <>
        <p className="mb-4">Prezado setor de Faturamento,</p>
        <p className="mb-4">Solicito a emissão de nota fiscal para o serviço concluído conforme informações abaixo:</p>
        <ul className="list-disc pl-8 mb-4">
          <li>Cliente: [NOME DO CLIENTE]</li>
          <li>CNPJ: [NÚMERO DO CNPJ]</li>
          <li>Ordem de Serviço: [NÚMERO DA OS]</li>
          <li>Componente: [DESCRIÇÃO DO COMPONENTE]</li>
          <li>Serviço realizado: [DESCRIÇÃO DO SERVIÇO]</li>
          <li>Valor total: [VALOR]</li>
        </ul>
        <p className="mb-4">Seguem anexos:</p>
        <ul className="list-disc pl-8 mb-4">
          <li>Pedido de compra do cliente</li>
          <li>Aprovação formal do orçamento</li>
          <li>Relatório técnico do serviço</li>
        </ul>
        <p className="mb-4">
          Favor emitir a nota fiscal com urgência, pois o componente já está pronto para envio ao cliente.
        </p>
        <p>
          Atenciosamente,
          <br />
          [NOME DO CONSULTOR]
          <br />
          Consultor Técnico
        </p>
      </>
    ),
  },
  // Adicione mais textos conforme necessário
}

export function TextoReferenciaModal({ isOpen, onClose, title, id }: TextoReferenciaModalProps) {
  const texto = textosReferencia[id]

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold flex items-center justify-between">
            <span>{texto?.title || title}</span>
            <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="max-h-[70vh] overflow-y-auto">
          {texto ? (
            <div className="prose prose-sm max-w-none dark:prose-invert">{texto.content}</div>
          ) : (
            <div className="py-8 text-center">
              <p>Texto de referência não disponível.</p>
            </div>
          )}
        </div>

        <div className="flex justify-end mt-4">
          <Button onClick={onClose}>Fechar</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
