import { NextRequest, NextResponse } from 'next/server';
import ExcelJS from 'exceljs';
import { PrismaClient, Prisma } from '@prisma/client'; // Import Prisma for error types

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      console.error('No file uploaded.');
      return NextResponse.json({ error: 'No file uploaded.' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(buffer as any);

    console.log('Workbook loaded successfully.');
    console.log('Total worksheets found:', workbook.worksheets.length);
    console.log('Worksheet names found:', workbook.worksheets.map(ws => ws.name));

    let worksheet: ExcelJS.Worksheet | undefined;

    // Try to find a worksheet named "vitimizacao" first
    worksheet = workbook.getWorksheet('vitimizacao');

    if (worksheet && worksheet.rowCount > 1) { // Check if there is more than just a header row
      console.log(`Selected worksheet: "vitimizacao" because it has data.`);
    } else {
      // If "vitimizacao" not found or empty, iterate through all worksheets and pick the first one that has data
      for (const ws of workbook.worksheets) {
        console.log(`Checking worksheet: "${ws.name}", rowCount: ${ws.rowCount}`);
        if (ws.rowCount > 1) { // Check if there is more than just a header row
          worksheet = ws;
          console.log(`Selected worksheet: "${worksheet.name}" because it has data.`);
          break;
        } else {
          console.log(`Skipping worksheet: "${ws.name}" because rowCount is not greater than 1.`);
        }
      }
    }

    // If still no worksheet, return error
    if (!worksheet) {
      console.error('No worksheet with data found in the Excel file.');
      return NextResponse.json({ error: 'No worksheet with data found in the Excel file. Please ensure your Excel file has at least one non-empty worksheet.' }, { status: 400 });
    }

    console.log(`Using worksheet: ${worksheet.name} with ${worksheet.actualRowCount} rows of data.`);

    const dataToInsert = [];
    const headers: string[] = [];
    worksheet.getRow(1).eachCell((cell) => {
      headers.push(cell.text);
    });

    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return; // Skip header row

      const rowData: { [key: string]: any } = {};
      row.eachCell((cell, colNumber) => {
        const header = headers[colNumber - 1]; // colNumber is 1-indexed
        if (header) {
          rowData[header] = cell.value;
        }
      });
      dataToInsert.push(rowData);
    });

    // Helper function to convert various values to boolean
    const toBoolean = (value: any) => {
      if (value === null || value === undefined) return null;
      if (typeof value === 'boolean') return value;
      if (typeof value === 'number') {
        if (value === 1) return true;
        if (value === 2) return false;
        return null;
      }
      if (typeof value === 'string') {
        const lowerValue = value.toLowerCase().trim();
        if (lowerValue === 'sim' || lowerValue === '1' || lowerValue === '1.0' || lowerValue === '1.00') return true;
        if (lowerValue === 'não' || lowerValue === 'nao' || lowerValue === '2' || lowerValue === '2.0' || lowerValue === '2.00') return false;
      }
      return null;
    };

    // Helper function to convert various values to boolean for specific fields
    const toBooleanStrict = (value: any) => {
      const boolValue = toBoolean(value);
      return boolValue === true;
    };

    // Helper function to parse date
    const parseDate = (value: any) => {
      if (value instanceof Date) return value;
      if (typeof value === 'string') {
        try {
          return new Date(value);
        } catch (e) {
          return null;
        }
      }
      return null;
    };

    const errors: string[] = [];
    for (const item of dataToInsert) {
      const rowNumber = dataToInsert.indexOf(item) + 2; // Excel row number

      // Basic Validation
      if (!item['Número']) {
        errors.push(`Row ${rowNumber}: 'Número' is required.`);
        continue;
      }
      if (!item['Idade']) {
        errors.push(`Row ${rowNumber}: 'Idade' is required.`);
        continue;
      }
      if (!item['Género']) {
        errors.push(`Row ${rowNumber}: 'Género' is required.`);
        continue;
      }

      let resident: any;
      try {
        // Try to find an existing resident by residentNumber
        resident = await prisma.resident.findUnique({
          where: { residentNumber: item['Número']?.toString() },
        });

        if (!resident) {
          // If resident does not exist, create a new one
          resident = await prisma.resident.create({
            data: {
              residentNumber: item['Número']?.toString(),
              surveyDate: parseDate(item['Data']),
              ageGroup: item['Idade']?.toString() || 'Unknown',
              gender: item['Género']?.toString() || 'Unknown',
              occupation: item['Ocupação']?.toString() || 'Unknown',
              residenceTime: item['Tempo_de_residência_no_bairro']?.toString() || 'Unknown',
              neighborhood: item['Bairro']?.toString() || 'Unknown',
              educationLevel: item['Escolaridade']?.toString() || 'Unknown',
              school: item['ESCOLA']?.toString(),
              emailContact: item['Direccióndecorreoelectrónico']?.toString(),
              protectionMeasureP1: toBoolean(item['p1']),
              protectionMeasureP2: toBoolean(item['p2']),
              protectionMeasureP3: toBoolean(item['p3']),
              protectionMeasureP4: toBoolean(item['p4']),
              protectionMeasureP5: toBoolean(item['p5']),
              protectionMeasureP6: toBoolean(item['p6']),
              protectionMeasureP7: toBoolean(item['p7']),
              protectionMeasureP8: toBoolean(item['p8']),
              protectionMeasureP9: toBoolean(item['p9']),
              protectionMeasureP10: toBoolean(item['p10']),
              crimeImpactOnDailyLife: item['@35.Acriminalidadeafetousuarotinadiáriaoudesuafamília']?.toString(),
              neighborCooperation: item['@36.Comodescrevearelaçãoentrevizinhosemtermosdecooperaçãopar']?.toString(),
              communityInitiativeParticipation: item['@37.Vocêparticipadealgumainiciativacomunitáriavoltadaparaasegu']?.toString(),
              securityImprovementSuggestions: item['@38.Quaismedidasvocêsugeririaparamelhorarasegurançanobairro']?.toString(),
              victimSupportServicesKnowledge: toBoolean(item['@39.Vocêconheceserviçosdeapoioàsvítimasdecrimenobairro']),
            },
          });
        }
      } catch (residentError: any) {
        if (residentError instanceof Prisma.PrismaClientKnownRequestError && residentError.code === 'P2002') {
          errors.push(`Row ${rowNumber}: Resident with 'Número' ${item['Número']} already exists. Skipping this row.`);
        } else {
          errors.push(`Row ${rowNumber}: Error creating/finding Resident - ${residentError.message}`);
        }
        continue; // Skip to next row if Resident creation/finding failed
      }

      // Create Victimization
      try {
        await prisma.victimization.create({
          data: {
            resident: {
              connect: { id: resident.id },
            },
            wasVictim: toBooleanStrict(item['Vitima']),
            crimeGeneral: item['Crime']?.toString(),
            theft: toBoolean(item['Furto']),
            robbery: toBoolean(item['Roubo']),
            aggression: toBoolean(item['Agressão']),
            burglary: toBoolean(item['Arrombamento']),
            domesticViolence: toBoolean(item['VioDom']),
            homicide: toBoolean(item['Homicidio']),
            rape: toBoolean(item['Estupro']),
            drugTrafficking: toBoolean(item['TraDroga']),
            vandalism: toBoolean(item['Vandalismo']),
            extortion: toBoolean(item['Extorsão']),
            kidnapping: toBoolean(item['Sequestro']),
            fraud: toBoolean(item['Fraude']),
            cybercrime: toBoolean(item['CrimeCibernetico']),
            otherCrime: item['Outro']?.toString(),
            crimeFrequency: item['Quantasvezes']?.toString() || 'Unknown',
            reportedCrimeQuestion: item['VAR00056']?.toString(),
            reportedCrime: toBooleanStrict(item['Denunciou']),
            notReportingReasonA1: toBoolean(item['a1']),
            notReportingReasonA2: toBoolean(item['a2']),
            notReportingReasonA3: toBoolean(item['a3']),
            notReportingReasonA4: toBoolean(item['a4']),
            notReportingReasonA5: toBoolean(item['a5']),
            notReportingReasonA6: toBoolean(item['a6']),
            notReportingReasonA7: toBoolean(item['a7']),
            notReportingReasonA8: toBoolean(item['a8']),
            notReportingReasonA9: toBoolean(item['a9']),
            notReportingReasonA10: toBoolean(item['a10']),
            crimeYear: item['AnoMês'] ? parseInt(item['AnoMês'].toString().substring(0, 4)) : null,
            crimeMonth: item['Mês']?.toString(),
            crimeHour: item['Horário']?.toString(),
            crimeLocation: item['@12.Localizaçãoexatadentrodobairro']?.toString(),
            perpetratorCount: item['@13.Númerodeautoresenvolvidos']?.toString() || 'Unknown',
            damages: item['@14.Danoseconsequênciassofridaspodesermaisdeumaopção']?.toString(),
            minorsInvolved: toBoolean(item['@15.Vocêpercebeenvolvimentodemenoresouadolescentesemactividades']),
            crimesByWomen: toBoolean(item['@16.Jápresenciouousoubedecrimescometidospormulheres']),
            crimesAgainstWomen: toBoolean(item['@17.Jápresenciouousoubedecrimescometidoscontramulheres']),
            gangPresence: toBoolean(item['@18.Identificaapresençadeganguesouassociaçõescriminosasnobair']),
          },
        });
      } catch (victimizationError: any) {
        errors.push(`Row ${rowNumber}: Error creating Victimization record - ${victimizationError.message}`);
      }

      // Create SecurityPerception
      try {
        await prisma.securityPerception.create({
          data: {
            resident: {
              connect: { id: resident.id },
            },
            daySecurity: item['@19.Comoavaliaasuasensaçãodesegurançaaocircularnobairrodurant']?.toString() || 'Unknown',
            nightSecurity: item['@20.Comoavaliaasuasensaçãodesegurançaaocircularnobairrodurant']?.toString() || 'Unknown',
            securityComparison: item['@21.Comparadoaosanosanterioresasuasensaçãodesegurança']?.toString(),
            mostDangerousAreas: item['@22.Quaisáreasespecíficasdobairrovocêconsideramaisperigosas']?.toString(),
            mostInsecureHours: item['@23.Emquaishoráriosdodiavocêsesentemaisinseguroa']?.toString(),
            insecurityFactors: item['@24.Nasuaopiniãoquaisfactoresmaiscontribuemparaainsegurançanob']?.toString(),
            insecurityFactorF1: toBoolean(item['f1']),
            insecurityFactorF2: toBoolean(item['f2']),
            insecurityFactorF3: toBoolean(item['f3']),
            insecurityFactorF4: toBoolean(item['f4']),
            insecurityFactorF5: toBoolean(item['f5']),
            insecurityFactorF6: toBoolean(item['f6']),
            insecurityFactorF7: toBoolean(item['f7']),
            insecurityFactorF8: toBoolean(item['f8']),
            insecurityFactorF9: toBoolean(item['f9']),
            insecurityFactorF10: toBoolean(item['f10']),
            insecurityFactorF11: toBoolean(item['f11']),
            insecurityFactorF12: toBoolean(item['f12']),
            insecurityFactorF13: toBoolean(item['f13']),
            crimeFrequencyPerceptionGeneral: item['@26.Comquefrequênciavocêachaqueocorremosseguintescrimesnobairr']?.toString(),
            crimeFrequencyPerceptionA: item['@26.Comquefrequênciavocêachaqueocorremosseguintescrimesnobai_A']?.toString(),
            crimeFrequencyPerceptionB: item['@26.Comquefrequênciavocêachaqueocorremosseguintescrimesnobai_B']?.toString(),
            crimeFrequencyPerceptionC: item['@26.Comquefrequênciavocêachaqueocorremosseguintescrimesnobai_C']?.toString(),
            crimeGravityPerception: item['@27.Comoavaliaagravidadedoscrimesqueocorremnobairro']?.toString(),
            policePresenceEvaluation: item['@28.Comoavaliaapresençapolicialnobairro']?.toString(),
            policeResponseSpeedEvaluation: item['@29.Comoavaliaarapidezderespostadapolícia']?.toString(),
            policeEffectivenessEvaluation: item['@30.Comoavaliaaeficáciadapolícianocombateaocrimenasuaárea']?.toString(),
            localPoliceTrustLevel: item['@31.Comodescreveoseuníveldeconfiançanapolícialocal']?.toString(),
            personalPoliceInteraction: item['@32.Játevealgumainteraçãopessoalcomapolícialocal']?.toString(),
            trustInPoliceAndJusticeSystem: toBoolean(item['@33.Vocêconfiaqueapolíciaeosistemajudiciallidamadequadamenteco']),
            victimSupportBelief: toBoolean(item['@34.Vocêacreditaqueasvítimasrecebemoapoionecessáriodasautorid']),
          },
        });
      } catch (securityPerceptionError: any) {
        errors.push(`Row ${rowNumber}: Error creating SecurityPerception record - ${securityPerceptionError.message}`);
      }
    }

    if (errors.length > 0) {
      return NextResponse.json({ message: 'File processed with errors.', errors }, { status: 400 });
    }

    return NextResponse.json({ message: 'File processed successfully and data inserted.' });
  } catch (error: any) {
    console.error('Error processing Excel file:', error);
    return NextResponse.json({ error: error.message || 'Failed to process file' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
