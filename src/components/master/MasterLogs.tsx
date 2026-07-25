import React from 'react';
import { useApp } from '../../context/AppContext';
import { Terminal, ShieldAlert, CheckCircle2, AlertTriangle } from 'lucide-react';

export const MasterLogs: React.FC = () => {
  const logs = [
    { time: '12:15:02', event: 'AUTH_LOGIN_SUCCESS', user: 'lucas@techinova.com.br', ip: '189.40.22.10', status: 'OK' },
    { time: '12:10:44', event: 'AI_JOB_GENERATE', user: 'rh@techinova.com.br', ip: '189.40.22.10', status: 'OK' },
    { time: '12:05:12', event: 'ESOCIAL_BATCH_SEND', user: 'carla.dp@techinova.com.br', ip: '201.88.90.12', status: 'OK' },
    { time: '11:58:30', event: 'PAYSLIP_DOWNLOAD', user: 'candidate@gestrh.com.br', ip: '177.10.45.89', status: 'OK' }
  ];

  return (
    <div className="space-y-6 py-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Logs do Sistema & Auditoria de Segurança</h1>
        <p className="text-xs text-slate-500 mt-1">Trilha de auditoria LGPD de ações realizadas por usuários em todas as empresas</p>
      </div>

      <div className="bg-slate-950 text-slate-200 rounded-2xl p-5 border border-slate-800 shadow-xl font-mono text-xs space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 text-slate-400 font-sans font-bold">
          <span>Evento Registrado</span>
          <span>Endereço IP & Status</span>
        </div>

        <div className="space-y-2">
          {logs.map((log, idx) => (
            <div key={idx} className="flex items-center justify-between border-b border-slate-900 pb-2">
              <div>
                <span className="text-emerald-400 font-bold">[{log.time}] </span>
                <span className="text-purple-300 font-bold">{log.event} </span>
                <span className="text-slate-400">• {log.user}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-500">{log.ip}</span>
                <span className="px-2 py-0.5 bg-emerald-950 text-emerald-400 border border-emerald-800 rounded font-bold">
                  {log.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
