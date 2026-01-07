import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function parseSecurityLevel(level: string | null): number {
    if (!level) return 0;
    switch (level.toLowerCase()) {
        case 'muito seguro':
            return 5;
        case 'seguro':
            return 4;
        case 'pouco seguro':
            return 3;
        case 'inseguro':
            return 2;
        case 'muito inseguro':
            return 1;
        default:
            return 0;
    }
}


export async function GET() {
  try {
    const residents = await prisma.resident.findMany({
        include: {
          securityPerceptions: true,
        },
      });
  
      const data = residents.reduce((acc, resident) => {
        const neighborhood = resident.neighborhood || 'Não especificado';
        if (!acc[neighborhood]) {
          acc[neighborhood] = { neighborhood, daySecurity: 0, nightSecurity: 0, count: 0 };
        }
  
        resident.securityPerceptions.forEach(p => {
          acc[neighborhood].daySecurity += parseSecurityLevel(p.daySecurity);
          acc[neighborhood].nightSecurity += parseSecurityLevel(p.nightSecurity);
          acc[neighborhood].count++;
        });
  
        return acc;
      }, {} as Record<string, { neighborhood: string; daySecurity: number; nightSecurity: number; count: number; }>);
  
      const averagedData = Object.values(data).map(item => ({
        neighborhood: item.neighborhood,
        daySecurity: item.count > 0 ? item.daySecurity / item.count : 0,
        nightSecurity: item.count > 0 ? item.nightSecurity / item.count : 0,
      }));
  
      return NextResponse.json(averagedData);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
