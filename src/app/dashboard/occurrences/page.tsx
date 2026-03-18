"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
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
  Plus,
  ChevronLeft,
  ChevronRight
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

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

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

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentReports = reports.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(reports.length / itemsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

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
      case "pendente":
        return <Badge variant="outline" className="text-amber-600 border-amber-600">Aguardando Revisão</Badge>;
      case "rejeitado":
        return <Badge variant="destructive">Rejeitado</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-foreground tracking-tight">
            {userRole === "CITIZEN" ? "Relatos Enviados" : "Gestão de Ocorrências"}
          </h2>
          <p className="text-muted-foreground">
            {userRole === "CITIZEN" 
              ? "Acompanhe o estado dos seus relatos enviados à polícia." 
              : "Analise e valide as ocorrências enviadas pelos cidadãos."}
          </p>
        </div>
        {userRole === "CITIZEN" && (
          <Button onClick={() => setIsModalOpen(true)} className="bg-primary hover:bg-primary/90 shadow-md font-bold">
            <Plus className="mr-2 h-4 w-4" /> Enviar Novo Relato
          </Button>
        )}
      </div>

      <Card className="border-none shadow-lg overflow-hidden">
        <CardHeader className="bg-muted/30">
          <CardTitle className="text-lg flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-primary" />
            Lista de Ocorrências
          </CardTitle>
          <CardDescription>
            Mostrando todos os registos ordenados por data.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="w-full overflow-x-auto">
            <div className="inline-block min-w-full align-middle">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead className="w-[30%]">Assunto</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reports.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="h-32 text-center text-muted-foreground italic">
                        Nenhuma ocorrência registada.
                      </TableCell>
                    </TableRow>
                  ) : (
                    currentReports.map((report) => (
                      <TableRow key={report.id} className="hover:bg-muted/50 transition-colors">
                        <TableCell className="font-semibold py-4">
                          {report.subject}
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(report.status)}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Clock className="h-3.5 w-3.5" /> 
                            {new Date(report.createdAt).toLocaleDateString()}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            {userRole !== "CITIZEN" && report.status === "Pendente" && (
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100 h-8 font-bold text-xs"
                                onClick={() => markAsRead(report.id, "Validado")}
                              >
                                <CheckCircle className="h-3.5 w-3.5 mr-1" /> Validar
                              </Button>
                            )}
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 text-primary hover:bg-primary/10"
                              onClick={() => handleViewReport(report)}
                              title="Visualizar Detalhes"
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
          </div>
        </CardContent>
        
        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t flex items-center justify-between bg-card">
            <div className="text-xs text-muted-foreground font-medium">
              Mostrando <span className="text-foreground">{indexOfFirstItem + 1}</span> a <span className="text-foreground">{Math.min(indexOfLastItem, reports.length)}</span> de <span className="text-foreground">{reports.length}</span> relatos
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="h-8 w-8 p-0"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              <div className="flex items-center gap-1 mx-2">
                {[...Array(totalPages)].map((_, i) => {
                  const pageNumber = i + 1;
                  if (
                    pageNumber === 1 || 
                    pageNumber === totalPages || 
                    (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                  ) {
                    return (
                      <Button
                        key={pageNumber}
                        variant={currentPage === pageNumber ? "default" : "outline"}
                        size="sm"
                        onClick={() => paginate(pageNumber)}
                        className={`h-8 w-8 p-0 ${currentPage === pageNumber ? "shadow-md shadow-primary/20" : ""}`}
                      >
                        {pageNumber}
                      </Button>
                    );
                  } else if (
                    pageNumber === currentPage - 2 || 
                    pageNumber === currentPage + 2
                  ) {
                    return <span key={pageNumber} className="text-muted-foreground px-1 text-xs">...</span>;
                  }
                  return null;
                })}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="h-8 w-8 p-0"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
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
