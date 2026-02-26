import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    const reports = await prisma.report.findMany({
      where: userId ? { userId: parseInt(userId) } : {}, // Se houver userId, filtra as denúncias desse utilizador
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(reports);
  } catch (error) {
    return NextResponse.json({ message: "Erro ao procurar denúncias" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const report = await prisma.report.create({
      data: {
        ...body,
        userId: body.userId ? parseInt(body.userId) : null,
      },
    });
    return NextResponse.json(report, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar relato:", error);
    return NextResponse.json({ message: "Erro ao criar relato" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { id, status, read } = await request.json();
    const updated = await prisma.report.update({
      where: { id },
      data: {
        ...(status && { status }),
        ...(read !== undefined && { read }),
      },
    });
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ message: "Erro ao atualizar estado" }, { status: 500 });
  }
}
