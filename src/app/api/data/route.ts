import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Endpoint: /api/data (GET all residents)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const researcherId = searchParams.get("researcherId");
    const getNextNumber = searchParams.get("nextNumber") === "true";

    // Retorna o próximo número de inquérito disponível
    if (getNextNumber) {
      const currentYear = new Date().getFullYear();
      const yearSuffix = `/${currentYear}`;
      
      const residents = await prisma.resident.findMany({
        where: {
          residentNumber: {
            endsWith: yearSuffix
          }
        },
        select: {
          residentNumber: true
        }
      });

      let nextSequence = 1;
      if (residents.length > 0) {
        const sequences = residents
          .map(r => {
            const parts = r.residentNumber.split('/');
            const seq = parseInt(parts[0]);
            return isNaN(seq) ? 0 : seq;
          })
          .filter(seq => seq > 0);
        
        if (sequences.length > 0) {
          nextSequence = Math.max(...sequences) + 1;
        }
      }

      const formattedNumber = `${nextSequence.toString().padStart(3, '0')}${yearSuffix}`;
      return NextResponse.json({ nextNumber: formattedNumber });
    }

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
      select: {
        id: true,
        residentNumber: true,
        surveyDate: true,
        status: true,
        researcherId: true,
        ageGroup: true,
        gender: true,
        occupation: true,
        neighborhood: true,
        educationLevel: true,
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

    const residentId = parseInt(id);

    // 1. Eliminar registos de vitimização dependentes
    await prisma.victimization.deleteMany({
      where: { residentId: residentId }
    });

    // 2. Eliminar registos de percepção de segurança dependentes
    await prisma.securityPerception.deleteMany({
      where: { residentId: residentId }
    });

    // 3. Eliminar o residente (usando deleteMany para evitar retorno de colunas inexistentes)
    await prisma.resident.deleteMany({
      where: { id: residentId },
    });

    return NextResponse.json({ message: "Lançamento eliminado com sucesso" });
  } catch (error: any) {
    console.error("Error deleting resident:", error);
    return NextResponse.json(
      { message: "Erro ao eliminar lançamento: " + error.message },
      { status: 500 }
    );
  }
}

// Endpoint: /api/data (POST - create new resident)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
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

    // Validação de campos obrigatórios conforme o schema.prisma
    if (!ageGroup || !gender || !neighborhood) {
      return NextResponse.json(
        { message: "Campos obrigatórios em falta: Bairro, Género ou Faixa Etária." },
        { status: 400 }
      );
    }

    // Geração Automática do Número de Inquérito Sequencial
    const currentYear = new Date().getFullYear();
    const yearSuffix = `/${currentYear}`;
    
    const latestResidents = await prisma.resident.findMany({
      where: {
        residentNumber: {
          endsWith: yearSuffix
        }
      },
      select: {
        residentNumber: true
      }
    });

    let nextSequence = 1;
    if (latestResidents.length > 0) {
      const sequences = latestResidents
        .map(r => {
          const parts = r.residentNumber.split('/');
          const seq = parseInt(parts[0]);
          return isNaN(seq) ? 0 : seq;
        })
        .filter(seq => seq > 0);
      
      if (sequences.length > 0) {
        nextSequence = Math.max(...sequences) + 1;
      }
    }

    const residentNumber = `${nextSequence.toString().padStart(3, '0')}${yearSuffix}`;

    const resident = await prisma.resident.create({
      data: {
        residentNumber,
        name,
        ageGroup,
        gender,
        occupation,
        residenceTime,
        neighborhood,
        educationLevel,
        researcherId: researcherId ? parseInt(researcherId.toString()) : null,
        status: "PENDENTE",
        victimizations: {
          create: {
            wasVictim: wasVictim === true || wasVictim === 'true',
            crimeGeneral: crimeGeneral || null,
            reportedCrime: reportedCrime === true || reportedCrime === 'true',
            crimeFrequency: crimeFrequency || "Nunca",
          },
        },
        securityPerceptions: {
          create: {
            daySecurity: daySecurity || "Seguro",
            nightSecurity: nightSecurity || "Inseguro",
            localPoliceTrustLevel: localPoliceTrustLevel || "Média",
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
    const displayResidentName = name || residentNumber;

    for (const admin of adminUsers) {
      await prisma.notification.create({
        data: {
          userId: admin.id,
          type: "RESEARCHER_SUBMISSION",
          title: "Novo Lançamento de Inquérito",
          message: `${displayResidentName} foi inquirido e foi enviado um novo lançamento: #${resident.residentNumber}`,
          link: "/dashboard/data-entry?admin=true"
        }
      });
    }

    return NextResponse.json(resident, { status: 201 });
  } catch (error: any) {
    console.error("Error creating resident:", error);
    return NextResponse.json(
      { message: "Erro ao salvar lançamento: " + (error.message || "Erro interno") },
      { status: 500 }
    );
  }
}
