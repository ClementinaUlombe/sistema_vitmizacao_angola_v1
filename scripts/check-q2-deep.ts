import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkQ2Deeply() {
  const q2s = await prisma.victimization.findMany({
    where: { reportedCrimeQuestion: '2' },
    take: 20,
    select: {
      id: true,
      crimeGeneral: true,
      theft: true,
      robbery: true,
      aggression: true,
    }
  });

  console.log('Q2 Records Deep Check:');
  q2s.forEach(v => {
    console.log(`ID ${v.id}: crimeGeneral='${v.crimeGeneral}', theft=${v.theft}, robbery=${v.robbery}`);
  });
  process.exit(0);
}

checkQ2Deeply().catch(e => {
  console.error(e);
  process.exit(1);
});
