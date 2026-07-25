import React from 'react';
import { useApp } from '../../context/AppContext';
import { BarChart3, TrendingUp, Users, Download, Sparkles } from 'lucide-react';

export const CompanyReports: React.FC = () => {
  const { employees, showToast } = useApp();

  return (
    <div className="space-y-6 py-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Relatórios & People Analytics</h1>
          <p className="text-xs text-slate-500 mt-1">Métricas estratégicas de retenção, turnover, diversidade e custo por contratação</p>
        </div>

        <button
          onClick={() => showToast('Relatório executivo em PDF exportado!')}
          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-xs transition-colors"
        >
          <Download className="w-4 h-4" /> Exportar PDF Executivo
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <span className="text-xs font-bold text-slate-500">Taxa de Turnover</span>
          <span className="text-2xl font-black text-emerald-600 block">1.8%</span>
          <span className="text-[11px] text-slate-400 font-medium">Abaixo da média de mercado (4.2%)</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <span className="text-xs font-bold text-slate-500">Tempo Médio de Contratação</span>
          <span className="text-2xl font-black text-blue-600 block">12 Dias</span>
          <span className="text-[11px] text-blue-600 font-semibold">Redução de 65% com Triagem IA</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <span className="text-xs font-bold text-slate-500">eNPS (Satisfação dos Funcionários)</span>
          <span className="text-2xl font-black text-purple-600 block">+78</span>
          <span className="text-[11px] text-purple-600 font-semibold">Zona de Excelência</span>
        </div>
      </div>
    </div>
  );
};
