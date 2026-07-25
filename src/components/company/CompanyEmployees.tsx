import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Employee } from '../../types';
import {
  Users,
  UserPlus,
  Search,
  Edit3,
  Eye,
  X,
  Building2,
  MapPin,
  CreditCard,
  Briefcase,
  UserCheck,
  CheckCircle2,
  FileText,
  DollarSign
} from 'lucide-react';

export const CompanyEmployees: React.FC = () => {
  const { employees, addEmployee, updateEmployee, showToast } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('Todos');
  const [showModal, setShowModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [viewingEmployee, setViewingEmployee] = useState<Employee | null>(null);

  const [activeFormTab, setActiveFormTab] = useState<'pessoal' | 'endereco' | 'contrato' | 'banco'>('pessoal');

  // Complete Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    cpf: '',
    rg: '',
    birthDate: '',
    gender: 'Prefiro não informar',
    maritalStatus: 'Solteiro(a)',
    // Address
    cep: '',
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: 'SP',
    // Contract
    role: '',
    department: 'Tecnologia',
    contractType: 'CLT' as 'CLT' | 'PJ' | 'Estágio' | 'Temporário',
    salary: 5000,
    admissionDate: new Date().toISOString().split('T')[0],
    ctps: '',
    pis: '',
    workHours: '44h semanais',
    status: 'Ativo' as 'Ativo' | 'Férias' | 'Licença' | 'Desligado',
    // Bank
    bank: 'Itaú Unibanco (341)',
    agency: '',
    account: '',
    pixKey: ''
  });

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      cpf: '',
      rg: '',
      birthDate: '',
      gender: 'Prefiro não informar',
      maritalStatus: 'Solteiro(a)',
      cep: '',
      street: '',
      number: '',
      complement: '',
      neighborhood: '',
      city: '',
      state: 'SP',
      role: '',
      department: 'Tecnologia',
      contractType: 'CLT',
      salary: 5000,
      admissionDate: new Date().toISOString().split('T')[0],
      ctps: '',
      pis: '',
      workHours: '44h semanais',
      status: 'Ativo',
      bank: 'Itaú Unibanco (341)',
      agency: '',
      account: '',
      pixKey: ''
    });
    setActiveFormTab('pessoal');
    setEditingEmployee(null);
  };

  const openNewEmployeeModal = () => {
    resetForm();
    setShowModal(true);
  };

  const openEditModal = (emp: Employee) => {
    setEditingEmployee(emp);
    setFormData({
      name: emp.name || '',
      email: emp.email || '',
      phone: emp.phone || '',
      cpf: emp.cpf || '',
      rg: emp.rg || '',
      birthDate: emp.birthDate || '',
      gender: emp.gender || 'Prefiro não informar',
      maritalStatus: emp.maritalStatus || 'Solteiro(a)',
      cep: emp.cep || '',
      street: emp.street || '',
      number: emp.number || '',
      complement: emp.complement || '',
      neighborhood: emp.neighborhood || '',
      city: emp.city || '',
      state: emp.state || 'SP',
      role: emp.role || '',
      department: emp.department || 'Tecnologia',
      contractType: emp.contractType || 'CLT',
      salary: emp.salary || 5000,
      admissionDate: emp.admissionDate || emp.hireDate || new Date().toISOString().split('T')[0],
      ctps: emp.ctps || '',
      pis: emp.pis || '',
      workHours: emp.workHours || '44h semanais',
      status: emp.status || 'Ativo',
      bank: emp.bank || 'Itaú Unibanco (341)',
      agency: emp.agency || '',
      account: emp.account || '',
      pixKey: emp.pixKey || ''
    });
    setActiveFormTab('pessoal');
    setShowModal(true);
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.role) {
      showToast('Por favor preencha os campos obrigatórios (Nome, Email, Cargo).');
      return;
    }

    if (editingEmployee) {
      updateEmployee(editingEmployee.id, {
        ...formData,
        salary: Number(formData.salary)
      });
      showToast(`Ficha de ${formData.name} atualizada com sucesso!`);
    } else {
      addEmployee({
        ...formData,
        hireDate: formData.admissionDate,
        salary: Number(formData.salary)
      });
      showToast(`Colaborador ${formData.name} admitido com sucesso!`);
    }

    setShowModal(false);
    resetForm();
  };

  const filteredEmployees = employees.filter(e => {
    const matchesSearch =
      e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (e.cpf && e.cpf.includes(searchTerm));
    const matchesDept = selectedDept === 'Todos' || e.department === selectedDept;
    return matchesSearch && matchesDept;
  });

  const totalPayroll = employees.reduce((acc, emp) => acc + (emp.salary || 0), 0);
  const activeCount = employees.filter(e => e.status === 'Ativo').length;

  return (
    <div className="space-y-6 py-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Gestão de Colaboradores & Admissão</h1>
          <p className="text-xs text-slate-500 mt-1">
            Cadastro completo com endereço, documentos (RG, CPF, PIS, CTPS) e dados bancários
          </p>
        </div>

        <button
          onClick={openNewEmployeeModal}
          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-sm transition-all shrink-0 cursor-pointer"
        >
          <UserPlus className="w-4 h-4" /> Cadastrar Novo Colaborador
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-medium">Total de Colaboradores</span>
            <div className="text-xl font-black text-slate-900">{employees.length}</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <UserCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-medium">Ativos no Sistema</span>
            <div className="text-xl font-black text-emerald-600">{activeCount}</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-500 font-medium">Folha Salarial Estimada</span>
            <div className="text-xl font-black text-indigo-900">
              R$ {totalPayroll.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center gap-4">
        <div className="flex-1 flex items-center gap-3 bg-slate-50 px-3 py-2 rounded-xl border border-slate-200 w-full">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            placeholder="Buscar por nome, CPF, cargo ou e-mail..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent text-xs text-slate-800 placeholder-slate-400 focus:outline-none w-full"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <span className="text-xs font-bold text-slate-500 shrink-0">Setor:</span>
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-xs text-slate-800 font-bold rounded-xl px-3 py-2 focus:outline-none w-full md:w-auto"
          >
            <option value="Todos">Todos os Setores</option>
            <option value="Tecnologia">Tecnologia</option>
            <option value="Marketing">Marketing</option>
            <option value="Financeiro">Financeiro</option>
            <option value="Recursos Humanos">Recursos Humanos</option>
            <option value="Design">Design & Produto</option>
          </select>
        </div>
      </div>

      {/* Employees Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-500 uppercase font-semibold border-b border-slate-200">
                <th className="py-3.5 px-4">Colaborador & Documento</th>
                <th className="py-3.5 px-4">Cargo & Setor</th>
                <th className="py-3.5 px-4">Contato & Cidade</th>
                <th className="py-3.5 px-4">Admissão</th>
                <th className="py-3.5 px-4">Salário Base</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
              {filteredEmployees.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400">
                    Nenhum colaborador encontrado com os filtros aplicados.
                  </td>
                </tr>
              ) : (
                filteredEmployees.map(emp => (
                  <tr key={emp.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 font-bold flex items-center justify-center shrink-0 text-sm">
                          {emp.name.charAt(0)}
                        </div>
                        <div>
                          <span className="font-bold text-slate-900 block">{emp.name}</span>
                          <span className="text-slate-400 text-[11px]">
                            CPF: {emp.cpf || 'Não informado'} {emp.rg ? `| RG: ${emp.rg}` : ''}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-slate-800 block">{emp.role}</span>
                      <span className="text-slate-400 text-[11px]">{emp.department} • {emp.contractType || 'CLT'}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="text-slate-700 block">{emp.email}</span>
                      <span className="text-slate-400 text-[11px]">{emp.phone || 'Tel não inf.'} {emp.city ? `• ${emp.city}/${emp.state || 'SP'}` : ''}</span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 font-semibold">
                      {emp.admissionDate || emp.hireDate || '—'}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-slate-900">
                      R$ {emp.salary.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-1 font-bold border rounded-full text-[11px] ${
                        emp.status === 'Ativo'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : emp.status === 'Férias'
                          ? 'bg-amber-50 text-amber-700 border-amber-200'
                          : 'bg-slate-100 text-slate-600 border-slate-200'
                      }`}>
                        {emp.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-1">
                      <button
                        onClick={() => setViewingEmployee(emp)}
                        title="Ver Ficha Completa"
                        className="p-1.5 hover:bg-slate-100 text-slate-600 rounded-lg transition-colors inline-flex items-center"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => openEditModal(emp)}
                        title="Editar Ficha"
                        className="p-1.5 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors inline-flex items-center"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Registration / Edit Employee */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full my-8 border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold">
                  {editingEmployee ? `Editar Colaborador: ${editingEmployee.name}` : 'Admitir Novo Colaborador'}
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Preencha todos os dados necessários para registro e contrato de trabalho
                </p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-slate-800 text-slate-400 hover:text-white rounded-xl transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Tabs inside Form */}
            <div className="flex border-b border-slate-200 bg-slate-50 px-6 gap-2 pt-2">
              <button
                type="button"
                onClick={() => setActiveFormTab('pessoal')}
                className={`py-3 px-3 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeFormTab === 'pessoal'
                    ? 'border-blue-600 text-blue-600 bg-white rounded-t-xl'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <UserCheck className="w-4 h-4" /> Dados Pessoais
              </button>
              <button
                type="button"
                onClick={() => setActiveFormTab('endereco')}
                className={`py-3 px-3 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeFormTab === 'endereco'
                    ? 'border-blue-600 text-blue-600 bg-white rounded-t-xl'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <MapPin className="w-4 h-4" /> Endereço
              </button>
              <button
                type="button"
                onClick={() => setActiveFormTab('contrato')}
                className={`py-3 px-3 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeFormTab === 'contrato'
                    ? 'border-blue-600 text-blue-600 bg-white rounded-t-xl'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Briefcase className="w-4 h-4" /> Contrato & Cargo
              </button>
              <button
                type="button"
                onClick={() => setActiveFormTab('banco')}
                className={`py-3 px-3 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeFormTab === 'banco'
                    ? 'border-blue-600 text-blue-600 bg-white rounded-t-xl'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <CreditCard className="w-4 h-4" /> Dados Bancários
              </button>
            </div>

            {/* Form Body */}
            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 text-xs flex-1">
              {/* TAB 1: DADOS PESSOAIS */}
              {activeFormTab === 'pessoal' && (
                <div className="space-y-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Nome Completo *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Amanda Silva Lima"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">E-mail Corporativo / Pessoal *</label>
                      <input
                        type="email"
                        required
                        placeholder="amanda@empresa.com.br"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Telefone / WhatsApp *</label>
                      <input
                        type="text"
                        placeholder="(11) 99887-6655"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">CPF *</label>
                      <input
                        type="text"
                        placeholder="000.000.000-00"
                        value={formData.cpf}
                        onChange={(e) => handleInputChange('cpf', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">RG (Número + Órgão Expedidor)</label>
                      <input
                        type="text"
                        placeholder="12.345.678-9 SSP/SP"
                        value={formData.rg}
                        onChange={(e) => handleInputChange('rg', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Data de Nascimento</label>
                      <input
                        type="date"
                        value={formData.birthDate}
                        onChange={(e) => handleInputChange('birthDate', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Gênero</label>
                      <select
                        value={formData.gender}
                        onChange={(e) => handleInputChange('gender', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-bold text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      >
                        <option value="Feminino">Feminino</option>
                        <option value="Masculino">Masculino</option>
                        <option value="Não-Binário">Não-Binário</option>
                        <option value="Prefiro não informar">Prefiro não informar</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Estado Civil</label>
                      <select
                        value={formData.maritalStatus}
                        onChange={(e) => handleInputChange('maritalStatus', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-bold text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      >
                        <option value="Solteiro(a)">Solteiro(a)</option>
                        <option value="Casado(a)">Casado(a)</option>
                        <option value="Divorciado(a)">Divorciado(a)</option>
                        <option value="União Estável">União Estável</option>
                        <option value="Viúvo(a)">Viúvo(a)</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: ENDEREÇO */}
              {activeFormTab === 'endereco' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">CEP</label>
                      <input
                        type="text"
                        placeholder="01001-000"
                        value={formData.cep}
                        onChange={(e) => handleInputChange('cep', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block font-bold text-slate-700 mb-1">Logradouro / Rua</label>
                      <input
                        type="text"
                        placeholder="Av. Paulista, Alameda Santos, etc."
                        value={formData.street}
                        onChange={(e) => handleInputChange('street', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Número</label>
                      <input
                        type="text"
                        placeholder="1000"
                        value={formData.number}
                        onChange={(e) => handleInputChange('number', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block font-bold text-slate-700 mb-1">Complemento</label>
                      <input
                        type="text"
                        placeholder="Apto 42, Bloco B"
                        value={formData.complement}
                        onChange={(e) => handleInputChange('complement', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Bairro</label>
                      <input
                        type="text"
                        placeholder="Bela Vista"
                        value={formData.neighborhood}
                        onChange={(e) => handleInputChange('neighborhood', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Cidade</label>
                      <input
                        type="text"
                        placeholder="São Paulo"
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Estado (UF)</label>
                      <input
                        type="text"
                        placeholder="SP"
                        maxLength={2}
                        value={formData.state}
                        onChange={(e) => handleInputChange('state', e.target.value.toUpperCase())}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none uppercase"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: CONTRATO & CARGO */}
              {activeFormTab === 'contrato' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Cargo *</label>
                      <input
                        type="text"
                        required
                        placeholder="Ex: Desenvolvedor Frontend Senior"
                        value={formData.role}
                        onChange={(e) => handleInputChange('role', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Departamento *</label>
                      <select
                        value={formData.department}
                        onChange={(e) => handleInputChange('department', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-bold text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      >
                        <option value="Tecnologia">Tecnologia</option>
                        <option value="Design">Design & Produto</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Financeiro">Financeiro</option>
                        <option value="Recursos Humanos">Recursos Humanos</option>
                        <option value="Comercial">Comercial</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Tipo de Contrato</label>
                      <select
                        value={formData.contractType}
                        onChange={(e) => handleInputChange('contractType', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-bold text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      >
                        <option value="CLT">CLT</option>
                        <option value="PJ">PJ (Pessoa Jurídica)</option>
                        <option value="Estágio">Estágio</option>
                        <option value="Temporário">Temporário</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Salário Bruto (R$) *</label>
                      <input
                        type="number"
                        value={formData.salary}
                        onChange={(e) => handleInputChange('salary', Number(e.target.value))}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-bold text-emerald-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Data de Admissão</label>
                      <input
                        type="date"
                        value={formData.admissionDate}
                        onChange={(e) => handleInputChange('admissionDate', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Carteira de Trabalho (CTPS)</label>
                      <input
                        type="text"
                        placeholder="1234567 / Série 001"
                        value={formData.ctps}
                        onChange={(e) => handleInputChange('ctps', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">PIS / PASEP / NIT</label>
                      <input
                        type="text"
                        placeholder="123.45678.90-1"
                        value={formData.pis}
                        onChange={(e) => handleInputChange('pis', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Carga Horária</label>
                      <input
                        type="text"
                        placeholder="44h semanais"
                        value={formData.workHours}
                        onChange={(e) => handleInputChange('workHours', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Status no Quadro</label>
                    <select
                      value={formData.status}
                      onChange={(e) => handleInputChange('status', e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-bold text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    >
                      <option value="Ativo">Ativo</option>
                      <option value="Férias">Férias</option>
                      <option value="Licença">Licença</option>
                      <option value="Desligado">Desligado</option>
                    </select>
                  </div>
                </div>
              )}

              {/* TAB 4: DADOS BANCÁRIOS */}
              {activeFormTab === 'banco' && (
                <div className="space-y-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Instituição Bancária</label>
                    <input
                      type="text"
                      placeholder="Ex: Itaú Unibanco (341) ou Nubank (260)"
                      value={formData.bank}
                      onChange={(e) => handleInputChange('bank', e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Agência</label>
                      <input
                        type="text"
                        placeholder="0001"
                        value={formData.agency}
                        onChange={(e) => handleInputChange('agency', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Conta Corrente com Dígito</label>
                      <input
                        type="text"
                        placeholder="12345-6"
                        value={formData.account}
                        onChange={(e) => handleInputChange('account', e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Chave PIX (CPF, E-mail ou Telefone)</label>
                    <input
                      type="text"
                      placeholder="amanda@empresa.com.br"
                      value={formData.pixKey}
                      onChange={(e) => handleInputChange('pixKey', e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* Modal Footer Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <div className="flex gap-2">
                  {activeFormTab !== 'pessoal' && (
                    <button
                      type="button"
                      onClick={() => {
                        if (activeFormTab === 'banco') setActiveFormTab('contrato');
                        else if (activeFormTab === 'contrato') setActiveFormTab('endereco');
                        else if (activeFormTab === 'endereco') setActiveFormTab('pessoal');
                      }}
                      className="px-3.5 py-2 border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      Voltar
                    </button>
                  )}
                  {activeFormTab !== 'banco' && (
                    <button
                      type="button"
                      onClick={() => {
                        if (activeFormTab === 'pessoal') setActiveFormTab('endereco');
                        else if (activeFormTab === 'endereco') setActiveFormTab('contrato');
                        else if (activeFormTab === 'contrato') setActiveFormTab('banco');
                      }}
                      className="px-3.5 py-2 bg-slate-100 text-slate-800 font-bold rounded-xl hover:bg-slate-200 transition-colors cursor-pointer"
                    >
                      Próxima Aba
                    </button>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-sm transition-colors cursor-pointer"
                  >
                    {editingEmployee ? 'Salvar Alterações' : 'Concluir Admissão'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Viewing Employee Dossier Modal */}
      {viewingEmployee && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 border border-slate-200 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white font-black flex items-center justify-center text-xl shadow-sm">
                  {viewingEmployee.name.charAt(0)}
                </div>
                <div>
                  <h2 className="text-lg font-black text-slate-900">{viewingEmployee.name}</h2>
                  <p className="text-xs text-slate-500 font-medium">
                    {viewingEmployee.role} • {viewingEmployee.department}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setViewingEmployee(null)}
                className="p-1.5 hover:bg-slate-100 text-slate-400 rounded-xl"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              {/* Box 1: Pessoal */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                <h3 className="font-bold text-slate-900 flex items-center gap-1.5 text-xs text-blue-700">
                  <UserCheck className="w-4 h-4" /> Dados Pessoais & Documentos
                </h3>
                <div className="grid grid-cols-2 gap-2 text-slate-600">
                  <div><strong className="text-slate-800">E-mail:</strong> {viewingEmployee.email}</div>
                  <div><strong className="text-slate-800">Telefone:</strong> {viewingEmployee.phone || '—'}</div>
                  <div><strong className="text-slate-800">CPF:</strong> {viewingEmployee.cpf || '—'}</div>
                  <div><strong className="text-slate-800">RG:</strong> {viewingEmployee.rg || '—'}</div>
                  <div><strong className="text-slate-800">Data Nasc.:</strong> {viewingEmployee.birthDate || '—'}</div>
                  <div><strong className="text-slate-800">Estado Civil:</strong> {viewingEmployee.maritalStatus || '—'}</div>
                </div>
              </div>

              {/* Box 2: Endereço */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                <h3 className="font-bold text-slate-900 flex items-center gap-1.5 text-xs text-blue-700">
                  <MapPin className="w-4 h-4" /> Endereço
                </h3>
                <p className="text-slate-700">
                  {viewingEmployee.street ? (
                    `${viewingEmployee.street}, nº ${viewingEmployee.number || 'S/N'} ${viewingEmployee.complement ? `(${viewingEmployee.complement})` : ''} - ${viewingEmployee.neighborhood || ''}, ${viewingEmployee.city || ''}/${viewingEmployee.state || ''} CEP: ${viewingEmployee.cep || ''}`
                  ) : (
                    'Endereço completo não cadastrado.'
                  )}
                </p>
              </div>

              {/* Box 3: Contrato */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                <h3 className="font-bold text-slate-900 flex items-center gap-1.5 text-xs text-blue-700">
                  <Briefcase className="w-4 h-4" /> Contrato & Trabalho
                </h3>
                <div className="grid grid-cols-2 gap-2 text-slate-600">
                  <div><strong className="text-slate-800">Tipo Contrato:</strong> {viewingEmployee.contractType || 'CLT'}</div>
                  <div><strong className="text-slate-800">Salário:</strong> R$ {viewingEmployee.salary.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</div>
                  <div><strong className="text-slate-800">Admissão:</strong> {viewingEmployee.admissionDate || viewingEmployee.hireDate || '—'}</div>
                  <div><strong className="text-slate-800">Carga Horária:</strong> {viewingEmployee.workHours || '44h semanais'}</div>
                  <div><strong className="text-slate-800">CTPS:</strong> {viewingEmployee.ctps || '—'}</div>
                  <div><strong className="text-slate-800">PIS/PASEP:</strong> {viewingEmployee.pis || '—'}</div>
                </div>
              </div>

              {/* Box 4: Dados Bancários */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                <h3 className="font-bold text-slate-900 flex items-center gap-1.5 text-xs text-blue-700">
                  <CreditCard className="w-4 h-4" /> Dados Bancários
                </h3>
                <div className="grid grid-cols-2 gap-2 text-slate-600">
                  <div><strong className="text-slate-800">Banco:</strong> {viewingEmployee.bank || 'Não informado'}</div>
                  <div><strong className="text-slate-800">Agência / Conta:</strong> {viewingEmployee.agency || '—'} / {viewingEmployee.account || '—'}</div>
                  <div className="col-span-2"><strong className="text-slate-800">Chave PIX:</strong> {viewingEmployee.pixKey || '—'}</div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => setViewingEmployee(null)}
                className="px-4 py-2 border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50"
              >
                Fechar
              </button>
              <button
                onClick={() => {
                  const emp = viewingEmployee;
                  setViewingEmployee(null);
                  openEditModal(emp);
                }}
                className="px-4 py-2 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700"
              >
                Editar Ficha
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

