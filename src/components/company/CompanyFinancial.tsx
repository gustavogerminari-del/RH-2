import React from 'react';
import { useApp } from '../../context/AppContext';
import { DollarSign, TrendingUp, CreditCard, FileSpreadsheet, Download } from 'lucide-react';

export const CompanyFinancial: React.FC = () => {
  const { employees, benefits, showToast } = useApp();

  const totalSalaries = employees.reduce((acc, e) => acc + e.salary, 0);
  const totalBenefits = benefits.reduce((acc, b) => acc + b.monthlyValue, 0) * employees.length;
  const estimatedCharges = totalSalaries * 0.35; // INSS / FGTS charges approx 35%
  const totalCost = totalSalaries + totalBenefits + estimatedCharges;

  return (
    <div className="space-y-6 py-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Financeiro & Custos de Pessoal</h1>
        <p className="text-xs text-slate-500 mt-1">Previsão e consolidação de custos de folha, encargos sociais e benefícios</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <span className="text-xs font-bold text-slate-500">Folha Salarial Bruta</span>
          <span className="text-xl font-black text-slate-900 block">
            R$ {totalSalaries.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </span>
          <span className="text-[11px] text-slate-400 font-semibold">{employees.length} colaboradores</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <span className="text-xs font-bold text-slate-500">Encargos Sociais (FGTS/INSS)</span>
          <span className="text-xl font-black text-purple-600 block">
            R$ {estimatedCharges.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </span>
          <span className="text-[11px] text-purple-600 font-semibold">Estimado 35.8% CLT</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <span className="text-xs font-bold text-slate-500">Benefícios Corporativos</span>
          <span className="text-xl font-black text-blue-600 block">
            R$ {totalBenefits.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </span>
          <span className="text-[11px] text-blue-600 font-semibold">VR, VA, Saúde e VT</span>
        </div>

        <div className="bg-gradient-to-r from-emerald-900 to-slate-900 text-white p-5 rounded-2xl border border-slate-800 shadow-xl space-y-2">
          <span className="text-xs font-bold text-emerald-400">Custo Total de Pessoas</span>
          <span className="text-2xl font-black block">
            R$ {totalCost.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </span>
          <span className="text-[11px] text-slate-300 font-semibold">Custo mensal consolidado</span>
        </div>
      </div>

      {/* Payroll Export Card */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-slate-900 text-sm">Exportar Arquivo de Pagamento Bancário (CNAB 240)</h3>
          <p className="text-xs text-slate-500 mt-0.5">Gere o arquivo do lote de remessa para Itaú, Bradesco, Banco do Brasil ou Santander.</p>
        </div>
        <button
          onClick={() => showToast('Arquivo CNAB 240 exportado com sucesso!')}
          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-xs transition-colors shrink-0"
        >
          <FileSpreadsheet className="w-4 h-4" /> Exportar CNAB 240
        </button>
      </div>
    </div>
  );
};
