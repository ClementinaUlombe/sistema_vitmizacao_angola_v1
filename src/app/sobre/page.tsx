"use client";

import { useState } from "react";
import { AppHeader } from "@/components/AppHeader";
import { AppFooter } from "@/components/AppFooter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Target, 
  Lightbulb, 
  BookOpen, 
  Info, 
  Shield, 
  BarChart3, 
  Lock, 
  Users, 
  ChevronLeft, 
  ChevronRight,
  FileText,
  User
} from "lucide-react";

export default function SobrePage() {
  const [currentPage, setCurrentPage] = useState(1);

  const paginasArtigo = [
    {
      id: 1,
      titulo: "Identificação e Resumos",
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
              <p className="text-[10px] text-blue-600 font-mono">ORCID: https://orcid.org/0009-0003-0457-1302</p>
            </div>
            <div className="space-y-2 md:text-right">
              <div className="flex items-center gap-2 text-primary font-bold md:justify-end">
                <User className="w-4 h-4" /> <span>Autora 2</span>
              </div>
              <p className="font-bold text-lg">Clementina K. Ulombe</p>
              <p className="text-xs text-muted-foreground font-medium">Finalista de Engenharia Informática</p>
              <p className="text-xs text-muted-foreground">Instituto Superior Politécnico de Ciências e Tecnologia</p>
              <p className="text-[10px] text-blue-600 font-mono">ORCID: https://orcid.org/0009-0001-4952-4599</p>
            </div>
          </div>

          <div className="space-y-8 text-sm leading-relaxed">
            <div>
              <h3 className="font-black text-primary mb-3 uppercase tracking-widest border-l-4 border-primary pl-3">RESUMO</h3>
              <p className="text-justify text-foreground/90">A vitimização criminal constitui um fenómeno complexo que impacta directamente a segurança pública, a formulação de políticas de prevenção e a percepção de segurança das populações. Em contextos urbanos, a ausência de sistemas centralizados para a recolha, organização e análise de dados de vitimização criminal contribui para a fragmentação da informação, dificultando o acompanhamento das vítimas e a identificação de padrões criminais. Neste sentido, o presente artigo tem como objectivo desenvolver uma plataforma digital com base na análise de inquéritos de vitimização criminal e percepção de segurança no município da Samba, no ano de 2025, com vista a contribuir para a melhoria da recolha e gestão de dados e apoiar as políticas de segurança pública e de prevenção criminal. A pesquisa adopta uma abordagem mista, combinando métodos quantitativos e qualitativos, com recurso à pesquisa bibliográfica e à pesquisa de campo, através da aplicação de inquéritos à população local. Os resultados esperados apontam para uma melhoria na sistematização dos dados, maior acessibilidade à informação e apoio à tomada de decisão por parte das instituições responsáveis pela segurança pública. Conclui-se que a integração entre Ciências Criminais e Engenharia Informática, por meio de plataformas digitais, pode fortalecer estratégias de prevenção criminal e promover políticas públicas mais eficazes e baseadas em evidências.</p>
              <p className="mt-3 font-bold text-xs"><span className="text-primary">Palavras-chave:</span> Plataformas digitais; Inquérito de vitimização criminal; Percepção de segurança.</p>
            </div>

            <div>
              <h3 className="font-black text-slate-500 mb-3 uppercase tracking-widest border-l-4 border-slate-300 pl-3">ABSTRACT</h3>
              <p className="text-justify text-foreground/80">Criminal victimization constitutes a complex phenomenon that directly impacts public security, the formulation of crime prevention policies, and the population’s perception of safety. In urban contexts, the absence of centralized systems for collecting, organizing, and analyzing criminal victimization data contributes to information fragmentation, making it difficult to monitor victims and identify crime patterns. In this context, the present study aims to develop a digital platform based on the analysis of criminal victimization surveys and perceptions of security in the municipality of Samba in 2025, with the purpose of improving data collection and management and supporting public security and crime prevention policies. The research adopts a mixed-methods approach, combining quantitative and qualitative methods through bibliographic research and field research, including the application of surveys to the local population. The expected results indicate improvements in data systematization, greater accessibility to information, and support for decision-making by institutions responsible for public security. It is concluded that the integration between Criminal Sciences and Computer Engineering, through digital platforms, can strengthen crime prevention strategies and promote more effective evidence-based public policies.</p>
              <p className="mt-3 font-bold text-xs"><span className="text-slate-500">Keywords:</span> Digital platforms; Criminal victimization survey; Perception of security.</p>
            </div>

            <div>
              <h3 className="font-black text-slate-500 mb-3 uppercase tracking-widest border-l-4 border-slate-300 pl-3">RESUMEN</h3>
              <p className="text-justify text-foreground/80">
La victimización criminal constituye un fenómeno complejo que impacta directamente en la seguridad pública, en la formulación de políticas de prevención del delito y en la percepción de seguridad de la población. En contextos urbanos, la ausencia de sistemas centralizados para la recolección, organización y análisis de datos de victimización criminal contribuye a la fragmentación de la información, dificultando el seguimiento de las víctimas y la identificación de patrones delictivos. En este sentido, el presente estudio tiene como objetivo desarrollar una plataforma digital basada en el análisis de encuestas de victimización criminal y percepción de seguridad en el municipio de Samba en el año 2025, con el fin de mejorar la recolección y gestión de datos y apoyar las políticas públicas de seguridad y prevención del delito. La investigación adopta un enfoque metodológico mixto, combinando métodos cuantitativos y cualitativos, mediante investigación bibliográfica y trabajo de campo, incluyendo la aplicación de encuestas a la población local. Los resultados esperados apuntan a una mejora en la sistematización de los datos, mayor accesibilidad a la información y apoyo en la toma de decisiones por parte de las instituciones responsables de la seguridad pública. Se concluye que la integración entre las Ciencias Criminales y la Ingeniería Informática, a través de plataformas digitales, puede fortalecer las estrategias de prevención del delito y promover políticas públicas más eficaces basadas en evidencia.              </p>
              <p className="mt-3 font-bold text-xs"><span className="text-slate-500">Palabras clave:</span> Plataformas digitales; Encuesta de victimización criminal; Percepción de seguridad.</p>
            </div>
            <div>
              <h3 className="font-black text-slate-500 mb-3 uppercase tracking-widest border-l-4 border-slate-300 pl-3">INTRODUÇÃO</h3>
              <p className="text-justify text-foreground/80">
A vitimização criminal constitui, a nível mundial, um fenómeno complexo que ultrapassa a mera ocorrência do crime, envolvendo dimensões sociais, psicológicas, económicas e institucionais. A literatura internacional tem demonstrado que os dados provenientes dos registros oficiais não conseguem captar, de forma integral, a real magnitude da criminalidade, uma vez que uma parcela significativa das vítimas opta por não denunciar os crimes sofridos. Esta limitação compromete a capacidade dos Estados em compreender o fenómeno criminal e em formular políticas públicas eficazes e orientadas para a prevenção.
Neste sentido, os inquéritos de vitimização criminal assumem um papel central ao possibilitarem a recolha directa de informações junto das vítimas, permitindo identificar padrões de vitimização, factores de risco e níveis de percepção de segurança. A produção desse tipo de informação contribui para uma visão mais abrangente da criminalidade, ao integrar dados quantitativos e qualitativos que não se encontram disponíveis nos sistemas tradicionais de registo. A eficácia desses inquéritos depende, em grande medida, da forma como os dados são recolhidos, organizados, armazenados e analisados.
Com o avanço das tecnologias digitais, observa-se uma crescente aposta no uso de plataformas digitais como instrumentos de apoio à recolha e gestão de dados no domínio da segurança pública. Essas plataformas possibilitam a sistematização das informações, a redução da fragmentação dos dados e a melhoria do acesso por parte de investigadores, gestores públicos e instituições responsáveis pela segurança. Assim, a articulação entre inquéritos de vitimização criminal, percepção de segurança e plataformas digitais revela-se fundamental para o fortalecimento da gestão da informação e para a tomada de decisões baseadas em evidências.
No contexto angolano, a criminalidade urbana representa um desafio relevante para a segurança pública, particularmente nas grandes cidades, onde factores como crescimento populacional acelerado, desigualdades sociais e fragilidades institucionais contribuem para a complexidade do fenómeno criminal. Apesar dos esforços das autoridades, persistem dificuldades na recolha e gestão sistemática de dados sobre vitimização criminal, o que limita a capacidade de avaliação das políticas de prevenção e controlo do crime.
A dependência predominante dos registos oficiais tende a invisibilizar experiências de vitimização não denunciadas, bem como as percepções de insegurança vivenciadas pela população. Esta lacuna informacional compromete a formulação de estratégias preventivas eficazes, uma vez que as decisões são tomadas com base em dados incompletos ou pouco organizados. Torna-se, portanto, necessário investir em mecanismos que permitam organizar e sistematizar os dados de vitimização criminal de forma estruturada e acessível.
Neste cenário, o uso de plataformas digitais surge como uma alternativa capaz de melhorar a recolha, a gestão e a análise dos dados relacionados à vitimização criminal e à percepção de segurança. Ao permitir o acesso integrado à informação, essas plataformas podem apoiar as instituições responsáveis pela segurança pública, promovendo maior eficiência na análise dos dados e contribuindo para decisões mais informadas no planeamento de políticas públicas de segurança e prevenção criminal.
A nível local, a província de Luanda apresenta características específicas que intensificam os desafios relacionados à vitimização criminal, destacando-se a elevada densidade populacional e a diversidade de contextos socioeconómicos. O município da Samba insere-se nesse contexto urbano complexo, onde as dinâmicas sociais e espaciais influenciam tanto a ocorrência dos crimes quanto a percepção de segurança da população residente.
A inexistência de sistemas ou plataformas digitais centralizadas para a recolha e análise de inquéritos de vitimização no município  dificulta a identificação de padrões criminais e a localização de áreas mais vulneráveis. A dispersão dos dados impede uma leitura integrada do fenómeno, limitando o acompanhamento das vítimas e reduzindo a eficácia das estratégias de prevenção criminal adoptadas a nível comunitário.
Diante desse contexto, torna-se pertinente o desenvolvimento de uma plataforma digital orientada para a análise de inquéritos de vitimização criminal e percepção de segurança no município da Samba. Ao possibilitar a organização estruturada dos dados, a plataforma poderá apoiar a identificação de áreas de risco, facilitar o acesso à informação por parte das autoridades e contribuir para uma compreensão mais aprofundada da vitimização criminal. Assim, o estudo propõe-se a reforçar a tomada de decisão no planeamento de políticas de segurança pública, integrando os contributos das Ciências Criminais e da Engenharia Informática.
              </p>
            </div>
            
            <div>
              <h3 className="font-black text-slate-500 mb-3 uppercase tracking-widest border-l-4 border-slate-300 pl-3">RESUMEN</h3>
              <p className="text-justify text-foreground/80">La victimización criminal constituye un fenómeno complejo que impacta directamente en la seguridad pública, en la formulación de políticas de prevención del delito y en la percepción de seguridad de la población. En contextos urbanos, la ausencia de sistemas centralizados para la recolección, organización y análisis de datos de victimización criminal contribuye a la fragmentación de la información, dificultando el seguimiento de las víctimas y la identificación de patrones delictivos. En este sentido, el presente estudio tiene como objetivo desarrollar una plataforma digital basada en el análisis de encuestas de victimización criminal y percepción de seguridad en el municipio de Samba en el año 2025, con el fin de mejorar la recolección y gestión de datos y apoyar las políticas públicas de seguridad y prevención del delito. La investigación adopta un enfoque metodológico mixto, combinando métodos con el propósito de fortalecer estrategias de prevención.</p>
              <p className="mt-3 font-bold text-xs"><span className="text-slate-500">Palabras clave:</span> Plataformas digitales; Encuesta de victimización criminal; Percepción de seguridad.</p>
            </div>
            <div>
              <h3 className="font-black text-slate-500 mb-3 uppercase tracking-widest border-l-4 border-slate-300 pl-3">RESUMEN</h3>
              <p className="text-justify text-foreground/80">La victimización criminal constituye un fenómeno complejo que impacta directamente en la seguridad pública, en la formulación de políticas de prevención del delito y en la percepción de seguridad de la población. En contextos urbanos, la ausencia de sistemas centralizados para la recolección, organización y análisis de datos de victimización criminal contribuye a la fragmentación de la información, dificultando el seguimiento de las víctimas y la identificación de patrones delictivos. En este sentido, el presente estudio tiene como objetivo desarrollar una plataforma digital basada en el análisis de encuestas de victimización criminal y percepción de seguridad en el municipio de Samba en el año 2025, con el fin de mejorar la recolección y gestión de datos y apoyar las políticas públicas de seguridad y prevención del delito. La investigación adopta un enfoque metodológico mixto, combinando métodos con el propósito de fortalecer estrategias de prevención.</p>
              <p className="mt-3 font-bold text-xs"><span className="text-slate-500">Palabras clave:</span> Plataformas digitales; Encuesta de victimización criminal; Percepción de seguridad.</p>
            </div>
            <div>
              <h3 className="font-black text-slate-500 mb-3 uppercase tracking-widest border-l-4 border-slate-300 pl-3">RESUMEN</h3>
              <p className="text-justify text-foreground/80">La victimización criminal constituye un fenómeno complejo que impacta directamente en la seguridad pública, en la formulación de políticas de prevención del delito y en la percepción de seguridad de la población. En contextos urbanos, la ausencia de sistemas centralizados para la recolección, organización y análisis de datos de victimización criminal contribuye a la fragmentación de la información, dificultando el seguimiento de las víctimas y la identificación de patrones delictivos. En este sentido, el presente estudio tiene como objetivo desarrollar una plataforma digital basada en el análisis de encuestas de victimización criminal y percepción de seguridad en el municipio de Samba en el año 2025, con el fin de mejorar la recolección y gestión de datos y apoyar las políticas públicas de seguridad y prevención del delito. La investigación adopta un enfoque metodológico mixto, combinando métodos con el propósito de fortalecer estrategias de prevención.</p>
              <p className="mt-3 font-bold text-xs"><span className="text-slate-500">Palabras clave:</span> Plataformas digitales; Encuesta de victimización criminal; Percepción de seguridad.</p>
            </div>
            <div>
              <h3 className="font-black text-slate-500 mb-3 uppercase tracking-widest border-l-4 border-slate-300 pl-3">RESUMEN</h3>
              <p className="text-justify text-foreground/80">La victimización criminal constituye un fenómeno complejo que impacta directamente en la seguridad pública, en la formulación de políticas de prevención del delito y en la percepción de seguridad de la población. En contextos urbanos, la ausencia de sistemas centralizados para la recolección, organización y análisis de datos de victimización criminal contribuye a la fragmentación de la información, dificultando el seguimiento de las víctimas y la identificación de patrones delictivos. En este sentido, el presente estudio tiene como objetivo desarrollar una plataforma digital basada en el análisis de encuestas de victimización criminal y percepción de seguridad en el municipio de Samba en el año 2025, con el fin de mejorar la recolección y gestión de datos y apoyar las políticas públicas de seguridad y prevención del delito. La investigación adopta un enfoque metodológico mixto, combinando métodos con el propósito de fortalecer estrategias de prevención.</p>
              <p className="mt-3 font-bold text-xs"><span className="text-slate-500">Palabras clave:</span> Plataformas digitales; Encuesta de victimización criminal; Percepción de seguridad.</p>
            </div>
            <div>
              <h3 className="font-black text-slate-500 mb-3 uppercase tracking-widest border-l-4 border-slate-300 pl-3">RESUMEN</h3>
              <p className="text-justify text-foreground/80">La victimización criminal constituye un fenómeno complejo que impacta directamente en la seguridad pública, en la formulación de políticas de prevención del delito y en la percepción de seguridad de la población. En contextos urbanos, la ausencia de sistemas centralizados para la recolección, organización y análisis de datos de victimización criminal contribuye a la fragmentación de la información, dificultando el seguimiento de las víctimas y la identificación de patrones delictivos. En este sentido, el presente estudio tiene como objetivo desarrollar una plataforma digital basada en el análisis de encuestas de victimización criminal y percepción de seguridad en el municipio de Samba en el año 2025, con el fin de mejorar la recolección y gestión de datos y apoyar las políticas públicas de seguridad y prevención del delito. La investigación adopta un enfoque metodológico mixto, combinando métodos con el propósito de fortalecer estrategias de prevención.</p>
              <p className="mt-3 font-bold text-xs"><span className="text-slate-500">Palabras clave:</span> Plataformas digitales; Encuesta de victimización criminal; Percepción de seguridad.</p>
            </div>
            <div>
              <h3 className="font-black text-slate-500 mb-3 uppercase tracking-widest border-l-4 border-slate-300 pl-3">RESUMEN</h3>
              <p className="text-justify text-foreground/80">La victimización criminal constituye un fenómeno complejo que impacta directamente en la seguridad pública, en la formulación de políticas de prevención del delito y en la percepción de seguridad de la población. En contextos urbanos, la ausencia de sistemas centralizados para la recolección, organización y análisis de datos de victimización criminal contribuye a la fragmentación de la información, dificultando el seguimiento de las víctimas y la identificación de patrones delictivos. En este sentido, el presente estudio tiene como objetivo desarrollar una plataforma digital basada en el análisis de encuestas de victimización criminal y percepción de seguridad en el municipio de Samba en el año 2025, con el fin de mejorar la recolección y gestión de datos y apoyar las políticas públicas de seguridad y prevención del delito. La investigación adopta un enfoque metodológico mixto, combinando métodos con el propósito de fortalecer estrategias de prevención.</p>
              <p className="mt-3 font-bold text-xs"><span className="text-slate-500">Palabras clave:</span> Plataformas digitales; Encuesta de victimización criminal; Percepción de seguridad.</p>
            </div>
            <div>
              <h3 className="font-black text-slate-500 mb-3 uppercase tracking-widest border-l-4 border-slate-300 pl-3">RESUMEN</h3>
              <p className="text-justify text-foreground/80">La victimización criminal constituye un fenómeno complejo que impacta directamente en la seguridad pública, en la formulación de políticas de prevención del delito y en la percepción de seguridad de la población. En contextos urbanos, la ausencia de sistemas centralizados para la recolección, organización y análisis de datos de victimización criminal contribuye a la fragmentación de la información, dificultando el seguimiento de las víctimas y la identificación de patrones delictivos. En este sentido, el presente estudio tiene como objetivo desarrollar una plataforma digital basada en el análisis de encuestas de victimización criminal y percepción de seguridad en el municipio de Samba en el año 2025, con el fin de mejorar la recolección y gestión de datos y apoyar las políticas públicas de seguridad y prevención del delito. La investigación adopta un enfoque metodológico mixto, combinando métodos con el propósito de fortalecer estrategias de prevención.</p>
              <p className="mt-3 font-bold text-xs"><span className="text-slate-500">Palabras clave:</span> Plataformas digitales; Encuesta de victimización criminal; Percepción de seguridad.</p>
            </div>
            <div>
              <h3 className="font-black text-slate-500 mb-3 uppercase tracking-widest border-l-4 border-slate-300 pl-3">RESUMEN</h3>
              <p className="text-justify text-foreground/80">La victimización criminal constituye un fenómeno complejo que impacta directamente en la seguridad pública, en la formulación de políticas de prevención del delito y en la percepción de seguridad de la población. En contextos urbanos, la ausencia de sistemas centralizados para la recolección, organización y análisis de datos de victimización criminal contribuye a la fragmentación de la información, dificultando el seguimiento de las víctimas y la identificación de patrones delictivos. En este sentido, el presente estudio tiene como objetivo desarrollar una plataforma digital basada en el análisis de encuestas de victimización criminal y percepción de seguridad en el municipio de Samba en el año 2025, con el fin de mejorar la recolección y gestión de datos y apoyar las políticas públicas de seguridad y prevención del delito. La investigación adopta un enfoque metodológico mixto, combinando métodos con el propósito de fortalecer estrategias de prevención.</p>
              <p className="mt-3 font-bold text-xs"><span className="text-slate-500">Palabras clave:</span> Plataformas digitales; Encuesta de victimización criminal; Percepción de seguridad.</p>
            </div>
            <div>
              <h3 className="font-black text-slate-500 mb-3 uppercase tracking-widest border-l-4 border-slate-300 pl-3">RESUMEN</h3>
              <p className="text-justify text-foreground/80">La victimización criminal constituye un fenómeno complejo que impacta directamente en la seguridad pública, en la formulación de políticas de prevención del delito y en la percepción de seguridad de la población. En contextos urbanos, la ausencia de sistemas centralizados para la recolección, organización y análisis de datos de victimización criminal contribuye a la fragmentación de la información, dificultando el seguimiento de las víctimas y la identificación de patrones delictivos. En este sentido, el presente estudio tiene como objetivo desarrollar una plataforma digital basada en el análisis de encuestas de victimización criminal y percepción de seguridad en el municipio de Samba en el año 2025, con el fin de mejorar la recolección y gestión de datos y apoyar las políticas públicas de seguridad y prevención del delito. La investigación adopta un enfoque metodológico mixto, combinando métodos con el propósito de fortalecer estrategias de prevención.</p>
              <p className="mt-3 font-bold text-xs"><span className="text-slate-500">Palabras clave:</span> Plataformas digitales; Encuesta de victimización criminal; Percepción de seguridad.</p>
            </div>
            <div>
              <h3 className="font-black text-slate-500 mb-3 uppercase tracking-widest border-l-4 border-slate-300 pl-3">RESUMEN</h3>
              <p className="text-justify text-foreground/80">La victimización criminal constituye un fenómeno complejo que impacta directamente en la seguridad pública, en la formulación de políticas de prevención del delito y en la percepción de seguridad de la población. En contextos urbanos, la ausencia de sistemas centralizados para la recolección, organización y análisis de datos de victimización criminal contribuye a la fragmentación de la información, dificultando el seguimiento de las víctimas y la identificación de patrones delictivos. En este sentido, el presente estudio tiene como objetivo desarrollar una plataforma digital basada en el análisis de encuestas de victimización criminal y percepción de seguridad en el municipio de Samba en el año 2025, con el fin de mejorar la recolección y gestión de datos y apoyar las políticas públicas de seguridad y prevención del delito. La investigación adopta un enfoque metodológico mixto, combinando métodos con el propósito de fortalecer estrategias de prevención.</p>
              <p className="mt-3 font-bold text-xs"><span className="text-slate-500">Palabras clave:</span> Plataformas digitales; Encuesta de victimización criminal; Percepción de seguridad.</p>
            </div>
            <div>
              <h3 className="font-black text-slate-500 mb-3 uppercase tracking-widest border-l-4 border-slate-300 pl-3">RESUMEN</h3>
              <p className="text-justify text-foreground/80">La victimización criminal constituye un fenómeno complejo que impacta directamente en la seguridad pública, en la formulación de políticas de prevención del delito y en la percepción de seguridad de la población. En contextos urbanos, la ausencia de sistemas centralizados para la recolección, organización y análisis de datos de victimización criminal contribuye a la fragmentación de la información, dificultando el seguimiento de las víctimas y la identificación de patrones delictivos. En este sentido, el presente estudio tiene como objetivo desarrollar una plataforma digital basada en el análisis de encuestas de victimización criminal y percepción de seguridad en el municipio de Samba en el año 2025, con el fin de mejorar la recolección y gestión de datos y apoyar las políticas públicas de seguridad y prevención del delito. La investigación adopta un enfoque metodológico mixto, combinando métodos con el propósito de fortalecer estrategias de prevención.</p>
              <p className="mt-3 font-bold text-xs"><span className="text-slate-500">Palabras clave:</span> Plataformas digitales; Encuesta de victimización criminal; Percepción de seguridad.</p>
            </div>
            <div>
              <h3 className="font-black text-slate-500 mb-3 uppercase tracking-widest border-l-4 border-slate-300 pl-3">RESUMEN</h3>
              <p className="text-justify text-foreground/80">La victimización criminal constituye un fenómeno complejo que impacta directamente en la seguridad pública, en la formulación de políticas de prevención del delito y en la percepción de seguridad de la población. En contextos urbanos, la ausencia de sistemas centralizados para la recolección, organización y análisis de datos de victimización criminal contribuye a la fragmentación de la información, dificultando el seguimiento de las víctimas y la identificación de patrones delictivos. En este sentido, el presente estudio tiene como objetivo desarrollar una plataforma digital basada en el análisis de encuestas de victimización criminal y percepción de seguridad en el municipio de Samba en el año 2025, con el fin de mejorar la recolección y gestión de datos y apoyar las políticas públicas de seguridad y prevención del delito. La investigación adopta un enfoque metodológico mixto, combinando métodos con el propósito de fortalecer estrategias de prevención.</p>
              <p className="mt-3 font-bold text-xs"><span className="text-slate-500">Palabras clave:</span> Plataformas digitales; Encuesta de victimización criminal; Percepción de seguridad.</p>
            </div>
            <div>
              <h3 className="font-black text-slate-500 mb-3 uppercase tracking-widest border-l-4 border-slate-300 pl-3">RESUMEN</h3>
              <p className="text-justify text-foreground/80">La victimización criminal constituye un fenómeno complejo que impacta directamente en la seguridad pública, en la formulación de políticas de prevención del delito y en la percepción de seguridad de la población. En contextos urbanos, la ausencia de sistemas centralizados para la recolección, organización y análisis de datos de victimización criminal contribuye a la fragmentación de la información, dificultando el seguimiento de las víctimas y la identificación de patrones delictivos. En este sentido, el presente estudio tiene como objetivo desarrollar una plataforma digital basada en el análisis de encuestas de victimización criminal y percepción de seguridad en el municipio de Samba en el año 2025, con el fin de mejorar la recolección y gestión de datos y apoyar las políticas públicas de seguridad y prevención del delito. La investigación adopta un enfoque metodológico mixto, combinando métodos con el propósito de fortalecer estrategias de prevención.</p>
              <p className="mt-3 font-bold text-xs"><span className="text-slate-500">Palabras clave:</span> Plataformas digitales; Encuesta de victimización criminal; Percepción de seguridad.</p>
            </div>
            <div>
              <h3 className="font-black text-slate-500 mb-3 uppercase tracking-widest border-l-4 border-slate-300 pl-3">RESUMEN</h3>
              <p className="text-justify text-foreground/80">La victimización criminal constituye un fenómeno complejo que impacta directamente en la seguridad pública, en la formulación de políticas de prevención del delito y en la percepción de seguridad de la población. En contextos urbanos, la ausencia de sistemas centralizados para la recolección, organización y análisis de datos de victimización criminal contribuye a la fragmentación de la información, dificultando el seguimiento de las víctimas y la identificación de patrones delictivos. En este sentido, el presente estudio tiene como objetivo desarrollar una plataforma digital basada en el análisis de encuestas de victimización criminal y percepción de seguridad en el municipio de Samba en el año 2025, con el fin de mejorar la recolección y gestión de datos y apoyar las políticas públicas de seguridad y prevención del delito. La investigación adopta un enfoque metodológico mixto, combinando métodos con el propósito de fortalecer estrategias de prevención.</p>
              <p className="mt-3 font-bold text-xs"><span className="text-slate-500">Palabras clave:</span> Plataformas digitales; Encuesta de victimización criminal; Percepción de seguridad.</p>
            </div>
            <div>
              <h3 className="font-black text-slate-500 mb-3 uppercase tracking-widest border-l-4 border-slate-300 pl-3">RESUMEN</h3>
              <p className="text-justify text-foreground/80">La victimización criminal constituye un fenómeno complejo que impacta directamente en la seguridad pública, en la formulación de políticas de prevención del delito y en la percepción de seguridad de la población. En contextos urbanos, la ausencia de sistemas centralizados para la recolección, organización y análisis de datos de victimización criminal contribuye a la fragmentación de la información, dificultando el seguimiento de las víctimas y la identificación de patrones delictivos. En este sentido, el presente estudio tiene como objetivo desarrollar una plataforma digital basada en el análisis de encuestas de victimización criminal y percepción de seguridad en el municipio de Samba en el año 2025, con el fin de mejorar la recolección y gestión de datos y apoyar las políticas públicas de seguridad y prevención del delito. La investigación adopta un enfoque metodológico mixto, combinando métodos con el propósito de fortalecer estrategias de prevención.</p>
              <p className="mt-3 font-bold text-xs"><span className="text-slate-500">Palabras clave:</span> Plataformas digitales; Encuesta de victimización criminal; Percepción de seguridad.</p>
            </div>
            <div>
              <h3 className="font-black text-slate-500 mb-3 uppercase tracking-widest border-l-4 border-slate-300 pl-3">RESUMEN</h3>
              <p className="text-justify text-foreground/80">La victimización criminal constituye un fenómeno complejo que impacta directamente en la seguridad pública, en la formulación de políticas de prevención del delito y en la percepción de seguridad de la población. En contextos urbanos, la ausencia de sistemas centralizados para la recolección, organización y análisis de datos de victimización criminal contribuye a la fragmentación de la información, dificultando el seguimiento de las víctimas y la identificación de patrones delictivos. En este sentido, el presente estudio tiene como objetivo desarrollar una plataforma digital basada en el análisis de encuestas de victimización criminal y percepción de seguridad en el municipio de Samba en el año 2025, con el fin de mejorar la recolección y gestión de datos y apoyar las políticas públicas de seguridad y prevención del delito. La investigación adopta un enfoque metodológico mixto, combinando métodos con el propósito de fortalecer estrategias de prevención.</p>
              <p className="mt-3 font-bold text-xs"><span className="text-slate-500">Palabras clave:</span> Plataformas digitales; Encuesta de victimización criminal; Percepción de seguridad.</p>
            </div>
            <div>
              <h3 className="font-black text-slate-500 mb-3 uppercase tracking-widest border-l-4 border-slate-300 pl-3">RESUMEN</h3>
              <p className="text-justify text-foreground/80">La victimización criminal constituye un fenómeno complejo que impacta directamente en la seguridad pública, en la formulación de políticas de prevención del delito y en la percepción de seguridad de la población. En contextos urbanos, la ausencia de sistemas centralizados para la recolección, organización y análisis de datos de victimización criminal contribuye a la fragmentación de la información, dificultando el seguimiento de las víctimas y la identificación de patrones delictivos. En este sentido, el presente estudio tiene como objetivo desarrollar una plataforma digital basada en el análisis de encuestas de victimización criminal y percepción de seguridad en el municipio de Samba en el año 2025, con el fin de mejorar la recolección y gestión de datos y apoyar las políticas públicas de seguridad y prevención del delito. La investigación adopta un enfoque metodológico mixto, combinando métodos con el propósito de fortalecer estrategias de prevención.</p>
              <p className="mt-3 font-bold text-xs"><span className="text-slate-500">Palabras clave:</span> Plataformas digitales; Encuesta de victimización criminal; Percepción de seguridad.</p>
            </div>
            <div>
              <h3 className="font-black text-slate-500 mb-3 uppercase tracking-widest border-l-4 border-slate-300 pl-3">RESUMEN</h3>
              <p className="text-justify text-foreground/80">La victimización criminal constituye un fenómeno complejo que impacta directamente en la seguridad pública, en la formulación de políticas de prevención del delito y en la percepción de seguridad de la población. En contextos urbanos, la ausencia de sistemas centralizados para la recolección, organización y análisis de datos de victimización criminal contribuye a la fragmentación de la información, dificultando el seguimiento de las víctimas y la identificación de patrones delictivos. En este sentido, el presente estudio tiene como objetivo desarrollar una plataforma digital basada en el análisis de encuestas de victimización criminal y percepción de seguridad en el municipio de Samba en el año 2025, con el fin de mejorar la recolección y gestión de datos y apoyar las políticas públicas de seguridad y prevención del delito. La investigación adopta un enfoque metodológico mixto, combinando métodos con el propósito de fortalecer estrategias de prevención.</p>
              <p className="mt-3 font-bold text-xs"><span className="text-slate-500">Palabras clave:</span> Plataformas digitales; Encuesta de victimización criminal; Percepción de seguridad.</p>
            </div>
            <div>
              <h3 className="font-black text-slate-500 mb-3 uppercase tracking-widest border-l-4 border-slate-300 pl-3">RESUMEN</h3>
              <p className="text-justify text-foreground/80">La victimización criminal constituye un fenómeno complejo que impacta directamente en la seguridad pública, en la formulación de políticas de prevención del delito y en la percepción de seguridad de la población. En contextos urbanos, la ausencia de sistemas centralizados para la recolección, organización y análisis de datos de victimización criminal contribuye a la fragmentación de la información, dificultando el seguimiento de las víctimas y la identificación de patrones delictivos. En este sentido, el presente estudio tiene como objetivo desarrollar una plataforma digital basada en el análisis de encuestas de victimización criminal y percepción de seguridad en el municipio de Samba en el año 2025, con el fin de mejorar la recolección y gestión de datos y apoyar las políticas públicas de seguridad y prevención del delito. La investigación adopta un enfoque metodológico mixto, combinando métodos con el propósito de fortalecer estrategias de prevención.</p>
              <p className="mt-3 font-bold text-xs"><span className="text-slate-500">Palabras clave:</span> Plataformas digitales; Encuesta de victimización criminal; Percepción de seguridad.</p>
            </div><div>
              <h3 className="font-black text-slate-500 mb-3 uppercase tracking-widest border-l-4 border-slate-300 pl-3">RESUMEN</h3>
              <p className="text-justify text-foreground/80">La victimización criminal constituye un fenómeno complejo que impacta directamente en la seguridad pública, en la formulación de políticas de prevención del delito y en la percepción de seguridad de la población. En contextos urbanos, la ausencia de sistemas centralizados para la recolección, organización y análisis de datos de victimización criminal contribuye a la fragmentación de la información, dificultando el seguimiento de las víctimas y la identificación de patrones delictivos. En este sentido, el presente estudio tiene como objetivo desarrollar una plataforma digital basada en el análisis de encuestas de victimización criminal y percepción de seguridad en el municipio de Samba en el año 2025, con el fin de mejorar la recolección y gestión de datos y apoyar las políticas públicas de seguridad y prevención del delito. La investigación adopta un enfoque metodológico mixto, combinando métodos con el propósito de fortalecer estrategias de prevención.</p>
              <p className="mt-3 font-bold text-xs"><span className="text-slate-500">Palabras clave:</span> Plataformas digitales; Encuesta de victimización criminal; Percepción de seguridad.</p>
            </div>
            <div>
              <h3 className="font-black text-slate-500 mb-3 uppercase tracking-widest border-l-4 border-slate-300 pl-3">RESUMEN</h3>
              <p className="text-justify text-foreground/80">La victimización criminal constituye un fenómeno complejo que impacta directamente en la seguridad pública, en la formulación de políticas de prevención del delito y en la percepción de seguridad de la población. En contextos urbanos, la ausencia de sistemas centralizados para la recolección, organización y análisis de datos de victimización criminal contribuye a la fragmentación de la información, dificultando el seguimiento de las víctimas y la identificación de patrones delictivos. En este sentido, el presente estudio tiene como objetivo desarrollar una plataforma digital basada en el análisis de encuestas de victimización criminal y percepción de seguridad en el municipio de Samba en el año 2025, con el fin de mejorar la recolección y gestión de datos y apoyar las políticas públicas de seguridad y prevención del delito. La investigación adopta un enfoque metodológico mixto, combinando métodos con el propósito de fortalecer estrategias de prevención.</p>
              <p className="mt-3 font-bold text-xs"><span className="text-slate-500">Palabras clave:</span> Plataformas digitales; Encuesta de victimización criminal; Percepción de seguridad.</p>
            </div>
            <div>
              <h3 className="font-black text-slate-500 mb-3 uppercase tracking-widest border-l-4 border-slate-300 pl-3">RESUMEN</h3>
              <p className="text-justify text-foreground/80">La victimización criminal constituye un fenómeno complejo que impacta directamente en la seguridad pública, en la formulación de políticas de prevención del delito y en la percepción de seguridad de la población. En contextos urbanos, la ausencia de sistemas centralizados para la recolección, organización y análisis de datos de victimización criminal contribuye a la fragmentación de la información, dificultando el seguimiento de las víctimas y la identificación de patrones delictivos. En este sentido, el presente estudio tiene como objetivo desarrollar una plataforma digital basada en el análisis de encuestas de victimización criminal y percepción de seguridad en el municipio de Samba en el año 2025, con el fin de mejorar la recolección y gestión de datos y apoyar las políticas públicas de seguridad y prevención del delito. La investigación adopta un enfoque metodológico mixto, combinando métodos con el propósito de fortalecer estrategias de prevención.</p>
              <p className="mt-3 font-bold text-xs"><span className="text-slate-500">Palabras clave:</span> Plataformas digitales; Encuesta de victimización criminal; Percepción de seguridad.</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 2,
      titulo: "Introdução",
      conteudo: (
        <div className="space-y-6 animate-fade-in">
          <h3 className="text-2xl font-black text-primary border-b-2 border-primary/10 pb-2 uppercase tracking-tight">INTRODUÇÃO</h3>
          <div className="space-y-4 text-justify leading-relaxed text-foreground/90">
            <p>A vitimização criminal constitui, a nível mundial, um fenómeno complexo que ultrapassa a mera ocorrência do crime, envolvendo dimensões sociais, psicológicas, económicas e institucionais. A literatura internacional tem demonstrado que os dados provenientes dos registros oficiais não conseguem captar, de forma integral, a real magnitude da criminalidade, uma vez que uma parcela significativa das vítimas opta por não denunciar os crimes sofridos. Esta limitação compromete a capacidade dos Estados em compreender o fenómeno criminal e em formular políticas públicas eficazes e orientadas para a prevenção.</p>
            <p>Neste sentido, os inquéritos de vitimização criminal assumem um papel central ao possibilitarem a recolha directa de informações junto das vítimas, permitindo identificar padrões de vitimização, factores de risco e níveis de percepção de segurança. A produção desse tipo de informação contribui para uma visão mais abrangente da criminalidade, ao integrar dados quantitativos e qualitativos que não se encontram disponíveis nos sistemas tradicionais de registo. A eficácia desses inquéritos depende, em grande medida, da forma como os dados são recolhidos, organizados, armazenados e analisados.</p>
            <p>Com o avanço das tecnologias digitais, observa-se uma crescente aposta no uso de plataformas digitais como instrumentos de apoio à recolha e gestão de dados no domínio da segurança pública. Essas plataformas possibilitam a sistematização das informações, a redução da fragmentação dos dados e a melhoria do acesso por parte de investigadores, gestores públicos e instituições responsáveis pela segurança. Assim, a articulação entre inquéritos de vitimização criminal, percepção de segurança e plataformas digitais revela-se fundamental para o fortalecimento da gestão da informação e para a tomada de decisões baseadas em evidências.</p>
            <p>No contexto angolano, a criminalidade urbana representa um desafio relevante para a segurança pública, particularmente nas grandes cidades, onde factores como crescimento populacional acelerado, desigualdades sociais e fragilidades institucionais contribuem para a complexidade do fenómeno criminal. Apesar dos esforços das autoridades, persistem dificuldades na recolha e gestão sistemática de dados sobre vitimização criminal, o que limita a capacidade de avaliação das políticas de prevenção e controlo do crime.</p>
            <p>A dependência predominante dos registos oficiais tende a invisibilizar experiências de vitimização não denunciadas, bem como as percepções de insegurança vivenciadas pela população. Esta lacuna informacional compromete a formulação de estratégias preventivas eficazes, uma vez que as decisões são tomadas com base em dados incompletos ou pouco organizados. Torna-se, portanto, necessário investir em mecanismos que permitam organizar e sistematizar os dados de vitimização criminal de forma estruturada e acessível.</p>
          </div>
        </div>
      )
    },
    {
      id: 3,
      titulo: "Desenvolvimento - Plataforma Digital",
      conteudo: (
        <div className="space-y-6 animate-fade-in">
          <h3 className="text-2xl font-black text-primary border-b-2 border-primary/10 pb-2 uppercase tracking-tight">DESENVOLVIMENTO</h3>
          <div className="space-y-4 text-justify leading-relaxed text-foreground/90">
            <h4 className="text-xl font-bold italic text-slate-800">Plataforma digital</h4>
            <p>A palavra plataforma tem origem no francês plate-forme, que por sua vez provém da combinação de plat (chato, plano) e forme (forma), inicialmente significando uma superfície horizontal que serve de apoio ou suporte físico, como um palanque ou podium (Ciberdúvidas, 2021).</p>
            <p>Com a revolução tecnológica e a transição para ambientes digitais, o conceito de plataforma foi transposto do espaço físico para o espaço digital, onde passou a designar estruturas que permitem a interacção e intermediação socio-económica em ambientes virtuais (Ha et al., 2024).</p>
            <p>No contexto digital, pesquisadores definem plataforma digital como uma infraestrutura de software que facilita interações e transacções entre diferentes grupos de utilizadores, actuando como intermediário tecnológico entre produtores e consumidores de informação, bens ou serviços (Sørensen, Basole & De Reuver, 2018; Digital platform (infrastructure), n.d.).</p>
            <p>A literatura científica reconhece que as plataformas digitais não são homogéneas, razão pela qual diversos autores propõem tipologias que permitem compreender as suas funções, estruturas e impactos sociais e económicos (Gawer, 2021).</p>
            <p>De acordo com Gawer (2021), “as plataformas digitais podem ser entendidas como arquitecturas organizacionais distintas, cuja classificação depende do papel que desempenham na coordenação de actores, recursos e fluxos de informação” (p. 124).</p>
            <p>Uma das tipologias mais consolidadas na literatura distingue as plataformas de transacção das plataformas de inovação, sendo esta classificação amplamente aceite no campo dos sistemas de informação e da economia digital (Evans & Schmalensee, 2016).</p>
            <p>As plataformas de transacção são definidas como aquelas que “facilitam interacções directas entre dois ou mais grupos de utilizadores, reduzindo custos de pesquisa, coordenação e troca” (Evans & Schmalensee, 2016, p. 5).</p>
            <p>Segundo Parker, Van Alstyne e Choudary (2016), este tipo de plataforma actua essencialmente como intermediário digital, organizando a oferta e a procura por meio de regras, algoritmos e mecanismos de governação.</p>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AppHeader />
      <main className="flex-grow">
        
        {/* PARTE 1: O ESTUDO CIENTÍFICO (Intro rápida) */}
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

        {/* PARTE 2: ARTIGO CIENTÍFICO COM PAGINAÇÃO */}
        <section className="py-20 bg-muted/20">
          <div className="mx-auto max-w-5xl px-6">
            <div className="flex items-center gap-3 text-primary font-bold mb-8">
              <FileText className="w-8 h-8" />
              <h2 className="text-3xl font-black uppercase tracking-tight">Artigo Científico</h2>
            </div>

            <Card className="border-primary/10 shadow-2xl bg-white overflow-hidden min-h-[700px] flex flex-col">
              <CardHeader className="bg-slate-50 border-b flex flex-row items-center justify-between py-4">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-primary border-primary">PÁGINA {currentPage} / {paginasArtigo.length}</Badge>
                  <span className="text-xs font-bold text-muted-foreground uppercase hidden sm:inline">{paginasArtigo[currentPage - 1].titulo}</span>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="h-8 w-8 p-0 rounded-full"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setCurrentPage(p => Math.min(paginasArtigo.length, p + 1))}
                    disabled={currentPage === paginasArtigo.length}
                    className="h-8 w-8 p-0 rounded-full"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-8 md:p-12 flex-grow overflow-auto">
                {paginasArtigo[currentPage - 1].conteudo}
              </CardContent>
              <div className="p-4 bg-slate-50 border-t flex justify-center gap-2">
                {paginasArtigo.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setCurrentPage(p.id)}
                    className={`h-2 rounded-full transition-all ${currentPage === p.id ? 'w-8 bg-primary' : 'w-2 bg-slate-300'}`}
                    title={`Página ${p.id}`}
                  />
                ))}
              </div>
            </Card>

            <div className="mt-8 flex justify-between items-center text-xs font-mono text-muted-foreground uppercase tracking-widest">
              <span>© 2025 • VITIMIZAÇÃO ANGOLA</span>
              <span>SAMBA • LUANDA • ANGOLA</span>
            </div>
          </div>
        </section>

      </main>
      <AppFooter />
    </div>
  );
}
