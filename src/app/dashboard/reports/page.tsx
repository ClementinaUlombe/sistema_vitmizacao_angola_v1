"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import GraphDisplay from "@/components/GraphDisplay";
import NumberCounter from "@/components/NumberCounter";
import { 
  BarChart, 
  PieChart, 
  TrendingUp, 
  Download, 
  Filter, 
  Info,
  ShieldCheck,
  Search,
  AlertCircle
} from "lucide-react";

interface SummaryData {
  totalResidents: number;
  victimizationRate: number;
  unreportedCrimesRate: number;
  neighborhoods: number;
}

export default function StatisticalPanelPage() {
  const [summaryData, setSummaryData] = useState<SummaryData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Profissional */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b pb-6">
        <div>
          <h2 className="text-3xl font-bold text-foreground tracking-tight">Painel Estatístico e Analítico</h2>
          <p className="text-muted-foreground mt-1">
            Observatório de Segurança Criminal - Bairro Gamek à Direita.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="shadow-sm">
            <Filter className="mr-2 h-4 w-4" /> Filtrar Período
          </Button>
          <Button size="sm" className="bg-primary shadow-md">
            <Download className="mr-2 h-4 w-4" /> Exportar Relatório (PDF)
          </Button>
        </div>
      </div>

      {/* KPI Ribbons - Foco Científico */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-primary/5 border-primary/20 shadow-sm">
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-primary uppercase tracking-wider">Amostra Científica</p>
                <h3 className="text-3xl font-bold mt-1">
                  {loading ? "..." : <NumberCounter targetValue={summaryData?.totalResidents || 0} />}
                </h3>
              </div>
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                <Search className="h-5 w-5" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Residentes validados no estudo</p>
          </CardContent>
        </Card>

        <Card className="bg-destructive/5 border-destructive/20 shadow-sm">
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-destructive uppercase tracking-wider">Índice de Prevalência</p>
                <h3 className="text-3xl font-bold mt-1 text-destructive">
                  {loading ? "..." : <NumberCounter targetValue={summaryData?.victimizationRate || 0} decimals={1} suffix="%" />}
                </h3>
              </div>
              <div className="p-2 bg-destructive/10 rounded-lg text-destructive">
                <AlertCircle className="h-5 w-5" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Exposição criminal (últimos 12 meses)</p>
          </CardContent>
        </Card>

        <Card className="bg-amber-500/5 border-amber-500/20 shadow-sm">
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-amber-600 uppercase tracking-wider">Cifra Negra</p>
                <h3 className="text-3xl font-bold mt-1 text-amber-600">
                  {loading ? "..." : <NumberCounter targetValue={summaryData?.unreportedCrimesRate || 0} decimals={1} suffix="%" />}
                </h3>
              </div>
              <div className="p-2 bg-amber-500/10 rounded-lg text-amber-600">
                <TrendingUp className="h-5 w-5" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Crimes que não foram denunciados</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs de Exploração de Dados */}
      <Tabs defaultValue="incidencia" className="space-y-6">
        <TabsList className="bg-muted p-1 rounded-xl w-full md:w-auto overflow-x-auto justify-start h-auto">
          <TabsTrigger value="incidencia" className="px-6 py-2 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <BarChart className="h-4 w-4 mr-2" /> Incidência de Crimes
          </TabsTrigger>
          <TabsTrigger value="perfil" className="px-6 py-2 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <TrendingUp className="h-4 w-4 mr-2" /> Perfil Demográfico
          </TabsTrigger>
          <TabsTrigger value="percepcao" className="px-6 py-2 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <ShieldCheck className="h-4 w-4 mr-2" /> Perceção de Segurança
          </TabsTrigger>
        </TabsList>

        <TabsContent value="incidencia" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="shadow-md border-none">
              <CardHeader>
                <CardTitle className="text-lg">Vitimização por Tipo de Crime</CardTitle>
                <CardDescription>Distribuição percentual das tipologias criminais identificadas.</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <GraphDisplay forceSelectedGraph="victimizationByCrimeType" hideSelector={true} />
              </CardContent>
            </Card>

            <Card className="shadow-md border-none">
              <CardHeader>
                <CardTitle className="text-lg">Crimes por Localidade (Bairro)</CardTitle>
                <CardDescription>Mapeamento de ocorrências por zonas geográficas do estudo.</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <GraphDisplay forceSelectedGraph="crimesByNeighborhood" hideSelector={true} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="perfil" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="shadow-md border-none">
              <CardHeader>
                <CardTitle className="text-lg">Distribuição por Faixa Etária e Género</CardTitle>
                <CardDescription>Análise demográfica da vitimização.</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <GraphDisplay forceSelectedGraph="victimizationByAgeAndGender" hideSelector={true} />
              </CardContent>
            </Card>

            <Card className="shadow-md border-none">
              <CardHeader>
                <CardTitle className="text-lg">Vitimização por Escolaridade</CardTitle>
                <CardDescription>Relação entre nível de instrução e exposição ao crime.</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <GraphDisplay forceSelectedGraph="victimizationByEducationLevel" hideSelector={true} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="percepcao" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="shadow-md border-none">
              <CardHeader>
                <CardTitle className="text-lg">Razões para a Não Denúncia</CardTitle>
                <CardDescription>Fatores que contribuem para a Cifra Negra no bairro.</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <GraphDisplay forceSelectedGraph="reasonsForNotReporting" hideSelector={true} />
              </CardContent>
            </Card>

            <Card className="shadow-md border-none">
              <CardHeader>
                <CardTitle className="text-lg">Confiança nas Autoridades Policiais</CardTitle>
                <CardDescription>Nível de credibilidade institucional perante a população.</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <GraphDisplay forceSelectedGraph="policeTrust" hideSelector={true} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Nota Metodológica / TCC Footer */}
      <Card className="bg-muted/50 border-none">
        <CardContent className="py-4 flex items-center gap-3">
          <Info className="h-5 w-5 text-primary" />
          <p className="text-xs text-muted-foreground leading-relaxed">
            <span className="font-bold">Nota Científica:</span> Os dados apresentados neste painel estatístico são gerados em tempo real a partir dos algoritmos de processamento do sistema. A metodologia aplicada segue os padrões de investigação quantitativa, com foco na análise de vitimização urbana e perceção de insegurança, servindo como base para as conclusões do presente Trabalho de Conclusão de Curso (TCC).
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
