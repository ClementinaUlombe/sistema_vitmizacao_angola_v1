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
  const todosGraficos = [
    { titulo: "Distribuição por Bairro", imagem: "/BAIRRO.png", descricao: "Densidade por zona do Município.", analise: "O Munícipio da Samba lidera em representatividade na amostra atual." },
    { titulo: "Faixa Etária", imagem: "/IDADE.png", descricao: "Idade dos inquiridos.", analise: "A análise geracional revela padrões distintos de medo do crime." },
    { titulo: "Nível de Escolaridade", imagem: "/ESCOLARIDADE.png", descricao: "Perfil académico.", analise: "Dados mostram a diversidade intelectual da comunidade estudada." },
    { titulo: "Distribuição por Género", imagem: "/GENERO.png", descricao: "Masculino vs Feminino.", analise: "Diferenças marcantes na percepção de segurança noturna." },
    { titulo: "Ocupação Profissional", imagem: "/OCUPAÇÃO.png", descricao: "Atividade principal.", analise: "Trabalhadores e estudantes são os grupos mais ativos na pesquisa." },
    { titulo: "Situação de Residência", imagem: "/RESIDENCIA.png", descricao: "Estabilidade habitacional.", analise: "A permanência longa no bairro fortalece os laços de vizinhança." },
    { titulo: "Ocorrências nos Últimos Meses", imagem: "/ULTIMOSMESES.png", descricao: "Frequência mensal de incidentes.", analise: "A variação temporal indica picos de criminalidade em períodos específicos." },
    { titulo: "Tipo de Crime", imagem: "/TIPODECRIME.png", descricao: "Natureza das infrações reportadas.", analise: "A classificação dos delitos ajuda a direcionar estratégias de prevenção." },
    { titulo: "Taxa de Denúncia", imagem: "/TAXADENUNCIA.png", descricao: "Percentual de casos levados às autoridades.", analise: "A sub-notificação continua a ser um desafio para a estatística criminal." },
    { titulo: "Sugestões de Medidas", imagem: "/sugestoes de medidas.png", descricao: "Recomendações da comunidade para segurança.", analise: "A participação popular é fundamental para políticas públicas eficazes." },
    { titulo: "Sensação de Segurança (Noite)", imagem: "/SENSACÃODESEGURANCA A NOITE.png", descricao: "Percepção de risco no período nocturno.", analise: "A iluminação pública influencia diretamente no sentimento de segurança." },
    { titulo: "Sensação de Segurança Geral", imagem: "/SENSAÇÃODASEGURANCA.png", descricao: "Avaliação subjetiva da tranquilidade pública.", analise: "O clima de segurança geral reflete a qualidade de vida no município." },
    { titulo: "Relação entre Vizinhos", imagem: "/relacao entre vizinhos.png", descricao: "Interação e coesão social no bairro.", analise: "Fortes laços comunitários atuam como uma barreira natural contra o crime." },
    { titulo: "Presença Policial", imagem: "/presenca policial.png", descricao: "Visibilidade e patrulhamento na zona.", analise: "A frequência das patrulhas é correlacionada com a redução da percepção de medo." },
    { titulo: "Motivo da Denúncia", imagem: "/MOTIVODENDENUCIA.png", descricao: "Fatores que impulsionam o reporte criminal.", analise: "A busca por justiça e recuperação de bens são os principais motores." },
    { titulo: "Identificação do Estudo", imagem: "/IDENTIFICACAODAEMPRESA.png", descricao: "Dados institucionais da pesquisa.", analise: "Informações sobre a metodologia e origem dos dados apresentados." },
    { titulo: "Horário das Ocorrências", imagem: "/horáriodia.png", descricao: "Momentos de maior incidência criminal.", analise: "Identificar horários críticos permite otimizar o policiamento preventivo." },
    { titulo: "Frequência de Crimes", imagem: "/frequenciarecebida.png", descricao: "Recorrência de vitimização na amostra.", analise: "A análise da recorrência ajuda a identificar vítimas em potencial." },
    { titulo: "Eficácia da Polícia", imagem: "/eficacia da policia.png", descricao: "Desempenho percebido das forças de ordem.", analise: "A avaliação da eficiência policial varia de acordo com o tempo de resposta." },
    { titulo: "Confiança no Tratamento", imagem: "/confiaca no tratamento policial.png", descricao: "Expectativa de justiça no atendimento.", analise: "O tratamento humanizado nas esquadras aumenta a taxa de denúncias." },
    { titulo: "Comparativo Noite e Dia", imagem: "/COMPARATIVO NOITE E DIA.png", descricao: "Diferenças perceptivas por período.", analise: "Contrastes significativos entre a percepção diurna e nocturna." },
    { titulo: "Comparação Internacional", imagem: "/COMPARAÇÃOINTERNACIONAL.png", descricao: "Enquadramento global dos indicadores.", analise: "Como o Município da Samba se posiciona em relação a padrões globais." },
    { titulo: "Anos Anteriores", imagem: "/COMPARACAO ANOS ANTERIORES.png", descricao: "Evolução temporal da segurança.", analise: "Tendências históricas que indicam melhoria ou agravamento da situação." },
    { titulo: "Interação Policial", imagem: "/como foi a interacao com a policia.png", descricao: "Experiência direta com as autoridades.", analise: "O feedback sobre a interação policial é vital para o treino institucional." },
    { titulo: "Categoria de Delitos", imagem: "/categorai.png", descricao: "Agrupamento das ocorrências por gravidade.", analise: "Diferenciação necessária entre crimes contra a propriedade e contra as pessoas." },
    { titulo: "Avaliação do Bairro", imagem: "/avaliacao no bairro.png", descricao: "Classificação da segurança local.", analise: "A percepção local é o melhor termómetro da eficácia das medidas de segurança." },
    { titulo: "Avaliação de Gravidade", imagem: "/avaliacao de gravidade.png", descricao: "Peso percebido de cada incidente.", analise: "Impacto psicológico e material dos crimes na vida das vítimas." }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AppHeader />
      <main className="flex-grow py-16 px-6 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16 space-y-4">
            <h1 className="text-4xl sm:text-6xl font-bold text-foreground">Análise Detalhada de Gráficos</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Apresentação científica dos 28 indicadores de vitimização. Explore cada gráfico para uma compreensão profunda da segurança no Município da Samba.
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
