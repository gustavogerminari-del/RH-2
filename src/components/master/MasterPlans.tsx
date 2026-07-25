import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, Plus, CheckCircle2, Zap } from 'lucide-react';

export const MasterPlans: React.FC = () => {
  const { showToast } = useApp();

  const plans = [
    {
      name: 'Starter Recrutamento',
      price: 'R$ 490/mês',
      features: ['Até 5 vagas simultâneas', 'Triagem de currículos com IA', 'Banco de talentos básico', 'Suporte por e-mail']
    },
    {
      name: 'Corporativo Pro',
      price: 'R$ 1.800/mês',
      features: ['Vagas ilimitadas', 'Triagem IA Gemini avançada', 'Ponto Eletrônico e Holerite Digital', 'Integração WhatsApp Bot', 'Suporte prioritário']
    },
    {
      name: 'Enterprise Full',
      price: 'R$ 3.500/mês',
      features: ['Acesso a todos os 8 módulos', 'eSocial & Assinatura Eletrônica', 'Analytics de TurnOver e IA preditiva', 'Gerente de contas dedicado', 'SLA 99.9%']
    }
  ];

  return (
    <div className="space-y-6 py-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Planos de Assinatura & Precificação SaaS</h1>
        <p className="text-xs text-slate-500 mt-1">Configure os pacotes comerciais oferecidos na plataforma</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((p, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="px-3 py-1 bg-purple-50 text-purple-700 text-xs font-bold rounded-full border border-purple-200">
                Plano Comercial
              </span>
              <h3 className="font-black text-slate-900 text-lg">{p.name}</h3>
              <div className="text-2xl font-black text-purple-600">{p.price}</div>

              <ul className="space-y-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
                {p.features.map((f, fIdx) => (
                  <li key={fIdx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => showToast(`Plano ${p.name} selecionado para edição.`)}
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition-colors shadow-xs"
            >
              Editar Configurações
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
