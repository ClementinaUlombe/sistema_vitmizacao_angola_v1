'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Loader2, AlertCircle } from 'lucide-react';

interface SubmissionStatus {
  id: number;
  residentNumber: string;
  neighborhood: string;
  gender: string;
  ageGroup: string;
  surveyDate: string;
  status: 'PENDENTE' | 'VALIDADO' | 'REJEITADO';
}

export default function SubmissionStatusPage() {
  const [submissions, setSubmissions] = useState<SubmissionStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Busca todos os lançamentos sem filtrar por ID de investigador
      const response = await fetch('/api/data');
      if (!response.ok) throw new Error('Erro ao carregar lançamentos');
      const data = await response.json();
      setSubmissions(data || []);
      setCurrentPage(1); // Reset to first page on fetch
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "VALIDADO": return <Badge className="bg-green-500 hover:bg-green-600">Validado</Badge>;
      case "REJEITADO": return <Badge variant="destructive">Rejeitado</Badge>;
      default: return <Badge variant="outline" className="text-amber-600 border-amber-600">Pendente</Badge>;
    }
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = submissions.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(submissions.length / itemsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="p-4 space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-foreground tracking-tight">Status de Lançamento</h2>
          <p className="text-muted-foreground mt-1">
            Monitorize o processo de validação dos seus inquéritos enviados.
          </p>
        </div>
        <Button onClick={fetchSubmissions} variant="outline" size="sm" disabled={loading}>
          {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
          Atualizar Dados
        </Button>
      </div>

      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
            <div>
              <p className="text-red-600 font-medium">{error}</p>
              <Button variant="link" onClick={fetchSubmissions} className="p-0 h-auto text-red-600 font-bold mt-2">
                Tentar Novamente
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <div className="h-32 bg-muted rounded-xl"></div>
            </Card>
          ))}
        </div>
      ) : submissions.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="pt-12 pb-12 text-center">
            <div className="h-12 w-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <History className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground font-medium">Nenhum lançamento encontrado.</p>
            <p className="text-sm text-muted-foreground mt-1">Comece a preencher inquéritos no menu de Lançamentos.</p>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {currentItems.map((submission) => (
              <Card key={submission.id} className="hover:shadow-md transition-all border-none bg-card shadow-sm group">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-base font-bold group-hover:text-primary transition-colors">
                        Inquérito #{submission.residentNumber}
                      </CardTitle>
                      <CardDescription className="font-medium mt-1">
                        {submission.neighborhood}
                      </CardDescription>
                    </div>
                    {getStatusBadge(submission.status || 'PENDENTE')}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Data:</span>
                      <span className="font-medium">{new Date(submission.surveyDate).toLocaleDateString('pt-PT')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Perfil:</span>
                      <span className="font-medium">{submission.gender}, {submission.ageGroup}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              <Button
                variant="outline"
                size="icon"
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="h-8 w-8"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              <div className="flex items-center gap-1">
                {[...Array(totalPages)].map((_, i) => {
                  const pageNumber = i + 1;
                  // Show current page, first, last, and pages around current
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
                        className="h-8 w-8 p-0"
                      >
                        {pageNumber}
                      </Button>
                    );
                  } else if (
                    pageNumber === currentPage - 2 || 
                    pageNumber === currentPage + 2
                  ) {
                    return <span key={pageNumber} className="px-1 text-muted-foreground">...</span>;
                  }
                  return null;
                })}
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="h-8 w-8"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
          
          <div className="text-center text-xs text-muted-foreground mt-4">
            Mostrando {indexOfFirstItem + 1} a {Math.min(indexOfLastItem, submissions.length)} de {submissions.length} lançamentos
          </div>
        </>
      )}
    </div>
  );
}

import { History } from 'lucide-react';
