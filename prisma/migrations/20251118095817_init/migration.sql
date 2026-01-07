-- AlterTable
ALTER TABLE "Resident" ADD COLUMN "communityInitiativeDetails" TEXT;
ALTER TABLE "Resident" ADD COLUMN "crimeImpactDetails" TEXT;
ALTER TABLE "Resident" ADD COLUMN "filterColumn" TEXT;
ALTER TABLE "Resident" ADD COLUMN "improvementSuggestionsDetails" TEXT;

-- AlterTable
ALTER TABLE "SecurityPerception" ADD COLUMN "personalPoliceInteractionDetails" TEXT;
