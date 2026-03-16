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
import ParallaxSection from "@/components/ParallaxSection";
import { useState, useEffect } from "react";
import { newsData } from "@/lib/news-data";

interface SummaryData {
  totalResidents: number;
  victimizationRate: number;
  unreportedCrimesRate: number;
  neighborhoods: number;
}

const heroHands = "/hero-hands.jpg";
const heroBooks = "/hero-books.jpg";
const heroTech = "/hero-tech.jpg";
const parallaxBg = "/parallax-bg.jpg";

const Page = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [summaryData, setSummaryData] = useState<SummaryData | null>(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsLoggedIn(true);
    }

    const fetchSummaryData = async () => {
      try {
        const response = await fetch("/api/data/summary");
        if (response.ok) {
          const data = await response.json();
          setSummaryData(data);
        } else {
          console.error("Failed to fetch summary data:", response.statusText);
          setSummaryData({ // Fallback to 0s if API fails
            totalResidents: 0,
            victimizationRate: 0,
            unreportedCrimesRate: 0,
            neighborhoods: 0,
          });
        }
      } catch (error) {
        console.error("Error fetching summary data:", error);
        setSummaryData({ // Fallback to 0s if API fails
          totalResidents: 0,
          victimizationRate: 0,
          unreportedCrimesRate: 0,
          neighborhoods: 0,
        });
      }
    };

    fetchSummaryData();
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

  const destaqueImages = [
    "/nochao.jpg",
    "/maos.jpg",
    "/livro.jpeg",
  ];

  return (
    <div className="min-h-screen">
      <AppHeader />

      {/* Hero Section */}
      <section id="inicio" className="relative isolate overflow-hidden min-h-[600px] flex items-center">
        <HeroSlideshow images={heroImages} intervalMs={5000} />
        <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 sm:py-32">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
Plataforma Digital com base o Inquérito de Vitimização Criminal e Percepção de Segurança            </h1>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-base shadow-lg hover-scale">
                Sobre o Estudo
              </Button>
              <ReportModal>
                <Button size="lg" className="text-base bg-blue-500 text-white hover:bg-blue-600 shadow-lg hover-scale">
                  Reporte de Crimes
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
                <CardTitle className="text-primary text-4xl font-bold">
                  <NumberCounter targetValue={522} />
                </CardTitle>
                <CardDescription>Residentes Inquiridos</CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-gradient-card border-primary/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <CardTitle className="text-primary text-4xl font-bold">
                  {summaryData ? <NumberCounter targetValue={summaryData.victimizationRate} decimals={1} suffix="%" /> : "0.0%"}
                </CardTitle>
                <CardDescription>Taxa de Vitimização (12 meses)</CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-gradient-card border-primary/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <CardTitle className="text-destructive text-4xl font-bold">
                  {summaryData ? <NumberCounter targetValue={summaryData.unreportedCrimesRate} decimals={1} suffix="%" /> : "0.0%"}
                </CardTitle>
                <CardDescription>Crimes Não Denunciados</CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-gradient-card border-primary/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <CardTitle className="text-accent text-4xl font-bold">
                  {summaryData ? <NumberCounter targetValue={summaryData.neighborhoods} /> : "0"}
                </CardTitle>
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
            Conhecimento e Tecnologia pela Segurança de Angola A Celina vai me mandar o artiigo científico
          </h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            Uma iniciativa pioneira para transformar dados em ação
          </p>
          
          <div className="prose prose-lg max-w-none text-foreground/85 space-y-6 mb-12">
            <p className="text-lg leading-relaxed">
              Todos os anos, milhares de cidadãos em Angola são direta ou indiretamente afetados pela criminalidade urbana. O impacto desses atos vai muito além das perdas materiais — fere a confiança nas instituições, gera medo e mina o bem-estar das comunidades. A segurança pública é, portanto, um direito fundamental e um pilar essencial para o desenvolvimento humano e social do país.
            </p>
            <p className="text-lg leading-relaxed">
              Dessa visão nasceu o projeto "Desenvolvimento de uma Plataforma Digital com base o Inquérito de Vitimização Criminal e Percepção de Segurança no Município da Samba" uma iniciativa que marca o encontro entre dois campos estratégicos: as Ciências Criminais, responsáveis por compreender as causas e os impactos do crime, e a Engenharia Informática e Sistemas de Informação, encarregada de transformar dados em soluções inteligentes.
            </p>
            <p className="text-lg leading-relaxed">
              Mais do que um estudo académico, este projeto representa um compromisso com a nação angolana — um esforço para compreender o fenómeno da vitimização, identificar as vulnerabilidades das comunidades e criar ferramentas tecnológicas que auxiliem as autoridades, os investigadores e os cidadãos na construção de um ambiente mais seguro.
            </p>
            <p className="text-lg leading-relaxed">
              Através da recolha de dados reais, da análise estatística e do uso de tecnologias avançadas de informação, o sistema permitirá monitorar padrões de criminalidade, avaliar a percepção de segurança e propor  uma solução inovadora para enfrentar lacunas importantes na gestão e prevenção da criminalidade. Além disso, o projeto incorpora uma componente inovadora de inteligência artificial, capaz de interagir com o utilizador e oferecer informações, tendências, gráficos e previsões de forma acessível e transparente.
            </p>
            
            <p className="italic font-semibold text-primary text-xl text-center mt-8">
              "Proteger vidas, compreender o crime e fortalecer a confiança pública — eis o propósito que move o futuro da segurança em Angola."
            </p>
          </div>
        </div>
      </section>

      {/* Seção Destaques */}
      <section id="destaques" className="bg-background py-16 sm:py-24 border-t border-border/10">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl sm:text-5xl font-bold text-foreground mb-12 text-center">
            Destaques
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Imagens (Lado Esquerdo) */}
            <div className="relative h-[450px] rounded-2xl overflow-hidden shadow-2xl group border-4 border-primary/10">
               <HeroSlideshow images={destaqueImages} intervalMs={3500} />
               <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500" />
            </div>
            {/* Texto (Lado Direito) */}
            <div className="space-y-6">
              <p className="text-xl text-foreground/80 leading-relaxed font-medium">
                Inovação e Compromisso com a Segurança de Angola
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Nossa plataforma destaca-se pela integração de dados reais com ferramentas tecnológicas avançadas. Estamos focados em fornecer uma visão clara dos desafios de segurança, permitindo que cidadãos e instituições colaborem para um ambiente mais protegido e resiliente em todo o país.
              </p>
              <div className="pt-4">
                <Button className="bg-primary text-white hover:bg-primary/90">
                  Ver Detalhes do Estudo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Notícias */}
      <section id="noticias" className="bg-gradient-light py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 text-center mb-16">
          <h2 className="text-4xl sm:text-6xl font-extrabold text-foreground mb-6 tracking-tight">
            Notícias e Atualizações
          </h2>
          <p className="text-muted-foreground text-xl max-w-2xl mx-auto leading-relaxed">
            Acompanhe o progresso do nosso estudo e as últimas novidades sobre a segurança pública no Município da Samba.
          </p>
        </div>

        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {newsData.map((news) => (
              <Card key={news.id} className="overflow-hidden hover:shadow-2xl transition-all duration-500 group flex flex-col bg-card border-primary/5 rounded-3xl shadow-lg border-2 hover:border-primary/20">
                <div className="h-64 overflow-hidden relative">
                  <img 
                    src={news.image} 
                    alt={news.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                  />
                  <div className="absolute top-6 left-6 bg-primary text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-2xl backdrop-blur-md">
                    {news.date}
                  </div>
                </div>
                <CardHeader className="flex-grow p-8">
                  <CardTitle className="text-2xl font-bold leading-tight group-hover:text-primary transition-colors mb-4">
                    {news.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-8 pb-8 pt-0">
                  <p className="text-muted-foreground text-lg mb-8 leading-relaxed line-clamp-3">
                    {news.description}
                  </p>
                  <Link href={`/noticias/${news.id}`}>
                    <Button variant="outline" className="w-full rounded-2xl font-bold text-primary border-primary/20 hover:bg-primary hover:text-white transition-all py-6">
                      Ler Notícia Completa
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Seção Galeria de Fotos */}
      <section id="galeria" className="bg-background py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 mb-16">
          <h2 className="text-3xl sm:text-5xl font-bold text-foreground mb-4">
            Galeria do Projeto
          </h2>
          <p className="text-muted-foreground text-lg">
            Momentos da recolha de dados e interações com a comunidade.
          </p>
        </div>
        <div className="mx-auto max-w-7xl px-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            "/recolha.jpeg", "/recolha1.jpeg", "/recolha2.jpeg", "/recolha3.jpeg",
            "/recolha4.jpeg", "/recolha2.jpeg", "/recolha1.jpeg", "/imagesmaos.jpeg"
          ].map((img, i) => (
            <div key={i} className="group relative h-64 rounded-2xl overflow-hidden cursor-pointer shadow-md">
              <img src={img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Galeria" />
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white font-bold">Ver Foto</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Seção Conselhos de Prevenção (Premium Refined) */}
      <section className="bg-background py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="bg-gradient-hero rounded-[3rem] p-10 sm:p-20 text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
            <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl sm:text-6xl font-black mb-10 leading-tight">
                  Conselhos de <br/><span className="text-accent-foreground">Prevenção</span>
                </h2>
                <div className="space-y-8">
                  {[
                    { icon: "👀", title: "Mantenha-se Alerta", text: "Esteja atento ao seu redor, especialmente em locais pouco iluminados." },
                    { icon: "🤝", title: "Rede de Vizinhos", text: "A união da comunidade é o maior dissuasor contra a criminalidade." },
                    { icon: "📱", title: "Denúncia Digital", text: "Utilize nossa plataforma para reportar incidentes e ajudar no mapeamento." }
                  ].map((tip, i) => (
                    <div key={i} className="flex gap-6 items-start group">
                      <div className="bg-white/20 h-14 w-14 rounded-2xl flex items-center justify-center flex-shrink-0 text-3xl group-hover:scale-110 transition-transform shadow-lg backdrop-blur-md">
                        {tip.icon}
                      </div>
                      <div>
                        <h4 className="font-bold text-2xl mb-2">{tip.title}</h4>
                        <p className="text-white/80 text-lg leading-relaxed">{tip.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-10 border border-white/20 shadow-2xl text-center">
                <h4 className="text-3xl font-bold mb-8">Canais de Emergência</h4>
                <div className="space-y-6">
                  <div className="bg-white/20 p-6 rounded-2xl hover:bg-white/30 transition-colors cursor-pointer">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] mb-2 opacity-70">Polícia Nacional</p>
                    <p className="text-5xl font-black">113</p>
                  </div>
                  <div className="bg-white/20 p-6 rounded-2xl hover:bg-white/30 transition-colors cursor-pointer">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] mb-2 opacity-70">Emergência Médica</p>
                    <p className="text-5xl font-black">112</p>
                  </div>
                </div>
                <p className="text-lg mt-10 text-white/80 italic font-medium">
                  "Sua segurança começa com a sua atenção."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Parceiros Institucionais */}
  

      {/* Dados da Investigação */}
      <section id="dados" className="bg-background py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl sm:text-5xl font-bold text-foreground mb-4 text-center">
            Resultados da Investigação
          </h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            Dados recolhidos de 522 residentes do Município da Samba
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

          {/* Metodologia */}
        
        </div>
      </section>

      {/* Seção O Que Fazemos */}
      <section className="bg-background py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl sm:text-5xl font-bold text-foreground mb-4 text-center">
          </h2>
          <p className="text-center text-muted-foreground mb-12 text-lg max-w-3xl mx-auto">
          </p>

          <div className="mb-12 max-w-4xl mx-auto">
            <p className="text-lg text-foreground/85 mb-4 leading-relaxed">
            </p>
            <p className="text-lg text-foreground/85 leading-relaxed">
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
                description: "Facilitar o acesso a dados confiáveis sobre criminalidade e percepção social",
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

      {/* O que Fazemos - Seção Parallax com Imagem */}
      <ParallaxSection />

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

          {/* Seção FAQ */}
      <section className="bg-gradient-light py-20 sm:py-32">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-3xl sm:text-5xl font-bold text-center mb-16">Perguntas Frequentes</h2>
          <div className="space-y-6">
            {[
              { q: "O que é a Plataforma Digital Vitimização Crimial?", a: "É uma iniciativa académica que utiliza tecnologia para analisar o crime e melhorar a percepção de segurança em Luanda." },
              { q: "Como meus dados são protegidos?", a: "Garantimos o anonimato total dos inquiridos seguindo rigorosos protocolos éticos de investigação." },
              { q: "Posso denunciar crimes pela plataforma?", a: "Sim, oferecemos um canal de reporte anónimo que ajuda a mapear áreas de risco em tempo real." }
            ].map((item, i) => (
              <Card key={i} className="border-primary/10 hover:border-primary/30 transition-colors">
                <CardHeader>
                  <CardTitle className="text-xl text-primary">{item.q}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{item.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      {/* Parceiros Institucionais */}
      <section className="bg-background py-24 border-t border-border/10">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-16">Possíveis Parceiros e Apoio</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 items-center justify-center opacity-60 grayscale hover:grayscale-0 transition-all duration-700">
            {[
              { name: "INSUTEC", logo: "/insutec.jpeg" },
              { name: "POLÍCIA NACIONAL", logo: "/policia.png" },
              { name: "GOVERNO DE LUANDA", logo: "/governoluanda.jpg" },
              { name: "MININT", logo: "/minint.jpg" }
            ].map((partner, i) => (
              <div key={i} className="flex flex-col items-center gap-6 group cursor-pointer">
                <div className="h-24 w-40 flex items-center justify-center overflow-hidden rounded-2xl border-2 border-primary/5 group-hover:border-primary/20 group-hover:bg-white/50 transition-all duration-300 p-4 shadow-sm group-hover:shadow-xl">
                  <img 
                    src={partner.logo} 
                    alt={partner.name} 
                    className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-500" 
                  />
                </div>
                <div className="text-sm md:text-base font-black tracking-tight text-foreground/80 group-hover:text-primary transition-colors">
                  {partner.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <AppFooter />
      <DenunciaModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Page;
