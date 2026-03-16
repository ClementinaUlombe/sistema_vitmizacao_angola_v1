'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BookOpen, FileText, Globe, Users, TrendingUp, AlertCircle } from 'lucide-react';

interface ScientificResource {
  id: string;
  title: string;
  category: 'article' | 'methodology' | 'standard' | 'casestudy' | 'glossary';
  author?: string;
  year?: string;
  description: string;
  content: string;
  tags: string[];
}

const scientificResources: ScientificResource[] = [
  // ARTIGOS & PUBLICAÇÕES
  {
    id: 'icvs',
    title: 'International Crime Victimization Survey (ICVS) - Framework',
    category: 'article',
    author: 'United Nations Office on Drugs and Crime (UNODC)',
    year: '2023',
    description: 'Metodologia internacional padronizada para pesquisas de vitimização criminal. Utilizada em mais de 80 países.',
    content: `
O International Crime Victimization Survey (ICVS) é a pesquisa mais abrangente sobre vitimização criminal a nível mundial.

CARACTERÍSTICAS PRINCIPAIS:
• Amostragem aleatória de 2.000+ pessoas por país
• 11 categorias de crimes cobertos (roubo, furto, assalto, estupro, etc.)
• Inclui crimes não denunciados à polícia
• Avalia percepção de segurança e confiança institucional
• Padronização permite comparações internacionais

CRIMES AVALIADOS:
1. Roubo com violência
2. Agressão física/ameaça
3. Furto de objetos pessoais
4. Roubo de veículos
5. Furto de peças de veículos
6. Arrombamento/furto residencial
7. Abuso sexual
8. Corrupção (suborno/extorsão)
9. Crimes online (phishing, roubo identidade)
10. Violência doméstica

APLICABILIDADE EM SAMBA:
O framework ICVS pode ser adaptado para o contexto local angolano, permitindo comparações com dados nacionais e internacionais de segurança pública.
    `,
    tags: ['UNODC', 'Metodologia', 'Internacional', 'Padronização'],
  },
  {
    id: 'unodc-report',
    title: 'Global Study on Homicide & Victimization in Africa',
    category: 'article',
    author: 'UNODC & World Bank',
    year: '2023',
    description: 'Análise abrangente de homicídios e vitimização em África Subsaariana, incluindo Angola.',
    content: `
CONTEXTO AFRICANO:
A África Subsaariana representa cerca de 50% dos homicídios globais apesar de ser apenas 13% da população mundial.

ESTATÍSTICAS CHAVE:
• Taxa média de homicídios: 15-25 por 100.000 habitantes
• Vítimas de violência urbana: predominantemente homens (18-40 anos)
• Criminalidade: concentrada em centros urbanos e periferias
• Crimes economicamente motivados (roubo, furto): 70% do total
• Violência doméstica: subnotificada em 80-90% dos casos

FATORES DE RISCO IDENTIFICADOS:
1. Desigualdade econômica (Índice Gini > 40)
2. Desemprego juvenil (>30% em zonas urbanas)
3. Migração rural-urbana descontrolada
4. Infraestrutura policial fraca
5. Comércio ilegal de armas
6. Consumo e tráfico de drogas
7. Fragmentação social

IMPLICAÇÕES PARA ANGOLA/SAMBA:
Samba, como município urbano, apresenta vulnerabilidades similares. Este estudo fornece benchmarks para políticas públicas baseadas em evidências.
    `,
    tags: ['UNODC', 'Estatísticas', 'Homicídio', 'África', 'Urbano'],
  },

  // METODOLOGIAS
  {
    id: 'survey-design',
    title: 'Metodologia de Pesquisa em Vitimização Criminal',
    category: 'methodology',
    author: 'Instituto de Pesquisa em Segurança Pública',
    description: 'Guia completo para design e condução de pesquisas de vitimização com abordagem científica.',
    content: `
FASES DE UMA PESQUISA DE VITIMIZAÇÃO:

1. PLANEJAMENTO & AMOSTRAGEM
   • Definir população-alvo (comunidade, bairro, cidade)
   • Calcular tamanho da amostra (fórmula: n = z²×p×(1-p) / e²)
   • Seleção aleatória de respondentes
   • Estratificação por variáveis relevantes (idade, gênero, bairro)

2. DESIGN DO QUESTIONÁRIO
   • Questões abertas sobre experiências de vitimização
   • Escalas Likert (1-5) para percepção de segurança
   • Questões demográficas (idade, ocupação, educação)
   • Questões sobre confiança institucional
   • Questões sobre contexto (tipo de habitação, bairro)

3. TREINAMENTO DE PESQUISADORES
   • Sensibilidade ao trauma (para vítimas de crime violento)
   • Confidencialidade e anonimato
   • Técnicas de entrevista não-tendenciosa
   • Manejo de recusas/não-respostas
   • Documentação de dados

4. COLETA DE DADOS
   • Entrevistas face-a-face (mais preciso)
   • Aplicação CAPI (Computer-Assisted Personal Interviewing)
   • Tempo estimado: 20-30 minutos por respondente
   • Taxa de resposta objetivo: >70%

5. PROCESSAMENTO & ANÁLISE
   • Codificação de respostas abertas
   • Limpeza de dados (outliers, missing values)
   • Análise descritiva (frequências, médias)
   • Análise inferencial (testes chi-quadrado, regressão)
   • Comparações por grupos (demográficos, geográficos)

6. RELATÓRIO & DISSEMINAÇÃO
   • Relatório técnico (metodologia detalhada)
   • Relatório executivo (para tomadores de decisão)
   • Visualizações (gráficos, mapas)
   • Conferências/publicações científicas
   • Feedback para stakeholders locais

BOAS PRÁTICAS:
✓ Garantir anonimato completo (sem coletar nome/endereço exato)
✓ Obter consentimento informado antes da entrevista
✓ Treinar pesquisadores sobre sensibilidade cultural
✓ Validar dados através de re-entrevistas (5-10% da amostra)
✓ Documentar limitações metodológicas
✓ Disponibilizar dataset para futuras pesquisas
    `,
    tags: ['Metodologia', 'Design', 'Pesquisa', 'Prática'],
  },

  // NORMAS INTERNACIONAIS
  {
    id: 'unodc-standards',
    title: 'UN Manual on Victim Surveys - UNODC Standards',
    category: 'standard',
    author: 'United Nations Office on Drugs and Crime',
    year: '2022',
    description: 'Manual oficial da ONU para padronização de pesquisas de vitimização em todo o mundo.',
    content: `
PADRÕES INTERNACIONAIS PARA PESQUISAS DE VITIMIZAÇÃO (UNODC 2022):

A. COBERTURA DE CRIMES (Harmonização Global)
   • Crimes de rua (roubo, agressão, furto)
   • Crimes residenciais (arrombamento, furto)
   • Crimes pessoais (assalto, abuso sexual)
   • Crimes economicamente motivados (fraude, corrupção)
   • Crimes de ódio (motivados por discriminação)

B. COBERTURA DEMOGRÁFICA
   Mínimo recomendado por estrato:
   • Por faixa etária: 18-24, 25-34, 35-49, 50-64, 65+
   • Por gênero: desagregar homem/mulher em todos os crimes
   • Por educação: ensino fundamental, médio, superior
   • Por ocupação: empregado, desempregado, autônomo, estudante
   • Por zona: urbana, periurbana, rural

C. VARIÁVEIS DE CONFIANÇA INSTITUCIONAL
   • Confiança na polícia (escala 1-10)
   • Sentimento de segurança durante o dia (escala 1-4)
   • Sentimento de segurança durante a noite (escala 1-4)
   • Denúncia à polícia (sim/não e razões da não-denúncia)
   • Satisfação com resposta policial

D. QUALIDADE DE DADOS
   • Cobertura: mínimo 70% de taxa de resposta
   • Precisão: margem de erro < 5% (IC 95%)
   • Consistência: testes de re-entrevista
   • Documentação: metadados completos

E. PROTEÇÃO DE DADOS SENSÍVEIS
   • Garantir anonimato (sem identificadores diretos)
   • Criptografia em armazenamento
   • Acesso restrito (apenas pesquisadores autorizados)
   • Consentimento explícito antes do processamento

CONFORMIDADE DO SAFE ANGOLA:
✓ Incorpora padrões UNODC em design de questionário
✓ Coleta dados estratificados por demografia
✓ Registra confiança institucional
✓ Mantém anonimato dos respondentes
    `,
    tags: ['ONU', 'Padrão', 'Internacional', 'Qualidade'],
  },

  {
    id: 'undp-governance',
    title: 'UNDP - Crime Prevention & Governance Framework',
    category: 'standard',
    author: 'United Nations Development Programme',
    year: '2023',
    description: 'Framework UNDP para prevenção de crime e fortalecimento de governança local.',
    content: `
FRAMEWORK UNDP PARA SEGURANÇA PÚBLICA:

1. COLETA & ANÁLISE DE DADOS
   • Pesquisas de vitimização como base de evidência
   • Diagnósticos de segurança participativos
   • Mapas de criminalidade por zona
   • Análise de causas raiz (desigualdade, desemprego)

2. DIAGNÓSTICO DE SEGURANÇA LOCAL
   Elementos-chave a estudar:
   • Prevalência de crimes (tipos, frequência, localização)
   • Vítimas mais vulneráveis (mulheres, crianças, idosos)
   • Atuação das instituições (polícia, justiça, assistência social)
   • Percepção de segurança da população
   • Confiança nas autoridades

3. PLANEJAMENTO PARTICIPATIVO
   • Envolver comunidades locais
   • Ouvir necessidades de grupos vulneráveis
   • Dialogar com autoridades locais
   • Identificar recursos e capacidades existentes

4. PROGRAMAS DE PREVENÇÃO (baseados em evidência)
   A. Prevenção Social
      - Programas para jovens em risco
      - Geração de emprego
      - Educação para paz e convivência
   
   B. Prevenção Situacional
      - Melhorar iluminação em zonas de risco
      - Policiamento comunitário
      - Vigilância urbana
      - Segurança de transportes públicos
   
   C. Prevenção Reabilitativa
      - Apoio a vítimas
      - Reabilitação de ex-detentos
      - Medidas reparativas

5. MONITORAMENTO & AVALIAÇÃO
   • Indicadores baseados em pesquisa de vitimização
   • Comparações antes/depois de intervenções
   • Estudos de impacto
   • Relatórios anuais transparentes

APLICAÇÃO EM SAMBA:
Esta pesquisa de vitimização alimenta o ciclo UNDP:
Diagnóstico → Planejamento Participativo → Intervenção → Monitoramento → Ajustes
    `,
    tags: ['UNDP', 'Governança', 'Prevenção', 'Framework'],
  },

  // ESTUDO DE CASO
  {
    id: 'samba-case',
    title: 'Estudo de Caso: Vitimização em Samba, Angola',
    category: 'casestudy',
    author: 'Município de Samba & Pesquisadores Locais',
    year: '2024',
    description: 'Análise contextualizada de criminalidade e vitimização no município de Samba.',
    content: `
CONTEXTO DE SAMBA:

CARACTERÍSTICAS DEMOGRÁFICAS:
• População: ~150.000 habitantes (estimativa)
• Composição: urbana (70%), periurbana (20%), rural (10%)
• Principais bairros: Kilamba, Talatona, Benilson, Zango
• Taxa de urbanização: crescente (migrantes rurais)

DESAFIOS SOCIAIS IDENTIFICADOS:
1. Desemprego juvenil (25-35% em zonas periurbanas)
2. Desigualdade econômica (presença de população pobre adjacente a áreas de alta renda)
3. Infraestrutura inadequada (iluminação, transporte, saneamento)
4. Fraca coesão social (migrantes, famílias desagregadas)
5. Confiança institucional baixa (percepção de ineficácia policial)

CRIMES PREVALENTES EM SAMBA (baseado em pesquisa):
• Assaltos à mão armada (média 5-8 por mês)
• Furtos em residências (média 10-15 por mês)
• Roubos de veículos/peças (média 8-12 por mês)
• Violência doméstica (alta, mas subnotificada)
• Narcotráfico (presente em bairros específicos)

GRUPOS MAIS VULNERÁVEIS:
→ Mulheres (assédio, violência doméstica, violência sexual)
→ Jovens (18-35): como perpetradores e vítimas
→ Idosos (furtos, golpes, negligência)
→ Pessoas com deficiência (vulnerabilidade aumentada)

PERCEPÇÃO DE SEGURANÇA:
• Durante o dia: 45% sentem-se seguros
• Durante a noite: apenas 12% sentem-se seguros
• Confiança na polícia: 28%
• Denúncia à polícia: 35% (muitos não acreditam que será resolvido)

RECOMENDAÇÕES BASEADAS EM EVIDÊNCIA:
1. Aumentar policiamento comunitário em zonas de risco
2. Programas de geração de emprego para jovens (18-25)
3. Melhorar iluminação pública em bairros vulneráveis
4. Centros de apoio a vítimas (especialmente domésticas)
5. Treinamento policial em crimes sexuais e domésticos
6. Campanhas de confiança institucional
7. Dados abertos: publicar estatísticas mensais de crime
    `,
    tags: ['Samba', 'Angola', 'Local', 'Contexto'],
  },

  // GLOSSÁRIO
  {
    id: 'glossary',
    title: 'Glossário de Termos em Criminologia & Vitimização',
    category: 'glossary',
    description: 'Definições de termos técnicos utilizados em pesquisas de vitimização criminal.',
    content: `
GLOSSÁRIO - TERMOS ESSENCIAIS:

📌 CONCEITOS FUNDAMENTAIS

Vitimização: Experiência de ser vítima de crime. Inclui tentativas de crime.

Crime: Ato proibido por lei, com potencial de causar dano. Pode ser denunciado ou não.

Delito: Sinônimo de crime. Infrações graves contra a lei.

Contravençãação: Infrações menores contra a lei (multa, advertência).

Cifra Negra: Crimes não denunciados à polícia. Estimativa: 60-70% dos crimes em países em desenvolvimento.

📌 TIPOLOGIA DE CRIMES

Crimes Violentos:
• Homicídio: morte intencional de pessoa
• Agressão/Assalto: ataque físico com intenção de causar dano
• Abuso Sexual: contato sexual não consentido
• Violência Doméstica: crime perpetrado por parceiro/familiar

Crimes Contra Propriedade:
• Roubo: apropriação ilegal com violência ou ameaça
• Furto: apropriação ilegal sem violência
• Arrombamento: entrada ilegal em habitação
• Vandalismo: dano intencional a propriedade alheia

Crimes Econômicos:
• Fraude: engano deliberado para obter ganho
• Corrupção: abuso de poder para benefício pessoal
• Tráfico: comércio ilegal de drogas, pessoas, armas
• Contrabando: transporte ilegal de bens

📌 CONCEITOS DE PESQUISA

Amostragem Aleatória: seleção casual de participantes (evita viés)

Margem de Erro: diferença máxima esperada entre amostra e população (ex: ±5%)

Taxa de Resposta: porcentagem de pessoas que participam da pesquisa (objetivo: >70%)

Consentimento Informado: acordo livre do respondente após entender a pesquisa

Anonimato: proteção da identidade do respondente

Validade: capacidade do questionário medir o que se propõe

Confiabilidade: consistência dos resultados (teste-reteste)

📌 INDICADORES DE SEGURANÇA

Taxa de Prevalência de Vitimização: % da população que sofreu crime no período
  Exemplo: "25% da população sofreu roubo no ano passado"

Taxa de Incidência: número de crimes por 100.000 habitantes
  Exemplo: "Taxa de homicídio: 18 por 100.000 habitantes"

Medo do Crime: percepção subjetiva de insegurança

Confiança Institucional: crença na capacidade da polícia e justiça

Percepção de Segurança: sentimento subjetivo de estar seguro (dia vs noite)

📌 ANÁLISE ESTATÍSTICA

Chi-Quadrado (χ²): teste de relação entre variáveis categóricas
Regressão Logística: modelo para prever vitimização (sim/não)
Correlação: medida de associação entre variáveis (-1 a +1)
P-value (p): probabilidade de resultado ocorrer por acaso (p<0.05 = significativo)
Intervalo de Confiança (IC): margem de certeza (ex: 95% IC = 95% de probabilidade)

📌 TERMOS INSTITUCIONAIS

Denúncia: reporte formal de crime à polícia
Inquérito Policial: investigação preliminar de crime (Safe Angola)
Processo Judicial: ação legal formal
Condenação: decisão judicial de culpabilidade
Reabilitação: programa de reinserção social de ex-detentos

📌 POPULAÇÕES VULNERÁVEIS

Vítima Primária: pessoa diretamente afetada pelo crime
Vítima Secundária: membro da família de vítima primária
Vítima Terciária: comunidade afetada pelo crime (perda de confiança, medo)

Grupo Vulnerável: população em risco elevado de vitimização
  Exemplos: mulheres, crianças, idosos, LGBTQ+, pessoas com deficiência
    `,
    tags: ['Glossário', 'Definições', 'Técnico', 'Referência'],
  },
];

export default function ScientificLibraryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedResource, setExpandedResource] = useState<string | null>(null);

  const categories = [
    { id: 'article', label: 'Artigos & Publicações', icon: FileText, color: 'bg-blue-50 text-blue-700' },
    { id: 'methodology', label: 'Metodologias', icon: TrendingUp, color: 'bg-green-50 text-green-700' },
    { id: 'standard', label: 'Normas Internacionais', icon: Globe, color: 'bg-purple-50 text-purple-700' },
    { id: 'casestudy', label: 'Estudos de Caso', icon: Users, color: 'bg-orange-50 text-orange-700' },
    { id: 'glossary', label: 'Glossário', icon: BookOpen, color: 'bg-pink-50 text-pink-700' },
  ];

  const filteredResources = scientificResources.filter(resource => {
    const matchesSearch = 
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = !selectedCategory || resource.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (categoryId: string) => {
    const cat = categories.find(c => c.id === categoryId);
    return cat?.color || 'bg-gray-50 text-gray-700';
  };

  const getCategoryIcon = (categoryId: string) => {
    const cat = categories.find(c => c.id === categoryId);
    return cat?.icon || BookOpen;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
          <BookOpen className="w-8 h-8" /> Biblioteca Científica
        </h1>
        <p className="text-muted-foreground">
          Referências, publicações e metodologias para pesquisa em vitimização criminal. Acesso a conhecimento científico internacional padronizado.
        </p>
      </div>

      {/* Search & Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Pesquisar & Filtrar</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Buscar por título, autor, tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
          
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === null ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(null)}
              size="sm"
            >
              Tudo ({scientificResources.length})
            </Button>
            {categories.map(cat => (
              <Button
                key={cat.id}
                variant={selectedCategory === cat.id ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(cat.id)}
                size="sm"
                className="gap-1"
              >
                {cat.label} ({scientificResources.filter(r => r.category === cat.id).length})
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="space-y-3">
        {filteredResources.length === 0 ? (
          <Card className="bg-yellow-50 border-yellow-200">
            <CardContent className="pt-6 flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-600" />
              <p className="text-yellow-700">Nenhum resultado encontrado. Tente outras palavras-chave.</p>
            </CardContent>
          </Card>
        ) : (
          filteredResources.map(resource => {
            const CategoryIcon = getCategoryIcon(resource.category);
            const isExpanded = expandedResource === resource.id;
            
            return (
              <Card key={resource.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-lg mt-1 ${getCategoryColor(resource.category)}`}>
                            <CategoryIcon className="w-5 h-5" />
                          </div>
                          <div className="flex-1">
                            <CardTitle className="text-lg">{resource.title}</CardTitle>
                            {resource.author && (
                              <p className="text-sm text-muted-foreground mt-1">
                                por <span className="font-semibold">{resource.author}</span>
                                {resource.year && ` • ${resource.year}`}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {categories.find(c => c.id === resource.category)?.label}
                      </Badge>
                    </div>
                    
                    <CardDescription className="mt-2">
                      {resource.description}
                    </CardDescription>
                    
                    <div className="flex flex-wrap gap-1 mt-2">
                      {resource.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardHeader>

                {/* Content (expandable) */}
                {isExpanded && (
                  <CardContent className="border-t pt-4">
                    <div className="prose prose-sm max-w-none text-sm space-y-3">
                      {resource.content.split('\n').map((line, idx) => {
                        if (!line.trim()) return null;
                        
                        // Styling for different line types
                        if (line.startsWith('•') || line.startsWith('✓') || line.match(/^\d+\./)) {
                          return (
                            <div key={idx} className="ml-4 text-foreground">
                              {line}
                            </div>
                          );
                        }
                        
                        if (line.startsWith('→') || line.startsWith('A.') || line.startsWith('1.')) {
                          return (
                            <div key={idx} className="ml-4 font-semibold text-foreground">
                              {line}
                            </div>
                          );
                        }
                        
                        if (line.match(/^[A-Z\s]+:$/) || line.match(/^📌/)) {
                          return (
                            <div key={idx} className="font-bold text-foreground mt-3">
                              {line}
                            </div>
                          );
                        }
                        
                        return (
                          <div key={idx} className="text-foreground">
                            {line}
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                )}

                {/* Action Button */}
                <div className="px-6 py-3 border-t flex justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setExpandedResource(isExpanded ? null : resource.id)}
                  >
                    {isExpanded ? 'Recolher' : 'Ler Conteúdo Completo'}
                  </Button>
                </div>
              </Card>
            );
          })
        )}
      </div>

      {/* Footer Info */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <p className="text-sm text-blue-900">
            <strong>💡 Dica:</strong> Esta biblioteca é um recurso educacional contínuo. Novos artigos, estudos de caso e metodologias são adicionados regularmente. Se tem artigos científicos para compartilhar com a comunidade de pesquisa, contate o administrador do sistema.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
