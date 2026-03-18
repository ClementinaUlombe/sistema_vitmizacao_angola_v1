"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Import usePathname
import { ThemeToggle } from "@/components/ThemeToggle";
import NotificationBell from "@/components/NotificationBell";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [userImage, setUserImage] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<"admin" | "researcher" | "police" | "citizen">("citizen");
  const systemName = "Vitimização Criminal";

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/auth/login");
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user && user.id) {
        setUserName(user.name || "");
        setUserRole(user.role?.toLowerCase() as any || "citizen");
        
        // Se a imagem estiver no localStorage, usa-a
        if (user.image) {
          setUserImage(user.image);
        } else {
          // Caso contrário, tenta ir buscar à API (Prisma)
          fetch(`/api/auth/users?id=${user.id}`)
            .then(res => res.json())
            .then(data => {
              // Procura o utilizador específico se a API retornar lista
              const currentUser = Array.isArray(data) ? data.find((u: any) => u.id === user.id) : data;
              if (currentUser && currentUser.image) {
                setUserImage(currentUser.image);
                // Atualiza o localStorage para a próxima vez
                const updated = { ...user, image: currentUser.image };
                localStorage.setItem("user", JSON.stringify(updated));
              }
            })
            .catch(err => console.error("Erro ao recuperar imagem:", err));
        }
      }
    }
  }, []);

  const adminMenuItems = [
    { name: "Página Inicial", href: "/dashboard" },
    { name: "O Meu Perfil", href: "/dashboard/profile" },
    { name: "Gerir Lançamentos", href: "/dashboard/data-entry?admin=true" },
    { name: "Gerir Utilizadores", href: "/dashboard/users" },
    { name: "Criar Relatórios", href: "/dashboard/report-creation" },
    { name: "Denúncias Recebidas", href: "/dashboard/occurrences" },
    { name: "Gerir Base de Dados", href: "/dashboard/database-management" },
    { name: "Backup", href: "/dashboard/backup" },
    { name: "Upload Excel", href: "/dashboard/excel-upload" },
    { name: "Chatbot", href: "/dashboard/chatbot" },
    { name: "Gráficos", href: "/dashboard/graphs" },
  ];

  const researcherMenuItems = [
    { name: "Página Inicial", href: "/dashboard" },
    { name: "O Meu Perfil", href: "/dashboard/profile" },
    { name: "Lançamento de Inquéritos", href: "/dashboard/data-entry" },
    { name: "Status de Lançamento", href: "/dashboard/analytics" },
    { name: "Estatísticas Públicas", href: "/dashboard/graphs" },
    { name: "📚 Biblioteca Científica", href: "/dashboard/data-query" },
    { name: "Chatbot", href: "/dashboard/chatbot" },
  ];

  const policeMenuItems = [
    { name: "Página Inicial", href: "/dashboard" },
    { name: "O Meu Perfil", href: "/dashboard/profile" },
    { name: "Gestão de Ocorrências", href: "/dashboard/occurrences" },
    { name: "Estatísticas Públicas", href: "/dashboard/graphs" },
    { name: "Chatbot Auxiliar", href: "/dashboard/chatbot" },
  ];

  const citizenMenuItems = [
    { name: "Página Inicial", href: "/dashboard" },
    { name: "O Meu Perfil", href: "/dashboard/profile" },
    { name: "Enviar Relato", href: "/dashboard/occurrences" },
    { name: "Estatísticas Públicas", href: "/dashboard/graphs" },
    { name: "Chatbot Crime", href: "/dashboard/chatbot" },
  ];

  const getMenuItems = () => {
    switch (userRole) {
      case "admin": return adminMenuItems;
      case "researcher": return researcherMenuItems;
      case "police": return policeMenuItems;
      case "citizen": return citizenMenuItems;
      default: return citizenMenuItems;
    }
  };

  const menuItems = getMenuItems();

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-primary text-primary-foreground p-6 shadow-lg flex flex-col">
        <Link href="/" className="flex items-center gap-3 mb-8 group cursor-pointer">
          <div className="h-10 w-10 rounded-lg bg-white/20 backdrop-blur-md flex items-center justify-center shadow-md group-hover:bg-white/30 transition-all">
            <span className="text-white font-bold text-xl">VC</span>
          </div>
          <span className="font-semibold text-white text-lg">Vitimização Criminal</span>
        </Link>

        <nav className="flex-grow">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center p-3 rounded-md text-white hover:bg-white/20 transition-colors ${
                    pathname === item.href ? "bg-white/30" : ""
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Header for main content area - could include user info, logout, etc. */}
        <header className="flex justify-between items-center mb-8 bg-card p-4 rounded-xl shadow-sm border border-border">
          <h1 className="text-2xl font-bold text-foreground">Olá, {userName}</h1>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <NotificationBell />
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleLogout}
              className="text-foreground/70 hover:text-red-600 hover:bg-red-50 transition-all rounded-full h-9 w-9"
              title="Sair do sistema"
            >
              <LogOut className="h-4 w-4" />
            </Button>
            <Link href="/dashboard/profile" className="flex items-center hover:opacity-80 transition-opacity ml-1">
              <Avatar className="h-9 w-9 border-2 border-primary/20">
                <AvatarImage src={userImage || ""} alt={userName} />
                <AvatarFallback className="bg-primary text-primary-foreground text-xs font-bold">
                  {userName.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </Link>
          </div>
        </header>
        {children}
      </main>
    </div>
  );
}
