import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import fs from "fs";
import path from "path";

// GET /api/backup - Export all data as JSON
export async function GET() {
  try {
    const [users, residents, victimizations, securityPerceptions, reports] = await Promise.all([
      prisma.user.findMany(),
      prisma.resident.findMany(),
      prisma.victimization.findMany(),
      prisma.securityPerception.findMany(),
      prisma.report.findMany(),
    ]);

    const stats = {
      users: users.length,
      residents: residents.length,
      victimizations: victimizations.length,
      securityPerceptions: securityPerceptions.length,
      reports: reports.length,
    };

    const data = {
      users,
      residents,
      victimizations,
      securityPerceptions,
      reports,
      stats,
      exportedAt: new Date().toISOString(),
      version: "1.0",
    };

    return NextResponse.json(data);
  } catch (error) {
    console.error("Backup export error:", error);
    return NextResponse.json({ error: "Erro ao exportar dados" }, { status: 500 });
  }
}

// POST /api/backup - Import data from JSON
export async function POST(request: Request) {
  try {
    const data = await request.json();

    if (!data.users || !data.residents) {
      return NextResponse.json({ error: "Formato de backup inválido" }, { status: 400 });
    }

    // This is a simplified import that clears and re-fills.
    // In a real app, you might want to handle conflicts or just append.
    // WARNING: This clears existing data!

    await prisma.$transaction([
      prisma.report.deleteMany(),
      prisma.securityPerception.deleteMany(),
      prisma.victimization.deleteMany(),
      prisma.resident.deleteMany(),
      prisma.user.deleteMany(),
    ]);

    // Re-insert users
    if (data.users.length > 0) {
      await prisma.user.createMany({ data: data.users });
    }

    // Re-insert residents
    if (data.residents.length > 0) {
      await prisma.resident.createMany({ data: data.residents });
    }

    // Re-insert victimizations
    if (data.victimizations.length > 0) {
      await prisma.victimization.createMany({ data: data.victimizations });
    }

    // Re-insert security perceptions
    if (data.securityPerceptions.length > 0) {
      await prisma.securityPerception.createMany({ data: data.securityPerceptions });
    }

    // Re-insert reports
    if (data.reports.length > 0) {
      await prisma.report.createMany({ data: data.reports });
    }

    return NextResponse.json({ success: true, message: "Dados restaurados com sucesso" });
  } catch (error) {
    console.error("Backup import error:", error);
    return NextResponse.json({ error: "Erro ao restaurar dados: " + (error as Error).message }, { status: 500 });
  }
}
