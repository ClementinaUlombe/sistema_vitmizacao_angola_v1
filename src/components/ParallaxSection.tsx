"use client";

import { useEffect, useRef, useState } from "react";

export default function ParallaxSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const elementCenter = window.innerHeight / 2;
        const distanceFromCenter = rect.top - elementCenter;
        
        const offset = distanceFromCenter * 0.5;
        setScrollY(offset);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative w-full min-h-[700px] flex items-center justify-center overflow-hidden"
    >
      {/* Imagem com efeito parallax - Otimizada */}
      <div 
        className="absolute inset-0 bg-center bg-cover bg-no-repeat"
        style={{ 
          backgroundImage: `url('/violent-crimes-violence-assault-murder.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          transform: `translateY(${scrollY}px)`,
          transition: 'transform 0.1s ease-out',
          filter: 'contrast(1.1) saturate(1.15)',
          WebkitBackgroundSize: 'cover',
          WebkitBackfaceVisibility: 'hidden',
          backfaceVisibility: 'hidden',
          perspective: '1000px',
        }}
      />
      
      {/* Overlay escuro transparente com gradiente */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/50 backdrop-blur-sm" />
      
      {/* Conteúdo com z-index superior */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 w-full py-24 sm:py-32">
        <h2 className="text-5xl sm:text-7xl font-bold text-white mb-8 text-center drop-shadow-2xl animate-fade-in">
          O Que Fazemos
        </h2>
        <p className="text-center text-white mb-12 text-lg max-w-3xl mx-auto">
            Transformamos dados em soluções concretas para a segurança da comunidade
          </p>

          <div className="mb-12 max-w-4xl mx-auto">
            <p className="text-lg text-white mb-4 leading-relaxed">
              A missão é criar uma plataforma digital inteligente que analise e apresente indicadores sobre vitimização, percepção de segurança e confiança institucional.
            </p>
            <p className="text-lg text-white leading-relaxed">
              O sistema integra dados estatísticos, relatórios de campo e ferramentas de visualização interativa, permitindo às autoridades locais e à sociedade civil compreender melhor as dinâmicas da criminalidade e planear ações preventivas.
            </p>
          </div>
        
        <div className="grid gap-8 md:grid-cols-3 mt-16">
          {[
            {
              icon: "📊",
              title: "Análise de Dados",
              description: "Recolhemos e analisamos dados sobre vitimização criminal e percepção de segurança usando metodologia científica rigorosa."
            },
            {
              icon: "🔐",
              title: "Segurança Pública",
              description: "Contribuímos para o fortalecimento da segurança pública através de insights baseados em evidências e recomendações práticas."
            },
            {
              icon: "💡",
              title: "Inovação Tecnológica",
              description: "Desenvolvemos soluções inteligentes que transformam dados complexos em informação acessível e acionável para tomadores de decisão."
            },
            {
              icon: "👥",
              title: "Apoio Comunitário",
              description: "Ouvimos as vozes das vítimas e comunidades, garantindo que suas experiências informam políticas e intervenções de segurança."
            },
            {
              icon: "📈",
              title: "Monitoramento Contínuo",
              description: "Acompanhamos tendências de criminalidade ao longo do tempo para identificar padrões emergentes e avaliar a eficácia de intervenções."
            },
            {
              icon: "🤝",
              title: "Parcerias Estratégicas",
              description: "Colaboramos com autoridades, instituições acadêmicas e organizações da sociedade civil para amplificar o impacto de nosso trabalho."
            }
          ].map((item, idx) => (
            <div 
              key={idx} 
              className="bg-white/15 backdrop-blur-lg border border-white/30 rounded-xl p-6 hover:bg-white/25 transition-all duration-300 hover:shadow-2xl hover:-translate-y-3 group"
              style={{
                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
              }}
            >
              <div className="text-6xl mb-4 group-hover:scale-125 transition-transform duration-300">{item.icon}</div>
              <h3 className="text-xl font-bold text-white mb-3 drop-shadow-lg">{item.title}</h3>
              <p className="text-white/95 leading-relaxed text-sm drop-shadow-md">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
