import React from 'react';
import { useApp } from '../../context/AppContext';
import { Briefcase, Building2, Sparkles, Calendar, Clock, CheckCircle2, XCircle } from 'lucide-react';

export const CandidateApplications: React.FC = () => {
  const { applications, setActiveTab } = useApp();

  return (
    <div className="space-y-6 py-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Minhas Candidaturas</h1>
        <p className="text-xs text-slate-500 mt-1">Acompanhe em tempo real o status dos processos seletivos inscritos</p>
      </div>

      <div className="space-y-4">
        {applications.length > 0 ? (
          applications.map(app => (
            <div key={app.id} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div>
                  <h3 className="font-bold text-slate-900 text-base">{app.jobTitle}</h3>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                    <Building2 className="w-3.5 h-3.5 text-blue-600" />
                    <span className="font-semibold text-slate-700">{app.companyName}</span>
                    <span>• Inscrito em {app.appliedAt}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-full text-xs font-bold">
                    Etapa: {app.status}
                  </span>
                </div>
              </div>

              {/* AI Score Feedback Box */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-3.5 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div className="text-xs space-y-1">
                  <span className="font-bold text-blue-900 block">
                    Score de Aderência com IA: {app.aiMatchScore}%
                  </span>
                  <p className="text-slate-600 leading-relaxed">{app.aiFeedback}</p>
                </div>
              </div>

              {app.notes && (
                <p className="text-xs text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  <span className="font-bold text-slate-700">Nota do RH: </span> {app.notes}
                </p>
              )}
            </div>
          ))
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-3">
            <Briefcase className="w-10 h-10 text-slate-400 mx-auto" />
            <p className="text-xs text-slate-500">Você ainda não se candidatou a nenhuma vaga.</p>
            <button
              onClick={() => setActiveTab('jobs')}
              className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold"
            >
              Explorar Vagas
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
