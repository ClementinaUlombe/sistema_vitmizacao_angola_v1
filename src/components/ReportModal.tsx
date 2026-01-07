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

interface ReportModalProps {
  children: React.ReactNode;
}

const ReportModal: React.FC<ReportModalProps> = ({ children }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("https://formspree.io/f/xdakqako", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" }); // Clear form
        setIsOpen(false); // Close modal on success
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to send report.");
      }
    } catch (error) {
      console.error("Error sending report:", error);
      setStatus("error");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
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
          {status === "success" && (
            <p className="text-green-500 text-sm mt-2">
              Denúncia enviada com sucesso!
            </p>
          )}
          {status === "error" && (
            <p className="text-red-500 text-sm mt-2">
              Erro ao enviar denúncia. Tente novamente.
            </p>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ReportModal;
