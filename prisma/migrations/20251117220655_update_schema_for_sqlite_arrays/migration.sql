/*
  Warnings:

  - You are about to drop the column `crimeTime` on the `Victimization` table. All the data in the column will be lost.
  - You are about to drop the column `crimeType` on the `Victimization` table. All the data in the column will be lost.
  - You are about to drop the column `notReportingReason` on the `Victimization` table. All the data in the column will be lost.
  - Added the required column `residentNumber` to the `Resident` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SecurityPerception" ADD COLUMN "crimeFrequencyPerceptionA" TEXT;
ALTER TABLE "SecurityPerception" ADD COLUMN "crimeFrequencyPerceptionB" TEXT;
ALTER TABLE "SecurityPerception" ADD COLUMN "crimeFrequencyPerceptionC" TEXT;
ALTER TABLE "SecurityPerception" ADD COLUMN "crimeFrequencyPerceptionGeneral" TEXT;
ALTER TABLE "SecurityPerception" ADD COLUMN "crimeGravityPerception" TEXT;
ALTER TABLE "SecurityPerception" ADD COLUMN "insecurityFactorF1" BOOLEAN;
ALTER TABLE "SecurityPerception" ADD COLUMN "insecurityFactorF10" BOOLEAN;
ALTER TABLE "SecurityPerception" ADD COLUMN "insecurityFactorF11" BOOLEAN;
ALTER TABLE "SecurityPerception" ADD COLUMN "insecurityFactorF12" BOOLEAN;
ALTER TABLE "SecurityPerception" ADD COLUMN "insecurityFactorF13" BOOLEAN;
ALTER TABLE "SecurityPerception" ADD COLUMN "insecurityFactorF2" BOOLEAN;
ALTER TABLE "SecurityPerception" ADD COLUMN "insecurityFactorF3" BOOLEAN;
ALTER TABLE "SecurityPerception" ADD COLUMN "insecurityFactorF4" BOOLEAN;
ALTER TABLE "SecurityPerception" ADD COLUMN "insecurityFactorF5" BOOLEAN;
ALTER TABLE "SecurityPerception" ADD COLUMN "insecurityFactorF6" BOOLEAN;
ALTER TABLE "SecurityPerception" ADD COLUMN "insecurityFactorF7" BOOLEAN;
ALTER TABLE "SecurityPerception" ADD COLUMN "insecurityFactorF8" BOOLEAN;
ALTER TABLE "SecurityPerception" ADD COLUMN "insecurityFactorF9" BOOLEAN;
ALTER TABLE "SecurityPerception" ADD COLUMN "insecurityFactors" TEXT;
ALTER TABLE "SecurityPerception" ADD COLUMN "localPoliceTrustLevel" TEXT;
ALTER TABLE "SecurityPerception" ADD COLUMN "mostDangerousAreas" TEXT;
ALTER TABLE "SecurityPerception" ADD COLUMN "mostInsecureHours" TEXT;
ALTER TABLE "SecurityPerception" ADD COLUMN "personalPoliceInteraction" TEXT;
ALTER TABLE "SecurityPerception" ADD COLUMN "policeEffectivenessEvaluation" TEXT;
ALTER TABLE "SecurityPerception" ADD COLUMN "policePresenceEvaluation" TEXT;
ALTER TABLE "SecurityPerception" ADD COLUMN "policeResponseSpeedEvaluation" TEXT;
ALTER TABLE "SecurityPerception" ADD COLUMN "securityComparison" TEXT;
ALTER TABLE "SecurityPerception" ADD COLUMN "trustInPoliceAndJusticeSystem" BOOLEAN;
ALTER TABLE "SecurityPerception" ADD COLUMN "victimSupportBelief" BOOLEAN;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Resident" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "residentNumber" TEXT NOT NULL,
    "surveyDate" DATETIME,
    "ageGroup" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "occupation" TEXT NOT NULL,
    "residenceTime" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "educationLevel" TEXT NOT NULL,
    "school" TEXT,
    "emailContact" TEXT,
    "protectionMeasureP1" BOOLEAN,
    "protectionMeasureP2" BOOLEAN,
    "protectionMeasureP3" BOOLEAN,
    "protectionMeasureP4" BOOLEAN,
    "protectionMeasureP5" BOOLEAN,
    "protectionMeasureP6" BOOLEAN,
    "protectionMeasureP7" BOOLEAN,
    "protectionMeasureP8" BOOLEAN,
    "protectionMeasureP9" BOOLEAN,
    "protectionMeasureP10" BOOLEAN,
    "crimeImpactOnDailyLife" TEXT,
    "neighborCooperation" TEXT,
    "communityInitiativeParticipation" TEXT,
    "securityImprovementSuggestions" TEXT,
    "victimSupportServicesKnowledge" BOOLEAN
);
INSERT INTO "new_Resident" ("ageGroup", "educationLevel", "gender", "id", "neighborhood", "occupation", "residenceTime") SELECT "ageGroup", "educationLevel", "gender", "id", "neighborhood", "occupation", "residenceTime" FROM "Resident";
DROP TABLE "Resident";
ALTER TABLE "new_Resident" RENAME TO "Resident";
CREATE UNIQUE INDEX "Resident_residentNumber_key" ON "Resident"("residentNumber");
CREATE TABLE "new_Victimization" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "residentId" INTEGER NOT NULL,
    "wasVictim" BOOLEAN NOT NULL,
    "crimeGeneral" TEXT,
    "theft" BOOLEAN,
    "robbery" BOOLEAN,
    "aggression" BOOLEAN,
    "burglary" BOOLEAN,
    "domesticViolence" BOOLEAN,
    "homicide" BOOLEAN,
    "rape" BOOLEAN,
    "drugTrafficking" BOOLEAN,
    "vandalism" BOOLEAN,
    "extortion" BOOLEAN,
    "kidnapping" BOOLEAN,
    "fraud" BOOLEAN,
    "cybercrime" BOOLEAN,
    "otherCrime" TEXT,
    "crimeFrequency" TEXT NOT NULL,
    "reportedCrimeQuestion" TEXT,
    "reportedCrime" BOOLEAN NOT NULL,
    "notReportingReasonA1" BOOLEAN,
    "notReportingReasonA2" BOOLEAN,
    "notReportingReasonA3" BOOLEAN,
    "notReportingReasonA4" BOOLEAN,
    "notReportingReasonA5" BOOLEAN,
    "notReportingReasonA6" BOOLEAN,
    "notReportingReasonA7" BOOLEAN,
    "notReportingReasonA8" BOOLEAN,
    "notReportingReasonA9" BOOLEAN,
    "notReportingReasonA10" BOOLEAN,
    "crimeYear" INTEGER,
    "crimeMonth" TEXT,
    "crimeHour" TEXT,
    "crimeLocation" TEXT,
    "perpetratorCount" TEXT NOT NULL,
    "damages" TEXT,
    "minorsInvolved" BOOLEAN NOT NULL,
    "crimesByWomen" BOOLEAN NOT NULL,
    "crimesAgainstWomen" BOOLEAN NOT NULL,
    "gangPresence" BOOLEAN NOT NULL,
    CONSTRAINT "Victimization_residentId_fkey" FOREIGN KEY ("residentId") REFERENCES "Resident" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Victimization" ("crimeFrequency", "crimesAgainstWomen", "crimesByWomen", "damages", "gangPresence", "id", "minorsInvolved", "perpetratorCount", "reportedCrime", "residentId", "wasVictim") SELECT "crimeFrequency", "crimesAgainstWomen", "crimesByWomen", "damages", "gangPresence", "id", "minorsInvolved", "perpetratorCount", "reportedCrime", "residentId", "wasVictim" FROM "Victimization";
DROP TABLE "Victimization";
ALTER TABLE "new_Victimization" RENAME TO "Victimization";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
