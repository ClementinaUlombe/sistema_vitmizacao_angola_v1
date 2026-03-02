"use client";

import React, { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SuccessModal from "@/components/SuccessModal";

interface ReportModalProps {
  children: React.ReactNode;
}

interface FormData {
  name: string;
  email: string;
  age: string;
  gender: string;
  occupation: string;
  educationLevel: string;
  residenceTime: string;
  neighborhood: string;
  subject: string;
  message: string;
  wasVictim: string;
  crimeTypes: {
    theft: boolean;
    robbery: boolean;
    aggression: boolean;
    domesticViolence: boolean;
    rape: boolean;
    Coruption: boolean;
    fraud: boolean;
    trafic: boolean;
    otherCrime: string;
  };
}

const ReportModal: React.FC<ReportModalProps> = ({ children }) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    age: "",
    gender: "",
    occupation: "",
    educationLevel: "",
    residenceTime: "",
    neighborhood: "",
    subject: "",
    message: "",
    wasVictim: "",
    crimeTypes: {
      theft: false,
      robbery: false,
      aggression: false,
      domesticViolence: false,
      rape: false,
      Coruption: false,
      fraud: false,
      trafic: false,
      otherCrime: "",
    },
  });

  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [isOpen, setIsOpen] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSelectChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleCrimeTypeChange = (crimeType: keyof typeof formData.crimeTypes) => {
    if (crimeType === "otherCrime") return;
    setFormData({
      ...formData,
      crimeTypes: {
        ...formData.crimeTypes,
        [crimeType]: !formData.crimeTypes[crimeType],
      },
    });
  };

  const handleOtherCrimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      crimeTypes: {
        ...formData.crimeTypes,
        otherCrime: e.target.value,
      },
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const selectedCrimes = Object.entries(formData.crimeTypes)
        .filter(([key, value]) => {
          if (key === "otherCrime") return false;
          return value === true;
        })
        .map(([key]) => key);

      const dataToSend = {
        name: formData.name,
        email: formData.email,
        age: formData.age,
        gender: formData.gender,
        occupation: formData.occupation,
        educationLevel: formData.educationLevel,
        residenceTime: formData.residenceTime,
        neighborhood: formData.neighborhood,
        subject: formData.subject,
        message: formData.message,
        wasVictim: formData.wasVictim === "yes",
        crimeTypes: selectedCrimes,
        theft: formData.crimeTypes.theft,
        robbery: formData.crimeTypes.robbery,
        aggression: formData.crimeTypes.aggression,
        domesticViolence: formData.crimeTypes.domesticViolence,
        rape: formData.crimeTypes.rape,
        Coruption: formData.crimeTypes.Coruption,
        fraud: formData.crimeTypes.fraud,
        trafic: formData.crimeTypes.trafic,
        otherCrime: formData.crimeTypes.otherCrime || null,
      };

      // Send to Formspree for email notification
      const formspreeResponse = await fetch("https://formspree.io/f/xdakqako", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (!formspreeResponse.ok) {
        const errorData = await formspreeResponse.json();
        throw new Error(
          errorData.message || "Failed to send report via Formspree."
        );
      }

      // Send to local API for database storage
      const apiResponse = await fetch("/api/reports", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (!apiResponse.ok) {
        const errorData = await apiResponse.json();
        throw new Error(
          errorData.message || "Failed to save report to database."
        );
      }

      // Reset form
      setFormData({
        name: "",
        email: "",
        age: "",
        gender: "",
        occupation: "",
        educationLevel: "",
        residenceTime: "",
        neighborhood: "",
        subject: "",
        message: "",
        wasVictim: "",
        crimeTypes: {
          theft: false,
          robbery: false,
          aggression: false,
          domesticViolence: false,
          rape: false,
          Coruption: false,
          fraud: false,
          trafic: false,
          otherCrime: "",
        },
      });

      setIsOpen(false);
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Error sending report:", error);
      setStatus("error");
    }
  };



  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Enviar Reporte</DialogTitle>
            <DialogDescription>
              Preencha os campos abaixo para enviar sua denúncia ou informação.
              Você pode permanecer anônimo se preferir, deixando os campos de
              nome e e-mail em branco.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Seção 1: Dados da Pessoa */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg border-b pb-2">
                🔹 Dados da Pessoa
              </h3>

              <div className="space-y-2">
                <Label htmlFor="name">Nome (Opcional)</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Seu nome completo"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="age">Idade</Label>
                  <Input
                    id="age"
                    type="number"
                    min="0"
                    max="120"
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="Ex: 25"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gender">Género</Label>
                  <Select value={formData.gender} onValueChange={(value) => handleSelectChange("gender", value)}>
                    <SelectTrigger id="gender">
                      <SelectValue placeholder="Selecione..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="masculino">Masculino</SelectItem>
                      <SelectItem value="feminino">Feminino</SelectItem>
                      <SelectItem value="outro">Outro</SelectItem>
                      <SelectItem value="prefiro_nao_informar">Prefiro não informar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="occupation">Ocupação</Label>
                  <Input
                    id="occupation"
                    value={formData.occupation}
                    onChange={handleChange}
                    placeholder="Ex: Engenheiro, Estudante"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="educationLevel">Escolaridade</Label>
                  <Select value={formData.educationLevel} onValueChange={(value) => handleSelectChange("educationLevel", value)}>
                    <SelectTrigger id="educationLevel">
                      <SelectValue placeholder="Selecione..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sem_escolaridade">Sem escolaridade</SelectItem>
                      <SelectItem value="ensino_primario">Ensino primário</SelectItem>
                      <SelectItem value="ensino_secundario">Ensino secundário</SelectItem>
                      <SelectItem value="ensino_medio">Ensino médio</SelectItem>
                      <SelectItem value="ensino_superior">Ensino superior</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="residenceTime">Tempo de residência no bairro</Label>
                  <Select value={formData.residenceTime} onValueChange={(value) => handleSelectChange("residenceTime", value)}>
                    <SelectTrigger id="residenceTime">
                      <SelectValue placeholder="Selecione..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="menos_6_meses">Menos de 6 meses</SelectItem>
                      <SelectItem value="6_meses_1_ano">6 meses - 1 ano</SelectItem>
                      <SelectItem value="1_3_anos">1 - 3 anos</SelectItem>
                      <SelectItem value="3_5_anos">3 - 5 anos</SelectItem>
                      <SelectItem value="mais_5_anos">Mais de 5 anos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="neighborhood">Bairro</Label>
                  <Input
                    id="neighborhood"
                    value={formData.neighborhood}
                    onChange={handleChange}
                    placeholder="Ex: Cidade Alta, Praia do Bispo"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email (Opcional)</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="seu@email.com"
                />
              </div>
            </div>

            {/* Seção 2: Dados da Ocorrência */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg border-b pb-2">
                🔹 Dados da Ocorrência
              </h3>

              <div className="space-y-2">
                <Label htmlFor="wasVictim">Foi vítima?</Label>
                <Select value={formData.wasVictim} onValueChange={(value) => handleSelectChange("wasVictim", value)}>
                  <SelectTrigger id="wasVictim">
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Sim</SelectItem>
                    <SelectItem value="no">Não</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label>Tipo de crime (marcação múltipla)</Label>
                <div className="grid grid-cols-2 gap-3 pl-2">
                  {[
                    { id: "theft", label: "Furto/Roubo" },
                    { id: "aggression", label: "Agressão Física" },
                    { id: "Coruption", label: "Corrupção" },
                    { id: "domesticViolence", label: "Violência doméstica" },
                    { id: "rape", label: "Abuso Sexual" },
                    { id: "fraud", label: "Burla" },
                    { id: "trafic", label: "Tráfico de Droga" },
                  ].map((crime) => (
                    <div key={crime.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={crime.id}
                        checked={formData.crimeTypes[crime.id as keyof typeof formData.crimeTypes] as boolean}
                        onCheckedChange={() => handleCrimeTypeChange(crime.id as keyof typeof formData.crimeTypes)}
                      />
                      <label
                        htmlFor={crime.id}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        {crime.label}
                      </label>
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="otherCrime">Outro (especifique)</Label>
                  <Input
                    id="otherCrime"
                    value={formData.crimeTypes.otherCrime}
                    onChange={handleOtherCrimeChange}
                    placeholder="Descreva outro tipo de crime"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Assunto</Label>
                <Input
                  id="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="Breve resumo do incidente"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Detalhes da Ocorrência</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Descreva em detalhes o que aconteceu (Horário, O Autor do Crime, Arma de fogo, Arma branca , outros)..."
                  className="min-h-[100px]"
                />
              </div>
            </div>

            <Button type="submit" disabled={status === "loading"} className="w-full">
              {status === "loading" ? "Enviando..." : "Enviar Reporte"}
            </Button>

            {status === "error" && (
              <p className="text-red-500 text-sm mt-2">
                Erro ao enviar denúncia. Tente novamente.
              </p>
            )}
          </form>
        </DialogContent>
      </Dialog>

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="Sucesso!"
        message="Mensagem enviada com sucesso! Responderemos dentro em breve."
      />
    </>
  );
};

export default ReportModal;
