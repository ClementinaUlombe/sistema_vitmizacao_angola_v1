"use client";

import { newsData } from "@/lib/news-data";
import { AppHeader } from "@/components/AppHeader";
import { AppFooter } from "@/components/AppFooter";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function NewsDetailPage() {
  const params = useParams();
  const router = useRouter();
  const newsId = params.id as string;
  const news = newsData.find((n) => n.id === newsId);

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

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AppHeader />

      <main className="flex-grow">
        {/* News Header with Image */}
        <div className="relative h-[400px] w-full overflow-hidden">
          <img
            src={news.image}
            alt={news.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 flex items-center justify-center px-6">
            <div className="max-w-4xl text-center">
              <span className="inline-block bg-primary text-white text-sm font-bold px-4 py-1 rounded-full mb-4">
                {news.date}
              </span>
              <h1 className="text-3xl sm:text-5xl font-bold text-white mb-4 drop-shadow-md">
                {news.title}
              </h1>
            </div>
          </div>
        </div>

        {/* News Content */}
        <article className="max-w-4xl mx-auto px-6 py-12">
          <Link href="/#noticias">
            <Button variant="ghost" className="mb-8 pl-0 hover:bg-transparent hover:text-primary transition-colors flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Voltar para Notícias
            </Button>
          </Link>

          <div className="prose prose-lg max-w-none text-foreground/80">
            {news.fullText.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-6 leading-relaxed whitespace-pre-line">
                {paragraph.trim()}
              </p>
            ))}
          </div>

          <div className="mt-16 pt-8 border-t border-border">
            <h3 className="text-xl font-bold mb-4">Partilhar Notícia</h3>
            <div className="flex gap-4">
              <Button variant="outline" size="sm">Facebook</Button>
              <Button variant="outline" size="sm">WhatsApp</Button>
              <Button variant="outline" size="sm">LinkedIn</Button>
            </div>
          </div>
        </article>
      </main>

      <AppFooter />
    </div>
  );
}
