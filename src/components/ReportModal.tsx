"use client";

import React, { useState, useEffect } from "react";
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
  children?: React.ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  readOnly?: boolean;
  report?: any;
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

const ReportModal: React.FC<ReportModalProps> = ({ children, isOpen: externalOpen, onClose, readOnly = false, report }) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = externalOpen !== undefined ? externalOpen : internalOpen;
  
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

  // Preencher dados se o utilizador estiver logado ou se for modo visualização
  useEffect(() => {
    if (isOpen) {
      if (readOnly && report) {
        setFormData({
          name: report.name || "",
          email: report.email || "",
          age: report.age?.toString() || "",
          gender: report.gender || "",
          occupation: report.occupation || "",
          educationLevel: report.educationLevel || "",
          residenceTime: report.residenceTime || "",
          neighborhood: report.neighborhood || "",
          subject: report.subject || "",
          message: report.message || "",
          wasVictim: report.wasVictim ? "yes" : "no",
          crimeTypes: {
            theft: !!report.theft,
            robbery: !!report.robbery,
            aggression: !!report.aggression,
            domesticViolence: !!report.domesticViolence,
            rape: !!report.rape,
            Coruption: false,
            fraud: !!report.fraud,
            trafic: false,
            otherCrime: report.otherCrime || "",
          },
        });
      } else {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const user = JSON.parse(storedUser);
          setFormData(prev => ({
            ...prev,
            name: user.name || "",
            email: user.email || "",
          }));
        }
      }
    }
  }, [isOpen, readOnly, report]);

  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      if (onClose) onClose();
      else setInternalOpen(false);
    } else {
      if (externalOpen === undefined) setInternalOpen(true);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (readOnly) return;
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSelectChange = (field: string, value: string) => {
    if (readOnly) return;
    setFormData({ ...formData, [field]: value });
  };

  const handleCrimeTypeChange = (crimeType: keyof typeof formData.crimeTypes) => {
    if (readOnly) return;
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
    if (readOnly) return;
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
    if (readOnly) {
      handleOpenChange(false);
      return;
    }
    setStatus("loading");

    try {
      const selectedCrimes = Object.entries(formData.crimeTypes)
        .filter(([key, value]) => key !== "otherCrime" && value === true)
        .map(([key]) => key);

      const storedUser = localStorage.getItem("user");
      const user = storedUser ? JSON.parse(storedUser) : null;

      const dataToSend = {
        userId: user?.id || null,
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
        crimeTypes: selectedCrimes.join(", "),
        theft: formData.crimeTypes.theft,
        robbery: formData.crimeTypes.robbery,
        aggression: formData.crimeTypes.aggression,
        domesticViolence: formData.crimeTypes.domesticViolence,
        rape: formData.crimeTypes.rape,
        fraud: formData.crimeTypes.fraud,
        otherCrime: formData.crimeTypes.otherCrime || null,
      };

      const apiResponse = await fetch("/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });

      if (!apiResponse.ok) throw new Error("Erro ao salvar no banco de dados.");

      setFormData({
        name: "", email: "", age: "", gender: "", occupation: "",
        educationLevel: "", residenceTime: "", neighborhood: "",
        subject: "", message: "", wasVictim: "",
        crimeTypes: {
          theft: false, robbery: false, aggression: false,
          domesticViolence: false, rape: false, Coruption: false,
          fraud: false, trafic: false, otherCrime: "",
        },
      });

      handleOpenChange(false);
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Error:", error);
      setStatus("error");
    } finally {
      setStatus("idle");
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        {children && <DialogTrigger asChild>{children}</DialogTrigger>}
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Reporte de Crime</DialogTitle>
            <DialogDescription>
              Preencha o formulário oficial de denúncia. Seus dados serão tratados pela polícia com total sigilo.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg border-b pb-2">🔹 Dados da Pessoa</h3>
              <div className="space-y-2">
                <Label htmlFor="name">Nome (Opcional)</Label>
                <Input id="name" value={formData.name} onChange={handleChange} placeholder="Seu nome completo" disabled={readOnly} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="age">Idade</Label>
                  <Input id="age" type="number" value={formData.age} onChange={handleChange} placeholder="Ex: 25" disabled={readOnly} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Género</Label>
                  <Select value={formData.gender} onValueChange={(v) => handleSelectChange("gender", v)} disabled={readOnly}>
                    <SelectTrigger><SelectValue placeholder="Selecione..." /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="masculino">Masculino</SelectItem>
                      <SelectItem value="feminino">Feminino</SelectItem>
                      <SelectItem value="outro">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="occupation">Ocupação</Label>
                  <Input id="occupation" value={formData.occupation} onChange={handleChange} placeholder="Ex: Engenheiro" disabled={readOnly} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="neighborhood">Bairro</Label>
                  <Input id="neighborhood" value={formData.neighborhood} onChange={handleChange} placeholder="Ex: Samba" disabled={readOnly} />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg border-b pb-2">🔹 Dados da Ocorrência</h3>
              <div className="space-y-2">
                <Label>Tipo de crime (marcação múltipla)</Label>
                <div className="grid grid-cols-2 gap-3 pl-2">
                  {[
                    { id: "theft", label: "Furto/Roubo" },
                    { id: "aggression", label: "Agressão Física" },
                    { id: "domesticViolence", label: "Violência doméstica" },
                    { id: "rape", label: "Abuso Sexual" },
                    { id: "fraud", label: "Burla" },
                  ].map((crime) => (
                    <div key={crime.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={crime.id}
                        checked={formData.crimeTypes[crime.id as keyof typeof formData.crimeTypes] as boolean}
                        onCheckedChange={() => handleCrimeTypeChange(crime.id as keyof typeof formData.crimeTypes)}
                        disabled={readOnly}
                      />
                      <label htmlFor={crime.id} className={`text-sm cursor-pointer ${readOnly ? 'opacity-70' : ''}`}>{crime.label}</label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Assunto</Label>
                <Input id="subject" value={formData.subject} onChange={handleChange} required placeholder="Resumo do incidente" disabled={readOnly} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Detalhes da Ocorrência</Label>
                <Textarea id="message" value={formData.message} onChange={handleChange} required placeholder="Descreva o que aconteceu..." className="min-h-[100px]" disabled={readOnly} />
              </div>
            </div>

            {!readOnly && (
              <Button type="submit" disabled={status === "loading"} className="w-full">
                {status === "loading" ? "Enviando..." : "Enviar Reporte Oficial"}
              </Button>
            )}
            {readOnly && (
              <Button type="button" onClick={() => handleOpenChange(false)} className="w-full">
                Fechar Visualização
              </Button>
            )}
          </form>
        </DialogContent>
      </Dialog>

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="Reporte Enviado!"
        message="A sua denúncia foi registada e encaminhada para a Polícia do Município de Samba."
      />
    </>
  );
};

export default ReportModal;
