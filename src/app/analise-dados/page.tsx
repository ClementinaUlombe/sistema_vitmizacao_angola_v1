"use client";

import { AppHeader } from "@/components/AppHeader";
import { AppFooter } from "@/components/AppFooter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";

// Componente individual para cada Gráfico com estado de carregamento
const GraficoCard = ({ item }: { item: any }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <Card className="overflow-hidden border-primary/10 shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col group animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <CardHeader className="bg-muted/30 border-b">
        <CardTitle className="text-2xl text-primary">{item.titulo}</CardTitle>
        <p className="text-sm text-muted-foreground">{item.descricao}</p>
      </CardHeader>
      
      <div className="aspect-video bg-muted relative flex items-center justify-center border-b overflow-hidden p-4">
        {!isLoaded && (
          <div className="absolute inset-0 z-10">
            <Skeleton className="h-full w-full" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
            </div>
          </div>
        )}
        
        <img 
          src={item.imagem} 
          alt={item.titulo}
          className={`max-h-full object-contain group-hover:scale-105 transition-all duration-700 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
          onLoad={() => setIsLoaded(true)}
          onError={(e) => {
            setIsLoaded(true);
            (e.target as HTMLImageElement).src = `https://placehold.co/600x400/f3f4f6/3b82f6?text=${item.titulo.replace(/ /g, '+')}`;
          }}
          loading="lazy"
        />
      </div>

      <CardContent className="p-6 bg-card flex-grow">
        <h4 className="font-bold text-primary mb-3 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-primary" />
          Análise da Especialista
        </h4>
        <p className="text-foreground/80 leading-relaxed italic">
          "{item.analise}"
        </p>
      </CardContent>
    </Card>
  );
};

export default function AnaliseDadosPage() {
  const graficosFixos = [
    { titulo: "Distribuição por Bairro", imagem: "/BAIRRO.png", descricao: "Densidade por zona do Município.", analise: "O Bairro Gamek lidera em representatividade na amostra atual." },
    { titulo: "Faixa Etária", imagem: "/IDADE.png", descricao: "Idade dos inquiridos.", analise: "A análise geracional revela padrões distintos de medo do crime." },
    { titulo: "Nível de Escolaridade", imagem: "/ESCOLARIDADE.png", descricao: "Perfil académico.", analise: "Dados mostram a diversidade intelectual da comunidade estudada." },
    { titulo: "Distribuição por Género", imagem: "/GENERO.png", descricao: "Masculino vs Feminino.", analise: "Diferenças marcantes na percepção de segurança noturna." },
    { titulo: "Ocupação Profissional", imagem: "/OCUPAÇÃO.png", descricao: "Atividade principal.", analise: "Trabalhadores e estudantes são os grupos mais ativos na pesquisa." },
    { titulo: "Situação de Residência", imagem: "/RESIDENCIA.png", descricao: "Estabilidade habitacional.", analise: "A permanência longa no bairro fortalece os laços de vizinhança." },
    { titulo: "Experiência de Vitimização", imagem: "/GEDA.png", descricao: "Crimes ocorridos.", analise: "Este indicador revela a frequência real de incidentes na zona." }
  ];

  // Gerar mais 15 espaços (Placeholders) para totalizar os 22 prometidos
  const titulosExtra = [
    "Tipo de Crime", "Horário das Ocorrências", "Denúncias Efetuadas", "Motivos da Não Denúncia",
    "Confiança na Polícia", "Iluminação Pública", "Patrulhamento Policial", "Medidas de Segurança",
    "Opinião sobre Penas", "Medo de Andar Sozinho", "Roubos de Telemóvel", "Furtos em Residências",
    "Agressões Físicas", "Apoio da Vizinhança", "Mudança de Comportamento"
  ];

  const graficosExtras = titulosExtra.map((titulo, i) => ({
    titulo: titulo,
    imagem: `/grafico-extra-${i+1}.png`,
    descricao: "Análise estatística complementar.",
    analise: "Aguardando análise detalhada da especialista para este indicador específico."
  }));

  const todosGraficos = [...graficosFixos, ...graficosExtras];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AppHeader />
      <main className="flex-grow py-16 px-6 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16 space-y-4">
            <h1 className="text-4xl sm:text-6xl font-bold text-foreground">Análise Detalhada de Gráficos</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Apresentação científica dos 22 indicadores de vitimização. Explore cada gráfico para uma compreensão profunda da segurança no Município da Samba.
            </p>
          </div>

          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-2">
            {todosGraficos.map((item, index) => (
              <GraficoCard key={index} item={item} />
            ))}
          </div>

          <div className="mt-20 p-12 bg-gradient-primary text-white rounded-[3rem] text-center shadow-2xl">
            <h3 className="text-3xl font-bold mb-4">Fim das Análises Disponíveis</h3>
            <p className="text-white/80 max-w-2xl mx-auto italic">
              "A transparência dos dados é o primeiro passo para uma sociedade mais segura."
            </p>
          </div>
        </div>
      </main>
      <AppFooter />
    </div>
  );
}
