"use client";

import { AppHeader } from "@/components/AppHeader";
import { AppFooter } from "@/components/AppFooter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function QuemSomosPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AppHeader />
      <main className="flex-grow py-16 px-6 sm:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-12 text-center">
            Quem Somos
          </h2>
          <div className="grid gap-8 md:grid-cols-3 text-foreground/85 mb-16">
            <Card className="bg-card border-primary/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <CardTitle className="text-primary">Nossa Missão</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="leading-relaxed">
                  É uma iniciativa universitária multidisciplinar criada para promover investigação aplicada, inovação tecnológica e apoio à comunidade no combate à criminalidade urbana.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-primary/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <CardTitle className="text-primary">Nossa Abordagem</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="leading-relaxed">
                  Através da análise de dados e da integração entre ciência criminal e engenharia de sistemas, buscamos oferecer soluções concretas que melhorem a qualidade de vida e a segurança dos cidadãos.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-primary/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <CardTitle className="text-primary">Nossa Equipa</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="leading-relaxed">
                  O projeto é fruto da colaboração entre docentes, estudantes e especialistas das áreas de criminologia, estatística, informática e segurança pública.
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="bg-gradient-hero text-white p-12 rounded-[3rem] shadow-xl">
             <h3 className="text-3xl font-bold mb-6 text-center">Nossa História</h3>
             <p className="text-lg leading-relaxed text-center max-w-4xl mx-auto">
                Este projeto nasceu da necessidade urgente de dotar as instituições de segurança de Angola com ferramentas digitais modernas que pudessem colmatar a falta de dados estruturados sobre a criminalidade no país.
             </p>
          </div>
        </div>
      </main>
      <AppFooter />
    </div>
  );
}
