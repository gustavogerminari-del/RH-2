import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ShareJobModal } from './ShareJobModal';
import { X, MapPin, Building2, Briefcase, DollarSign, CheckCircle, Sparkles, Send, Share2 } from 'lucide-react';

export const JobDetailsModal: React.FC = () => {
  const { selectedJob, setSelectedJob, applyToJob, showToast, candidate } = useApp();
  const [matchResult, setMatchResult] = useState<any>(null);
  const [loadingAi, setLoadingAi] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  if (!selectedJob) return null;

  const handleApply = () => {
    applyToJob(selectedJob.id);
    setSelectedJob(null);
  };

  const handleCheckAiMatch = async () => {
    setLoadingAi(true);
    try {
      const res = await fetch('/api/ai/match-candidate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobDescription: `${selectedJob.title} - Requisitos: ${selectedJob.requirements.join(', ')}`,
          candidateResume: `${candidate.name} - ${candidate.title}. ${candidate.summary}. Habilidades: ${candidate.skills.join(', ')}`
        })
      });
      const data = await res.json();
      setMatchResult(data);
    } catch (err) {
      showToast('Erro ao consultar IA Gemini');
    } finally {
      setLoadingAi(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-2xl w-full p-6 text-slate-800 animate-fade-in relative max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-200 pb-4 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full border border-blue-200">
                {selectedJob.department}
              </span>
              <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full border border-emerald-200">
                {selectedJob.modality}
              </span>
              <span className="px-2.5 py-0.5 bg-slate-100 text-slate-700 text-xs font-semibold rounded-full">
                {selectedJob.contractType}
              </span>
            </div>
            <h2 className="text-xl font-extrabold text-slate-900">{selectedJob.title}</h2>
            <div className="flex items-center gap-4 text-xs text-slate-500 mt-1">
              <span className="flex items-center gap-1 font-medium text-slate-700">
                <Building2 className="w-3.5 h-3.5 text-blue-600" /> {selectedJob.companyName}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" /> {selectedJob.location}
              </span>
              <span className="flex items-center gap-1 font-semibold text-emerald-600">
                <DollarSign className="w-3.5 h-3.5" /> {selectedJob.salaryRange}
              </span>
            </div>
          </div>
          <button
            onClick={() => { setSelectedJob(null); setMatchResult(null); }}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* AI Compatibility Match Card */}
        <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border border-blue-200/80 rounded-2xl p-4 mb-5">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-600 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-blue-900">
                Análise de Aderência com IA Gemini
              </span>
            </div>
            {!matchResult && (
              <button
                onClick={handleCheckAiMatch}
                disabled={loadingAi}
                className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors disabled:opacity-50"
              >
                {loadingAi ? 'Analisando...' : 'Simular Match IA'}
              </button>
            )}
          </div>

          {matchResult ? (
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-3">
                <div className="text-2xl font-black text-blue-600 bg-white px-3 py-1 rounded-xl shadow-xs border border-blue-100">
                  {matchResult.score}%
                </div>
                <div>
                  <p className="font-semibold text-slate-800">{matchResult.recommendation}</p>
                  <p className="text-slate-600">{matchResult.summary}</p>
                </div>
              </div>
              {matchResult.strengths && (
                <div className="mt-2">
                  <span className="font-bold text-slate-700 block mb-1">Pontos Fortes Identificados:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {matchResult.strengths.map((s: string, idx: number) => (
                      <span key={idx} className="bg-white/80 border border-emerald-200 text-emerald-800 px-2 py-0.5 rounded-md">
                        ✓ {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <p className="text-xs text-slate-600">
              Clique em "Simular Match IA" para analisar seu currículo em tempo real contra esta vaga utilizando a IA do Gemini.
            </p>
          )}
        </div>

        {/* Job Description */}
        <div className="space-y-4 text-xs text-slate-700 mb-6">
          <div>
            <h4 className="font-bold text-slate-900 text-sm mb-1">Descrição do Cargo</h4>
            <p className="leading-relaxed text-slate-600">{selectedJob.description}</p>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 text-sm mb-2">Requisitos e Qualificações</h4>
            <ul className="space-y-1.5">
              {selectedJob.requirements.map((req, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 text-sm mb-2">Benefícios Inclusos</h4>
            <div className="flex flex-wrap gap-2">
              {selectedJob.benefits.map((b, i) => (
                <span key={i} className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg font-medium">
                  • {b}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-between border-t border-slate-200 pt-4">
          <span className="text-xs text-slate-500">
            {selectedJob.applicationsCount} candidatos já inscritos
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowShareModal(true)}
              className="px-3.5 py-2 border border-blue-200 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Share2 className="w-4 h-4" /> Divulgar Vaga
            </button>
            <button
              onClick={() => { setSelectedJob(null); setMatchResult(null); }}
              className="px-4 py-2 border border-slate-300 hover:bg-slate-50 rounded-xl text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
            >
              Fechar
            </button>
            <button
              onClick={handleApply}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-md transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4" /> Candidatar-se Agora
            </button>
          </div>
        </div>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <ShareJobModal job={selectedJob} onClose={() => setShowShareModal(false)} />
      )}
    </div>
  );
};
