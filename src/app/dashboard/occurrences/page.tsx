"use client";

import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Report {
  id: number;
  name: string | null;
  email: string | null;
  subject: string;
  message: string;
  createdAt: string;
  read: boolean;
}

const OccurrencesPage: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/occurrences");
      if (!response.ok) {
        throw new Error("Failed to fetch reports.");
      }
      const data = await response.json();
      setReports(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleRead = async (id: number, currentReadStatus: boolean) => {
    try {
      const response = await fetch("/api/occurrences", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, read: !currentReadStatus }),
      });

      if (!response.ok) {
        throw new Error("Failed to update report status.");
      }

      // Optimistically update UI
      setReports((prevReports) =>
        prevReports.map((report) =>
          report.id === id ? { ...report, read: !currentReadStatus } : report
        )
      );
    } catch (err: any) {
      console.error("Error toggling read status:", err);
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <p>Carregando ocorrências...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        <p>Erro: {error}</p>
        <Button onClick={fetchReports} className="mt-4">
          Tentar Novamente
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Ocorrências Recebidas</h1>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">Lido</TableHead>
              <TableHead className="min-w-[150px]">Nome</TableHead>
              <TableHead className="min-w-[200px]">Email</TableHead>
              <TableHead className="min-w-[250px]">Assunto</TableHead>
              <TableHead className="min-w-[300px]">Mensagem</TableHead>
              <TableHead className="min-w-[180px]">Data de Envio</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reports.map((report) => (
              <TableRow key={report.id} className={report.read ? "bg-muted/50" : "font-semibold"}>
                <TableCell>
                  <Checkbox
                    checked={report.read}
                    onCheckedChange={() => handleToggleRead(report.id, report.read)}
                    aria-label={report.read ? "Marcar como não lido" : "Marcar como lido"}
                  />
                </TableCell>
                <TableCell>{report.name || "Anónimo"}</TableCell>
                <TableCell>{report.email || "N/A"}</TableCell>
                <TableCell>{report.subject}</TableCell>
                <TableCell>{report.message}</TableCell>
                <TableCell>
                  {format(new Date(report.createdAt), "dd/MM/yyyy HH:mm", { locale: ptBR })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default OccurrencesPage;
