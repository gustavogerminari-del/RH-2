import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Users, Sparkles, Search, Mail, Phone, FileText, CheckCircle2, UserPlus } from 'lucide-react';

export const CompanyTalentPool: React.FC = () => {
  const { talentPool, addEmployee, showToast } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArea, setSelectedArea] = useState('Todas');
  const [isAiSearching, setIsAiSearching] = useState(false);

  const filteredTalents = talentPool.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          t.skills.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesArea = selectedArea === 'Todas' || t.area === selectedArea;
    return matchesSearch && matchesArea;
  });

  const handleHireFromTalentPool = (talent: any) => {
    addEmployee({
      name: talent.name,
      email: talent.email,
      phone: talent.phone,
      cpf: '000.000.000-00',
      role: talent.area === 'Tecnologia' ? 'Engenheiro de Software' : 'Analista',
      department: talent.area,
      salary: 6500,
      admissionDate: new Date().toISOString().split('T')[0],
      status: 'Ativo'
    });
    showToast(`${talent.name} contratado e convertido em colaborador da empresa!`);
  };

  return (
    <div className="space-y-6 py-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Banco de Talentos com IA</h1>
          <p className="text-xs text-slate-500 mt-1">Busque currículos indexados continuamente com inteligência preditiva</p>
        </div>

        <div className="inline-flex items-center gap-1.5 bg-purple-50 text-purple-700 px-3 py-1.5 rounded-xl text-xs font-bold border border-purple-200">
          <Sparkles className="w-4 h-4 text-purple-600" /> {talentPool.length} Perfis Disponíveis
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="sm:col-span-2 flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            placeholder="Filtrar por nome, habilidade (ex: React, Node, Scrum)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent text-slate-800 focus:outline-none w-full"
          />
        </div>

        <select
          value={selectedArea}
          onChange={(e) => setSelectedArea(e.target.value)}
          className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none"
        >
          <option value="Todas">Todas as Áreas</option>
          <option value="Tecnologia">Tecnologia</option>
          <option value="Design">Design</option>
          <option value="Recursos Humanos">Recursos Humanos</option>
          <option value="Financeiro">Financeiro</option>
        </select>
      </div>

      {/* Talent Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTalents.map(talent => (
          <div key={talent.id} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 font-bold flex items-center justify-center">
                  {talent.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">{talent.name}</h3>
                  <p className="text-[11px] text-slate-400">{talent.email} • {talent.phone}</p>
                </div>
              </div>

              <div className="text-right">
                <span className="px-2.5 py-1 bg-purple-50 text-purple-700 font-bold border border-purple-200 rounded-full text-[11px]">
                  Match IA: {talent.aiMatchScore}%
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">{talent.resumeSummary}</p>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {talent.skills.map((s, idx) => (
                <span key={idx} className="px-2 py-0.5 bg-slate-100 text-slate-700 text-[11px] font-semibold rounded">
                  {s}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
              <span className="text-slate-400 text-[11px]">Inscrito em {talent.registeredAt}</span>
              <button
                onClick={() => handleHireFromTalentPool(talent)}
                className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl flex items-center gap-1.5 transition-colors shadow-xs"
              >
                <UserPlus className="w-3.5 h-3.5" /> Iniciar Admissão
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
