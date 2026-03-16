"use client";

import { AppHeader } from "@/components/AppHeader";
import { AppFooter } from "@/components/AppFooter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function MetodologiaPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AppHeader />
      <main className="flex-grow py-16 px-6 sm:py-24">
        <div className="mx-auto max-w-5xl">
          <h1 className="text-4xl sm:text-6xl font-bold text-foreground mb-8 text-center">
            Metodologia do Estudo
          </h1>
          <div className="prose prose-lg max-w-none text-foreground/85 space-y-12">
            <section className="bg-gradient-light p-8 rounded-3xl border border-primary/10 shadow-sm">
              <h2 className="text-2xl font-bold text-primary mb-4">Desenho da Investigação</h2>
              <p className="text-lg leading-relaxed">
                Este estudo baseia-se num inquérito de vitimização, desenhado para capturar não apenas os crimes reportados às autoridades, mas também a "cifra negra" — crimes que ocorrem mas nunca chegam ao conhecimento oficial.
              </p>
            </section>

            <div className="grid gap-6 md:grid-cols-2">
              <Card className="border-l-4 border-l-primary">
                <CardHeader><CardTitle>Amostragem</CardTitle></CardHeader>
                <CardContent>
                  Foram inquiridos 522 residentes do Município da Samba, utilizando uma técnica de amostragem aleatória estratificada para garantir representatividade.
                </CardContent>
              </Card>
              <Card className="border-l-4 border-l-accent">
                <CardHeader><CardTitle>Recolha de Dados</CardTitle></CardHeader>
                <CardContent>
                  A recolha foi realizada presencialmente através de formulários digitais, garantindo a integridade dos dados e o anonimato dos participantes.
                </CardContent>
              </Card>
            </div>

            <section className="space-y-6">
              <h2 className="text-2xl font-bold text-primary">Análise Estatística</h2>
              <p className="text-lg leading-relaxed">
                Os dados são processados utilizando algoritmos avançados para identificar áreas de risco, horários de maior incidência e perfis de vitimização, permitindo uma visualização clara através de dashboards interativos.
              </p>
            </section>
          </div>
        </div>
      </main>
      <AppFooter />
    </div>
  );
}
