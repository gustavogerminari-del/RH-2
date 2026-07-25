import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Sun, Calendar, Send, CheckCircle2, Clock } from 'lucide-react';

export const CandidateVacations: React.FC = () => {
  const { vacationRequests, requestVacation } = useApp();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [daysCount, setDaysCount] = useState(15);
  const [sellDays, setSellDays] = useState(false);

  const handleRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!startDate || !endDate) return;
    requestVacation({
      startDate,
      endDate,
      daysCount: Number(daysCount),
      sellDays
    });
    setStartDate('');
    setEndDate('');
  };

  return (
    <div className="space-y-6 py-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Gestão de Férias & Licenças</h1>
        <p className="text-xs text-slate-500 mt-1">Solicite períodos de descanso, consulte saldos e abono pecunioso</p>
      </div>

      {/* Form Card */}
      <form onSubmit={handleRequest} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
        <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
          <Sun className="w-4 h-4 text-amber-500" /> Nova Solicitação de Férias
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Data de Início</label>
            <input
              type="date"
              required
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Data de Término</label>
            <input
              type="date"
              required
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Qtd. Dias</label>
            <select
              value={daysCount}
              onChange={(e) => setDaysCount(Number(e.target.value))}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-500"
            >
              <option value={10}>10 Dias</option>
              <option value={15}>15 Dias</option>
              <option value={20}>20 Dias</option>
              <option value={30}>30 Dias</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="sell"
            checked={sellDays}
            onChange={(e) => setSellDays(e.target.checked)}
            className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="sell" className="text-xs font-semibold text-slate-700">
            Desejo vender 10 dias (Abono Pecunioso)
          </label>
        </div>

        <button
          type="submit"
          className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-xs transition-colors"
        >
          <Send className="w-4 h-4" /> Enviar Solicitação ao Gestor/RH
        </button>
      </form>

      {/* Requests History */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs">
        <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-3">Histórico de Solicitações</h3>

        <div className="divide-y divide-slate-100">
          {vacationRequests.map(v => (
            <div key={v.id} className="py-3 flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-slate-800 block">
                  Período: {v.startDate} até {v.endDate} ({v.daysCount} dias)
                </span>
                <span className="text-slate-400">Solicitado em {v.requestedAt} {v.sellDays && '• Com abono pecunioso'}</span>
              </div>
              <span className="px-3 py-1 bg-amber-50 text-amber-700 font-bold border border-amber-200 rounded-full">
                {v.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
