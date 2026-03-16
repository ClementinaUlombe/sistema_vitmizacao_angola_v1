export interface NewsItem {
  id: string;
  date: string;
  title: string;
  description: string;
  fullText: string;
  image: string;
}

export const newsData: NewsItem[] = [
  {
    id: "0",
    date: "15 Fev 2026",
    title: "Expansão da Recolha de Dados no Município da Samba",
    description: "Novas equipas de campo iniciaram hoje o inquérito em áreas anteriormente não cobertas para fortalecer a base de dados do projeto.",
    fullText: `
      A equipa de investigação do projeto "Segurança em Angola" anunciou hoje uma expansão significativa na sua fase de recolha de dados. Novas equipas de campo foram destacadas para cobrir áreas adicionais no Município da Samba, com o objetivo de obter uma amostra ainda mais representativa da população local.

      Esta iniciativa surge após uma análise preliminar dos dados já recolhidos, que identificou a necessidade de aprofundar o conhecimento sobre as dinâmicas de segurança em bairros periféricos. Os inquiridores estão devidamente identificados e seguirão todos os protocolos de ética e confidencialidade.

      "A nossa meta é garantir que todos os residentes tenham a oportunidade de partilhar as suas experiências e percepções, para que as soluções propostas pela nossa plataforma digital sejam verdadeiramente eficazes e inclusivas", afirmou o coordenador do estudo.
    `,
    image: "/nochao.jpg"
  },
  {
    id: "1",
    date: "02 Fev 2026",
    title: "Lançamento da IA para Análise de Tendências Criminais",
    description: "O novo módulo de inteligência artificial já processa dados em tempo real para gerar previsões e apoiar a tomada de decisão.",
    fullText: `
      O projeto deu um salto tecnológico importante com o lançamento do seu novo módulo de Inteligência Artificial (IA). Esta ferramenta foi desenhada para processar os dados dos inquéritos de vitimização em tempo real, permitindo a identificação imediata de padrões e tendências criminais no Município da Samba e arredores.

      A IA utiliza algoritmos avançados de machine learning para correlacionar variáveis como horário, tipo de crime e localização, gerando mapas de calor e previsões que podem auxiliar as autoridades locais na otimização de recursos.

      Além da análise técnica, a IA também alimenta o chatbot da nossa plataforma, tornando a informação acessível a todos os cidadãos de forma intuitiva. Este é um marco na modernização das ferramentas de segurança pública em Angola.
    `,
    image: "/maos.jpg"
  },
  {
    id: "2",
    date: "20 Jan 2026",
    title: "Workshop de Prevenção Comunitária: Relato de Sucesso",
    description: "Reunimos líderes comunitários para discutir estratégias de segurança baseadas em dados e fortalecer a cooperação entre vizinhos.",
    fullText: `
      No passado dia 20 de Janeiro, o projeto organizou um Workshop de Prevenção Comunitária que reuniu dezenas de líderes locais e residentes. O evento focou-se na apresentação dos primeiros resultados do estudo e na discussão de estratégias práticas para melhorar a segurança nos bairros.

      Durante o workshop, foram abordados temas como a importância da denúncia, a criação de redes de vigilância comunitária e o fortalecimento da confiança nas instituições. Os participantes partilharam experiências valiosas que ajudarão a refinar as funcionalidades da nossa plataforma digital.

      "A segurança não é apenas responsabilidade das autoridades, mas de toda a comunidade. Este workshop mostrou que, quando temos dados concretos, conseguimos planear ações muito mais eficazes", declarou um dos líderes comunitários presentes.
    `,
    image: "/livro.jpeg"
  }
];
