import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { sendEmail, getWelcomeEmailHTML } from "@/lib/email";

// Função para calcular a força da senha
const getPasswordStrength = (password: string): { score: number; level: string } => {
  let score = 0;
  
  if (!password) return { score: 0, level: "Fraca" };
  
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (password.length >= 16) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) score++;
  
  if (score <= 2) {
    return { score, level: "Fraca" };
  } else if (score <= 4) {
    return { score, level: "Normal" };
  } else {
    return { score, level: "Forte" };
  }
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password, role } = body;

    if (!name || !email || !password) {
      return NextResponse.json({ message: "Dados incompletos" }, { status: 400 });
    }

    // Validar força da senha
    const passwordStrength = getPasswordStrength(password);
    if (passwordStrength.level === "Fraca") {
      return NextResponse.json(
        { message: "A senha é muito fraca. Deve conter pelo menos 8 caracteres com maiúsculas, minúsculas, números e caracteres especiais." },
        { status: 400 }
      );
    }

    // Verificar se o email já existe
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ message: "Este e-mail já está registado" }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role || "RESEARCHER",
      },
    });

    // Enviar email de boas-vindas
    try {
      await sendEmail({
        to: email,
        subject: "Bem-vindo ao Sistema - Sua conta foi criada",
        html: getWelcomeEmailHTML(name, role || "RESEARCHER"),
      });
    } catch (emailError) {
      console.error("Erro no envio do email:", emailError);
    }

    return NextResponse.json(
      {
        message: "Utilizador registado com sucesso",
        user: { id: user.id, name: user.name, email: user.email, role: user.role },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ message: "Erro interno no servidor" }, { status: 500 });
  }
}
