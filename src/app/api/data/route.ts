import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Endpoint: /api/data (GET all residents)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    // Se tiver ?id=X, retorna um residente específico
    if (id) {
      const resident = await prisma.resident.findUnique({
        where: { id: parseInt(id) },
        include: {
          victimizations: true,
          securityPerceptions: true,
        },
      });
      return NextResponse.json(resident);
    }

    // Caso contrário, retorna todos os residentes
    const residents = await prisma.resident.findMany({
      include: {
        victimizations: true,
        securityPerceptions: true,
      },
      orderBy: { id: "desc" },
    });
    return NextResponse.json(residents);
  } catch (error: any) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ error: error.message || 'Failed to fetch data' }, { status: 500 });
  }
}

// Endpoint: /api/data (PUT - update resident)
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, neighborhood, ageGroup, gender } = body;

    if (!id) {
      return NextResponse.json(
        { message: "ID é obrigatório" },
        { status: 400 }
      );
    }

    const updatedResident = await prisma.resident.update({
      where: { id: parseInt(id) },
      data: {
        ...(neighborhood && { neighborhood }),
        ...(ageGroup && { ageGroup }),
        ...(gender && { gender }),
      },
      include: {
        victimizations: true,
        securityPerceptions: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
      },
    });

    return NextResponse.json(updatedResident);
  } catch (error: any) {
    console.error("Error updating resident:", error);
    return NextResponse.json(
      { message: "Erro ao atualizar lançamento" },
      { status: 500 }
    );
  }
}

// Endpoint: /api/data (DELETE - remove resident)
export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { message: "ID é obrigatório" },
        { status: 400 }
      );
    }

    await prisma.resident.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ message: "Lançamento eliminado com sucesso" });
  } catch (error: any) {
    console.error("Error deleting resident:", error);
    return NextResponse.json(
      { message: "Erro ao eliminar lançamento" },
      { status: 500 }
    );
  }
}

// Endpoint: /api/data (POST - create new resident)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      residentNumber,
      ageGroup,
      gender,
      occupation,
      neighborhood,
      educationLevel,
      wasVictim,
      crimeGeneral,
      reportedCrime,
      crimeFrequency,
      daySecurity,
      nightSecurity,
      localPoliceTrustLevel,
    } = body;

    const resident = await prisma.resident.create({
      data: {
        residentNumber,
        ageGroup,
        gender,
        occupation,
        neighborhood,
        educationLevel,
        victimizations: {
          create: {
            wasVictim,
            crimeGeneral,
            reportedCrime,
            crimeFrequency,
          },
        },
        securityPerceptions: {
          create: {
            daySecurity,
            nightSecurity,
            localPoliceTrustLevel,
          },
        },
      },
      include: {
        victimizations: true,
        securityPerceptions: true,
      },
    });

    return NextResponse.json(resident, { status: 201 });
  } catch (error: any) {
    console.error("Error creating resident:", error);
    return NextResponse.json(
      { message: "Erro ao salvar lançamento: " + error.message },
      { status: 500 }
    );
  }
}
