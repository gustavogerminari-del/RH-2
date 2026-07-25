import React from 'react';
import { useApp } from '../../context/AppContext';
import { Building2, Sparkles, CheckCircle2, Users, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

export const PublicCompanies: React.FC = () => {
  const { setCurrentRole, setActiveTab } = useApp();

  const handleStartCompany = () => {
    setCurrentRole('company');
    setActiveTab('dashboard');
  };

  return (
    <div className="space-y-12 py-8">
      {/* Header Banner */}
      <div className="bg-[#5D6D4E] text-white rounded-3xl p-8 sm:p-12 border border-[#4B593E] shadow-xl text-center space-y-4">
        <span className="px-3 py-1 bg-[#E9F0E6] text-[#5D6D4E] border border-[#E9E5D9] rounded-full text-xs font-bold">
          Para Empresas & Equipes de RH
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold">Transforme sua gestão de RH e recrutamento com IA Generativa</h1>
        <p className="text-xs sm:text-sm text-[#F8F7F2]/90 max-w-2xl mx-auto leading-relaxed font-normal">
          Centralize contratações, folha de pagamento, ponto eletrônico, holerites digitais e controle de férias em uma única plataforma automatizada.
        </p>
        <div className="pt-2">
          <button
            onClick={handleStartCompany}
            className="px-6 py-3 bg-[#2D3128] hover:bg-black text-white font-bold rounded-2xl text-xs shadow-md flex items-center gap-2 mx-auto transition-all"
          >
            Acessar Área da Empresa <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Grid of Solutions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-[#E9E5D9] space-y-3 shadow-xs">
          <div className="w-10 h-10 rounded-2xl bg-[#E9F0E6] text-[#5D6D4E] flex items-center justify-center font-bold">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="font-serif font-bold text-[#2D3128] text-lg">Recrutamento Inteligente</h3>
          <p className="text-xs text-[#7A7D75] leading-relaxed">
            IA que filtra e classifica currículos por percentual de aderência, gera perguntas de entrevista técnica e reduz o tempo de contratação em 70%.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-[#E9E5D9] space-y-3 shadow-xs">
          <div className="w-10 h-10 rounded-2xl bg-[#F5F2EA] text-[#8C7355] flex items-center justify-center font-bold">
            <Users className="w-5 h-5" />
          </div>
          <h3 className="font-serif font-bold text-[#2D3128] text-lg">Departamento Pessoal</h3>
          <p className="text-xs text-[#7A7D75] leading-relaxed">
            Gestão de admissões, emissão de holerites em lote, controle de ponto digital via web/mobile e cálculo de férias.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-[#E9E5D9] space-y-3 shadow-xs">
          <div className="w-10 h-10 rounded-2xl bg-[#E9F0E6] text-[#5D6D4E] flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-serif font-bold text-[#2D3128] text-lg">Conformidade & eSocial</h3>
          <p className="text-xs text-[#7A7D75] leading-relaxed">
            Plataforma 100% alinhada às exigências da CLT e LGPD, garantindo armazenamento seguro de dados de colaboradores.
          </p>
        </div>
      </div>
    </div>
  );
};
