-- CreateTable
CREATE TABLE "Resident" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ageGroup" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "occupation" TEXT NOT NULL,
    "residenceTime" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "educationLevel" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Victimization" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "residentId" INTEGER NOT NULL,
    "wasVictim" BOOLEAN NOT NULL,
    "crimeType" TEXT NOT NULL,
    "crimeFrequency" TEXT NOT NULL,
    "reportedCrime" BOOLEAN NOT NULL,
    "notReportingReason" TEXT NOT NULL,
    "crimeTime" TEXT NOT NULL,
    "perpetratorCount" TEXT NOT NULL,
    "damages" TEXT NOT NULL,
    "minorsInvolved" BOOLEAN NOT NULL,
    "crimesByWomen" BOOLEAN NOT NULL,
    "crimesAgainstWomen" BOOLEAN NOT NULL,
    "gangPresence" BOOLEAN NOT NULL,
    CONSTRAINT "Victimization_residentId_fkey" FOREIGN KEY ("residentId") REFERENCES "Resident" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SecurityPerception" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "residentId" INTEGER NOT NULL,
    "daySecurity" TEXT NOT NULL,
    "nightSecurity" TEXT NOT NULL,
    CONSTRAINT "SecurityPerception_residentId_fkey" FOREIGN KEY ("residentId") REFERENCES "Resident" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
