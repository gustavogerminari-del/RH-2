import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  Calendar,
  CheckCircle2,
  Video,
  Radio,
  Award,
  Play,
  Bot,
  ArrowRight,
  FileText,
  Globe,
  ExternalLink,
  Plus
} from 'lucide-react';
import { SmartInterviewRoomModal } from '../common/SmartInterviewRoomModal';
import { ScheduleInterviewModal } from './ScheduleInterviewModal';
import { Interview } from '../../types';

export const CompanyRecruitment: React.FC = () => {
  const { applications, updateApplicationStatus, interviews } = useApp();
  const [selectedInterviewForRoom, setSelectedInterviewForRoom] = useState<Interview | null>(null);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [scheduleTargetApp, setScheduleTargetApp] = useState<any | null>(null);

  const stages = ['Inscrito', 'Triagem', 'Entrevista', 'Proposta', 'Contratado'];

  const handleMoveStage = (appId: string, newStatus: any) => {
    updateApplicationStatus(appId, newStatus);
  };

  const handleOpenScheduleModal = (app?: any) => {
    setScheduleTargetApp(app || null);
    setIsScheduleModalOpen(true);
  };

  return (
    <div className="space-y-8 py-6">
      
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Recrutamento, Seleção & Google Meet Inteligente</h1>
          <p className="text-xs text-slate-500 mt-1">
            Funil Kanban de candidatos com agendamento direto de reuniões no Google Meet e avaliação com IA Gemini.
          </p>
        </div>

        <button
          onClick={() => handleOpenScheduleModal()}
          className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold px-4 py-2.5 rounded-xl text-xs shadow-lg transition flex items-center gap-2"
        >
          <Video className="w-4 h-4" />
          <span>+ Agendar Entrevista no Google Meet</span>
        </button>
      </div>

      {/* Online Video Interview Hub Cards */}
      <div className="bg-gradient-to-r from-slate-900 via-stone-900 to-slate-950 rounded-2xl p-6 text-white border border-stone-800 shadow-xl">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Video className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Painel de Entrevistas no Google Meet & Sala IA</h2>
              <p className="text-xs text-slate-400">
                Acesse o link do Google Meet ou entre na Sala Virtual com gravação e síntese de parecer técnico por IA.
              </p>
            </div>
          </div>

          <button
            onClick={() => handleOpenScheduleModal()}
            className="bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition"
          >
            <Plus className="w-4 h-4 text-emerald-400" />
            <span>Novo Agendamento</span>
          </button>
        </div>

        {/* Interviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {interviews.map(interview => (
            <div
              key={interview.id}
              className="bg-stone-900/80 border border-stone-800 rounded-xl p-4 flex flex-col justify-between space-y-3 hover:border-emerald-500/50 transition"
            >
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-emerald-400">{interview.jobTitle}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    interview.status === 'Concluída'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  }`}>
                    {interview.status}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-stone-100">{interview.candidateName}</h3>
                <p className="text-xs text-stone-400 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" /> {interview.dateTime}
                </p>
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-mono pt-1">
                  <Globe className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{interview.linkOrLocation}</span>
                </div>
              </div>

              {/* AI Feedback Badge if available */}
              {interview.aiFeedback && (
                <div className="bg-stone-950 border border-stone-800 rounded-lg p-2.5 text-xs text-stone-300 space-y-1">
                  <div className="flex items-center justify-between font-bold text-amber-400">
                    <span className="flex items-center gap-1"><Sparkles className="w-3.5 h-3.5" /> Score IA: {interview.aiFeedback.overallScore}%</span>
                    <span className="text-[10px] bg-amber-500/10 px-2 py-0.5 rounded text-amber-300">{interview.aiFeedback.verdict}</span>
                  </div>
                  <p className="text-[11px] text-stone-400 line-clamp-2">
                    "{interview.aiFeedback.summary}"
                  </p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-2 pt-1">
                <a
                  href={interview.linkOrLocation.startsWith('http') ? interview.linkOrLocation : 'https://meet.google.com/gestrh-interview-live'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2 px-2.5 bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 rounded-lg font-bold text-[11px] flex items-center justify-center gap-1 transition"
                >
                  <Globe className="w-3.5 h-3.5 text-emerald-400" /> Google Meet
                </a>

                <button
                  onClick={() => setSelectedInterviewForRoom(interview)}
                  className="py-2 px-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold text-[11px] flex items-center justify-center gap-1 shadow-md transition"
                >
                  <Radio className="w-3.5 h-3.5 animate-pulse" />
                  {interview.status === 'Concluída' ? 'Ver Parecer' : 'Sala Virtual'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Kanban Board Container */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Funil Kanban de Candidatos</h2>
            <p className="text-xs text-slate-500">
              Arraste ou avance os candidatos e agende entrevistas no Google Meet diretamente em cada card.
            </p>
          </div>

          <button
            onClick={() => handleOpenScheduleModal()}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
          >
            <Plus className="w-4 h-4" /> Agendar no Kanban
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3 overflow-x-auto pb-4">
          {stages.map(stage => {
            const stageApps = applications.filter(a => a.status === stage);
            return (
              <div key={stage} className="bg-slate-100/80 rounded-2xl p-3 space-y-3 min-w-[210px] border border-slate-200">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <span className="font-bold text-slate-800 text-xs truncate">{stage}</span>
                  <span className="px-2 py-0.5 bg-slate-200 text-slate-700 rounded-full text-[10px] font-bold">
                    {stageApps.length}
                  </span>
                </div>

                <div className="space-y-2">
                  {stageApps.map(app => {
                    const appInterview = interviews.find(i => i.applicationId === app.id);

                    return (
                      <div key={app.id} className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs space-y-2 text-xs">
                        <span className="font-bold text-slate-900 block">{app.candidateName || 'Lucas Germinari'}</span>
                        <span className="text-[11px] text-slate-500 block truncate">{app.jobTitle}</span>

                        <div className="flex items-center gap-1 text-[10px] text-purple-700 font-bold bg-purple-50 p-1 rounded">
                          <Sparkles className="w-3 h-3 text-purple-600" /> Match IA: {app.aiMatchScore}%
                        </div>

                        {/* Scheduled Badge */}
                        {appInterview && (
                          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg p-1.5 text-[10px] font-medium flex items-center justify-between">
                            <span className="truncate">📅 {appInterview.dateTime}</span>
                            <span className="font-bold text-emerald-700">Meet</span>
                          </div>
                        )}

                        <div className="flex flex-col gap-1.5 pt-1">
                          <button
                            onClick={() => handleOpenScheduleModal(app)}
                            className="w-full py-1.5 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 font-bold rounded text-[10px] flex items-center justify-center gap-1 border border-emerald-200"
                          >
                            <Video className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Agendar Google Meet</span>
                          </button>
                          
                          {stage !== 'Contratado' && (
                            <button
                              onClick={() => handleMoveStage(app.id, 'Entrevista')}
                              className="w-full py-1 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded text-[10px] transition"
                            >
                              Avançar no Kanban
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Smart Interview Room Modal */}
      {selectedInterviewForRoom && (
        <SmartInterviewRoomModal
          interview={selectedInterviewForRoom}
          onClose={() => setSelectedInterviewForRoom(null)}
          userType="company"
        />
      )}

      {/* Schedule Interview Modal */}
      {isScheduleModalOpen && (
        <ScheduleInterviewModal
          initialCandidateName={scheduleTargetApp?.candidateName}
          initialJobTitle={scheduleTargetApp?.jobTitle}
          initialApplicationId={scheduleTargetApp?.id}
          onClose={() => setIsScheduleModalOpen(false)}
        />
      )}

    </div>
  );
};
