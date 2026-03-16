"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useSearchParams } from "next/navigation";
import { 
  UserCircle, 
  ShieldAlert, 
  Eye, 
  ChevronRight, 
  ChevronLeft, 
  Save,
  CheckCircle2,
  Trash2,
  Edit2
} from "lucide-react";

export default function DataEntryPage() {
  const searchParams = useSearchParams();
  const isAdminView = searchParams.get("admin") === "true";
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserRole(user.role);
    }
  }, []);

  // Mostrar página de revisão para admin
  if (isAdminView && userRole === "ADMIN") {
    return <AdminDataEntryManagement />;
  }

  // Mostrar formulário normal para researcher
  return <ResearcherDataEntryForm />;
}

interface Resident {
  id: number;
  residentNumber: string;
  neighborhood: string;
  ageGroup: string;
  gender: string;
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

  const filteredResidents = residents.filter(
    (r) =>
      r.residentNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.neighborhood.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <h1 className="text-3xl font-bold text-primary mb-2">Revisar Lançamentos de Inquéritos</h1>
        <p className="text-muted-foreground">
          Visualize, edite e gerencie todos os lançamentos enviados por investigadores
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filtro de Busca</CardTitle>
          <CardDescription>Procure por número, bairro ou investigador</CardDescription>
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

      {filteredResidents.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Nenhum lançamento encontrado</p>
        </div>
      ) : (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted border-b">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Nº Inquérito</th>
                  <th className="px-4 py-3 text-left font-semibold">Investigador</th>
                  <th className="px-4 py-3 text-left font-semibold">Bairro</th>
                  <th className="px-4 py-3 text-left font-semibold">Idade</th>
                  <th className="px-4 py-3 text-left font-semibold">Género</th>
                  <th className="px-4 py-3 text-left font-semibold">Vítima</th>
                  <th className="px-4 py-3 text-left font-semibold">Data</th>
                  <th className="px-4 py-3 text-left font-semibold">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredResidents.map((resident) => (
                  <tr key={resident.id} className="hover:bg-muted/50 transition">
                    <td className="px-4 py-3 font-semibold text-blue-600">{resident.residentNumber}</td>
                    <td className="px-4 py-3">—</td>
                    <td className="px-4 py-3">{resident.neighborhood}</td>
                    <td className="px-4 py-3">{resident.ageGroup}</td>
                    <td className="px-4 py-3">{resident.gender}</td>
                    <td className="px-4 py-3">
                      {resident.victimizations[0]?.wasVictim ? (
                        <span className="text-red-600 font-semibold">Sim</span>
                      ) : (
                        <span className="text-green-600 font-semibold">Não</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">—</td>
                    <td className="px-4 py-3 flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSelectedResident(resident)}
                        className="h-8 w-8 p-0"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 w-8 p-0"
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => setDeleteConfirm(resident.id)}
                        className="h-8 w-8 p-0"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {selectedResident && (
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle>Detalhes do Lançamento #{selectedResident.residentNumber}</CardTitle>
              <CardDescription>Informações do inquérito</CardDescription>
            </div>
            <Button variant="ghost" onClick={() => setSelectedResident(null)}>✕</Button>
          </CardHeader>
          <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Bairro</p>
              <p className="font-semibold">{selectedResident.neighborhood}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Idade</p>
              <p className="font-semibold">{selectedResident.ageGroup}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Género</p>
              <p className="font-semibold">{selectedResident.gender}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Foi Vítima</p>
              <p className="font-semibold">
                {selectedResident.victimizations[0]?.wasVictim ? "Sim ⚠️" : "Não ✅"}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {deleteConfirm && (
        <Card className="bg-red-50 border-red-200">
          <CardHeader>
            <CardTitle className="text-red-700">Confirmar Eliminação</CardTitle>
            <CardDescription>
              Tem certeza que deseja eliminar este lançamento? Esta ação é irreversível.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setDeleteConfirm(null)}>
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={() => handleDelete(deleteConfirm)}
            >
              Eliminar
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

// Componente para RESEARCHER enviar dados (original)
const ResearcherDataEntryForm = () => {
  const [step, setStep] = useState(1);
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    // Resident Data
    residentNumber: "",
    ageGroup: "",
    gender: "",
    occupation: "",
    neighborhood: "",
    educationLevel: "",
    // Victimization
    wasVictim: false,
    crimeGeneral: "",
    reportedCrime: false,
    crimeFrequency: "Nunca",
    // Perception
    daySecurity: "Muito Seguro",
    nightSecurity: "Muito Inseguro",
    localPoliceTrustLevel: "Baixa",
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

      setLoading(false);
      toast({
        title: "Inquérito Salvo ✅",
        description: "O inquérito foi salvo com sucesso na base de dados",
        duration: 3000,
      });
      
      setStep(1);
      setFormData({
        residentNumber: "",
        ageGroup: "",
        gender: "",
        occupation: "",
        neighborhood: "",
        educationLevel: "",
        wasVictim: false,
        crimeGeneral: "",
        reportedCrime: false,
        crimeFrequency: "Nunca",
        daySecurity: "Muito Seguro",
        nightSecurity: "Muito Inseguro",
        localPoliceTrustLevel: "Baixa",
      });
    } catch (error: any) {
      setLoading(false);
      toast({
        title: "Erro",
        description: error.message || "Não foi possível salvar o lançamento",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Registar Novo Inquérito</h2>
          <p className="text-muted-foreground">Introduza manualmente os dados recolhidos no terreno.</p>
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
            <CardDescription>Dados sociodemográficos do inquirido</CardDescription>
          </CardHeader>
          <CardContent className="pt-6 grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Número do Inquérito</Label>
              <Input placeholder="Ex: 001/2025" value={formData.residentNumber} onChange={(e) => setFormData({...formData, residentNumber: e.target.value})} />
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
            <CardDescription>Experiências de crime nos últimos 12 meses</CardDescription>
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
                  <Input placeholder="Ex: Roubo, Furto..." />
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
            <CardDescription>Opinião sobre a segurança no bairro</CardDescription>
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
            <div className="space-y-2">
              <Label>Sugestões de Melhoria</Label>
              <Textarea placeholder="O que sugeria para melhorar a segurança?" className="min-h-[100px]" />
            </div>
          </CardContent>
          <div className="p-6 border-t flex justify-between">
            <Button variant="outline" onClick={prevStep}><ChevronLeft className="mr-2 h-4 w-4" /> Anterior</Button>
            <Button className="bg-green-600 hover:bg-green-700 text-white" onClick={handleSubmit} disabled={loading}>
              {loading ? "A guardar..." : <><Save className="mr-2 h-4 w-4" /> Finalizar Registro</>}
            </Button>
          </div>
        </Card>
      )}

      {/* Helper Info */}
      <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 flex gap-4 items-start">
        <CheckCircle2 className="h-6 w-6 text-primary shrink-0" />
        <div>
          <h4 className="font-bold text-primary text-sm">Dica de Investigação</h4>
          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
            Certifique-se de que o número do inquérito corresponde ao documento físico. Estes dados serão processados automaticamente pelo motor estatístico para gerar os gráficos de vitimização.
          </p>
        </div>
      </div>
    </div>
  );
}
