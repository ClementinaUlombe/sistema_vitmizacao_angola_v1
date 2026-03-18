import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Endpoint: /api/data (GET all residents)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const researcherId = searchParams.get("researcherId");

    // Se tiver ?id=X, retorna um residente específico
    if (id) {
      const resident = await prisma.resident.findUnique({
        where: { id: parseInt(id) },
        include: {
          victimizations: true,
          securityPerceptions: true,
          researcher: {
            select: { name: true, email: true, id: true }
          }
        },
      });
      return NextResponse.json(resident);
    }

    // Filtro por pesquisador (opcional)
    const where = researcherId ? { researcherId: parseInt(researcherId) } : {};

    // Caso contrário, retorna todos os residentes
    const residents = await prisma.resident.findMany({
      where,
      include: {
        victimizations: true,
        securityPerceptions: true,
        researcher: {
          select: { name: true, email: true, id: true }
        }
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
    const { id, neighborhood, ageGroup, gender, status } = body;

    if (!id) {
      return NextResponse.json(
        { message: "ID é obrigatório" },
        { status: 400 }
      );
    }

    const oldResident = await prisma.resident.findUnique({
      where: { id: parseInt(id) },
      select: { status: true, researcherId: true, residentNumber: true }
    });

    const updatedResident = await prisma.resident.update({
      where: { id: parseInt(id) },
      data: {
        ...(neighborhood && { neighborhood }),
        ...(ageGroup && { ageGroup }),
        ...(gender && { gender }),
        ...(status && { status }),
      },
      include: {
        victimizations: true,
        securityPerceptions: true,
      },
    });

    // Notify RESEARCHER if status changed to VALIDADO
    if (status === "VALIDADO" && updatedResident.researcherId && oldResident?.status !== "VALIDADO") {
      await prisma.notification.create({
        data: {
          userId: updatedResident.researcherId,
          type: "ADMIN_VALIDATION",
          title: "Inquérito Validado",
          message: `O seu lançamento #${updatedResident.residentNumber} foi validado pelo administrador.`,
          link: "/dashboard/data-entry"
        }
      });
    }

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
      residenceTime,
      neighborhood,
      educationLevel,
      wasVictim,
      crimeGeneral,
      reportedCrime,
      crimeFrequency,
      daySecurity,
      nightSecurity,
      localPoliceTrustLevel,
      researcherId,
    } = body;

    const resident = await prisma.resident.create({
      data: {
        residentNumber,
        ageGroup,
        gender,
        occupation,
        residenceTime,
        neighborhood,
        educationLevel,
        researcherId: researcherId ? parseInt(researcherId) : null,
        status: "PENDENTE",
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

    // Notify ADMINS
    const adminUsers = await prisma.user.findMany({
      where: { role: "ADMIN" }
    });

    // Buscar nome do residente para a notificação
    let residentName = resident.residentNumber;  // Fallback: usar número do residente
    if (resident.name) {
      residentName = resident.name;  // Se tiver nome, usa o nome
    }

    for (const admin of adminUsers) {
      await prisma.notification.create({
        data: {
          userId: admin.id,
          type: "RESEARCHER_SUBMISSION",
          title: "Novo Lançamento de Inquérito",
          message: `${residentName} foi inquirido e foi enviado um novo lançamento: #${resident.residentNumber}`,
          link: "/dashboard/data-entry?admin=true"
        }
      });
    }

    return NextResponse.json(resident, { status: 201 });
  } catch (error: any) {
    console.error("Error creating resident:", error);
    return NextResponse.json(
      { message: "Erro ao salvar lançamento: " + error.message },
      { status: 500 }
    );
  }
}
