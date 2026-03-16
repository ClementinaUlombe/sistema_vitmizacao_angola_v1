"use client";

import { AppHeader } from "@/components/AppHeader";
import { AppFooter } from "@/components/AppFooter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TermosDeUsoPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AppHeader />
      
      <main className="flex-grow py-12 px-6 sm:py-20">
        <div className="mx-auto max-w-4xl">
          <Link href="/" className="inline-flex items-center gap-2 text-primary hover:underline mb-8 transition-all">
            <ArrowLeft className="h-4 w-4" />
            Voltar para a Página Inicial
          </Link>

          <Card className="border-primary/10 shadow-xl overflow-hidden">
            <CardHeader className="bg-gradient-hero text-white py-10 text-center">
              <CardTitle className="text-3xl sm:text-4xl font-black">
                TERMOS DE USO E POLÍTICA DE PRIVACIDADE
              </CardTitle>
              <p className="mt-4 text-white/80 max-w-2xl mx-auto">
                Informações sobre a recolha, gestão e análise de dados da nossa plataforma.
              </p>
            </CardHeader>
            <CardContent className="p-8 sm:p-12 space-y-10 text-foreground/90">
              
              <section className="space-y-4">
                <p className="text-lg leading-relaxed">
                  A presente plataforma digital tem como objetivo a recolha, gestão e análise de dados relacionados com vitimização criminal e percepção de segurança, visando apoiar pesquisas académicas, estudos científicos e o desenvolvimento de políticas públicas de segurança.
                </p>
                <p className="text-lg leading-relaxed font-medium text-primary italic">
                  Ao aceder ou utilizar esta plataforma, o utilizador declara ter lido, compreendido e concordado com os presentes Termos de Uso e Política de Privacidade.
                </p>
              </section>

              <Separator className="bg-primary/10" />

              <section className="space-y-4">
                <h3 className="text-2xl font-bold text-primary">1. Finalidade</h3>
                <p className="leading-relaxed">A plataforma tem como finalidade:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Recolher dados sobre experiências de vitimização criminal;</li>
                  <li>Recolher informações sobre a percepção de segurança da população;</li>
                  <li>Contribuir para pesquisa científica e académica na área das ciências criminais;</li>
                  <li>Apoiar instituições públicas e privadas na formulação de políticas de segurança.</li>
                </ul>
                <p className="pt-2 italic text-muted-foreground">
                  Os dados recolhidos serão utilizados exclusivamente para fins estatísticos, científicos e académicos.
                </p>
              </section>

              <section className="space-y-4">
                <h3 className="text-2xl font-bold text-primary">2. Aceitação dos Termos</h3>
                <p className="leading-relaxed">Ao utilizar esta plataforma, o utilizador concorda que:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>A participação nos inquéritos é voluntária;</li>
                  <li>Pode interromper ou desistir da participação a qualquer momento;</li>
                  <li>As informações fornecidas serão utilizadas conforme descrito nesta política.</li>
                </ul>
                <p className="pt-2">Caso o utilizador não concorde com os presentes termos, recomenda-se que não utilize a plataforma.</p>
              </section>

              <section className="space-y-4">
                <h3 className="text-2xl font-bold text-primary">3. Elegibilidade</h3>
                <p className="leading-relaxed">Para utilizar a plataforma, o utilizador deve:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Ter 18 anos ou mais, ou</li>
                  <li>Ter autorização de um responsável legal, quando aplicável.</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h3 className="text-2xl font-bold text-primary">4. Recolha de Dados</h3>
                <p className="leading-relaxed">A plataforma poderá recolher os seguintes tipos de informações:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-6">
                  <div className="flex items-center gap-2">• Idade</div>
                  <div className="flex items-center gap-2">• Sexo</div>
                  <div className="flex items-center gap-2">• Área de residência</div>
                  <div className="flex items-center gap-2">• Experiência de vitimização</div>
                  <div className="flex items-center gap-2">• Percepção de segurança</div>
                  <div className="flex items-center gap-2">• Opiniões sobre segurança</div>
                </div>
              </section>

              <section className="space-y-4">
                <h4 className="text-xl font-bold text-foreground">Dados Técnicos</h4>
                <p className="leading-relaxed">Podem ser recolhidas informações técnicas como:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Endereço IP</li>
                  <li>Tipo de dispositivo e navegador utilizado</li>
                  <li>Data e hora de acesso</li>
                </ul>
                <p className="text-sm text-muted-foreground">Estes dados são utilizados apenas para fins de funcionamento e segurança da plataforma.</p>
              </section>

              <section className="space-y-4">
                <h3 className="text-2xl font-bold text-primary">5. Utilização dos Dados</h3>
                <p className="leading-relaxed">Os dados recolhidos serão utilizados para:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Produção de estatísticas criminais e relatórios científicos;</li>
                  <li>Desenvolvimento de estudos académicos;</li>
                  <li>Apoio à formulação de políticas públicas de segurança.</li>
                </ul>
                <p className="pt-2 font-bold text-destructive">
                  Em nenhuma circunstância os dados serão utilizados para identificação individual de vítimas.
                </p>
              </section>

              <section className="space-y-4">
                <h3 className="text-2xl font-bold text-primary">6. Confidencialidade e Anonimato</h3>
                <p className="leading-relaxed">A plataforma compromete-se a garantir:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Anonimato dos participantes;</li>
                  <li>Confidencialidade das informações fornecidas;</li>
                  <li>Utilização dos dados apenas em forma agregada ou estatística.</li>
                </ul>
                <p>Nenhum dado será divulgado de forma que permita identificar os participantes.</p>
              </section>

              <section className="space-y-4">
                <h3 className="text-2xl font-bold text-primary">7. Partilha de Dados</h3>
                <p className="leading-relaxed">
                  Os dados poderão ser partilhados apenas com instituições académicas, centros de investigação e organizações que desenvolvam estudos sobre segurança pública, sempre de forma anónima e agregada.
                </p>
              </section>

              <section className="space-y-4">
                <h3 className="text-2xl font-bold text-primary">8. Segurança da Informação</h3>
                <p className="leading-relaxed">Serão adotadas medidas técnicas e organizacionais para proteger os dados, tais como:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Encriptação de dados;</li>
                  <li>Controlo de acesso à base de dados;</li>
                  <li>Monitorização do sistema e proteção contra acessos não autorizados.</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h3 className="text-2xl font-bold text-primary">9. Direitos dos Utilizadores</h3>
                <p className="leading-relaxed">Os participantes têm direito a:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Saber como os seus dados estão a ser utilizados;</li>
                  <li>Solicitar esclarecimentos sobre a pesquisa;</li>
                  <li>Retirar a sua participação a qualquer momento;</li>
                  <li>Solicitar a remoção dos seus dados, quando aplicável.</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h3 className="text-2xl font-bold text-primary">10. Responsabilidades do Utilizador</h3>
                <p className="leading-relaxed">O utilizador compromete-se a:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Fornecer informações verdadeiras e precisas;</li>
                  <li>Utilizar a plataforma de forma responsável e ética;</li>
                  <li>Não tentar comprometer a segurança do sistema.</li>
                </ul>
              </section>

              <section className="space-y-4">
                <h3 className="text-2xl font-bold text-primary">11. Limitação de Responsabilidade</h3>
                <p className="leading-relaxed">A plataforma não se responsabiliza por informações falsas fornecidas pelos utilizadores, problemas técnicos temporários ou interrupções ocasionais do serviço.</p>
              </section>

              <section className="space-y-4">
                <h3 className="text-2xl font-bold text-primary">12. Alterações aos Termos</h3>
                <p className="leading-relaxed">Os presentes Termos de Uso e Política de Privacidade podem ser atualizados sempre que necessário. As alterações serão comunicadas através da própria plataforma.</p>
              </section>

              <section className="space-y-4">
                <h3 className="text-2xl font-bold text-primary">13. Contacto</h3>
                <p className="leading-relaxed">
                  Para esclarecimentos, sugestões ou dúvidas, os utilizadores podem entrar em contacto com a equipa responsável através do email institucional ou da instituição responsável pelo projeto.
                </p>
              </section>

              <Separator className="bg-primary/10" />

              <section className="bg-primary/5 p-6 rounded-2xl border border-primary/10 text-center space-y-4">
                <h3 className="text-xl font-bold text-primary uppercase tracking-wider">Declaração de Consentimento</h3>
                <p className="italic leading-relaxed">
                  "Ao continuar a utilizar esta plataforma, o utilizador declara que leu e compreendeu os Termos de Uso e Política de Privacidade, concorda voluntariamente em participar nos inquéritos e autoriza a utilização dos dados para fins científicos e estatísticos."
                </p>
                <div className="pt-4">
                  <Link href="/auth/login">
                    <Button className="bg-primary hover:bg-primary/90 text-white font-bold px-8 py-6 rounded-xl shadow-lg transition-all hover-scale">
                      Eu Concordo e Desejo Continuar
                    </Button>
                  </Link>
                </div>
              </section>

            </CardContent>
          </Card>
        </div>
      </main>

      <AppFooter />
    </div>
  );
}
