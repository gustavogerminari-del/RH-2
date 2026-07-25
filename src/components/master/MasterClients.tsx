import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Building2, Plus, Search, CheckCircle2, ShieldAlert, Edit3, Trash2 } from 'lucide-react';

export const MasterClients: React.FC = () => {
  const { showToast } = useApp();
  const [clients, setClients] = useState([
    { id: '1', name: 'TechInova Software LTDA', cnpj: '12.345.678/0001-90', plan: 'Enterprise Full', users: 120, status: 'Ativo', mrr: 3500 },
    { id: '2', name: 'Grupo Varejo Mais SA', cnpj: '98.765.432/0001-11', plan: 'Corporativo Pro', users: 450, status: 'Ativo', mrr: 8900 },
    { id: '3', name: 'Logística Express Brasil', cnpj: '45.112.334/0001-22', plan: 'Essencial DP', users: 85, status: 'Ativo', mrr: 1800 },
    { id: '4', name: 'Agência Digital Spark', cnpj: '33.889.990/0001-55', plan: 'Recrutamento IA', users: 32, status: 'Ativo', mrr: 990 }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [plan, setPlan] = useState('Enterprise Full');

  const handleAddClient = (e: React.FormEvent) => {
    e.preventDefault();
    setClients([...clients, {
      id: Date.now().toString(),
      name,
      cnpj,
      plan,
      users: 50,
      status: 'Ativo',
      mrr: 2500
    }]);
    setShowModal(false);
    showToast(`Instância do cliente ${name} provisionada com sucesso!`);
  };

  return (
    <div className="space-y-6 py-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Gestão de Clientes Multi-tenant</h1>
          <p className="text-xs text-slate-500 mt-1">Gerencie instâncias isoladas de empresas contratantes da plataforma</p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4" /> Provisionar Nova Empresa
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 text-slate-500 uppercase font-semibold border-b border-slate-200">
              <th className="py-3.5 px-4">Empresa Tenant</th>
              <th className="py-3.5 px-4">CNPJ</th>
              <th className="py-3.5 px-4">Plano Contratado</th>
              <th className="py-3.5 px-4">MRR</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
            {clients.map(c => (
              <tr key={c.id}>
                <td className="py-3.5 px-4">
                  <span className="font-bold text-slate-900 block">{c.name}</span>
                  <span className="text-slate-400 text-[11px]">{c.users} colaboradores cadastrados</span>
                </td>
                <td className="py-3.5 px-4 text-slate-600">{c.cnpj}</td>
                <td className="py-3.5 px-4 font-bold text-purple-700">{c.plan}</td>
                <td className="py-3.5 px-4 font-black text-emerald-600">
                  R$ {c.mrr.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </td>
                <td className="py-3.5 px-4">
                  <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 font-bold border border-emerald-200 rounded-full text-[11px]">
                    {c.status}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-right">
                  <button
                    onClick={() => showToast(`Ambiente de ${c.name} aberto para inspeção master.`)}
                    className="p-1.5 hover:bg-slate-100 text-slate-600 rounded-lg transition-colors"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 border border-slate-200 shadow-2xl">
            <h2 className="text-lg font-bold text-slate-900">Provisionar Cliente Tenant</h2>

            <form onSubmit={handleAddClient} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Razão Social *</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Empresa Exemplo S.A."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">CNPJ *</label>
                <input
                  type="text"
                  required
                  placeholder="00.000.000/0001-00"
                  value={cnpj}
                  onChange={(e) => setCnpj(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Plano SaaS</label>
                <select
                  value={plan}
                  onChange={(e) => setPlan(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-bold"
                >
                  <option value="Enterprise Full">Enterprise Full (Todos os Módulos)</option>
                  <option value="Corporativo Pro">Corporativo Pro</option>
                  <option value="Essencial DP">Essencial DP & Folha</option>
                  <option value="Recrutamento IA">Recrutamento & Seleção IA</option>
                </select>
              </div>

              <div className="flex gap-2 pt-2 justify-end">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 font-bold rounded-xl"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-700"
                >
                  Provisionar Instância
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
