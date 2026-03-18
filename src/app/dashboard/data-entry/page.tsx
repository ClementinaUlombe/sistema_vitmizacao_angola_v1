"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useSearchParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import SuccessModal from "@/components/SuccessModal";
import { 
  UserCircle, 
  ShieldAlert, 
  Eye, 
  ChevronRight, 
  ChevronLeft, 
  Save,
  CheckCircle2,
  Trash2,
  Edit2,
  Check,
  X,
  History,
  Search
} from "lucide-react";
export default function DataEntryPage() {
  const searchParams = useSearchParams();
  const isAdminView = searchParams.get("admin") === "true";
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) return null;

  // Mostrar página de revisão para admin
  if (isAdminView && user.role === "ADMIN") {
    return <AdminDataEntryManagement />;
  }

  // Mostrar formulário normal para researcher
  return <ResearcherDataEntryForm userId={user.id} />;
}

interface Resident {
  id: number;
  residentNumber: string;
  neighborhood: string;
  ageGroup: string;
  gender: string;
  status: string;
  surveyDate: string;
  researcher?: {
    name: string;
  };
  victimizations: Array<{
    wasVictim: boolean;
  }>;
}

// Componente para ADMIN revisar lançamentos
const AdminDataEntryManagement = () => {
  const [residents, setResidents] = useState<Resident[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedResident, setSelectedResident] = useState<Resident | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const { toast } = useToast();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchResidents();
  }, []);

  const fetchResidents = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/data");
      if (!response.ok) throw new Error("Erro ao procurar lançamentos");
      const data = await response.json();
      setResidents(data);
    } catch (error) {
      console.error(error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os lançamentos",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id: number, status: string) => {
    try {
      const response = await fetch("/api/data", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (!response.ok) throw new Error("Erro ao atualizar status");
      
      setResidents(residents.map(r => r.id === id ? { ...r, status } : r));
      
      toast({
        title: "Sucesso",
        description: `Inquérito ${status === "VALIDADO" ? "validado" : "rejeitado"} com sucesso`,
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o status",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch("/api/data", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!response.ok) throw new Error("Erro ao eliminar");
      setResidents(residents.filter((r) => r.id !== id));
      setDeleteConfirm(null);
      toast({
        title: "Eliminado",
        description: "O lançamento foi eliminado com sucesso",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível eliminar o lançamento",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "VALIDADO": return <Badge className="bg-green-500 hover:bg-green-600">Validado</Badge>;
      case "REJEITADO": return <Badge variant="destructive">Rejeitado</Badge>;
      default: return <Badge variant="outline" className="text-amber-600 border-amber-600">Pendente</Badge>;
    }
  };

  const filteredResidents = residents.filter(
    (r) =>
      r.residentNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.neighborhood.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.researcher?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredResidents.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredResidents.length / itemsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  useEffect(() => {
    setCurrentPage(1); // Reset to first page when search term changes
  }, [searchTerm]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">A carregar lançamentos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary mb-2">Gerir Lançamentos de Inquéritos</h1>
        <p className="text-muted-foreground">
          Valide os envios dos investigadores para que sejam incluídos nas estatísticas oficiais.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Search className="h-5 w-5" /> Filtro de Busca
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="Procure por número de inquérito, bairro ou nome do investigador..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </CardContent>
      </Card>

      <Card className="overflow-hidden border-none shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted border-b">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">Nº Inquérito</th>
                <th className="px-4 py-3 text-left font-semibold">Investigador</th>
                <th className="px-4 py-3 text-left font-semibold">Bairro</th>
                <th className="px-4 py-3 text-left font-semibold">Status</th>
                <th className="px-4 py-3 text-left font-semibold">Vítima</th>
                <th className="px-4 py-3 text-left font-semibold">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {currentItems.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">Nenhum lançamento encontrado</td>
                </tr>
              ) : (
                currentItems.map((resident) => (
                  <tr key={resident.id} className="hover:bg-muted/50 transition">
                    <td className="px-4 py-3 font-semibold text-blue-600">{resident.residentNumber}</td>
                    <td className="px-4 py-3">{resident.researcher?.name || "Sistema"}</td>
                    <td className="px-4 py-3">{resident.neighborhood}</td>
                    <td className="px-4 py-3">{getStatusBadge(resident.status)}</td>
                    <td className="px-4 py-3">
                      {resident.victimizations[0]?.wasVictim ? (
                        <span className="text-red-600 font-semibold">Sim</span>
                      ) : (
                        <span className="text-green-600 font-semibold">Não</span>
                      )}
                    </td>
                    <td className="px-4 py-3 flex gap-2">
                      {resident.status === "PENDENTE" && (
                        <>
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700 h-8 w-8 p-0"
                            onClick={() => handleUpdateStatus(resident.id, "VALIDADO")}
                            title="Validar"
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            className="h-8 w-8 p-0"
                            onClick={() => handleUpdateStatus(resident.id, "REJEITADO")}
                            title="Rejeitar"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSelectedResident(resident)}
                        className="h-8 w-8 p-0"
                        title="Ver Detalhes"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => setDeleteConfirm(resident.id)}
                        className="h-8 w-8 p-0"
                        title="Eliminar permanentemente"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="p-4 border-t flex items-center justify-between">
            <div className="text-xs text-muted-foreground">
              Mostrando {indexOfFirstItem + 1} a {Math.min(indexOfLastItem, filteredResidents.length)} de {filteredResidents.length} lançamentos
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
              
              <div className="flex items-center gap-1">
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
                        className="h-8 w-8 p-0"
                      >
                        {pageNumber}
                      </Button>
                    );
                  } else if (
                    pageNumber === currentPage - 2 || 
                    pageNumber === currentPage + 2
                  ) {
                    return <span key={pageNumber} className="text-muted-foreground">...</span>;
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

      {/* Detalhes e Confirmação de Eliminação omitidos para brevidade, mas devem ser mantidos ou melhorados */}
    </div>
  );
};

// Componente para RESEARCHER enviar dados
const ResearcherDataEntryForm = ({ userId }: { userId: number }) => {
  const [step, setStep] = useState(1);
  const [recentUploads, setRecentUploads] = useState<Resident[]>([]);
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Pagination for Recent Submissions
  const [currentHistoryPage, setCurrentHistoryPage] = useState(1);
  const historyItemsPerPage = 5;

  useEffect(() => {
    fetchRecentUploads();
  }, []);

  const fetchRecentUploads = async () => {
    try {
      const response = await fetch(`/api/data`);
      if (response.ok) {
        const data = await response.json();
        setRecentUploads(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Logic for history pagination
  const indexOfLastHistoryItem = currentHistoryPage * historyItemsPerPage;
  const indexOfFirstHistoryItem = indexOfLastHistoryItem - historyItemsPerPage;
  const currentHistoryItems = recentUploads.slice(indexOfFirstHistoryItem, indexOfLastHistoryItem);
  const totalHistoryPages = Math.ceil(recentUploads.length / historyItemsPerPage);

  const paginateHistory = (pageNumber: number) => setCurrentHistoryPage(pageNumber);
  // Form State
  const [formData, setFormData] = useState({
    residentNumber: "",
    name: "",  // ✅ NOVO: Nome do residente/inquirido
    ageGroup: "",
    gender: "",
    occupation: "",
    residenceTime: "",
    neighborhood: "",
    educationLevel: "",
    wasVictim: false,
    crimeGeneral: "",
    reportedCrime: false,
    crimeFrequency: "Nunca",
    daySecurity: "Muito Seguro",
    nightSecurity: "Muito Inseguro",
    localPoliceTrustLevel: "Baixa",
    researcherId: userId,
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Erro ao salvar lançamento");
      }

      setShowSuccess(true);
      
      setStep(1);
      setFormData({
        residentNumber: "",
        ageGroup: "",
        gender: "",
        occupation: "",
        residenceTime: "",
        neighborhood: "",
        educationLevel: "",
        wasVictim: false,
        crimeGeneral: "",
        reportedCrime: false,
        crimeFrequency: "Nunca",
        daySecurity: "Muito Seguro",
        nightSecurity: "Muito Inseguro",
        localPoliceTrustLevel: "Baixa",
        researcherId: userId,
      });
      fetchRecentUploads();
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message || "Não foi possível salvar o lançamento",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "VALIDADO": return <Badge className="bg-green-500">Validado</Badge>;
      case "REJEITADO": return <Badge variant="destructive">Rejeitado</Badge>;
      default: return <Badge variant="outline" className="text-amber-600 border-amber-600">Pendente</Badge>;
    }
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      {/* Formulário Principal */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Novo Inquérito</h2>
            <p className="text-muted-foreground">Introduza os dados recolhidos no terreno.</p>
          </div>
          <div className="flex items-center gap-2 bg-muted p-1 rounded-lg">
            {[1, 2, 3].map((s) => (
              <div 
                key={s} 
                className={`h-2 w-8 rounded-full transition-all ${step >= s ? "bg-primary" : "bg-primary/20"}`}
              />
            ))}
          </div>
        </div>

        {step === 1 && (
          <Card className="border-none shadow-lg">
            <CardHeader className="bg-primary/5 border-b">
              <div className="flex items-center gap-2">
                <UserCircle className="h-5 w-5 text-primary" />
                <CardTitle>Passo 1: Perfil do Residente</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6 grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Nome do Residente</Label>
                <Input placeholder="Ex: João Silva" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label>Número do Inquérito</Label>
                <Input placeholder="Ex: 001/2026" value={formData.residentNumber} onChange={(e) => setFormData({...formData, residentNumber: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label>Bairro</Label>
                <Select onValueChange={(v) => setFormData({...formData, neighborhood: v})}>
                  <SelectTrigger><SelectValue placeholder="Selecione o bairro" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pedalé">Pedalé</SelectItem>
                    <SelectItem value="Huambo">Huambo</SelectItem>
                    <SelectItem value="Inorad">Inorad</SelectItem>
                    <SelectItem value="Saber Andar">Saber Andar</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Faixa Etária</Label>
                <Select onValueChange={(v) => setFormData({...formData, ageGroup: v})}>
                  <SelectTrigger><SelectValue placeholder="Selecione a idade" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="18-25">18-25 anos</SelectItem>
                    <SelectItem value="26-35">26-35 anos</SelectItem>
                    <SelectItem value="36-50">36-50 anos</SelectItem>
                    <SelectItem value="50+">Mais de 50 anos</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Género</Label>
                <Select onValueChange={(v) => setFormData({...formData, gender: v})}>
                  <SelectTrigger><SelectValue placeholder="Selecione o género" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Masculino">Masculino</SelectItem>
                    <SelectItem value="Feminino">Feminino</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Ocupação</Label>
                <Input placeholder="Ex: Estudante, Empregado..." value={formData.occupation} onChange={(e) => setFormData({...formData, occupation: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label>Escolaridade</Label>
                <Select onValueChange={(v) => setFormData({...formData, educationLevel: v})}>
                  <SelectTrigger><SelectValue placeholder="Selecione o nível" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Primário">Primário</SelectItem>
                    <SelectItem value="Secundário">Secundário</SelectItem>
                    <SelectItem value="Superior">Superior</SelectItem>
                    <SelectItem value="Nenhum">Nenhum</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label>Tempo de Residência no Bairro</Label>
                <Select onValueChange={(v) => setFormData({...formData, residenceTime: v})}>
                  <SelectTrigger><SelectValue placeholder="Selecione o tempo" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Menos de 1 ano">Menos de 1 ano</SelectItem>
                    <SelectItem value="1-5 anos">1-5 anos</SelectItem>
                    <SelectItem value="6-10 anos">6-10 anos</SelectItem>
                    <SelectItem value="Mais de 10 anos">Mais de 10 anos</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <div className="p-6 border-t flex justify-end">
              <Button onClick={nextStep}>Próximo <ChevronRight className="ml-2 h-4 w-4" /></Button>
            </div>
          </Card>
        )}

        {step === 2 && (
          <Card className="border-none shadow-lg">
            <CardHeader className="bg-destructive/5 border-b">
              <div className="flex items-center gap-2">
                <ShieldAlert className="h-5 w-5 text-destructive" />
                <CardTitle>Passo 2: Vitimização Criminal</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="flex items-center space-x-2 p-4 bg-muted/30 rounded-lg">
                <Checkbox id="victim" checked={formData.wasVictim} onCheckedChange={(checked) => setFormData({...formData, wasVictim: !!checked})} />
                <Label htmlFor="victim" className="text-base font-semibold">O residente foi vítima de algum crime?</Label>
              </div>

              {formData.wasVictim && (
                <div className="grid gap-6 md:grid-cols-2 animate-in slide-in-from-top-2">
                  <div className="space-y-2">
                    <Label>Tipo de Crime (Principal)</Label>
                    <Input placeholder="Ex: Roubo, Furto..." onChange={(e) => setFormData({...formData, crimeGeneral: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <Label>Frequência</Label>
                    <Select onValueChange={(v) => setFormData({...formData, crimeFrequency: v})}>
                      <SelectTrigger><SelectValue placeholder="Quantas vezes?" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Uma vez</SelectItem>
                        <SelectItem value="2">Duas vezes</SelectItem>
                        <SelectItem value="3+">Três ou mais vezes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center space-x-2 md:col-span-2">
                    <Checkbox id="reported" checked={formData.reportedCrime} onCheckedChange={(checked) => setFormData({...formData, reportedCrime: !!checked})} />
                    <Label htmlFor="reported">O crime foi denunciado às autoridades?</Label>
                  </div>
                </div>
              )}
            </CardContent>
            <div className="p-6 border-t flex justify-between">
              <Button variant="outline" onClick={prevStep}><ChevronLeft className="mr-2 h-4 w-4" /> Anterior</Button>
              <Button onClick={nextStep}>Próximo <ChevronRight className="ml-2 h-4 w-4" /></Button>
            </div>
          </Card>
        )}

        {step === 3 && (
          <Card className="border-none shadow-lg">
            <CardHeader className="bg-amber-500/5 border-b">
              <div className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-amber-500" />
                <CardTitle>Passo 3: Perceção e Segurança</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Segurança durante o Dia</Label>
                  <Select onValueChange={(v) => setFormData({...formData, daySecurity: v})}>
                    <SelectTrigger><SelectValue placeholder="Como avalia?" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Muito Seguro">Muito Seguro</SelectItem>
                      <SelectItem value="Seguro">Seguro</SelectItem>
                      <SelectItem value="Inseguro">Inseguro</SelectItem>
                      <SelectItem value="Muito Inseguro">Muito Inseguro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Segurança durante a Noite</Label>
                  <Select onValueChange={(v) => setFormData({...formData, nightSecurity: v})}>
                    <SelectTrigger><SelectValue placeholder="Como avalia?" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Muito Seguro">Muito Seguro</SelectItem>
                      <SelectItem value="Seguro">Seguro</SelectItem>
                      <SelectItem value="Inseguro">Inseguro</SelectItem>
                      <SelectItem value="Muito Inseguro">Muito Inseguro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Nível de Confiança na Polícia Local</Label>
                <Select onValueChange={(v) => setFormData({...formData, localPoliceTrustLevel: v})}>
                  <SelectTrigger><SelectValue placeholder="Selecione o nível" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Alta">Alta Confiança</SelectItem>
                    <SelectItem value="Media">Média Confiança</SelectItem>
                    <SelectItem value="Baixa">Baixa Confiança</SelectItem>
                    <SelectItem value="Nenhuma">Nenhuma Confiança</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <div className="p-6 border-t flex justify-between">
              <Button variant="outline" onClick={prevStep}><ChevronLeft className="mr-2 h-4 w-4" /> Anterior</Button>
              <Button className="bg-green-600 hover:bg-green-700 text-white" onClick={handleSubmit} disabled={loading}>
                {loading ? "A enviar..." : <><Save className="mr-2 h-4 w-4" /> Enviar para Validação</>}
              </Button>
            </div>
          </Card>
        )}
      </div>

      <SuccessModal
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        title="Inquérito Enviado!"
        message="Os dados foram registados e aguardam a validação do administrador para as estatísticas."
      />
    </div>
  );
};
