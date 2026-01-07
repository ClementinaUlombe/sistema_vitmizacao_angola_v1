// src/lib/chatbot-queries.ts

import prisma from "./prisma";

interface ChatbotQuery {
  type: string;
  model: string;
  where?: any;
  select?: any;
  aggregation?: string;
}

export async function interpretAndQuery(message: string): Promise<string> {
  const lowerCaseMessage = message.toLowerCase();
  let response = "Desculpe, não consegui encontrar informações relevantes para a sua pergunta ou não entendi a questão.";

  // --- Query: Quantas mulheres/homens foram vitimizadas ---
  if (lowerCaseMessage.includes("quantas") && lowerCaseMessage.includes("vitimizadas")) {
    const isFemale = lowerCaseMessage.includes("mulheres");
    const isMale = lowerCaseMessage.includes("homens");

    if (isFemale || isMale) {
      const genderFilter = isFemale ? "Feminino" : "Masculino";
      
      const count = await prisma.victimization.count({
        where: {
          wasVictim: true,
          resident: {
            gender: genderFilter,
          },
        },
      });
      response = `De acordo com os dados, ${count} ${isFemale ? "mulheres" : "homens"} foram vitimizadas.`;
      return response;
    }
  }

  // --- Existing basic keyword matching (can be expanded/improved) ---
  if (lowerCaseMessage.includes('vitimização')) {
    const totalVictims = await prisma.victimization.count({
      where: { wasVictim: true }
    });
    response = `De acordo com os dados, ${totalVictims} residentes foram vítimas de crime.`;
  } else if (lowerCaseMessage.includes('crimes mais reportados')) {
    // This is still a placeholder, as proper aggregation needs more complex logic
    response = "Os crimes mais reportados incluem Roubo, Furto e Agressão. Para uma análise detalhada, consulte a seção de gráficos.";
  } else if (lowerCaseMessage.includes('segurança noturna')) {
    const insecureNight = await prisma.securityPerception.count({
      where: { nightSecurity: { contains: 'inseguro' } }
    });
    response = `Cerca de ${insecureNight} residentes sentem-se inseguros à noite.`;
  } else if (lowerCaseMessage.includes("quem é você") || lowerCaseMessage.includes("o que você faz")) {
    response = "Eu sou um chatbot do sistema de Análise da Vitimização Criminal, projetado para fornecer informações sobre os dados coletados.";
  }

  return response;
}
