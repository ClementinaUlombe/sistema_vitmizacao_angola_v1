"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { Camera, Save, User as UserIcon, Loader2 } from "lucide-react";
import SuccessModal from "@/components/SuccessModal";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setName(userData.name || "");
      setEmail(userData.email || "");
      setImage(userData.image || "");
    }
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await fetch("/api/auth/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: user.id,
          name,
          email,
          image,
          action: "update-profile"
        }),
      });

      if (response.ok) {
        const updatedUser = { ...user, name, email, image };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setShowSuccess(true);
      } else {
        toast.error("Erro ao atualizar perfil.");
      }
    } catch (error) {
      toast.error("Erro na ligação ao servidor.");
    } finally {
      setIsSaving(false);
    }
  };

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">O Meu Perfil</h2>
        <p className="text-muted-foreground">Gerencie suas informações pessoais e foto de perfil.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Foto de Perfil */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Foto</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            <div className="relative group">
              <Avatar className="h-32 w-32 border-4 border-primary/10 transition-all group-hover:opacity-90">
                <AvatarImage src={image} />
                <AvatarFallback className="text-3xl bg-primary/5">
                  {name.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <label 
                htmlFor="photo-upload" 
                className="absolute bottom-0 right-0 p-2 bg-primary text-white rounded-full cursor-pointer shadow-lg hover:scale-110 transition-transform"
              >
                <Camera size={20} />
                <input 
                  id="photo-upload" 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleImageChange}
                />
              </label>
            </div>
            <p className="text-xs text-center text-muted-foreground">
              Clique no ícone para carregar uma nova foto.
            </p>
          </CardContent>
        </Card>

        {/* Dados Pessoais */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Informações Pessoais</CardTitle>
            <CardDescription>Estes dados serão visíveis no seu painel de controlo.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Nome Completo</Label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="name" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  className="pl-10 h-11"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input 
                id="email" 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label>Nível de Acesso</Label>
              <div className="p-3 bg-muted rounded-md text-sm font-medium uppercase tracking-wider text-muted-foreground">
                {user.role === "ADMIN" ? "Administrador" :
                 user.role === "RESEARCHER" ? "Investigador" :
                 user.role === "POLICE" ? "Polícia" :
                 user.role === "CITIZEN" ? "Cidadão" : user.role}
              </div>
            </div>

            <div className="pt-4">
              <Button 
                onClick={handleSave} 
                className="w-full md:w-auto px-8 h-11 font-bold" 
                disabled={isSaving}
              >
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    A guardar...
                  </>
                ) : (
                  <>
                    Guardar Alterações
                    <Save className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <SuccessModal
        isOpen={showSuccess}
        onClose={() => window.location.reload()}
        title="Perfil Atualizado!"
        message="As suas informações e foto de perfil foram guardadas com sucesso no sistema."
      />
    </div>
  );
}
