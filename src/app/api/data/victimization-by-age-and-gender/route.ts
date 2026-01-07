
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const victimizations = await prisma.victimization.findMany({
      where: {
        wasVictim: true,
      },
      select: {
        resident: {
          select: {
            ageGroup: true,
            gender: true,
          },
        },
      },
    });

    const victimizationsByAgeAndGender = victimizations.reduce((acc: { [key: string]: { [key: string]: number } }, curr) => {
      if (curr.resident) {
        const ageGroup = curr.resident.ageGroup;
        const gender = curr.resident.gender;

        if (!acc[ageGroup]) {
          acc[ageGroup] = {};
        }

        if (!acc[ageGroup][gender]) {
          acc[ageGroup][gender] = 0;
        }

        acc[ageGroup][gender]++;
      }
      return acc;
    }, {});

    const chartData = Object.entries(victimizationsByAgeAndGender).map(([ageGroup, genders]) => {
      return {
        ageGroup,
        ...genders,
      };
    });

    return NextResponse.json(chartData);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
