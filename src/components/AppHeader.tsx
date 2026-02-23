"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import NotificationBell from "@/components/NotificationBell";
import { useState, useEffect } from "react";

export function AppHeader() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-gradient-primary backdrop-blur-sm border-b border-white/10 shadow-lg">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-white/20 backdrop-blur-md flex items-center justify-center shadow-md">
            <span className="text-white font-bold text-xl">VC</span>
          </div>
          <span className="font-semibold text-white">Vitimização Criminal</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm text-white">
          <a href="#inicio" className="hover:opacity-80 transition-opacity">Início</a>
          <a href="#sobre-estudo" className="hover:opacity-80 transition-opacity">Sobre o Estudo</a>
          <a href="#dados" className="hover:opacity-80 transition-opacity">Dados</a>
          <a href="#quem-somos" className="hover:opacity-80 transition-opacity">Quem Somos</a>
          {isLoggedIn ? (
            <Link href="/dashboard" passHref>
              <Button variant="secondary" size="sm" className="ml-4 shadow-md bg-purple-light text-purple-deep hover:bg-white transition-all">
                Ir para o Painel
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
