import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const securityPerceptions = await prisma.securityPerception.findMany({
      where: {
        localPoliceTrustLevel: {
          not: null,
        },
      },
    });

    const data = securityPerceptions.reduce((acc, perception) => {
      const trustLevel = perception.localPoliceTrustLevel!;
      if (!acc[trustLevel]) {
        acc[trustLevel] = { trustLevel, count: 0 };
      }
      acc[trustLevel].count++;
      return acc;
    }, {} as Record<string, { trustLevel: string; count: number; }>);

    return NextResponse.json(Object.values(data));
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
