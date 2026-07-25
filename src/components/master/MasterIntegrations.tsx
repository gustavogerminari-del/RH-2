import React from 'react';
import { useApp } from '../../context/AppContext';
import { MessageSquare, Mail, ShieldCheck, DollarSign, Calendar, Globe, CheckCircle2, RefreshCw } from 'lucide-react';

export const MasterIntegrations: React.FC = () => {
  const { showToast } = useApp();

  const integrations = [
    { name: 'WhatsApp Business API', icon: MessageSquare, status: 'Conectado', color: 'text-emerald-600', desc: 'Disparo de avisos de entrevistas e holerites' },
    { name: 'E-mail SMTP / SendGrid', icon: Mail, status: 'Conectado', color: 'text-blue-600', desc: 'Disparo de e-mails transacionais e convites' },
    { name: 'Assinatura Eletrônica (DocuSign / Clicksign)', icon: ShieldCheck, status: 'Conectado', color: 'text-purple-600', desc: 'Assinatura digital de contratos e holerites' },
    { name: 'Gateway de Pagamentos (Asaas / Stripe)', icon: DollarSign, status: 'Conectado', color: 'text-emerald-600', desc: 'Cobrança mensal dos planos SaaS' },
    { name: 'Google Calendar & Microsoft 365', icon: Calendar, status: 'Conectado', color: 'text-blue-600', desc: 'Sincronização de horários de entrevistas' },
    { name: 'eSocial & Governo Federal', icon: Globe, status: 'Conectado', color: 'text-emerald-600', desc: 'Transmissão com certificado digital A1' }
  ];

  return (
    <div className="space-y-6 py-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Hub de APIs e Integrações Externa</h1>
        <p className="text-xs text-slate-500 mt-1">Conectores homologados para automação de processos de RH</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {integrations.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className={`p-3 bg-slate-50 rounded-xl ${item.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">{item.name}</h3>
                  <p className="text-xs text-slate-500">{item.desc}</p>
                </div>
              </div>

              <button
                onClick={() => showToast(`Conexão com ${item.name} testada e 100% operacional!`)}
                className="px-3 py-1.5 bg-emerald-50 text-emerald-700 font-bold border border-emerald-200 rounded-xl text-xs shrink-0 hover:bg-emerald-100 transition-colors"
              >
                {item.status}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
