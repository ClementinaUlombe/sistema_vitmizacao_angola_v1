"use client";

import Link from "next/link";

export default function ConclusaoPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white items-center justify-center p-8 animate-fade-in">
      <Link href="/conclusao/obrigada" className="max-w-4xl w-full space-y-8 text-center cursor-pointer group">
        <h1 className="text-6xl font-black text-black uppercase tracking-tighter transition-transform group-hover:scale-105">
          CONCLUSÃO
        </h1>
        
        <p className="text-2xl leading-relaxed text-black font-medium py-8">
          O trabalho demonstrou que a integração entre Ciências Criminais e Engenharia Informática permitiu desenvolver e validar uma plataforma digital eficaz que transforma dados de vitimização criminal em informação estratégica, evidenciando um contexto de elevada insegurança no município da Samba e a necessidade de intervenções integradas para o reforço da segurança pública.
        </p>
        
        <div className="text-black/10 text-xs uppercase font-bold tracking-widest pt-4 opacity-0 group-hover:opacity-100 transition-opacity">
          Clique para continuar
        </div>
      </Link>
    </div>
  );
}
