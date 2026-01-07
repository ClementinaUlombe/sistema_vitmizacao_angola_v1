"use client";

import { AppHeader } from "@/components/AppHeader";
import { AppFooter } from "@/components/AppFooter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const services = [
  {
    title: "Polícia (Unidade de Proteção à Vítima)",
    description: "Para denúncias e proteção imediata.",
  },
  {
    title: "Serviços Públicos (IGAE, INAC, SIC)",
    description: "Apoio governamental em diversas áreas.",
  },
  {
    title: "Centros de Apoio Psicológico",
    description: "Suporte emocional e terapia.",
  },
  {
    title: "Assistência Social",
    description: "Ajuda com recursos e programas sociais.",
  },
  {
    title: "Centros Jurídicos ou Gabinetes de Apoio à Vítima",
    description: "Aconselhamento legal e representação.",
  },
  {
    title: "ONG’s que prestam suporte",
    description: "Organizações não-governamentais dedicadas a ajudar vítimas.",
  },
];

export default function ApoioPage() {
  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <main className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <h1 className="text-3xl sm:text-5xl font-bold text-foreground mb-4 text-center">
            Encontre Serviço de Apoio
          </h1>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            Você não está sozinho. Encontre ajuda perto de você.
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <Card key={index} className="bg-card border-primary/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <CardTitle className="text-primary">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/80">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <AppFooter />
    </div>
  );
}
