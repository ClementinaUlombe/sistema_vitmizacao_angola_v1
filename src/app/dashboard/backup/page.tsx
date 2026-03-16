"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Download, 
  Upload, 
  Database, 
  FileJson, 
  AlertTriangle, 
  CheckCircle2, 
  Loader2,
  RefreshCcw,
  Info
} from "lucide-react";
import { toast } from "sonner";

interface BackupStats {
  users: number;
  residents: number;
  victimizations: number;
  securityPerceptions: number;
  reports: number;
}

export default function BackupPage() {
  const [loading, setLoading] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [importing, setImporting] = useState(false);
  const [stats, setStats] = useState<BackupStats | null>(null);

  const fetchStats = async (showToast = false) => {
    setLoading(true);
    try {
      const response = await fetch("/api/backup");
      if (response.ok) {
        const data = await response.json();
        setStats(data.stats);
        if (showToast) {
          toast.success("Estatísticas atualizadas com sucesso!");
        }
      }
    } catch (error) {
      console.error("Erro ao carregar estatísticas:", error);
      toast.error("Não foi possível carregar as estatísticas do banco de dados.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats(false);
  }, []);

  const handleExportJSON = async () => {
    setExporting(true);
    try {
      const response = await fetch("/api/backup");
      if (!response.ok) throw new Error("Falha ao exportar");
      
      const data = await response.json();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `safe-angola-backup-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      toast.success("Backup JSON exportado com sucesso!");
    } catch (error) {
      toast.error("Erro ao exportar backup JSON.");
    } finally {
      setExporting(false);
    }
  };

  const handleDownloadDB = async () => {
    try {
      window.location.href = "/api/backup/download";
      toast.success("Download do banco de dados iniciado.");
    } catch (error) {
      toast.error("Erro ao baixar arquivo do banco de dados.");
    }
  };

  const handleImportJSON = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!confirm("AVISO: Restaurar um backup irá SUBSTITUIR todos os dados atuais. Deseja continuar?")) {
      e.target.value = "";
      return;
    }

    setImporting(true);
    try {
      const reader = new FileReader();
      reader.onload = async (event) => {
        try {
          const content = JSON.parse(event.target?.result as string);
          const response = await fetch("/api/backup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(content),
          });

          if (response.ok) {
            toast.success("Backup restaurado com sucesso!");
            fetchStats();
          } else {
            const err = await response.json();
            throw new Error(err.error || "Erro na restauração");
          }
        } catch (error) {
          toast.error("Erro ao processar arquivo: " + (error as Error).message);
        } finally {
          setImporting(false);
        }
      };
      reader.readAsText(file);
    } catch (error) {
      toast.error("Erro ao ler arquivo.");
      setImporting(false);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-foreground tracking-tight">Cópia de Segurança (Backup)</h2>
        <p className="text-muted-foreground mt-1">
          Gerencie a preservação e restauração dos dados do sistema.
        </p>
      </div>

      {/* Stats Summary */}
      <div className="grid gap-6 md:grid-cols-5">
        {[
          { label: "Usuários", value: stats?.users, icon: Database },
          { label: "Residentes", value: stats?.residents, icon: Database },
          { label: "Vitimização", value: stats?.victimizations, icon: Database },
          { label: "Percepção", value: stats?.securityPerceptions, icon: Database },
          { label: "Relatórios", value: stats?.reports, icon: Database },
        ].map((item, i) => (
          <Card key={i} className="bg-muted/30">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{loading ? "..." : item.value}</div>
              <p className="text-xs text-muted-foreground uppercase">{item.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Export Card */}
        <Card className="shadow-md border-t-4 border-t-blue-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="h-5 w-5 text-blue-500" />
              Exportar Dados
            </CardTitle>
            <CardDescription>
              Baixe uma cópia dos dados atuais em formatos legíveis ou estruturados.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-lg bg-blue-50 text-blue-800 text-sm flex gap-3">
              <Info className="h-5 w-5 shrink-0" />
              <p>Recomendamos fazer backup semanalmente para evitar perda de informações importantes.</p>
            </div>
            
            <div className="flex flex-col gap-3">
              <Button 
                onClick={handleExportJSON} 
                disabled={exporting}
                variant="outline"
                className="w-full justify-start h-12"
              >
                {exporting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <FileJson className="mr-2 h-4 w-4 text-orange-500" />}
                Exportar como JSON
              </Button>
              
              <Button 
                onClick={handleDownloadDB}
                variant="outline"
                className="w-full justify-start h-12"
              >
                <Database className="mr-2 h-4 w-4 text-blue-600" />
                Baixar Banco de Dados (SQLite)
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Import Card */}
        <Card className="shadow-md border-t-4 border-t-amber-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5 text-amber-500" />
              Restaurar Backup
            </CardTitle>
            <CardDescription>
              Recupere dados de um arquivo de backup JSON exportado anteriormente.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-lg bg-amber-50 text-amber-800 text-sm flex gap-3">
              <AlertTriangle className="h-5 w-5 shrink-0" />
              <p>
                <strong>CUIDADO:</strong> A restauração irá apagar todos os dados atuais e substituí-los pelo conteúdo do arquivo de backup.
              </p>
            </div>
            
            <div className="relative">
              <input
                type="file"
                accept=".json"
                onChange={handleImportJSON}
                disabled={importing}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
              />
              <Button 
                variant="secondary" 
                className="w-full h-24 border-2 border-dashed border-amber-200 hover:border-amber-400 bg-amber-50/50"
                disabled={importing}
              >
                {importing ? (
                  <div className="flex flex-col items-center">
                    <Loader2 className="h-8 w-8 animate-spin mb-2" />
                    <span>Restaurando dados...</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <Upload className="h-8 w-8 mb-2 text-amber-500" />
                    <span className="font-semibold text-amber-700">Clique para selecionar arquivo JSON</span>
                    <span className="text-xs text-amber-600/70 mt-1">Apenas arquivos .json gerados por este sistema</span>
                  </div>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Info/Help Section */}
      <Card className="bg-gradient-to-r from-slate-900 to-slate-800 text-white border-none">
        <CardHeader>
          <CardTitle className="text-lg">Boas Práticas de Segurança</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="grid gap-4 md:grid-cols-3">
            <li className="flex gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-400 shrink-0" />
              <span className="text-sm text-slate-300">Guarde os backups em local seguro fora do servidor.</span>
            </li>
            <li className="flex gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-400 shrink-0" />
              <span className="text-sm text-slate-300">Verifique a integridade do arquivo JSON antes de restaurar.</span>
            </li>
            <li className="flex gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-400 shrink-0" />
              <span className="text-sm text-slate-300">Sempre exporte os dados atuais antes de fazer uma restauração.</span>
            </li>
          </ul>
        </CardContent>
      </Card>
      
      <div className="flex justify-center">
        <Button variant="ghost" size="sm" onClick={() => fetchStats(true)} disabled={loading}>
          <RefreshCcw className={`mr-2 h-3 w-3 ${loading ? "animate-spin" : ""}`} />
          Atualizar Estatísticas
        </Button>
      </div>
    </div>
  );
}
