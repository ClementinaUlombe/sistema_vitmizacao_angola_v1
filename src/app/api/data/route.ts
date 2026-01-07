import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const residents = await prisma.resident.findMany({
      include: {
        victimizations: true,
        securityPerceptions: true,
      },
    });

    return NextResponse.json(residents);
  } catch (error: any) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ error: error.message || 'Failed to fetch data' }, { status: 500 });
  }
}
