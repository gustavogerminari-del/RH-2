import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import { Lock, Mail, Users, Briefcase, ShieldAlert, ArrowRight, CheckCircle2 } from 'lucide-react';

export const PublicAuth: React.FC = () => {
  const { setCurrentRole, showToast } = useApp();
  const [selectedRole, setSelectedRole] = useState<UserRole>('candidate');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentRole(selectedRole);
    showToast(`Sessão iniciada como ${getRoleLabel(selectedRole)}!`);
  };

  const getRoleLabel = (role: UserRole) => {
    switch (role) {
      case 'candidate': return 'Área do Candidato';
      case 'company': return 'Área da Empresa';
      case 'master': return 'Painel MASTER';
      default: return 'Portal Público';
    }
  };

  return (
    <div className="max-w-md mx-auto py-12">
      <div className="bg-white rounded-3xl border border-[#E9E5D9] shadow-md p-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-[#5D6D4E] text-white font-serif font-bold text-2xl flex items-center justify-center mx-auto shadow-xs">
            G
          </div>
          <h1 className="text-2xl font-serif font-bold text-[#2D3128]">Acesse o GESTRH</h1>
          <p className="text-xs text-[#7A7D75]">Selecione seu perfil de acesso ao sistema</p>
        </div>

        {/* Role Selection Tabs */}
        <div className="grid grid-cols-3 gap-1 bg-[#F8F7F2] p-1.5 rounded-2xl text-xs font-bold border border-[#E9E5D9]">
          <button
            type="button"
            onClick={() => setSelectedRole('candidate')}
            className={`py-2 rounded-xl transition-all flex flex-col items-center gap-1 ${
              selectedRole === 'candidate' ? 'bg-white text-[#5D6D4E] shadow-xs font-bold' : 'text-[#7A7D75] hover:text-[#2D3128]'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Candidato</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedRole('company')}
            className={`py-2 rounded-xl transition-all flex flex-col items-center gap-1 ${
              selectedRole === 'company' ? 'bg-white text-[#8C7355] shadow-xs font-bold' : 'text-[#7A7D75] hover:text-[#2D3128]'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Empresa</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedRole('master')}
            className={`py-2 rounded-xl transition-all flex flex-col items-center gap-1 ${
              selectedRole === 'master' ? 'bg-white text-[#2D3128] shadow-xs font-bold' : 'text-[#7A7D75] hover:text-[#2D3128]'
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
            <span>Master</span>
          </button>
        </div>

        {/* Quick Demo Login Preset Buttons */}
        <div className="bg-[#E9F0E6] border border-[#5D6D4E]/20 rounded-2xl p-4 space-y-2.5">
          <span className="text-[11px] font-bold text-[#5D6D4E] uppercase tracking-wider block">
            Acesso Rápido de Demonstração:
          </span>
          <div className="flex flex-col gap-2 text-xs">
            <button
              onClick={() => { setCurrentRole('candidate'); showToast('Acesso rápido como Candidato efetuado!'); }}
              className="px-3.5 py-2 bg-[#5D6D4E] text-white font-bold rounded-xl hover:bg-[#4c5b3e] transition-colors text-left flex items-center justify-between"
            >
              <span>Entrar como Candidato (Lucas)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => { setCurrentRole('company'); showToast('Acesso rápido como Gestor de RH efetuado!'); }}
              className="px-3.5 py-2 bg-[#8C7355] text-white font-bold rounded-xl hover:bg-[#786146] transition-colors text-left flex items-center justify-between"
            >
              <span>Entrar como Empresa (RH TechInova)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => { setCurrentRole('master'); showToast('Acesso rápido como Master Admin efetuado!'); }}
              className="px-3.5 py-2 bg-[#2D3128] text-white font-bold rounded-xl hover:bg-black transition-colors text-left flex items-center justify-between"
            >
              <span>Entrar como Painel Master (SaaS)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#2D3128] mb-1">E-mail de Acesso</label>
            <div className="flex items-center gap-2 bg-[#F8F7F2] border border-[#E9E5D9] rounded-2xl px-3.5 py-2.5">
              <Mail className="w-4 h-4 text-[#7A7D75] shrink-0" />
              <input
                type="email"
                required
                placeholder="seu.email@dominio.com.br"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-transparent text-xs text-[#2D3128] placeholder-[#7A7D75] focus:outline-none w-full font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#2D3128] mb-1">Senha</label>
            <div className="flex items-center gap-2 bg-[#F8F7F2] border border-[#E9E5D9] rounded-2xl px-3.5 py-2.5">
              <Lock className="w-4 h-4 text-[#7A7D75] shrink-0" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-transparent text-xs text-[#2D3128] focus:outline-none w-full font-medium"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#2D3128] hover:bg-black text-white font-bold rounded-2xl text-xs transition-colors shadow-xs flex items-center justify-center gap-2"
          >
            Entrar no Portal ({getRoleLabel(selectedRole)})
          </button>
        </form>
      </div>
    </div>
  );
};
