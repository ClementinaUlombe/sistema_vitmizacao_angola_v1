"use client";

import { newsData } from "@/lib/news-data";
import { AppHeader } from "@/components/AppHeader";
import { AppFooter } from "@/components/AppFooter";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";

export default function NewsDetailPage() {
  const params = useParams();
  const router = useRouter();
  const newsId = params.id as string;
  const news = newsData.find((n) => n.id === newsId);
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (news?.images && news.images.length > 0) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => 
          prevIndex === (news.images?.length ?? 1) - 1 ? 0 : prevIndex + 1
        );
      }, 20000); // Passar a cada 20 segundos

      return () => clearInterval(interval);
    }
  }, [news?.images]);

  if (!news) {
    return (
      <div className="min-h-screen flex flex-col">
        <AppHeader />
        <main className="flex-grow flex items-center justify-center p-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Notícia não encontrada</h1>
            <Button onClick={() => router.push("/")}>Voltar para o Início</Button>
          </div>
        </main>
        <AppFooter />
      </div>
    );
  }

  const displayImage = news.images && news.images.length > 0 
    ? news.images[currentImageIndex] 
    : news.image;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AppHeader />

      <main className="flex-grow">
        {/* News Header with Image / Slideshow - INCREASED HEIGHT */}
        <div className="relative w-full h-[600px] bg-slate-950 overflow-hidden">
          <img
            key={displayImage}
            src={displayImage}
            alt={news.title}
            className="w-full h-full object-cover animate-fade-in transition-all duration-1000"
          />
          
          {/* Centered Title Overlay */}
          <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center p-6 text-center">
            <div className="max-w-4xl animate-slide-up">
              <span className="inline-block bg-primary text-white text-xs font-bold px-4 py-1.5 rounded-full mb-6 shadow-xl uppercase tracking-widest">
                {news.date}
              </span>
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white mb-4 drop-shadow-2xl leading-tight">
                {news.title}
              </h1>
              <div className="w-24 h-1.5 bg-primary mx-auto rounded-full mt-4 shadow-glow" />
            </div>
          </div>
        </div>

        {/* News Content */}
        <article className="max-w-4xl mx-auto px-6 py-16">
          <Link href="/#noticias">
            <Button variant="ghost" className="mb-8 pl-0 hover:bg-transparent hover:text-primary transition-colors flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Voltar para Notícias
            </Button>
          </Link>

          <div className="prose prose-lg max-w-none text-foreground/80 mb-16">
            {news.fullText.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-6 leading-relaxed whitespace-pre-line">
                {paragraph.trim()}
              </p>
            ))}
          </div>

          {/* Video Section - Only for Workshop News (ID 2) */}
          {news.id === "2" && (
            <div className="mt-12 space-y-8 animate-fade-in">
              <div className="flex items-center gap-3 text-primary font-bold">
                <div className="w-10 h-1 bg-primary rounded-full" />
                <h3 className="text-2xl font-black uppercase tracking-tight">Registro em Vídeo</h3>
              </div>
              <div className="relative aspect-video w-full rounded-[2.5rem] overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border-8 border-white/5 flex items-center justify-center bg-slate-950 group">
                {/* Fundo Premium com Impacto Visual */}
                <div className="absolute inset-0 z-0">
                  {/* Gradiente de Base Vibrante */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary via-purple-600 to-secondary opacity-20" />
                  
                  {/* Brilhos Dinâmicos */}
                  <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/20 rounded-full blur-[100px] animate-pulse" />
                  <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-secondary/20 rounded-full blur-[100px] animate-pulse delay-1000" />
                  
                  {/* Imagem de Fundo com Mix-Blend */}
                  <img 
                    src="/tecno.webp" 
                    className="w-full h-full object-cover blur-xl opacity-20 mix-blend-overlay scale-110" 
                    alt="" 
                  />
                  
                  {/* Overlay de Vidro (Glassmorphism) */}
                  <div className="absolute inset-0 backdrop-blur-[2px] bg-white/5" />
                </div>

                {/* Cantos Decorativos Estilo "Câmera/Forense" */}
                <div className="absolute top-8 left-8 w-16 h-16 border-t-4 border-l-4 border-white/20 rounded-tl-2xl z-10 group-hover:border-primary/50 transition-colors duration-500" />
                <div className="absolute bottom-8 right-8 w-16 h-16 border-b-4 border-r-4 border-white/20 rounded-br-2xl z-10 group-hover:border-secondary/50 transition-colors duration-500" />

                <video 
                  className="relative z-10 max-w-full max-h-[90%] rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.6)] ring-1 ring-white/10 transition-transform duration-700 group-hover:scale-[1.02]"
                  autoPlay 
                  loop 
                  controls
                  playsInline
                  preload="auto"
                >
                  <source src="/WhatsApp Video 2026-03-19 at 8.30.16 PM.mp4" type="video/mp4" />
                  Seu navegador não suporta a reprodução de vídeos.
                </video>
                
                {/* Badge de "Registro Oficial" */}
                <div className="absolute top-8 right-8 z-20 hidden sm:flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-ping" />
                  <span className="text-[10px] font-black text-white uppercase tracking-widest"> Produced by the image and marketing dpt. of GEDA.</span>
                </div>
              </div>
              <p className="text-center text-muted-foreground italic text-sm">
                Assista ao registro completo da sessão com áudio original.
              </p>
            </div>
          )}

          
        </article>
      </main>

      <AppFooter />
    </div>
  );
}
