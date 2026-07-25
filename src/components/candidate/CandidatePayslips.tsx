import React from 'react';
import { useApp } from '../../context/AppContext';
import { FileText, DollarSign, Download, Eye, CheckCircle2 } from 'lucide-react';

export const CandidatePayslips: React.FC = () => {
  const { payslips, setSelectedPayslip, showToast } = useApp();

  return (
    <div className="space-y-6 py-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Holerites e Demonstrativos de Pagamento</h1>
        <p className="text-xs text-slate-500 mt-1">Consulte seus recibos de salário mensais com detalhamento de descontos e impostos</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {payslips.map(pay => (
          <div key={pay.id} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-purple-50 text-purple-600 rounded-xl">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">{pay.monthYear}</h3>
                  <p className="text-[11px] text-slate-400">Data Crédito: {pay.referenceDate}</p>
                </div>
              </div>
              <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full border border-emerald-200">
                {pay.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <span className="text-slate-400 block font-medium">Salário Bruto</span>
                <span className="font-bold text-slate-800">
                  R$ {pay.grossSalary.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div className="bg-emerald-50 p-2.5 rounded-xl border border-emerald-100">
                <span className="text-emerald-700 block font-medium">Salário Líquido</span>
                <span className="font-black text-emerald-800">
                  R$ {pay.netSalary.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <button
                onClick={() => setSelectedPayslip(pay)}
                className="px-3.5 py-1.5 border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors"
              >
                <Eye className="w-4 h-4 text-blue-600" /> Visualizar
              </button>
              <button
                onClick={() => showToast(`Download do Holerite ${pay.monthYear} iniciado.`)}
                className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-xs transition-colors"
              >
                <Download className="w-4 h-4" /> PDF
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
