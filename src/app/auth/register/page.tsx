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

// Função para calcular a força da senha
const getPasswordStrength = (password: string): { score: number; level: string; color: string } => {
  let score = 0;
  
  if (!password) return { score: 0, level: "", color: "" };
  
  // Comprimento mínimo
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (password.length >= 16) score++;
  
  // Maiúsculas
  if (/[A-Z]/.test(password)) score++;
  
  // Minúsculas
  if (/[a-z]/.test(password)) score++;
  
  // Números
  if (/\d/.test(password)) score++;
  
  // Caracteres especiais
  if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) score++;
  
  if (score <= 2) {
    return { score, level: "Fraca", color: "bg-red-500" };
  } else if (score <= 4) {
    return { score, level: "Normal", color: "bg-orange-500" };
  } else {
    return { score, level: "Forte", color: "bg-green-500" };
  }
};

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
  const passwordStrength = getPasswordStrength(password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validar força da senha
    if (passwordStrength.level === "Fraca") {
      setError("A senha é muito fraca. Deve conter pelo menos 8 caracteres com maiúsculas, minúsculas, números e caracteres especiais.");
      return;
    }

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
                <SelectItem value="POLICE">Autoridade Policial (Gestão de Ocorrências)</SelectItem>
                <SelectItem value="CITIZEN">Cidadão (Denúncias e Apoio)</SelectItem>
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
              
              {password && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-muted-foreground">Força da Senha:</span>
                    <span className={`text-xs font-bold ${
                      passwordStrength.level === "Fraca" ? "text-red-500" :
                      passwordStrength.level === "Normal" ? "text-orange-500" :
                      "text-green-500"
                    }`}>
                      {passwordStrength.level}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${passwordStrength.color}`}
                      style={{ width: `${(passwordStrength.score / 7) * 100}%` }}
                    ></div>
                  </div>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li className={password.length >= 8 ? "text-green-600 font-semibold" : ""}>
                      {password.length >= 8 ? "✓" : "○"} Mínimo 8 caracteres
                    </li>
                    <li className={/[A-Z]/.test(password) ? "text-green-600 font-semibold" : ""}>
                      {/[A-Z]/.test(password) ? "✓" : "○"} Contém maiúsculas
                    </li>
                    <li className={/[a-z]/.test(password) ? "text-green-600 font-semibold" : ""}>
                      {/[a-z]/.test(password) ? "✓" : "○"} Contém minúsculas
                    </li>
                    <li className={/\d/.test(password) ? "text-green-600 font-semibold" : ""}>
                      {/\d/.test(password) ? "✓" : "○"} Contém números
                    </li>
                    <li className={/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password) ? "text-green-600 font-semibold" : ""}>
                      {/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password) ? "✓" : "○"} Contém caracteres especiais
                    </li>
                  </ul>
                </div>
              )}
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
              
              {confirmPassword && password !== confirmPassword && (
                <p className="text-xs text-red-500 font-semibold">✗ As senhas não coincidem</p>
              )}
              
              {confirmPassword && password === confirmPassword && (
                <p className="text-xs text-green-600 font-semibold">✓ As senhas coincidem</p>
              )}
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
