import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Job } from '../../types';
import { ShareJobModal } from '../common/ShareJobModal';
import { Search, MapPin, Building2, DollarSign, Filter, ArrowRight, CheckCircle2, Share2 } from 'lucide-react';

export const PublicJobs: React.FC = () => {
  const { jobs, setSelectedJob, applyToJob, applications } = useApp();
  const [sharingJob, setSharingJob] = useState<Job | null>(null);
  const [search, setSearch] = useState('');
  const [modalityFilter, setModalityFilter] = useState('Todas');
  const [contractFilter, setContractFilter] = useState('Todos');
  const [deptFilter, setDeptFilter] = useState('Todos');

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(search.toLowerCase()) ||
                          job.description.toLowerCase().includes(search.toLowerCase()) ||
                          job.companyName.toLowerCase().includes(search.toLowerCase());
    const matchesModality = modalityFilter === 'Todas' || job.modality === modalityFilter;
    const matchesContract = contractFilter === 'Todos' || job.contractType === contractFilter;
    const matchesDept = deptFilter === 'Todos' || job.department === deptFilter;

    return matchesSearch && matchesModality && matchesContract && matchesDept;
  });

  const isApplied = (jobId: string) => applications.some(a => a.jobId === jobId);

  return (
    <div className="space-y-6 py-6">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-serif font-bold text-[#2D3128]">Portal de Vagas & Oportunidades</h1>
        <p className="text-xs text-[#7A7D75] mt-1">Explore posições disponíveis e candidate-se com seu perfil unificado GESTRH</p>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-3xl p-5 border border-[#E9E5D9] shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 flex items-center gap-2 bg-[#F8F7F2] border border-[#E9E5D9] px-3.5 py-2.5 rounded-2xl">
            <Search className="w-4 h-4 text-[#7A7D75] shrink-0" />
            <input
              type="text"
              placeholder="Buscar por cargo, empresa ou palavra-chave..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent text-xs sm:text-sm text-[#2D3128] placeholder-[#7A7D75] focus:outline-none w-full font-medium"
            />
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <select
              value={modalityFilter}
              onChange={(e) => setModalityFilter(e.target.value)}
              className="bg-[#F8F7F2] border border-[#E9E5D9] text-[#2D3128] text-xs rounded-2xl px-3 py-2.5 font-medium focus:outline-none"
            >
              <option value="Todas">Modalidade: Todas</option>
              <option value="Presencial">Presencial</option>
              <option value="Híbrido">Híbrido</option>
              <option value="Remoto">Remoto</option>
            </select>

            <select
              value={contractFilter}
              onChange={(e) => setContractFilter(e.target.value)}
              className="bg-[#F8F7F2] border border-[#E9E5D9] text-[#2D3128] text-xs rounded-2xl px-3 py-2.5 font-medium focus:outline-none"
            >
              <option value="Todos">Contrato: Todos</option>
              <option value="CLT">CLT</option>
              <option value="PJ">PJ</option>
              <option value="Estágio">Estágio</option>
            </select>

            <select
              value={deptFilter}
              onChange={(e) => setDeptFilter(e.target.value)}
              className="bg-[#F8F7F2] border border-[#E9E5D9] text-[#2D3128] text-xs rounded-2xl px-3 py-2.5 font-medium focus:outline-none"
            >
              <option value="Todos">Departamento: Todos</option>
              <option value="Tecnologia">Tecnologia</option>
              <option value="Recursos Humanos">Recursos Humanos</option>
              <option value="Departamento Pessoal">Departamento Pessoal</option>
              <option value="Design">Design</option>
            </select>
          </div>
        </div>
      </div>

      {/* Jobs List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredJobs.length > 0 ? (
          filteredJobs.map(job => {
            const applied = isApplied(job.id);
            return (
              <div
                key={job.id}
                className="bg-white rounded-3xl p-6 border border-[#E9E5D9] hover:border-[#5D6D4E] hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-[#F5F2EA] text-[#8C7355] text-xs font-bold rounded-full border border-[#8C7355]/20">
                        {job.department}
                      </span>
                      <span className="px-3 py-1 bg-[#E9F0E6] text-[#5D6D4E] text-xs font-bold rounded-full border border-[#5D6D4E]/20">
                        {job.modality}
                      </span>
                    </div>
                    <span className="text-[11px] text-[#7A7D75] font-medium">{job.contractType}</span>
                  </div>

                  <h3 className="font-serif font-bold text-[#2D3128] text-lg mb-1">{job.title}</h3>

                  <div className="flex items-center gap-4 text-xs text-[#7A7D75] mb-3">
                    <span className="flex items-center gap-1 font-semibold text-[#2D3128]">
                      <Building2 className="w-3.5 h-3.5 text-[#5D6D4E]" /> {job.companyName}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#8C7355]" /> {job.location}
                    </span>
                  </div>

                  <p className="text-xs text-[#7A7D75] line-clamp-2 leading-relaxed mb-3">
                    {job.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {job.requirements.slice(0, 3).map((req, idx) => (
                      <span key={idx} className="bg-[#F8F7F2] border border-[#E9E5D9] text-[#2D3128] text-[11px] px-2.5 py-0.5 rounded-full font-medium">
                        {req}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="border-t border-[#F8F7F2] pt-3 flex items-center justify-between">
                  <span className="text-sm font-bold text-[#8C7355]">{job.salaryRange}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSharingJob(job)}
                      title="Compartilhar Vaga"
                      className="p-2 border border-[#E9E5D9] hover:bg-[#F8F7F2] rounded-xl text-[#2D3128] transition-colors cursor-pointer"
                    >
                      <Share2 className="w-4 h-4 text-[#8C7355]" />
                    </button>
                    <button
                      onClick={() => setSelectedJob(job)}
                      className="px-3.5 py-1.5 border border-[#E9E5D9] hover:bg-[#F8F7F2] rounded-xl text-xs font-bold text-[#2D3128] transition-colors cursor-pointer"
                    >
                      Ver Detalhes
                    </button>
                    {applied ? (
                      <span className="px-3 py-1.5 bg-[#E9F0E6] text-[#5D6D4E] text-xs font-bold rounded-xl border border-[#5D6D4E]/30 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Inscrito
                      </span>
                    ) : (
                      <button
                        onClick={() => applyToJob(job.id)}
                        className="px-4 py-1.5 bg-[#5D6D4E] hover:bg-[#4c5b3e] text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        Candidatar-se
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full text-center py-12 bg-white rounded-3xl border border-[#E9E5D9] p-8">
            <p className="text-sm text-[#7A7D75]">Nenhuma vaga encontrada com os filtros selecionados.</p>
          </div>
        )}
      </div>

      {/* Share Job Modal */}
      <ShareJobModal job={sharingJob} onClose={() => setSharingJob(null)} />
    </div>
  );
};
