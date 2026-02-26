"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Send, Shield, MapPin, Calendar, User as UserIcon } from "lucide-react";

const CRIME_TYPES = [
  { id: "theft", label: "Furto" },
  { id: "robbery", label: "Roubo" },
  { id: "aggression", label: "Agressão Física" },
  { id: "domesticViolence", label: "Violência Doméstica" },
  { id: "rape", label: "Violência Sexual" },
  { id: "fraud", label: "Fraude / Burla" },
  { id: "cybercrime", label: "Crime Cibernético" },
];

export default function ReportCreationPage() {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Estados do Formulário
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [selectedCrimes, setSelectedCrimes] = useState<string[]>([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserName(user.name || "");
      setUserEmail(user.email || "");
    }
  }, []);

  const handleCrimeToggle = (crimeId: string) => {
    setSelectedCrimes(prev => 
      prev.includes(crimeId) 
        ? prev.filter(id => id !== crimeId) 
        : [...prev, crimeId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !message || !neighborhood) {
      toast.error("Por favor, preencha os campos obrigatórios.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: isAnonymous ? "Anónimo" : userName,
          email: isAnonymous ? "" : userEmail,
          subject,
          message,
          neighborhood,
          gender,
          age,
          wasVictim: true,
          theft: selectedCrimes.includes("theft"),
          robbery: selectedCrimes.includes("robbery"),
          aggression: selectedCrimes.includes("aggression"),
          domesticViolence: selectedCrimes.includes("domesticViolence"),
          rape: selectedCrimes.includes("rape"),
          fraud: selectedCrimes.includes("fraud"),
          cybercrime: selectedCrimes.includes("cybercrime"),
        }),
      });

      if (response.ok) {
        toast.success("Relato enviado com sucesso! Agradecemos a sua contribuição.");
        setSubject("");
        setMessage("");
        setNeighborhood("");
        setSelectedCrimes([]);
      } else {
        toast.error("Erro ao enviar relato. Tente novamente.");
      }
    } catch (error) {
      toast.error("Erro de conexão com o servidor.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Enviar Novo Relato</h2>
          <p className="text-muted-foreground text-lg">Reporte incidentes ou situações de insegurança no seu bairro.</p>
        </div>
        <div className="flex items-center gap-2 p-3 bg-primary/5 rounded-lg border border-primary/10">
          <Shield className="text-primary h-5 w-5" />
          <div className="flex items-center gap-2">
            <Label htmlFor="anonymous" className="text-sm font-medium cursor-pointer">Enviar como Anónimo?</Label>
            <Checkbox 
              id="anonymous" 
              checked={isAnonymous} 
              onCheckedChange={(checked) => setIsAnonymous(checked as boolean)} 
            />
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Secção 1: O Que Aconteceu */}
        <Card className="md:col-span-1 shadow-sm border-t-4 border-primary">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Detalhes do Incidente
            </CardTitle>
            <CardDescription>O que deseja reportar?</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="subject" className="font-semibold">Assunto / Título</Label>
              <Input 
                id="subject" 
                placeholder="Ex: Roubo de telemóvel na via pública" 
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-3 pt-2">
              <Label className="font-semibold">Tipo de Crime (Selecione todos os que se aplicam)</Label>
              <div className="grid grid-cols-1 gap-2 border p-3 rounded-md bg-muted/20">
                {CRIME_TYPES.map(crime => (
                  <div key={crime.id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={crime.id} 
                      checked={selectedCrimes.includes(crime.id)}
                      onCheckedChange={() => handleCrimeToggle(crime.id)}
                    />
                    <Label htmlFor={crime.id} className="text-sm cursor-pointer">{crime.label}</Label>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Secção 2: Localização e Dados */}
        <Card className="md:col-span-1 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Onde e Quem
            </CardTitle>
            <CardDescription>Ajude-nos a mapear a zona crítica.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="neighborhood" className="font-semibold">Bairro da Ocorrência</Label>
              <Input 
                id="neighborhood" 
                placeholder="Ex: Maianga, Talatona..." 
                value={neighborhood}
                onChange={(e) => setNeighborhood(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="gender">Seu Género</Label>
                <Select onValueChange={setGender} value={gender}>
                  <SelectTrigger id="gender">
                    <SelectValue placeholder="Escolher" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Masculino">Masculino</SelectItem>
                    <SelectItem value="Feminino">Feminino</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="age">Sua Idade</Label>
                <Input 
                  id="age" 
                  type="number" 
                  placeholder="Ex: 25" 
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <Label className="text-xs text-muted-foreground flex items-center gap-1">
                <UserIcon className="h-3 w-3" />
                Relato enviado por: {isAnonymous ? "Anónimo" : userName || "Utilizador"}
              </Label>
            </div>
          </CardContent>
        </Card>

        {/* Secção 3: Descrição Final */}
        <Card className="md:col-span-2 shadow-sm">
          <CardHeader>
            <CardTitle>Narrativa da Ocorrência</CardTitle>
            <CardDescription>Descreva com o máximo detalhe possível o que aconteceu.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea 
              className="min-h-[150px] text-base leading-relaxed"
              placeholder="Descreva aqui o incidente, horários, número de envolvidos e qualquer outra informação relevante..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
            <Button 
              type="submit" 
              className="w-full h-12 text-lg font-bold flex items-center gap-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? "A enviar..." : "Enviar Relato Agora"}
              <Send className="h-5 w-5" />
            </Button>
            <p className="text-center text-xs text-muted-foreground italic">
              * O seu relato ajuda a tornar os bairros de Angola mais seguros através da análise de dados.
            </p>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
