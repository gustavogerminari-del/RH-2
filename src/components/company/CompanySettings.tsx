import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Settings, Save, Building2, Lock, Bell, CheckCircle2 } from 'lucide-react';

export const CompanySettings: React.FC = () => {
  const { showToast } = useApp();
  const [companyName, setCompanyName] = useState('TechInova Software LTDA');
  const [cnpj, setCnpj] = useState('12.345.678/0001-90');
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [whatsappAlerts, setWhatsappAlerts] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Configurações da empresa salvas com sucesso!');
  };

  return (
    <div className="max-w-3xl mx-auto py-6 space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Configurações da Conta Empresarial</h1>
        <p className="text-xs text-slate-500 mt-1">Parâmetros de razão social, integração WhatsApp e notificações de RH</p>
      </div>

      <form onSubmit={handleSave} className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5 shadow-xs text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Razão Social</label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-medium"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">CNPJ</label>
            <input
              type="text"
              value={cnpj}
              onChange={(e) => setCnpj(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-medium"
            />
          </div>
        </div>

        <div className="space-y-3 pt-2 border-t border-slate-100">
          <h3 className="font-bold text-slate-900">Notificações Automáticas aos Candidatos</h3>
          
          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200">
            <div>
              <span className="font-bold text-slate-800 block">Notificações por E-mail</span>
              <span className="text-slate-500">Enviar atualizações de fases e convites para entrevistas via e-mail.</span>
            </div>
            <input
              type="checkbox"
              checked={emailAlerts}
              onChange={(e) => setEmailAlerts(e.target.checked)}
              className="rounded text-blue-600 w-4 h-4"
            />
          </div>

          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200">
            <div>
              <span className="font-bold text-slate-800 block">Notificações via WhatsApp Bot</span>
              <span className="text-slate-500">Disparar mensagens de lembretes e holerites no WhatsApp do colaborador.</span>
            </div>
            <input
              type="checkbox"
              checked={whatsappAlerts}
              onChange={(e) => setWhatsappAlerts(e.target.checked)}
              className="rounded text-blue-600 w-4 h-4"
            />
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs flex items-center gap-2 transition-colors shadow-xs"
          >
            <Save className="w-4 h-4" /> Salvar Configurações
          </button>
        </div>
      </form>
    </div>
  );
};
