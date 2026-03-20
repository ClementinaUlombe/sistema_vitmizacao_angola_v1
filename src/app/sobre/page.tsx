"use client";

import { useState } from "react";
import { AppHeader } from "@/components/AppHeader";
import { AppFooter } from "@/components/AppFooter";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  ChevronLeft, 
  ChevronRight,
  FileText,
  User,
  Users
} from "lucide-react";

export default function SobrePage() {
  const [currentPage, setCurrentPage] = useState(1);

  const scrollToArticleTop = () => {
    const element = document.getElementById('artigo-cientifico');
    if (element) {
      const offset = 100; 
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    setTimeout(scrollToArticleTop, 100);
  };

  const paginasArtigo = [
    {
      id: 1,
      titulo: "Resumo e Identificação",
      conteudo: (
        <div className="space-y-8 animate-fade-in">
          <div className="text-center space-y-4">
            <h2 className="text-xl md:text-2xl font-black leading-tight text-primary uppercase">
              Desenvolvimento de uma Plataforma Digital com Base a Ánalise do Inquérito de Vitimização Criminal e Percepção de Segurança no Município da Samba, no Ano de 2025
            </h2>
            <div className="space-y-1">
              <p className="text-xs italic text-muted-foreground uppercase tracking-tighter">Development of a Digital Platform Based on a Criminal Victimization Survey and Perception of Security in the Municipality of Samba in 2025</p>
              <p className="text-xs italic text-muted-foreground uppercase tracking-tighter">Desarrollo de una Plataforma Digital Basada en una Encuesta de Victimización Criminal y Percepción de Seguridad en el Municipio de Samba en el Año 2025</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 py-6 border-y border-primary/10">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-primary font-bold">
                <User className="w-4 h-4" /> <span>Autora 1</span>
              </div>
              <p className="font-bold text-lg">Celina Elizabeth José</p>
              <p className="text-xs text-muted-foreground font-medium">Finalista de Ciências Criminais</p>
              <p className="text-xs text-muted-foreground">Instituto Superior Politécnico de Ciências e Tecnologia</p>
            </div>
            <div className="space-y-2 md:text-right">
              <div className="flex items-center gap-2 text-primary font-bold md:justify-end">
                <User className="w-4 h-4" /> <span>Autora 2</span>
              </div>
              <p className="font-bold text-lg">Clementina K. Ulombe</p>
              <p className="text-xs text-muted-foreground font-medium">Finalista de Engenharia Informática</p>
              <p className="text-xs text-muted-foreground">Instituto Superior Politécnico de Ciências e Tecnologia</p>
            </div>
          </div>

          <div className="space-y-8 text-sm leading-relaxed">
            <div>
              <h3 className="font-black text-primary mb-3 uppercase tracking-widest border-l-4 border-primary pl-3">RESUMO</h3>
              <p className="text-justify text-foreground/90 leading-loose">
A vitimização criminal constitui um fenómeno complexo que impacta directamente a segurança pública, a formulação de políticas de prevenção e a percepção de segurança das populações. Em contextos urbanos, a ausência de sistemas centralizados para a recolha, organização e análise de dados de vitimização criminal contribui para a fragmentação da informação, dificultando o acompanhamento das vítimas e a identificação de padrões criminais. Neste sentido, o presente artigo tem como objectivo desenvolver uma plataforma digital com base na análise de inquéritos de vitimização criminal e percepção de segurança no município da Samba, no ano de 2025, com vista a contribuir para a melhoria da recolha e gestão de dados e apoiar as políticas de segurança pública e de prevenção criminal. A pesquisa adopta uma abordagem mista, combinando métodos quantitativos e qualitativos, com recurso à pesquisa bibliográfica e à pesquisa de campo, através da aplicação de inquéritos à população local. Os resultados esperados apontam para uma melhoria na sistematização dos dados, maior acessibilidade à informação e apoio à tomada de decisão por parte das instituições responsáveis pela segurança pública. Conclui-se que a integração entre Ciências Criminais e Engenharia Informática, por meio de plataformas digitais, pode fortalecer estratégias de prevenção criminal e promover políticas públicas mais eficazes e baseadas em evidências.              </p>
              <p className="mt-3 font-bold text-xs"><span className="text-primary">Palavras-chave:</span> Plataformas digitais; Inquérito de vitimização criminal; Percepção de segurança.</p>
            </div>

            <div>
              <h3 className="font-black text-slate-500 mb-3 uppercase tracking-widest border-l-4 border-slate-300 pl-3">ABSTRACT</h3>
              <p className="text-justify text-foreground/80 leading-loose">
Criminal victimization constitutes a complex phenomenon that directly impacts public security, the formulation of crime prevention policies, and the population’s perception of safety. In urban contexts, the absence of centralized systems for collecting, organizing, and analyzing criminal victimization data contributes to information fragmentation, making it difficult to monitor victims and identify crime patterns. In this context, the present study aims to develop a digital platform based on the analysis of criminal victimization surveys and perceptions of security in the municipality of Samba in 2025, with the purpose of improving data collection and management and supporting public security and crime prevention policies. The research adopts a mixed-methods approach, combining quantitative and qualitative methods through bibliographic research and field research, including the application of surveys to the local population. The expected results indicate improvements in data systematization, greater accessibility to information, and support for decision-making by institutions responsible for public security. It is concluded that the integration between Criminal Sciences and Computer Engineering, through digital platforms, can strengthen crime prevention strategies and promote more effective evidence-based public policies.              </p>
              <p className="mt-3 font-bold text-xs"><span className="text-slate-500">Keywords:</span> Digital platforms; Criminal victimization survey; Perception of security.</p>
            </div>
             <div>
              <h3 className="font-black text-primary mb-3 uppercase tracking-widest border-l-4 border-primary pl-3">RESUMEN</h3>
              <p className="text-justify text-foreground/90 leading-loose">
La victimización criminal constituye un fenómeno complejo que impacta directamente en la seguridad pública, en la formulación de políticas de prevención del delito y en la percepción de seguridad de la población. En contextos urbanos, la ausencia de sistemas centralizados para la recolección, organización y análisis de datos de victimización criminal contribuye a la fragmentación de la información, dificultando el seguimiento de las víctimas y la identificación de patrones delictivos. En este sentido, el presente estudio tiene como objetivo desarrollar una plataforma digital basada en el análisis de encuestas de victimización criminal y percepción de seguridad en el municipio de Samba en el año 2025, con el fin de mejorar la recolección y gestión de datos y apoyar las políticas públicas de seguridad y prevención del delito. La investigación adopta un enfoque metodológico mixto, combinando métodos cuantitativos y cualitativos, mediante investigación bibliográfica y trabajo de campo, incluyendo la aplicación de encuestas a la población local. Los resultados esperados apuntan a una mejora en la sistematización de los datos, mayor accesibilidad a la información y apoyo en la toma de decisiones por parte de las instituciones responsables de la seguridad pública. Se concluye que la integración entre las Ciencias Criminales y la Ingeniería Informática, a través de plataformas digitales, puede fortalecer las estrategias de prevención del delito y promover políticas públicas más eficaces basadas en evidencia.              </p>
              <p className="mt-3 font-bold text-xs"><span className="text-primary">Palavras-chave:</span> Plataformas digitais; Inquérito de vitimização criminal; Percepção de segurança.</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 2,
      titulo: "Introdução I",
      conteudo: (
        <div className="space-y-6 animate-fade-in">
          <h3 className="text-2xl font-black text-primary border-b-2 border-primary/10 pb-2 uppercase tracking-tight">INTRODUÇÃO</h3>
          <div className="space-y-4 text-justify leading-relaxed text-foreground/90">
            <p>
A vitimização criminal constitui, a nível mundial, um fenómeno complexo que ultrapassa a mera ocorrência do crime, envolvendo dimensões sociais, psicológicas, económicas e institucionais. A literatura internacional tem demonstrado que os dados provenientes dos registros oficiais não conseguem captar, de forma integral, a real magnitude da criminalidade, uma vez que uma parcela significativa das vítimas opta por não denunciar os crimes sofridos. Esta limitação compromete a capacidade dos Estados em compreender o fenómeno criminal e em formular políticas públicas eficazes e orientadas para a prevenção.
Neste sentido, os inquéritos de vitimização criminal assumem um papel central ao possibilitarem a recolha directa de informações junto das vítimas, permitindo identificar padrões de vitimização, factores de risco e níveis de percepção de segurança. A produção desse tipo de informação contribui para uma visão mais abrangente da criminalidade, ao integrar dados quantitativos e qualitativos que não se encontram disponíveis nos sistemas tradicionais de registo. A eficácia desses inquéritos depende, em grande medida, da forma como os dados são recolhidos, organizados, armazenados e analisados.
Com o avanço das tecnologias digitais, observa-se uma crescente aposta no uso de plataformas digitais como instrumentos de apoio à recolha e gestão de dados no domínio da segurança pública. Essas plataformas possibilitam a sistematização das informações, a redução da fragmentação dos dados e a melhoria do acesso por parte de investigadores, gestores públicos e instituições responsáveis pela segurança. Assim, a articulação entre inquéritos de vitimização criminal, percepção de segurança e plataformas digitais revela-se fundamental para o fortalecimento da gestão da informação e para a tomada de decisões baseadas em evidências.
No contexto angolano, a criminalidade urbana representa um desafio relevante para a segurança pública, particularmente nas grandes cidades, onde factores como crescimento populacional acelerado, desigualdades sociais e fragilidades institucionais contribuem para a complexidade do fenómeno criminal. Apesar dos esforços das autoridades, persistem dificuldades na recolha e gestão sistemática de dados sobre vitimização criminal, o que limita a capacidade de avaliação das políticas de prevenção e controlo do crime.
     </p>
          </div>
        </div>
      )
    },
    {
      id: 3,
      titulo: "Introdução II",
      conteudo: (
        <div className="space-y-6 animate-fade-in">
          <h3 className="text-2xl font-black text-primary border-b-2 border-primary/10 pb-2 uppercase tracking-tight">INTRODUÇÃO (Continuação)</h3>
          <div className="space-y-4 text-justify leading-relaxed text-foreground/90">
            <p>
A dependência predominante dos registos oficiais tende a invisibilizar experiências de vitimização não denunciadas, bem como as percepções de insegurança vivenciadas pela população. Esta lacuna informacional compromete a formulação de estratégias preventivas eficazes, uma vez que as decisões são tomadas com base em dados incompletos ou pouco organizados. Torna-se, portanto, necessário investir em mecanismos que permitam organizar e sistematizar os dados de vitimização criminal de forma estruturada e acessível.
Neste cenário, o uso de plataformas digitais surge como uma alternativa capaz de melhorar a recolha, a gestão e a análise dos dados relacionados à vitimização criminal e à percepção de segurança. Ao permitir o acesso integrado à informação, essas plataformas podem apoiar as instituições responsáveis pela segurança pública, promovendo maior eficiência na análise dos dados e contribuindo para decisões mais informadas no planeamento de políticas públicas de segurança e prevenção criminal.
A nível local, a província de Luanda apresenta características específicas que intensificam os desafios relacionados à vitimização criminal, destacando-se a elevada densidade populacional e a diversidade de contextos socioeconómicos. O município da Samba insere-se nesse contexto urbano complexo, onde as dinâmicas sociais e espaciais influenciam tanto a ocorrência dos crimes quanto a percepção de segurança da população residente.
A inexistência de sistemas ou plataformas digitais centralizadas para a recolha e análise de inquéritos de vitimização no município  dificulta a identificação de padrões criminais e a localização de áreas mais vulneráveis. A dispersão dos dados impede uma leitura integrada do fenómeno, limitando o acompanhamento das vítimas e reduzindo a eficácia das estratégias de prevenção criminal adoptadas a nível comunitário.
Diante desse contexto, torna-se pertinente o desenvolvimento de uma plataforma digital orientada para a análise de inquéritos de vitimização criminal e percepção de segurança no município da Samba. Ao possibilitar a organização estruturada dos dados, a plataforma poderá apoiar a identificação de áreas de risco, facilitar o acesso à informação por parte das autoridades e contribuir para uma compreensão mais aprofundada da vitimização criminal. Assim, o estudo propõe-se a reforçar a tomada de decisão no planeamento de políticas de segurança pública, integrando os contributos das Ciências Criminais e da Engenharia Informática.
              </p>
          </div>
        </div>
      )
    },
    {
      id: 4,
      titulo: "Enquadramento Teórico",
      conteudo: (
        <div className="space-y-6 animate-fade-in">
          <h3 className="text-2xl font-black text-primary border-b-2 border-primary/10 pb-2 uppercase tracking-tight">ENQUADRAMENTO TEÓRICO</h3>
          <div className="space-y-4 text-justify leading-relaxed text-foreground/90">
            <h4 className="text-xl font-bold italic text-slate-800">Plataforma digital</h4>
            <p>
A palavra plataforma tem origem no francês plate-forme, que por sua vez provém da combinação de plat (chato, plano) e forme (forma), inicialmente significando uma superfície horizontal que serve de apoio ou suporte físico, como um palanque ou podium (Ciberdúvidas, 2021).
Com a revolução tecnológica e a transição para ambientes digitais, o conceito de plataforma foi transposto do espaço físico para o espaço digital, onde passou a designar estruturas que permitem a interacção e intermediação socio-económica em ambientes virtuais (Ha et al., 2024).
No contexto digital, pesquisadores definem plataforma digital como uma infraestrutura de software que facilita interações e transacções entre diferentes grupos de utilizadores, actuando como intermediário tecnológico entre produtores e consumidores de informação, bens ou serviços (Sørensen, Basole & De Reuver, 2018; Digital platform (infrastructure), n.d.).
A literatura científica reconhece que as plataformas digitais não são homogéneas, razão pela qual diversos autores propõem tipologias que permitem compreender as suas funções, estruturas e impactos sociais e económicos (Gawer, 2021).
De acordo com Gawer (2021), “as plataformas digitais podem ser entendidas como arquitecturas organizacionais distintas, cuja classificação depende do papel que desempenham na coordenação de actores, recursos e fluxos de informação” (p. 124).
Uma das tipologias mais consolidadas na literatura distingue as plataformas de transacção das plataformas de inovação, sendo esta classificação amplamente aceite no campo dos sistemas de informação e da economia digital (Evans & Schmalensee, 2016).
As plataformas de transacção são definidas como aquelas que “facilitam interacções directas entre dois ou mais grupos de utilizadores, reduzindo custos de pesquisa, coordenação e troca” (Evans & Schmalensee, 2016, p. 5).
Segundo Parker, Van Alstyne e Choudary (2016), este tipo de plataforma actua essencialmente como intermediário digital, organizando a oferta e a procura por meio de regras, algoritmos e mecanismos de governação.
Por outro lado, as plataformas de inovação caracterizam-se por fornecer uma base tecnológica sobre a qual terceiros podem desenvolver aplicações, serviços ou módulos complementares, ampliando continuamente o valor do ecossistema digital (Tiwana, 2014).
Tiwana (2014) afirma que “uma plataforma de inovação é construída para permitir extensibilidade, de modo que actores externos possam criar soluções que se integrem à infraestrutura central” (p. 8).
A literatura mais recente acrescenta uma terceira categoria, designada plataformas de integração ou plataformas de dados, cujo foco principal reside na recolha, organização, processamento e interoperabilidade de grandes volumes de informação (de Reuver, Sørensen & Basole, 2018).
Segundo de Reuver et al. (2018), estas plataformas “funcionam como infra-estruturas digitais capazes de articular múltiplas fontes de dados, promovendo análises sistemáticas e suporte à tomada de decisão” (p. 127).
Outra classificação relevante considera o grau de controlo e governação, distinguindo plataformas centralizadas, descentralizadas e híbridas, o que influencia directamente a segurança da informação, a transparência e a autonomia dos utilizadores (Gillespie, 2018).
Gillespie (2018) sustenta que “a arquitectura de governação de uma plataforma define quem detém o poder de decisão sobre dados, regras de acesso e formas de utilização” (p. 23).
No contexto de plataformas digitais orientadas à gestão de dados sociais e criminais, a literatura destaca a predominância de plataformas de integração com características centralizadas, devido à necessidade de controlo institucional, fiabilidade da informação e protecção de dados sensíveis (Kitchin, 2021).
Kitchin (2021) sublinha que “plataformas digitais voltadas à gestão de dados públicos exigem estruturas robustas de governação, ética e segurança, dada a natureza sensível da informação tratada” (p. 64).
Assim, a tipologia das plataformas digitais permite compreender não apenas as suas funções técnicas, mas também os seus impactos sociais, institucionais e políticos, sendo um elemento essencial para o desenho de soluções digitais aplicadas à segurança pública e à análise de dados de vitimização criminal.
              </p>
          </div>
        </div>
      )
    },
    {
      id: 5,
      titulo: "Plataformas digitais na recolha e gestão de dados criminais",
      conteudo: (
        <div className="space-y-6 animate-fade-in">
          <h3 className="text-2xl font-black text-primary border-b-2 border-primary/10 pb-2 uppercase tracking-tight">Plataformas digitais na recolha e gestão de dados criminais</h3>
          <div className="space-y-4 text-justify leading-relaxed text-foreground/90">
            <p className="italic text-muted-foreground">
              As plataformas digitais configuram-se como infra-estruturas tecnológicas essenciais para a recolha e gestão de dados criminais, permitindo a integração, análise e cruzamento de informação de diferentes origens para fins de monitorização e tomada de decisão (Shan, 2026).
Num contexto de governação criminal transformada digitalmente, Shan (2026) argumenta que “as plataformas de governação abrangentes funcionam como infra-estruturas digitais que facilitam a agregação de informação, integração de dados multi-fonte e avaliação de risco” (p. X), o que evidencia o papel destas plataformas na gestão sistemática dos dados.
A utilização de sistemas que centralizam dados em tempo real, como os chamados Real-Time Crime Centers, mostra a importância das plataformas digitais ao permitir que as forças de segurança unifiquem fluxos de vídeo, relatórios de incidentes e dados operacionais, ampliando a “consciência situacional e capacidades investigativas” (Real-Time Crime Center, n.d.).
Segundo pesquisas sobre ferramentas de informação para segurança pública, plataformas digitais que recolhem dados em tempo real e automatizam análises permitem às instituições policiais identificar padrões, detectar hotspots de criminalidade e coordenar respostas mais rápidas (Araghi et al., 2025).
A eficácia destas plataformas na recolha de dados também é reforçada tanto por estudos académicos quanto por exercícios práticos que demonstram a capacidade de integrar informação de utilizadores e sensores para produzir perfis incidentais e apoiar decisões operacionais imediatas (Crowdmapping, n.d.; Citizen app, n.d.).
Além disso, a literatura aponta que, ao digitalizar os processos tradicionais de recolha, armazenamento e análise de dados criminais, estas plataformas contribuem para reduzir o tempo de resposta e minimizar erros decorrentes de métodos manuais e não estruturados (Rewatkar et al., 2024).
Portanto, plataformas digitais representam ferramentas tecnológicas integradas que não só consolidam dados criminais e perceptivos, mas também potenciam a capacidade analítica e operacional das instituições envolvidas na prevenção e combate ao crime.
</p>
            {/* Adicione o conteúdo aqui futuramente */}
          </div>
        </div>
      )
    },
    {
      id: 6,
      titulo: "Importância das plataformas digitais para políticas públicas de segurança",
      conteudo: (
        <div className="space-y-6 animate-fade-in">
          <h3 className="text-2xl font-black text-primary border-b-2 border-primary/10 pb-2 uppercase tracking-tight">Importância das plataformas digitais para políticas públicas de segurança</h3>
          <div className="space-y-4 text-justify leading-relaxed text-foreground/90">
            <p className="italic text-muted-foreground">A adopção de plataformas digitais tem sido reconhecida como um componente central na formulação e implementação de políticas públicas de segurança, uma vez que elevam significativamente a qualidade dos dados disponíveis para a definição de estratégias e medidas eficazes (Shan, 2026).
Shan (2026) enfatiza que “a governação através de plataformas representa uma reconfiguração paradigmática da resposta ao crime, deslocando-a de reacções reativas para abordagens preventivas fundamentadas em dados” (p. X), o que indica a importância destas plataformas na construção de políticas orientadas para a prevenção sustentada.
A integração de dados multi-fonte em plataformas digitais permite identificar tendências crimonológicas e perfis de risco mais precisos, promovendo assim medidas políticas que respondam não apenas a ocorrências específicas, mas também à dinâmica criminal subjacente (Shan, 2026).
Adicionalmente, plataformas digitais de reporte e análise de crime aumentam a participação dos cidadãos na segurança pública, pois permitem a comunicação directa com as autoridades, o que pode levar a um aumento da taxa de denúncias e redução da subnotificação  um factor crítico para políticas mais eficazes (Rewatkar et al., 2024).
A capacidade de processar grandes volumes de dados em tempo real e transformar essa informação em indicadores de desempenho operacional oferece aos decisores públicos uma base sólida para planear recursos, redesenhar programas e monitorizar resultados, contribuindo para uma governação mais inteligente e responsiva (Araghi et al., 2025).
Por fim, a literatura contemporânea sublinha que a integração de plataformas digitais no sistema de segurança pública possibilita uma coordenação interinstitucional mais forte, essencial para políticas que atravessam sectores como justiça, segurança comunitária e prevenção social  tornando a abordagem de segurança pública mais holística e baseada em evidências.
</p>
            {/* Adicione o conteúdo aqui futuramente */}
          </div>
        </div>
      )
    },
    {
      id: 7,
      titulo: "Inquérito de vitimização criminal e a sua classificação",
      conteudo: (
        <div className="space-y-6 animate-fade-in">
          <h3 className="text-2xl font-black text-primary border-b-2 border-primary/10 pb-2 uppercase tracking-tight">Inquérito de vitimização criminal e a sua classificação</h3>
          <div className="space-y-4 text-justify leading-relaxed text-foreground/90">
            <p className="italic text-muted-foreground">Etimologicamente, o termo inquérito deriva do latim inquirere, que significa investigar, examinar ou procurar informações de forma sistemática, enquanto vitimização provém do latim victima, designando aquele que sofre um dano ou prejuízo decorrente de uma acção criminosa (Cunha & Cintra, 2019).
No campo científico, o inquérito de vitimização criminal é definido pelo UNODC como “um inquérito estruturado que recolhe informações directamente junto dos indivíduos sobre as suas experiências de vitimização criminal, independentemente de os crimes terem sido denunciados ou não à polícia” (UNODC, 2010, p. 1).
Van Dijk (2015) acrescenta que estes inquéritos permitem medir tanto a incidência criminal como a percepção de segurança, ao afirmar que “os inquéritos de vitimização fornecem informações únicas sobre padrões de criminalidade e sentimentos de insegurança da população” (p. 69).
Quanto a classificação dos inquéritos de vitimização criminal, a literatura distingue essencialmente (Killias et al., 2016). :
a)	Inquéritos nacionais de vitimização: os inquéritos nacionais são pesquisas de larga escala que cobrem todo o território de um país, permitindo gerar dados representativos da população sobre vitimização criminal. 
Segundo Van Dijk (2015), estes inquéritos fornecem informações sobre a prevalência de crimes, padrões de vitimização e percepções de segurança, essenciais para orientar políticas públicas de segurança a nível nacional.
b)	Inquéritos locais ou comunitários: os inquéritos locais ou comunitários são realizados em áreas geográficas específicas, como bairros, distritos ou cidades, com o objetivo de compreender a dinâmica da criminalidade a nível micro. 
Van Dijk (2015) sublinha que estes inquéritos são particularmente úteis para detectar padrões de crime em comunidades específicas e avaliar a percepção de segurança em contextos locais.
c)	Inquéritos sectoriais, dirigidos a grupos específicos: Os inquéritos sectoriais são focados em populações ou grupos específicos, como estudantes, trabalhadores, idosos ou profissionais de determinado setor, visando identificar tipos particulares de vitimização e riscos associados (Fattah, 2010).
Segundo Fattah (2010), esses inquéritos permitem analisar vulnerabilidades específicas e exposições a crimes particulares, fornecendo informações detalhadas que podem orientar medidas preventivas direcionadas e programas de proteção.
Killias et al. (2016) esclarecem que “os inquéritos de vitimização locais são particularmente úteis para compreender a dinâmica da criminalidade ao nível do bairro” (p. 41), o que os torna adequados para contextos urbanos angolanos.
Relativamente aos tipos de vitimização, a Vitimologia identifica a vitimização directa, quando o indivíduo sofre directamente o crime; a vitimização indirecta, quando familiares ou pessoas próximas são afectadas. Uma segunda tipologia apresenta-se em :
</p>
            {/* Adicione o conteúdo aqui futuramente */}
          </div>
        </div>
      )
    },
    {
      id: 8,
      titulo: "Vitimização primária",
      conteudo: (
        <div className="space-y-6 animate-fade-in">
          <h3 className="text-2xl font-black text-primary border-b-2 border-primary/10 pb-2 uppercase tracking-tight">Vitimização primária</h3>
          <div className="space-y-4 text-justify leading-relaxed text-foreground/90">
            <p className="italic text-muted-foreground">A vitimização primária ocorre quando a vítima sofre diretamente o ato criminoso, sendo o alvo inicial do crime. Segundo Hindelang, Gottfredson e Garofalo (1978), este tipo de vitimização é o ponto de partida para a análise criminológica, pois permite identificar os fatores que tornam indivíduos ou grupos mais vulneráveis. Exemplos incluem furtos, assaltos, agressões físicas ou crimes sexuais, onde há contato direto entre o criminoso e a vítima.
•	Vitimização secundária
A vitimização secundária acontece quando a vítima é re-traumatizada pelas respostas institucionais ou sociais inadequadas, como procedimentos policiais insensíveis, atrasos na justiça ou exposição pública de informações pessoais resultante do contacto inadequado com instituições formais (Fattah, 2010).
Segundo Fattah (2010), “a vitimização secundária ocorre quando as vítimas são re-traumatizadas pelas respostas institucionais” (p. 87).
Este tipo de vitimização destaca a importância de políticas públicas e sistemas de proteção que respeitem e preservem a dignidade da vítima, prevenindo danos adicionais. A literatura indica que plataformas digitais podem ajudar a reduzir a vitimização secundária ao organizar dados de forma segura e permitir respostas mais rápidas (Van Dijk, 2015).
•	Vitimização terciária
A vitimização terciária refere-se ao impacto indireto ou simbólico do crime sobre familiares, amigos ou comunidades da vítima. Segundo Fattah (2010), este tipo de vitimização evidencia que a criminalidade não afeta apenas a vítima direta, mas também grupos sociais conectados, alterando percepções de segurança e confiança institucional.
No contexto angolano, compreender a vitimização terciária é fundamental para políticas de prevenção e programas de apoio comunitário, considerando o impacto coletivo de crimes como assaltos, violência urbana ou homicídios.
Teorias da Vitimização Criminal à luz do Contexto Angolano
A vitimização criminal constitui um fenómeno social que não se limita à ocorrência de crimes, mas envolve a experiência da vítima e os impactos sociais, psicológicos e económicos decorrentes do delito (Fattah, 2010). No contexto angolano, onde as estatísticas criminais oficiais podem não refletir totalmente a realidade urbana, a compreensão da vitimização depende tanto da análise de dados objetivos quanto da percepção subjetiva de segurança da população (Alemika, 2015).
As teorias da vitimização criminal oferecem modelos explicativos para entender quem é mais vulnerável, em que contextos ocorre a vitimização e quais fatores sociais, ambientais e individuais contribuem para ela, fornecendo uma base científica para políticas públicas de prevenção e intervenção.
a)	Teoria do Estilo de Vida (Lifestyle Theory)
A Teoria do Estilo de Vida, desenvolvida por Hindelang, Gottfredson e Garofalo (1978), propõe que a probabilidade de uma pessoa ser vítima de crime está relacionada aos seus hábitos, rotinas diárias e padrões de interação social. Indivíduos que frequentam certos locais, horários ou ambientes de risco têm maior exposição à criminalidade.
No contexto angolano, esta teoria ajuda a compreender como comportamentos urbanos, deslocamentos diários e interações sociais influenciam a vulnerabilidade à vitimização. Por exemplo, cidadãos que vivem ou circulam em bairros com pouca iluminação, alto índice de criminalidade ou falta de policiamento podem apresentar maior risco de vitimização (Alemika, 2015).
Esta teoria fundamenta a importância de recolher dados detalhados sobre hábitos e experiências da população, permitindo que políticas de segurança sejam direcionadas para reduzir a exposição ao risco e aumentar a sensação de proteção da comunidade.
b)	Teoria da Vitimização Repetida (Repeat Victimization Theory)
A Teoria da Vitimização Repetida, proposta por Farrell e Pease (1993), sustenta que certos indivíduos, grupos ou locais têm maior probabilidade de serem vítimas de crimes de forma recorrente. Essa vulnerabilidade pode derivar de fatores individuais, sociais ou ambientais que tornam a vítima ou o local mais atraente ou mais exposto à ação criminosa.
No contexto angolano, a aplicação desta teoria é fundamental para identificar padrões de criminalidade e vulnerabilidade recorrente, permitindo que as autoridades planeiem ações preventivas mais precisas. Por exemplo, bairros com maior incidência de furtos ou assaltos podem ser monitorizados com base em dados de vitimização, evitando que padrões de crime se repitam e aumentando a eficácia das políticas de segurança (Van Dijk, 2015).
A integração dessa teoria com plataformas digitais de recolha e gestão de dados criminais permite analisar tendências e prevenir crimes de forma mais sistemática, considerando tanto a criminalidade objetiva quanto a experiência subjetiva da população.
No contexto de Angola, onde os sistemas de informação criminal podem ser incompletos ou desatualizados, a aplicação dessas teorias oferece uma abordagem científica para compreender a vitimização. Ao combinar a Teoria do Estilo de Vida e a Teoria da Vitimização Repetida com inquéritos de vitimização criminal e plataformas digitais, é possível:
•	Identificar populações e locais mais vulneráveis, aumentando a eficácia das ações preventivas;
•	Planejar políticas públicas baseadas em evidências, direcionando recursos humanos e materiais para áreas de maior risco;
•	Reduzir a sensação de insegurança ao considerar tanto a criminalidade objetiva quanto a percepção da população;
•	Avaliar impactos das políticas de segurança, permitindo ajustes contínuos com base em dados sistematizados.
Deste modo, as teorias de vitimização criminal oferecem fundamento teórico robusto para orientar a prevenção do crime e a proteção da população, alinhando análise científica, percepção social e planeamento estratégico.
</p>
            {/* Adicione o conteúdo aqui futuramente */}
          </div>
        </div>
      )
    },
    {
      id: 9,
      titulo: "Importância do uso de inquéritos de vitimização criminal",
      conteudo: (
        <div className="space-y-6 animate-fade-in">
          <h3 className="text-2xl font-black text-primary border-b-2 border-primary/10 pb-2 uppercase tracking-tight">Importância do uso de inquéritos de vitimização criminal</h3>
          <div className="space-y-4 text-justify leading-relaxed text-foreground/90">
            <p className="italic text-muted-foreground">Os inquéritos de vitimização criminal são fundamentais para revelar a chamada cifra negra da criminalidade, correspondente aos crimes que não são denunciados às autoridades (Van Dijk, 2015).
Van Dijk (2015) afirma que “sem os inquéritos de vitimização, uma parte significativa da criminalidade permanece estatisticamente invisível” (p. 71).
O UNODC (2010) sustenta que estes instrumentos são indispensáveis para políticas públicas eficazes, ao declarar que “os dados de vitimização fornecem uma base de evidências para a prevenção do crime e para o planeamento da segurança” (p. 3).
Em contextos africanos e angolanos, marcados por níveis elevados de subnotificação, os inquéritos de vitimização permitem compreender as razões da não denúncia, como a desconfiança institucional e o medo de represálias (Alemika, 2015).
Alemika (2015) sublinha que “os inquéritos de vitimização são cruciais em contextos africanos onde os dados oficiais sobre criminalidade são incompletos ou pouco fiáveis” (p. 112).
Além disso, estes inquéritos contribuem para avaliar a percepção de segurança da população, elemento central para a legitimidade das políticas públicas e para o fortalecimento da confiança entre cidadãos e instituições de segurança (Jackson et al., 2017).
 Percepção de Segurança 
Na criminologia, a percepção de segurança refere-se à avaliação subjetiva que os cidadãos fazem sobre a sua proteção face à criminalidade, considerando fatores cognitivos, emocionais e sociais (Jackson et al., 2017). Assim, dois cidadãos podem vivenciar a mesma realidade criminal, mas ter percepções de segurança distintas, dependendo de experiências pessoais, nível de confiança nas autoridades e características do bairro ou comunidade.
Etimologicamente, o termo segurança deriva do latim securitas, significando estado de tranquilidade, ausência de perigo ou proteção contra riscos (Cunha & Cintra, 2019). O termo percepção deriva do latim perceptio, que significa ato ou efeito de apreender ou compreender algo pelos sentidos ou pela mente, indicando um processo cognitivo e subjetivo de apreensão da realidade (Cunha & Cintra, 2019).
Jackson et al. (2017) reforçam que a confiança na polícia e a sensação de segurança são determinantes centrais da percepção de segurança pelos cidadãos, mostrando que medidas objetivas de criminalidade não são suficientes para explicar o medo do crime ou a insegurança sentida.
Portanto, a percepção de segurança integra indicadores objetivos e subjetivos, sendo um conceito multifacetado que combina experiências pessoais, influência social e confiança institucional, servindo de base para o desenho de políticas públicas, programas de prevenção e estratégias de planeamento urbano.
A literatura identifica diferentes tipos de percepção de segurança, que permitem analisar a experiência social da população:
•	Percepção subjetiva individual: sensação pessoal de segurança ou vulnerabilidade em relação à criminalidade, influenciada por experiências de vitimização direta ou indireta, notícias e informações de vizinhos (Fattah, 2010).
•	Percepção comunitária ou coletiva: avaliação agregada da segurança dentro de uma comunidade, refletindo coesão social, capital social e experiências compartilhadas de crime ou prevenção (Sampson, 2012).
•	Percepção institucional: confiança na polícia, tribunais e outras instituições públicas de segurança, que afeta diretamente a sensação de proteção da população (Jackson et al., 2017).
•	Percepção situacional: relacionada a contextos ou locais específicos, como ruas mal iluminadas, transportes públicos ou horários noturnos, que influenciam a avaliação do risco (Van Dijk, 2015).
•	Percepção de risco: avaliação subjetiva da probabilidade de ser vítima de um crime, que pode ou não coincidir com indicadores objetivos de criminalidade.
•	Percepção de eficácia das medidas de segurança: sentimento da população sobre a adequação e eficiência das políticas e ações implementadas pelas autoridades.
•	Medo do crime: ainda que distinto, o medo do crime está estreitamente 
relacionado à percepção de segurança e influencia comportamentos diários, mobilidade urbana, participação comunitária e apoio a políticas de prevenção (Alemika, 2015).
Fatores como experiência de vitimização pessoal ou de terceiros, cobertura mediática, histórico de violência local e desigualdade social desempenham papel central na formação da percepção de segurança. Por exemplo, bairros com maior presença policial podem apresentar baixa criminalidade real, mas ainda assim gerar alto nível de insegurança se houver desconfiança nas instituições (Jackson et al., 2017).
Compreender essas dimensões é fundamental para planeamento de políticas públicas de segurança, desenho urbano, programas de prevenção e avaliação de medidas de proteção, garantindo que as respostas da sociedade e do Estado considerem não apenas a criminalidade objetiva, mas também a experiência subjetiva de insegurança.
</p>
            {/* Adicione o conteúdo aqui futuramente */}
          </div>
        </div>
      )
    },
    {
      id: 10,
      titulo: "Relação entre plataformas digitais, inquéritos de vitimização e percepção de segurança",
      conteudo: (
        <div className="space-y-6 animate-fade-in">
          <h3 className="text-2xl font-black text-primary border-b-2 border-primary/10 pb-2 uppercase tracking-tight leading-tight">Relação entre plataformas digitais, inquéritos de vitimização e percepção de segurança no planeamento de políticas públicas de segurança</h3>
          <div className="space-y-4 text-justify leading-relaxed text-foreground/90">
            <p className="italic text-muted-foreground">As plataformas digitais têm-se tornado ferramentas essenciais na recolha, organização e análise de dados criminais, permitindo que informações complexas sobre criminalidade, vitimização e percepção de segurança sejam tratadas de forma sistemática e acessível (Van Dijk, 2015).
Segundo Van Dijk (2015), os inquéritos de vitimização fornecem informações únicas sobre padrões de criminalidade e sentimentos de insegurança da população, e a integração destes dados em plataformas digitais facilita a identificação de tendências criminais e a tomada de decisão baseada em evidências.
Fattah (2010) salienta que a vitimização secundária, que ocorre quando as vítimas são re-traumatizadas por respostas institucionais inadequadas, pode ser minimizada com sistemas digitais que centralizem informações, permitindo respostas mais rápidas e eficazes das autoridades.
Os inquéritos de vitimização criminal são ferramentas que medem a criminalidade tal como experienciada pela população, independentemente dos dados oficiais da polícia (UNODC, 2010).
Segundo Van Dijk (2015), “os inquéritos de vitimização locais são particularmente úteis para compreender a dinâmica da criminalidade ao nível do bairro”. Ao integrar os resultados destes inquéritos em plataformas digitais, é possível mapear áreas de maior vulnerabilidade, identificar grupos sociais mais expostos à criminalidade e detectar lacunas na segurança pública.
Além disso, Jackson et al. (2017) destacam que a percepção de segurança está intimamente ligada à confiança na polícia e às experiências de vitimização, mostrando que o planeamento de políticas de segurança deve considerar tanto a criminalidade objetiva quanto a experiência subjetiva da população.
A percepção de segurança é um indicador essencial para o planeamento de políticas públicas, pois influencia o comportamento da população e a aceitação das medidas de prevenção criminal.
Fattah (2010) explica que a percepção de insegurança e o medo do crime são socialmente construídos e podem variar mesmo quando a criminalidade objetiva é baixa. Assim, plataformas digitais que consolidam dados de vitimização e indicadores de percepção de segurança permitem análises mais precisas sobre o impacto das políticas públicas e das medidas preventivas.
Alemika (2015) reforça que a utilização de dados confiáveis sobre vitimização e medo do crime em contextos africanos é fundamental para planeamento estratégico de segurança pública e para a implementação de programas de prevenção adaptados à realidade local.
A integração de plataformas digitais com inquéritos de vitimização e indicadores de percepção de segurança oferece uma base científica para a formulação de políticas públicas de segurança. Entre os principais impactos, destacam-se:
Tomada de decisão baseada em evidências: dados sistematizados permitem identificar áreas de risco e priorizar intervenções (Van Dijk, 2015).
Melhoria na alocação de recursos: informação precisa sobre zonas e horários críticos permite planeamento eficiente de policiamento e programas preventivos (Jackson et al., 2017).
Monitorização de políticas e programas: plataformas digitais permitem acompanhar em tempo real os efeitos das políticas implementadas e ajustar estratégias conforme necessário (Alemika, 2015).
Fortalecimento da confiança comunitária: transparência e comunicação dos resultados contribuem para aumentar a percepção de segurança e a cooperação da população com as autoridades (Fattah, 2010).
Deste modo, a convergência entre tecnologia, dados de vitimização e percepção social transforma a forma como as políticas de segurança são concebidas, planeadas e avaliadas, promovendo respostas mais eficazes à criminalidade e maior sensação de proteção à população
.</p>
            {/* Adicione o conteúdo aqui futuramente */}
          </div>
        </div>
      )
    },
    {
      id: 11,
      titulo: "DISCUSSÃO DOS RESULTADOS",
      conteudo: (
        <div className="space-y-6 animate-fade-in">
          <h3 className="text-2xl font-black text-primary border-b-2 border-primary/10 pb-2 uppercase tracking-tight">DISCUSSÃO DOS RESULTADOS</h3>
          <div className="space-y-4 text-justify leading-relaxed text-foreground/90">
            <p className="italic text-muted-foreground">Tabela 1
Distribuição dos inquiridos por faixa etária

Faixa etária	Frequência	Percentagem (%)
18–25 anos	146	28.0%
26–35 anos	168	32.2%
36–45 anos	104	19.9%
46–55 anos	62	11.9%
Mais de 55 anos	42	8.0%
Total	522	100%

Observa-se que a maior parte dos participantes pertence à faixa etária entre 26 e 35 anos, representando 32,2% da amostra. Este resultado sugere que a população economicamente ativa é também uma das mais expostas às dinâmicas urbanas e, consequentemente, a potenciais situações de vitimização criminal.
Estudos de vitimização indicam que indivíduos jovens e adultos apresentam maior probabilidade de exposição a crimes, especialmente em contextos urbanos caracterizados por elevada mobilidade social e laboral (Van Dijk, 2015). Assim, a predominância desta faixa etária na amostra pode influenciar a percepção de segurança e a experiência de vitimização reportada no estudo.
Experiência de vitimização criminal
A análise da experiência de vitimização nos últimos 12 meses revelou que uma parte significativa dos participantes relatou ter sido vítima de pelo menos um tipo de crime.


Tabela 2
Experiência de vitimização nos últimos 12 meses
Resposta	Frequência	Percentagem
(%)
Sim	214	41.0%
Não 	308	59.0%
Total	522	100%
		
		






		
Os resultados indicam que 41% dos participantes afirmaram ter sido vítimas de crime nos últimos 12 meses. Este valor demonstra a relevância do fenómeno da vitimização criminal no município da Samba.
Segundo Van Dijk (2015), taxas elevadas de vitimização são frequentemente observadas em áreas urbanas densamente povoadas, onde factores como desigualdade social, crescimento populacional e limitações institucionais podem aumentar a vulnerabilidade ao crime.
Além disso, a existência de um número significativo de vítimas reforça a necessidade de instrumentos sistemáticos de recolha e gestão de dados, como plataformas digitais, capazes de identificar padrões e apoiar estratégias de prevenção criminal.
Tipos de crimes reportados
A análise dos tipos de crimes reportados permitiu identificar quais delitos são mais frequentes entre os residentes do município da Samba.
Tabela 3
Tipos de crime reportados pelas vítimas
Tipo de crime	Frequência	Percentagem
(%)
Furto	98	45.8%
Roubo/Assalto	76	35.5%
Agressão física	24	11.2%
Outros	16	7.5%
Total		214	100%








		
									
Os resultados mostram que furto e roubo são os crimes mais reportados, representando juntos mais de 80% das ocorrências.
Este padrão é consistente com estudos internacionais de vitimização que indicam que crimes contra o património tendem a ser os mais frequentes em áreas urbanas (UNODC, 2010). Esses crimes são muitas vezes associados a oportunidades situacionais, falta de vigilância e vulnerabilidades ambientais.
No contexto angolano, estes resultados podem estar relacionados com fatores como urbanização acelerada, desigualdade socioeconómica e limitações na presença policial em determinados bairros.

Denúncia dos crimes às autoridades
Outro aspecto analisado foi o comportamento das vítimas em relação à denúncia dos crimes.
Tabela 4
Denúncia do crime às autoridades
Resposta	Frequência	Percentagem
(%)
Sim		86	40.2%
Não	128	59.8%
Total	214	100%






Os resultados indicam que 59,8% das vítimas não denunciaram os crimes às autoridades.
Este fenómeno confirma a existência da chamada cifra negra da criminalidade, que corresponde aos crimes não registados oficialmente (Van Dijk, 2015). A subnotificação pode ocorrer por diversos motivos, incluindo falta de confiança nas instituições, medo de represálias ou percepção de que a denúncia não produzirá resultados.
Neste contexto, plataformas digitais de recolha e gestão de dados podem contribuir para reduzir esta lacuna informacional, permitindo que informações sobre vitimização sejam recolhidas diretamente junto da população.

Percepção de segurança da população
A percepção de segurança representa um elemento central na análise das experiências sociais relacionadas à criminalidade.

Tabela 5
Sensação de segurança ao circular no bairro
Nível de segurança	Frequência	Percentagem
(%)
Muito seguro	42	8.0%
Seguro	168	32.2%
Pouco seguro	214	41.0%
Nada seguro	98	18.8%
Total	522	100%










Os resultados demonstram que quase 60% dos participantes sentem-se pouco seguros ou nada seguros ao circular no bairro.
De acordo com Jackson et al. (2017), a percepção de segurança não depende apenas da ocorrência real de crimes, mas também da confiança nas instituições, da presença policial e da qualidade do ambiente urbano.
Assim, mesmo em contextos onde a criminalidade não seja extremamente elevada, a sensação de insegurança pode persistir se os cidadãos não percebem mecanismos eficazes de proteção e prevenção.

</p>
            {/* Adicione o conteúdo aqui futuramente */}
          </div>
        </div>
      )
    },
    {
      id: 12,
      titulo: "Implicações para políticas públicas de segurança",
      conteudo: (
        <div className="space-y-6 animate-fade-in">
          <h3 className="text-2xl font-black text-primary border-b-2 border-primary/10 pb-2 uppercase tracking-tight">Implicações para políticas públicas de segurança</h3>
          <div className="space-y-4 text-justify leading-relaxed text-foreground/90">
            <p className="italic text-muted-foreground">Os resultados do estudo demonstram que a vitimização criminal e a percepção de insegurança são fenómenos interligados que exigem respostas institucionais integradas.
A elevada incidência de crimes contra o património, a baixa taxa de denúncia e os níveis significativos de insegurança percebida indicam a necessidade de políticas públicas baseadas em dados sistematizados.
Neste sentido, o desenvolvimento de uma plataforma digital para recolha e análise de dados de vitimização criminal pode contribuir para:
•	melhorar a gestão da informação sobre criminalidade;
•	identificar áreas de maior risco;
•	apoiar decisões estratégicas das autoridades;
•	reduzir a fragmentação dos dados criminais.
Como argumenta Kitchin (2021), plataformas digitais de gestão de dados públicos permitem transformar grandes volumes de informação em evidências úteis para planeamento e governação.
Assim, a integração entre Ciências Criminais e Engenharia Informática apresenta-se como uma abordagem inovadora para fortalecer as estratégias de prevenção criminal e promover políticas de segurança mais eficazes no município da Samba.

</p>
            {/* Adicione o conteúdo aqui futuramente */}
          </div>
        </div>
      )
    },
    {
      id: 13,
      titulo: "CONCLUSÃO",
      conteudo: (
        <div className="space-y-6 animate-fade-in">
          <h3 className="text-2xl font-black text-primary border-b-2 border-primary/10 pb-2 uppercase tracking-tight">CONCLUSÃO</h3>
          <div className="space-y-4 text-justify leading-relaxed text-foreground/90">
            <p className="italic text-muted-foreground">O presente estudo teve como objectivo desenvolver uma plataforma digital para monitoramento da vitimização criminal e percepção de segurança no município da Samba, em Luanda.
Os resultados evidenciaram níveis significativos de vitimização criminal, associados a uma baixa taxa de denúncia às autoridades e a uma elevada percepção de insegurança entre os moradores.
A plataforma digital desenvolvida demonstrou potencial para melhorar a recolha, organização e análise de dados sobre criminalidade, contribuindo para a identificação de padrões criminais e para o desenvolvimento de políticas públicas de segurança mais eficazes.
Conclui-se que a integração entre tecnologias digitais e estudos criminológicos pode representar uma estratégia inovadora para o fortalecimento das políticas de prevenção criminal no contexto angolano.
</p>
            {/* Adicione o conteúdo aqui futuramente */}
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AppHeader />
      <main className="flex-grow">
        
        {/* SEÇÃO 1: INTRODUÇÃO AO ESTUDO */}
        <section className="py-16 bg-background border-b border-primary/5">
          <div className="mx-auto max-w-5xl px-6">
            <div className="flex items-center gap-3 text-primary font-bold mb-4">
              <BookOpen className="w-6 h-6" />
              <span className="uppercase tracking-widest text-sm">O Estudo Científico</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-foreground mb-8 leading-tight">
              Desenvolvimento de uma <br/>
              <span className="text-primary">Plataforma Digital de Segurança</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
              Uma investigação multidisciplinar que une o Direito Criminal e a Engenharia Informática para compreender o fenómeno da criminalidade no Município da Samba através de dados reais e tecnologia.
            </p>
          </div>
        </section>

        {/* SEÇÃO 2: ARTIGO CIENTÍFICO COM PAGINAÇÃO */}
        <section id="artigo-cientifico" className="py-20 bg-muted/20 scroll-mt-20">
          <div className="mx-auto max-w-5xl px-6">
            <div className="flex items-center gap-3 text-primary font-bold mb-8">
              <FileText className="w-8 h-8" />
              <h2 className="text-3xl font-black uppercase tracking-tight">Artigo Científico</h2>
            </div>

            <Card className="border-primary/10 shadow-2xl bg-white overflow-hidden min-h-[650px] flex flex-col transition-all duration-500">
              <CardHeader className="bg-slate-50 border-b flex flex-row items-center justify-between py-4 px-6">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-primary border-primary font-mono">
                    PÁGINA {currentPage} / {paginasArtigo.length}
                  </Badge>
                  <Separator orientation="vertical" className="h-4 mx-2 hidden sm:block" />
                  <span className="text-xs font-black text-slate-500 uppercase hidden sm:inline tracking-tighter">
                    {paginasArtigo[currentPage - 1].titulo}
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="h-8 w-8 p-0 rounded-full border-primary/20"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handlePageChange(Math.min(paginasArtigo.length, currentPage + 1))}
                    disabled={currentPage === paginasArtigo.length}
                    className="h-8 w-8 p-0 rounded-full border-primary/20"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="p-8 md:p-16 flex-grow overflow-auto">
                <div className="max-w-3xl mx-auto">
                  {paginasArtigo[currentPage - 1].conteudo}
                </div>
                
                {/* BOTÕES DE NAVEGAÇÃO NO RODAPÉ DO CONTEÚDO */}
                <div className="mt-16 pt-8 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <Button
                    variant="ghost"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="text-muted-foreground hover:text-primary"
                  >
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Página Anterior
                  </Button>
                  
                  <div className="flex gap-2 flex-wrap justify-center max-w-[200px] sm:max-w-none">
                    {paginasArtigo.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => handlePageChange(p.id)}
                        className={`h-2 rounded-full transition-all ${
                          currentPage === p.id 
                            ? 'w-8 bg-primary' 
                            : 'w-2 bg-slate-200'
                        }`}
                        title={p.titulo}
                      />
                    ))}
                  </div>

                  <Button
                    variant="ghost"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === paginasArtigo.length}
                    className="text-muted-foreground hover:text-primary"
                  >
                    Próxima Página
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>

              <div className="px-6 py-3 bg-slate-50 border-t flex items-center justify-between text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                <span>Safe Angola • Estudo 2025</span>
                <span className="hidden md:block">Faculdade de Engenharia e Ciências Criminais</span>
              </div>
            </Card>

            <div className="mt-12 flex flex-col items-center gap-6">
              <p className="text-sm text-muted-foreground font-medium italic text-center max-w-lg">
                Este estudo visa fornecer embasamento científico para as ações de prevenção criminal no Município da Samba.
              </p>
              <div className="flex gap-4">
                <Button variant="outline" className="rounded-full border-primary/20 text-primary hover:bg-primary/5">
                  <FileText className="w-4 h-4 mr-2" /> Baixar PDF Completo
                </Button>
                <Button variant="outline" className="rounded-full border-primary/20 text-primary hover:bg-primary/5">
                  <Users className="w-4 h-4 mr-2" /> Ver Equipa
                </Button>
              </div>
            </div>
          </div>
        </section>

      </main>
      <AppFooter />
    </div>
  );
}
