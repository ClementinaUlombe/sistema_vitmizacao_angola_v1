"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import SuccessModal from "@/components/SuccessModal";

interface DenunciaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DenunciaModal: React.FC<DenunciaModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const formspreeResponse = await fetch("https://formspree.io/f/xdakqako", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!formspreeResponse.ok) {
        const errorData = await formspreeResponse.json();
        throw new Error(
          errorData.message || "Failed to send report via Formspree."
        );
      }

      const apiResponse = await fetch("/api/reports", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!apiResponse.ok) {
        const errorData = await apiResponse.json();
        throw new Error(
          errorData.message || "Failed to save report to database."
        );
      }

      setFormData({ name: "", email: "", subject: "", message: "" });
      onClose();
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Error sending report:", error);
      setStatus("error");
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Enviar Denúncia</DialogTitle>
            <DialogDescription>
              Preencha os campos abaixo para enviar sua denúncia ou informação.
              Você pode permanecer anônimo se preferir, deixando os campos de
              nome e e-mail em branco.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nome (Opcional)
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email (Opcional)
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="subject" className="text-right">
                Assunto
              </Label>
              <Input
                id="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="message" className="text-right">
                Mensagem
              </Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={handleChange}
                required
                className="col-span-3 min-h-[100px]"
              />
            </div>
            <Button type="submit" disabled={status === "loading"}>
              {status === "loading" ? "Enviando..." : "Enviar Denúncia"}
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

export default DenunciaModal;
