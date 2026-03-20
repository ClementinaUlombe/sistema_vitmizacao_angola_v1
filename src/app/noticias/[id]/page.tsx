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
      }, 40000); // Passar a cada 40 segundos

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
              <div className="relative aspect-video w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-primary/10 bg-black flex items-center justify-center">
                <video 
                  className="max-w-full max-h-full"
                  autoPlay 
                  loop 
                  controls
                  playsInline
                  preload="auto"
                >
                  <source src="/WhatsApp Video 2026-03-19 at 8.30.16 PM.mp4" type="video/mp4" />
                  Seu navegador não suporta a reprodução de vídeos.
                </video>
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
