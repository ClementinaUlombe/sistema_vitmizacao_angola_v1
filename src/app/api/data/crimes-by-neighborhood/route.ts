
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const victimizations = await prisma.victimization.findMany({
      select: {
        crimeGeneral: true,
        resident: {
          select: {
            neighborhood: true,
          },
        },
      },
    });

    const crimesByNeighborhood = victimizations.reduce((acc: { [key: string]: { [key: string]: number } }, curr) => {
      if (curr.resident && curr.crimeGeneral) {
        const neighborhood = curr.resident.neighborhood;
        const crime = curr.crimeGeneral;

        if (!acc[neighborhood]) {
          acc[neighborhood] = {};
        }

        if (!acc[neighborhood][crime]) {
          acc[neighborhood][crime] = 0;
        }

        acc[neighborhood][crime]++;
      }
      return acc;
    }, {});

    const chartData = Object.entries(crimesByNeighborhood).map(([neighborhood, crimes]) => {
      return {
        neighborhood,
        ...crimes,
      };
    });

    return NextResponse.json(chartData);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
