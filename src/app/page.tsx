"use client";

import { AppHeader } from "@/components/AppHeader";
import { AppFooter } from "@/components/AppFooter";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import HeroSlideshow from "@/components/HeroSlideshow";
import NumberCounter from "@/components/NumberCounter";
import ExcelUpload from "@/components/ExcelUpload";
import ChatbotInterface from "@/components/ChatbotInterface";
import GraphDisplay from "@/components/GraphDisplay";
import ReportModal from "@/components/ReportModal";
import DenunciaModal from "@/components/DenunciaModal";
import { useState, useEffect } from "react";

const heroHands = "/hero-hands.jpg";
const heroBooks = "/hero-books.jpg";
const heroTech = "/hero-tech.jpg";
const parallaxBg = "/parallax-bg.jpg";

const Page = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  const heroImages = [
    "/apontar.gif",
    "/imagesmaos.jpeg",
    "/livro.jpeg",
    "/maocabeca.jpg", // Placeholder for "two people hugging"
    "/maos.jpg",
    "/nochao.jpg",
    "/telefone.webp",
  ];

  return (
    <div className="min-h-screen">
      <AppHeader />

      {/* Hero Section */}
      <section id="inicio" className="relative isolate overflow-hidden min-h-[600px] flex items-center">
        <HeroSlideshow images={heroImages} intervalMs={5000} />
        <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 sm:py-32">
          <div className="max-w-3xl animate-fade-in">
            <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
              Sistema de Análise da Vitimização Criminal
            </h1>
            <p className="text-xl text-white/95 mb-4 drop-shadow-md">
              Bairro Gamek à Direita – Distrito Urbano da Samba, Luanda, 2025
            </p>
            <p className="text-lg text-white/90 mb-8 max-w-2xl drop-shadow-md">
              Uma plataforma inteligente que transforma dados de pesquisa social em informação científica acessível, apoiando políticas públicas e o conhecimento sobre segurança urbana em Angola.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" variant="secondary" className="text-base shadow-lg hover-scale">
                Sobre o Estudo
              </Button>
              <ReportModal>
                <Button size="lg" className="text-base bg-blue-500 text-white hover:bg-blue-600 shadow-lg hover-scale">
                  Enviar Denúncia
                </Button>
              </ReportModal>
              {isLoggedIn ? (
                <Link href="/dashboard" passHref>
                  <Button size="lg" className="text-base bg-purple-light text-purple-deep hover:bg-purple-deep hover:text-white shadow-lg hover-scale">
                    Ir para o Painel
                  </Button>
                </Link>
              ) : (
                <Link href="/auth/login" passHref>
                  <Button size="lg" className="text-base bg-purple-light text-purple-deep hover:bg-purple-deep hover:text-white shadow-lg hover-scale">
                    Entrar no Sistema
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Estatísticas Principais */}
      <section className="bg-gradient-light py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="bg-gradient-card border-primary/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <CardTitle className="text-primary text-4xl font-bold"><NumberCounter targetValue={522} /></CardTitle>
                <CardDescription>Residentes Inquiridos</CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-gradient-card border-primary/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <CardTitle className="text-primary text-4xl font-bold"><NumberCounter targetValue={55.9} decimals={1} suffix="%" /></CardTitle>
                <CardDescription>Taxa de Vitimização (12 meses)</CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-gradient-card border-primary/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <CardTitle className="text-destructive text-4xl font-bold"><NumberCounter targetValue={68.8} decimals={1} suffix="%" /></CardTitle>
                <CardDescription>Crimes Não Denunciados</CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-gradient-card border-primary/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <CardTitle className="text-accent text-4xl font-bold"><NumberCounter targetValue={4} /></CardTitle>
                <CardDescription>Bairros Analisados</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Seção Institucional */}
      <section id="sobre-estudo" className="bg-background py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-3xl sm:text-5xl font-bold text-foreground mb-4 text-center">
            Conhecimento e Tecnologia pela Segurança de Angola
          </h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            Uma iniciativa pioneira do INSUTEC para transformar dados em ação
          </p>
          
          <div className="prose prose-lg max-w-none text-foreground/85 space-y-6 mb-12">
            <p className="text-lg leading-relaxed">
              Todos os anos, milhares de cidadãos em Angola são direta ou indiretamente afetados pela criminalidade urbana. O impacto desses atos vai muito além das perdas materiais — fere a confiança nas instituições, gera medo e mina o bem-estar das comunidades. A segurança pública é, portanto, um direito fundamental e um pilar essencial para o desenvolvimento humano e social do país.
            </p>
            <p className="text-lg leading-relaxed">
              O Instituto Superior de Ciências e Tecnologias (INSUTEC), comprometido com a missão de formar profissionais capazes de responder aos desafios reais da sociedade angolana, reconheceu a necessidade de unir conhecimento e tecnologia em prol da segurança nacional. Dessa visão nasceu o projeto "Sistema de Análise de Vitimização Criminal e Percepção de Segurança da População do Bairro Gamek à Direita", uma iniciativa que marca o encontro entre dois campos estratégicos: as Ciências Criminais, responsáveis por compreender as causas e os impactos do crime, e a Engenharia Informática e Sistemas de Informação, encarregada de transformar dados em soluções inteligentes.
            </p>
            <p className="text-lg leading-relaxed">
              Mais do que um estudo académico, este projeto representa um compromisso com a nação angolana — um esforço para compreender o fenómeno da vitimização, identificar as vulnerabilidades das comunidades e criar ferramentas tecnológicas que auxiliem as autoridades, os investigadores e os cidadãos na construção de um ambiente mais seguro.
            </p>
            <p className="text-lg leading-relaxed">
              Através da recolha de dados reais, da análise estatística e do uso de tecnologias avançadas de informação, o sistema permitirá monitorar padrões de criminalidade, avaliar a perceção de segurança e propor políticas públicas baseadas em evidências concretas. Além disso, o projeto incorpora uma componente inovadora de inteligência artificial, capaz de interagir com o utilizador e oferecer informações, tendências e previsões de forma acessível e transparente.
            </p>
            <p className="text-lg leading-relaxed">
              O ano de 2025 marca um novo capítulo para o INSUTEC e para Angola: o início de uma era em que a ciência e a tecnologia se unem pela justiça, pela segurança e pela dignidade do cidadão.
            </p>
            <p className="italic font-semibold text-primary text-xl text-center mt-8">
              "Proteger vidas, compreender o crime e fortalecer a confiança pública — eis o propósito que move o futuro da segurança em Angola."
            </p>
          </div>

          {/* Problema e Hipóteses */}
          <div className="grid gap-8 md:grid-cols-2 mt-16">
            <Card className="bg-gradient-card border-primary/20 hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-2xl text-primary">Problema de Investigação</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/80 leading-relaxed">
                  Qual é o índice de vitimização criminal no bairro Gamek à Direita e como ele se relaciona com a percepção de segurança e a confiança nas autoridades policiais?
                </p>
                <p className="text-sm text-muted-foreground mt-4">
                  Motivado pela alta incidência de crimes, subnotificação e necessidade de dados locais para intervenções eficazes.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-primary/20 hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-2xl text-primary">Objetivo Geral</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/80 leading-relaxed">
                  Analisar o índice de vitimização criminal e a percepção de segurança da população do bairro Gamek à Direita, identificando factores associados à subnotificação de crimes e à insegurança percebida.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Hipóteses */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-foreground mb-6">Hipóteses de Investigação</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { id: "H1", text: "O índice de vitimização no bairro é elevado (>50% nos últimos 12 meses)" },
                { id: "H2", text: "O nível de denúncia é baixo (<30% das vítimas formalizam queixas)" },
                { id: "H3", text: "Baixa confiança institucional aumenta a não denúncia de crimes" },
                { id: "H4", text: "Baixa denúncia está associada a maior percepção de insegurança" }
              ].map((hipotese, idx) => (
                <Card key={idx} className="border-l-4 border-l-accent hover:shadow-md transition-all duration-300 hover:translate-x-1">
                  <CardContent className="pt-6">
                    <span className="font-bold text-accent">{hipotese.id}:</span>{" "}
                    <span className="text-foreground/80">{hipotese.text}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Seção Parallax com Objetivos */}
      <section className="relative py-24 sm:py-32 overflow-hidden">
        <div 
          className="absolute inset-0 bg-fixed bg-center bg-cover"
          style={{ 
            backgroundImage: `url(${parallaxBg})`,
            transform: 'translateZ(0)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-hero opacity-90" />
        
        <div className="relative z-10 mx-auto max-w-6xl px-6">
          <h2 className="text-3xl sm:text-5xl font-bold text-white mb-12 text-center drop-shadow-lg">
            Objetivos Específicos do Estudo
          </h2>
          
          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                icon: "📊",
                title: "Mapear Crimes",
                description: "Identificar tipos e frequência de crimes reportados nos últimos 12 meses no bairro."
              },
              {
                icon: "🔍",
                title: "Avaliar Percepção",
                description: "Analisar a percepção de segurança diurna e noturna considerando variáveis sociodemográficas."
              },
              {
                icon: "📢",
                title: "Identificar Motivos",
                description: "Compreender razões para não denúncia e nível de confiança nas instituições policiais."
              },
              {
                icon: "💡",
                title: "Propor Soluções",
                description: "Desenvolver recomendações para políticas de segurança pública baseadas em evidências."
              }
            ].map((objetivo, idx) => (
              <Card key={idx} className="bg-card/95 backdrop-blur-sm border-border/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover-scale">
                <CardHeader>
                  <div className="text-4xl mb-2">{objetivo.icon}</div>
                  <CardTitle className="text-xl text-primary">{objetivo.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/80">{objetivo.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Dados da Investigação */}
      <section id="dados" className="bg-background py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl sm:text-5xl font-bold text-foreground mb-4 text-center">
            Resultados da Investigação
          </h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            Dados recolhidos de 522 residentes do Bairro Gamek à Direita
          </p>

          {/* Vitimização */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-primary mb-6">Experiências de Vitimização Criminal</h3>
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="bg-gradient-card border-destructive/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <CardTitle className="text-destructive text-5xl font-bold"><NumberCounter targetValue={55.9} decimals={1} suffix="%" /></CardTitle>
                  <CardDescription className="text-base">Foram vítimas de crime nos últimos 12 meses</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">292 de 522 inquiridos reportaram vitimização</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card border-accent/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <CardTitle className="text-accent text-5xl font-bold"><NumberCounter targetValue={56.8} decimals={1} suffix="%" /></CardTitle>
                  <CardDescription className="text-base">Sofreram vitimização múltipla</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Vítimas que sofreram 2 ou mais crimes no período</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card border-primary/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <CardTitle className="text-primary text-5xl font-bold"><NumberCounter targetValue={62.3} decimals={1} suffix="%" /></CardTitle>
                  <CardDescription className="text-base">Crimes ocorreram à noite</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Período noturno é o mais vulnerável</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Tipos de Crime */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-primary mb-6">Tipos de Crimes Mais Reportados</h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { tipo: "Roubo", percentagem: "69.5%", icon: "🚨" },
                { tipo: "Furto", percentagem: "62.3%", icon: "👜" },
                { tipo: "Agressão", percentagem: "37.7%", icon: "✊" },
                { tipo: "Crime Cibernético", percentagem: "31.8%", icon: "💻" },
                { tipo: "Arrombamento", percentagem: "14.7%", icon: "🚪" },
                { tipo: "Fraude", percentagem: "6.8%", icon: "💳" }
              ].map((crime, idx) => (
                <Card key={idx} className="border-l-4 border-l-destructive hover:shadow-md transition-all duration-300 hover:translate-x-1">
                  <CardContent className="pt-6 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-foreground text-lg">{crime.tipo}</p>
                      <p className="text-2xl font-bold text-destructive"><NumberCounter targetValue={parseFloat(crime.percentagem)} decimals={1} suffix="%" /></p>
                    </div>
                    <span className="text-4xl">{crime.icon}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Denúncia e Confiança */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-primary mb-6">Denúncia e Confiança Institucional</h3>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card className="bg-gradient-card border-destructive/30 hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-destructive text-4xl font-bold"><NumberCounter targetValue={68.8} decimals={1} suffix="%" /></CardTitle>
                  <CardDescription>Não denunciaram os crimes</CardDescription>
                </CardHeader>
              </Card>

              <Card className="bg-gradient-card border-accent/30 hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-accent text-4xl font-bold"><NumberCounter targetValue={62.2} decimals={1} suffix="%" /></CardTitle>
                  <CardDescription>Falta de confiança na polícia</CardDescription>
                </CardHeader>
              </Card>

              <Card className="bg-gradient-card border-muted-foreground/30 hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-muted-foreground text-4xl font-bold"><NumberCounter targetValue={46.8} decimals={1} suffix="%" /></CardTitle>
                  <CardDescription>Sensação de inutilidade</CardDescription>
                </CardHeader>
              </Card>

              <Card className="bg-gradient-card border-primary/30 hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-primary text-4xl font-bold"><NumberCounter targetValue={34.8} decimals={1} suffix="%" /></CardTitle>
                  <CardDescription>Medo de represálias</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>

          {/* Percepção de Segurança */}
          <div>
            <h3 className="text-2xl font-bold text-primary mb-6">Percepção de Segurança</h3>
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="bg-gradient-light border-primary/30 hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-xl text-primary flex items-center gap-2">
                    <span>☀️</span> Durante o Dia
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-foreground/80">Sentem-se seguros</span>
                    <span className="font-bold text-primary text-xl"><NumberCounter targetValue={42.5} decimals={1} suffix="%" /></span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-foreground/80">Sentem-se inseguros</span>
                    <span className="font-bold text-destructive text-xl"><NumberCounter targetValue={24.9} decimals={1} suffix="%" /></span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-foreground/80">Posição neutra</span>
                    <span className="font-bold text-muted-foreground text-xl"><NumberCounter targetValue={19.7} decimals={1} suffix="%" /></span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-hero border-destructive/30 hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-xl text-white flex items-center gap-2">
                    <span>🌙</span> Durante a Noite
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-white/90">Sentem-se seguros</span>
                    <span className="font-bold text-white text-xl"><NumberCounter targetValue={23.8} decimals={1} suffix="%" /></span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/90">Sentem-se inseguros</span>
                    <span className="font-bold text-destructive-foreground text-xl"><NumberCounter targetValue={45.0} decimals={1} suffix="%" /></span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/90">Posição neutra</span>
                    <span className="font-bold text-white/70 text-xl"><NumberCounter targetValue={22.6} decimals={1} suffix="%" /></span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Seção Quem Somos */}
      <section id="quem-somos" className="bg-gradient-light py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-8 text-center">
            Quem Somos
          </h2>
          <div className="grid gap-8 md:grid-cols-3 text-foreground/85 mb-12">
            <Card className="bg-card border-primary/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <CardTitle className="text-primary">Nossa Missão</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="leading-relaxed">
                  O INSUTEC é uma iniciativa universitária multidisciplinar criada para promover investigação aplicada, inovação tecnológica e apoio à comunidade no combate à criminalidade urbana.
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

          {/* Metodologia */}
          <div className="bg-card rounded-xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-primary mb-6">Metodologia da Investigação</h3>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <span className="text-2xl">👥</span> Amostra Estratificada
                </h4>
                <p className="text-foreground/80 mb-4">
                  522 residentes distribuídos em 4 bairros: Pedalé (29.7%), Huambo (26.8%), Inorad (21.5%) e Saber Andar (22.0%)
                </p>
                <p className="text-sm text-muted-foreground">
                  Margem de erro: 5% | Nível de confiança: 95%
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <span className="text-2xl">📋</span> Técnicas de Recolha
                </h4>
                <ul className="space-y-2 text-foreground/80">
                  <li>• Inquéritos por questionário estruturado</li>
                  <li>• Entrevistas semiestruturadas</li>
                  <li>• Observação direta do ambiente urbano</li>
                  <li>• Análise estatística com SPSS</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção O Que Fazemos */}
      <section className="bg-background py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl sm:text-5xl font-bold text-foreground mb-4 text-center">
            O Que Fazemos
          </h2>
          <p className="text-center text-muted-foreground mb-12 text-lg max-w-3xl mx-auto">
            Transformamos dados em soluções concretas para a segurança da comunidade
          </p>

          <div className="mb-12 max-w-4xl mx-auto">
            <p className="text-lg text-foreground/85 mb-4 leading-relaxed">
              A missão do INSUTEC é criar uma plataforma digital inteligente que analise e apresente indicadores sobre vitimização, perceção de segurança e confiança institucional.
            </p>
            <p className="text-lg text-foreground/85 leading-relaxed">
              O sistema integra dados estatísticos, relatórios de campo e ferramentas de visualização interativa, permitindo às autoridades locais e à sociedade civil compreender melhor as dinâmicas da criminalidade e planear ações preventivas.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-12">
            {[
              {
                title: "Cooperação",
                description: "Promover colaboração entre especialistas em segurança pública e tecnologia",
                icon: "🤝"
              },
              {
                title: "Dados Confiáveis",
                description: "Facilitar o acesso a dados confiáveis sobre criminalidade e perceção social",
                icon: "📊"
              },
              {
                title: "Confiança",
                description: "Incentivar a denúncia e fortalecer a confiança nas instituições",
                icon: "🛡️"
              },
              {
                title: "Políticas Públicas",
                description: "Apoiar políticas públicas baseadas em evidências",
                icon: "📋"
              }
            ].map((item, index) => (
              <Card key={index} className="bg-gradient-card border-primary/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 hover-scale group">
                <CardHeader>
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                  <CardTitle className="text-primary text-xl">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-foreground/75 leading-relaxed">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Funcionalidades do Sistema */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-primary mb-8 text-center">Funcionalidades do Sistema</h3>
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="bg-card border-accent/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="text-4xl mb-2">📥</div>
                  <CardTitle className="text-accent">Importação de Dados</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/80">
                    Upload e processamento de dados de pesquisa em formato Excel com validação automática
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card border-accent/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="text-4xl mb-2">📈</div>
                  <CardTitle className="text-accent">Dashboard Interativo</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/80">
                    Visualização de dados com gráficos dinâmicos, filtros e análise estatística em tempo real
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card border-accent/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="text-4xl mb-2">🤖</div>
                  <CardTitle className="text-accent">Chatbot Inteligente</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/80">
                    IA conversacional para consultar dados, gerar relatórios e obter insights sobre segurança
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Ferramentas */}
      <section className="bg-gradient-light py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Components moved to dashboard */}
        </div>
      </section>

      {/* Campanha #OlhosAbertos */}
      <section className="bg-gradient-primary py-16 sm:py-24 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Campanha #OlhosAbertos – Pela Segurança de Todos
          </h2>
          <p className="text-lg text-white/90 max-w-4xl mb-8">
            A campanha #OlhosAbertos visa sensibilizar os cidadãos sobre os seus direitos e promover uma cultura de prevenção. O kit de ferramentas contém materiais informativos, cartazes, vídeos e dados úteis sobre como denunciar crimes, procurar apoio e fortalecer a solidariedade comunitária.
          </p>
          <Button variant="secondary" size="lg">
            Baixar Kit da Campanha
          </Button>
        </div>
      </section>

      {/* Encontre Ajuda */}
      <section className="bg-blue-soft py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
            Encontre Ajuda
          </h2>
          <p className="text-lg text-foreground/85 max-w-3xl mb-8">
            Seja forte. Você não está sozinho. Através do sistema INSUTEC, você pode encontrar serviços de apoio à vítima, instituições comunitárias e centros de orientação jurídica mais próximos de si.
          </p>
          <Button className="bg-gradient-primary" size="lg" onClick={() => setIsModalOpen(true)}>
            Encontrar Serviço de Apoio
          </Button>
        </div>
      </section>

      <AppFooter />
      <DenunciaModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Page;
