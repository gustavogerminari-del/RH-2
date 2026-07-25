import React from 'react';
import { useApp } from '../../context/AppContext';
import { Database, ShieldCheck, HardDrive, RefreshCw, CheckCircle2 } from 'lucide-react';

export const MasterDatabase: React.FC = () => {
  const { showToast } = useApp();

  return (
    <div className="space-y-6 py-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Banco de Dados, Firebase & Backups</h1>
        <p className="text-xs text-slate-500 mt-1">Status de armazenamento no Firestore, regras de segurança e cópias de segurança</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <Database className="w-6 h-6 text-orange-500" />
            <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[11px] font-bold rounded-full">Ativo</span>
          </div>
          <h3 className="font-bold text-slate-900 text-sm">Firebase Firestore</h3>
          <p className="text-xs text-slate-500">Coleções: users, jobs, candidates, timelogs, payslips.</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <HardDrive className="w-6 h-6 text-purple-600" />
            <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[11px] font-bold rounded-full">Diário</span>
          </div>
          <h3 className="font-bold text-slate-900 text-sm">Backup Automático</h3>
          <p className="text-xs text-slate-500">Último backup: Hoje às 03:00 (Tamanho: 1.4 GB)</p>
          <button
            onClick={() => showToast('Backup sob demanda iniciado com sucesso!')}
            className="w-full py-2 bg-slate-900 text-white font-bold rounded-xl text-xs"
          >
            Executar Backup Agora
          </button>
        </div>
      </div>
    </div>
  );
};
