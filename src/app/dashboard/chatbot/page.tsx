"use client";

import ChatbotInterface from "@/components/ChatbotInterface";

export default function DashboardChatbotPage() {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold text-foreground mb-4">Chatbot Interativo</h2>
      <p className="text-muted-foreground mb-6">
        Interaja com o chatbot para obter informações e insights sobre os dados.
      </p>
      <ChatbotInterface />
    </div>
  );
}
