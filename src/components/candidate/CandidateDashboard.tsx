import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Briefcase,
  Users,
  Clock,
  DollarSign,
  FileText,
  CheckCircle2,
  AlertCircle,
  Calendar,
  ArrowRight,
  Sun,
  Sparkles
} from 'lucide-react';

export const CandidateDashboard: React.FC = () => {
  const { candidate, applications, interviews, timeLogs, payslips, clockIn, clockOut, setActiveTab, setSelectedPayslip } = useApp();

  const activeApps = applications.filter(a => a.status !== 'Recusado');
  const nextInterview = interviews[0];
  const latestPayslip = payslips[0];
  const todayClockLog = timeLogs.find(l => l.date.includes('Hoje'));

  return (
    <div className="space-y-6 py-6">
      {/* Welcome Hero */}
      <div className="bg-[#5D6D4E] text-white rounded-3xl p-6 sm:p-8 border border-[#4B593E] shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 bg-[#E9F0E6] text-[#5D6D4E] px-3 py-1 rounded-full text-xs font-bold">
            <Users className="w-3.5 h-3.5" /> Portal do Colaborador & Candidato
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold">Olá, {candidate.name}!</h1>
          <p className="text-xs text-[#F8F7F2]/90 max-w-xl leading-relaxed">
            {candidate.title} • {activeApps.length} candidaturas ativas no momento
          </p>
        </div>

        {/* Quick Clock In Widget */}
        <div className="bg-[#2D3128] border border-white/10 p-5 rounded-2xl w-full md:w-auto text-center space-y-2">
          <span className="text-[11px] text-[#E9E5D9] font-bold uppercase tracking-wider block">Ponto Eletrônico Hoje</span>
          <div className="text-xl font-serif font-bold text-[#E9F0E6]">
            {todayClockLog ? (todayClockLog.clockOut ? 'Jornada Concluída' : `Entrada: ${todayClockLog.clockIn}`) : 'Ponto Pendente'}
          </div>
          <div className="flex gap-2 justify-center">
            {!todayClockLog ? (
              <button
                onClick={clockIn}
                className="px-4 py-2 bg-[#5D6D4E] hover:bg-[#4c5b3e] text-white font-bold rounded-xl text-xs transition-colors shadow-xs"
              >
                Registrar Entrada
              </button>
            ) : !todayClockLog.clockOut ? (
              <button
                onClick={clockOut}
                className="px-4 py-2 bg-[#8C7355] hover:bg-[#786146] text-white font-bold rounded-xl text-xs transition-colors shadow-xs"
              >
                Registrar Saída
              </button>
            ) : (
              <span className="text-xs text-[#E9E5D9] font-medium">8h registradas</span>
            )}
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          onClick={() => setActiveTab('applications')}
          className="bg-white p-5 rounded-3xl border border-[#E9E5D9] hover:border-[#5D6D4E] hover:shadow-md transition-all cursor-pointer space-y-2"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#7A7D75]">Candidaturas</span>
            <div className="p-2 bg-[#E9F0E6] text-[#5D6D4E] rounded-xl">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>
          <span className="text-2xl font-serif font-bold text-[#2D3128]">{applications.length}</span>
          <span className="text-[11px] text-[#5D6D4E] font-semibold block">{activeApps.length} em andamento</span>
        </div>

        <div
          onClick={() => setActiveTab('interviews')}
          className="bg-white p-5 rounded-3xl border border-[#E9E5D9] hover:border-[#8C7355] hover:shadow-md transition-all cursor-pointer space-y-2"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#7A7D75]">Entrevistas</span>
            <div className="p-2 bg-[#F5F2EA] text-[#8C7355] rounded-xl">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <span className="text-2xl font-serif font-bold text-[#2D3128]">{interviews.length}</span>
          <span className="text-[11px] text-[#8C7355] font-semibold block">1 agendada esta semana</span>
        </div>

        <div
          onClick={() => setActiveTab('payslips')}
          className="bg-white p-5 rounded-3xl border border-[#E9E5D9] hover:border-[#5D6D4E] hover:shadow-md transition-all cursor-pointer space-y-2"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#7A7D75]">Último Holerite</span>
            <div className="p-2 bg-[#E9F0E6] text-[#5D6D4E] rounded-xl">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <span className="text-xl font-serif font-bold text-[#2D3128]">
            R$ {latestPayslip?.netSalary.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </span>
          <span className="text-[11px] text-[#5D6D4E] font-semibold block">{latestPayslip?.monthYear}</span>
        </div>

        <div
          onClick={() => setActiveTab('vacations')}
          className="bg-white p-5 rounded-3xl border border-[#E9E5D9] hover:border-[#8C7355] hover:shadow-md transition-all cursor-pointer space-y-2"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#7A7D75]">Saldo de Férias</span>
            <div className="p-2 bg-[#F5F2EA] text-[#8C7355] rounded-xl">
              <Sun className="w-4 h-4" />
            </div>
          </div>
          <span className="text-2xl font-serif font-bold text-[#2D3128]">30 Dias</span>
          <span className="text-[11px] text-[#8C7355] font-semibold block">Período Aquisitivo Ok</span>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Applications Progress */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-[#E9E5D9] space-y-4">
          <div className="flex items-center justify-between border-b border-[#F8F7F2] pb-3">
            <h3 className="font-serif font-bold text-[#2D3128] text-base">Status das Candidaturas Ativas</h3>
            <button onClick={() => setActiveTab('applications')} className="text-xs font-bold text-[#5D6D4E] hover:underline">
              Ver Todas
            </button>
          </div>

          <div className="space-y-3">
            {activeApps.map(app => (
              <div key={app.id} className="p-4 bg-[#F8F7F2] rounded-2xl border border-[#E9E5D9] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-serif font-bold text-[#2D3128] text-sm">{app.jobTitle}</span>
                  <span className="px-3 py-0.5 bg-[#E9F0E6] text-[#5D6D4E] text-[11px] font-bold rounded-full border border-[#5D6D4E]/20">
                    {app.status}
                  </span>
                </div>
                <p className="text-[11px] text-[#7A7D75]">{app.companyName} • Candidatado em {app.appliedAt}</p>
                <div className="flex items-center gap-2 text-[11px] text-[#5D6D4E] font-semibold">
                  <Sparkles className="w-3.5 h-3.5" /> Aderência com IA: {app.aiMatchScore}%
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Next Interview Sidebar Card */}
        <div className="bg-[#2D3128] text-white rounded-3xl p-6 border border-[#2D3128] space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="w-5 h-5 text-[#E9F0E6]" />
              <h3 className="font-serif font-bold text-white text-base">Próxima Entrevista</h3>
            </div>

            {nextInterview ? (
              <div className="bg-[#3A3F34] p-4 rounded-2xl border border-white/10 space-y-3 text-xs">
                <div>
                  <span className="font-serif font-bold text-[#E9F0E6] block text-sm">{nextInterview.jobTitle}</span>
                  <span className="text-[#E9E5D9]">{nextInterview.interviewerName}</span>
                </div>
                <div className="text-white font-semibold bg-[#2D3128] p-2.5 rounded-xl border border-white/10">
                  📅 {nextInterview.dateTime}
                </div>
                <a
                  href={nextInterview.linkOrLocation}
                  target="_blank"
                  rel="noreferrer"
                  className="block text-center py-2 bg-[#5D6D4E] hover:bg-[#4c5b3e] text-white font-bold rounded-xl transition-colors"
                >
                  Acessar Sala Virtual
                </a>
              </div>
            ) : (
              <p className="text-xs text-[#E9E5D9]">Nenhuma entrevista agendada para os próximos dias.</p>
            )}
          </div>

          <button
            onClick={() => setActiveTab('resume')}
            className="w-full py-2.5 bg-[#3A3F34] hover:bg-[#454B3E] text-[#E9F0E6] text-xs font-bold rounded-2xl border border-white/10 transition-colors flex items-center justify-center gap-2"
          >
            <FileText className="w-4 h-4 text-[#8C7355]" /> Otimizar Currículo com IA
          </button>
        </div>
      </div>
    </div>
  );
};
