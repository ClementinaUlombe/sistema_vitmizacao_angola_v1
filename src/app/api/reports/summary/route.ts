import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const totalResidents = await prisma.resident.count();
    const validatedResidents = await prisma.resident.count({ where: { status: 'VALIDADO' } });
    const rejectedResidents = await prisma.resident.count({ where: { status: 'REJEITADO' } });
    const pendingResidents = await prisma.resident.count({ where: { status: 'PENDENTE' } });

    // Total de relatos (Reports) de cidadãos
    const totalReports = await prisma.report.count();
    const validatedReports = await prisma.report.count({ where: { status: 'Validado' } });

    // Total de utilizadores
    const totalUsers = await prisma.user.count();
    const usersByRole = await prisma.user.groupBy({
      by: ['role'],
      _count: { _all: true },
    });

    // Agrupamento por bairro
    const residentsByNeighborhood = await prisma.resident.groupBy({
      by: ['neighborhood'],
      _count: { _all: true },
    });

    // Vitimização Real
    const victimCount = await prisma.victimization.count({
      where: { wasVictim: true }
    });

    // Tipos de Crimes (Contagem de Booleano)
    const [
      theft, robbery, aggression, burglary, domesticViolence, 
      homicide, rape, drugTrafficking, vandalism, fraud, cybercrime
    ] = await Promise.all([
      prisma.victimization.count({ where: { theft: true } }),
      prisma.victimization.count({ where: { robbery: true } }),
      prisma.victimization.count({ where: { aggression: true } }),
      prisma.victimization.count({ where: { burglary: true } }),
      prisma.victimization.count({ where: { domesticViolence: true } }),
      prisma.victimization.count({ where: { homicide: true } }),
      prisma.victimization.count({ where: { rape: true } }),
      prisma.victimization.count({ where: { drugTrafficking: true } }),
      prisma.victimization.count({ where: { vandalism: true } }),
      prisma.victimization.count({ where: { fraud: true } }),
      prisma.victimization.count({ where: { cybercrime: true } }),
    ]);

    // Distribuição por Género
    const genderDist = await prisma.resident.groupBy({
      by: ['gender'],
      _count: { _all: true }
    });

    // Distribuição por Faixa Etária
    const ageDist = await prisma.resident.groupBy({
      by: ['ageGroup'],
      _count: { _all: true }
    });

    // Taxa de Denúncia
    const reportedCount = await prisma.victimization.count({
      where: { wasVictim: true, reportedCrime: true }
    });

    const reportData = {
      generatedAt: new Date().toISOString(),
      stats: {
        // Inquéritos (Investigador)
        totalInquiries: totalResidents,
        validatedInquiries: validatedResidents,
        rejectedInquiries: rejectedResidents,
        pendingInquiries: pendingResidents,

        // Relatos de Cidadãos
        totalReports: totalReports,
        validatedReports: validatedReports,

        // Utilizadores
        totalUsers: totalUsers,
        usersByRole: usersByRole.map(r => ({
          role: r.role,
          count: r._count._all
        })),

        // Crimes
        crimes: {
          furto: theft,
          roubo: robbery,
          agressao: aggression,
          arrombamento: burglary,
          violenciaDomestica: domesticViolence,
          homicidio: homicide,
          estupro: rape,
          trafico: drugTrafficking,
          vandalismo: vandalism,
          fraude: fraud,
          cybercrime: cybercrime,
        },

        // Demografia
        demographics: {
          gender: genderDist.map(g => ({ label: g.gender, value: g._count._all })),
          age: ageDist.map(a => ({ label: a.ageGroup, value: a._count._all })),
        },

        // Taxas
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
