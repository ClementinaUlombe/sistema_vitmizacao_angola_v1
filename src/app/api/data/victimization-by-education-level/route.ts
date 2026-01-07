import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const residents = await prisma.resident.findMany({
      include: {
        victimizations: true,
      },
    });

    const data = residents.reduce((acc, resident) => {
      const educationLevel = resident.educationLevel || 'Não especificada';
      if (!acc[educationLevel]) {
        acc[educationLevel] = { educationLevel, victims: 0, nonVictims: 0 };
      }
      if (resident.victimizations.some(v => v.wasVictim)) {
        acc[educationLevel].victims++;
      } else {
        acc[educationLevel].nonVictims++;
      }
      return acc;
    }, {} as Record<string, { educationLevel: string; victims: number; nonVictims: number; }>);

    return NextResponse.json(Object.values(data));
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
