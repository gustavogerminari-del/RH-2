import React from 'react';
import { useApp } from '../../context/AppContext';
import { Gift, CreditCard, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const CandidateBenefits: React.FC = () => {
  const { benefits } = useApp();

  return (
    <div className="space-y-6 py-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Meus Benefícios Corporativos</h1>
        <p className="text-xs text-slate-500 mt-1">Acompanhe cartões de benefícios, saldos e convênios disponibilizados pela empresa</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {benefits.map(ben => (
          <div key={ben.id} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 bg-blue-50 text-blue-700 text-[11px] font-bold rounded-lg border border-blue-200">
                {ben.category}
              </span>
              <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[11px] font-bold rounded-full">
                {ben.status}
              </span>
            </div>

            <h3 className="font-bold text-slate-900 text-sm">{ben.name}</h3>
            <p className="text-xs text-slate-500">Provedor: {ben.provider}</p>

            {ben.cardNumber && (
              <div className="bg-slate-900 text-white p-3 rounded-xl text-xs space-y-1">
                <span className="text-slate-400 block text-[10px]">Cartão Virtual</span>
                <span className="font-mono font-bold tracking-wider">{ben.cardNumber}</span>
              </div>
            )}

            <div className="border-t border-slate-100 pt-2 text-right">
              <span className="text-[11px] text-slate-400 font-medium block">Carga Mensal</span>
              <span className="text-sm font-black text-emerald-600">
                R$ {ben.monthlyValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
