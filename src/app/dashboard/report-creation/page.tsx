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
    total: number;
    validated: number;
    pending: number;
    victimizationRate: string | number;
    reportingRate: string | number;
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
      
      // Importação dinâmica para evitar erro no servidor (Next.js)
      // @ts-ignore
      const html2pdf = (await import('html2pdf.js')).default;
      
      const element = reportRef.current;
      const opt = {
        margin: [15, 15, 15, 15],
        filename: `Relatorio_Executivo_Samba_${new Date().toISOString().split('T')[0]}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };

      // Gerar e baixar o PDF
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

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Header com Ações */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
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

      {/* PRÉ-VISUALIZAÇÃO DO DOCUMENTO (O que será convertido para PDF) */}
      <div 
        ref={reportRef} 
        className="bg-white text-black p-10 md:p-16 shadow-xl border rounded-lg overflow-hidden"
        style={{ width: '100%', maxWidth: '210mm', margin: '0 auto' }}
      >
        
        {/* Cabeçalho do Documento */}
        <div className="border-b-[3px] border-red-600 pb-8 mb-10 flex justify-between items-start">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold uppercase tracking-[0.1em] text-red-600">VITIMIZAÇÃO ANGOLA</h2>
            <div className="space-y-0.5">
              <p className="text-sm font-bold text-slate-800">SISTEMA DE MONITORAMENTO DE VITIMIZAÇÃO CRIMINAL</p>
              <p className="text-xs text-slate-500 uppercase font-semibold">Governo Provincial de Luanda • Município de Samba</p>
            </div>
          </div>
          <div className="text-right">
            <Badge variant="outline" className="text-[10px] mb-3 border-red-600 text-red-600 px-3 py-1 font-bold">RELATÓRIO DE INTELIGÊNCIA</Badge>
            <p className="text-[10px] font-mono text-slate-400 uppercase">Gerado em: {new Date(report.generatedAt).toLocaleString('pt-PT')}</p>
          </div>
        </div>

        {/* Corpo do Relatório */}
        <div className="space-y-12">
          
          {/* 1. Sumário Executivo */}
          <section>
            <h3 className="text-lg font-bold border-l-[6px] border-red-600 pl-4 mb-6 flex items-center gap-2 text-slate-900">
              <FileText className="h-5 w-5 text-red-600" /> 1. SUMÁRIO EXECUTIVO
            </h3>
            <p className="text-[13px] leading-[1.8] text-slate-700 mb-8 text-justify">
              Este documento oficial consolida os dados obtidos através de inquéritos de vitimização realizados no Município de Samba. 
              As estatísticas abaixo detalhadas refletem a percepção de segurança, as experiências criminais e a interação institucional reportada pela população local, 
              servindo como instrumento técnico-estratégico de suporte à tomada de decisão para políticas de segurança pública e ordenamento urbano.
            </p>
            
            <div className="grid grid-cols-4 gap-4">
              <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl text-center shadow-sm">
                <p className="text-[9px] font-bold text-slate-500 uppercase mb-2 tracking-wider">Total Inquéritos</p>
                <p className="text-2xl font-black text-slate-900">{report.stats.total}</p>
              </div>
              <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl text-center shadow-sm">
                <p className="text-[9px] font-bold text-slate-500 uppercase mb-2 tracking-wider">Dados Validados</p>
                <p className="text-2xl font-black text-green-600">{report.stats.validated}</p>
              </div>
              <div className="p-5 bg-red-50 border border-red-100 rounded-xl text-center shadow-sm">
                <p className="text-[9px] font-bold text-red-800 uppercase mb-2 tracking-wider">Vitimização</p>
                <p className="text-2xl font-black text-red-600">{report.stats.victimizationRate}%</p>
              </div>
              <div className="p-5 bg-blue-50 border border-blue-100 rounded-xl text-center shadow-sm">
                <p className="text-[9px] font-bold text-blue-800 uppercase mb-2 tracking-wider">Denúncias</p>
                <p className="text-2xl font-black text-blue-600">{report.stats.reportingRate}%</p>
              </div>
            </div>
          </section>

          {/* 2. Distribuição Geográfica */}
          <section>
            <h3 className="text-lg font-bold border-l-[6px] border-red-600 pl-4 mb-6 flex items-center gap-2 text-slate-900">
              <MapPin className="h-5 w-5 text-red-600" /> 2. DISTRIBUIÇÃO POR BAIRROS
            </h3>
            <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm bg-white">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-slate-900 text-white">
                    <th className="px-5 py-4 text-left font-bold uppercase tracking-wider">BAIRRO / ZONA</th>
                    <th className="px-5 py-4 text-right font-bold uppercase tracking-wider">VOLUME DE INQUÉRITOS</th>
                    <th className="px-5 py-4 text-right font-bold uppercase tracking-wider">PERCENTAGEM (%)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {report.neighborhoods.map((n) => (
                    <tr key={n.name} className="hover:bg-slate-50 transition-colors">
                      <td className="px-5 py-4 font-bold text-slate-800">{n.name}</td>
                      <td className="px-5 py-4 text-right font-mono text-slate-600">{n.count}</td>
                      <td className="px-5 py-4 text-right font-mono text-slate-900 font-bold">
                        {((n.count / report.stats.total) * 100).toFixed(1)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* 3. Notas Técnicas */}
          <section className="bg-slate-50 p-8 rounded-2xl border-2 border-slate-200 border-dashed">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2 mb-4">
              <AlertTriangle className="h-4 w-4 text-red-600" /> NOTAS DE ANÁLISE TÉCNICA
            </h4>
            <div className="text-[11px] text-slate-600 space-y-3 leading-relaxed">
              <p>• A <b>Taxa de Vitimização</b> baseia-se no volume de inquiridos que sofreram eventos criminais nos últimos 12 meses. Uma taxa acima de 20% é considerada crítica.</p>
              <p>• A <b>Taxa de Denúncia</b> é um indicador de confiança institucional. Percentagens baixas indicam a necessidade de maior aproximação policial à comunidade.</p>
              <p>• Este relatório inclui dados processados até a presente data, restando <b>{report.stats.pending}</b> inquéritos em estado de validação.</p>
            </div>
          </section>

          {/* Assinatura */}
          <div className="pt-20 text-center">
            <div className="w-80 border-t-2 border-slate-300 mx-auto mb-3"></div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-slate-900">DIREÇÃO DE SEGURANÇA - VITIMIZAÇÃO ANGOLA</p>
            <p className="text-[10px] text-slate-400 font-bold uppercase">SISTEMA INTEGRADO DE MONITORAMENTO DE SEGURANÇA PÚBLICA</p>
            <p className="text-[9px] text-slate-300 mt-2 font-mono italic">AUTENTICADO VIA PLATAFORMA DIGITAL VITIMIZAÇÃO ANGOLA</p>
          </div>
        </div>

        {/* Footer de Página */}
        <div className="mt-16 pt-6 border-t border-slate-100 text-[9px] text-slate-400 flex justify-between uppercase font-mono tracking-widest">
          <span>Relatório Oficial ID: VC-{new Date().getFullYear()}-{report.stats.total}</span>
          <span>VITIMIZAÇÃO ANGOLA • MUNICÍPIO DE SAMBA • LUANDA</span>
        </div>
      </div>
    </div>
  );
}
