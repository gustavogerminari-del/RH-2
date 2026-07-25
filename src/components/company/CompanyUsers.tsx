import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Users, Shield, Plus, Lock, CheckCircle2, Trash2 } from 'lucide-react';

export const CompanyUsers: React.FC = () => {
  const { showToast } = useApp();
  const [usersList, setUsersList] = useState([
    { id: '1', name: 'Lucas Germinari', email: 'lucas@techinova.com.br', role: 'Administrador RH', department: 'DHO' },
    { id: '2', name: 'Carla Silva', email: 'carla.dp@techinova.com.br', role: 'Departamento Pessoal', department: 'DP' },
    { id: '3', name: 'Rodrigo Mello', email: 'rodrigo.tech@techinova.com.br', role: 'Gestor Solicitante', department: 'Engenharia' }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Recrutador');

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    setUsersList([...usersList, {
      id: Date.now().toString(),
      name,
      email,
      role,
      department: 'RH'
    }]);
    setShowModal(false);
    showToast(`Usuário ${name} convidado com perfil ${role}!`);
  };

  return (
    <div className="space-y-6 py-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Usuários & Níveis de Acesso</h1>
          <p className="text-xs text-slate-500 mt-1">Gerencie permissões de Administradores, RH, Departamento Pessoal, Financeiro e Gestores</p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4" /> Convidar Novo Usuário
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 text-slate-500 uppercase font-semibold border-b border-slate-200">
              <th className="py-3.5 px-4">Usuário</th>
              <th className="py-3.5 px-4">Perfil / Permissão</th>
              <th className="py-3.5 px-4">Setor</th>
              <th className="py-3.5 px-4 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
            {usersList.map(u => (
              <tr key={u.id}>
                <td className="py-3 px-4">
                  <span className="font-bold text-slate-900 block">{u.name}</span>
                  <span className="text-slate-400 text-[11px]">{u.email}</span>
                </td>
                <td className="py-3 px-4">
                  <span className="px-2.5 py-1 bg-blue-50 text-blue-700 font-bold border border-blue-200 rounded-lg">
                    {u.role}
                  </span>
                </td>
                <td className="py-3 px-4 text-slate-600 font-semibold">{u.department}</td>
                <td className="py-3 px-4 text-right">
                  <button
                    onClick={() => {
                      setUsersList(usersList.filter(x => x.id !== u.id));
                      showToast('Acesso revogado com sucesso.');
                    }}
                    className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
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
            <h2 className="text-lg font-bold text-slate-900">Convidar Operador</h2>

            <form onSubmit={handleAddUser} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Nome Completo *</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Gabriel Santos"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">E-mail Corporativo *</label>
                <input
                  type="email"
                  required
                  placeholder="gabriel@techinova.com.br"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Nível de Permissão</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-bold"
                >
                  <option value="Administrador">Administrador Geral</option>
                  <option value="RH">Analista de RH & Recrutamento</option>
                  <option value="Departamento Pessoal">Departamento Pessoal</option>
                  <option value="Financeiro">Financeiro</option>
                  <option value="Gestor">Gestor de Área</option>
                  <option value="Recrutador">Recrutador Externo</option>
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
                  className="px-4 py-2 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700"
                >
                  Enviar Convite
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
