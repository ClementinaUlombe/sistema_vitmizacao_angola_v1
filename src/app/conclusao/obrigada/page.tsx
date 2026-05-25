"use client";

import Link from "next/link";
import { Home } from "lucide-react";

export default function ObrigadaPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white items-center justify-center p-8 animate-fade-in relative">
      <div className="text-center">
        <h1 className="text-7xl md:text-8xl font-black text-black tracking-tighter leading-none animate-pulse">
MUITO OBRIGADAS !
        </h1>
      </div>

      {/* Home Icon in bottom right */}
      <Link 
        href="/" 
        className="absolute bottom-12 right-12 p-4 bg-black text-white rounded-full shadow-2xl hover:scale-110 transition-all hover:bg-slate-800 group"
        title="Voltar ao Início"
      >
        <Home className="h-8 w-8" />
        <span className="sr-only">Início</span>
      </Link>
    </div>
  );
}
