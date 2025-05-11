"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";
import { PassoAPasso } from "./passo-a-passo";
import { TextoReferencia } from "./texto-referencia";

export function ManualContent() {
  const [activeSection, setActiveSection] = useState("organizacao");

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-end mb-4 print:hidden">
        <Button onClick={handlePrint} variant="outline">
          <Printer className="mr-2 h-4 w-4" />
          Imprimir Manual
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/4 print:hidden">
          <Card className="sticky top-20">
            <CardContent className="p-4">
              <nav className="space-y-2">
                <h3 className="font-semibold mb-4">Índice</h3>
                <Button
                  variant={
                    activeSection === "organizacao" ? "default" : "ghost"
                  }
                  className="w-full justify-start"
                  onClick={() => setActiveSection("organizacao")}
                >
                  1. Organização do Departamento
                </Button>
                <Button
                  variant={
                    activeSection === "atendimento" ? "default" : "ghost"
                  }
                  className="w-full justify-start"
                  onClick={() => setActiveSection("atendimento")}
                >
                  2. Procedimentos de Atendimento
                </Button>
                <Button
                  variant={activeSection === "processos" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveSection("processos")}
                >
                  3. Processos Operacionais
                </Button>
                <Button
                  variant={activeSection === "terceiros" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveSection("terceiros")}
                >
                  4. Processos de Terceiros
                </Button>
                <Button
                  variant={activeSection === "sistema" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveSection("sistema")}
                >
                  5. Sistema
                </Button>
                <Button
                  variant={activeSection === "normas" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveSection("normas")}
                >
                  6. Normas e Padrões Técnicos
                </Button>
                <Button
                  variant={activeSection === "melhorias" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveSection("melhorias")}
                >
                  7. Melhorias
                </Button>
              </nav>
            </CardContent>
          </Card>
        </div>

        <div className="lg:w-3/4">
          <Card>
            <CardContent className="p-6">
              <div
                className={activeSection === "organizacao" ? "block" : "hidden"}
              >
                <h2 className="text-2xl font-bold mb-4">
                  1. Organização do Departamento
                </h2>

                <h3 className="text-xl font-semibold mt-6 mb-3">
                  1.1. Estrutura Hierárquica
                </h3>
                <p className="mb-4">
                  O Departamento de Consultoria de Serviços – Engenharia é
                  composto por uma equipe especializada e organizada de forma a
                  garantir eficiência e clareza nos processos. A estrutura
                  hierárquica é a seguinte:
                </p>
                <p className="mb-2">
                  <strong>Gerente de Serviços:</strong> Responsável pela
                  supervisão geral do departamento, apoio técnico e tomada de
                  decisões estratégicas.
                </p>
                <p className="mb-2">
                  <strong>Consultores Técnicos:</strong> Atuam de forma
                  segmentada conforme o tipo de componente, garantindo
                  atendimento especializado:
                </p>
                <ul className="list-disc pl-8 mb-4">
                  <li>Consultor(a) – Bombas e Motores de Pistão</li>
                  <li>Consultor(a) – Bombas e Motores de Engrenagem</li>
                  <li>
                    Consultor(a) – Bombas, Motores e Comandos de Escavadeira
                  </li>
                  <li>
                    Consultor(a) – Blocos, Válvulas, Orbitrol e Pedal de Freio
                  </li>
                </ul>
                <p className="mb-4">
                  <strong>Assistentes Técnicos:</strong> Auxiliam os consultores
                  no acompanhamento dos processos, controle de prazos e na
                  organização dos serviços, contribuindo para o bom andamento
                  das atividades.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3">
                  1.2. Fluxograma
                </h3>
                <div className="bg-muted p-4 rounded-md text-center mb-4">
                  [Fluxograma do Departamento - Representação visual da
                  estrutura e fluxo de trabalho]
                </div>
              </div>

              <div
                className={activeSection === "atendimento" ? "block" : "hidden"}
              >
                <h2 className="text-2xl font-bold mb-4">
                  2. Procedimentos de Atendimento ao Cliente
                </h2>
                <p className="mb-4">
                  O atendimento ao cliente pode ocorrer de forma presencial ou
                  remota, dependendo da situação.
                </p>
                <p className="mb-4">
                  No atendimento presencial, é responsabilidade do consultor
                  realizar a apresentação institucional da empresa durante a
                  primeira visita ao cliente, explicando os serviços oferecidos
                  e estabelecendo um canal de comunicação direto. Nas visitas
                  subsequentes, caso não seja necessária a presença do
                  consultor, o componente é recebido diretamente pela expedição.
                  Nesses casos, deve ser entregue ao cliente um cartão de
                  contato, permitindo que o acompanhamento do serviço seja feito
                  de forma remota.
                </p>
                <p className="mb-4">
                  Já no atendimento online, quando o componente é enviado por
                  transportadora, todo o processo ocorre de forma remota,
                  mantendo a organização e qualidade no acompanhamento e nas
                  comunicações com o cliente.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3">
                  2.1. Contato
                </h3>
                <p className="mb-4">
                  O fluxo de atendimento ao cliente inicia-se com o primeiro
                  contato, que pode ocorrer por mensagem ou ligação, mesmo antes
                  do envio das peças. Nesse momento inicial, é fundamental que o
                  consultor envie ao cliente a apresentação institucional da
                  empresa, juntamente com outras informações relevantes sobre os
                  serviços prestados (
                  <TextoReferencia id="1">Texto 1 – Anexos</TextoReferencia>).
                </p>
                <p className="mb-4">
                  Além disso, deve ser solicitada a ficha cadastral atualizada,
                  que, assim que recebida, deve ser encaminhada ao departamento
                  financeiro, garantindo que os dados de contato do cliente
                  estejam corretamente armazenados, aqui fica a critério do
                  consultor solicitar ou não informações para análise de
                  crédito, podendo deixar para ser feito posteriormente nas
                  negociações.
                </p>
                <p className="mb-4">
                  Após o recebimento do componente na empresa, o consultor deve
                  informar ao cliente o prazo previsto para elaboração do
                  orçamento. Também é necessário solicitar informações sobre a
                  aplicação do componente, uma vez que esses dados são
                  essenciais para a análise técnica e definição dos serviços que
                  serão realizados. Todas essas informações devem ser
                  devidamente registradas na SUB-OS, conforme o modelo
                  estabelecido (Exemplo 1), assegurando rastreabilidade e
                  organização ao processo.
                </p>
              </div>

              <div
                className={activeSection === "processos" ? "block" : "hidden"}
              >
                <h2 className="text-2xl font-bold mb-4">
                  3. Processos Operacionais
                </h2>

                <h3 className="text-xl font-semibold mt-6 mb-3">
                  3.1. Orçamento
                </h3>
                <p className="mb-4">
                  Após o recebimento da Ficha de Orçamento (Ficha 1) preenchida
                  pelo mecânico responsável, o consultor deve verificar se é
                  necessário a realização de laudo técnico, caso sim, enviar
                  para o setor de qualidade e aguardar a finalização, caso não,
                  só seguir o processo.
                </p>
                <p className="mb-4">
                  Registrar o orçamento no sistema Sankhya, na página Central de
                  Vendas (<PassoAPasso id="1">Passo-a-Passo 1</PassoAPasso>).
                  Para isso, é fundamental preencher o prazo de entrega, a
                  garantia e incluir no cabeçalho todas as informações da ficha,
                  como modelo, componente, número de série e os serviços a serem
                  executados.
                </p>
                <p className="mb-4">
                  Em seguida, todas as peças a serem substituídas devem ser
                  adicionadas ao orçamento. Caso alguma peça não tenha estoque
                  disponível (item zerado no sistema), o consultor deve tomar as
                  seguintes providências: enviar uma solicitação de cotação para
                  o setor de compras (Exemplo 2) ou, se já possuir contato com o
                  fornecedor, encaminhar o pedido por e-mail, copiando os
                  responsáveis de compras para acompanhamento.
                </p>
                <p className="mb-4">
                  O orçamento pode ser enviado por qualquer canal desejado
                  (e-mail, whatsapp...) de preferência por e-mail (Exemplo 3)
                  sempre solicitar ao cliente para que caso não tenha pedido de
                  compras formal, confirmar o CNPJ (
                  <TextoReferencia id="2">Texto 2</TextoReferencia>).
                </p>
                <p className="mb-4">
                  Finalizando, o consultor deve finalizar a Sub-os de
                  "Orçamento" e colocar em "Aguardando aprovação" com os prazos
                  de até 2 meses.
                </p>

                <div className="bg-muted p-4 rounded-md mb-4">
                  <h4 className="font-semibold mb-2">
                    Atualização Cadastral e análise de crédito
                  </h4>
                  <p>[Conteúdo a ser preenchido]</p>
                </div>

                <div className="bg-muted p-4 rounded-md mb-4">
                  <h4 className="font-semibold mb-2">
                    Componente sem conserto
                  </h4>
                  <p>
                    Quando a ficha de orçamento indicar "sem conserto",
                    verificar se temos reman ou nova para ofertar o cliente,
                    caso não, solicitar cotações.
                  </p>
                  <p>
                    Em paralelo, solicitar ao departamento de engenharia da
                    aplicação para verificarem a disponibilidade de outro modelo
                    para adaptação.
                  </p>
                </div>

                <h3 className="text-xl font-semibold mt-6 mb-3">
                  3.2. Follow-up
                </h3>
                <p className="mb-4">
                  Para orçamentos que já excederam o prazo e cujo cliente não
                  deseja aprovar, o consultor deve apresentar as opções
                  disponíveis: devolução do item ou sucateamento, garantindo que
                  a decisão do cliente seja devidamente registrada e encaminhada
                  para os procedimentos necessários.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3">
                  3.3. Aprovação
                </h3>
                <p className="mb-4">
                  Quando o orçamento é aprovado, o consultor deve localizar a
                  Ficha de Orçamento correspondente e registrar a data de
                  aprovação e a data de entrega, garantindo que o mecânico tenha
                  clareza sobre seu prazo de execução.
                </p>
                <p className="mb-4">
                  Em seguida, a aprovação deve ser registrada no sistema Sankhya
                  (<PassoAPasso id="2">Passo-a-Passo 2</PassoAPasso>), onde as
                  peças necessárias são solicitadas no Portal de Vendas pela TOP
                  115. Caso tenha sido solicitada uma cotação para compras ou
                  diretamente ao fornecedor, o consultor deve responder ao
                  e-mail informado, comunicando que o orçamento foi aprovado.
                </p>
                <p className="mb-4">
                  Após essa etapa, o consultor deve atualizar a Sub-OS de
                  "Aguardando aprovação" para "Em execução", incluindo o nome do
                  mecânico responsável e os prazos combinados com o cliente.
                </p>
                <p className="mb-4">
                  Por fim, a Ficha de Orçamento deve ser entregue ao setor PEP
                  para dar andamento ao processo na oficina. Além disso, uma
                  cópia deve ser enviada ao almoxarifado para separação das
                  peças e outra ao mecânico responsável para que possa iniciar a
                  execução assim que o componente estiver disponível.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3">
                  3.4. Devolução de Componente
                </h3>
                <p className="mb-4">
                  Quando o orçamento não for aprovado, o consultor deve separar
                  a Ficha de Orçamento e escrever de forma visível que se trata
                  de uma devolução. Na Sub-OS, é necessário alterar o status de
                  "Aguardando aprovação" para **"Faturamento, explicando o
                  motivo da devolução (
                  <PassoAPasso id="3">passo-a-passo 3</PassoAPasso>).
                </p>
                <p className="mb-4">
                  Caso a devolução seja feita por transportadora, o consultor
                  deve solicitar a Nota Fiscal de Retorno, incluindo as
                  informações de peso e volume. Se não souber esses dados, deve
                  consultar a expedição.
                </p>
                <p className="mb-4">
                  Se a devolução for realizada pelo nosso motorista ou pelo
                  próprio cliente, essas informações não são necessárias.
                </p>
                <p className="mb-4">
                  Após finalizar o processo, o consultor deve levar a Ficha de
                  Orçamento ao almoxarifado, para que a separação seja realizada
                  e o processo de devolução siga corretamente.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3">
                  3.5. Programação
                </h3>
                <p className="mb-4">
                  Toda sexta-feira, o consultor deve realizar a programação de
                  montagem e orçamento por meio do aplicativo, em conjunto com o
                  setor de PCP. Essa programação deve ser apresentada ao
                  gerente, garantindo que todas as atividades estejam alinhadas
                  com os prazos estabelecidos.
                </p>
                <p className="mb-4">
                  Caso haja itens em atraso, o consultor deve elaborar e
                  apresentar um plano de ação, detalhando as medidas a serem
                  tomadas para regularizar a situação e evitar novos atrasos no
                  processo.
                </p>
                <div className="bg-muted p-4 rounded-md mb-4">
                  <p className="italic">Reescrever</p>
                </div>

                <h3 className="text-xl font-semibold mt-6 mb-3">
                  3.6. Acompanhamento
                </h3>
                <p className="mb-4">
                  O consultor é responsável por monitorar a execução de todos os
                  componentes, garantindo que o processo ocorra conforme o
                  planejado. Isso inclui verificar se os componentes foram
                  devidamente separados, se as peças do estoque ou do fornecedor
                  já chegaram e se há eventuais atrasos na usinagem.
                </p>
                <p className="mb-4">
                  Além disso, o consultor deve avaliar a necessidade de ajustes,
                  como a realocação para outro mecânico devido à demanda,
                  alterações na programação de montagem ou na etapa de testes.
                </p>
                <p className="mb-4">
                  O gerenciamento e a coordenação dessas atividades devem ser
                  acompanhados por meio dos Relatórios de Execução (Relatório 2)
                  e do Relatório de Usinagem, fornecido pelo setor de PCP que
                  devem ser gerados toda sexta-feira.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3">
                  3.7. Faturamento
                </h3>
                <p className="mb-4">
                  Após a conclusão do componente, o consultor é responsável por
                  gerar as TOPs pertinentes:
                </p>
                <ul className="list-disc pl-8 mb-4">
                  <li>
                    Peças: Gerar a TOP 45 na página "Portal de Movimentação
                    Interna".
                  </li>
                  <li>
                    Serviços: Gerar a TOP 36 na página "Portal de Vendas".
                  </li>
                </ul>
                <p className="mb-4">
                  (O processo detalhado está descrito no{" "}
                  <PassoAPasso id="3">Passo-a-Passo 3</PassoAPasso>.)
                </p>
                <p className="mb-4">
                  Em seguida, todas as informações devem ser enviadas ao setor
                  de Faturamento por meio da Sub-OS (
                  <TextoReferencia id="3">Texto 3</TextoReferencia>), anexando
                  todas as formalizações disponíveis.
                </p>
                <p className="mb-4">
                  O consultor deve atualizar a Sub-OS de "Em execução" para
                  "Faturamento", registrando o nome do responsável e os prazos
                  acordados.
                </p>
                <p className="mb-4">
                  Por fim, é necessário finalizar todos os processos de peças,
                  sendo elas:
                </p>
                <ul className="list-disc pl-8 mb-4">
                  <li>
                    Devolver todas as pecas que não foram usadas (
                    <PassoAPasso id="4">Passo-a-Passo 4</PassoAPasso>)
                  </li>
                  <li>
                    Baixa as pecas que foram usadas e não serão faturadas na top
                    99 na página "Portal de Movimentação Interna" nesse caso é
                    necessário alterar o cliente para Novak e escrever o motivo
                    para essa baixa. (
                    <PassoAPasso id="5">passo-a-passo 5</PassoAPasso>).
                  </li>
                </ul>

                <h3 className="text-xl font-semibold mt-6 mb-3">
                  3.8. Auditoria
                </h3>
                <p className="mb-4">
                  Quando há sobras de peças de kits, conjuntos ou componentes
                  novos que foram utilizados apenas para retirada de peças
                  específicas, não é possível realizar a devolução por meio do
                  processo normal. Nesses casos, o consultor deve seguir o
                  processo de auditoria conforme descrito no (Passo-a-Passo).
                </p>
                <p className="mb-4">
                  O primeiro passo é identificar a peça e verificar se ela
                  possui cadastro no sistema. Caso não possua, o consultor deve
                  reunir todas as informações necessárias (descrição, aplicação,
                  medidas, etc.) e enviar ao setor de compras para que o
                  cadastro seja realizado.
                </p>
                <p className="mb-4">
                  Assim que todos os códigos forem gerados, o consultor deve
                  realizar o lançamento do processo na Central de Compras,
                  utilizando a TOP 22.
                </p>
                <p className="mb-4">
                  Após finalizado, é necessário imprimir duas cópias do
                  processo, levar até a expedição junto com as peças e deixar a
                  ficha de auditoria visível, garantindo o correto
                  encaminhamento e rastreabilidade das sobras.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3">
                  3.9. Análise de Garantia
                </h3>
                <p className="mb-4">
                  Quando um cliente entra em contato relatando problemas com um
                  componente entregue, inicia-se o processo de análise de
                  garantia.
                </p>
                <p className="mb-4">
                  A empresa oferece garantia de 3 meses, válida exclusivamente
                  em bancada. Ao ser informado sobre o problema, o consultor
                  deve explicar ao cliente essa política e solicitar o reenvio
                  do componente para análise, juntamente com o formulário de
                  garantia preenchido (Link 1).
                </p>
                <p className="mb-4">
                  Quando o cliente informa que o prazo de garantia expirou, mas
                  o componente ainda não havia sido instalado ou foi pouco
                  utilizado, o consultor deve tratar o caso com cautela. Ainda
                  assim, o envio do componente e do formulário preenchido deve
                  ser solicitado para que a análise possa ser realizada.
                </p>
                <p className="mb-4">
                  Assim que o componente chega à oficina, a expedição comunica
                  os consultores por meio do grupo de WhatsApp (Grupo 1). Nesses
                  casos, o processo deve ter prioridade na oficina, com
                  acompanhamento direto do PCP, para garantir que não haja
                  atrasos.
                </p>

                <h4 className="text-lg font-semibold mt-4 mb-2">
                  3.9.1. Análise Técnica e Laudo
                </h4>
                <p className="mb-4">
                  O componente é encaminhado ao mecânico, que realiza a
                  desmontagem e registra fotos de todas as peças. Essas imagens
                  são enviadas ao setor de qualidade, responsável por elaborar o
                  laudo técnico.
                </p>
                <p className="mb-4">
                  Se as peças estiverem visualmente em boas condições, o
                  componente segue para o teste em bancada, que será filmado.
                  Caso não sejam identificadas falhas, o laudo é enviado ao
                  cliente informando que a garantia não procede. O componente é,
                  então, liberado para devolução.
                </p>
                <p className="mb-4">
                  Se, durante a análise, for identificada alguma peça com
                  necessidade de substituição ou sinais de contaminação, o
                  processo segue como um orçamento comum. A Ficha de Orçamento é
                  preenchida pela produção e enviada ao consultor.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3">
                  3.10. Pós-vendas
                </h3>
                <p className="mb-4">
                  Assim que todas as etapas forem concluídas no sistema e o
                  componente estiver pronto e embalado, o consultor deve
                  informar ao cliente que o serviço foi finalizado.
                </p>
                <p className="mb-4">
                  Caso o envio seja realizado por transportadora e precise sair
                  no mesmo dia, é essencial comunicar a expedição para garantir
                  o despacho dentro do prazo. Além disso, o consultor deve ficar
                  atento a eventuais solicitações do cliente, como a necessidade
                  de identificação específica na embalagem, e repassar essa
                  informação à expedição para que seja devidamente atendida.
                </p>
                <div className="bg-muted p-4 rounded-md mb-4">
                  <p className="italic">
                    Escrever sobre pesquisa de satisfação do cliente
                  </p>
                  <p className="italic">Atendimento de reclamações.</p>
                  <p className="italic">
                    Análise de serviços recondicionados em caso de falhas
                    recorrentes
                  </p>
                </div>
                <div className="bg-muted p-4 rounded-md mb-4">
                  <h4 className="font-semibold mb-2">Devolução de NF</h4>
                  <p className="italic">Caso...</p>
                </div>
              </div>

              <div
                className={activeSection === "terceiros" ? "block" : "hidden"}
              >
                <h2 className="text-2xl font-bold mb-4">
                  4. Processos Operacionais de Terceiros
                </h2>

                <h3 className="text-xl font-semibold mt-6 mb-3">
                  4.1. Expedição
                </h3>
                <h4 className="text-lg font-semibold mt-4 mb-2">
                  Recebimento de Componentes
                </h4>
                <p className="mb-4">
                  A expedição é responsável por receber os componentes enviados
                  pelos clientes. Sempre que um componente chega com uma OS
                  antiga registrada, ou quando é necessária alguma informação
                  técnica inicial, a expedição informa o consultor para que ele
                  possa tomar as providências adequadas.
                </p>

                <h4 className="text-lg font-semibold mt-4 mb-2">
                  Peças Não Utilizadas
                </h4>
                <p className="mb-4">
                  Sempre que os mecânicos deixam peças que não foram utilizadas,
                  a expedição entra em contato com o consultor, repassando as
                  informações da OS e do cliente. Dessa forma, o consultor pode
                  decidir sobre a destinação dessas peças e atualizar o processo
                  conforme necessário.
                </p>

                <h4 className="text-lg font-semibold mt-4 mb-2">
                  Transporte e Expedição
                </h4>
                <p className="mb-4">
                  Quando um componente está pronto e será transportado por
                  transportadora, a expedição entra em contato com o consultor,
                  repassando todas as informações pertinentes para garantir que
                  o envio ocorra corretamente e dentro do prazo.
                </p>

                <div className="bg-muted p-4 rounded-md mb-4">
                  <h4 className="font-semibold mb-2">
                    Frete Pago pela Novak & Gouveia
                  </h4>
                  <p>
                    É possível que seja aceitos componentes pela transportadora
                    com fretes para serem pagos pela empresa, é obrigação da
                    expedição informar ao consultor responsável no ato de
                    abertura da OS para que seja repassado para o cliente no
                    início das negociações
                  </p>
                </div>

                <h3 className="text-xl font-semibold mt-6 mb-3">
                  4.2. Produção
                </h3>
                <h4 className="text-lg font-semibold mt-4 mb-2">Desmontagem</h4>
                <p className="mb-4">
                  Durante a desmontagem do componente, caso haja dúvidas
                  técnicas ou necessidade de desenho técnico, a produção deve
                  acionar o consultor para esclarecimentos e suporte. A produção
                  deve sempre informar ao consultor quando houver ausência de
                  alguma peça no componente, permitindo a verificação junto ao
                  cliente ou ao setor de compras para providências.
                </p>

                <h4 className="text-lg font-semibold mt-4 mb-2">
                  Aprovação de Peças
                </h4>
                <p className="mb-4">
                  Durante o processo de montagem, caso alguma peça separada
                  esteja incorreta ou falte, a produção deve comunicar o
                  consultor imediatamente, evitando atrasos e permitindo a
                  correção do problema.
                </p>
                <p className="mb-4">
                  A expedição deveria avisar o mecânico assim que chegasse as
                  pecas para que eles fossem verificar se está tudo certo e não
                  esteja faltando nenhuma peca
                </p>

                <h4 className="text-lg font-semibold mt-4 mb-2">
                  Finalização da Montagem
                </h4>
                <p className="mb-4">
                  Ao finalizar a montagem do componente, a produção deve
                  informar o consultor para que ele possa organizar a fila de
                  testes do dia, garantindo o andamento adequado da programação
                  e a entrega dentro dos prazos.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3">
                  4.3. Qualidade
                </h3>
                <h4 className="text-lg font-semibold mt-4 mb-2">
                  Análise de garantia
                </h4>
                <p className="mb-4">
                  O setor de qualidade é responsável por emitir o laudo técnico
                  detalhado, no qual são analisadas e discutidas as possíveis
                  causas da falha identificada no componente. Com base nesse
                  laudo, o consultor pode se posicionar com clareza junto ao
                  cliente, oferecendo uma explicação embasada sobre o ocorrido.
                </p>
                <p className="mb-4">
                  Quando a garantia procede, o laudo é encaminhado ao cliente, o
                  reparo é realizado no componente e o teste final é filmado e
                  compartilhado como forma de comprovar a eficácia da solução.
                  Caso a garantia não proceda, o laudo e um orçamento para o
                  reparo são enviados ao cliente. Após a aprovação, o componente
                  segue pelo fluxo normal de execução, até a entrega final.
                </p>

                <h4 className="text-lg font-semibold mt-4 mb-2">
                  Laudo de Serviço
                </h4>
                <p className="mb-4">
                  O setor de Qualidade é responsável pela elaboração do laudo
                  técnico, que pode ser enviado ao cliente junto com o
                  orçamento, desde que haja alinhamento prévio. Esse laudo deve
                  conter a identificação de todos os problemas encontrados nas
                  peças internas do componente, com registros em imagens
                  detalhadas e a descrição das possíveis causas das falhas.
                </p>
                <p className="mb-4 italic">Falta link para anexos</p>

                <div className="bg-muted p-4 rounded-md mb-4">
                  <p className="italic">inf</p>
                  <p className="italic">Caso...</p>
                </div>
                <p className="mb-4 italic">Falta vendas</p>

                <h3 className="text-xl font-semibold mt-6 mb-3">
                  4.4. Compras
                </h3>
                <h4 className="text-lg font-semibold mt-4 mb-2">Cotações</h4>
                <p className="mb-4">
                  Sempre que uma cotação for enviada ao setor de Compras, é
                  obrigatório o retorno com a devolutiva contendo valores e
                  prazos de entrega. O consultor deve identificar se o valor
                  informado se refere ao custo de compras (com ou sem imposto)
                  ou se já corresponde ao preço final de venda ao cliente.
                </p>

                <h4 className="text-lg font-semibold mt-4 mb-2">
                  Previsão de Chegada de Peças
                </h4>
                <p className="mb-4">
                  Para peças de orçamentos que estão em fase de aprovação, o
                  setor de Compras deve informar o prazo estimado de chegada.
                  Caso se trate de peças importadas, o consultor deve ser
                  informado sobre o tempo estimado de liberação. Em casos de
                  peças nacionais, o prazo padrão deve ser informado. Se houver
                  furo no estoque, é necessário comunicar quando será possível
                  reabastecê-lo.
                </p>

                <h4 className="text-lg font-semibold mt-4 mb-2">
                  Devoluções e Auditoria
                </h4>
                <p className="mb-4">
                  Toda divergência identificada durante processos de devolução
                  ou auditoria deve ser formalizada rapidamente ao consultor
                  responsável, garantindo que o problema seja tratado com
                  agilidade e não seja esquecido.
                </p>

                <h4 className="text-lg font-semibold mt-4 mb-2">
                  Giro de Peças
                </h4>
                <p className="mb-4">
                  Quando necessário, o setor de Compras pode solicitar aos
                  consultores informações sobre peças com alta demanda ou itens
                  que não estão disponíveis em estoque, mas cuja procura tem
                  aumentado. Os consultores também devem informar sempre que
                  identificarem necessidade recorrente de peças fora do estoque,
                  para que seja avaliada a viabilidade de aquisição.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3">4.5. PCP</h3>
                <h4 className="text-lg font-semibold mt-4 mb-2">
                  Atualização do aplicativo
                </h4>
                <p className="mb-4">
                  Manter o sistema atualizado com o status de cada serviço,
                  permitindo o acompanhamento em tempo real por parte dos
                  consultores e demais setores envolvidos.
                </p>

                <h4 className="text-lg font-semibold mt-4 mb-2">
                  Auxílio na programação
                </h4>
                <p className="mb-4">
                  Colaborar na alocação de demandas conforme a disponibilidade e
                  a especialidade de cada mecânico, contribuindo para uma
                  execução mais eficiente e organizada.
                </p>

                <h4 className="text-lg font-semibold mt-4 mb-2">
                  Filmagem de testes
                </h4>
                <p className="mb-4">
                  Acompanhar e registrar, por meio de filmagem, os testes de
                  bancada dos componentes sob análise de garantia, garantindo
                  documentação técnica para embasar laudos e posicionamentos ao
                  cliente.
                </p>

                <h4 className="text-lg font-semibold mt-4 mb-2">
                  Acompanhamento dos prazos
                </h4>
                <p className="mb-4">
                  Monitorar as datas acordadas com os clientes e alertar sobre
                  possíveis desvios, contribuindo com ações corretivas junto aos
                  consultores e à produção.
                </p>

                <h4 className="text-lg font-semibold mt-4 mb-2">
                  Acompanhamento da programação da usinagem
                </h4>
                <p className="mb-4">
                  Verificar o andamento das peças em processo de usinagem,
                  garantindo que não haja atrasos que impactem a montagem final
                  dos componentes.
                </p>

                <h4 className="text-lg font-semibold mt-4 mb-2">
                  Suporte aos consultores
                </h4>
                <p className="mb-4">
                  Fornecer dados e atualizações sempre que necessário,
                  auxiliando os consultores na tomada de decisões, no
                  alinhamento com os clientes e no planejamento das entregas.
                </p>

                <h3 className="text-xl font-semibold mt-6 mb-3">
                  4.6. Financeiro
                </h3>
                <p className="mb-4">
                  Devolutiva de cadastro e análise de crédito Retornar sub os
                  com informações incorretas, falta de informações ou cadastro
                  bloqueado por qualquer razão (o financeiro deveria enviar o
                  pedido de compras para atualização do cadastro, sem ter que
                  voltar para o consultor) Enviar nfs e boletos (quando
                  solicitado quando o cliente solicita devemos ou não enviar o
                  contato do financeiro)
                </p>
              </div>

              <div className={activeSection === "sistema" ? "block" : "hidden"}>
                <h2 className="text-2xl font-bold mb-4">5. Sistema</h2>
                <h3 className="text-xl font-semibold mt-6 mb-3">
                  5.1. Consulta de OS e Ordem de Serviço
                </h3>
                <h3 className="text-xl font-semibold mt-6 mb-3">
                  5.2. Portal de Vendas
                </h3>
                <ul className="list-disc pl-8 mb-4">
                  <li>Top 30</li>
                  <li>Top 36</li>
                  <li>Top 115</li>
                </ul>
                <h3 className="text-xl font-semibold mt-6 mb-3">
                  5.3. Portal de Movimentação Interna
                </h3>
                <ul className="list-disc pl-8 mb-4">
                  <li>Top 45</li>
                  <li>Top 99</li>
                  <li>Top 155</li>
                  <li>Top 185</li>
                </ul>
                <h3 className="text-xl font-semibold mt-6 mb-3">
                  5.4. Portal de Compras
                </h3>
                <ul className="list-disc pl-8 mb-4">
                  <li>Top 22</li>
                </ul>
                <h3 className="text-xl font-semibold mt-6 mb-3">
                  5.5. Consulta de Produtos
                </h3>
              </div>

              <div className={activeSection === "normas" ? "block" : "hidden"}>
                <h2 className="text-2xl font-bold mb-4">
                  6. Normas e Padrões Técnicos
                </h2>
                <p className="mb-4">
                  Todos os processos realizados pelo Departamento de Consultoria
                  de Serviços devem seguir o Manual dos Consultores que
                  asseguram a qualidade do atendimento, a padronização das
                  entregas e a segurança das equipes envolvidas.
                </p>
                <h3 className="text-xl font-semibold mt-6 mb-3">
                  Certificações Aplicáveis
                </h3>
                <p className="mb-4">
                  A empresa será certificada pela ISO 9001 – Sistema de Gestão
                  da Qualidade, o que garante que todos os processos seguem
                  diretrizes rigorosas voltadas à melhoria contínua, controle de
                  processos e satisfação do cliente. O cumprimento dessa norma é
                  responsabilidade de todos os envolvidos nas etapas de
                  atendimento, orçamento, execução e entrega.
                </p>
                <h3 className="text-xl font-semibold mt-6 mb-3">
                  Normas de Segurança
                </h3>
                <p className="mb-4">
                  É obrigatório o uso de Equipamentos de Proteção Individual
                  (EPIs) durante qualquer atividade que envolva riscos
                  operacionais, sejam eles em ambientes de desmontagem,
                  montagem, testes ou expedição. O cumprimento das normas de
                  segurança visa não apenas atender aos requisitos legais, mas
                  também preservar a integridade física das equipes.
                </p>
              </div>

              <div
                className={activeSection === "melhorias" ? "block" : "hidden"}
              >
                <h2 className="text-2xl font-bold mb-4">7. Melhorias</h2>
                <p className="mb-4">
                  O Departamento de Consultoria de Serviços atua com base em
                  indicadores de desempenho e em programas contínuos de
                  capacitação técnica, garantindo a excelência dos processos e a
                  evolução constante da equipe.
                </p>
                <h3 className="text-xl font-semibold mt-6 mb-3">
                  7.1. Indicadores de Desempenho
                </h3>
                <p className="mb-4">
                  Serão utilizados indicadores internos para monitorar o
                  desempenho do departamento e identificar pontos de melhoria.
                  Esses indicadores consideram, entre outros aspectos:
                </p>
                <ul className="list-disc pl-8 mb-4">
                  <li>Taxa de aprovação de orçamentos;</li>
                  <li>Tempo médio de resposta ao cliente;</li>
                  <li>Cumprimento de prazos de entrega;</li>
                  <li>Eficiência no follow-up;</li>
                  <li>Volume de retrabalho por falhas evitáveis.</li>
                </ul>
                <h3 className="text-xl font-semibold mt-6 mb-3">
                  7.2. Capacitações Internas
                </h3>
                <p className="mb-4">
                  Serão realizados treinamentos periódicos sobre novos processos
                  operacionais e administrativos, com foco na padronização e
                  eficiência, além de abordar falhas e solicitar feedbacks e
                  sugestões de melhorias.
                </p>
                <p className="mb-4">
                  Acompanhamento das inovações do setor, promovendo alinhamento
                  com novas tecnologias, ferramentas e práticas recomendadas
                  para consultoria técnica em serviços de engenharia.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="print:block hidden">
        <h1 className="text-3xl font-bold mb-2 text-center">
          Manual do Departamento
        </h1>
        <p className="text-center mb-8">Consultores de Serviços – Engenharia</p>
        <p className="text-center mb-8 text-xl font-bold">NOVAK GOUVEIA LTDA</p>

        {/* Aqui seria incluído todo o conteúdo do manual para impressão */}
        <p className="text-center mt-8">Fim do Manual</p>
      </div>
    </div>
  );
}
