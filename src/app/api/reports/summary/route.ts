import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const totalResidents = await prisma.resident.count();
    const validatedResidents = await prisma.resident.count({ where: { status: 'VALIDADO' } });
    const pendingResidents = await prisma.resident.count({ where: { status: 'PENDENTE' } });

    // Agrupamento por bairro
    const residentsByNeighborhood = await prisma.resident.groupBy({
      by: ['neighborhood'],
      _count: { _all: true },
    });

    // Vitimização Real
    const victimCount = await prisma.victimization.count({
      where: { wasVictim: true }
    });

    // Taxa de Denúncia
    const reportedCount = await prisma.victimization.count({
      where: { wasVictim: true, reportedCrime: true }
    });

    const reportData = {
      generatedAt: new Date().toISOString(),
      stats: {
        total: totalResidents,
        validated: validatedResidents,
        pending: pendingResidents,
        victimizationRate: totalResidents > 0 ? ((victimCount / totalResidents) * 100).toFixed(1) : 0,
        reportingRate: victimCount > 0 ? ((reportedCount / victimCount) * 100).toFixed(1) : 0,
      },
      neighborhoods: residentsByNeighborhood.map(n => ({
        name: n.neighborhood,
        count: n._count._all
      })),
    };

    return NextResponse.json(reportData);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
