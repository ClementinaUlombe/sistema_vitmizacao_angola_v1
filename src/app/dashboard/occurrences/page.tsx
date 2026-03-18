"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import ReportModal from "@/components/ReportModal";
import SuccessModal from "@/components/SuccessModal";
import { 
  AlertTriangle, 
  Trash2, 
  CheckCircle, 
  Eye, 
  Clock, 
  Plus
} from "lucide-react";

interface Report {
  id: number;
  name: string | null;
  email: string | null;
  subject: string;
  message: string;
  status: string;
  createdAt: string;
  read: boolean;
}

export default function OccurrencesPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<string>("");
  const [userId, setUserId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  
  // Success Modal State
  const [showSuccess, setShowSuccess] = useState(false);
  const [successTitle, setSuccessTitle] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const { toast } = useToast();

  const fetchReports = async () => {
    try {
      setLoading(true);
      const storedUser = localStorage.getItem("user");
      let url = "/api/reports";
      
      if (storedUser) {
        const user = JSON.parse(storedUser);
        setUserRole(user.role?.toUpperCase() || "");
        setUserId(user.id);
        
        if (user.role?.toUpperCase() === "CITIZEN") {
          url = `/api/reports?userId=${user.id}`;
        }
      }

      const response = await fetch(url);
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

  useEffect(() => {
    fetchReports();
  }, []);

  const handleViewReport = (report: Report) => {
    setSelectedReport(report);
    setIsViewModalOpen(true);
  };

  const markAsRead = async (id: number, newStatus: string) => {
    try {
      const response = await fetch("/api/reports", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, read: true, status: newStatus }),
      });
      
      if (response.ok) {
        setSuccessTitle("Estado Atualizado!");
        setSuccessMessage(`A ocorrência foi marcada como ${newStatus} com sucesso no sistema.`);
        setShowSuccess(true);
        fetchReports();
      }
    } catch (error) {
      console.error("Error updating report:", error);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o estado da ocorrência.",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status?.toLowerCase()) {
      case "validado":
        return <Badge className="bg-green-600">Validado pela Polícia</Badge>;
      case "rejeitado":
        return <Badge variant="destructive">Rejeitado</Badge>;
      default:
        return <Badge className="bg-amber-500 animate-pulse">Pendente</Badge>;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-foreground tracking-tight">
            {userRole === "CITIZEN" ? "Relatos Enviados" : "Gestão de Ocorrências"}
          </h2>
          <p className="text-muted-foreground mt-1">
            {userRole === "CITIZEN" 
              ? "Acompanhe os relatos enviados. O estado mudará assim que a polícia validar." 
              : "Analise e valide os relatos enviados pela comunidade."}
          </p>
        </div>
        <div>
          {userRole === "CITIZEN" && (
            <Button onClick={() => setIsModalOpen(true)} className="bg-primary hover:bg-primary/90 shadow-md font-bold">
              <Plus className="mr-2 h-4 w-4" /> Enviar Novo Relato
            </Button>
          )}
        </div>
      </div>

      <Card className="border-none shadow-lg">
        <CardHeader>
          <CardTitle>{userRole === "CITIZEN" ? "Histórico de Relatos" : "Ocorrências Recebidas"}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead className="w-[120px]">Data</TableHead>
                  <TableHead>Assunto / Mensagem</TableHead>
                  {userRole !== "CITIZEN" && <TableHead>Cidadão</TableHead>}
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow><TableCell colSpan={5} className="text-center py-10">Carregando...</TableCell></TableRow>
                ) : reports.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                      Nenhum relato encontrado.
                    </TableCell>
                  </TableRow>
                ) : (
                  reports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell className="text-xs">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Clock className="h-3 w-3" /> {new Date(report.createdAt).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-bold text-sm">{report.subject}</div>
                        <div className="text-xs text-muted-foreground line-clamp-1">{report.message}</div>
                      </TableCell>
                      {userRole !== "CITIZEN" && (
                        <TableCell>
                          <div className="text-xs font-semibold">{report.name || "Anónimo"}</div>
                        </TableCell>
                      )}
                      <TableCell>
                        {getStatusBadge(report.status)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          {userRole === "POLICE" && report.status !== "Validado" && (
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="h-8 text-xs border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
                              onClick={() => markAsRead(report.id, "Validado")}
                            >
                              <CheckCircle className="h-3 w-3 mr-1" /> Validar
                            </Button>
                          )}
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={() => handleViewReport(report)}
                          >
                            <Eye className="h-4 w-4" />
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

      <ReportModal 
        isOpen={isModalOpen} 
        onClose={() => {
          setIsModalOpen(false);
          fetchReports();
        }}
      />

      <ReportModal 
        isOpen={isViewModalOpen} 
        onClose={() => setIsViewModalOpen(false)}
        readOnly={true}
        report={selectedReport}
      />

      <SuccessModal
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        title={successTitle}
        message={successMessage}
      />
    </div>
  );
}
