"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { 
  AlertTriangle, 
  Search, 
  Trash2, 
  CheckCircle, 
  Eye, 
  Clock, 
  Mail 
} from "lucide-react";

interface Report {
  id: number;
  name: string | null;
  email: string | null;
  subject: string;
  message: string;
  createdAt: string;
  read: boolean;
}

export default function OccurrencesPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch("/api/reports"); // Assume this API exists to fetch 'Report' model
        if (response.ok) {
          const data = await response.json();
          setReports(data);
        }
      } catch (error) {
        console.error("Error fetching reports:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const markAsRead = (id: number) => {
    toast({
      title: "Denúncia Visualizada",
      description: "A denúncia foi marcada como lida.",
    });
    setReports(reports.map(r => r.id === id ? { ...r, read: true } : r));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-foreground tracking-tight">Gestão de Denúncias</h2>
          <p className="text-muted-foreground mt-1">
            Canal de interação com a comunidade através da página inicial.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-muted p-2 rounded-lg">
          <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20 gap-1 px-3 py-1">
            <AlertTriangle className="h-3 w-3" /> {reports.filter(r => !r.read).length} Novas
          </Badge>
        </div>
      </div>

      <Card className="border-none shadow-lg">
        <CardHeader>
          <CardTitle>Denúncias Recebidas (Cidadão)</CardTitle>
          <CardDescription>Estes são os relatos enviados espontaneamente pelos moradores do Bairro Gamek à Direita.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead className="w-[100px]">Data</TableHead>
                  <TableHead>Assunto</TableHead>
                  <TableHead>Cidadão</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow><TableCell colSpan={5} className="text-center py-10">Carregando...</TableCell></TableRow>
                ) : reports.length === 0 ? (
                  <TableRow><TableCell colSpan={5} className="text-center py-10">Nenhuma denúncia registrada.</TableCell></TableRow>
                ) : (
                  reports.map((report) => (
                    <TableRow key={report.id} className={report.read ? "opacity-60" : "bg-primary/5"}>
                      <TableCell className="font-medium">
                        <div className="flex flex-col">
                          <span className="text-xs flex items-center gap-1 text-muted-foreground"><Clock className="h-3 w-3" /> {new Date(report.createdAt).toLocaleDateString()}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-semibold">{report.subject}</div>
                        <div className="text-xs text-muted-foreground truncate max-w-[300px]">{report.message}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-primary" />
                          <span className="text-sm">{report.name || "Anónimo"}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {report.read ? (
                          <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">Lida</Badge>
                        ) : (
                          <Badge className="bg-destructive hover:bg-destructive shadow-sm animate-pulse">Pendente</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" className="hover:text-primary" onClick={() => markAsRead(report.id)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="hover:text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Info Box explaining TCC Logic */}
      <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex gap-4 items-start">
        <CheckCircle className="h-6 w-6 text-amber-600 shrink-0" />
        <div>
          <h4 className="font-bold text-amber-700 text-sm italic">Lógica de Interação Social</h4>
          <p className="text-xs text-amber-800/80 mt-1 leading-relaxed">
            Este menu representa o canal de <span className="font-bold">Engajamento Comunitário</span>. Ao contrário dos "Inquéritos de Campo" (que são científicos e estruturados), estas denúncias são subjetivas e fornecem percepções qualitativas em tempo real da população.
          </p>
        </div>
      </div>
    </div>
  );
}
