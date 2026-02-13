"use client";

import React, { useState } from "react";
import { useTheme } from "next-themes";
import clsx from "clsx";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import SuccessModal from "@/components/SuccessModal";
import { User, Mail, Book, MessageSquare, Loader2, ShieldCheck, AlertTriangle } from "lucide-react";

interface DenunciaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DenunciaModal: React.FC<DenunciaModalProps> = ({ isOpen, onClose }) => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [step, setStep] = useState<"form" | "confirmation">("form");
  const [errors, setErrors] = useState<{ subject?: string; message?: string }>({});

  const validate = () => {
    const newErrors: { subject?: string; message?: string } = {};
    if (!formData.subject.trim()) {
      newErrors.subject = "O assunto é obrigatório.";
    }
    if (!formData.message.trim()) {
      newErrors.message = "A mensagem é obrigatória.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      setStep("confirmation");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const formspreeResponse = await fetch("https://formspree.io/f/xdakqako", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!formspreeResponse.ok) {
        throw new Error("Failed to send report via Formspree.");
      }

      const apiResponse = await fetch("/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!apiResponse.ok) {
        throw new Error("Failed to save report to database.");
      }

      setFormData({ name: "", email: "", subject: "", message: "" });
      setStep("form");
      onClose();
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Error sending report:", error);
      setStatus("error");
    } finally {
      setStatus("idle");
    }
  };

  const dialogContentClasses = clsx(
    "sm:max-w-md p-8 rounded-xl shadow-2xl border-purple-500/20 transition-all duration-300",
    {
      "bg-gradient-to-br from-gray-900 to-gray-800 text-white": theme === "dark",
      "bg-gradient-to-br from-white to-gray-50 text-gray-800": theme === "light",
    }
  );

  const inputClasses = clsx(
    "pl-12 h-14 rounded-lg focus:ring-purple-500 focus:border-purple-500 transition-colors",
    {
      "bg-gray-800 border-gray-700": theme === "dark",
      "bg-gray-100 border-gray-200": theme === "light",
    }
  );

  const textareaClasses = clsx(
    "pl-12 pt-4 min-h-[140px] rounded-lg focus:ring-purple-500 focus:border-purple-500 transition-colors",
    {
      "bg-gray-800 border-gray-700": theme === "dark",
      "bg-gray-100 border-gray-200": theme === "light",
    }
  );

  return (
    <>
      <Dialog open={isOpen} onOpenChange={(open) => {
        if (!open) {
          onClose();
          setStep("form");
          setErrors({});
        }
      }}>
        <DialogContent className={dialogContentClasses}>
          {step === "form" && (
            <>
              <DialogHeader className="text-center mb-6">
                <DialogTitle className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                  Formulário de Denúncia
                </DialogTitle>
                <DialogDescription className={clsx("mt-2", {"text-gray-400": theme === "dark", "text-gray-500": theme === "light"})}>
                  Sua voz é importante. Envie sua denúncia de forma segura.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                  <Input id="name" placeholder="Nome (Opcional)" value={formData.name} onChange={handleChange} className={inputClasses} />
                </div>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                  <Input id="email" type="email" placeholder="Email (Opcional)" value={formData.email} onChange={handleChange} className={inputClasses} />
                </div>
                <div className="relative">
                  <Book className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                  <Input id="subject" placeholder="Assunto da Denúncia" value={formData.subject} onChange={handleChange} required className={clsx(inputClasses, {'border-red-500': errors.subject})} />
                  {errors.subject && <p className="text-red-500 text-xs mt-1 ml-2">{errors.subject}</p>}
                </div>
                <div className="relative">
                  <MessageSquare className="absolute left-4 top-5 h-5 w-5 text-gray-500" />
                  <Textarea id="message" placeholder="Descreva a sua denúncia em detalhes..." value={formData.message} onChange={handleChange} required className={clsx(textareaClasses, {'border-red-500': errors.message})} />
                  {errors.message && <p className="text-red-500 text-xs mt-1 ml-2">{errors.message}</p>}
                </div>
                <Button onClick={handleNext} className="w-full h-14 text-lg font-semibold bg-purple-600 hover:bg-purple-700 transition-all duration-300 transform hover:scale-105 text-white">
                  Revisar Denúncia
                </Button>
              </div>
            </>
          )}

          {step === "confirmation" && (
            <div className="animate-fade-in">
              <DialogHeader className="text-center mb-6">
                <DialogTitle className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">
                  Confirme Sua Denúncia
                </DialogTitle>
                <DialogDescription className={clsx("mt-2", {"text-gray-400": theme === "dark", "text-gray-500": theme === "light"})}>
                  Por favor, revise os dados antes de enviar.
                </DialogDescription>
              </DialogHeader>
              <div className={clsx("space-y-4 text-sm p-6 rounded-lg border", {"bg-gray-800/50 border-gray-700": theme === "dark", "bg-gray-100/50 border-gray-200": theme === "light"})}>
                <p><strong className={clsx({"text-gray-400": theme === "dark", "text-gray-500": theme === "light"})}>Nome:</strong> {formData.name || <i className={clsx({"text-gray-500": theme === "dark", "text-gray-400": theme === "light"})}>Anônimo</i>}</p>
                <p><strong className={clsx({"text-gray-400": theme === "dark", "text-gray-500": theme === "light"})}>Email:</strong> {formData.email || <i className={clsx({"text-gray-500": theme === "dark", "text-gray-400": theme === "light"})}>Anônimo</i>}</p>
                <p><strong className={clsx({"text-gray-400": theme === "dark", "text-gray-500": theme === "light"})}>Assunto:</strong> {formData.subject}</p>
                <p><strong className={clsx({"text-gray-400": theme === "dark", "text-gray-500": theme === "light"})}>Mensagem:</strong></p>
                <p className={clsx("whitespace-pre-wrap p-4 rounded-md", {"bg-gray-900": theme === "dark", "bg-gray-200": theme === "light"})}>{formData.message}</p>
              </div>
              {status === 'error' && <p className="text-red-400 text-sm mt-4 text-center flex items-center justify-center gap-2"><AlertTriangle size={18} /> Ocorreu um erro. Tente novamente.</p>}
              <div className="flex gap-4 mt-6">
                <Button variant="outline" onClick={() => setStep('form')} className={clsx("w-full h-12", {"border-gray-600 hover:bg-gray-700 hover:text-white": theme === "dark", "border-gray-300 hover:bg-gray-200": theme === "light"})}>
                  Voltar e Editar
                </Button>
                <Button onClick={handleSubmit} disabled={status === 'loading'} className="w-full h-12 text-lg font-semibold bg-green-600 hover:bg-green-700 transition-all duration-300 text-white">
                  {status === 'loading' ? <Loader2 className="animate-spin" /> : <ShieldCheck />}
                  <span className="ml-2">{status === 'loading' ? 'Enviando...' : 'Confirmar e Enviar'}</span>
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="Denúncia Enviada com Sucesso!"
        message="A sua denúncia foi recebida e será tratada com a máxima confidencialidade. Agradecemos a sua coragem e contribuição."
      />
    </>
  );
};

export default DenunciaModal;
