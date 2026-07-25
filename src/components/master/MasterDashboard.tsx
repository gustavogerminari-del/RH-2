import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShieldAlert,
  Building2,
  DollarSign,
  Cpu,
  Layers,
  Database,
  CheckCircle2,
  TrendingUp,
  Activity,
  Server
} from 'lucide-react';

export const MasterDashboard: React.FC = () => {
  const { setActiveTab } = useApp();

  return (
    <div className="space-y-6 py-6">
      {/* Master Hero Banner */}
      <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-8 border border-purple-900/50 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 bg-purple-500/20 text-purple-300 border border-purple-500/30 px-3 py-1 rounded-full text-xs font-bold">
            <ShieldAlert className="w-3.5 h-3.5" /> Painel de Controle Master • SaaS GestRH
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">Visão Geral da Plataforma Multi-tenant</h1>
          <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
            Monitoramento de instâncias de clientes, receita recorrente (MRR), consumo de APIs de IA, saúde de clusters e integrações ativas.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('master-clients')}
            className="px-4 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl text-xs transition-colors shadow-lg"
          >
            + Novo Cliente Tenant
          </button>
        </div>
      </div>

      {/* SaaS Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          onClick={() => setActiveTab('master-clients')}
          className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-purple-300 hover:shadow-md transition-all cursor-pointer space-y-2"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Empresas Clientes</span>
            <div className="p-2 bg-purple-50 text-purple-600 rounded-xl">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <span className="text-2xl font-black text-slate-900">48</span>
          <span className="text-[11px] text-emerald-600 font-semibold block">+6 novas este mês</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-emerald-300 hover:shadow-md transition-all cursor-pointer space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">MRR (Receita Mensal)</span>
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <span className="text-2xl font-black text-slate-900">R$ 142.500</span>
          <span className="text-[11px] text-emerald-600 font-semibold block">+12.4% vs mês anterior</span>
        </div>

        <div
          onClick={() => setActiveTab('master-ai')}
          className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer space-y-2"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Requisições IA Gemini</span>
            <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
              <Cpu className="w-4 h-4" />
            </div>
          </div>
          <span className="text-2xl font-black text-slate-900">128.400</span>
          <span className="text-[11px] text-blue-600 font-semibold block">SLA 99.98% de resposta</span>
        </div>

        <div
          onClick={() => setActiveTab('master-db')}
          className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-amber-300 hover:shadow-md transition-all cursor-pointer space-y-2"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Status Infraestrutura</span>
            <div className="p-2 bg-amber-50 text-amber-600 rounded-xl">
              <Server className="w-4 h-4" />
            </div>
          </div>
          <span className="text-xl font-black text-emerald-600">Totalmente Operacional</span>
          <span className="text-[11px] text-slate-400 font-semibold">Firebase Firestore / Cloud SQL</span>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-bold text-slate-900 text-sm">Empresas Clientes Recentes</h3>
            <button onClick={() => setActiveTab('master-clients')} className="text-xs font-bold text-purple-600 hover:underline">
              Ver Todos os Tenants
            </button>
          </div>

          <div className="space-y-3">
            {[
              { name: 'TechInova Software LTDA', plan: 'Enterprise Full', users: 120, status: 'Ativo', mrr: 'R$ 3.500' },
              { name: 'Grupo Varejo Mais SA', plan: 'Corporativo Pro', users: 450, status: 'Ativo', mrr: 'R$ 8.900' },
              { name: 'Logística Express Brasil', plan: 'Essencial DP', users: 85, status: 'Ativo', mrr: 'R$ 1.800' },
              { name: 'Agência Digital Spark', plan: 'Recrutamento IA', users: 32, status: 'Ativo', mrr: 'R$ 990' }
            ].map((client, idx) => (
              <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between gap-4 text-xs">
                <div>
                  <span className="font-bold text-slate-900 text-sm block">{client.name}</span>
                  <span className="text-slate-500">Plano: {client.plan} • {client.users} vidas</span>
                </div>
                <div className="text-right">
                  <span className="font-black text-emerald-600 block">{client.mrr}/mês</span>
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded">
                    {client.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Master AI Cluster Status */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 space-y-4">
          <h3 className="font-bold text-white text-sm flex items-center gap-2">
            <Cpu className="w-4 h-4 text-purple-400" /> Modelos IA Ativos
          </h3>

          <div className="space-y-2 text-xs">
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <span className="font-bold text-purple-300 block">Gemini 2.5 Flash / Pro</span>
              <span className="text-slate-400 text-[11px]">Utilizado para Match de Currículos & Geração de Vagas</span>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <span className="font-bold text-blue-300 block">Engine Antigravity AI</span>
              <span className="text-slate-400 text-[11px]">Processamento em lote de arquivos PDF de currículos</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
