"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import NotificationBell from "@/components/NotificationBell";
import { useState, useEffect } from "react";
import { Logo } from "./Logo";

export function AppHeader() {
  const [userName, setUserName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserName(user.name || "");
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-gradient-primary backdrop-blur-sm border-b border-white/10 shadow-lg">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Logo size={40} variant="light" />
          <span className="font-semibold text-white">Vitimização Criminal</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm text-white">
          <Link href="/" className="hover:opacity-80 transition-opacity">Início</Link>
          <Link href="/sobre" className="hover:opacity-80 transition-opacity">Sobre o Estudo</Link>
          <Link href="/metodologia" className="hover:opacity-80 transition-opacity">Metodologia</Link>
          <Link href="/analise-dados" className="hover:opacity-80 transition-opacity">Análise de Dados</Link>
          <Link href="/quem-somos" className="hover:opacity-80 transition-opacity">Quem Somos</Link>
          {isLoggedIn ? (
            <Link href="/dashboard" passHref>
              <Button variant="secondary" size="sm" className="ml-4 shadow-md bg-white/10 text-white hover:bg-white/20 transition-all border border-white/20">
                Olá, {userName} (Painel)
              </Button>
            </Link>
          ) : (
            <Link href="/auth/login" passHref>
              <Button variant="secondary" size="sm" className="ml-4 shadow-md">
                Entrar no Sistema
              </Button>
            </Link>
          )}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
