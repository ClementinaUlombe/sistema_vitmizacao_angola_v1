"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Import usePathname
import { ThemeToggle } from "@/components/ThemeToggle";
import NotificationBell from "@/components/NotificationBell";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const [userName, setUserName] = useState("");
  const systemName = "Vitimização Criminal"; // Placeholder for the system name
  // Placeholder for user role - this would typically come from authentication context
  const userRole: "admin" | "researcher" = "admin"; // Default to admin for now

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user && user.name) {
        setUserName(user.name);
      }
    }
  }, []);

  const adminMenuItems = [
    { name: "Página Inicial", href: "/" },
    { name: "Gerir Utilizadores", href: "/dashboard/users" },
    { name: "Registar Dados", href: "/dashboard/data-entry" },
    { name: "Gerir Base de Dados", href: "/dashboard/database-management" },
    { name: "Ocorrências", href: "/dashboard/occurrences" },
    { name: "Ver Gráficos e Relatórios", href: "/dashboard/reports" },
    { name: "Exportar Dados", href: "/dashboard/export" },
    { name: "Backup", href: "/dashboard/backup" },
    { name: "Upload Excel", href: "/dashboard/excel-upload" }, // New
    { name: "Chatbot", href: "/dashboard/chatbot" }, // New
    { name: "Gráficos", href: "/dashboard/graphs" }, // New
  ];

  const researcherMenuItems = [
    { name: "Página Inicial", href: "/" },
    { name: "Consultar Dados", href: "/dashboard/data-query" },
    { name: "Gerar Gráficos e Estatísticas", href: "/dashboard/analytics" },
    { name: "Filtrar Dados", href: "/dashboard/data-filter" },
    { name: "Ocorrências", href: "/dashboard/occurrences" },
    { name: "Comparar Percepções", href: "/dashboard/perception-comparison" },
    { name: "Criar Relatórios", href: "/dashboard/report-creation" },
    { name: "Upload Excel", href: "/dashboard/excel-upload" }, // New
    { name: "Chatbot", href: "/dashboard/chatbot" }, // New
    { name: "Gráficos", href: "/dashboard/graphs" }, // New
  ];

  const menuItems = userRole === "admin" ? adminMenuItems : researcherMenuItems;

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-primary text-primary-foreground p-6 shadow-lg flex flex-col">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-10 w-10 rounded-lg bg-white/20 backdrop-blur-md flex items-center justify-center shadow-md">
            <span className="text-white font-bold text-xl">VC</span>
          </div>
          <span className="font-semibold text-white text-lg">Vitimização Criminal</span>
        </div>

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

        <div className="mt-auto pt-4 border-t border-white/20">
          <Link href="/auth/login" className="flex items-center p-3 rounded-md text-white hover:bg-white/20 transition-colors">
            Sair
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Header for main content area - could include user info, logout, etc. */}
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-foreground">Bem-vindo ao sistema de {systemName} {userName}</h1>
          <ThemeToggle />
          <NotificationBell />
        </header>
        {children}
      </main>
    </div>
  );
}
