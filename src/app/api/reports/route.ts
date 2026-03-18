import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    const reports = await prisma.report.findMany({
      where: userId ? { userId: parseInt(userId) } : {}, 
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

    // Notify POLICE
    const policeUsers = await prisma.user.findMany({
      where: { role: "POLICE" }
    });

    for (const police of policeUsers) {
      await prisma.notification.create({
        data: {
          userId: police.id,
          type: "CITIZEN_REPORT",
          title: "Novo Relato de Crime",
          message: `Um cidadão enviou um novo relato: ${report.subject}`,
          link: "/dashboard/occurrences"
        }
      });
    }

    return NextResponse.json(report, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar relato:", error);
    return NextResponse.json({ message: "Erro ao criar relato" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { id, status, read } = await request.json();
    const oldReport = await prisma.report.findUnique({ where: { id } });
    
    const updated = await prisma.report.update({
      where: { id },
      data: {
        ...(status && { status }),
        ...(read !== undefined && { read }),
      },
    });

    // Notify CITIZEN if status changed to Validado
    if (status === "Validado" && updated.userId && oldReport?.status !== "Validado") {
      await prisma.notification.create({
        data: {
          userId: updated.userId,
          type: "POLICE_VALIDATION",
          title: "Relato Validado",
          message: `O seu relato "${updated.subject}" foi validado pela polícia.`,
          link: "/dashboard/occurrences"
        }
      });
    }

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Erro ao atualizar estado:", error);
    return NextResponse.json({ message: "Erro ao atualizar estado" }, { status: 500 });
  }
}
