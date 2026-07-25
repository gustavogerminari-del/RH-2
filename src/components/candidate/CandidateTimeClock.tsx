import React from 'react';
import { useApp } from '../../context/AppContext';
import { Clock, Play, Square, AlertCircle, CheckCircle2 } from 'lucide-react';

export const CandidateTimeClock: React.FC = () => {
  const { timeLogs, clockIn, clockOut } = useApp();
  const todayLog = timeLogs.find(l => l.date.includes('Hoje'));

  return (
    <div className="space-y-6 py-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Ponto Eletrônico Web & Mobile</h1>
        <p className="text-xs text-slate-500 mt-1">Registro seguro da sua jornada de trabalho com geolocalização e carimbo de hora</p>
      </div>

      {/* Clock Action Card */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block mb-1">
            Status da Jornada Hoje ({new Date().toLocaleDateString('pt-BR')})
          </span>
          <h2 className="text-xl font-black text-white">
            {todayLog ? (todayClockLogFinished(todayLog) ? 'Jornada Finalizada' : `Trabalhando desde as ${todayLog.clockIn}`) : 'Ponto Não Registrado'}
          </h2>
          <p className="text-xs text-slate-400 mt-1">Sua escala é de 08:00 às 17:00 (1h de almoço)</p>
        </div>

        <div className="flex items-center gap-3">
          {!todayLog ? (
            <button
              onClick={clockIn}
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-lg transition-all"
            >
              <Play className="w-4 h-4 fill-current" /> Registrar Entrada (08:00)
            </button>
          ) : !todayLog.clockOut ? (
            <button
              onClick={clockOut}
              className="px-6 py-3 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-lg transition-all"
            >
              <Square className="w-4 h-4 fill-current" /> Registrar Saída
            </button>
          ) : (
            <div className="px-4 py-2 bg-slate-800 border border-slate-700 text-emerald-400 font-bold text-xs rounded-xl flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> Ponto Concluído
            </div>
          )}
        </div>
      </div>

      {/* History Log */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs">
        <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-3">Espelho de Ponto Recente</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-500 uppercase font-semibold border-b border-slate-200">
                <th className="py-2.5 px-3">Data</th>
                <th className="py-2.5 px-3">Entrada</th>
                <th className="py-2.5 px-3">Saída Almoço</th>
                <th className="py-2.5 px-3">Retorno Almoço</th>
                <th className="py-2.5 px-3">Saída</th>
                <th className="py-2.5 px-3">Total Horas</th>
                <th className="py-2.5 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
              {timeLogs.map(log => (
                <tr key={log.id}>
                  <td className="py-3 px-3 font-bold">{log.date}</td>
                  <td className="py-3 px-3 text-emerald-600">{log.clockIn}</td>
                  <td className="py-3 px-3 text-slate-500">{log.lunchOut || '-'}</td>
                  <td className="py-3 px-3 text-slate-500">{log.lunchIn || '-'}</td>
                  <td className="py-3 px-3 text-rose-600">{log.clockOut || '-'}</td>
                  <td className="py-3 px-3 font-bold">{log.totalHours}</td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded font-bold text-[11px]">
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

function todayClockLogFinished(log: any) {
  return log && log.clockOut;
}
