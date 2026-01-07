"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useRouter } from "next/navigation";
import SuccessModal from "@/components/SuccessModal"; // Import the new modal component
import HeroSlideshow from "@/components/HeroSlideshow";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();

  const heroImages = [
    "/apontar.gif",
    "/imagesmaos.jpeg",
    "/livro.jpeg",
    "/maocabeca.jpg",
    "/maos.jpg",
    "/nochao.jpg",
    "/telefone.webp",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store user info in localStorage
        localStorage.setItem("user", JSON.stringify(data.user));

        setSuccessMessage(data.message || "Login successful!");
        setShowSuccessModal(true);
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An unexpected error occurred");
    }
  };

  const handleSuccessModalConfirm = () => {
    setShowSuccessModal(false);
    router.push("/dashboard"); // Redirect to dashboard after successful login
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-background">
      <HeroSlideshow images={heroImages} intervalMs={5000} />
      <div className="relative z-10">
        <Card className="w-full max-w-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Entrar no Sistema</CardTitle>
            <CardDescription className="text-center">
              Digite seu e-mail e senha para acessar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid gap-2">
              <div className="grid gap-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-1">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <Link href="/auth/forgot-password" className="text-sm text-primary hover:underline text-right block">
                Esqueceu a senha?
              </Link>
              <Button type="submit" className="w-full bg-gradient-primary text-primary-foreground hover:opacity-90 transition-opacity">Entrar</Button>
            </form>
            <div className="text-center text-sm text-muted-foreground mt-2">
              Não tem uma conta?{" "}
              <Link href="/auth/register" className="text-primary hover:underline">
                Cadastre-se
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="Sucesso!"
        message={successMessage}
        onConfirm={handleSuccessModalConfirm}
        confirmText="Ir para o Painel Principal"
      />
    </div>
  );
}
