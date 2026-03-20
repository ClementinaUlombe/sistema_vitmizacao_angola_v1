export interface NewsItem {
  id: string;
  date: string;
  title: string;
  description: string;
  fullText: string;
  image: string;
  images?: string[]; // Optional array for slideshow
}

export const newsData: NewsItem[] = [
  {
    id: "0",
    date: "15 Fev 2026",
    title: "Expansão da Recolha de Dados no Município da Samba",
    description: "Novas equipas de campo iniciaram hoje o inquérito em áreas anteriormente não cobertas para fortalecer a base de dados do projeto.",
    fullText: `A equipa de investigação do projeto "Segurança em Angola" que é o Grupo Estudos e Desenvolvimento Académico (GEDA) no Instituto Superior Politécnico de Ciências e Tecnologia (INSUTEC) emerge como uma iniciativa estratégica para fomentar a participação ativa dos estudantes em projetos de pesquisa e extensão, contribuindo diretamente para o aprimoramento da experiência académica e o alinhamento entre a formação teórica e as demandas sociais.

O GEDA será um espaço de integração e aprendizado, voltado para o estudo de temas que afectam directamente a vida académica, como motivação, satisfação, métodos de aprendizagem, desempenho estudantil e a ligação entre a formação universitária e a realidade comunitária. Além disso, o grupo busca estimular a produção científica por meio da elaboração e publicação de artigos Académicos e a promoção de eventos, como palestras e debates, fortalecendo o compromisso dos estudantes com a disseminação do conhecimento e a interação com a sociedade.

Missão: Fomentar o desenvolvimento Académico, científico e pessoal dos estudantes do Curso de Ciências Criminais, promovendo uma cultura de pesquisa, inovação e compromisso social.

Visão: Tornar-se uma referência no desenvolvimento de competências investigativas e na produção de conhecimento aplicado à realidade académica e social.

Objetivos:
1. Promover estudos e pesquisas sobre temas relacionados ao desempenho Académico, metodologias de aprendizagem e desafios enfrentados pelos estudantes.
2. Facilitar a elaboração e publicação de artigos científicos em revistas académicas.
3. Organizar e participar de eventos Académicos como palestras, painéis, jornadas científicas e outros.
4. Estimular o trabalho em Equipa e o compromisso com valores éticos e profissionais.
5. Fortalecer a ligação entre a formação académica e a realidade social e comunitária.

Este relatório apresenta as estratégias elaboradas para a aplicação de inquérito sobre Vitimização Criminal e percepção de segurança nos bairros Inorad, Pedalé, Saber Andar e Huambo, tendo como eixo central o bairro Gamek á Direita. O objectivo central foi mapear a experiência real da população com a criminalidade e avaliar os níveis de sensação de segurança.

O estudo visou compreender a segurança pública nesses bairros sob a perspectiva dos seus residentes. Através de um inquérito por questionário estruturado, buscou-se ir além dos registros policiais oficionais, captando crimes não denunciados e medindo a sensação subjectiva de segurança, fornecendo assim um diagnóstico mais abrangente.`,
    image: "/nochao.jpg",
    images: [
      "/recolha.jpeg",
      "/recolha1.jpeg",
      "/recolha2.jpeg",
      "/recolha3.jpeg",
      "/recolha4.jpeg",
      "/imagesmaos.jpeg",
      "/biblioteca.png",
      "/biblioteca2.png",
      "/WhatsApp Image 2026-03-19 at 8.55.52 PM (1).jpeg",
      "/WhatsApp Image 2026-03-19 at 8.55.52 PM.jpeg",
      "/WhatsApp Image 2026-03-19 at 8.55.51 PM (2).jpeg",
      "/WhatsApp Image 2026-03-19 at 8.55.51 PM (1).jpeg",
      "/WhatsApp Image 2026-03-19 at 8.55.51 PM.jpeg",
      "/WhatsApp Image 2026-03-19 at 8.55.50 PM (3).jpeg",
      "/WhatsApp Image 2026-03-19 at 8.55.50 PM (2).jpeg",
      "/WhatsApp Image 2026-03-19 at 8.55.50 PM (1).jpeg",
      "/WhatsApp Image 2026-03-19 at 8.55.50 PM.jpeg",
      "/WhatsApp Image 2026-03-19 at 8.55.49 PM (1).jpeg",
      "/WhatsApp Image 2026-03-19 at 8.55.49 PM.jpeg"
    ]
  },
  {
    id: "1",
    date: "02 Fev 2026",
    title: "Lançamento da IA para Análise de Tendências Criminais",
    description: "O novo módulo de inteligência artificial já processa dados em tempo real para gerar previsões e apoiar a tomada de decisão.",
    fullText: `O projeto deu um salto tecnológico importante com o lançamento do seu novo módulo de Inteligência Artificial (IA). Esta ferramenta foi desenhada para processar os dados dos inquéritos de vitimização em tempo real, permitindo a identificação imediata de padrões e tendências criminais no Município da Samba e arredores.

A IA utiliza algoritmos avançados de machine learning para correlacionar variáveis como horário, tipo de crime e localização, gerando mapas de calor e previsões que podem auxiliar as autoridades locais na otimização de recursos.

Um dos pilares centrais desta inovação é o nosso Chatbot Inteligente, uma interface conversacional avançada que democratiza o acesso à informação de segurança. O chatbot não apenas responde a perguntas frequentes, mas também é capaz de realizar consultas complexas na base de dados em tempo real. Os cidadãos podem agora interagir de forma natural para perguntar sobre estatísticas de segurança no seu bairro específico, receber conselhos de prevenção personalizados com base em tendências atuais e até mesmo ser guiados passo a passo no processo de reporte de incidentes.

Além disso, o chatbot utiliza processamento de linguagem natural (NLP) para compreender o contexto das preocupações dos residentes, oferecendo uma ponte de comunicação direta entre a tecnologia de ponta e a necessidade humana de segurança. Esta ferramenta transforma dados estatísticos complexos em diálogos úteis e acessíveis, tornando a plataforma uma verdadeira assistente de segurança para a comunidade. Este é um marco fundamental na modernização das ferramentas de segurança pública em Angola, unindo ciência criminal e inteligência artificial para proteger vidas.`,
    image: "/maos.jpg",
    images: [
      "/inteligencia-artificial-criminalistica-nova-era-resolucao-crimes.png",
      "/a8a4b5_a9a2253bf0374d86b23e66e307dcdd1d~mv2.avif",
      "/a8a4b5_c6c46fa8c53e482296184697f316c59e~mv2.avif",
      "/a8a4b5_3ecd89405ef14b7a958fe10d09d9ebcd~mv2.avif",
      "/forense_01.jpg",
      "/inteligencia-artificial-no-direito-penal-1000x563-1.webp",
      "/robo-tjpe.jpg"
    ]
  },
  {
    id: "2",
    date: "20 Jan 2026",
    title: "Workshop de Prevenção Comunitária: Relato de Sucesso",
    description: "Reunimos líderes comunitários para discutir estratégias de segurança baseadas em dados e fortalecer a cooperação entre vizinhos.",
    fullText: `
     GEDA promove palestra sobre proteção de menores no Complexo Escolar 1015
Acção educativa envolveu 250 estudantes no debate sobre prevenção e denúncia do abuso sexual infantil

No dia 13 de Fevereiro de 2026, o Departamento da Acção Social (GEDA) realizou uma palestra no Complexo Escolar 1015, localizado no Morro Bento, subordinada ao tema “A escola como espaço de proteção contra o abuso sexual de menores”. A actividade, inserida no programa “Escola Segura, Infância Protegida”, teve como objectivo fortalecer o conhecimento dos estudantes para a prevenção do abuso sexual infantil, promovendo a escola como um ambiente seguro de acolhimento, escuta activa e incentivo à denúncia.

A iniciativa contou com a participação de especialistas de diferentes áreas, que abordaram a temática sob perspectivas complementares. Estiveram presentes como palestrantes Eliane Cazapula, estudante de Psicologia; João Pimpão, estudante de Ciências Criminais; e Agnela Fernandes, estudante de Direito. A moderação ficou a cargo de Sarai Ernesto e Edvaldo Augusto, que conduziram os trabalhos de forma dinâmica e interactiva.

A palestra teve início às 15h00, com a abertura oficial e apresentação dos objectivos da actividade. A seguir, Eliane Cazapula abordou os aspectos psicológicos do abuso sexual de menores, explicando conceitos fundamentais como o que constitui abuso sexual, a diferença entre toques adequados e inadequados, e os impactos emocionais que a violência pode provocar nas vítimas. A palestrante destacou ainda os principais sinais comportamentais que podem indicar que uma criança ou adolescente está em situação de risco, bem como a importância de pedir ajuda a um adulto de confiança.

Na sequência, João Pimpão trouxe uma abordagem jurídica, explicando que o abuso sexual de menores é considerado crime público em Angola. O futuro criminalista esclareceu o significado deste conceito, enfatizando que qualquer pessoa pode e deve denunciar casos suspeitos às autoridades, sem necessidade de representação da vítima. Foram também apresentadas as consequências legais para os agressores e a importância da denúncia como instrumento de protecção e justiça.

O terceiro momento foi dedicado aos mecanismos de denúncia e protecção, apresentados por Agnela Fernandes. A estudante de Direito elucidou os direitos fundamentais da criança, os canais disponíveis para denunciar situações de violência – como a Polícia Nacional, o Serviço de Investigação Criminal e a linha de apoio à criança – e o papel da escola no acolhimento e encaminhamento dos casos. A palestrante reforçou que a instituição de ensino deve ser um espaço de confiança, onde os alunos se sintam seguros para relatar qualquer forma de abuso.

Após as exposições, realizou-se uma sessão aberta de perguntas e respostas, que permitiu aos estudantes esclarecerem dúvidas e partilharem inquietações. O elevado nível de interação demonstrou o interesse e a sensibilização dos jovens para a temática, evidenciando a necessidade de debates contínuos sobre o assunto.

O evento encerrou às 17h00, com palavras de agradecimento aos participantes e reforço da mensagem de que a escola é um espaço de protecção. Na sequência, foi servido um coffee break e activada uma banca de escuta e orientação do GEDA, instalada no local para atendimento individual, confidencial e humanizado. Dois membros do departamento estiveram disponíveis para ouvir os estudantes que desejassem colocar questões pessoais ou receber orientação especializada, garantindo um ambiente de acolhimento e privacidade.

De acordo com os organizadores, os objectivos propostos foram plenamente alcançados. A palestra conseguiu sensibilizar os cerca de 250 estudantes presentes sobre a importância da autoprotecção, do diálogo aberto em casa e na escola, e da denúncia como forma de quebrar o ciclo de silêncio que muitas vezes envolve o abuso sexual.

Conclusão
A actividade foi realizada com êxito, cumprindo as metas estabelecidas pelo Departamento da Acção Social (GEDA). O sucesso da iniciativa reforça a necessidade de continuidade de acções educativas desta natureza junto da comunidade estudantil, contribuindo para a construção de uma cultura de protecção e respeito pelos direitos da criança no ambiente escolar e na sociedade em geral.
 `,
    image: "/livro.jpeg",
    images: [
      "/WhatsApp Image 2026-03-19 at 8.55.52 PM (1).jpeg",
      "/WhatsApp Image 2026-03-19 at 8.55.52 PM.jpeg",
      "/WhatsApp Image 2026-03-19 at 8.55.51 PM (2).jpeg",
      "/WhatsApp Image 2026-03-19 at 8.55.51 PM (1).jpeg",
      "/WhatsApp Image 2026-03-19 at 8.55.51 PM.jpeg",
      "/WhatsApp Image 2026-03-19 at 8.55.50 PM (3).jpeg",
      "/WhatsApp Image 2026-03-19 at 8.55.50 PM (2).jpeg",
      "/WhatsApp Image 2026-03-19 at 8.55.50 PM (1).jpeg",
      "/WhatsApp Image 2026-03-19 at 8.55.50 PM.jpeg",
      "/WhatsApp Image 2026-03-19 at 8.55.49 PM (1).jpeg",
      "/WhatsApp Image 2026-03-19 at 8.55.49 PM.jpeg"
    ]
  }
];
