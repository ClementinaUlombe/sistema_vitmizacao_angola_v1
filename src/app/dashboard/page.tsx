"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import NumberCounter from "@/components/NumberCounter";
import Link from "next/link";
import { 
  Users, 
  ShieldAlert, 
  MessageSquareOff, 
  MapPin, 
  ArrowUpRight, 
  FileText, 
  Database, 
  BarChart3,
  Plus
} from "lucide-react";

interface SummaryData {
  totalResidents: number;
  victimizationRate: number;
  unreportedCrimesRate: number;
  neighborhoods: number;
}

export default function DashboardPage() {
  const [summaryData, setSummaryData] = useState<SummaryData | null>(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<string>("");
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserRole(user.role?.toUpperCase() || "");
      setUserName(user.name || "");
    }

    const fetchSummaryData = async () => {
      try {
        const response = await fetch("/api/data/summary");
        if (response.ok) {
          const data = await response.json();
          setSummaryData(data);
        }
      } catch (error) {
        console.error("Error fetching summary data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSummaryData();
  }, []);

  const adminActions = [
    { title: "Upload Excel", icon: Database, href: "/dashboard/excel-upload", color: "text-blue-500", bg: "bg-blue-50" },
    { title: "Ver Gráficos", icon: BarChart3, href: "/dashboard/graphs", color: "text-purple-500", bg: "bg-purple-50" },
    { title: "Ocorrências", icon: ShieldAlert, href: "/dashboard/occurrences", color: "text-red-500", bg: "bg-red-50" },
    { title: "Chatbot IA", icon: FileText, href: "/dashboard/chatbot", color: "text-green-500", bg: "bg-green-50" },
  ];

  const researcherActions = [
    { title: "Lançamento", icon: Plus, href: "/dashboard/data-entry", color: "text-blue-500", bg: "bg-blue-50" },
    { title: "Ver Gráficos", icon: BarChart3, href: "/dashboard/graphs", color: "text-purple-500", bg: "bg-purple-50" },
    { title: "Estatísticas", icon: ShieldAlert, href: "/dashboard/analytics", color: "text-red-500", bg: "bg-red-50" },
    { title: "Chatbot IA", icon: FileText, href: "/dashboard/chatbot", color: "text-green-500", bg: "bg-green-50" },
  ];

  const policeActions = [
    { title: "Ocorrências", icon: ShieldAlert, href: "/dashboard/occurrences", color: "text-red-500", bg: "bg-red-50" },
    { title: "Ver Gráficos", icon: BarChart3, href: "/dashboard/graphs", color: "text-purple-500", bg: "bg-purple-50" },
    { title: "Chatbot IA", icon: FileText, href: "/dashboard/chatbot", color: "text-green-500", bg: "bg-green-50" },
  ];

  const citizenActions = [
    { title: "Enviar Relato", icon: Plus, href: "/dashboard/occurrences", color: "text-blue-500", bg: "bg-blue-50" },
    { title: "Estatísticas", icon: BarChart3, href: "/dashboard/graphs", color: "text-purple-500", bg: "bg-purple-50" },
    { title: "Chatbot Crime", icon: FileText, href: "/dashboard/chatbot", color: "text-green-500", bg: "bg-green-50" },
  ];

  const getQuickActions = () => {
    switch (userRole) {
      case "ADMIN": return adminActions;
      case "RESEARCHER": return researcherActions;
      case "POLICE": return policeActions;
      case "CITIZEN": return citizenActions;
      default: return citizenActions;
    }
  };

  const quickActions = getQuickActions();

  const getTranslatedRole = () => {
    switch (userRole) {
      case "ADMIN": return "Administrador";
      case "RESEARCHER": return "Investigador";
      case "POLICE": return "Polícia";
      case "CITIZEN": return "Cidadão";
      default: return userRole;
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-foreground tracking-tight">Painel do {getTranslatedRole()}</h2>
          <p className="text-muted-foreground mt-1">
            {userRole === "CITIZEN" 
              ? "Bem-vindo ao canal oficial de colaboração para a segurança de Samba."
              : "Visão geral dos indicadores de vitimização e segurança."}
          </p>
        </div>
        {userRole !== "CITIZEN" && userRole !== "POLICE" && (
          <div className="flex gap-3">
            <Link href={userRole === "ADMIN" ? "/dashboard/data-entry?admin=true" : "/dashboard/data-entry"}>
              <Button className="bg-primary hover:bg-primary/90 shadow-md">
                {userRole === "ADMIN" ? (
                  <FileText className="mr-2 h-4 w-4" />
                ) : (
                  <Plus className="mr-2 h-4 w-4" />
                )}
                {userRole === "ADMIN" ? "Gerir Lançamentos" : "Novo Registro"}
              </Button>
            </Link>
          </div>
        )}
      </div>

      {/* Stats Grid - Apenas para Admin/Investigador/Polícia */}
      {userRole !== "CITIZEN" ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="border-l-4 border-l-blue-500 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-muted-foreground uppercase">Residentes Inquiridos</CardTitle>
              <Users className="h-5 w-5 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {loading ? "..." : <NumberCounter targetValue={summaryData?.totalResidents || 0} />}
              </div>
              <p className="text-xs text-muted-foreground mt-1 flex items-center">
                <span className="text-green-500 font-medium flex items-center mr-1">
                  Total consolidado <ArrowUpRight className="h-3 w-3 ml-0.5" />
                </span>
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-muted-foreground uppercase">Taxa de Vitimização</CardTitle>
              <ShieldAlert className="h-5 w-5 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {loading ? "..." : <NumberCounter targetValue={summaryData?.victimizationRate || 0} decimals={1} suffix="%" />}
              </div>
              <p className="text-xs text-muted-foreground mt-1">Percentagem de residentes atingidos</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-red-500 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-muted-foreground uppercase">Não Denunciados</CardTitle>
              <MessageSquareOff className="h-5 w-5 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {loading ? "..." : <NumberCounter targetValue={summaryData?.unreportedCrimesRate || 0} decimals={1} suffix="%" />}
              </div>
              <p className="text-xs text-muted-foreground mt-1">Crimes sem registo oficial</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-amber-500 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-muted-foreground uppercase">Bairros Analisados</CardTitle>
              <MapPin className="h-5 w-5 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {loading ? "..." : <NumberCounter targetValue={summaryData?.neighborhoods || 0} />}
              </div>
              <p className="text-xs text-muted-foreground mt-1">Áreas de cobertura do estudo</p>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
           <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="text-primary">Participação Ativa</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">A sua contribuição através de denúncias e relatos ajuda a mapear zonas críticas e a melhorar a segurança de todos no Município de Samba.</p>
            </CardContent>
           </Card>
           <Card className="bg-green-50 border-green-200 text-green-800">
            <CardHeader>
              <CardTitle>Canal Seguro</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">Os seus dados são protegidos por encriptação. Apenas autoridades competentes podem analisar os detalhes dos seus relatos.</p>
            </CardContent>
           </Card>
        </div>
      )}

      {/* Main Content Grid */}
      <div className="grid gap-6 md:grid-cols-7">
        {/* Quick Actions */}
        <Card className="md:col-span-3 lg:col-span-2 border-none shadow-md bg-gradient-to-br from-card to-muted/30">
          <CardHeader>
            <CardTitle className="text-lg">Ações Rápidas</CardTitle>
            <CardDescription>Aceda às ferramentas principais</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-3">
            {quickActions.map((action) => (
              <Link key={action.title} href={action.href} passHref>
                <Button variant="outline" className="w-full justify-start h-14 hover:bg-background shadow-sm hover:shadow-md transition-all group">
                  <div className={`p-2 rounded-md ${action.bg} ${action.color} mr-3 group-hover:scale-110 transition-transform`}>
                    <action.icon className="h-5 w-5" />
                  </div>
                  <span className="font-medium">{action.title}</span>
                </Button>
              </Link>
            ))}
          </CardContent>
        </Card>

        {/* System Info / Alerts */}
        <Card className="md:col-span-4 lg:col-span-5 border-none shadow-md">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg">Estado do Sistema</CardTitle>
              <CardDescription>Monitorização e alertas recentes</CardDescription>
            </div>
            <div className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full animate-pulse">
              ONLINE
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50 border border-border/50">
                <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                  <Database className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Base de dados atualizada</p>
                  <p className="text-xs text-muted-foreground">O último upload de dados foi realizado com sucesso.</p>
                </div>
                <div className="ml-auto text-xs text-muted-foreground">Agora mesmo</div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50 border border-border/50">
                <div className="h-10 w-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                  <ShieldAlert className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Novas Denúncias</p>
                  <p className="text-xs text-muted-foreground">Existem 3 novas denúncias pendentes de revisão.</p>
                </div>
                <div className="ml-auto text-xs text-muted-foreground">2h atrás</div>
              </div>

              <div className="pt-4">
                <h4 className="text-sm font-bold mb-3 uppercase tracking-wider text-muted-foreground">Resumo da Missão</h4>
                <p className="text-sm leading-relaxed text-foreground/80">
                  O sistema de <span className="text-primary font-bold">Vitimização Criminal</span> visa transformar dados brutos em inteligência científica para apoiar a segurança urbana no Município da Samba. Continue monitorando os indicadores para auxiliar em políticas públicas baseadas em evidências.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Insight Banner */}
      <div className="bg-gradient-primary rounded-2xl p-8 text-white shadow-xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-500">
          <BarChart3 className="h-32 w-32" />
        </div>
        <div className="relative z-10 max-w-2xl">
          <h3 className="text-2xl font-bold mb-2">Pronto para analisar?</h3>
          <p className="text-white/80 mb-6">
            Explore a nossa ferramenta de gráficos avançados para descobrir tendências de criminalidade e percepções de segurança em diferentes bairros e faixas etárias.
          </p>
          <Link href="/dashboard/graphs">
            <Button variant="secondary" className="font-bold">
              Ir para Gráficos <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
