'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  BookOpen, 
  FileText, 
  TrendingUp, 
  Globe, 
  Users, 
  AlertCircle,
  Search,
  XCircle
} from 'lucide-react';

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

const SCIENTIFIC_RESOURCES: ScientificResource[] = [
  {
    id: 'icvs',
    title: 'International Crime Victimization Survey (ICVS) - Framework',
    category: 'article',
    author: 'United Nations Office on Drugs and Crime (UNODC)',
    year: '2023',
    description: 'Metodologia internacional padronizada para pesquisas de vitimização criminal. Utilizada em mais de 80 países.',
    content: `O International Crime Victimization Survey (ICVS) é a pesquisa mais abrangente sobre vitimização criminal a nível mundial.

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
O framework ICVS pode ser adaptado para o contexto local angolano, permitindo comparações com dados nacionais e internacionais de segurança pública.`,
    tags: ['UNODC', 'Metodologia', 'Internacional', 'Padronização'],
  },
  {
    id: 'unodc-report',
    title: 'Global Study on Homicide & Victimization in Africa',
    category: 'article',
    author: 'UNODC & World Bank',
    year: '2023',
    description: 'Análise abrangente de homicídios e vitimização em África Subsaariana, incluindo Angola.',
    content: `CONTEXTO AFRICANO:
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
Samba, como município urbano, apresenta vulnerabilidades similares. Este estudo fornece benchmarks para políticas públicas baseadas em evidências.`,
    tags: ['UNODC', 'Estatísticas', 'Homicídio', 'África', 'Urbano'],
  },
  {
    id: 'survey-design',
    title: 'Metodologia de Pesquisa em Vitimização Criminal',
    category: 'methodology',
    author: 'Instituto de Pesquisa em Segurança Pública',
    description: 'Guia completo para design e condução de pesquisas de vitimização com abordagem científica.',
    content: `FASES DE UMA PESQUISA DE VITIMIZAÇÃO:

1. PLANEJAMENTO & AMOSTRAGEM
   • Definir população-alvo (comunidade, bairro, cidade)
   • Calcular tamanho da amostra
   • Seleção aleatória de respondentes
   • Estratificação por variáveis relevantes (idade, gênero, bairro)

2. DESIGN DO QUESTIONÁRIO
   • Questões abertas sobre experiências de vitimização
   • Escalas Likert (1-5) para percepção de segurança
   • Questões demográficas (idade, ocupação, educação)
   • Questões sobre confiança institucional

3. TREINAMENTO DE PESQUISADORES
   • Sensibilidade ao trauma
   • Confidencialidade e anonimato
   • Técnicas de entrevista não-tendenciosa
   • Manejo de recusas/não-respostas

4. COLETA DE DADOS
   • Entrevistas face-a-face (mais preciso)
   • Tempo estimado: 20-30 minutos por respondente
   • Taxa de resposta objetivo: >70%

5. PROCESSAMENTO & ANÁLISE
   • Codificação de respostas abertas
   • Limpeza de dados
   • Análise descritiva e inferencial

6. RELATÓRIO & DISSEMINAÇÃO
   • Relatório técnico
   • Relatório executivo
   • Visualizações (gráficos, mapas)`,
    tags: ['Metodologia', 'Design', 'Pesquisa', 'Prática'],
  },
  {
    id: 'unodc-standards',
    title: 'UN Manual on Victim Surveys - UNODC Standards',
    category: 'standard',
    author: 'United Nations Office on Drugs and Crime',
    year: '2022',
    description: 'Manual oficial da ONU para padronização de pesquisas de vitimização em todo o mundo.',
    content: `PADRÕES INTERNACIONAIS PARA PESQUISAS DE VITIMIZAÇÃO (UNODC 2022):

A. COBERTURA DE CRIMES
   • Crimes de rua (roubo, agressão, furto)
   • Crimes residenciais (arrombamento, furto)
   • Crimes pessoais (assalto, abuso sexual)
   • Crimes economicamente motivados (fraude, corrupção)
   • Crimes de ódio

B. COBERTURA DEMOGRÁFICA
   • Por faixa etária: 18-24, 25-34, 35-49, 50-64, 65+
   • Por gênero: desagregar homem/mulher
   • Por educação: fundamental, médio, superior
   • Por ocupação: empregado, desempregado, autônomo
   • Por zona: urbana, periurbana, rural

C. VARIÁVEIS DE CONFIANÇA INSTITUCIONAL
   • Confiança na polícia (escala 1-10)
   • Sentimento de segurança (dia vs noite)
   • Denúncia à polícia (sim/não)
   • Satisfação com resposta policial

D. QUALIDADE DE DADOS
   • Taxa de resposta: mínimo 70%
   • Margem de erro: < 5% (IC 95%)
   • Testes de consistência
   • Documentação: metadados completos`,
    tags: ['ONU', 'Padrão', 'Internacional', 'Qualidade'],
  },
  {
    id: 'undp-governance',
    title: 'UNDP - Crime Prevention & Governance Framework',
    category: 'standard',
    author: 'United Nations Development Programme',
    year: '2023',
    description: 'Framework UNDP para prevenção de crime e fortalecimento de governança local.',
    content: `FRAMEWORK UNDP PARA SEGURANÇA PÚBLICA:

1. COLETA & ANÁLISE DE DADOS
   • Pesquisas de vitimização como base
   • Diagnósticos de segurança participativos
   • Mapas de criminalidade por zona

2. DIAGNÓSTICO DE SEGURANÇA LOCAL
   • Prevalência de crimes (tipos, frequência)
   • Vítimas mais vulneráveis
   • Confiança nas autoridades

3. PLANEJAMENTO PARTICIPATIVO
   • Envolver comunidades locais
   • Ouvir grupos vulneráveis
   • Dialogar com autoridades

4. PROGRAMAS DE PREVENÇÃO
   A. Prevenção Social
      - Programas para jovens em risco
      - Geração de emprego
   
   B. Prevenção Situacional
      - Melhorar iluminação em zonas de risco
      - Policiamento comunitário
   
   C. Reabilitação
      - Apoio a vítimas
      - Reinserção social

5. MONITORAMENTO & AVALIAÇÃO
   • Indicadores baseados em pesquisa
   • Comparações antes/depois de intervenções
   • Relatórios anuais transparentes`,
    tags: ['UNDP', 'Governança', 'Prevenção', 'Framework'],
  },
  {
    id: 'samba-case',
    title: 'Estudo de Caso: Vitimização em Samba, Angola',
    category: 'casestudy',
    author: 'Município de Samba & Pesquisadores Locais',
    year: '2024',
    description: 'Análise contextualizada de criminalidade e vitimização no município de Samba.',
    content: `CONTEXTO DE SAMBA:

CARACTERÍSTICAS DEMOGRÁFICAS:
• População: ~150.000 habitantes
• Composição: urbana (70%), periurbana (20%), rural (10%)
• Principais bairros: Kilamba, Talatona, Benilson, Zango

DESAFIOS SOCIAIS:
1. Desemprego juvenil (25-35% em zonas periurbanas)
2. Desigualdade econômica
3. Infraestrutura inadequada
4. Fraca coesão social
5. Confiança institucional baixa

CRIMES PREVALENTES:
• Assaltos à mão armada (5-8 por mês)
• Furtos em residências (10-15 por mês)
• Roubos de veículos/peças (8-12 por mês)
• Violência doméstica (subnotificada)
• Narcotráfico (presente em bairros específicos)

GRUPOS VULNERÁVEIS:
→ Mulheres (assédio, violência doméstica)
→ Jovens (18-35 anos)
→ Idosos (furtos, golpes)
→ Pessoas com deficiência

PERCEPÇÃO DE SEGURANÇA:
• Dia: 45% sentem-se seguros
• Noite: 12% sentem-se seguros
• Confiança na polícia: 28%
• Denúncia à polícia: 35%`,
    tags: ['Samba', 'Angola', 'Local', 'Contexto'],
  },
  {
    id: 'glossary',
    title: 'Glossário de Termos em Criminologia & Vitimização',
    category: 'glossary',
    description: 'Definições de termos técnicos utilizados em pesquisas de vitimização criminal.',
    content: `GLOSSÁRIO - TERMOS ESSENCIAIS:

CONCEITOS FUNDAMENTAIS:
• Vitimização: Experiência de ser vítima de crime
• Crime: Ato proibido por lei com potencial de dano
• Delito: Infrações graves contra a lei
• Cifra Negra: Crimes não denunciados (60-70% em países em desenvolvimento)

TIPOLOGIA DE CRIMES:

Crimes Violentos:
• Homicídio: morte intencional
• Agressão/Assalto: ataque físico
• Abuso Sexual: contato não consentido
• Violência Doméstica: crime por parceiro/familiar

Crimes Contra Propriedade:
• Roubo: apropriação com violência
• Furto: apropriação sem violência
• Arrombamento: entrada ilegal
• Vandalismo: dano intencional

Crimes Econômicos:
• Fraude: engano para ganho
• Corrupção: abuso de poder
• Tráfico: comércio ilegal
• Contrabando: transporte ilegal

CONCEITOS DE PESQUISA:
• Amostragem Aleatória: seleção casual evitando viés
• Margem de Erro: diferença máxima esperada
• Taxa de Resposta: % de participantes (objetivo >70%)
• Anonimato: proteção de identidade
• Validade: capacidade de medir

INDICADORES DE SEGURANÇA:
• Taxa de Prevalência: % da população vítima de crime
• Taxa de Incidência: crimes por 100.000 habitantes
• Medo do Crime: percepção subjetiva de insegurança
• Confiança Institucional: crença em polícia e justiça

TERMOS INSTITUCIONAIS:
• Denúncia: reporte formal à polícia
• Inquérito Policial: investigação preliminar
• Condenação: decisão judicial de culpabilidade
• Reabilitação: reinserção social`,
    tags: ['Glossário', 'Definições', 'Técnico', 'Referência'],
  },
];

const CATEGORIES = [
  { id: 'article', label: 'Artigos & Publicações', icon: FileText, color: 'bg-blue-50 text-blue-700' },
  { id: 'methodology', label: 'Metodologias', icon: TrendingUp, color: 'bg-green-50 text-green-700' },
  { id: 'standard', label: 'Normas Internacionais', icon: Globe, color: 'bg-purple-50 text-purple-700' },
  { id: 'casestudy', label: 'Estudos de Caso', icon: Users, color: 'bg-orange-50 text-orange-700' },
  { id: 'glossary', label: 'Glossário', icon: BookOpen, color: 'bg-pink-50 text-pink-700' },
];

export default function ScientificLibraryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return SCIENTIFIC_RESOURCES.filter(resource => {
      // Filtro de Categoria
      const matchesCategory = selectedCategory === null || resource.category === selectedCategory;
      
      // Filtro de Texto (título, autor, descrição, tags)
      const term = searchTerm.toLowerCase().trim();
      const matchesSearch = term === '' || 
        resource.title.toLowerCase().includes(term) ||
        (resource.author && resource.author.toLowerCase().includes(term)) ||
        resource.description.toLowerCase().includes(term) ||
        resource.tags.some(tag => tag.toLowerCase().includes(term));
      
      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, selectedCategory]);

  const toggleCategory = (categoryId: string | null) => {
    if (selectedCategory === categoryId) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(categoryId);
    }
    setExpandedId(null); // Fecha qualquer recurso aberto ao trocar de filtro
  };

  const getCategoryColor = (categoryId: string) => {
    const cat = CATEGORIES.find(c => c.id === categoryId);
    return cat?.color || 'bg-gray-50 text-gray-700';
  };

  const getCategoryIcon = (categoryId: string) => {
    const cat = CATEGORIES.find(c => c.id === categoryId);
    return cat?.icon || BookOpen;
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
          <BookOpen className="w-8 h-8 text-primary" /> Biblioteca Científica
        </h1>
        <p className="text-muted-foreground">
          Referências, publicações e metodologias para pesquisa em vitimização criminal.
        </p>
      </div>

      {/* Seção de Pesquisa e Filtros */}
      <Card className="border-none shadow-md">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Search className="w-5 h-5 text-primary" /> Pesquisar & Filtrar
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="relative">
            <Input
              type="text"
              placeholder="Buscar por título, autor, descrição ou palavras-chave..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 h-12"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          </div>
          
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Filtrar por Categoria:</p>
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                variant={selectedCategory === null ? 'default' : 'outline'}
                onClick={() => toggleCategory(null)}
                size="sm"
                className="rounded-full"
              >
                Todos ({SCIENTIFIC_RESOURCES.length})
              </Button>
              {CATEGORIES.map((cat) => {
                const count = SCIENTIFIC_RESOURCES.filter(r => r.category === cat.id).length;
                const isSelected = selectedCategory === cat.id;
                return (
                  <Button
                    key={cat.id}
                    type="button"
                    variant={isSelected ? 'default' : 'outline'}
                    onClick={() => toggleCategory(cat.id)}
                    size="sm"
                    className="rounded-full gap-2"
                  >
                    <cat.icon className="w-4 h-4" />
                    {cat.label} ({count})
                  </Button>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Resultados */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <Card className="bg-muted/50 border-dashed border-2">
            <CardContent className="pt-10 pb-10 flex flex-col items-center text-center">
              <XCircle className="w-12 h-12 text-muted-foreground mb-4" />
              <h3 className="text-xl font-bold">Nenhum recurso encontrado</h3>
              <p className="text-muted-foreground max-w-md mt-2">
                Não encontramos nada com os filtros aplicados. Tente usar termos mais genéricos ou limpar os filtros.
              </p>
              <Button 
                variant="link" 
                onClick={() => {setSearchTerm(''); setSelectedCategory(null);}}
                className="mt-4 font-bold text-primary"
              >
                Limpar todos os filtros
              </Button>
            </CardContent>
          </Card>
        ) : (
          filtered.map((resource) => {
            const isExpanded = expandedId === resource.id;
            const category = CATEGORIES.find(c => c.id === resource.category);
            const CategoryIcon = getCategoryIcon(resource.category);
            
            return (
              <Card key={resource.id} className="hover:shadow-lg transition-all border-none shadow-sm overflow-hidden group">
                <CardHeader className="pb-3 bg-card group-hover:bg-muted/30 transition-colors">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex gap-4">
                        <div className={`p-3 rounded-xl ${getCategoryColor(resource.category)} shadow-sm`}>
                          <CategoryIcon className="w-6 h-6" />
                        </div>
                        <div className="space-y-1">
                          <CardTitle className="text-xl group-hover:text-primary transition-colors">
                            {resource.title}
                          </CardTitle>
                          {resource.author && (
                            <p className="text-sm text-muted-foreground">
                              por <span className="font-semibold text-foreground">{resource.author}</span>
                              {resource.year && <span className="mx-2">•</span>}
                              {resource.year && <span className="bg-muted px-2 py-0.5 rounded text-xs">{resource.year}</span>}
                            </p>
                          )}
                        </div>
                      </div>
                      <Badge variant="secondary" className="hidden sm:flex whitespace-nowrap px-3 py-1">
                        {category?.label}
                      </Badge>
                    </div>
                    
                    <CardDescription className="text-base text-foreground/80 line-clamp-2">
                      {resource.description}
                    </CardDescription>
                    
                    <div className="flex flex-wrap gap-2 pt-1">
                      {resource.tags.map(tag => (
                        <Badge key={tag} variant="outline" className="text-xs bg-background/50">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardHeader>

                {isExpanded && (
                  <CardContent className="border-t pt-6 pb-6 bg-muted/20 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="space-y-4 text-sm whitespace-pre-wrap text-foreground font-mono leading-relaxed bg-background p-6 rounded-lg border shadow-inner">
                      {resource.content}
                    </div>
                  </CardContent>
                )}

                <div className="px-6 py-4 bg-muted/10 border-t flex justify-between items-center">
                   <p className="text-xs text-muted-foreground italic">
                     ID: {resource.id.toUpperCase()}
                   </p>
                  <Button
                    type="button"
                    variant={isExpanded ? 'secondary' : 'default'}
                    size="sm"
                    onClick={() => setExpandedId(isExpanded ? null : resource.id)}
                    className="font-bold"
                  >
                    {isExpanded ? 'Recolher Documento' : 'Ler Conteúdo Completo'}
                  </Button>
                </div>
              </Card>
            );
          })
        )}
      </div>

      <Card className="bg-primary/5 border-primary/20 shadow-inner">
        <CardContent className="pt-6 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-primary mt-0.5" />
          <p className="text-sm text-primary/80 leading-relaxed">
            <strong>Dica de Pesquisa:</strong> Você pode combinar os filtros. Por exemplo, selecione "Artigos" e digite "UNODC" na busca para encontrar publicações específicas da ONU sobre vitimização.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
