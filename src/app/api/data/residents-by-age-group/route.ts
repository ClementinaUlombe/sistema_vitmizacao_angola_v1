import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const residentsByAgeGroup = await prisma.resident.groupBy({
      by: ['ageGroup'],
      _count: {
        id: true,
      },
      orderBy: {
        _count: {
          id: 'desc',
        },
      },
    });

    const formattedData = residentsByAgeGroup.map(item => ({
      ageGroup: item.ageGroup,
      count: item._count.id,
    }));

    return NextResponse.json(formattedData);
  } catch (error: any) {
    console.error('Error fetching residents by age group:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
