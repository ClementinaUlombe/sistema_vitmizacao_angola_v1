import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const totalResidents = await prisma.resident.count();

    const victimizedResidents = await prisma.victimization.count({
      where: { wasVictim: true },
    });

    const unreportedCrimes = await prisma.victimization.count({
      where: {
        wasVictim: true,
        reportedCrime: false,
      },
    });

    const neighborhoods = await prisma.resident.groupBy({
      by: ['neighborhood'],
    });

    const victimizationRate = totalResidents > 0 ? (victimizedResidents / totalResidents) * 100 : 0;
    const unreportedCrimesRate = victimizedResidents > 0 ? (unreportedCrimes / victimizedResidents) * 100 : 0;

    return NextResponse.json({
      totalResidents,
      victimizationRate,
      unreportedCrimesRate,
      neighborhoods: 4,
    });
  } catch (error: any) {
    console.error('Error fetching summary data:', error);
    return NextResponse.json({ error: error.message || 'Failed to fetch summary data' }, { status: 500 });
  }
}
