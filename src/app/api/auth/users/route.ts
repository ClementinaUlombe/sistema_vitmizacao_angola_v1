import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        image: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ message: "Erro ao procurar utilizadores" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, name, email, image, action } = body;

    if (!id) {
      return NextResponse.json({ message: "ID do utilizador é obrigatório" }, { status: 400 });
    }

    // Se estiver a atualizar o e-mail, verificar se já existe noutro utilizador
    if (email) {
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser && existingUser.id !== id) {
        return NextResponse.json({ message: "Este e-mail já está em uso" }, { status: 409 });
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(email && { email }),
        ...(image !== undefined && { image }), // Permite limpar a imagem se vier null
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        image: true,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json({ message: "Erro ao atualizar perfil" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    await prisma.user.delete({ where: { id } });
    return NextResponse.json({ message: "Utilizador apagado" });
  } catch (error) {
    return NextResponse.json({ message: "Erro ao apagar utilizador" }, { status: 500 });
  }
}
