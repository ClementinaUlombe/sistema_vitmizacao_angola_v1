"use client";

import Link from "next/link";
import { Logo } from "./Logo";

export function AppFooter() {
  return (
    <footer className="bg-gradient-hero text-white">
      <div className="mx-auto max-w-7xl px-6 py-14 grid gap-10 md:grid-cols-4">
        <div className="space-y-3">
                  <Link href="/" className="flex items-center gap-3">
                    <Logo size={40} variant="light" />
                    <span className="font-semibold">Vitimização Criminal</span>
                  </Link>          <p className="text-sm text-white/80">
            Análise de vitimização e perceção de segurança no Município da Samba.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Projeto</h4>
          <ul className="text-sm text-white/80 space-y-2">
            <li><Link href="/sobre" className="hover:text-white transition-colors">Sobre o Estudo</Link></li>
            <li><Link href="/quem-somos" className="hover:text-white transition-colors">Quem Somos</Link></li>
            <li><Link href="/metodologia" className="hover:text-white transition-colors">Metodologia</Link></li>
            <li><Link href="/analise-dados" className="hover:text-white transition-colors">Análise de Dados</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Funcionalidades</h4>
          <ul className="text-sm text-white/80 space-y-2">
            <li><Link href="/auth/login" className="hover:text-white transition-colors">Importação Excel</Link></li>
            <li><Link href="/auth/login" className="hover:text-white transition-colors">Dashboard de Gráficos</Link></li>
            <li><Link href="/auth/login" className="hover:text-white transition-colors">Chatbot Inteligente</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Contacto</h4>
          <ul className="text-sm text-white/80 space-y-2">
            <li>Luanda, Angola</li>
            <li><Link href="/termos-de-uso" className="hover:text-white transition-colors">Política de Privacidade</Link></li>
            <li><Link href="/termos-de-uso" className="hover:text-white transition-colors">Termos de Uso</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-6 text-center text-sm text-white/80">
          <p>© 2025 | Sistema de Análise de Vitimização Criminal – Desenvolvido por Clementina Ulombe</p>
        </div>
      </div>
    </footer>
  );
}
