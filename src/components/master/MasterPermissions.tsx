import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, Lock, Users, Key } from 'lucide-react';

export const MasterPermissions: React.FC = () => {
  const { showToast } = useApp();

  return (
    <div className="space-y-6 py-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Matriz de Permissões e Perfis RBAC</h1>
        <p className="text-xs text-slate-500 mt-1">Defina escopos de controle de acesso para perfis Master, Empresa e Candidato</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs text-xs">
        <h3 className="font-bold text-slate-900 border-b border-slate-100 pb-3">Perfis de Acesso do Sistema</h3>

        <div className="space-y-3">
          <div className="p-4 bg-purple-50 border border-purple-200 rounded-xl flex items-center justify-between">
            <div>
              <span className="font-black text-purple-900 text-sm block">MASTER (Dono da Plataforma)</span>
              <span className="text-slate-600">Acesso ilimitado a todas as empresas tenants, faturamento, IA e banco de dados.</span>
            </div>
            <span className="px-3 py-1 bg-purple-600 text-white font-bold rounded-lg text-[11px]">Nível SuperAdmin</span>
          </div>

          <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-between">
            <div>
              <span className="font-black text-blue-900 text-sm block">EMPRESA (Gestores de RH, DP e Finanças)</span>
              <span className="text-slate-600">Acesso restrito apenas aos dados e colaboradores da própria organização.</span>
            </div>
            <span className="px-3 py-1 bg-blue-600 text-white font-bold rounded-lg text-[11px]">Nível Tenant</span>
          </div>

          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between">
            <div>
              <span className="font-black text-emerald-900 text-sm block">CANDIDATO / COLABORADOR</span>
              <span className="text-slate-600">Acesso estritamente pessoal ao seu próprio ponto, holerite, vagas e currículo.</span>
            </div>
            <span className="px-3 py-1 bg-emerald-600 text-white font-bold rounded-lg text-[11px]">Nível Usuário</span>
          </div>
        </div>
      </div>
    </div>
  );
};
