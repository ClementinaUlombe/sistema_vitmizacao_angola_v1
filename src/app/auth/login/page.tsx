"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("RESEARCHER");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        const user = data.user;
        
        // Validação extra opcional: Verificar se o role selecionado coincide com o da BD
        if (user.role.toUpperCase() !== role.toUpperCase()) {
          setError(`Este utilizador não tem permissões de ${role === "ADMIN" ? "Administrador" : "Investigador"}.`);
          return;
        }

        localStorage.setItem("user", JSON.stringify(user));
        router.push("/dashboard"); 
      } else {
        setError(data.message || "Falha no login. Verifique suas credenciais.");
      }
    } catch (err: any) {
      setError("Erro ao conectar com o servidor.");
    }
  };

  return (
    <Card className="w-full max-w-md shadow-2xl border-t-4 border-primary bg-card/95 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-center text-primary">Acesso ao Sistema</CardTitle>
        <CardDescription className="text-center text-base">
          Introduza as suas credenciais para continuar
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-semibold">E-mail</Label>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-12 border-muted-foreground/20 focus:border-primary transition-all"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role" className="text-sm font-semibold">Perfil de Acesso</Label>
            <Select onValueChange={(value) => setRole(value)} defaultValue={role}>
              <SelectTrigger className="h-12 border-muted-foreground/20 focus:border-primary transition-all">
                <SelectValue placeholder="Selecione o perfil" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ADMIN">Administrador</SelectItem>
                <SelectItem value="RESEARCHER">Investigador</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" name="Senha" className="text-sm font-semibold">Senha</Label>
              <Link href="/auth/forgot-password" size="sm" className="text-xs text-primary hover:underline font-medium">
                Esqueceu a senha?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="h-12 border-muted-foreground/20 focus:border-primary transition-all"
            />
          </div>
          
          {error && (
            <div className="p-3 rounded-md bg-destructive/10 border border-destructive/20">
              <p className="text-destructive text-sm text-center font-medium">{error}</p>
            </div>
          )}

          <Button 
            type="submit" 
            className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 text-lg font-bold shadow-lg transform transition-all active:scale-[0.98]"
          >
            Entrar no Sistema
          </Button>
        </form>
        
        <div className="mt-8 text-center border-t pt-6">
          <p className="text-sm text-muted-foreground">
            Ainda não tem uma conta?{" "}
            <Link href="/auth/register" className="text-primary hover:underline font-bold">
              Cadastre-se agora
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
