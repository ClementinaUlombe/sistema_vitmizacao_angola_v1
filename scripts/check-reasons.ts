import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkNotReportingReasons() {
  const victimizations = await prisma.victimization.findMany({
    where: {
      OR: [
        { notReportingReasonA1: true },
        { notReportingReasonA2: true },
        { notReportingReasonA3: true },
        { notReportingReasonA4: true },
        { notReportingReasonA5: true },
        { notReportingReasonA6: true },
        { notReportingReasonA7: true },
        { notReportingReasonA8: true },
        { notReportingReasonA9: true },
        { notReportingReasonA10: true },
      ]
    },
    select: {
      id: true,
      wasVictim: true,
      reportedCrime: true,
      reportedCrimeQuestion: true,
      notReportingReasonA1: true,
      notReportingReasonA2: true,
    }
  });

  console.log('Records with not-reporting reasons:', victimizations.length);
  if (victimizations.length > 0) {
    console.log('Sample:', JSON.stringify(victimizations.slice(0, 5), null, 2));
  }
  process.exit(0);
}

checkNotReportingReasons().catch(e => {
  console.error(e);
  process.exit(1);
});
