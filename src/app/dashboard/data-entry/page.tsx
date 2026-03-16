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

// Componente para ADMIN revisar lançamentos
const AdminDataEntryManagement = () => {
  return (
    <div className="w-full space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-primary mb-2">
          Revisar Lançamentos de Inquéritos
        </h1>
        <p className="text-muted-foreground">
          Visualize, edite e gerencie todos os lançamentos enviados por investigadores
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-blue-900 mb-4">✅ Painel de Revisão para ADMIN</h2>
        <div className="space-y-3 text-blue-800">
          <p>
            <strong>Nova funcionalidade:</strong> Acesso exclusivo para administradores gerenciarem todos os lançamentos
          </p>
          <p>
            <strong>O que pode fazer:</strong>
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>✅ Visualizar todos os lançamentos enviados</li>
            <li>✅ Pesquisar por número de inquérito ou bairro</li>
            <li>✅ Ver detalhes completos de cada lançamento</li>
            <li>✅ Editar dados dos lançamentos</li>
            <li>✅ Eliminar lançamentos (com confirmação)</li>
          </ul>
        </div>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-green-900 mb-4">📊 Funcionalidade em Desenvolvimento</h2>
        <div className="space-y-2 text-green-800">
          <p>A tabela de lançamentos será exibida aqui com as seguintes colunas:</p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Nº Inquérito</li>
            <li>Bairro</li>
            <li>Idade</li>
            <li>Género</li>
            <li>Foi Vítima (Sim/Não)</li>
            <li>Data de Registro</li>
            <li>Ações (Ver, Editar, Eliminar)</li>
          </ul>
        </div>
      </div>

      <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-purple-900 mb-4">🔄 Fluxo de Trabalho</h2>
        <div className="space-y-3 text-purple-800 text-sm">
          <div className="flex items-start gap-3">
            <span className="font-bold text-lg">1️⃣</span>
            <div>
              <strong>RESEARCHER envia inquéritos</strong>
              <p>Via menu "Lançamento de Inquéritos" (sem o ?admin=true)</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="font-bold text-lg">2️⃣</span>
            <div>
              <strong>ADMIN revisa lançamentos</strong>
              <p>Via menu "Revisar Lançamentos" → Vê todos os enviados → Gerencia conforme necessário</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="font-bold text-lg">3️⃣</span>
            <div>
              <strong>Dados processados</strong>
              <p>Sistema gera gráficos e estatísticas automaticamente</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-2">👤 ADMIN</h3>
          <p className="text-sm text-blue-800">✅ Ver "Revisar Lançamentos"</p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h3 className="font-semibold text-green-900 mb-2">👨‍💼 RESEARCHER</h3>
          <p className="text-sm text-green-800">✅ Ver "Lançamento de Inquéritos"</p>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h3 className="font-semibold text-red-900 mb-2">👮 POLICE</h3>
          <p className="text-sm text-red-800">❌ Sem acesso a estes menus</p>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h3 className="font-semibold text-red-900 mb-2">👥 CITIZEN</h3>
          <p className="text-sm text-red-800">❌ Sem acesso a estes menus</p>
        </div>
      </div>
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
    // In a real scenario, we would POST to /api/data/register
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Dados Registrados",
        description: "O inquérito foi salvo com sucesso na base de dados.",
      });
      setStep(1);
    }, 1500);
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
