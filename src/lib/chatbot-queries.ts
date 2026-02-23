// src/lib/chatbot-queries.ts

// Temporarily hardcoding the API token. In a production environment,
// this should be loaded from an environment variable (e.g., process.env.CHATBOT_API_TOKEN)
const API_TOKEN = '10wzj22QTt9DZkyvK7ByVNwOX_gbOS4aqZbDzoTzOik';
const BASE_URL = 'https://indice.ed-consulting.ao/api/v1';

export async function interpretAndQuery(message: string): Promise<string> {
  const lowerCaseMessage = message.toLowerCase();
  let response = "Desculpe, não consegui encontrar informações relevantes para a sua pergunta ou não entendi a questão.";

  try {
    if (lowerCaseMessage.includes('estatísticas rápidas') || lowerCaseMessage.includes('stats')) {
      // Fetch quick statistics
      const statsResponse = await fetch(`${BASE_URL}/stats`, {
        headers: {
          'X-API-Token': API_TOKEN,
        },
      });

      if (!statsResponse.ok) {
        throw new Error(`API stats responded with status ${statsResponse.status}`);
      }

      const statsData = await statsResponse.json();
      // Format statsData into a readable string
      // This is a placeholder; actual formatting depends on statsData structure
      response = `Estatísticas rápidas: ${JSON.stringify(statsData, null, 2)}`;
      
    } else {
      // Default to general query
      const queryResponse = await fetch(`${BASE_URL}/query`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Token': API_TOKEN,
        },
        body: JSON.stringify({
          query: message, // Send the original message as the query
        }),
      });

      if (!queryResponse.ok) {
        throw new Error(`API query responded with status ${queryResponse.status}`);
      }

      const queryData = await queryResponse.json();
      // Assume queryData directly contains the answer
      response = queryData.answer || JSON.stringify(queryData, null, 2);
    }
  } catch (error: any) {
    console.error("Chatbot API error:", error);
    response = "Desculpe, ocorreu um erro ao comunicar com o serviço de chatbot. Tente novamente mais tarde.";
  }

  return response;
}