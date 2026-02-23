"use client";

import ChatbotInterface from "@/components/ChatbotInterface";

export default function DashboardChatbotPage() {
  return (
    <div className="p-4 md:p-6 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col space-y-2">
          <h2 className="text-3xl font-extrabold tracking-tight text-primary">Centro de Análise Criminal</h2>
          <p className="text-muted-foreground text-lg">
            Aceda ao sistema de inteligência criminal através da nossa integração remota.
          </p>
        </div>
        
        <ChatbotInterface />
      </div>
    </div>
  );
}
