import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Users,
  Briefcase,
  DollarSign,
  TrendingUp,
  Sparkles,
  UserPlus,
  Clock,
  Calendar,
  ArrowRight,
  ShieldCheck,
  Building2
} from 'lucide-react';

export const CompanyDashboard: React.FC = () => {
  const { employees, jobs, talentPool, setActiveTab } = useApp();

  const activeEmployees = employees.filter(e => e.status === 'Ativo');
  const activeJobs = jobs.filter(j => j.status === 'Aberta');
  const totalPayroll = employees.reduce((sum, e) => sum + e.salary, 0);

  return (
    <div className="space-y-6 py-6">
      {/* Company Header Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 bg-blue-500/20 text-blue-300 border border-blue-500/30 px-3 py-1 rounded-full text-xs font-bold">
            <Building2 className="w-3.5 h-3.5" /> Painel Corporativo de RH & DP
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">TechInova Software LTDA</h1>
          <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
            Gestão unificada de talentos, folha de pagamento, banco de currículos com IA e ponto eletrônico.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('jobs')}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs transition-colors shadow-xs flex items-center gap-2"
          >
            <UserPlus className="w-4 h-4" /> Publicar Vaga com IA
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          onClick={() => setActiveTab('employees')}
          className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer space-y-2"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Colaboradores</span>
            <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <span className="text-2xl font-black text-slate-900">{employees.length}</span>
          <span className="text-[11px] text-emerald-600 font-semibold block">{activeEmployees.length} ativos em folha</span>
        </div>

        <div
          onClick={() => setActiveTab('jobs')}
          className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-purple-300 hover:shadow-md transition-all cursor-pointer space-y-2"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Vagas Abertas</span>
            <div className="p-2 bg-purple-50 text-purple-600 rounded-xl">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>
          <span className="text-2xl font-black text-slate-900">{activeJobs.length}</span>
          <span className="text-[11px] text-purple-600 font-semibold block">42 candidatos triados</span>
        </div>

        <div
          onClick={() => setActiveTab('talent-pool')}
          className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-amber-300 hover:shadow-md transition-all cursor-pointer space-y-2"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Banco de Talentos</span>
            <div className="p-2 bg-amber-50 text-amber-600 rounded-xl">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <span className="text-2xl font-black text-slate-900">{talentPool.length}</span>
          <span className="text-[11px] text-amber-600 font-semibold block">Indexados com IA</span>
        </div>

        <div
          onClick={() => setActiveTab('financial')}
          className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-emerald-300 hover:shadow-md transition-all cursor-pointer space-y-2"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Folha de Pagamento</span>
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <span className="text-xl font-black text-slate-900">
            R$ {totalPayroll.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </span>
          <span className="text-[11px] text-emerald-600 font-semibold block">Mês Atual Calculado</span>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Jobs Overview */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-bold text-slate-900 text-sm">Vagas em Processo Seletivo</h3>
            <button onClick={() => setActiveTab('jobs')} className="text-xs font-bold text-blue-600 hover:underline">
              Gerenciar Vagas
            </button>
          </div>

          <div className="space-y-3">
            {jobs.map(job => (
              <div key={job.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between gap-4 text-xs">
                <div>
                  <span className="font-bold text-slate-900 text-sm block">{job.title}</span>
                  <span className="text-slate-500">{job.department} • {job.location} • {job.type}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 bg-blue-100 text-blue-800 font-bold rounded-lg">
                    {job.candidatesCount} Candidatos
                  </span>
                  <button
                    onClick={() => setActiveTab('recruitment')}
                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors"
                  >
                    Pipeline
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Insight Box */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-purple-400">
            <Sparkles className="w-5 h-5" />
            <h3 className="font-bold text-white text-sm">Insights de People Analytics</h3>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3 text-xs">
            <p className="text-slate-300 leading-relaxed">
              🤖 <span className="font-bold text-white">IA Gemini detectou:</span> A vaga de <span className="text-blue-300 font-bold">Engenheiro de Software Sênior</span> recebeu 3 novos candidatos com aderência técnica acima de 90%.
            </p>
            <div className="pt-2">
              <button
                onClick={() => setActiveTab('recruitment')}
                className="w-full py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5"
              >
                Abrir Triagem por Match IA
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
