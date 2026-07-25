import React from 'react';
import { Building2, ShieldCheck, Lock, Sparkles, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#F8F7F2] text-[#7A7D75] border-t border-[#E9E5D9] py-10 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-3 text-[#2D3128]">
            <div className="w-6 h-6 rounded-lg bg-[#5D6D4E] text-white flex items-center justify-center font-serif font-bold text-sm">
              G
            </div>
            <span className="font-serif font-bold text-base tracking-tight text-[#2D3128]">GESTRH</span>
          </div>
          <p className="text-[#7A7D75] leading-relaxed mb-4 text-xs">
            Plataforma SaaS integrada de Recursos Humanos, Recrutamento Inteligente com IA Generativa, Departamento Pessoal, Ponto e Gestão de Pessoas.
          </p>
          <div className="flex items-center gap-2 text-[#5D6D4E]">
            <ShieldCheck className="w-4 h-4 text-[#5D6D4E]" />
            <span className="font-medium">Conforme com LGPD & CLT Brasil</span>
          </div>
        </div>

        <div>
          <h4 className="font-serif font-bold text-[#2D3128] mb-3 text-sm">Portais & Acessos</h4>
          <ul className="space-y-2 text-xs">
            <li><a href="#" className="hover:text-[#2D3128] transition-colors">Portal Público de Vagas</a></li>
            <li><a href="#" className="hover:text-[#2D3128] transition-colors">Área do Candidato</a></li>
            <li><a href="#" className="hover:text-[#2D3128] transition-colors">Área da Empresa (RH)</a></li>
            <li><a href="#" className="hover:text-[#2D3128] transition-colors">Painel MASTER SaaS</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif font-bold text-[#2D3128] mb-3 text-sm">Recursos com IA</h4>
          <ul className="space-y-2 text-xs">
            <li><span className="flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5 text-[#8C7355]" /> Triagem Automatizada de CVs</span></li>
            <li><span className="flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5 text-[#8C7355]" /> Gerador de Descrição de Vagas</span></li>
            <li><span className="flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5 text-[#8C7355]" /> Preparador de Entrevistas</span></li>
            <li><span className="flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5 text-[#8C7355]" /> Otimizador de Currículos</span></li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif font-bold text-[#2D3128] mb-3 text-sm">Segurança & Suporte</h4>
          <p className="text-[#7A7D75] leading-relaxed mb-3 text-xs">
            Infraestrutura de alta disponibilidade com criptografia ponta a ponta e redundância de dados.
          </p>
          <div className="p-3 bg-white rounded-2xl border border-[#E9E5D9] text-[#2D3128] flex items-center gap-2 text-xs">
            <Lock className="w-4 h-4 text-[#5D6D4E] shrink-0" />
            <span className="font-medium">Suporte Técnico | contato@gestrh.com.br</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-[#E9E5D9] pt-6 flex flex-wrap items-center justify-between gap-4 text-[11px] text-[#7A7D75] font-medium">
        <div>GESTRH &copy; 2026 • Sistema Unificado de Gestão de Pessoas</div>
        <div className="flex gap-6">
          <span>Status: Operacional</span>
          <span>Painel MASTER • v2.4.0</span>
        </div>
      </div>
    </footer>
  );
};
