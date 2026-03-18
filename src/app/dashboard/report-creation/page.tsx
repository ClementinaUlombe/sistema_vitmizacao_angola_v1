'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Download, 
  Loader2, 
  MapPin,
  AlertTriangle,
  FileDown
} from 'lucide-react';

interface ReportSummary {
  generatedAt: string;
  stats: {
    totalInquiries: number;
    validatedInquiries: number;
    pendingInquiries: number;
    totalReports: number;
    totalUsers: number;
    victimizationRate: string | number;
    reportingRate: string | number;
    crimes: Record<string, number>;
    demographics: {
      gender: Array<{ label: string; value: number }>;
      age: Array<{ label: string; value: number }>;
    };
  };
  neighborhoods: Array<{
    name: string;
    count: number;
  }>;
}

export default function ReportCreationPage() {
  const [report, setReport] = useState<ReportSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);

  // Pagination for neighborhoods
  const [currentNbPage, setCurrentNbPage] = useState(1);
  const nbPerPage = 10;

  useEffect(() => {
    fetchReportData();
  }, []);

  const fetchReportData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/reports/summary');
      if (!response.ok) throw new Error('Falha ao gerar síntese');
      const data = await response.json();
      setReport(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = async () => {
    if (!report || !reportRef.current) return;
    
    try {
      setIsExporting(true);
      
      // @ts-ignore
      const html2pdf = (await import('html2pdf.js')).default;
      
      const element = reportRef.current;
      const opt = {
        margin: 0,
        filename: `Relatorio_Executivo_Vitimizaçao_${new Date().toISOString().split('T')[0]}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, letterRendering: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
      };

      await html2pdf().set(opt).from(element).save();
      
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      alert('Houve um erro ao gerar o PDF. Tente novamente.');
    } finally {
      setIsExporting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground font-medium">Gerando síntese estatística do sistema...</p>
      </div>
    );
  }

  if (!report) return null;

  // Neighborhood pagination logic
  const nbTotalPages = Math.ceil(report.neighborhoods.length / nbPerPage);
  const currentNbItems = report.neighborhoods.slice(
    (currentNbPage - 1) * nbPerPage,
    currentNbPage * nbPerPage
  );

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Header com Ações */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Relatório Executivo</h1>
          <p className="text-muted-foreground">Síntese oficial de vitimização criminal e segurança pública.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={fetchReportData} disabled={isExporting}>
            Atualizar Dados
          </Button>
          <Button 
            onClick={handleDownloadPDF} 
            disabled={isExporting}
            className="bg-red-600 hover:bg-red-700 text-white font-bold"
          >
            {isExporting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <FileDown className="mr-2 h-4 w-4" />
            )}
            BAIXAR RELATÓRIO (PDF)
          </Button>
        </div>
      </div>

      {/* PRÉ-VISUALIZAÇÃO DO DOCUMENTO */}
      <div 
        ref={reportRef} 
        className="flex flex-col gap-8 items-center"
      >
        
        {/* PÁGINA 1: SUMÁRIO EXECUTIVO */}
        <div className="bg-white text-black p-12 shadow-xl border rounded-none overflow-hidden print:shadow-none print:border-none"
             style={{ width: '210mm', minHeight: '297mm', position: 'relative' }}>
          
          {/* Cabeçalho do Documento */}
          <div className="border-b-[3px] border-red-600 pb-8 mb-10 flex justify-between items-start">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold uppercase tracking-[0.1em] text-red-600">VITIMIZAÇÃO ANGOLA</h2>
              <div className="space-y-0.5">
                <p className="text-sm font-bold text-slate-800 uppercase tracking-wider">Relatório de Segurança e Vitimização</p>
                <p className="text-xs text-slate-500 uppercase font-semibold">Província de Luanda • Município de Samba</p>
              </div>
            </div>
            <div className="text-right">
              <Badge variant="outline" className="text-[10px] mb-3 border-red-600 text-red-600 px-3 py-1 font-bold">PÁGINA 1 / 3</Badge>
              <p className="text-[10px] font-mono text-slate-400 uppercase tracking-tighter">Gerado em: {new Date(report.generatedAt).toLocaleString('pt-PT')}</p>
            </div>
          </div>

          <div className="space-y-10">
            <section>
              <h3 className="text-lg font-bold border-l-[6px] border-red-600 pl-4 mb-6 flex items-center gap-2 text-slate-900">
                <FileText className="h-5 w-5 text-red-600" /> 1. SUMÁRIO EXECUTIVO E INDICADORES GERAIS
              </h3>
              <p className="text-[13px] leading-[1.8] text-slate-700 mb-8 text-justify">
                Este relatório consolida dados críticos sobre a segurança pública no Município de Samba. Os indicadores apresentados derivam tanto de inquéritos directos realizados por investigadores quanto de relatos espontâneos de cidadãos através da plataforma. A análise conjunta destes fluxos permite uma visão holística da criminalidade e da percepção de insegurança local.
              </p>
              
              <div className="grid grid-cols-3 gap-6 mb-10">
                <div className="p-6 bg-slate-50 border-t-4 border-slate-900 rounded-lg text-center shadow-sm">
                  <p className="text-[10px] font-bold text-slate-500 uppercase mb-2 tracking-widest">Utilizadores no Sistema</p>
                  <p className="text-3xl font-black text-slate-900">{report.stats.totalUsers}</p>
                  <p className="text-[9px] text-slate-400 mt-2 italic">Registados na plataforma</p>
                </div>
                <div className="p-6 bg-slate-50 border-t-4 border-blue-600 rounded-lg text-center shadow-sm">
                  <p className="text-[10px] font-bold text-blue-800 uppercase mb-2 tracking-widest">Relatos de Cidadãos</p>
                  <p className="text-3xl font-black text-blue-600">{report.stats.totalReports}</p>
                  <p className="text-[9px] text-slate-400 mt-2 italic">Denúncias espontâneas</p>
                </div>
                <div className="p-6 bg-slate-50 border-t-4 border-red-600 rounded-lg text-center shadow-sm">
                  <p className="text-[10px] font-bold text-red-800 uppercase mb-2 tracking-widest">Inquéritos de Campo</p>
                  <p className="text-3xl font-black text-red-600">{report.stats.totalInquiries}</p>
                  <p className="text-[9px] text-slate-400 mt-2 italic">Enviados por investigadores</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="p-6 bg-red-50 border border-red-100 rounded-xl flex items-center justify-between">
                  <div>
                    <p className="text-[11px] font-bold text-red-800 uppercase mb-1">Taxa de Vitimização</p>
                    <p className="text-xs text-red-600/70 max-w-[150px]">Percentagem de inquiridos que sofreram crimes.</p>
                  </div>
                  <p className="text-4xl font-black text-red-600">{report.stats.victimizationRate}%</p>
                </div>
                <div className="p-6 bg-green-50 border border-green-100 rounded-xl flex items-center justify-between">
                  <div>
                    <p className="text-[11px] font-bold text-green-800 uppercase mb-1">Taxa de Denúncia</p>
                    <p className="text-xs text-green-600/70 max-w-[150px]">Confiança no sistema de justiça/policial.</p>
                  </div>
                  <p className="text-4xl font-black text-green-600">{report.stats.reportingRate}%</p>
                </div>
              </div>
            </section>

            <section className="bg-slate-900 text-white p-8 rounded-xl mt-10">
              <h4 className="text-sm font-bold mb-4 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-red-500" /> ANÁLISE PRELIMINAR DE RISCO
              </h4>
              <p className="text-[12px] leading-relaxed text-slate-300">
                Os dados actuais sugerem uma discrepância entre os relatos espontâneos e os inquéritos de campo. Enquanto os inquéritos ({report.stats.totalInquiries}) fornecem uma base estatística controlada, os relatos de cidadãos ({report.stats.totalReports}) indicam áreas de crime não reportado (cifra negra) que exigem intervenção imediata nas patrulhas de proximidade.
              </p>
            </section>
          </div>

          <div className="absolute bottom-12 left-12 right-12 flex justify-between text-[9px] text-slate-400 font-mono border-t pt-4 uppercase tracking-widest">
            <span>VITIMIZAÇÃO ANGOLA • SISTEMA DE INTELIGÊNCIA</span>
            <span>CONFIDENCIAL • USO INSTITUCIONAL</span>
          </div>
        </div>

        {/* PÁGINA 2: GEOGRAFIA E DEMOGRAFIA */}
        <div className="bg-white text-black p-12 shadow-xl border rounded-none overflow-hidden print:shadow-none print:border-none"
             style={{ width: '210mm', minHeight: '297mm', position: 'relative' }}>
          
          <div className="border-b-[3px] border-slate-900 pb-8 mb-10 flex justify-between items-start">
            <h2 className="text-2xl font-black uppercase tracking-widest text-slate-900">Análise Geográfica e Demográfica</h2>
            <div className="text-right">
              <Badge variant="outline" className="text-[10px] border-slate-900 text-slate-900 px-3 py-1 font-bold">PÁGINA 2 / 3</Badge>
            </div>
          </div>

          <div className="space-y-12">
            <section>
              <h3 className="text-lg font-bold border-l-[6px] border-red-600 pl-4 mb-6 flex items-center gap-2 text-slate-900 text-[15px]">
                <MapPin className="h-5 w-5 text-red-600" /> 2. DISTRIBUIÇÃO ESPACIAL (BAIRROS)
              </h3>
              <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm bg-white">
                <table className="w-full text-[11px]">
                  <thead>
                    <tr className="bg-slate-900 text-white">
                      <th className="px-6 py-4 text-left font-bold uppercase tracking-wider">BAIRRO / ZONA DE INTERVENÇÃO</th>
                      <th className="px-6 py-4 text-right font-bold uppercase tracking-wider">INQUÉRITOS</th>
                      <th className="px-6 py-4 text-right font-bold uppercase tracking-wider">INCIDÊNCIA (%)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {currentNbItems.map((n) => (
                      <tr key={n.name} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-3 font-bold text-slate-800">{n.name}</td>
                        <td className="px-6 py-3 text-right font-mono text-slate-600">{n.count}</td>
                        <td className="px-6 py-3 text-right font-mono text-slate-900 font-bold">
                          {((n.count / report.stats.totalInquiries) * 100).toFixed(1)}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
                {/* Pagination Controls inside PDF preview */}
                {nbTotalPages > 1 && (
                  <div className="px-6 py-3 border-t flex items-center justify-between bg-slate-50 print:hidden">
                    <span className="text-[10px] text-slate-500 font-bold uppercase">Paginação de Bairros</span>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-7 text-[10px] font-bold"
                        onClick={() => setCurrentNbPage(p => Math.max(1, p - 1))}
                        disabled={currentNbPage === 1}
                      >
                        Anterior
                      </Button>
                      <div className="flex items-center px-2 text-[10px] font-bold">
                        {currentNbPage} / {nbTotalPages}
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-7 text-[10px] font-bold"
                        onClick={() => setCurrentNbPage(p => Math.min(nbTotalPages, p + 1))}
                        disabled={currentNbPage === nbTotalPages}
                      >
                        Próxima
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </section>

            <section>
              <h3 className="text-lg font-bold border-l-[6px] border-red-600 pl-4 mb-8 flex items-center gap-2 text-slate-900 text-[15px]">
                PERFIL DEMOGRÁFICO DOS PARTICIPANTES
              </h3>
              <div className="grid grid-cols-2 gap-10">
                <div>
                  <h4 className="text-[11px] font-black uppercase text-slate-500 mb-4 tracking-tighter">Distribuição por Género</h4>
                  <div className="space-y-4">
                    {report.stats.demographics.gender.map(g => (
                      <div key={g.label} className="space-y-1">
                        <div className="flex justify-between text-[11px] font-bold">
                          <span>{g.label}</span>
                          <span>{g.value} ({((g.value / report.stats.totalInquiries) * 100).toFixed(1)}%)</span>
                        </div>
                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-slate-800 rounded-full" 
                            style={{ width: `${(g.value / report.stats.totalInquiries) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-[11px] font-black uppercase text-slate-500 mb-4 tracking-tighter">Faixa Etária</h4>
                  <div className="space-y-3">
                    {report.stats.demographics.age.map(a => (
                      <div key={a.label} className="flex items-center gap-3">
                        <span className="text-[10px] font-bold w-16">{a.label}</span>
                        <div className="flex-1 h-3 bg-slate-100 rounded-sm overflow-hidden">
                          <div 
                            className="h-full bg-red-600" 
                            style={{ width: `${(a.value / report.stats.totalInquiries) * 100}%` }}
                          />
                        </div>
                        <span className="text-[10px] font-mono font-bold">{a.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div className="absolute bottom-12 left-12 right-12 flex justify-between text-[9px] text-slate-400 font-mono border-t pt-4 uppercase tracking-widest">
            <span>SISTEMA INTEGRADO DE MONITORAMENTO - SAMBA</span>
            <span>PÁGINA 2</span>
          </div>
        </div>

        {/* PÁGINA 3: ESTATÍSTICAS DE CRIME E NOTAS TÉCNICAS */}
        <div className="bg-white text-black p-12 shadow-xl border rounded-none overflow-hidden print:shadow-none print:border-none"
             style={{ width: '210mm', minHeight: '297mm', position: 'relative' }}>
          
          <div className="border-b-[3px] border-red-600 pb-8 mb-10 flex justify-between items-start">
            <h2 className="text-2xl font-black uppercase tracking-widest text-red-600">Tipologias Criminais</h2>
            <div className="text-right">
              <Badge variant="outline" className="text-[10px] border-red-600 text-red-600 px-3 py-1 font-bold">PÁGINA 3 / 3</Badge>
            </div>
          </div>

          <div className="space-y-12">
            <section>
              <h3 className="text-lg font-bold border-l-[6px] border-red-600 pl-4 mb-6 flex items-center gap-2 text-slate-900 text-[15px]">
                3. FREQUÊNCIA POR TIPO DE CRIME
              </h3>
              <div className="grid grid-cols-2 gap-x-12 gap-y-6">
                {Object.entries(report.stats.crimes).map(([crime, count]) => (
                  <div key={crime} className="flex justify-between items-center border-b pb-2">
                    <span className="text-[11px] font-bold uppercase text-slate-700">{crime}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-black text-slate-900">{count}</span>
                      <Badge className="bg-slate-100 text-slate-600 hover:bg-slate-100 text-[9px] font-mono">
                        {report.stats.totalInquiries > 0 ? ((count / report.stats.totalInquiries) * 100).toFixed(1) : 0}%
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-red-50 p-8 rounded-2xl border-2 border-red-100 border-dashed">
              <h4 className="font-black text-red-900 text-xs flex items-center gap-2 mb-4 uppercase tracking-widest">
                <AlertTriangle className="h-4 w-4 text-red-600" /> Notas de Análise de Inteligência
              </h4>
              <div className="text-[11px] text-slate-700 space-y-4 leading-relaxed text-justify">
                <p>
                  • A prevalência de <b>{Object.entries(report.stats.crimes).sort((a,b) => b[1]-a[1])[0][0]}</b> indica uma tendência de crimes contra o património/pessoa que necessita de reforço policial no período nocturno.
                </p>
                <p>
                  • A taxa de denúncia de <b>{report.stats.reportingRate}%</b> sugere uma barreira significativa no acesso à justiça formal, o que pode levar à sub-notificação e ao aumento da impunidade local.
                </p>
                <p>
                  • Recomenda-se a intensificação da recolha de dados nas zonas com menos de 5% de incidência para garantir a representatividade estatística de todo o município.
                </p>
              </div>
            </section>

            {/* Assinatura */}
            <div className="pt-24 text-center">
              <div className="w-80 border-t-2 border-slate-300 mx-auto mb-3"></div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-slate-900">DIREÇÃO DE SEGURANÇA - VITIMIZAÇÃO ANGOLA</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase">SISTEMA INTEGRADO DE MONITORAMENTO DE SEGURANÇA PÚBLICA</p>
              <p className="text-[9px] text-slate-300 mt-2 font-mono italic">AUTENTICADO VIA PLATAFORMA DIGITAL VITIMIZAÇÃO ANGOLA</p>
            </div>
          </div>

          <div className="absolute bottom-12 left-12 right-12 flex justify-between text-[9px] text-slate-400 font-mono border-t pt-4 uppercase tracking-widest">
            <span>Relatório Oficial ID: VC-{new Date().getFullYear()}-{report.stats.totalInquiries}</span>
            <span>VITIMIZAÇÃO ANGOLA • LUANDA</span>
          </div>
        </div>

      </div>
    </div>
  );
}

