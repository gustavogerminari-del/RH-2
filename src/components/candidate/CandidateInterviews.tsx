import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Calendar, Video, Radio, Sparkles, MessageSquare, CheckCircle, Award, Globe, ExternalLink } from 'lucide-react';
import { SmartInterviewRoomModal } from '../common/SmartInterviewRoomModal';
import { Interview } from '../../types';

export const CandidateInterviews: React.FC = () => {
  const { interviews, showToast } = useApp();
  const [prepQuestions, setPrepQuestions] = useState<string[]>([]);
  const [loadingQuestions, setLoadingQuestions] = useState(false);
  const [selectedInterviewForRoom, setSelectedInterviewForRoom] = useState<Interview | null>(null);

  const handleGeneratePrep = async (jobTitle: string, candidateName: string) => {
    setLoadingQuestions(true);
    try {
      const res = await fetch('/api/ai/interview-prep', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobTitle, candidateName })
      });
      const data = await res.json();
      setPrepQuestions(data.questions || []);
      showToast('Perguntas preparatórias geradas pela IA Gemini!');
    } catch (err) {
      showToast('Erro ao gerar perguntas de preparação');
    } finally {
      setLoadingQuestions(false);
    }
  };

  return (
    <div className="space-y-6 py-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Entrevistas Agendadas & Sala Virtual</h1>
        <p className="text-xs text-slate-500 mt-1">
          Acesse a sala virtual de entrevista ao vivo com teste de mídia, gravação e simulador preparatório de IA.
        </p>
      </div>

      <div className="space-y-4">
        {interviews.map(int => (
          <div key={int.id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 text-[11px] font-bold rounded-full border border-emerald-200">
                  {int.modality} - {int.status}
                </span>
                <h3 className="font-bold text-slate-900 text-base mt-1">{int.jobTitle}</h3>
                <p className="text-xs text-slate-500">Entrevistador: {int.interviewerName}</p>
              </div>

              <div className="text-right">
                <span className="text-xs font-bold text-slate-800 block">📅 {int.dateTime}</span>
                <span className="text-[11px] text-emerald-600 font-semibold">{int.linkOrLocation}</span>
              </div>
            </div>

            {/* Virtual Interview Action Banner */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-stone-900 text-white p-4 rounded-xl border border-stone-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <Video className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-100 flex items-center gap-1.5">
                    <span>Google Meet & Sala Virtual GESTRH</span>
                  </h4>
                  <p className="text-[11px] text-stone-400">
                    Acesse via Google Meet ou entre na Sala Virtual com gravação e copiloto de IA.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={int.linkOrLocation.startsWith('http') ? int.linkOrLocation : 'https://meet.google.com/gestrh-interview-live'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 bg-stone-800 hover:bg-stone-700 border border-stone-700 text-emerald-400 font-bold text-xs rounded-xl flex items-center gap-1.5 transition"
                >
                  <Globe className="w-4 h-4" />
                  <span>Google Meet</span>
                  <ExternalLink className="w-3 h-3 opacity-70" />
                </a>

                <button
                  onClick={() => setSelectedInterviewForRoom(int)}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-md"
                >
                  <Radio className="w-4 h-4 animate-pulse" />
                  {int.status === 'Concluída' ? 'Ver Gravação' : 'Sala Virtual'}
                </button>
              </div>
            </div>

            {/* Candidate AI Feedback Card if available */}
            {int.aiFeedback && (
              <div className="bg-emerald-50/80 border border-emerald-200 rounded-xl p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-emerald-700" />
                    <span className="text-xs font-bold text-emerald-900 uppercase">
                      Feedback do Recrutador & IA
                    </span>
                  </div>
                  <span className="px-2.5 py-0.5 bg-emerald-600 text-white font-bold text-[10px] rounded-full">
                    Score: {int.aiFeedback.overallScore}%
                  </span>
                </div>
                <p className="text-xs text-emerald-900 italic font-medium">
                  "{int.aiFeedback.candidateFeedback}"
                </p>
              </div>
            )}

            {/* AI Preparation Box */}
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-600" />
                  <span className="text-xs font-bold text-purple-900 uppercase tracking-wider">
                    Preparação Inteligente com IA Gemini
                  </span>
                </div>
                <button
                  onClick={() => handleGeneratePrep(int.jobTitle, int.candidateName)}
                  disabled={loadingQuestions}
                  className="px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-bold transition-colors shadow-xs"
                >
                  {loadingQuestions ? 'Gerando...' : 'Gerar Simulador de Perguntas'}
                </button>
              </div>

              {(prepQuestions.length > 0 || (int.aiPrepQuestions && int.aiPrepQuestions.length > 0)) && (
                <div className="space-y-2 pt-1 text-xs">
                  <span className="font-semibold text-slate-700 block">Perguntas Prováveis para Treino:</span>
                  <ul className="space-y-1.5 text-slate-600">
                    {(prepQuestions.length > 0 ? prepQuestions : int.aiPrepQuestions || []).map((q, idx) => (
                      <li key={idx} className="bg-white p-2.5 rounded-lg border border-purple-100 flex items-start gap-2">
                        <MessageSquare className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />
                        <span>{q}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Smart Interview Room Modal */}
      {selectedInterviewForRoom && (
        <SmartInterviewRoomModal
          interview={selectedInterviewForRoom}
          onClose={() => setSelectedInterviewForRoom(null)}
          userType="candidate"
        />
      )}
    </div>
  );
};
