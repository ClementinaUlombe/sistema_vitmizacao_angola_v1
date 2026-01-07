import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required.' }, { status: 400 });
    }

    let response = "Desculpe, não consegui encontrar informações relevantes para a sua pergunta.";

    // Basic keyword matching for demonstration
    if (message.toLowerCase().includes('vitimização')) {
      const totalVictims = await prisma.victimization.count({
        where: { wasVictim: true }
      });
      response = `De acordo com os dados, ${totalVictims} residentes foram vítimas de crime.`;
    } else if (message.toLowerCase().includes('crimes mais reportados')) {
      // This would require more complex aggregation in a real scenario
      response = "Os crimes mais reportados incluem Roubo, Furto e Agressão.";
    } else if (message.toLowerCase().includes('segurança noturna')) {
      const insecureNight = await prisma.securityPerception.count({
        where: { nightSecurity: { contains: 'inseguro' } }
      });
      response = `Cerca de ${insecureNight} residentes sentem-se inseguros à noite.`;
    }
    // Add more keyword-based responses and Prisma queries here

    return NextResponse.json({ response });
  } catch (error: any) {
    console.error('Error in chatbot:', error);
    return NextResponse.json({ error: error.message || 'Failed to process chatbot request' }, { status: 500 });
  }
}
