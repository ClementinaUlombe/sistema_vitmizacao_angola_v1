"use client";

import { AppHeader } from "@/components/AppHeader";
import { AppFooter } from "@/components/AppFooter";
import HeroSlideshow from "@/components/HeroSlideshow";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
    <div className="flex flex-col min-h-screen">
      <AppHeader />
      <main className="relative flex-grow flex items-center justify-center overflow-hidden">
        <HeroSlideshow images={heroImages} intervalMs={5000} />
        <div className="relative z-10 p-4">
          {children}
        </div>
      </main>
      <AppFooter />
    </div>
  );
}