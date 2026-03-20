"use client";

import { AppHeader } from "@/components/AppHeader";
import { AppFooter } from "@/components/AppFooter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, Target, Eye, Shield, Users, Lightbulb, GraduationCap, Heart, Award, Layout, BookOpen, Info } from "lucide-react";

export default function QuemSomosPage() {
  const valores = [
    { icon: <Shield className="w-5 h-5 text-primary" />, titulo: "Ética e Integridade", desc: "Agir com honestidade, responsabilidade e respeito nas relações académicas e sociais." },
    { icon: <Users className="w-5 h-5 text-primary" />, titulo: "Trabalho em Equipa", desc: "Valorizar a colaboração e a cooperação entre os membros para alcançar objetivos comuns." },
    { icon: <Lightbulb className="w-5 h-5 text-primary" />, titulo: "Inovação e Criatividade", desc: "Estimular novas ideias e abordagens para enfrentar desafios académicos e sociais." },
    { icon: <Award className="w-5 h-5 text-primary" />, titulo: "Excelência Académica", desc: "Buscar continuamente a qualidade nas atividades de estudo, pesquisa e produção científica." },
    { icon: <Heart className="w-5 h-5 text-primary" />, titulo: "Compromisso Social", desc: "Aplicar o conhecimento adquirido para contribuir positivamente com a sociedade." },
    { icon: <GraduationCap className="w-5 h-5 text-primary" />, titulo: "Desenvolvimento Profissional", desc: "Promover o crescimento individual dos membros, preparando-os para desafios futuros." },
    { icon: <CheckCircle2 className="w-5 h-5 text-primary" />, titulo: "Responsabilidade e Autonomia", desc: "Assumir a responsabilidade pelas próprias ações e decisões no âmbito do grupo." },
    { icon: <Users className="w-5 h-5 text-primary" />, titulo: "Respeito à Diversidade", desc: "Reconhecer e valorizar as diferentes perspectivas, experiências e origens." }
  ];

  const objetivosGeda = [
    "Promover estudos e pesquisas sobre temas relacionados ao desempenho académico e desafios estudantis.",
    "Facilitar a elaboração e publicação de artigos científicos em revistas académicas.",
    "Organizar e participar de eventos académicos como palestras, painéis e jornadas científicas.",
    "Estimular o trabalho em equipa e o compromisso com valores éticos e profissionais.",
    "Fortalecer a ligação entre a formação académica e a realidade social e comunitária."
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AppHeader />
      <main className="flex-grow">
        
        {/* PARTE 2: O GRUPO GEDA (Conteúdo Novo) */}
        <section className="bg-gradient-hero py-20 text-white">
          <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/3 flex justify-center">
              <div className="bg-white p-4 rounded-[2rem] shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
                <img src="/GEDA.png" alt="Logo GEDA" className="w-64 h-auto object-contain" />
              </div>
            </div>
            <div className="md:w-2/3 space-y-6 text-center md:text-left">
              <h2 className="text-4xl sm:text-6xl font-black tracking-tight">GEDA</h2>
              <p className="text-2xl font-light text-white/90">Grupo de Estudos e Desenvolvimento Académico</p>
              <div className="h-1 w-24 bg-accent rounded-full mx-auto md:mx-0" />
              <p className="text-lg text-white/80 max-w-2xl">
                O GEDA é o núcleo responsável pela coordenação científica e técnica deste projeto, unindo estudantes e docentes em prol da investigação aplicada.
              </p>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 space-y-24">
          
          <section className="grid md:grid-cols-2 gap-10">
            <Card className="border-primary/10 shadow-xl bg-card">
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-2xl"><Target className="w-8 h-8 text-primary" /></div>
                <CardTitle className="text-3xl font-bold">Missão</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg leading-relaxed text-foreground/80">
                  Fomentar o desenvolvimento académico, científico e pessoal dos estudantes do Curso de Ciências Criminais, promovendo uma cultura de pesquisa, inovação e compromisso social.
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/10 shadow-xl bg-card">
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="p-3 bg-accent/10 rounded-2xl"><Eye className="w-8 h-8 text-accent" /></div>
                <CardTitle className="text-3xl font-bold">Visão</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg leading-relaxed text-foreground/80">
                  Tornar-se uma referência no desenvolvimento de competências investigativas e na produção de conhecimento aplicado à realidade académica e social.
                </p>
              </CardContent>
            </Card>
          </section>

          <section className="space-y-12">
            <div className="text-center">
              <h2 className="text-4xl font-black text-primary mb-4">Nossos Valores</h2>
              <p className="text-muted-foreground">Os pilares que sustentam a nossa conduta e excelência.</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {valores.map((val, i) => (
                <Card key={i} className="border-none shadow-md bg-muted/30 hover:bg-primary/5 transition-colors">
                  <CardContent className="pt-6 text-center space-y-3">
                    <div className="mx-auto w-12 h-12 flex items-center justify-center bg-white rounded-xl shadow-sm">{val.icon}</div>
                    <h4 className="font-bold text-lg">{val.titulo}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{val.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="bg-gradient-light rounded-[3rem] p-10 sm:p-16 border border-primary/10">
            <h2 className="text-4xl font-black text-primary mb-10 text-center">Objetivos Estratégicos GEDA</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                {objetivosGeda.map((obj, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="mt-1 h-6 w-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-lg text-foreground/80 leading-snug">{obj}</p>
                  </div>
                ))}
              </div>
              <div className="hidden md:flex items-center justify-center">
                 <div className="relative w-full aspect-square max-w-md">
                    <div className="absolute inset-0 bg-primary/20 rounded-full animate-pulse" />
                    <div className="absolute inset-8 bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center border-4 border-dashed border-primary/30">
                       <Target className="w-32 h-32 text-primary/40" />
                    </div>
                 </div>
              </div>
            </div>
          </section>

          <section className="space-y-12 pb-12">
            <div className="text-center">
              <h2 className="text-4xl font-black text-primary mb-4">Estrutura Organizacional</h2>
              <p className="text-muted-foreground">Como nos organizamos para atingir a excelência.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center border-t-4 border-primary shadow-lg">
                <CardHeader><CardTitle>Coordenação Geral</CardTitle></CardHeader>
                <CardContent>Composta por um professor orientador, garantindo o rigor académico.</CardContent>
              </Card>
              <Card className="text-center border-t-4 border-primary shadow-lg">
                <CardHeader><CardTitle>Coordenação do Grupo</CardTitle></CardHeader>
                <CardContent>Composta por dois alunos: um coordenador e um coordenador adjunto.</CardContent>
              </Card>
              <Card className="text-center border-t-4 border-primary shadow-lg">
                <CardHeader><CardTitle>Secretaria</CardTitle></CardHeader>
                <CardContent>Responsável pela organização administrativa, atas e cronogramas.</CardContent>
              </Card>
            </div>
            <Card className="bg-primary text-white p-8 rounded-3xl text-center shadow-2xl">
               <h3 className="text-2xl font-bold mb-4 flex items-center justify-center gap-3">
                 <Layout className="w-6 h-6" /> Subgrupos Temáticos de Pesquisa
               </h3>
               <p className="text-white/80 max-w-3xl mx-auto text-lg leading-relaxed">
                 Focados nas diferentes áreas de estudo e desafios académicos. Cada subgrupo tem um líder responsável por organizar e dinamizar o trabalho de pesquisa específico.
               </p>
            </Card>
          </section>

        </div>
      </main>
      <AppFooter />
    </div>
  );
}
