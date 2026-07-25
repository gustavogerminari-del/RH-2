import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, Printer, Download, FileText, Building2, CheckCircle2 } from 'lucide-react';

export const PayslipModal: React.FC = () => {
  const { selectedPayslip, setSelectedPayslip, showToast } = useApp();

  if (!selectedPayslip) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    showToast(`Download do Holerite ${selectedPayslip.monthYear} iniciado!`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-2xl w-full p-6 text-slate-800 animate-fade-in relative">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Holerite Digital - Demonstrativo de Pagamento</h3>
              <p className="text-xs text-slate-500">Mês de Referência: {selectedPayslip.monthYear}</p>
            </div>
          </div>
          <button
            onClick={() => setSelectedPayslip(null)}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Company & Employee Metadata */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-5 grid grid-cols-2 gap-4 text-xs">
          <div>
            <span className="text-slate-400 font-medium block">EMPREGADOR</span>
            <span className="font-bold text-slate-800 text-sm">TechInova Soluções SA</span>
            <span className="text-slate-500 block">CNPJ: 12.345.678/0001-90</span>
          </div>
          <div>
            <span className="text-slate-400 font-medium block">COLABORADOR</span>
            <span className="font-bold text-slate-800 text-sm">Lucas Germinari</span>
            <span className="text-slate-500 block">Cargo: Dev Full Stack Sênior (CLT)</span>
          </div>
        </div>

        {/* Financial Breakdown Table */}
        <div className="border border-slate-200 rounded-xl overflow-hidden mb-5 text-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-600 text-xs uppercase tracking-wider border-b border-slate-200">
                <th className="py-2.5 px-3">Código</th>
                <th className="py-2.5 px-3">Descrição da Rubrica</th>
                <th className="py-2.5 px-3 text-right">Proventos (R$)</th>
                <th className="py-2.5 px-3 text-right">Descontos (R$)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              <tr>
                <td className="py-2 px-3 text-slate-500">001</td>
                <td className="py-2 px-3 font-medium text-slate-800">Salário Base Mensal</td>
                <td className="py-2 px-3 text-right text-emerald-600 font-semibold">{selectedPayslip.grossSalary.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                <td className="py-2 px-3 text-right text-slate-400">-</td>
              </tr>
              {selectedPayslip.bonuses > 0 && (
                <tr>
                  <td className="py-2 px-3 text-slate-500">015</td>
                  <td className="py-2 px-3 font-medium text-slate-800">Bônus por Desempenho</td>
                  <td className="py-2 px-3 text-right text-emerald-600 font-semibold">{selectedPayslip.bonuses.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                  <td className="py-2 px-3 text-right text-slate-400">-</td>
                </tr>
              )}
              <tr>
                <td className="py-2 px-3 text-slate-500">101</td>
                <td className="py-2 px-3 font-medium text-slate-800">INSS Retido na Fonte</td>
                <td className="py-2 px-3 text-right text-slate-400">-</td>
                <td className="py-2 px-3 text-right text-rose-600 font-medium">{selectedPayslip.inssDeduction.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
              </tr>
              <tr>
                <td className="py-2 px-3 text-slate-500">102</td>
                <td className="py-2 px-3 font-medium text-slate-800">IRRF Retido na Fonte</td>
                <td className="py-2 px-3 text-right text-slate-400">-</td>
                <td className="py-2 px-3 text-right text-rose-600 font-medium">{selectedPayslip.irrfDeduction.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
              </tr>
              {selectedPayslip.vrDeduction > 0 && (
                <tr>
                  <td className="py-2 px-3 text-slate-500">204</td>
                  <td className="py-2 px-3 font-medium text-slate-800">Desconto Vale Refeição (PAT 1%)</td>
                  <td className="py-2 px-3 text-right text-slate-400">-</td>
                  <td className="py-2 px-3 text-right text-rose-600 font-medium">{selectedPayslip.vrDeduction.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Totals Summary */}
        <div className="bg-slate-900 text-white rounded-xl p-4 flex items-center justify-between mb-6">
          <div>
            <span className="text-xs text-slate-400 uppercase tracking-wider block">Valor Líquido a Receber</span>
            <span className="text-2xl font-black text-emerald-400">
              R$ {selectedPayslip.netSalary.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
          </div>
          <div className="text-right text-xs text-slate-300">
            <span className="inline-flex items-center gap-1 text-emerald-400 font-medium mb-1">
              <CheckCircle2 className="w-4 h-4" /> Pago via PIX / TED
            </span>
            <span className="block text-slate-400">Data de Crédito: {selectedPayslip.referenceDate}</span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between border-t border-slate-200 pt-4">
          <span className="text-xs text-slate-500 italic">Autenticação Digital GESTRH #2026-HL-9981</span>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-2 border border-slate-300 hover:bg-slate-50 rounded-xl text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-4 h-4" /> Imprimir
            </button>
            <button
              onClick={handleDownload}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <Download className="w-4 h-4" /> Baixar PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
