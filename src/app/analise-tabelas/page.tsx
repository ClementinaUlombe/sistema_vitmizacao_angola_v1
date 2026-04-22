"use client";

import { AppHeader } from "@/components/AppHeader";
import { AppFooter } from "@/components/AppFooter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const TabelaSecao = ({ item }: { item: any }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <Card className="overflow-hidden border-primary/10 shadow-lg hover:shadow-2xl transition-all duration-500 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <CardHeader className="bg-gradient-primary text-white text-center">
        <CardTitle className="text-3xl">{item.titulo}</CardTitle>
        <p className="text-white/80 text-lg">{item.descricao}</p>
      </CardHeader>
      
      <CardContent className="p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Lado da Imagem */}
          <div className="space-y-6">
            <div className="aspect-video bg-muted relative flex items-center justify-center border-4 border-primary/10 rounded-[2rem] overflow-hidden p-4 shadow-2xl bg-white">
              {!isLoaded && (
                <div className="absolute inset-0 z-10">
                  <Skeleton className="h-full w-full" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                  </div>
                </div>
              )}
              
              <img 
                src={item.imagem} 
                alt={item.titulo}
                className={`max-h-full w-auto object-contain transition-all duration-1000 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                onLoad={() => setIsLoaded(true)}
                onError={(e) => {
                  setIsLoaded(true);
                  (e.target as HTMLImageElement).src = `https://placehold.co/800x600/f3f4f6/3b82f6?text=${item.titulo.replace(/ /g, '+')}`;
                }}
                loading="lazy"
              />
            </div>
            
            <div className="p-8 bg-gradient-to-br from-primary/5 to-transparent rounded-[2rem] border border-primary/10 shadow-inner relative">
              <div className="absolute -top-4 left-8 bg-primary text-white px-4 py-1 rounded-full text-sm font-bold shadow-md">
                Análise Científica
              </div>
              <p className="text-lg text-foreground/90 leading-relaxed italic pt-2">
                "{item.analise}"
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default function AnaliseTabelasPage() {
  const tabelas20 = [
    { 
      titulo: "Distribuição por Faixa Etária", 
      imagem: "/distribuicaofaixaetaria.png", 
      descricao: "Perfil etário dos cidadãos inquiridos no estudo.", 
      analise: "A pirâmide etária da amostra indica uma base jovem, o que exige políticas de segurança focadas na juventude e na prevenção primária."
    },
    { 
      titulo: "Distribuição por Género", 
      imagem: "/tabelagenero.png", 
      descricao: "Composição da amostra por género biológico.", 
      analise: "A representação equilibrada entre os géneros permite uma visão holística das preocupações de segurança que afectam tanto homens como mulheres."
    },
    { 
      titulo: "Distribuição por Bairro", 
      imagem: "/tabelabairro.png", 
      descricao: "Origem geográfica dos respondentes dentro do município.", 
      analise: "A dispersão geográfica dos dados cobre as principais zonas críticas, permitindo uma análise espacial da criminalidade em Samba."
    },
    { 
      titulo: "Nível de Escolaridade", 
      imagem: "/tabelaescolaridade.png", 
      descricao: "Perfil instrucional dos inquiridos.", 
      analise: "Observa-se que o nível de escolaridade influencia directamente a percepção crítica sobre a eficácia das autoridades e o acesso à justiça."
    },
    { 
      titulo: "Ocupação Profissional", 
      imagem: "/tabelaocupacao.png", 
      descricao: "Situação laboral e ocupacional da amostra.", 
      analise: "Trabalhadores e estudantes constituem os grupos com maior mobilidade urbana, sendo consequentemente os mais expostos a riscos de rua."
    },
    { 
      titulo: "Situação de Residência", 
      imagem: "/tabelaresidencia.png", 
      descricao: "Relação de moradia dos participantes.", 
      analise: "A estabilidade residencial é um factor chave para o fortalecimento da vigilância informal e da coesão comunitária."
    },
    { 
      titulo: "Ocorrências nos Últimos 12 Meses", 
      imagem: "/tabela 12mese.png", 
      descricao: "Histórico de crimes sofridos no último ano.", 
      analise: "Este indicador anual é fundamental para medir a prevalência criminal e a eficácia das políticas de segurança implementadas."
    },
    { 
      titulo: "Perfil das Vítimas", 
      imagem: "/tabelavitimas.png", 
      descricao: "Dados demográficos específicos das vítimas identificadas.", 
      analise: "A caracterização detalhada das vítimas permite o desenho de estratégias de protecção focadas nos grupos mais vulneráveis."
    },
    { 
      titulo: "Índice de Revitimização", 
      imagem: "/tabelarevitimizacao.png", 
      descricao: "Frequência com que uma pessoa é vítima repetidamente.", 
      analise: "Elevados índices de revitimização sugerem a necessidade de intervenções policiais mais incisivas em locais e alvos específicos."
    },
    { 
      titulo: "Interação com Autoridades", 
      imagem: "/tabelaautoridades.png", 
      descricao: "Avaliação da resposta e atendimento das forças de segurança.", 
      analise: "A qualidade do atendimento nas esquadras é o principal factor determinante para a confiança institucional do cidadão."
    },
    { 
      titulo: "Decisão de Denunciar", 
      imagem: "/tabeladenunciar.png", 
      descricao: "Factores que impulsionam ou inibem a denúncia oficial.", 
      analise: "A sub-notificação criminal está fortemente ligada ao cepticismo quanto à resolutividade dos casos pelas autoridades."
    },
    { 
      titulo: "Detalhes da Ocorrência", 
      imagem: "/tabelaocorrencia.png", 
      descricao: "Circunstâncias, locais e períodos dos incidentes.", 
      analise: "A concentração de crimes na via pública demonstra a necessidade de reforço no patrulhamento ostensivo e iluminação."
    },
    { 
      titulo: "Pessoas Envolvidas", 
      imagem: "/tabrlaenvolicidas.png", 
      descricao: "Perfil dos agressores ou suspeitos identificados.", 
      analise: "Os dados indicam a necessidade de programas de reintegração social focados em jovens em situação de risco."
    },
    { 
      titulo: "Categorias de Delito", 
      imagem: "/tabelasorifads.png", 
      descricao: "Distribuição por gravidade e tipologia criminal.", 
      analise: "O predomínio de furtos e roubos aponta para uma criminalidade com motivações essencialmente económicas."
    },
    { 
      titulo: "Coesão e Associações", 
      imagem: "/tabelaassociacoes.png", 
      descricao: "Participação em grupos e redes de apoio comunitário.", 
      analise: "Bairros com maior participação em associações tendem a apresentar maior resiliência contra a criminalidade comum."
    },
    { 
      titulo: "Análise Circular das Horas", 
      imagem: "/tabelacircular.png", 
      descricao: "Ciclo temporal da incidência criminal nas 24 horas.", 
      analise: "A identificação de horários críticos permite a optimização dos recursos policiais nos períodos de maior risco."
    },
    { 
      titulo: "Insegurança Nocturna", 
      imagem: "/tabelanoite.png", 
      descricao: "Percepção de perigo especificamente no período da noite.", 
      analise: "O sentimento de insegurança nocturna é um factor limitador da liberdade de movimento e do desenvolvimento económico local."
    },
    { 
      titulo: "Segurança Geral", 
      imagem: "/tabelasegurnaca.png", 
      descricao: "Sentimento global de tranquilidade pública no município.", 
      analise: "A avaliação global da segurança reflecte o impacto directo das políticas públicas na vida quotidiana do cidadão."
    },
    { 
      titulo: "Factores de Insegurança", 
      imagem: "/tabelainseguranca.png", 
      descricao: "Principais causas apontadas para o sentimento de medo.", 
      analise: "A falta de iluminação e o policiamento insuficiente emergem como os principais factores que alimentam o medo do crime."
    },
    { 
      titulo: "Medidas de Protecção Adoptadas", 
      imagem: "/tabrlaadoptadas.png", 
      descricao: "Estratégias de auto-protecção utilizadas pelos moradores.", 
      analise: "O investimento privado em segurança demonstra a transferência da responsabilidade de protecção do Estado para o indivíduo."
    }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AppHeader />
      <main className="flex-grow py-16 px-6 sm:py-24 bg-muted/20">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-20 space-y-6">
            <h1 className="text-5xl sm:text-7xl font-extrabold text-foreground tracking-tight">
              Análise das <span className="text-primary">Tabelas Reais</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Consulte as tabelas estatísticas originais do estudo de vitimização. Cada tabela apresenta dados fundamentais para a compreensão da segurança no Município da Samba.
            </p>
            <div className="h-1.5 w-32 bg-primary mx-auto rounded-full" />
          </div>

          <div className="space-y-16">
            {tabelas20.map((item, index) => (
              <TabelaSecao key={index} item={item} />
            ))}
          </div>

          <div className="mt-24 p-16 bg-gradient-primary text-white rounded-[4rem] text-center shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-10">
              <svg width="240" height="240" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 200V0H200" stroke="white" strokeWidth="4"/>
              </svg>
            </div>
            <h3 className="text-4xl font-bold mb-6">Fim da Exposição de Dados</h3>
            <p className="text-white/80 max-w-3xl mx-auto italic text-xl leading-relaxed">
              "A leitura correcta destas tabelas é essencial para a fundamentação científica de qualquer intervenção social no âmbito da segurança pública."
            </p>
          </div>
        </div>
      </main>
      <AppFooter />
    </div>
  );
}
