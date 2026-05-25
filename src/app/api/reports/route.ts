import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { 
  sendEmail, 
  getReportSubmissionEmailHTML, 
  getReportResponseEmailHTML 
} from "@/lib/email";

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

    // Notify POLICE and ADMINS
    const relevantStaff = await prisma.user.findMany({
      where: { 
        role: { in: ["POLICE", "ADMIN"] } 
      }
    });

    const citizenName = body.name || "Um cidadão";

    for (const staff of relevantStaff) {
      // Internal Notification
      await prisma.notification.create({
        data: {
          userId: staff.id,
          type: "CITIZEN_REPORT",
          title: "Novo Relato de Crime",
          message: `${citizenName} enviou um novo relato: ${report.subject}`,
          link: "/dashboard/occurrences"
        }
      });

      // Email Notification
      if (staff.email) {
        await sendEmail({
          to: staff.email,
          subject: `ALERTA: Novo Relato de Crime - ${report.subject}`,
          html: getReportSubmissionEmailHTML(
            staff.name || "Autoridade",
            citizenName,
            report.subject,
            report.message
          )
        });
      }
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

    // Notify CITIZEN if status changed
    if (status && updated.userId && oldReport?.status !== status) {
      const citizen = await prisma.user.findUnique({
        where: { id: updated.userId },
        select: { name: true, email: true }
      });

      if (citizen) {
        // Internal Notification
        await prisma.notification.create({
          data: {
            userId: updated.userId,
            type: "POLICE_VALIDATION",
            title: "Atualização do seu Relato",
            message: `O seu relato "${updated.subject}" foi atualizado para: ${status}.`,
            link: "/dashboard/occurrences"
          }
        });

        // Email Notification
        if (citizen.email) {
          await sendEmail({
            to: citizen.email,
            subject: `Atualização do seu Relato - ${updated.subject}`,
            html: getReportResponseEmailHTML(
              citizen.name || "Cidadão",
              updated.subject,
              status
            )
          });
        }
      }
    }

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Erro ao atualizar estado:", error);
    return NextResponse.json({ message: "Erro ao atualizar estado" }, { status: 500 });
  }
}
