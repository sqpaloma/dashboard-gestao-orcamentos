import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings, Users, Wrench, Cog, ArrowRight } from "lucide-react";

const departamentos = [
  {
    id: "bombas-motores-pistao",
    titulo: "Bombas e Motores de Pistão",
    descricao: "Consultoria especializada em componentes hidráulicos de pistão",
    icon: Wrench,
    color: "bg-white",
    iconColor: "text-blue-600",
    engenheiro: "Carlos Silva",
  },
  {
    id: "bombas-motores-engrenagem",
    titulo: "Bombas e Motores de Engrenagem",
    descricao:
      "Consultoria especializada em componentes hidráulicos de engrenagem",
    icon: Cog,
    color: "bg-white",
    iconColor: "text-green-600",
    engenheiro: "Ana Oliveira",
  },
  {
    id: "bombas-motores-escavadeira",
    titulo: "Bombas, Motores e Comandos de Escavadeira",
    descricao:
      "Consultoria especializada em sistemas hidráulicos para escavadeiras",
    icon: Settings,
    color: "bg-white",
    iconColor: "text-amber-600",
    engenheiro: "Roberto Santos",
  },
  {
    id: "blocos-valvulas",
    titulo: "Blocos, Válvulas, Orbitrol e Pedal de Freio",
    descricao:
      "Consultoria especializada em componentes de controle hidráulico",
    icon: Users,
    color: "bg-white",
    iconColor: "text-purple-600",
    engenheiro: "Mariana Costa",
  },
];

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-8">
      <div className="w-full max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Consultoria</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {departamentos.map((departamento) => (
            <Link
              href={`/departamento/${departamento.id}`}
              key={departamento.id}
              className="block"
            >
              <Card className="h-full transition-all hover:shadow-md">
                <CardHeader className={`${departamento.color} rounded-t-lg`}>
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-3 rounded-full bg-white ${departamento.iconColor} flex items-center justify-center`}
                    >
                      <departamento.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle>{departamento.titulo}</CardTitle>
                      <p className="text-sm text-gray-600">
                        Eng. {departamento.engenheiro}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <CardDescription className="text-base mb-4">
                    {departamento.descricao}
                  </CardDescription>
                  <CardFooter>
                    <Button variant="ghost" className="ml-auto group">
                      Ver detalhes
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </CardFooter>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
