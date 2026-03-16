import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (id) {
      const resident = await prisma.resident.findUnique({
        where: { id: parseInt(id) },
        include: {
          victimizations: true,
          securityPerceptions: true,
        },
      });
      return NextResponse.json(resident);
    }

    const residents = await prisma.resident.findMany({
      include: {
        victimizations: true,
        securityPerceptions: true,
      },
      orderBy: { id: "desc" },
    });
    return NextResponse.json(residents);
  } catch (error) {
    console.error("Error fetching residents:", error);
    return NextResponse.json(
      { message: "Erro ao procurar lançamentos" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, neighborhood, ageGroup, gender } = body;

    if (!id) {
      return NextResponse.json(
        { message: "ID é obrigatório" },
        { status: 400 }
      );
    }

    const updatedResident = await prisma.resident.update({
      where: { id: parseInt(id) },
      data: {
        ...(neighborhood && { neighborhood }),
        ...(ageGroup && { ageGroup }),
        ...(gender && { gender }),
      },
      include: {
        victimizations: true,
        securityPerceptions: true,
      },
    });

    return NextResponse.json(updatedResident);
  } catch (error) {
    console.error("Error updating resident:", error);
    return NextResponse.json(
      { message: "Erro ao atualizar lançamento" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { message: "ID é obrigatório" },
        { status: 400 }
      );
    }

    await prisma.resident.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ message: "Lançamento eliminado com sucesso" });
  } catch (error) {
    console.error("Error deleting resident:", error);
    return NextResponse.json(
      { message: "Erro ao eliminar lançamento" },
      { status: 500 }
    );
  }
}
