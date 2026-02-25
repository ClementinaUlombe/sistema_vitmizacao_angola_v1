"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useRouter } from "next/navigation";
import SuccessModal from "@/components/SuccessModal"; 
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("RESEARCHER");
  const [error, setError] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("As senhas não coincidem");
      return;
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage(data.message || "Conta criada com sucesso!");
        setShowSuccessModal(true);
      } else {
        setError(data.message || "Erro ao criar conta.");
      }
    } catch (err) {
      setError("Erro ao conectar com o servidor.");
    }
  };

  const handleSuccessModalConfirm = () => {
    setShowSuccessModal(false);
    router.push("/auth/login");
  };

  return (
    <Card className="w-full max-w-lg shadow-2xl border-t-4 border-primary bg-card/95 backdrop-blur-sm">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-3xl font-bold text-primary">Criar Nova Conta</CardTitle>
        <CardDescription className="text-base">
          Preencha os dados abaixo para se registar
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-semibold">Nome Completo</Label>
            <Input
              id="name"
              type="text"
              placeholder="Ex: João Silva"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="h-12 border-muted-foreground/20"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-semibold">E-mail</Label>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-12 border-muted-foreground/20"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role" className="text-sm font-semibold">Perfil de Acesso</Label>
            <Select onValueChange={(value) => setRole(value)} defaultValue={role}>
              <SelectTrigger className="h-12 border-muted-foreground/20">
                <SelectValue placeholder="Selecione o perfil" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ADMIN">Administrador (Gestão Total)</SelectItem>
                <SelectItem value="RESEARCHER">Investigador (Análise de Dados)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="password" name="Senha" className="text-sm font-semibold">Senha</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-12 border-muted-foreground/20"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password" name="Confirmar Senha" className="text-sm font-semibold">Confirmar Senha</Label>
              <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="h-12 border-muted-foreground/20"
              />
            </div>
          </div>
          
          {error && (
            <div className="p-3 rounded-md bg-destructive/10 border border-destructive/20">
              <p className="text-destructive text-sm text-center font-medium">{error}</p>
            </div>
          )}

          <Button type="submit" className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 text-lg font-bold shadow-lg mt-4">
            Registar Agora
          </Button>
        </form>
        
        <div className="mt-8 text-center border-t pt-6">
          <p className="text-sm text-muted-foreground">
            Já tem uma conta?{" "}
            <Link href="/auth/login" className="text-primary hover:underline font-bold">
              Fazer Login
            </Link>
          </p>
        </div>
      </CardContent>

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="Sucesso!"
        message={successMessage}
        onConfirm={handleSuccessModalConfirm}
        confirmText="Ir para Login"
      />
    </Card>
  );
}
