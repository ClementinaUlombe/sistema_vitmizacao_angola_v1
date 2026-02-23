"use client";

import React from 'react';

const ChatbotInterface: React.FC = () => {
  return (
    <div className="w-full flex flex-col space-y-4">
      <h2 className="text-2xl font-bold text-primary">Portal de Segurança — Integração Remota</h2>
      <div className="w-full h-[800px] border border-border rounded-xl shadow-lg overflow-hidden bg-card">
        <iframe
          src="https://indice.ed-consulting.ao/embed?api_token=10wzj22QTt9DZkyvK7ByVNwOX_gbOS4aqZbDzoTzOik"
          width="100%"
          height="100%"
          style={{ border: "none" }}
          title="Centro de Análise Criminal - Teste Remoto"
          className="w-full h-full"
        />
      </div>
    </div>
  );
};

export default ChatbotInterface;
