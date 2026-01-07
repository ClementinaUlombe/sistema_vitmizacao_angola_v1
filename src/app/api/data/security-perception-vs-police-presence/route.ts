
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const securityPerceptions = await prisma.securityPerception.findMany({
      select: {
        daySecurity: true,
        nightSecurity: true,
        policePresenceEvaluation: true,
      },
    });

    const securityMapping: { [key: string]: number } = {
      "Muito seguro": 5,
      "Seguro": 4,
      "Pouco seguro": 3,
      "Inseguro": 2,
      "Muito inseguro": 1,
    };

    const policePresenceMapping: { [key: string]: number } = {
        "Muito boa": 5,
        "Boa": 4,
        "Razoável": 3,
        "Fraca": 2,
        "Muito fraca": 1,
    };

    const aggregatedData = securityPerceptions.reduce((acc: { [key: string]: { daySecurity: number[], nightSecurity: number[], policePresence: number[] } }, curr) => {
        const policePresence = curr.policePresenceEvaluation || "Não informado";

        if (!acc[policePresence]) {
            acc[policePresence] = {
                daySecurity: [],
                nightSecurity: [],
                policePresence: [],
            };
        }

        if (curr.daySecurity) {
            acc[policePresence].daySecurity.push(securityMapping[curr.daySecurity] || 0);
        }
        if (curr.nightSecurity) {
            acc[policePresence].nightSecurity.push(securityMapping[curr.nightSecurity] || 0);
        }
        if (curr.policePresenceEvaluation) {
            acc[policePresence].policePresence.push(policePresenceMapping[curr.policePresenceEvaluation] || 0);
        }

        return acc;
    }, {});


    const chartData = Object.entries(aggregatedData).map(([policePresence, data]) => {
      const avgDaySecurity = data.daySecurity.length > 0 ? data.daySecurity.reduce((a, b) => a + b, 0) / data.daySecurity.length : 0;
      const avgNightSecurity = data.nightSecurity.length > 0 ? data.nightSecurity.reduce((a, b) => a + b, 0) / data.nightSecurity.length : 0;
      const avgPolicePresence = data.policePresence.length > 0 ? data.policePresence.reduce((a, b) => a + b, 0) / data.policePresence.length : 0;

      return {
        policePresence,
        avgDaySecurity,
        avgNightSecurity,
        avgPolicePresence,
      };
    });

    return NextResponse.json(chartData);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
