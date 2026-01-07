import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const victimizations = await prisma.victimization.findMany({
      select: {
        theft: true,
        robbery: true,
        aggression: true,
        burglary: true,
        domesticViolence: true,
        homicide: true,
        rape: true,
        drugTrafficking: true,
        vandalism: true,
        extortion: true,
        kidnapping: true,
        fraud: true,
        cybercrime: true,
        otherCrime: true,
      },
    });

    const crimeTypeCounts: { [key: string]: number } = {
      Theft: 0,
      Robbery: 0,
      Aggression: 0,
      Burglary: 0,
      DomesticViolence: 0,
      Homicide: 0,
      Rape: 0,
      DrugTrafficking: 0,
      Vandalism: 0,
      Extortion: 0,
      Kidnapping: 0,
      Fraud: 0,
      Cybercrime: 0,
      OtherCrime: 0,
    };

    victimizations.forEach(v => {
      if (v.theft) crimeTypeCounts.Theft++;
      if (v.robbery) crimeTypeCounts.Robbery++;
      if (v.aggression) crimeTypeCounts.Aggression++;
      if (v.burglary) crimeTypeCounts.Burglary++;
      if (v.domesticViolence) crimeTypeCounts.DomesticViolence++;
      if (v.homicide) crimeTypeCounts.Homicide++;
      if (v.rape) crimeTypeCounts.Rape++;
      if (v.drugTrafficking) crimeTypeCounts.DrugTrafficking++;
      if (v.vandalism) crimeTypeCounts.Vandalism++;
      if (v.extortion) crimeTypeCounts.Extortion++;
      if (v.kidnapping) crimeTypeCounts.Kidnapping++;
      if (v.fraud) crimeTypeCounts.Fraud++;
      if (v.cybercrime) crimeTypeCounts.Cybercrime++;
      if (v.otherCrime) crimeTypeCounts.OtherCrime++;
    });

    const formattedData = Object.entries(crimeTypeCounts).map(([name, count]) => ({
      name,
      count,
    }));

    return NextResponse.json(formattedData);
  } catch (error: any) {
    console.error('Error fetching victimization by crime type:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
