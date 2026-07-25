import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, MapPin, Building2, Sparkles, CheckCircle, ArrowRight, ShieldCheck, Award, Users, Briefcase } from 'lucide-react';

export const PublicHome: React.FC = () => {
  const { jobs, setSelectedJob, setActiveTab } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [locationTerm, setLocationTerm] = useState('');

  const featuredJobs = jobs.slice(0, 3);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveTab('jobs');
  };

  return (
    <div className="space-y-12 py-6">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#5D6D4E] text-white rounded-3xl p-8 sm:p-12 border border-[#4B593E] shadow-xl">
        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-[#E9F0E6] text-[#5D6D4E] px-4 py-1.5 rounded-full text-xs font-bold border border-[#E9E5D9]">
            <Sparkles className="w-4 h-4 text-[#5D6D4E]" />
            <span>Recrutamento Conectado por Inteligência Artificial</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight leading-tight">
            Conecte seu talento às melhores oportunidades com o <span className="underline decoration-[#8C7355] underline-offset-8">GESTRH</span>
          </h1>

          <p className="text-[#F8F7F2]/90 text-sm sm:text-base leading-relaxed font-normal">
            Encontre vagas de empresas líderes no mercado ou publique processos seletivos com triagem automatizada, banco de talentos e gestão completa de RH em uma única plataforma.
          </p>

          {/* Quick Search Form */}
          <form onSubmit={handleSearch} className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/20 shadow-lg flex flex-col sm:flex-row gap-2">
            <div className="flex-1 flex items-center gap-2 bg-white/90 px-3.5 py-2.5 rounded-xl border border-[#E9E5D9]">
              <Search className="w-4 h-4 text-[#7A7D75] shrink-0" />
              <input
                type="text"
                placeholder="Cargo, palavra-chave ou tecnologia..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent text-[#2D3128] placeholder-[#7A7D75] text-xs sm:text-sm focus:outline-none w-full"
              />
            </div>

            <div className="flex-1 flex items-center gap-2 bg-white/90 px-3.5 py-2.5 rounded-xl border border-[#E9E5D9]">
              <MapPin className="w-4 h-4 text-[#7A7D75] shrink-0" />
              <input
                type="text"
                placeholder="Cidade, estado ou 'Remoto'..."
                value={locationTerm}
                onChange={(e) => setLocationTerm(e.target.value)}
                className="bg-transparent text-[#2D3128] placeholder-[#7A7D75] text-xs sm:text-sm focus:outline-none w-full"
              />
            </div>

            <button
              type="submit"
              className="bg-[#2D3128] hover:bg-black text-white font-bold px-6 py-3 rounded-xl text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4" /> Buscar Vagas
            </button>
          </form>

          {/* Quick Stats */}
          <div className="pt-6 grid grid-cols-3 gap-4 border-t border-white/20 text-center text-xs">
            <div>
              <span className="block text-2xl font-serif font-bold text-white">+1.400</span>
              <span className="text-[#F8F7F2]/80 font-medium">Vagas Ativas</span>
            </div>
            <div>
              <span className="block text-2xl font-serif font-bold text-white">+350</span>
              <span className="text-[#F8F7F2]/80 font-medium">Empresas Cadastradas</span>
            </div>
            <div>
              <span className="block text-2xl font-serif font-bold text-white">98%</span>
              <span className="text-[#F8F7F2]/80 font-medium">Aderência com IA</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-serif font-bold text-[#2D3128]">Vagas em Destaque</h2>
            <p className="text-xs text-[#7A7D75] mt-1">Oportunidades recentes com contratação imediata</p>
          </div>
          <button
            onClick={() => setActiveTab('jobs')}
            className="text-xs font-bold text-[#5D6D4E] hover:text-[#2D3128] flex items-center gap-1 transition-colors"
          >
            Ver Todas as Vagas <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredJobs.map(job => (
            <div
              key={job.id}
              onClick={() => setSelectedJob(job)}
              className="bg-white rounded-3xl p-6 border border-[#E9E5D9] hover:border-[#5D6D4E] hover:shadow-md transition-all cursor-pointer flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 bg-[#E9F0E6] text-[#5D6D4E] text-[11px] font-bold rounded-full border border-[#5D6D4E]/20">
                    {job.modality}
                  </span>
                  <span className="text-[11px] text-[#7A7D75] font-medium">
                    {job.createdAt}
                  </span>
                </div>
                <h3 className="font-serif font-bold text-[#2D3128] text-base line-clamp-2 mb-2">{job.title}</h3>
                <div className="flex items-center gap-2 text-xs text-[#7A7D75] mb-2">
                  <Building2 className="w-3.5 h-3.5 text-[#5D6D4E] shrink-0" />
                  <span className="font-semibold text-[#2D3128]">{job.companyName}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#7A7D75]">
                  <MapPin className="w-3.5 h-3.5 shrink-0 text-[#8C7355]" />
                  <span>{job.location}</span>
                </div>
              </div>

              <div className="border-t border-[#F8F7F2] pt-3 flex items-center justify-between">
                <span className="text-xs font-bold text-[#8C7355]">{job.salaryRange}</span>
                <span className="text-xs font-bold text-[#5D6D4E] hover:underline flex items-center gap-1">
                  Detalhes <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* AI Features Showcase */}
      <section className="bg-white text-[#2D3128] rounded-3xl p-8 sm:p-12 border border-[#E9E5D9] grid grid-cols-1 md:grid-cols-2 gap-8 items-center shadow-xs">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-1.5 bg-[#F5F2EA] text-[#8C7355] border border-[#E9E5D9] px-3 py-1 rounded-full text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" /> Módulo de Inteligência Artificial
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#2D3128] leading-snug">
            Triagem automatizada e avaliação imparcial de currículos
          </h2>
          <p className="text-[#7A7D75] text-xs sm:text-sm leading-relaxed">
            Nossa Engine proprietária com Gemini AI lê e analisa requisitos técnicos, histórico profissional e soft skills em segundos, entregando uma pontuação de aderência precisa para os recrutadores.
          </p>
          <ul className="space-y-2 text-xs text-[#2D3128] font-medium">
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-[#5D6D4E] shrink-0" />
              <span>Análise de aderência em % tempo real</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-[#5D6D4E] shrink-0" />
              <span>Geração automática de perguntas para entrevista técnica</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-[#5D6D4E] shrink-0" />
              <span>Otimização e polimento inteligente do perfil do candidato</span>
            </li>
          </ul>
        </div>

        <div className="bg-[#F8F7F2] p-6 rounded-3xl border border-[#E9E5D9] space-y-4">
          <div className="flex items-center justify-between border-b border-[#E9E5D9] pb-3">
            <span className="text-xs font-serif font-bold text-[#5D6D4E] flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#8C7355]" /> Simulação de Análise IA
            </span>
            <span className="text-[11px] bg-[#E9F0E6] text-[#5D6D4E] px-2.5 py-0.5 rounded-full font-bold border border-[#5D6D4E]/20">
              94% Match
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="bg-white p-4 rounded-2xl border border-[#E9E5D9]">
              <span className="text-[#7A7D75] block mb-1">Vaga: Dev Full Stack Sênior</span>
              <p className="text-[#2D3128] font-medium leading-relaxed">"Candidato atende 100% aos requisitos de React e Node.js com ótimo histórico corporativo."</p>
            </div>
            <div className="flex gap-2">
              <span className="bg-[#E9F0E6] text-[#5D6D4E] px-3 py-1 rounded-full text-[11px] font-bold">✓ React & TypeScript</span>
              <span className="bg-[#F5F2EA] text-[#8C7355] px-3 py-1 rounded-full text-[11px] font-bold">✓ Liderança Técnica</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
