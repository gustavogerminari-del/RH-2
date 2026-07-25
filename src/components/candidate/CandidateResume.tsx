import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, FileText, Plus, Trash2, Edit3, CheckCircle2, Upload, RefreshCw } from 'lucide-react';

export const CandidateResume: React.FC = () => {
  const { candidate, updateCandidateCv, showToast } = useApp();
  const [summary, setSummary] = useState(candidate.summary);
  const [newSkill, setNewSkill] = useState('');
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<any>(null);

  const handleSaveSummary = () => {
    updateCandidateCv({ summary });
  };

  const handleAddSkill = () => {
    if (!newSkill.trim()) return;
    if (candidate.skills.includes(newSkill.trim())) return;
    updateCandidateCv({ skills: [...candidate.skills, newSkill.trim()] });
    setNewSkill('');
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    updateCandidateCv({ skills: candidate.skills.filter(s => s !== skillToRemove) });
  };

  const handleOptimizeWithAi = async () => {
    setIsOptimizing(true);
    try {
      const res = await fetch('/api/ai/optimize-cv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentSummary: summary,
          skills: candidate.skills
        })
      });
      const data = await res.json();
      setAiSuggestions(data);
      if (data.optimizedSummary) {
        setSummary(data.optimizedSummary);
        updateCandidateCv({ summary: data.optimizedSummary });
      }
      showToast('Currículo otimizado com sucesso pela IA Gemini!');
    } catch (err) {
      showToast('Erro ao otimizar currículo via IA');
    } finally {
      setIsOptimizing(false);
    }
  };

  return (
    <div className="space-y-6 py-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-[#2D3128]">Currículo Inteligente com IA</h1>
          <p className="text-xs text-[#7A7D75] mt-1">
            Mantenha seu perfil atualizado e otimizado automaticamente para triagem de recrutadores
          </p>
        </div>
        <button
          onClick={handleOptimizeWithAi}
          disabled={isOptimizing}
          className="px-5 py-2.5 bg-[#8C7355] hover:bg-[#786146] text-white font-bold rounded-2xl text-xs flex items-center gap-2 shadow-xs transition-all disabled:opacity-50"
        >
          {isOptimizing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
          Otimizar Perfil com Gemini AI
        </button>
      </div>

      {/* AI Suggestion Alert */}
      {aiSuggestions && (
        <div className="bg-[#E9F0E6] border border-[#5D6D4E]/30 rounded-2xl p-4 text-xs space-y-2 animate-fade-in">
          <div className="flex items-center gap-2 font-bold text-[#5D6D4E]">
            <Sparkles className="w-4 h-4 text-[#5D6D4E]" />
            Sugestão de Habilidades Recomendadas para seu Perfil:
          </div>
          <div className="flex flex-wrap gap-1.5">
            {aiSuggestions.suggestedSkills?.map((s: string, idx: number) => (
              <button
                key={idx}
                onClick={() => {
                  if (!candidate.skills.includes(s)) {
                    updateCandidateCv({ skills: [...candidate.skills, s] });
                  }
                }}
                className="bg-white hover:bg-[#F8F7F2] border border-[#E9E5D9] text-[#2D3128] font-semibold px-2.5 py-1 rounded-xl transition-colors flex items-center gap-1"
              >
                <Plus className="w-3 h-3 text-[#5D6D4E]" /> {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Resume Card */}
      <div className="bg-white rounded-3xl border border-[#E9E5D9] p-8 space-y-6 shadow-xs">
        {/* Header Metadata */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#F8F7F2] pb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#5D6D4E] text-white font-serif font-bold text-2xl flex items-center justify-center shadow-xs">
              {candidate.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-xl font-serif font-bold text-[#2D3128]">{candidate.name}</h2>
              <p className="text-xs text-[#5D6D4E] font-bold">{candidate.title}</p>
              <p className="text-xs text-[#7A7D75] mt-0.5">{candidate.email} • {candidate.phone} • {candidate.location}</p>
            </div>
          </div>
          <div className="border border-[#E9E5D9] p-3.5 rounded-2xl bg-[#F8F7F2] text-center text-xs">
            <span className="text-[#7A7D75] block font-medium">Experiência Total</span>
            <span className="text-sm font-bold text-[#2D3128]">{candidate.experienceYears} Anos de Carreira</span>
          </div>
        </div>

        {/* Professional Summary Section */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-serif font-bold text-[#2D3128] text-base">Resumo Profissional Executivo</h3>
            <button
              onClick={handleSaveSummary}
              className="text-xs font-bold text-[#5D6D4E] hover:underline flex items-center gap-1"
            >
              <Edit3 className="w-3.5 h-3.5" /> Salvar Resumo
            </button>
          </div>
          <textarea
            rows={4}
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            className="w-full bg-[#F8F7F2] border border-[#E9E5D9] rounded-2xl p-3.5 text-xs text-[#2D3128] focus:outline-none focus:border-[#5D6D4E] leading-relaxed font-medium"
          />
        </div>

        {/* Skills Section */}
        <div className="space-y-3">
          <h3 className="font-serif font-bold text-[#2D3128] text-base">Competências Técnicas & Habilidades</h3>
          <div className="flex flex-wrap gap-2">
            {candidate.skills.map((skill, idx) => (
              <span
                key={idx}
                className="px-3.5 py-1 bg-[#F8F7F2] border border-[#E9E5D9] text-[#2D3128] rounded-full text-xs font-semibold flex items-center gap-1.5"
              >
                {skill}
                <button
                  onClick={() => handleRemoveSkill(skill)}
                  className="text-[#7A7D75] hover:text-rose-600 transition-colors"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2 max-w-md pt-1">
            <input
              type="text"
              placeholder="Adicionar nova habilidade..."
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddSkill()}
              className="bg-[#F8F7F2] border border-[#E9E5D9] rounded-2xl px-3.5 py-2 text-xs text-[#2D3128] focus:outline-none focus:border-[#5D6D4E] flex-1 font-medium"
            />
            <button
              onClick={handleAddSkill}
              className="px-4 py-2 bg-[#5D6D4E] text-white rounded-2xl text-xs font-bold hover:bg-[#4c5b3e] transition-colors flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" /> Adicionar
            </button>
          </div>
        </div>

        {/* Experiences Section */}
        <div className="space-y-4 pt-2">
          <h3 className="font-serif font-bold text-[#2D3128] text-base">Histórico de Experiências Profissionais</h3>
          <div className="space-y-3">
            {candidate.experiences.map((exp, idx) => (
              <div key={idx} className="p-5 bg-[#F8F7F2] rounded-2xl border border-[#E9E5D9] text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-serif font-bold text-[#2D3128] text-sm">{exp.role}</span>
                  <span className="text-[#7A7D75] font-semibold">{exp.period}</span>
                </div>
                <span className="text-[#5D6D4E] font-bold block">{exp.company}</span>
                <p className="text-[#7A7D75] leading-relaxed pt-1">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Education Section */}
        <div className="space-y-3 pt-2">
          <h3 className="font-serif font-bold text-[#2D3128] text-base">Formação Acadêmica</h3>
          <div className="space-y-2">
            {candidate.education.map((edu, idx) => (
              <div key={idx} className="p-4 bg-[#F8F7F2] rounded-2xl border border-[#E9E5D9] text-xs flex justify-between">
                <div>
                  <span className="font-serif font-bold text-[#2D3128] block">{edu.degree}</span>
                  <span className="text-[#7A7D75]">{edu.institution}</span>
                </div>
                <span className="text-[#7A7D75] font-semibold">{edu.year}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
