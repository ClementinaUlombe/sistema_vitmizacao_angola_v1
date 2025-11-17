import { Button } from "@/components/ui/button";
import HeroSlideshow from "@/components/HeroSlideshow";
import heroHands from "@/assets/hero-hands.jpg";
import heroBooks from "@/assets/hero-books.jpg";
import heroTech from "@/assets/hero-tech.jpg";

const Index = () => {
  const heroImages = [heroHands, heroBooks, heroTech];

  return (
    <div className="min-h-screen">
      {/* Cabeçalho */}
      <header className="sticky top-0 z-50 bg-gradient-primary backdrop-blur-sm border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-white/20 backdrop-blur-md flex items-center justify-center">
              <span className="text-white font-bold text-xl">VC</span>
            </div>
            <span className="font-semibold text-white">Vitimização Criminal</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-white">
            <a href="#inicio" className="hover:opacity-80 transition-opacity">Início</a>
            <a href="#sobre-estudo" className="hover:opacity-80 transition-opacity">Sobre o Estudo</a>
            <a href="#quem-somos" className="hover:opacity-80 transition-opacity">Quem Somos</a>
            <Button variant="secondary" size="sm" className="ml-4">
              Entrar no Sistema
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section id="inicio" className="relative isolate overflow-hidden min-h-[600px] flex items-center">
        <HeroSlideshow images={heroImages} intervalMs={5000} />
        <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 sm:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6 leading-tight">
              Sistema de Análise da Vitimização Criminal
            </h1>
            <p className="text-xl text-white/90 mb-4">
              Bairro Gamek à Direita – Luanda, 2025
            </p>
            <p className="text-lg text-white/80 mb-8 max-w-2xl">
              Uma plataforma inteligente que transforma dados de pesquisa social em informação científica acessível, apoiando políticas públicas e o conhecimento sobre segurança urbana em Angola.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" variant="secondary" className="text-base">
                Sobre o Estudo
              </Button>
              <Button size="lg" variant="outline" className="text-base border-white text-white hover:bg-white/10">
                Entrar no Sistema
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Seção Institucional */}
      <section id="sobre-estudo" className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-8">
            Conhecimento e Tecnologia pela Segurança de Angola
          </h2>
          <div className="prose prose-lg max-w-none text-foreground/85 space-y-6">
            <p>
              Todos os anos, milhares de cidadãos em Angola são direta ou indiretamente afetados pela criminalidade urbana. O impacto desses atos vai muito além das perdas materiais — fere a confiança nas instituições, gera medo e mina o bem-estar das comunidades. A segurança pública é, portanto, um direito fundamental e um pilar essencial para o desenvolvimento humano e social do país.
            </p>
            <p>
              O Instituto Superior de Ciências e Tecnologias (INSUTEC), comprometido com a missão de formar profissionais capazes de responder aos desafios reais da sociedade angolana, reconheceu a necessidade de unir conhecimento e tecnologia em prol da segurança nacional. Dessa visão nasceu o projeto "Sistema de Análise de Vitimização Criminal e Percepção de Segurança da População do Bairro Gamek à Direita", uma iniciativa que marca o encontro entre dois campos estratégicos: as Ciências Criminais, responsáveis por compreender as causas e os impactos do crime, e a Engenharia Informática e Sistemas de Informação, encarregada de transformar dados em soluções inteligentes.
            </p>
            <p>
              Mais do que um estudo académico, este projeto representa um compromisso com a nação angolana — um esforço para compreender o fenómeno da vitimização, identificar as vulnerabilidades das comunidades e criar ferramentas tecnológicas que auxiliem as autoridades, os investigadores e os cidadãos na construção de um ambiente mais seguro.
            </p>
            <p>
              Através da recolha de dados reais, da análise estatística e do uso de tecnologias avançadas de informação, o sistema permitirá monitorar padrões de criminalidade, avaliar a perceção de segurança e propor políticas públicas baseadas em evidências concretas. Além disso, o projeto incorpora uma componente inovadora de inteligência artificial, capaz de interagir com o utilizador e oferecer informações, tendências e previsões de forma acessível e transparente.
            </p>
            <p>
              O ano de 2025 marca um novo capítulo para o INSUTEC e para Angola: o início de uma era em que a ciência e a tecnologia se unem pela justiça, pela segurança e pela dignidade do cidadão.
            </p>
            <p className="italic font-medium text-primary">
              "Proteger vidas, compreender o crime e fortalecer a confiança pública — eis o propósito que move o futuro da segurança em Angola."
            </p>
          </div>
        </div>
      </section>

      {/* Seção Quem Somos */}
      <section id="quem-somos" className="bg-gradient-light py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-8">
            Quem Somos
          </h2>
          <div className="grid gap-8 md:grid-cols-2 text-foreground/85">
            <div>
              <p className="text-lg leading-relaxed">
                O INSUTEC é uma iniciativa universitária multidisciplinar criada para promover investigação aplicada, inovação tecnológica e apoio à comunidade no combate à criminalidade urbana.
              </p>
            </div>
            <div>
              <p className="text-lg leading-relaxed">
                Através da análise de dados e da integração entre ciência criminal e engenharia de sistemas, buscamos oferecer soluções concretas que melhorem a qualidade de vida e a segurança dos cidadãos.
              </p>
            </div>
            <div className="md:col-span-2">
              <p className="text-lg leading-relaxed">
                O projeto é fruto da colaboração entre docentes, estudantes e especialistas das áreas de criminologia, estatística, informática e segurança pública.
              </p>
            </div>
          </div>
          <div className="mt-8">
            <Button className="bg-gradient-primary">
              Saiba Mais
            </Button>
          </div>
        </div>
      </section>

      {/* Seção O Que Fazemos */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-8">
            O Que Fazemos
          </h2>
          <p className="text-lg text-foreground/85 max-w-4xl mb-4">
            A missão do INSUTEC é criar uma plataforma digital inteligente que analise e apresente indicadores sobre vitimização, perceção de segurança e confiança institucional.
          </p>
          <p className="text-lg text-foreground/85 max-w-4xl mb-8">
            O sistema integra dados estatísticos, relatórios de campo e ferramentas de visualização interativa, permitindo às autoridades locais e à sociedade civil compreender melhor as dinâmicas da criminalidade e planear ações preventivas.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mt-12">
            {[
              {
                title: "Cooperação",
                description: "Promover colaboração entre especialistas em segurança pública e tecnologia"
              },
              {
                title: "Dados Confiáveis",
                description: "Facilitar o acesso a dados confiáveis sobre criminalidade e perceção social"
              },
              {
                title: "Confiança",
                description: "Incentivar a denúncia e fortalecer a confiança nas instituições"
              },
              {
                title: "Políticas Públicas",
                description: "Apoiar políticas públicas baseadas em evidências"
              }
            ].map((item, index) => (
              <div key={index} className="p-6 rounded-lg bg-gradient-light border border-primary/10">
                <h3 className="font-semibold text-primary mb-2">{item.title}</h3>
                <p className="text-sm text-foreground/75">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Campanha #OlhosAbertos */}
      <section className="bg-gradient-primary py-16 sm:py-24 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Campanha #OlhosAbertos – Pela Segurança de Todos
          </h2>
          <p className="text-lg text-white/90 max-w-4xl mb-8">
            A campanha #OlhosAbertos visa sensibilizar os cidadãos sobre os seus direitos e promover uma cultura de prevenção. O kit de ferramentas contém materiais informativos, cartazes, vídeos e dados úteis sobre como denunciar crimes, procurar apoio e fortalecer a solidariedade comunitária.
          </p>
          <Button variant="secondary" size="lg">
            Baixar Kit da Campanha
          </Button>
        </div>
      </section>

      {/* Encontre Ajuda */}
      <section className="bg-blue-soft py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
            Encontre Ajuda
          </h2>
          <p className="text-lg text-foreground/85 max-w-3xl mb-8">
            Seja forte. Você não está sozinho. Através do sistema INSUTEC, você pode encontrar serviços de apoio à vítima, instituições comunitárias e centros de orientação jurídica mais próximos de si.
          </p>
          <Button className="bg-gradient-primary" size="lg">
            Encontrar Serviço de Apoio
          </Button>
        </div>
      </section>

      {/* Rodapé */}
      <footer className="bg-gradient-hero text-white">
        <div className="mx-auto max-w-7xl px-6 py-14 grid gap-10 md:grid-cols-4">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-white/20 backdrop-blur-md flex items-center justify-center">
                <span className="text-white font-bold text-xl">VC</span>
              </div>
              <span className="font-semibold">Vitimização Criminal</span>
            </div>
            <p className="text-sm text-white/80">
              Análise de vitimização e perceção de segurança no Gamek à Direita.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Projeto</h4>
            <ul className="text-sm text-white/80 space-y-2">
              <li><a href="#sobre-estudo" className="hover:text-white transition-colors">Sobre o Estudo</a></li>
              <li><a href="#quem-somos" className="hover:text-white transition-colors">Quem Somos</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Metodologia</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Funcionalidades</h4>
            <ul className="text-sm text-white/80 space-y-2">
              <li>Importação Excel</li>
              <li>Dashboard de Gráficos</li>
              <li>Chatbot Inteligente</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Contacto</h4>
            <ul className="text-sm text-white/80 space-y-2">
              <li>Luanda, Angola</li>
              <li><a href="#" className="hover:text-white transition-colors">Política de Privacidade</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Termos de Uso</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10">
          <div className="mx-auto max-w-7xl px-6 py-6 text-center text-sm text-white/80">
            <p>© 2025 | Sistema de Análise de Vitimização Criminal – Desenvolvido por Clementina Ulombe</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
