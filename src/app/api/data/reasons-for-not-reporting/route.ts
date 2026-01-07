
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const victimizations = await prisma.victimization.findMany({
      where: {
        reportedCrime: false,
      },
      select: {
        notReportingReasonA1: true,
        notReportingReasonA2: true,
        notReportingReasonA3: true,
        notReportingReasonA4: true,
        notReportingReasonA5: true,
        notReportingReasonA6: true,
        notReportingReasonA7: true,
        notReportingReasonA8: true,
        notReportingReasonA9: true,
        notReportingReasonA10: true,
      },
    });

    const reasonMapping: { [key: string]: string } = {
        notReportingReasonA1: "Medo de represálias",
        notReportingReasonA2: "Falta de confiança na polícia",
        notReportingReasonA3: "Processo complicado/burocrático",
        notReportingReasonA4: "Falta de provas",
        notReportingReasonA5: "Não achou que fosse importante",
        notReportingReasonA6: "Vergonha ou constrangimento",
        notReportingReasonA7: "Não sabia como ou onde denunciar",
        notReportingReasonA8: "Envolvimento de familiares/conhecidos",
        notReportingReasonA9: "Ameaças por parte dos criminosos",
        notReportingReasonA10: "Outro",
    };

    const reasonsCount = victimizations.reduce((acc: { [key: string]: number }, curr) => {
        for (const key in reasonMapping) {
            if (curr[key as keyof typeof curr]) {
                const reason = reasonMapping[key];
                if (!acc[reason]) {
                    acc[reason] = 0;
                }
                acc[reason]++;
            }
        }
        return acc;
    }, {});


    const chartData = Object.entries(reasonsCount).map(([name, count]) => {
      return {
        name,
        count,
      };
    });

    return NextResponse.json(chartData);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
