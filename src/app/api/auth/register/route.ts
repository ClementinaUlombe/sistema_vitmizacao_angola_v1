import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { sendEmail, getWelcomeEmailHTML } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password, role } = body;

    if (!name || !email || !password) {
      return NextResponse.json({ message: "Dados incompletos" }, { status: 400 });
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
