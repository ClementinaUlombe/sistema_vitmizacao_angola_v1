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
  AlertTriangle
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

  const handleDownloadDoc = () => {
    if (!report) return;

    // Criar o conteúdo HTML para o documento Word com estilos embutidos
    const header = `<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
                    <head><meta charset='utf-8'><title>Relatório Safe Angola</title>
                    <style>
                      body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; }
                      .header { border-bottom: 2px solid #0055ff; padding-bottom: 20px; margin-bottom: 30px; text-align: center; }
                      h1 { color: #0055ff; text-transform: uppercase; margin: 0; font-size: 24px; }
                      h2 { color: #0055ff; border-left: 5px solid #0055ff; padding-left: 10px; margin-top: 30px; font-size: 18px; }
                      table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                      th, td { border: 1px solid #ddd; padding: 10px; text-align: left; font-size: 12px; }
                      th { background-color: #f5f5f5; font-weight: bold; }
                      .stats-table { width: 100%; margin-bottom: 30px; }
                      .stat-cell { padding: 15px; background: #f9f9f9; border: 1px solid #eee; text-align: center; }
                      .footer { margin-top: 50px; border-top: 1px solid #eee; font-size: 10px; color: #777; text-align: center; }
                      .note { background: #fff9e6; border: 1px solid #ffe58f; padding: 15px; margin-top: 30px; font-size: 12px; }
                    </style>
                    </head><body>`;
    
    const footer = "</body></html>";
    
    const content = `
      <div class="header">
        <h1>SAFE ANGOLA</h1>
        <p><b>SISTEMA DE MONITORAMENTO DE VITIMIZAÇÃO CRIMINAL</b></p>
        <p>Relatório Executivo Oficial - Samba, Luanda</p>
        <p><i>Gerado eletronicamente em: ${new Date(report.generatedAt).toLocaleString('pt-PT')}</i></p>
      </div>

      <h2>1. SUMÁRIO EXECUTIVO</h2>
      <p>Este documento apresenta a síntese consolidada dos inquéritos de vitimização realizados no Município de Samba. Os dados aqui expostos refletem a realidade estatística capturada pelo sistema Safe Angola, servindo como ferramenta de suporte à decisão para órgãos de segurança pública e administração municipal.</p>
      
      <table class="stats-table">
        <tr>
          <td class="stat-cell"><b>TOTAL DE INQUÉRITOS</b><br><span style="font-size: 18px;">${report.stats.total}</span></td>
          <td class="stat-cell"><b>DADOS VALIDADOS</b><br><span style="font-size: 18px; color: green;">${report.stats.validated}</span></td>
          <td class="stat-cell"><b>TAXA DE VITIMIZAÇÃO</b><br><span style="font-size: 18px; color: red;">${report.stats.victimizationRate}%</span></td>
          <td class="stat-cell"><b>TAXA DE DENÚNCIA</b><br><span style="font-size: 18px; color: blue;">${report.stats.reportingRate}%</span></td>
        </tr>
      </table>

      <h2>2. DISTRIBUIÇÃO GEOGRÁFICA (POR BAIRRO)</h2>
      <p>Abaixo apresenta-se a volumetria de dados recolhidos por cada zona de atuação no município:</p>
      <table>
        <thead>
          <tr>
            <th style="background-color: #0055ff; color: white;">BAIRRO / ZONA</th>
            <th style="background-color: #0055ff; color: white;">VOLUME DE INQUÉRITOS</th>
            <th style="background-color: #0055ff; color: white;">REPRESENTATIVIDADE (%)</th>
          </tr>
        </thead>
        <tbody>
          ${report.neighborhoods.map(n => `
            <tr>
              <td><b>${n.name}</b></td>
              <td style="text-align: right;">${n.count}</td>
              <td style="text-align: right;">${((n.count / report.stats.total) * 100).toFixed(1)}%</td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <h2>3. NOTAS TÉCNICAS E ANÁLISE</h2>
      <div class="note">
        <p><b>• Taxa de Vitimização:</b> Indica a percentagem da população inquirida que sofreu algum evento criminal nos últimos 12 meses.</p>
        <p><b>• Taxa de Denúncia:</b> Indica a eficácia do reporte policial. Uma taxa baixa sugere a existência de uma "Cifra Negra" (crimes não notificados).</p>
        <p><b>• Estado do Sistema:</b> Atualmente existem <b>${report.stats.pending}</b> inquéritos pendentes de validação administrativa.</p>
      </div>

      <div style="margin-top: 80px; text-align: center;">
        <p>_________________________________________________</p>
        <p><b>DIREÇÃO GERAL DE SEGURANÇA - SAFE ANGOLA</b></p>
        <p>Sistema de Apoio à Segurança Pública do Município de Samba</p>
        <p>Documento Autenticado via Plataforma Digital</p>
      </div>

      <div class="footer">
        SAFE ANGOLA • RELATÓRIO DE SISTEMA • CONFIDENCIAL • ${new Date().getFullYear()}
      </div>
    `;

    const source = header + content + footer;
    const blob = new Blob(['\ufeff', source], {
      type: 'application/msword'
    });
    
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Relatorio_Executivo_Samba_${new Date().toISOString().split('T')[0]}.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
          <Button variant="outline" onClick={fetchReportData}>
            Atualizar Dados
          </Button>
          <Button onClick={handleDownloadDoc} className="bg-blue-600 hover:bg-blue-700 text-white font-bold">
            <Download className="mr-2 h-4 w-4" /> BAIXAR RELATÓRIO (.DOC)
          </Button>
        </div>
      </div>

      {/* PRÉ-VISUALIZAÇÃO DO DOCUMENTO */}
      <div ref={reportRef} className="bg-white text-black p-8 md:p-12 shadow-xl border rounded-lg">
        
        {/* Cabeçalho do Documento */}
        <div className="border-b-2 border-blue-600 pb-6 mb-8 flex justify-between items-start">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold uppercase tracking-wider text-blue-600">SAFE ANGOLA</h2>
            <p className="text-sm font-semibold">Sistema de Monitoramento de Vitimização Criminal</p>
            <p className="text-xs text-muted-foreground">Governo Provincial de Luanda • Município de Samba</p>
          </div>
          <div className="text-right">
            <Badge variant="outline" className="text-xs mb-2 border-blue-600 text-blue-600">DOCUMENTO OFICIAL</Badge>
            <p className="text-xs font-mono text-muted-foreground uppercase">Gerado em: {new Date(report.generatedAt).toLocaleString('pt-PT')}</p>
          </div>
        </div>

        {/* Corpo do Relatório */}
        <div className="space-y-10">
          
          {/* 1. Sumário Executivo */}
          <section>
            <h3 className="text-lg font-bold border-l-4 border-blue-600 pl-3 mb-4 flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600" /> 1. SUMÁRIO EXECUTIVO
            </h3>
            <p className="text-sm leading-relaxed mb-6">
              Este documento apresenta a síntese consolidada dos inquéritos de vitimização realizados no Município de Samba. 
              Os dados refletem a percepção de segurança e as experiências de crime reportadas pela população local, 
              servindo como base estratégica para políticas de segurança pública.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-slate-50 border rounded-lg text-center">
                <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Total Inquéritos</p>
                <p className="text-2xl font-bold">{report.stats.total}</p>
              </div>
              <div className="p-4 bg-slate-50 border rounded-lg text-center">
                <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Validados</p>
                <p className="text-2xl font-bold text-green-600">{report.stats.validated}</p>
              </div>
              <div className="p-4 bg-red-50 border border-red-100 rounded-lg text-center">
                <p className="text-[10px] font-bold text-red-800 uppercase mb-1">Vitimização</p>
                <p className="text-2xl font-bold text-red-600">{report.stats.victimizationRate}%</p>
              </div>
              <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg text-center">
                <p className="text-[10px] font-bold text-blue-800 uppercase mb-1">Denúncias</p>
                <p className="text-2xl font-bold text-blue-600">{report.stats.reportingRate}%</p>
              </div>
            </div>
          </section>

          {/* 2. Distribuição Geográfica */}
          <section>
            <h3 className="text-lg font-bold border-l-4 border-blue-600 pl-3 mb-4 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-blue-600" /> 2. DISTRIBUIÇÃO POR BAIRROS
            </h3>
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 border-b">
                  <tr>
                    <th className="px-4 py-3 text-left font-bold text-blue-600">BAIRRO</th>
                    <th className="px-4 py-3 text-right font-bold text-blue-600">INQUÉRITOS</th>
                    <th className="px-4 py-3 text-right font-bold text-blue-600">%</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {report.neighborhoods.map((n) => (
                    <tr key={n.name} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-4 py-3 font-semibold">{n.name}</td>
                      <td className="px-4 py-3 text-right font-mono">{n.count}</td>
                      <td className="px-4 py-3 text-right font-mono">
                        {((n.count / report.stats.total) * 100).toFixed(1)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* 3. Observações Técnicas */}
          <section className="bg-amber-50 p-6 rounded-lg border border-amber-200">
            <h4 className="font-bold text-amber-900 text-sm flex items-center gap-2 mb-2">
              <AlertTriangle className="h-4 w-4" /> NOTAS DE ANÁLISE TÉCNICA
            </h4>
            <div className="text-xs text-amber-800 space-y-2 leading-relaxed">
              <p>• Os dados apresentados são processados em tempo real a partir da base de dados Safe Angola.</p>
              <p>• A taxa de vitimização é calculada com base em respostas afirmativas sobre eventos criminais nos últimos 12 meses.</p>
              <p>• Recomenda-se atenção especial aos bairros com menor taxa de denúncia, pois podem indicar zonas de isolamento institucional.</p>
            </div>
          </section>

          {/* Assinatura */}
          <div className="pt-16 text-center">
            <div className="w-64 border-t-2 border-slate-300 mx-auto mb-2"></div>
            <p className="text-sm font-bold uppercase tracking-widest text-slate-700">Direção Geral de Segurança - Safe Angola</p>
            <p className="text-xs text-muted-foreground">Documento Autenticado Digitalmente • Samba, Luanda</p>
          </div>
        </div>

        {/* Footer de Página */}
        <div className="mt-12 pt-4 border-t text-[10px] text-muted-foreground flex justify-between uppercase font-mono">
          <span>Relatório ID: VC-{new Date().getFullYear()}-SUMMARY</span>
          <span>SAFE ANGOLA • MUNICÍPIO DE SAMBA</span>
        </div>
      </div>
    </div>
  );
}
