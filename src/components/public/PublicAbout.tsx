import React from 'react';
import { Building2, ShieldCheck, Target, Award, Users } from 'lucide-react';

export const PublicAbout: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-8 space-y-10">
      <div className="text-center space-y-3">
        <span className="px-3.5 py-1 bg-[#E9F0E6] text-[#5D6D4E] text-xs font-bold rounded-full border border-[#5D6D4E]/20">
          Sobre o GESTRH
        </span>
        <h1 className="text-3xl font-serif font-bold text-[#2D3128]">Inovação e Tecnologia para a Gestão Humana</h1>
        <p className="text-xs text-[#7A7D75] max-w-xl mx-auto leading-relaxed">
          O GESTRH nasceu para simplificar a rotina de profissionais de Recursos Humanos, líderes e colaboradores, unindo inteligência artificial a processos humanizados.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-8 rounded-3xl border border-[#E9E5D9] space-y-3 shadow-xs">
          <Target className="w-8 h-8 text-[#5D6D4E]" />
          <h3 className="font-serif font-bold text-[#2D3128] text-xl">Nossa Missão</h3>
          <p className="text-xs text-[#7A7D75] leading-relaxed">
            Capacitar empresas de todos os portes com ferramentas modernas de recrutamento, administração de departamento pessoal e engajamento de colaboradores, eliminando gargalos burocráticos.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-[#E9E5D9] space-y-3 shadow-xs">
          <Award className="w-8 h-8 text-[#8C7355]" />
          <h3 className="font-serif font-bold text-[#2D3128] text-xl">Nossa Visão</h3>
          <p className="text-xs text-[#7A7D75] leading-relaxed">
            Ser o ecossistema de gestão de pessoas número 1 no Brasil, integrando Inteligência Artificial Generativa para decisões mais justas, ágeis e eficientes.
          </p>
        </div>
      </div>
    </div>
  );
};
