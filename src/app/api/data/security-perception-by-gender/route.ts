import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const securityPerceptions = await prisma.securityPerception.findMany({
      include: {
        resident: {
          select: {
            gender: true,
          },
        },
      },
    });

    const genderPerception: { [gender: string]: { daySecurity: number[]; nightSecurity: number[] } } = {};

    securityPerceptions.forEach(sp => {
      const gender = sp.resident.gender || 'Unknown';
      if (!genderPerception[gender]) {
        genderPerception[gender] = { daySecurity: [], nightSecurity: [] };
      }

      // Assuming daySecurity and nightSecurity are strings like "Muito Seguro", "Seguro", "Neutro", "Inseguro", "Muito Inseguro"
      // We need to convert these to numerical values for averaging.
      const convertToNumerical = (perception: string) => {
        const lowerPerception = perception.toLowerCase();
        if (lowerPerception.includes('muito seguro')) return 5;
        if (lowerPerception.includes('seguro')) return 4;
        if (lowerPerception.includes('neutro')) return 3;
        if (lowerPerception.includes('inseguro')) return 2;
        if (lowerPerception.includes('muito inseguro')) return 1;
        return 0; // Default for unknown
      };

      genderPerception[gender].daySecurity.push(convertToNumerical(sp.daySecurity));
      genderPerception[gender].nightSecurity.push(convertToNumerical(sp.nightSecurity));
    });

    const formattedData = Object.entries(genderPerception).map(([gender, perceptions]) => {
      const avgDaySecurity = perceptions.daySecurity.length > 0
        ? perceptions.daySecurity.reduce((sum, val) => sum + val, 0) / perceptions.daySecurity.length
        : 0;
      const avgNightSecurity = perceptions.nightSecurity.length > 0
        ? perceptions.nightSecurity.reduce((sum, val) => sum + val, 0) / perceptions.nightSecurity.length
        : 0;

      return {
        gender,
        avgDaySecurity: parseFloat(avgDaySecurity.toFixed(2)),
        avgNightSecurity: parseFloat(avgNightSecurity.toFixed(2)),
      };
    });

    return NextResponse.json(formattedData);
  } catch (error: any) {
    console.error('Error fetching security perception by gender:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
