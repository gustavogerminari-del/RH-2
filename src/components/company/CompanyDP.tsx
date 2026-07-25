import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Users,
  DollarSign,
  Clock,
  TrendingDown,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  Building2,
  FileText,
  ShieldCheck,
  Send,
  Download,
  Filter,
  Search,
  Smile,
  Zap,
  BarChart2,
  Briefcase,
  UserX,
  PieChart as PieChartIcon,
  RefreshCw,
  Eye,
  Check,
  XCircle,
  FileSpreadsheet,
  Award,
  ChevronRight,
  Info,
  Video,
  Radio
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

// --- MOCK DATA FOR SENIOR HCM GO UP DASHBOARD ---

const ADMISSIONS_DISMISSALS_DATA = [
  { month: 'Ago/25', admissoes: 4, desligamentos: 1, saldo: +3 },
  { month: 'Set/25', admissoes: 5, desligamentos: 2, saldo: +3 },
  { month: 'Out/25', admissoes: 3, desligamentos: 1, saldo: +2 },
  { month: 'Nov/25', admissoes: 6, desligamentos: 2, saldo: +4 },
  { month: 'Dez/25', admissoes: 2, desligamentos: 3, saldo: -1 },
  { month: 'Jan/26', admissoes: 8, desligamentos: 2, saldo: +6 },
  { month: 'Fev/26', admissoes: 4, desligamentos: 1, saldo: +3 },
  { month: 'Mar/26', admissoes: 7, desligamentos: 2, saldo: +5 },
  { month: 'Abr/26', admissoes: 5, desligamentos: 3, saldo: +2 },
  { month: 'Mai/26', admissoes: 6, desligamentos: 1, saldo: +5 },
  { month: 'Jun/26', admissoes: 4, desligamentos: 2, saldo: +2 },
  { month: 'Jul/26', admissoes: 6, desligamentos: 1, saldo: +5 },
];

const PAYROLL_EVOLUTION_DATA = [
  { month: 'Ago/25', folhaBruta: 490, encargos: 181, beneficios: 42, total: 713 },
  { month: 'Set/25', folhaBruta: 502, encargos: 185, beneficios: 43, total: 730 },
  { month: 'Out/25', folhaBruta: 510, encargos: 188, beneficios: 44, total: 742 },
  { month: 'Nov/25', folhaBruta: 525, encargos: 194, beneficios: 45, total: 764 },
  { month: 'Dez/25', folhaBruta: 560, encargos: 207, beneficios: 48, total: 815 },
  { month: 'Jan/26', folhaBruta: 540, encargos: 199, beneficios: 46, total: 785 },
  { month: 'Fev/26', folhaBruta: 548, encargos: 202, beneficios: 47, total: 797 },
  { month: 'Mar/26', folhaBruta: 562, encargos: 207, beneficios: 48, total: 817 },
  { month: 'Abr/26', folhaBruta: 568, encargos: 210, beneficios: 49, total: 827 },
  { month: 'Mai/26', folhaBruta: 575, encargos: 212, beneficios: 50, total: 837 },
  { month: 'Jun/26', folhaBruta: 580, encargos: 214, beneficios: 51, total: 845 },
  { month: 'Jul/26', folhaBruta: 584, encargos: 216, beneficios: 52, total: 852 },
];

const DEPARTMENT_DISTRIBUTION = [
  { name: 'Tecnologia & IA', value: 54, color: '#3b82f6' },
  { name: 'Operações & Logística', value: 36, color: '#10b981' },
  { name: 'Comercial & Vendas', value: 26, color: '#f59e0b' },
  { name: 'Financeiro & RH', value: 14, color: '#8b5cf6' },
  { name: 'Marketing & Produto', value: 12, color: '#ec4899' },
];

const TIME_BANK_BALANCE_DATA = [
  { month: 'Jan/26', positivo: 420, negativo: -45, saldoLiquido: 375 },
  { month: 'Fev/26', positivo: 480, negativo: -50, saldoLiquido: 430 },
  { month: 'Mar/26', positivo: 510, negativo: -38, saldoLiquido: 472 },
  { month: 'Abr/26', positivo: 560, negativo: -60, saldoLiquido: 500 },
  { month: 'Mai/26', positivo: 610, negativo: -40, saldoLiquido: 570 },
  { month: 'Jun/26', positivo: 580, negativo: -75, saldoLiquido: 505 },
  { month: 'Jul/26', positivo: 640, negativo: -35, saldoLiquido: 605 },
];

const TURNOVER_24m_DATA = [
  { month: 'Set/24', taxa: 1.8, meta: 2.0, voluntario: 1.2, involuntario: 0.6 },
  { month: 'Nov/24', taxa: 2.1, meta: 2.0, voluntario: 1.5, involuntario: 0.6 },
  { month: 'Jan/25', taxa: 1.5, meta: 2.0, voluntario: 1.0, involuntario: 0.5 },
  { month: 'Mar/25', taxa: 1.9, meta: 2.0, voluntario: 1.3, involuntario: 0.6 },
  { month: 'Mai/25', taxa: 1.4, meta: 2.0, voluntario: 0.9, involuntario: 0.5 },
  { month: 'Jul/25', taxa: 2.3, meta: 2.0, voluntario: 1.6, involuntario: 0.7 },
  { month: 'Set/25', taxa: 1.6, meta: 2.0, voluntario: 1.1, involuntario: 0.5 },
  { month: 'Nov/25', taxa: 1.3, meta: 2.0, voluntario: 0.9, involuntario: 0.4 },
  { month: 'Jan/26', taxa: 1.7, meta: 2.0, voluntario: 1.2, involuntario: 0.5 },
  { month: 'Mar/26', taxa: 1.4, meta: 2.0, voluntario: 1.0, involuntario: 0.4 },
  { month: 'Mai/26', taxa: 1.1, meta: 2.0, voluntario: 0.8, involuntario: 0.3 },
  { month: 'Jul/26', taxa: 1.2, meta: 2.0, voluntario: 0.9, involuntario: 0.3 },
];

// Employee List
const DETAILED_EMPLOYEES = [
  { id: 'EMP-001', name: 'Ana Beatriz Souza', role: 'Desenvolvedora Senior', department: 'Tecnologia & IA', contractType: 'CLT', location: 'Matriz SP', salary: 12500, status: 'Ativo', hireDate: '2022-03-15', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150' },
  { id: 'EMP-002', name: 'Carlos Eduardo Lima', role: 'Gerente Comercial', department: 'Comercial & Vendas', contractType: 'CLT', location: 'Filial RJ', salary: 14200, status: 'Ativo', hireDate: '2021-08-01', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150' },
  { id: 'EMP-003', name: 'Mariana Oliveira', role: 'Analista de RH Pleno', department: 'Financeiro & RH', contractType: 'CLT', location: 'Matriz SP', salary: 6800, status: 'Férias', hireDate: '2023-01-10', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150' },
  { id: 'EMP-004', name: 'Fernando Ribeiro', role: 'Coordenador de Operações', department: 'Operações & Logística', contractType: 'CLT', location: 'Filial BH', salary: 9500, status: 'Ativo', hireDate: '2020-05-20', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150' },
  { id: 'EMP-005', name: 'Juliana Paes Castro', role: 'Designer de Produto', department: 'Marketing & Produto', contractType: 'PJ', location: 'Hub Remoto', salary: 8500, status: 'Ativo', hireDate: '2024-02-01', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150' },
  { id: 'EMP-006', name: 'Lucas Germinari', role: 'DevOps & Cloud Engineer', department: 'Tecnologia & IA', contractType: 'CLT', location: 'Matriz SP', salary: 13800, status: 'Ativo', hireDate: '2022-11-14', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150' },
  { id: 'EMP-007', name: 'Patricia Mendes', role: 'Analista Financeiro', department: 'Financeiro & RH', contractType: 'CLT', location: 'Filial RJ', salary: 6200, status: 'Afastado', hireDate: '2023-06-01', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150' },
  { id: 'EMP-008', name: 'Estevão Vasconcelos', role: 'Estagiário de Dados', department: 'Tecnologia & IA', contractType: 'Estágio', location: 'Matriz SP', salary: 2200, status: 'Ativo', hireDate: '2026-01-15', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150' },
  { id: 'EMP-009', name: 'Roberto Alencar', role: 'Supervisor de Logística', department: 'Operações & Logística', contractType: 'CLT', location: 'Filial BH', salary: 7400, status: 'Desligado', hireDate: '2022-08-01', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150' },
];

// Scheduled & Executed Vacations Table Data
const VACATIONS_FULL_LIST = [
  { id: 'VAC-101', name: 'Mariana Oliveira', dept: 'Financeiro & RH', period: '2025/2026', startDate: '2026-07-10', endDate: '2026-07-30', days: 20, abono: 'Sim (10 dias)', status: 'Em Gozo', valorAdiantado: 'R$ 6.044,00' },
  { id: 'VAC-102', name: 'Ana Beatriz Souza', dept: 'Tecnologia & IA', period: '2024/2025', startDate: '2026-08-01', endDate: '2026-08-30', days: 30, abono: 'Não', status: 'Programada', valorAdiantado: 'R$ 16.666,00' },
  { id: 'VAC-103', name: 'Carlos Eduardo Lima', dept: 'Comercial & Vendas', period: '2024/2025', startDate: '2026-09-15', endDate: '2026-10-05', days: 20, abono: 'Sim (10 dias)', status: 'Programada', valorAdiantado: 'R$ 12.622,00' },
  { id: 'VAC-104', name: 'Fernando Ribeiro', dept: 'Operações & Logística', period: '2024/2025', startDate: '2026-05-02', endDate: '2026-06-01', days: 30, abono: 'Não', status: 'Realizada', valorAdiantado: 'R$ 12.666,00' },
  { id: 'VAC-105', name: 'Lucas Germinari', dept: 'Tecnologia & IA', period: '2025/2026', startDate: '2026-11-01', endDate: '2026-11-20', days: 20, abono: 'Sim (10 dias)', status: 'Pendente Aprovação', valorAdiantado: 'R$ 12.266,00' },
];

// Terminations / Rescisões Data
const RESCISIONS_SUMMARY = [
  { motivo: 'Sem Justa Causa (Iniciativa Empresa)', qtd: 8, tempoMedioMeses: 22, valorMedioRescisao: 'R$ 28.450,00', custoAvisoPrevio: 'R$ 8.900,00', fgtsMulta: 'R$ 6.200,00' },
  { motivo: 'Pedido de Demissão (Iniciativa Empregado)', qtd: 5, tempoMedioMeses: 16, valorMedioRescisao: 'R$ 11.200,00', custoAvisoPrevio: 'R$ 0,00', fgtsMulta: 'R$ 0,00' },
  { motivo: 'Acordo Trabalhista (Art. 484-A CLT)', qtd: 3, tempoMedioMeses: 28, valorMedioRescisao: 'R$ 18.900,00', custoAvisoPrevio: 'R$ 3.500,00', fgtsMulta: 'R$ 2.800,00' },
  { motivo: 'Término de Contrato de Experiência', qtd: 2, tempoMedioMeses: 3, valorMedioRescisao: 'R$ 4.100,00', custoAvisoPrevio: 'R$ 0,00', fgtsMulta: 'R$ 0,00' },
];

// Electronic Timeclock & Point Integration Data
const PONTO_LOGS = [
  { id: 'PNT-01', colab: 'Ana Beatriz Souza', dept: 'Tecnologia & IA', horasTrabalhadas: '168h 30m', atrasos: '0m', horaExtra: '8h 30m', bancoSaldo: '+24h 15m', ocorrencias: 'Normal' },
  { id: 'PNT-02', colab: 'Carlos Eduardo Lima', dept: 'Comercial & Vendas', horasTrabalhadas: '172h 10m', atrasos: '15m', horaExtra: '12h 10m', bancoSaldo: '+18h 40m', ocorrencias: 'Normal' },
  { id: 'PNT-03', colab: 'Mariana Oliveira', dept: 'Financeiro & RH', horasTrabalhadas: '160h 00m', atrasos: '0m', horaExtra: '0h 00m', bancoSaldo: '0h 00m', ocorrencias: 'Férias' },
  { id: 'PNT-04', colab: 'Fernando Ribeiro', dept: 'Operações & Logística', horasTrabalhadas: '182h 40m', atrasos: '45m', horaExtra: '22h 40m', bancoSaldo: '+42h 00m', ocorrencias: 'Alerta Horas Excedentes' },
  { id: 'PNT-05', colab: 'Lucas Germinari', dept: 'Tecnologia & IA', horasTrabalhadas: '165h 15m', atrasos: '0m', horaExtra: '5h 15m', bancoSaldo: '+12h 30m', ocorrencias: 'Normal' },
  { id: 'PNT-06', colab: 'Estevão Vasconcelos', dept: 'Tecnologia & IA', horasTrabalhadas: '120h 00m', atrasos: '30m', horaExtra: '0h 00m', bancoSaldo: '-2h 30m', ocorrencias: 'Atraso Frequente' },
];

// eSocial Events Status
const ESOCIAL_EVENTS = [
  { code: 'S-1000', name: 'Informações do Empregador', tipo: 'Tabela', status: 'Enviado & Processado', recibo: '1.2.202607.000192837', data: '2026-07-01' },
  { code: 'S-1200', name: 'Remuneração do Trabalhador', tipo: 'Periódico', status: 'Pronto para Envio', recibo: 'Pendente', data: '2026-07-20' },
  { code: 'S-1210', name: 'Pagamentos de Rendimentos', tipo: 'Periódico', status: 'Pronto para Envio', recibo: 'Pendente', data: '2026-07-20' },
  { code: 'S-2200', name: 'Cadastramento Inicial e Admissão', tipo: 'Não Periódico', status: 'Enviado & Processado', recibo: '1.2.202607.000198421', data: '2026-07-15' },
  { code: 'S-2206', name: 'Alteração de Contrato de Trabalho', tipo: 'Não Periódico', status: 'Enviado & Processado', recibo: '1.2.202607.000201192', data: '2026-07-18' },
  { code: 'S-2230', name: 'Afastamento Temporário', tipo: 'Não Periódico', status: 'Enviado & Processado', recibo: '1.2.202607.000203341', data: '2026-07-19' },
  { code: 'S-2299', name: 'Desligamento de Colaborador', tipo: 'Não Periódico', status: 'Em Análise eSocial', recibo: 'Pendente', data: '2026-07-22' },
  { code: 'S-2240', name: 'Condições Ambientais do Trabalho (SST)', tipo: 'Não Periódico', status: 'Rejeitado (Erro AVS-402)', recibo: 'Erro de Validação', data: '2026-07-21' },
];

export const CompanyDP: React.FC = () => {
  const { documents, approveDocument, vacationRequests, approveVacation, showToast, setActiveTab } = useApp();

  // Primary DP View Navigation
  const [dpView, setDpView] = useState<'dashboard' | 'employees' | 'timeclock' | 'esocial' | 'vacations'>('dashboard');

  // Interactive Global Filters
  const [filterPeriod, setFilterPeriod] = useState<string>('Julho / 2026');
  const [filterDept, setFilterDept] = useState<string>('Todos');
  const [filterContract, setFilterContract] = useState<string>('Todos');
  const [filterLocation, setFilterLocation] = useState<string>('Todos');

  // Search filter for tables
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Selected Employee Modal
  const [selectedEmployee, setSelectedEmployee] = useState<typeof DETAILED_EMPLOYEES[0] | null>(null);

  // Transmit eSocial Simulation Modal
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [esocialSuccessModal, setEsocialSuccessModal] = useState(false);

  // Filtered Employee List
  const filteredEmployees = useMemo(() => {
    return DETAILED_EMPLOYEES.filter(emp => {
      const matchSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          emp.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          emp.department.toLowerCase().includes(searchTerm.toLowerCase());
      const matchDept = filterDept === 'Todos' || emp.department === filterDept;
      const matchContract = filterContract === 'Todos' || emp.contractType === filterContract;
      const matchLoc = filterLocation === 'Todos' || emp.location === filterLocation;
      return matchSearch && matchDept && matchContract && matchLoc;
    });
  }, [searchTerm, filterDept, filterContract, filterLocation]);

  const handleTransmitEsocial = () => {
    setIsTransmitting(true);
    setTimeout(() => {
      setIsTransmitting(false);
      setEsocialSuccessModal(true);
      showToast('Lote eSocial assinado digitalmente e homologado pela Receita Federal!');
    }, 2000);
  };

  return (
    <div className="space-y-6 py-6 text-slate-800">
      {/* Top Banner: Senior HCM Go Up Identity & Controls */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 rounded-3xl shadow-lg border border-slate-800 relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <span className="px-3 py-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[11px] font-black rounded-full uppercase tracking-wider shadow-xs flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-yellow-300" /> Senior HCM Go Up
              </span>
              <span className="text-xs text-slate-300 font-medium">
                • Gestão de DP & eSocial PME
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Painel de Departamento Pessoal & Indicadores de RH
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              Monitoramento completo da folha de pagamento, encargos trabalhistas, controle de ponto eletrônico, absenteísmo e mensageria oficial do eSocial.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={() => setActiveTab('recruitment')}
              className="px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs rounded-2xl shadow-lg flex items-center gap-2 transition-all cursor-pointer"
            >
              <Radio className="w-4 h-4 text-emerald-300 animate-pulse" />
              <span>Entrevista Online & IA</span>
            </button>
            <button
              onClick={() => showToast('Relatório Gerencial de Folha exportado em PDF!')}
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-2xl border border-white/20 flex items-center gap-2 transition-all cursor-pointer backdrop-blur-xs"
            >
              <Download className="w-4 h-4" /> Exportar PDF
            </button>
            <button
              onClick={() => showToast('Espelho sintético e encargos exportados em Excel!')}
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-2xl shadow-md flex items-center gap-2 transition-all cursor-pointer"
            >
              <FileSpreadsheet className="w-4 h-4" /> Exportar Excel
            </button>
            <button
              onClick={handleTransmitEsocial}
              disabled={isTransmitting}
              className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs rounded-2xl shadow-lg flex items-center gap-2 transition-all cursor-pointer"
            >
              {isTransmitting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-white" /> Transmitindo...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" /> Transmitir eSocial
                </>
              )}
            </button>
          </div>
        </div>

        {/* Global Interactive Filter Bar */}
        <div className="mt-6 pt-5 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          {/* Period Filter */}
          <div className="bg-slate-800/80 p-2.5 rounded-2xl border border-slate-700/60 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-blue-400 shrink-0" />
            <div className="flex-1">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Período</span>
              <select
                value={filterPeriod}
                onChange={(e) => setFilterPeriod(e.target.value)}
                className="bg-transparent text-white font-bold text-xs focus:outline-none w-full cursor-pointer"
              >
                <option value="Julho / 2026" className="bg-slate-900 text-white">Julho / 2026 (Atual)</option>
                <option value="Junho / 2026" className="bg-slate-900 text-white">Junho / 2026</option>
                <option value="Maio / 2026" className="bg-slate-900 text-white">Maio / 2026</option>
                <option value="2º Trimestre 2026" className="bg-slate-900 text-white">2º Trimestre 2026</option>
                <option value="1º Trimestre 2026" className="bg-slate-900 text-white">1º Trimestre 2026</option>
                <option value="Ano 2026" className="bg-slate-900 text-white">Ano 2026 Completo</option>
              </select>
            </div>
          </div>

          {/* Department Filter */}
          <div className="bg-slate-800/80 p-2.5 rounded-2xl border border-slate-700/60 flex items-center gap-2">
            <Building2 className="w-4 h-4 text-indigo-400 shrink-0" />
            <div className="flex-1">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Departamento</span>
              <select
                value={filterDept}
                onChange={(e) => setFilterDept(e.target.value)}
                className="bg-transparent text-white font-bold text-xs focus:outline-none w-full cursor-pointer"
              >
                <option value="Todos" className="bg-slate-900 text-white">Todos os Departamentos</option>
                <option value="Tecnologia & IA" className="bg-slate-900 text-white">Tecnologia & IA</option>
                <option value="Operações & Logística" className="bg-slate-900 text-white">Operações & Logística</option>
                <option value="Comercial & Vendas" className="bg-slate-900 text-white">Comercial & Vendas</option>
                <option value="Financeiro & RH" className="bg-slate-900 text-white">Financeiro & RH</option>
                <option value="Marketing & Produto" className="bg-slate-900 text-white">Marketing & Produto</option>
              </select>
            </div>
          </div>

          {/* Contract Type Filter */}
          <div className="bg-slate-800/80 p-2.5 rounded-2xl border border-slate-700/60 flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-emerald-400 shrink-0" />
            <div className="flex-1">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Contrato</span>
              <select
                value={filterContract}
                onChange={(e) => setFilterContract(e.target.value)}
                className="bg-transparent text-white font-bold text-xs focus:outline-none w-full cursor-pointer"
              >
                <option value="Todos" className="bg-slate-900 text-white">Todos os Tipos</option>
                <option value="CLT" className="bg-slate-900 text-white">CLT Indeterminado</option>
                <option value="Estágio" className="bg-slate-900 text-white">Estágio Ley 11.788</option>
                <option value="PJ" className="bg-slate-900 text-white">PJ / Prestador</option>
                <option value="Temporário" className="bg-slate-900 text-white">Temporário</option>
              </select>
            </div>
          </div>

          {/* Location Filter */}
          <div className="bg-slate-800/80 p-2.5 rounded-2xl border border-slate-700/60 flex items-center gap-2">
            <Filter className="w-4 h-4 text-purple-400 shrink-0" />
            <div className="flex-1">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Localidade</span>
              <select
                value={filterLocation}
                onChange={(e) => setFilterLocation(e.target.value)}
                className="bg-transparent text-white font-bold text-xs focus:outline-none w-full cursor-pointer"
              >
                <option value="Todos" className="bg-slate-900 text-white">Todas as Unidades</option>
                <option value="Matriz SP" className="bg-slate-900 text-white">Matriz São Paulo (SP)</option>
                <option value="Filial RJ" className="bg-slate-900 text-white">Filial Rio de Janeiro (RJ)</option>
                <option value="Filial BH" className="bg-slate-900 text-white">Filial Belo Horizonte (BH)</option>
                <option value="Hub Remoto" className="bg-slate-900 text-white">Hub Remoto</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main DP Tabs Switcher */}
      <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 overflow-x-auto no-scrollbar text-xs font-bold">
        <button
          onClick={() => setDpView('dashboard')}
          className={`px-4 py-2.5 rounded-xl transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
            dpView === 'dashboard'
              ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <BarChart2 className="w-4 h-4 text-blue-600" />
          <span>Dashboard Executive HCM</span>
        </button>

        <button
          onClick={() => setDpView('employees')}
          className={`px-4 py-2.5 rounded-xl transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
            dpView === 'employees'
              ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Users className="w-4 h-4 text-indigo-600" />
          <span>Lista de Colaboradores ({filteredEmployees.length})</span>
        </button>

        <button
          onClick={() => setDpView('timeclock')}
          className={`px-4 py-2.5 rounded-xl transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
            dpView === 'timeclock'
              ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Clock className="w-4 h-4 text-amber-600" />
          <span>Ponto Eletrônico & Banco de Horas</span>
        </button>

        <button
          onClick={() => setDpView('esocial')}
          className={`px-4 py-2.5 rounded-xl transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
            dpView === 'esocial'
              ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Transmissão eSocial Senior</span>
        </button>

        <button
          onClick={() => setDpView('vacations')}
          className={`px-4 py-2.5 rounded-xl transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
            dpView === 'vacations'
              ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Calendar className="w-4 h-4 text-purple-600" />
          <span>Férias & Rescisões</span>
        </button>
      </div>

      {/* VIEW 1: EXECUTIVE DASHBOARD */}
      {dpView === 'dashboard' && (
        <div className="space-y-6">
          {/* 1. INDICADORES PRINCIPAIS (METRIC CARDS) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Card 1: Total Colaboradores Ativos */}
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-3 relative overflow-hidden group hover:border-blue-300 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Ativos</span>
                <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                  <Users className="w-5 h-5" />
                </div>
              </div>
              <div>
                <span className="text-2xl font-black text-slate-900 block">142</span>
                <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-1 mt-0.5">
                  <TrendingUp className="w-3.5 h-3.5" /> +5 este mês
                </span>
              </div>
            </div>

            {/* Card 2: Custo Mensal da Folha */}
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-3 relative overflow-hidden group hover:border-indigo-300 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Folha de Pagamento</span>
                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
                  <DollarSign className="w-5 h-5" />
                </div>
              </div>
              <div>
                <span className="text-2xl font-black text-slate-900 block">R$ 584.200</span>
                <span className="text-[11px] text-slate-500 font-medium block mt-0.5">
                  Bruto mensal CLT/PJ
                </span>
              </div>
            </div>

            {/* Card 3: Encargos Trabalhistas */}
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-3 relative overflow-hidden group hover:border-emerald-300 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Encargos Totais</span>
                <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
                  <ShieldCheck className="w-5 h-5" />
                </div>
              </div>
              <div>
                <span className="text-2xl font-black text-slate-900 block">R$ 216.154</span>
                <span className="text-[10px] text-slate-500 font-medium block mt-0.5">
                  INSS: R$116k • FGTS: R$46k • IRRF: R$52k
                </span>
              </div>
            </div>

            {/* Card 4: Média Horas Extras */}
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-3 relative overflow-hidden group hover:border-amber-300 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Média H.E. / Colab</span>
                <div className="p-2 bg-amber-50 text-amber-600 rounded-xl">
                  <Clock className="w-5 h-5" />
                </div>
              </div>
              <div>
                <span className="text-2xl font-black text-slate-900 block">4.8 hrs</span>
                <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-1 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Dentro da meta (&lt;6h)
                </span>
              </div>
            </div>

            {/* Card 5: Taxa de Absenteísmo */}
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-3 relative overflow-hidden group hover:border-purple-300 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Absenteísmo</span>
                <div className="p-2 bg-purple-50 text-purple-600 rounded-xl">
                  <TrendingDown className="w-5 h-5" />
                </div>
              </div>
              <div>
                <span className="text-2xl font-black text-slate-900 block">1.8%</span>
                <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-1 mt-0.5">
                  <TrendingDown className="w-3.5 h-3.5" /> -0.3% vs mês anterior
                </span>
              </div>
            </div>
          </div>

          {/* 2. CHARTS SECTION (2x2 GRID) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Chart A: Admissions & Dismissals per Month (Bar Chart) */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="font-black text-slate-900 text-sm flex items-center gap-2">
                    <BarChart2 className="w-4 h-4 text-blue-600" /> Admissões vs Desligamentos por Mês
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-0.5">Evolução do saldo do quadro de funcionários</p>
                </div>
                <span className="px-2.5 py-1 bg-emerald-50 text-emerald-800 font-bold text-[10px] rounded-full border border-emerald-200">
                  Saldo Líquido YTD: +33
                </span>
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={ADMISSIONS_DISMISSALS_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px', color: '#fff', fontSize: '11px' }}
                    />
                    <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                    <Bar dataKey="admissoes" name="Admissões" fill="#10b981" radius={[4, 4, 0, 0]} barSize={12} />
                    <Bar dataKey="desligamentos" name="Desligamentos" fill="#ef4444" radius={[4, 4, 0, 0]} barSize={12} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Chart B: Payroll Evolution (Line Chart) */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="font-black text-slate-900 text-sm flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-indigo-600" /> Evolução da Folha de Pagamento (12m)
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-0.5">Valores em R$ mil (Bruto + Encargos + Benefícios)</p>
                </div>
                <span className="px-2.5 py-1 bg-indigo-50 text-indigo-800 font-bold text-[10px] rounded-full border border-indigo-200">
                  Custo Total Jul/26: R$ 852k
                </span>
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={PAYROLL_EVOLUTION_DATA} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px', color: '#fff', fontSize: '11px' }}
                    />
                    <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                    <Line type="monotone" dataKey="folhaBruta" name="Folha Bruta (R$k)" stroke="#3b82f6" strokeWidth={3} dot={false} />
                    <Line type="monotone" dataKey="encargos" name="Encargos (R$k)" stroke="#10b981" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="total" name="Custo Total (R$k)" stroke="#8b5cf6" strokeWidth={2} strokeDasharray="3 3" dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Chart C: Department Distribution (Donut Chart) */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="font-black text-slate-900 text-sm flex items-center gap-2">
                    <PieChartIcon className="w-4 h-4 text-purple-600" /> Distribuição por Departamento
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-0.5">Alocação total dos 142 colaboradores</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-4">
                <div className="h-56 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={DEPARTMENT_DISTRIBUTION}
                        cx="50%"
                        cy="50%"
                        innerRadius={55}
                        outerRadius={80}
                        paddingAngle={4}
                        dataKey="value"
                      >
                        {DEPARTMENT_DISTRIBUTION.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px', color: '#fff', fontSize: '11px' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="space-y-2.5 text-xs">
                  {DEPARTMENT_DISTRIBUTION.map((item) => (
                    <div key={item.name} className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="font-bold text-slate-800">{item.name}</span>
                      </div>
                      <span className="font-black text-slate-900">{item.value} colabs</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Chart D: Bank Hours Accumulated Balance (Area Chart) */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="font-black text-slate-900 text-sm flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-600" /> Saldo de Banco de Horas Acumulado
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-0.5">Horas a compensar vs saldo negativo (horas)</p>
                </div>
                <span className="px-2.5 py-1 bg-amber-50 text-amber-800 font-bold text-[10px] rounded-full border border-amber-200">
                  Saldo Atual: +605h
                </span>
              </div>

              <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={TIME_BANK_BALANCE_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px', color: '#fff', fontSize: '11px' }}
                    />
                    <Area type="monotone" dataKey="positivo" name="Horas Positivas (+)" stroke="#f59e0b" fill="#fef3c7" strokeWidth={2} />
                    <Area type="monotone" dataKey="saldoLiquido" name="Saldo Líquido" stroke="#3b82f6" fill="#dbeafe" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* 6. VISUALIZAÇÃO EXTRA: SATISFAÇÃO (eNPS) & TENDÊNCIA DE TURNOVER (24 MESES) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Satisfaction eNPS Card */}
            <div className="bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-900 text-white p-6 rounded-3xl shadow-md border border-emerald-800/80 space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 font-black text-[10px] rounded-full uppercase tracking-wider border border-emerald-500/30">
                    Clima Organizacional
                  </span>
                  <Smile className="w-6 h-6 text-emerald-400" />
                </div>
                <h3 className="text-xl font-black mt-3">Satisfação dos Colaboradores</h3>
                <p className="text-xs text-emerald-200/80 mt-1">Resultado da Pesquisa Interna eNPS Senior Jul/2026</p>
              </div>

              <div className="p-4 bg-white/10 rounded-2xl border border-white/10 backdrop-blur-xs flex items-center justify-between">
                <div>
                  <span className="text-3xl font-black text-white block">+68 pts</span>
                  <span className="text-xs text-emerald-300 font-bold">Zona de Excelência (&gt;50)</span>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold text-white block">8.6 / 10</span>
                  <span className="text-[10px] text-slate-300">Taxa de resposta: 94%</span>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between text-emerald-200">
                  <span>Promotores (&gt;9):</span>
                  <span className="font-bold text-white">74%</span>
                </div>
                <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-400 h-full rounded-full" style={{ width: '74%' }} />
                </div>
              </div>
            </div>

            {/* Turnover Trend 24 Months */}
            <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="font-black text-slate-900 text-sm flex items-center gap-2">
                    <UserX className="w-4 h-4 text-red-600" /> Tendência de Turnover / Rotatividade (Últimos 24 Meses)
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-0.5">Rotatividade Voluntária vs Involuntária comparada à Meta de 2.0%</p>
                </div>
                <span className="px-2.5 py-1 bg-emerald-50 text-emerald-800 font-bold text-[10px] rounded-full border border-emerald-200">
                  Taxa Atual: 1.2% (Abaixo da Meta)
                </span>
              </div>

              <div className="h-56 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={TURNOVER_24m_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} unit="%" />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px', color: '#fff', fontSize: '11px' }}
                    />
                    <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '5px' }} />
                    <Line type="monotone" dataKey="taxa" name="Taxa de Turnover Total (%)" stroke="#ef4444" strokeWidth={3} dot={{ r: 3 }} />
                    <Line type="monotone" dataKey="meta" name="Meta Limite (2.0%)" stroke="#94a3b8" strokeDasharray="4 4" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="voluntario" name="Voluntário (%)" stroke="#f59e0b" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: EMPLOYEES LIST WITH DETAILED STATUS */}
      {dpView === 'employees' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <h3 className="font-black text-slate-900 text-base flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" /> Lista de Colaboradores & Status Contratual
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">Gestão de ficha de empregado, salário e situação eSocial</p>
            </div>

            {/* Search Box */}
            <div className="relative min-w-[260px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar por nome, cargo ou dept..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs divide-y divide-slate-100">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Colaborador</th>
                  <th className="py-3 px-4">Cargo / Dept</th>
                  <th className="py-3 px-4">Contrato</th>
                  <th className="py-3 px-4">Localidade</th>
                  <th className="py-3 px-4">Salário Base</th>
                  <th className="py-3 px-4">Admissão</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Ação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredEmployees.map((emp) => (
                  <tr key={emp.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={emp.avatar}
                          alt={emp.name}
                          className="w-9 h-9 rounded-full object-cover border border-slate-200 shrink-0"
                        />
                        <div>
                          <span className="font-bold text-slate-900 block">{emp.name}</span>
                          <span className="text-[10px] text-slate-400 font-mono">{emp.id}</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="font-bold text-slate-800 block">{emp.role}</span>
                      <span className="text-[11px] text-slate-500">{emp.department}</span>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-1 bg-slate-100 text-slate-700 font-bold rounded-lg text-[11px] border border-slate-200">
                        {emp.contractType}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-slate-600 font-medium">{emp.location}</td>

                    <td className="py-3.5 px-4 font-bold text-slate-900">
                      R$ {emp.salary.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </td>

                    <td className="py-3.5 px-4 text-slate-500">{emp.hireDate}</td>

                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[11px] font-bold inline-flex items-center gap-1 ${
                          emp.status === 'Ativo'
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                            : emp.status === 'Férias'
                            ? 'bg-purple-50 text-purple-800 border border-purple-200'
                            : emp.status === 'Afastado'
                            ? 'bg-amber-50 text-amber-800 border border-amber-200'
                            : 'bg-red-50 text-red-800 border border-red-200'
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          emp.status === 'Ativo' ? 'bg-emerald-500' : emp.status === 'Férias' ? 'bg-purple-500' : 'bg-amber-500'
                        }`} />
                        {emp.status}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => setSelectedEmployee(emp)}
                        className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs inline-flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" /> Ficha
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* VIEW 3: TIMECLOCK & POINT INTEGRATION */}
      {dpView === 'timeclock' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <h3 className="font-black text-slate-900 text-base flex items-center gap-2">
                  <Clock className="w-5 h-5 text-amber-600" /> Integração Ponto Eletrônico & Banco de Horas
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">Sincronização em tempo real via relógio REP / aplicativo móvel com Geolocalização</p>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-amber-50 text-amber-800 font-bold text-xs rounded-xl border border-amber-200 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600" /> 1 Ocorrência de Horas Excedentes CLT
                </span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs divide-y divide-slate-100">
                <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Colaborador</th>
                    <th className="py-3 px-4">Departamento</th>
                    <th className="py-3 px-4">Horas Trabalhadas (Mês)</th>
                    <th className="py-3 px-4">Atrasos</th>
                    <th className="py-3 px-4">Horas Extras</th>
                    <th className="py-3 px-4">Saldo Banco de Horas</th>
                    <th className="py-3 px-4">Situação REP</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {PONTO_LOGS.map((pnt) => (
                    <tr key={pnt.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-slate-900">{pnt.colab}</td>
                      <td className="py-3.5 px-4 text-slate-600">{pnt.dept}</td>
                      <td className="py-3.5 px-4 font-bold text-slate-800">{pnt.horasTrabalhadas}</td>
                      <td className="py-3.5 px-4 text-red-600 font-medium">{pnt.atrasos}</td>
                      <td className="py-3.5 px-4 font-bold text-amber-700">{pnt.horaExtra}</td>
                      <td className="py-3.5 px-4 font-bold text-blue-700">{pnt.bancoSaldo}</td>
                      <td className="py-3.5 px-4">
                        <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                          pnt.ocorrencias === 'Normal'
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                            : 'bg-amber-50 text-amber-800 border border-amber-200'
                        }`}>
                          {pnt.ocorrencias}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 4: ESOCIAL TRANSMISSION PANEL */}
      {dpView === 'esocial' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <h3 className="font-black text-slate-900 text-base flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" /> Transmissão & Protocolos do eSocial Senior HCM
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">Assinatura digital com certificado A1/A3 e monitoramento do webservice Governo Federal</p>
            </div>

            <button
              onClick={handleTransmitEsocial}
              disabled={isTransmitting}
              className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs rounded-2xl shadow-md flex items-center gap-2 cursor-pointer transition-all"
            >
              {isTransmitting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" /> Processando Lote...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" /> Transmitir Eventos Pendentes
                </>
              )}
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs divide-y divide-slate-100">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Evento Code</th>
                  <th className="py-3 px-4">Descrição do Evento</th>
                  <th className="py-3 px-4">Tipo</th>
                  <th className="py-3 px-4">Data Ref.</th>
                  <th className="py-3 px-4">Recibo de Entrega / ID</th>
                  <th className="py-3 px-4">Status de Homologação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {ESOCIAL_EVENTS.map((evt) => (
                  <tr key={evt.code} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-900">{evt.code}</td>
                    <td className="py-3.5 px-4 font-bold text-slate-800">{evt.name}</td>
                    <td className="py-3.5 px-4 text-slate-500">{evt.tipo}</td>
                    <td className="py-3.5 px-4 text-slate-500">{evt.data}</td>
                    <td className="py-3.5 px-4 font-mono text-[11px] text-slate-600">{evt.recibo}</td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                        evt.status.includes('Processado')
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : evt.status.includes('Pronto')
                          ? 'bg-blue-50 text-blue-800 border border-blue-200'
                          : evt.status.includes('Análise')
                          ? 'bg-amber-50 text-amber-800 border border-amber-200'
                          : 'bg-red-50 text-red-800 border border-red-200'
                      }`}>
                        {evt.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* VIEW 5: VACATIONS & RESCISSIONS TABLES */}
      {dpView === 'vacations' && (
        <div className="space-y-6">
          {/* Vacations Scheduled & Executed */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-black text-slate-900 text-base flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-purple-600" /> Tabela de Férias Programadas e Realizadas
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">Escala de gozo, abono pecuniário de 10 dias e antecipação de 1/3 constitucional</p>
              </div>

              <span className="px-3 py-1 bg-purple-50 text-purple-800 font-bold text-xs rounded-xl border border-purple-200">
                Total em Gozo Neste Mês: 1 Colaborador
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs divide-y divide-slate-100">
                <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Colaborador</th>
                    <th className="py-3 px-4">Departamento</th>
                    <th className="py-3 px-4">Período Aquisitivo</th>
                    <th className="py-3 px-4">Datas Início / Fim</th>
                    <th className="py-3 px-4">Dias Gozo</th>
                    <th className="py-3 px-4">Abono Pecuniário</th>
                    <th className="py-3 px-4">Valor Adiantamento</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {VACATIONS_FULL_LIST.map((vac) => (
                    <tr key={vac.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-slate-900">{vac.name}</td>
                      <td className="py-3.5 px-4 text-slate-600">{vac.dept}</td>
                      <td className="py-3.5 px-4 font-mono text-slate-500">{vac.period}</td>
                      <td className="py-3.5 px-4 text-slate-800 font-medium">{vac.startDate} a {vac.endDate}</td>
                      <td className="py-3.5 px-4 font-bold text-slate-900">{vac.days} dias</td>
                      <td className="py-3.5 px-4 text-slate-600">{vac.abono}</td>
                      <td className="py-3.5 px-4 font-bold text-emerald-700">{vac.valorAdiantado}</td>
                      <td className="py-3.5 px-4">
                        <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                          vac.status === 'Em Gozo'
                            ? 'bg-purple-50 text-purple-800 border border-purple-200'
                            : vac.status === 'Realizada'
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                            : 'bg-blue-50 text-blue-800 border border-blue-200'
                        }`}>
                          {vac.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Rescissions / Terminations Summary Table */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-black text-slate-900 text-base flex items-center gap-2">
                  <UserX className="w-5 h-5 text-red-600" /> Tabela de Rescisões Contratuais & Custos Médios
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">Indicadores financeiros de desligamentos, aviso prévio e multa FGTS</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs divide-y divide-slate-100">
                <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Motivo do Desligamento</th>
                    <th className="py-3 px-4 text-center">Qtd Casos</th>
                    <th className="py-3 px-4">Tempo Médio de Casa</th>
                    <th className="py-3 px-4">Valor Médio Rescisão</th>
                    <th className="py-3 px-4">Aviso Prévio Médio</th>
                    <th className="py-3 px-4">Multa Rescisória FGTS (40%)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {RESCISIONS_SUMMARY.map((res, i) => (
                    <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-slate-900">{res.motivo}</td>
                      <td className="py-3.5 px-4 text-center">
                        <span className="px-2.5 py-1 bg-slate-100 text-slate-800 font-bold rounded-lg border border-slate-200">
                          {res.qtd}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 font-medium">{res.tempoMedioMeses} meses</td>
                      <td className="py-3.5 px-4 font-bold text-slate-900">{res.valorMedioRescisao}</td>
                      <td className="py-3.5 px-4 text-slate-600">{res.custoAvisoPrevio}</td>
                      <td className="py-3.5 px-4 font-bold text-red-700">{res.fgtsMulta}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: FICHA DO COLABORADOR */}
      {selectedEmployee && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-lg w-full p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-3">
                <img
                  src={selectedEmployee.avatar}
                  alt={selectedEmployee.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-blue-500 shadow-sm"
                />
                <div>
                  <h3 className="font-black text-slate-900 text-base">{selectedEmployee.name}</h3>
                  <p className="text-xs text-slate-500">{selectedEmployee.role} • {selectedEmployee.department}</p>
                </div>
              </div>

              <button
                onClick={() => setSelectedEmployee(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-xl cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-slate-400 font-bold block text-[10px] uppercase">Contrato</span>
                <span className="font-bold text-slate-900">{selectedEmployee.contractType}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-slate-400 font-bold block text-[10px] uppercase">Salário Bruto</span>
                <span className="font-bold text-slate-900">R$ {selectedEmployee.salary.toLocaleString('pt-BR')}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-slate-400 font-bold block text-[10px] uppercase">Localidade</span>
                <span className="font-bold text-slate-900">{selectedEmployee.location}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-slate-400 font-bold block text-[10px] uppercase">Data Admissão</span>
                <span className="font-bold text-slate-900">{selectedEmployee.hireDate}</span>
              </div>
            </div>

            <div className="p-4 bg-blue-50/60 rounded-2xl border border-blue-100 text-xs space-y-1">
              <span className="font-bold text-blue-900 block flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-blue-600" /> Situação eSocial S-2200
              </span>
              <p className="text-slate-600">Admissão homologada no eSocial com recibo oficial Senior HCM sob o protocolo #1.2.202607.000198421.</p>
            </div>

            <button
              onClick={() => setSelectedEmployee(null)}
              className="w-full py-2.5 bg-slate-900 text-white font-bold rounded-2xl text-xs hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Fechar Ficha
            </button>
          </div>
        </div>
      )}

      {/* MODAL: TRANSMISSÃO ESOCIAL SUCESSO */}
      {esocialSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-md w-full p-6 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-xl font-black text-slate-900">Lote eSocial Homologado!</h3>
              <p className="text-xs text-slate-500 mt-1">
                A transmissão dos eventos S-1200 e S-1210 referente ao período <span className="font-bold text-slate-800">{filterPeriod}</span> foi concluída com sucesso.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-left text-xs font-mono text-slate-700 space-y-1">
              <div className="flex justify-between">
                <span>Protocolo:</span>
                <span className="font-bold text-slate-900">PROT-2026-07-99128</span>
              </div>
              <div className="flex justify-between">
                <span>Certificado A1:</span>
                <span className="font-bold text-slate-900">SENIOR-HCM-CA</span>
              </div>
              <div className="flex justify-between">
                <span>Recibo Governo:</span>
                <span className="font-bold text-emerald-700">OK • 200 SUCCESS</span>
              </div>
            </div>

            <button
              onClick={() => setEsocialSuccessModal(false)}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-2xl shadow-md transition-colors cursor-pointer"
            >
              Concluir & Baixar Comprovante
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
