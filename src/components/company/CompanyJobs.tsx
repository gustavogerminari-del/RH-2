import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Job } from '../../types';
import { ShareJobModal } from '../common/ShareJobModal';
import { Briefcase, Plus, Sparkles, MapPin, DollarSign, RefreshCw, CheckCircle2, Share2, Eye } from 'lucide-react';

export const CompanyJobs: React.FC = () => {
  const { jobs, createJob, setSelectedJob, showToast } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [sharingJob, setSharingJob] = useState<Job | null>(null);

  // Job Form State
  const [title, setTitle] = useState('');
  const [department, setDepartment] = useState('Tecnologia');
  const [location, setLocation] = useState('Remoto / São Paulo');
  const [type, setType] = useState('CLT Full-time');
  const [salaryRange, setSalaryRange] = useState('R$ 8.000 - R$ 12.000');
  const [description, setDescription] = useState('');
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);

  const handleCreateJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) {
      showToast('Por favor, preencha o título e a descrição da vaga.');
      return;
    }

    createJob({
      companyName: 'TechInova Software LTDA',
      title,
      department,
      location,
      type,
      salaryRange,
      description,
      requirements: ['TypeScript', 'React', 'Node.js', 'Boa comunicação'],
      benefits: ['Vale Refeição R$ 1.200', 'Plano de Saúde Bradesco', 'Auxílio Home Office'],
      status: 'Aberta'
    });

    setShowModal(false);
    setTitle('');
    setDescription('');
  };

  const handleGenerateDescriptionWithAi = async () => {
    if (!title) {
      showToast('Digite o título da vaga primeiro para a IA gerar a descrição.');
      return;
    }

    setIsGeneratingAi(true);
    try {
      const res = await fetch('/api/ai/generate-job', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, department })
      });
      const data = await res.json();
      if (data.description) {
        setDescription(data.description);
      }
      showToast('Descrição de vaga gerada automaticamente pelo Gemini!');
    } catch (err) {
      showToast('Erro ao gerar descrição com IA');
    } finally {
      setIsGeneratingAi(false);
    }
  };

  return (
    <div className="space-y-6 py-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Gestão de Vagas & Recrutamento</h1>
          <p className="text-xs text-slate-500 mt-1">Crie e publique oportunidades com descrição gerada por Inteligência Artificial</p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-xs transition-all"
        >
          <Plus className="w-4 h-4" /> Criar Nova Vaga com IA
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {jobs.map(job => (
          <div key={job.id} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="px-2.5 py-0.5 bg-blue-50 text-blue-700 font-bold text-[11px] rounded-md border border-blue-200">
                  {job.department}
                </span>
                <h3 className="font-bold text-slate-900 text-base mt-1">{job.title}</h3>
                <p className="text-xs text-slate-500">{job.location} • {job.type}</p>
              </div>

              <span className="px-3 py-1 bg-emerald-50 text-emerald-700 font-bold border border-emerald-200 rounded-full text-xs">
                {job.status}
              </span>
            </div>

            <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">{job.description}</p>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
              <span className="font-bold text-slate-700">{job.candidatesCount} Candidatos inscritos</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedJob(job)}
                  className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" /> Detalhes
                </button>
                <button
                  onClick={() => setSharingJob(job)}
                  className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold rounded-xl text-xs border border-blue-200 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" /> Divulgar (Banner & Link)
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Job Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 space-y-4 border border-slate-200 shadow-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-bold text-slate-900">Publicar Nova Oportunidade</h2>

            <form onSubmit={handleCreateJob} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Título da Vaga *</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Arquiteto de Software Cloud"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Departamento</label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-bold"
                  >
                    <option value="Tecnologia">Tecnologia</option>
                    <option value="Design">Design & Produto</option>
                    <option value="Recursos Humanos">Recursos Humanos</option>
                    <option value="Financeiro">Financeiro</option>
                    <option value="Comercial">Comercial</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Faixa Salarial</label>
                  <input
                    type="text"
                    value={salaryRange}
                    onChange={(e) => setSalaryRange(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="block font-bold text-slate-700">Descrição e Atribuições *</label>
                  <button
                    type="button"
                    onClick={handleGenerateDescriptionWithAi}
                    disabled={isGeneratingAi}
                    className="text-purple-600 font-bold text-xs hover:underline flex items-center gap-1"
                  >
                    {isGeneratingAi ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                    Gerar Descrição com IA Gemini
                  </button>
                </div>
                <textarea
                  rows={5}
                  required
                  placeholder="Descreva as principais responsabilidades da vaga..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3"
                />
              </div>

              <div className="flex gap-2 pt-2 justify-end">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 font-bold rounded-xl"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700"
                >
                  Publicar Vaga
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Share Job Modal */}
      <ShareJobModal job={sharingJob} onClose={() => setSharingJob(null)} />
    </div>
  );
};
