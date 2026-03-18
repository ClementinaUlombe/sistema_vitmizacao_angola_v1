"use client";

import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Trash2, Edit2, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import SuccessModal from "@/components/SuccessModal";

interface User {
  id: number;
  name: string | null;
  email: string;
  role: string;
  image: string | null;
  createdAt: string;
}

interface FormData {
  id?: number;
  name: string;
  email: string;
  password?: string;
  role: string;
}

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    role: "RESEARCHER",
  });
  const [submitting, setSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successTitle, setSuccessTitle] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/auth/users");
      if (!response.ok) {
        throw new Error("Falha ao carregar utilizadores");
      }
      const data = await response.json();
      setUsers(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (user?: User) => {
    if (user) {
      setIsEditMode(true);
      setFormData({
        id: user.id,
        name: user.name || "",
        email: user.email,
        role: user.role,
      });
    } else {
      setIsEditMode(false);
      setFormData({
        name: "",
        email: "",
        password: "",
        role: "RESEARCHER",
      });
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setFormData({ name: "", email: "", password: "", role: "RESEARCHER" });
    setCurrentPage(1); // Reset pagination when closing dialog
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const method = isEditMode ? "PUT" : "POST";
      
      const payload = isEditMode
        ? {
            id: formData.id,
            name: formData.name,
            email: formData.email,
            role: formData.role
          }
        : {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            role: formData.role
          };

      const response = await fetch("/api/auth/register", {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Falha ao guardar utilizador");
      }

      await fetchUsers();
      handleCloseDialog();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch("/api/auth/register", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error("Falha ao eliminar utilizador");
      }

      await fetchUsers();
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <p>Carregando utilizadores...</p>
      </div>
    );
  }

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(users.length / itemsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gerir Utilizadores</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => handleOpenDialog()} className="gap-2">
              <Plus size={18} />
              Novo Utilizador
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {isEditMode ? "Editar Utilizador" : "Criar Novo Utilizador"}
              </DialogTitle>
              <DialogDescription>
                {isEditMode
                  ? "Atualize as informações do utilizador"
                  : "Preencha os campos para criar um novo utilizador"}
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome (Opcional)</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Nome completo"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="email@exemplo.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Perfil de Acesso</Label>
                <select
                  id="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  required
                >
                  <option value="ADMIN">Administrador</option>
                  <option value="RESEARCHER">Investigador</option>
                  <option value="POLICE">Polícia</option>
                  <option value="CITIZEN">Cidadão</option>
                </select>
              </div>

              {!isEditMode && (
                <div className="space-y-2">
                  <Label htmlFor="password">Senha</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password || ""}
                    onChange={handleInputChange}
                    placeholder="Inserir senha"
                    required
                  />
                </div>
              )}

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <div className="flex justify-end gap-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCloseDialog}
                >
                  Cancelar
                </Button>
                <Button type="submit" disabled={submitting}>
                  {submitting
                    ? "Guardando..."
                    : isEditMode
                    ? "Atualizar"
                    : "Criar"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {error && !isDialogOpen && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-4">
          <p className="text-red-600 dark:text-red-400">{error}</p>
          <Button
            variant="outline"
            size="sm"
            onClick={fetchUsers}
            className="mt-2"
          >
            Tentar Novamente
          </Button>
        </div>
      )}

      {users.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">
            Nenhum utilizador encontrado
          </p>
          <Button onClick={() => handleOpenDialog()}>
            Criar Primeiro Utilizador
          </Button>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[150px]">Nome</TableHead>
                  <TableHead className="min-w-[200px]">Email</TableHead>
                  <TableHead className="min-w-[120px]">Perfil</TableHead>
                  <TableHead className="min-w-[180px]">Data de Criação</TableHead>
                  <TableHead className="w-[100px] text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">
                      {user.name || "Sem nome"}
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                        user.role === "ADMIN" ? "bg-red-100 text-red-800" :
                        user.role === "RESEARCHER" ? "bg-blue-100 text-blue-800" :
                        user.role === "POLICE" ? "bg-yellow-100 text-yellow-800" :
                        "bg-gray-100 text-gray-800"
                      }`}>
                        {user.role === "ADMIN" ? "Administrador" :
                         user.role === "RESEARCHER" ? "Investigador" :
                         user.role === "POLICE" ? "Polícia" :
                         "Cidadão"}
                      </span>
                    </TableCell>
                    <TableCell>
                      {format(new Date(user.createdAt), "dd/MM/yyyy HH:mm", {
                        locale: ptBR,
                      })}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleOpenDialog(user)}
                          className="gap-1"
                        >
                          <Edit2 size={16} />
                          Editar
                        </Button>

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="destructive"
                              size="sm"
                              className="gap-1"
                            >
                              <Trash2 size={16} />
                              Eliminar
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Confirmar eliminação
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Tem a certeza que deseja eliminar o utilizador{" "}
                                <strong>{user.email}</strong>? Esta ação não pode
                                ser desfeita.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <div className="flex justify-end gap-2">
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(user.id)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Eliminar
                              </AlertDialogAction>
                            </div>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="border-t p-4 flex items-center justify-between">
              <div className="text-xs text-muted-foreground">
                Mostrando {indexOfFirstItem + 1} a {Math.min(indexOfLastItem, users.length)} de {users.length} utilizadores
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="h-8 w-8 p-0"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                
                <div className="flex items-center gap-1">
                  {[...Array(totalPages)].map((_, i) => {
                    const pageNumber = i + 1;
                    if (
                      pageNumber === 1 || 
                      pageNumber === totalPages || 
                      (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                    ) {
                      return (
                        <Button
                          key={pageNumber}
                          variant={currentPage === pageNumber ? "default" : "outline"}
                          size="sm"
                          onClick={() => paginate(pageNumber)}
                          className="h-8 w-8 p-0"
                        >
                          {pageNumber}
                        </Button>
                      );
                    } else if (
                      pageNumber === currentPage - 2 || 
                      pageNumber === currentPage + 2
                    ) {
                      return <span key={pageNumber} className="text-muted-foreground">...</span>;
                    }
                    return null;
                  })}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="h-8 w-8 p-0"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default UsersPage;
