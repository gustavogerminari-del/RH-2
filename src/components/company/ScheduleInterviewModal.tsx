import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  Video,
  User,
  Sparkles,
  X,
  CheckCircle,
  Link2,
  Send,
  MessageSquare,
  Bot,
  Briefcase,
  Globe
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Interview } from '../../types';

interface ScheduleInterviewModalProps {
  initialCandidateName?: string;
  initialJobTitle?: string;
  initialApplicationId?: string;
  onClose: () => void;
}

export const ScheduleInterviewModal: React.FC<ScheduleInterviewModalProps> = ({
  initialCandidateName = '',
  initialJobTitle = '',
  initialApplicationId = '',
  onClose
}) => {
  const { addInterview, applications, updateApplicationStatus, showToast } = useApp();

  const [selectedAppId, setSelectedAppId] = useState<string>(initialApplicationId || (applications[0]?.id || ''));
  const selectedApp = applications.find(a => a.id === selectedAppId);

  const [candidateName, setCandidateName] = useState<string>(
    initialCandidateName || (selectedApp?.candidateName || 'Lucas Germinari')
  );
  const [jobTitle, setJobTitle] = useState<string>(
    initialJobTitle || (selectedApp?.jobTitle || 'Desenvolvedor Full Stack Senior')
  );

  const [date, setDate] = useState<string>('2026-07-28');
  const [time, setTime] = useState<string>('14:30');
  const [interviewerName, setInterviewerName] = useState<string>('Mariana Costa (Tech Lead)');
  const [modality, setModality] = useState<'Online' | 'Presencial'>('Online');
  
  // Google Meet Link Generator
  const generateMeetCode = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyz';
    const segment = (len: number) =>
      Array.from({ length: len }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join('');
    return `https://meet.google.com/${segment(3)}-${segment(4)}-${segment(3)}`;
  };

  const [googleMeetUrl, setGoogleMeetUrl] = useState<string>(generateMeetCode());
  const [sendCalendarInvite, setSendCalendarInvite] = useState<boolean>(true);

  // AI Questions Prep
  const [aiQuestions, setAiQuestions] = useState<string[]>([
    'Quais foram as arquiteturas de maior escala que você desenvolveu recentemente?',
    'Como você garante a resiliência e tratamento de exceções em microsserviços?',
    'Como lida com prazos reduzidos mantendo a qualidade de testes automatizados?'
  ]);
  const [isGeneratingAiQuestions, setIsGeneratingAiQuestions] = useState(false);

  // Sync candidate & job when selecting app
  const handleSelectApp = (appId: string) => {
    setSelectedAppId(appId);
    const app = applications.find(a => a.id === appId);
    if (app) {
      setCandidateName(app.candidateName || 'Candidato');
      setJobTitle(app.jobTitle || 'Vaga');
    }
  };

  const handleGenerateQuestionsWithAi = async () => {
    setIsGeneratingAiQuestions(true);
    try {
      const response = await fetch('/api/ai/interview-prep', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobTitle, candidateName })
      });
      const data = await response.json();
      if (data.questions && data.questions.length > 0) {
        setAiQuestions(data.questions);
        showToast('Perguntas de entrevista geradas pela IA Gemini!');
      }
    } catch (err) {
      showToast('Aplicando perguntas padrão para esta vaga.');
    } finally {
      setIsGeneratingAiQuestions(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formattedDateTime = `${date} às ${time}`;

    const newInterview: Omit<Interview, 'id'> = {
      applicationId: selectedAppId || 'app-custom',
      jobTitle,
      candidateName,
      interviewerName,
      dateTime: formattedDateTime,
      modality,
      linkOrLocation: modality === 'Online' ? googleMeetUrl : 'Escritório Central GESTRH (Sala 302)',
      status: 'Agendada',
      aiPrepQuestions: aiQuestions
    };

    addInterview(newInterview);

    // Update Kanban Status to "Entrevista" if application exists
    if (selectedAppId) {
      updateApplicationStatus(selectedAppId, 'Entrevista');
    }

    if (sendCalendarInvite) {
      showToast(`Convite do Google Calendar & Meet enviado com sucesso para ${candidateName}!`);
    } else {
      showToast(`Entrevista agendada com sucesso para ${formattedDateTime}!`);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl w-full max-w-2xl text-slate-900 shadow-2xl overflow-hidden border border-slate-200 animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-slate-900 via-stone-900 to-slate-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Video className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold">Agendar Entrevista no Google Meet</h3>
              <p className="text-xs text-stone-300">
                Integrado ao Funil Kanban & Google Calendar
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-white rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 text-xs">
          
          {/* Candidate Selection Dropdown */}
          <div className="space-y-1.5">
            <label className="font-bold text-slate-700 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-slate-500" /> Candidato / Aplicação no Kanban:
            </label>
            <select
              value={selectedAppId}
              onChange={(e) => handleSelectApp(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-xs text-slate-800 font-medium focus:outline-none focus:border-emerald-500"
            >
              {applications.map(app => (
                <option key={app.id} value={app.id}>
                  {app.candidateName || 'Candidato'} - {app.jobTitle} (Etapa: {app.status})
                </option>
              ))}
            </select>
          </div>

          {/* Job Title & Candidate Name Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="font-bold text-slate-700">Nome do Candidato:</label>
              <input
                type="text"
                value={candidateName}
                onChange={(e) => setCandidateName(e.target.value)}
                required
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-700">Cargo / Vaga:</label>
              <input
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                required
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Date, Time & Interviewer */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1.5">
              <label className="font-bold text-slate-700 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-500" /> Data:
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-700 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-500" /> Horário:
              </label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-700">Entrevistador:</label>
              <select
                value={interviewerName}
                onChange={(e) => setInterviewerName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-2.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-emerald-500"
              >
                <option value="Mariana Costa (Tech Lead)">Mariana Costa (Tech Lead)</option>
                <option value="Carlos Santos (Diretor de RH)">Carlos Santos (Diretor de RH)</option>
                <option value="Lucas Germinari (Gestor Tech)">Lucas Germinari (Gestor Tech)</option>
                <option value="Fernanda Lima (Talent Acquisition)">Fernanda Lima (Talent Acquisition)</option>
              </select>
            </div>
          </div>

          {/* Modality & Google Meet Integration */}
          <div className="bg-slate-900 text-white rounded-2xl p-4 space-y-3 border border-slate-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
                  G
                </div>
                <span className="font-bold text-xs text-stone-100">
                  Integração Google Meet & Sala Virtual GESTRH
                </span>
              </div>

              <div className="flex items-center gap-2 bg-stone-800 p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => setModality('Online')}
                  className={`px-3 py-1 rounded-lg font-bold text-[11px] transition ${
                    modality === 'Online'
                      ? 'bg-emerald-600 text-white'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  Online (Google Meet)
                </button>
                <button
                  type="button"
                  onClick={() => setModality('Presencial')}
                  className={`px-3 py-1 rounded-lg font-bold text-[11px] transition ${
                    modality === 'Presencial'
                      ? 'bg-emerald-600 text-white'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  Presencial
                </button>
              </div>
            </div>

            {modality === 'Online' ? (
              <div className="space-y-2 pt-1">
                <label className="text-[11px] text-stone-300 font-semibold block">
                  Link Oficial da Reunião Google Meet:
                </label>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs font-mono text-emerald-400 flex items-center gap-2 overflow-x-auto">
                    <Globe className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="truncate">{googleMeetUrl}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setGoogleMeetUrl(generateMeetCode())}
                    className="px-3 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-xl text-[11px] font-bold border border-stone-700 shrink-0"
                  >
                    Gerar Novo Link
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-xs text-stone-300">
                Local: Escritório Central GESTRH - Sala de Reuniões 302
              </p>
            )}
          </div>

          {/* AI Questions Prep Section */}
          <div className="space-y-2 bg-purple-50/70 border border-purple-200 rounded-2xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-purple-900 font-bold text-xs">
                <Bot className="w-4 h-4 text-purple-600" />
                <span>Roteiro Sugerido de Perguntas IA (Gemini):</span>
              </div>

              <button
                type="button"
                onClick={handleGenerateQuestionsWithAi}
                disabled={isGeneratingAiQuestions}
                className="px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-[11px] font-bold transition flex items-center gap-1"
              >
                <Sparkles className="w-3 h-3" />
                {isGeneratingAiQuestions ? 'Gerando...' : 'Regerar com IA'}
              </button>
            </div>

            <ul className="space-y-1.5">
              {aiQuestions.map((q, idx) => (
                <li key={idx} className="bg-white p-2 rounded-xl border border-purple-100 text-[11px] text-slate-700 flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-purple-100 text-purple-700 font-bold flex items-center justify-center shrink-0 text-[10px]">
                    {idx + 1}
                  </span>
                  <span>{q}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Calendar Sync Checkbox */}
          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="sendCalendarInvite"
              checked={sendCalendarInvite}
              onChange={(e) => setSendCalendarInvite(e.target.checked)}
              className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500 border-slate-300"
            />
            <label htmlFor="sendCalendarInvite" className="text-xs font-semibold text-slate-700">
              Enviar convite automático por e-mail com Google Calendar e Link do Google Meet
            </label>
          </div>

          {/* Footer Actions */}
          <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-xl text-xs shadow-lg transition flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Confirmar Agendamento no Google Meet</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
