import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Database, ShieldCheck, Download } from "lucide-react";

export default function DatabaseManagementPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h2 className="text-3xl font-bold text-foreground tracking-tight">Gestão de Base de Dados</h2>
        <p className="text-muted-foreground mt-1">
          Monitorização e manutenção da integridade dos dados.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
          <div className="h-12 w-12 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
            <Database className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Cópia de Segurança (Backup)</h3>
          <p className="text-muted-foreground mb-6">
            Realize cópias de segurança completas dos seus dados ou restaure versões anteriores para garantir a continuidade do sistema.
          </p>
          <Link href="/dashboard/backup">
            <Button className="w-full">
              Ir para Backup <Download className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="bg-card p-6 rounded-xl border border-border shadow-sm opacity-60">
          <div className="h-12 w-12 rounded-lg bg-green-100 text-green-600 flex items-center justify-center mb-4">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Integridade de Dados</h3>
          <p className="text-muted-foreground mb-6">
            Verificação de consistência e limpeza de registros órfãos. (Funcionalidade em desenvolvimento)
          </p>
          <Button disabled variant="outline" className="w-full">
            Em Breve
          </Button>
        </div>
      </div>
    </div>
  );
}
