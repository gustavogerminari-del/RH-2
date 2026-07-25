import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserRole,
  User,
  Job,
  Candidate,
  Application,
  Interview,
  DocumentItem,
  TimeClockLog,
  Payslip,
  Benefit,
  VacationRequest,
  Employee,
  TenantClient,
  SaaSPlan,
  AuditLog,
  Talent,
  AppModuleTab,
  AppCustomization
} from '../types';
import {
  INITIAL_JOBS,
  INITIAL_CANDIDATE,
  INITIAL_APPLICATIONS,
  INITIAL_INTERVIEWS,
  INITIAL_DOCUMENTS,
  INITIAL_TIME_LOGS,
  INITIAL_PAYSLIPS,
  INITIAL_BENEFITS,
  INITIAL_VACATION_REQUESTS,
  INITIAL_EMPLOYEES,
  INITIAL_TENANT_CLIENTS,
  INITIAL_SAAS_PLANS,
  INITIAL_AUDIT_LOGS,
  INITIAL_TALENT_POOL
} from '../data/mockData';

export const DEFAULT_TABS: Record<string, AppModuleTab[]> = {
  public: [
    { id: 'home', label: 'Página Inicial', portal: 'public', active: true, order: 1, description: 'Apresentação pública do portal' },
    { id: 'jobs', label: 'Vagas de Emprego', portal: 'public', active: true, order: 2, description: 'Mural público de oportunidades' },
    { id: 'talent-pool', label: 'Banco de Talentos', portal: 'public', active: true, order: 3, description: 'Cadastro e consulta de profissionais' },
    { id: 'companies', label: 'Empresas Parceiras', portal: 'public', active: true, order: 4, description: 'Vitrine de clientes e contratantes' },
    { id: 'about', label: 'Sobre Nós', portal: 'public', active: true, order: 5, description: 'Informações institucionais' },
    { id: 'contact', label: 'Contato', portal: 'public', active: true, order: 6, description: 'Formulário e canais de suporte' },
    { id: 'auth', label: 'Acessar Conta', portal: 'public', active: true, order: 7, description: 'Login e registro de usuários' },
  ],
  candidate: [
    { id: 'dashboard', label: 'Dashboard do Candidato', portal: 'candidate', active: true, order: 1, description: 'Painel geral e estatísticas de candidaturas' },
    { id: 'resume', label: 'Meu Currículo', portal: 'candidate', active: true, order: 2, description: 'Edição de perfil e skills com auxílio de IA' },
    { id: 'applications', label: 'Minhas Candidaturas', portal: 'candidate', active: true, order: 3, description: 'Acompanhamento do status das vagas' },
    { id: 'interviews', label: 'Entrevistas Agendadas', portal: 'candidate', active: true, order: 4, description: 'Agenda de entrevistas virtuais e presenciais' },
    { id: 'documents', label: 'Documentos e Admissão', portal: 'candidate', active: true, order: 5, description: 'Envio de RG, CPF, Comprovante e Carteira' },
    { id: 'timeclock', label: 'Meu Ponto Digital', portal: 'candidate', active: true, order: 6, description: 'Bate-ponto digital e espelho mensal' },
    { id: 'payslips', label: 'Holerites', portal: 'candidate', active: true, order: 7, description: 'Demonstrativo de pagamento e download de PDF' },
    { id: 'benefits', label: 'Benefícios', portal: 'candidate', active: true, order: 8, description: 'Consulta de Vale Refeição, Transporte e Saúde' },
    { id: 'vacations', label: 'Minhas Férias', portal: 'candidate', active: true, order: 9, description: 'Solicitação e saldo do período aquisitivo' },
    { id: 'profile', label: 'Perfil e Segurança', portal: 'candidate', active: true, order: 10, description: 'Alteração de dados pessoais e senha' },
  ],
  company: [
    { id: 'dashboard', label: 'Dashboard Executivo', portal: 'company', active: true, order: 1, description: 'Métricas gerais de RH, recrutamento e quadro' },
    { id: 'employees', label: 'Gestão de Funcionários', portal: 'company', active: true, order: 2, description: 'Cadastro, admissão e alteração de colaboradores' },
    { id: 'jobs', label: 'Gestão de Vagas', portal: 'company', active: true, order: 3, description: 'Abertura, divulgação em banner e requisitos' },
    { id: 'talent-pool', label: 'Banco de Talentos IA', portal: 'company', active: true, order: 4, description: 'Busca semântica de currículos com IA' },
    { id: 'recruitment', label: 'Recrutamento & Seleção IA', portal: 'company', active: true, order: 5, description: 'Funil Kanban de candidatos e match preditivo' },
    { id: 'dp', label: 'Dept. Pessoal & eSocial', portal: 'company', active: true, order: 6, description: 'Gestão de documentos, atestados e férias' },
    { id: 'financial', label: 'Financeiro & Holerites', portal: 'company', active: true, order: 7, description: 'Folha de pagamento e extrato de custos' },
    { id: 'reports', label: 'Relatórios BI', portal: 'company', active: true, order: 8, description: 'Exportação de relatórios gerenciais em PDF e Excel' },
    { id: 'settings', label: 'Configurações do Sistema', portal: 'company', active: true, order: 9, description: 'Parâmetros da empresa e integrações' },
    { id: 'users', label: 'Usuários & Níveis', portal: 'company', active: true, order: 10, description: 'Gestão de permissões de acesso' },
  ],
  master: [
    { id: 'dashboard', label: 'Dashboard Master Global', portal: 'master', active: true, order: 1, description: 'Visão unificada do ecossistema SaaS' },
    { id: 'master-clients', label: 'Empresas Clientes', portal: 'master', active: true, order: 2, description: 'Gestão de tenants, CNPJ e limite de licenças' },
    { id: 'master-plans', label: 'Planos & Assinaturas', portal: 'master', active: true, order: 3, description: 'Tabela de preços, limites e cobrança' },
    { id: 'master-modules', label: 'Gestor Master de Módulos & Cores', portal: 'master', active: true, order: 4, description: 'Personalização global de nomes, cores e ordem' },
    { id: 'master-permissions', label: 'Matriz de Permissões', portal: 'master', active: true, order: 5, description: 'Controle de privilégios e papéis' },
    { id: 'master-ai', label: 'Engine de IA', portal: 'master', active: true, order: 6, description: 'Configuração de modelos Gemini e prompts' },
    { id: 'master-db', label: 'Banco de Dados & Backups', portal: 'master', active: true, order: 7, description: 'Monitoramento de tabelas e queries' },
    { id: 'master-logs', label: 'Logs de Auditoria', portal: 'master', active: true, order: 8, description: 'Rastreabilidade de ações de administradores' },
    { id: 'master-integrations', label: 'Integrações & Webhooks', portal: 'master', active: true, order: 9, description: 'APIs externas, WhatsApp e eSocial' },
  ]
};

export const DEFAULT_CUSTOMIZATION: AppCustomization = {
  primaryColor: '#5D6D4E',
  accentColor: '#8C7355',
  headerBgColor: '#F8F7F2',
  systemName: 'GESTRH',
  systemTagline: 'Gestão de Pessoas & Recrutamento',
  themePreset: 'sage'
};

interface AppContextType {
  // Navigation & Role State
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;

  // Master Customization & Dynamic Modules State
  appCustomization: AppCustomization;
  updateCustomization: (newCustom: Partial<AppCustomization>) => void;
  portalTabs: Record<string, AppModuleTab[]>;
  updateTabLabel: (portal: string, tabId: string, newLabel: string) => void;
  reorderTab: (portal: string, tabId: string, direction: 'up' | 'down') => void;
  toggleTabActive: (portal: string, tabId: string) => void;
  deleteTab: (portal: string, tabId: string) => void;
  addCustomTab: (portal: string, newTab: { id: string; label: string; description?: string }) => void;
  resetMasterCustomization: () => void;
  masterNavigateTo: (role: UserRole, tabId: string) => void;
  
  // Data
  jobs: Job[];
  candidate: Candidate;
  applications: Application[];
  interviews: Interview[];
  documents: DocumentItem[];
  timeLogs: TimeClockLog[];
  payslips: Payslip[];
  benefits: Benefit[];
  vacationRequests: VacationRequest[];
  employees: Employee[];
  tenantClients: TenantClient[];
  saasPlans: SaaSPlan[];
  auditLogs: AuditLog[];
  talentPool: Talent[];
  
  // Actions
  addJob: (job: Omit<Job, 'id' | 'createdAt' | 'applicationsCount'>) => void;
  createJob: (job: Omit<Job, 'id' | 'createdAt' | 'applicationsCount'>) => void;
  applyToJob: (jobId: string) => void;
  clockIn: () => void;
  clockOut: () => void;
  requestVacation: (request: Omit<VacationRequest, 'id' | 'requestedAt' | 'status'>) => void;
  addEmployee: (emp: Omit<Employee, 'id'>) => void;
  updateEmployee: (empId: string, updated: Partial<Employee>) => void;
  uploadDocument: (doc: Omit<DocumentItem, 'id' | 'uploadDate' | 'status'>) => void;
  approveDocument: (docId: string) => void;
  approveVacation: (vacationId: string) => void;
  updateCandidateCv: (updatedCandidate: Partial<Candidate>) => void;
  updateApplicationStatus: (appId: string, status: Application['status']) => void;
  addInterview: (interview: Omit<Interview, 'id'>) => void;
  updateInterview: (interviewId: string, updated: Partial<Interview>) => void;
  addTenantClient: (client: Omit<TenantClient, 'id' | 'createdAt'>) => void;
  
  // Notification Toast
  toastMessage: string | null;
  showToast: (msg: string) => void;
  
  // Selected items for modals
  selectedJob: Job | null;
  setSelectedJob: (job: Job | null) => void;
  selectedPayslip: Payslip | null;
  setSelectedPayslip: (p: Payslip | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRole, setCurrentRoleState] = useState<UserRole>('public');
  const [activeTab, setActiveTabState] = useState<string>('home');
  
  // Customization & Portal Tabs State with LocalStorage
  const [appCustomization, setAppCustomization] = useState<AppCustomization>(() => {
    try {
      const saved = localStorage.getItem('gestrh_customization');
      return saved ? JSON.parse(saved) : DEFAULT_CUSTOMIZATION;
    } catch {
      return DEFAULT_CUSTOMIZATION;
    }
  });

  const [portalTabs, setPortalTabs] = useState<Record<string, AppModuleTab[]>>(() => {
    try {
      const saved = localStorage.getItem('gestrh_portal_tabs');
      return saved ? JSON.parse(saved) : DEFAULT_TABS;
    } catch {
      return DEFAULT_TABS;
    }
  });

  useEffect(() => {
    localStorage.setItem('gestrh_customization', JSON.stringify(appCustomization));
  }, [appCustomization]);

  useEffect(() => {
    localStorage.setItem('gestrh_portal_tabs', JSON.stringify(portalTabs));
  }, [portalTabs]);

  // Master Handlers
  const updateCustomization = (newCustom: Partial<AppCustomization>) => {
    setAppCustomization(prev => ({ ...prev, ...newCustom }));
    showToast('Cores e marca da plataforma atualizadas!');
  };

  const updateTabLabel = (portal: string, tabId: string, newLabel: string) => {
    setPortalTabs(prev => {
      const list = prev[portal] || [];
      const updated = list.map(t => t.id === tabId ? { ...t, label: newLabel } : t);
      return { ...prev, [portal]: updated };
    });
    showToast('Nome do módulo atualizado!');
  };

  const reorderTab = (portal: string, tabId: string, direction: 'up' | 'down') => {
    setPortalTabs(prev => {
      const list = [...(prev[portal] || [])];
      const index = list.findIndex(t => t.id === tabId);
      if (index === -1) return prev;
      const newIndex = direction === 'up' ? index - 1 : index + 1;
      if (newIndex < 0 || newIndex >= list.length) return prev;

      const temp = list[index];
      list[index] = list[newIndex];
      list[newIndex] = temp;

      // re-index order
      const reindexed = list.map((item, idx) => ({ ...item, order: idx + 1 }));
      return { ...prev, [portal]: reindexed };
    });
    showToast('Ordem do módulo reordenada!');
  };

  const toggleTabActive = (portal: string, tabId: string) => {
    setPortalTabs(prev => {
      const list = prev[portal] || [];
      const updated = list.map(t => t.id === tabId ? { ...t, active: !t.active } : t);
      return { ...prev, [portal]: updated };
    });
    showToast('Visibilidade do módulo alterada!');
  };

  const deleteTab = (portal: string, tabId: string) => {
    setPortalTabs(prev => {
      const list = prev[portal] || [];
      const filtered = list.filter(t => t.id !== tabId);
      return { ...prev, [portal]: filtered };
    });
    showToast('Módulo removido com sucesso!');
  };

  const addCustomTab = (portal: string, newTab: { id: string; label: string; description?: string }) => {
    setPortalTabs(prev => {
      const list = prev[portal] || [];
      const tabObj: AppModuleTab = {
        id: newTab.id || `custom-${Date.now()}`,
        label: newTab.label,
        portal: portal as any,
        active: true,
        order: list.length + 1,
        description: newTab.description || 'Novo módulo customizado'
      };
      return { ...prev, [portal]: [...list, tabObj] };
    });
    showToast(`Novo módulo "${newTab.label}" adicionado ao portal ${portal.toUpperCase()}!`);
  };

  const resetMasterCustomization = () => {
    setAppCustomization(DEFAULT_CUSTOMIZATION);
    setPortalTabs(DEFAULT_TABS);
    localStorage.removeItem('gestrh_customization');
    localStorage.removeItem('gestrh_portal_tabs');
    showToast('Configurações do Master redefinidas para o padrão!');
  };

  const masterNavigateTo = (role: UserRole, tabId: string) => {
    setCurrentRoleState(role);
    setActiveTabState(tabId);
    showToast(`Teleportado para Módulo: ${tabId.toUpperCase()} (${role.toUpperCase()})`);
  };

  // State initialization with localStorage fallback
  const [jobs, setJobs] = useState<Job[]>(() => {
    try {
      const saved = localStorage.getItem('gestrh_jobs');
      return saved ? JSON.parse(saved) : INITIAL_JOBS;
    } catch {
      return INITIAL_JOBS;
    }
  });

  const [candidate, setCandidate] = useState<Candidate>(() => {
    try {
      const saved = localStorage.getItem('gestrh_candidate');
      return saved ? JSON.parse(saved) : INITIAL_CANDIDATE;
    } catch {
      return INITIAL_CANDIDATE;
    }
  });

  const [applications, setApplications] = useState<Application[]>(() => {
    try {
      const saved = localStorage.getItem('gestrh_applications');
      return saved ? JSON.parse(saved) : INITIAL_APPLICATIONS;
    } catch {
      return INITIAL_APPLICATIONS;
    }
  });

  const [interviews, setInterviews] = useState<Interview[]>(INITIAL_INTERVIEWS);
  const [documents, setDocuments] = useState<DocumentItem[]>(INITIAL_DOCUMENTS);
  const [timeLogs, setTimeLogs] = useState<TimeClockLog[]>(INITIAL_TIME_LOGS);
  const [payslips, setPayslips] = useState<Payslip[]>(INITIAL_PAYSLIPS);
  const [benefits, setBenefits] = useState<Benefit[]>(INITIAL_BENEFITS);
  const [vacationRequests, setVacationRequests] = useState<VacationRequest[]>(INITIAL_VACATION_REQUESTS);
  const [employees, setEmployees] = useState<Employee[]>(INITIAL_EMPLOYEES);
  const [tenantClients, setTenantClients] = useState<TenantClient[]>(INITIAL_TENANT_CLIENTS);
  const [saasPlans, setSaasPlans] = useState<SaaSPlan[]>(INITIAL_SAAS_PLANS);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(INITIAL_AUDIT_LOGS);
  const [talentPool, setTalentPool] = useState<Talent[]>(INITIAL_TALENT_POOL);

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [selectedPayslip, setSelectedPayslip] = useState<Payslip | null>(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('gestrh_jobs', JSON.stringify(jobs));
  }, [jobs]);

  useEffect(() => {
    localStorage.setItem('gestrh_candidate', JSON.stringify(candidate));
  }, [candidate]);

  useEffect(() => {
    localStorage.setItem('gestrh_applications', JSON.stringify(applications));
  }, [applications]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const setCurrentRole = (role: UserRole) => {
    setCurrentRoleState(role);
    // Set default tab based on role
    if (role === 'public') setActiveTabState('home');
    if (role === 'candidate') setActiveTabState('dashboard');
    if (role === 'company') setActiveTabState('dashboard');
    if (role === 'master') setActiveTabState('dashboard');
  };

  const setActiveTab = (tab: string) => {
    setActiveTabState(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addJob = (jobData: Omit<Job, 'id' | 'createdAt' | 'applicationsCount'>) => {
    const newJob: Job = {
      ...jobData,
      id: `job-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      applicationsCount: 0
    };
    setJobs(prev => [newJob, ...prev]);
    showToast('Nova vaga cadastrada com sucesso!');
  };

  const applyToJob = (jobId: string) => {
    const targetJob = jobs.find(j => j.id === jobId);
    if (!targetJob) return;

    const alreadyApplied = applications.some(a => a.jobId === jobId);
    if (alreadyApplied) {
      showToast('Você já se candidatou a esta vaga!');
      return;
    }

    const newApp: Application = {
      id: `app-${Date.now()}`,
      jobId,
      jobTitle: targetJob.title,
      companyName: targetJob.companyName,
      candidateId: candidate.id,
      candidateName: candidate.name,
      appliedAt: new Date().toISOString().split('T')[0],
      status: 'Inscrito',
      aiMatchScore: Math.floor(Math.random() * 20) + 80, // Simulated score between 80-99
      aiFeedback: 'Perfil analisado pela IA com excelente aderência aos requisitos principais da vaga.'
    };

    setApplications(prev => [newApp, ...prev]);
    setJobs(prev => prev.map(j => j.id === jobId ? { ...j, applicationsCount: j.applicationsCount + 1 } : j));
    showToast(`Candidatura enviada para "${targetJob.title}"!`);
  };

  const clockIn = () => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    const dateStr = `${now.toLocaleDateString('pt-BR')} (Hoje)`;

    const todayLog = timeLogs.find(l => l.date.includes('Hoje'));
    if (todayLog) {
      showToast('Entrada já registrada para o dia de hoje!');
      return;
    }

    const newLog: TimeClockLog = {
      id: `clk-${Date.now()}`,
      date: dateStr,
      clockIn: timeStr,
      totalHours: 'Em andamento...',
      status: 'Normal'
    };

    setTimeLogs(prev => [newLog, ...prev]);
    showToast(`Ponto de Entrada registrado às ${timeStr}!`);
  };

  const clockOut = () => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    setTimeLogs(prev => prev.map(log => {
      if (log.date.includes('Hoje') && !log.clockOut) {
        return {
          ...log,
          clockOut: timeStr,
          totalHours: '08h 15m',
          status: 'Normal'
        };
      }
      return log;
    }));

    showToast(`Ponto de Saída registrado às ${timeStr}!`);
  };

  const requestVacation = (req: Omit<VacationRequest, 'id' | 'requestedAt' | 'status'>) => {
    const newReq: VacationRequest = {
      ...req,
      id: `vac-${Date.now()}`,
      requestedAt: new Date().toISOString().split('T')[0],
      status: 'Em Análise'
    };
    setVacationRequests(prev => [newReq, ...prev]);
    showToast('Solicitação de férias enviada para o RH!');
  };

  const addEmployee = (empData: Omit<Employee, 'id'>) => {
    const newEmp: Employee = {
      ...empData,
      id: `emp-${Date.now()}`
    };
    setEmployees(prev => [newEmp, ...prev]);
    showToast(`Novo colaborador ${empData.name} cadastrado com sucesso!`);
  };

  const updateEmployee = (empId: string, updated: Partial<Employee>) => {
    setEmployees(prev => prev.map(e => e.id === empId ? { ...e, ...updated } : e));
    showToast('Dados do colaborador atualizados com sucesso!');
  };

  const uploadDocument = (doc: Omit<DocumentItem, 'id' | 'uploadDate' | 'status'>) => {
    const newDoc: DocumentItem = {
      ...doc,
      id: `doc-${Date.now()}`,
      uploadDate: new Date().toISOString().split('T')[0],
      status: 'Pendente'
    };
    setDocuments(prev => [newDoc, ...prev]);
    showToast('Documento enviado para análise do RH!');
  };

  const approveDocument = (docId: string) => {
    setDocuments(prev => prev.map(d => d.id === docId ? { ...d, status: 'Aprovado' as const } : d));
    showToast('Documento aprovado e validado pelo DP!');
  };

  const approveVacation = (vacationId: string) => {
    setVacationRequests(prev => prev.map(v => v.id === vacationId ? { ...v, status: 'Aprovado' as const } : v));
    showToast('Solicitação de férias aprovada!');
  };

  const addInterview = (interviewData: Omit<Interview, 'id'>) => {
    const newInterview: Interview = {
      ...interviewData,
      id: `int-${Date.now()}`
    };
    setInterviews(prev => [newInterview, ...prev]);
    showToast(`Entrevista agendada com sucesso para ${interviewData.candidateName}!`);
  };

  const updateInterview = (interviewId: string, updated: Partial<Interview>) => {
    setInterviews(prev => prev.map(i => i.id === interviewId ? { ...i, ...updated } : i));
    showToast('Entrevista e avaliação com IA salvas!');
  };

  const updateCandidateCv = (updated: Partial<Candidate>) => {
    setCandidate(prev => ({ ...prev, ...updated }));
    showToast('Currículo atualizado com sucesso!');
  };

  const updateApplicationStatus = (appId: string, status: Application['status']) => {
    setApplications(prev => prev.map(a => a.id === appId ? { ...a, status } : a));
    showToast(`Status da candidatura atualizado para "${status}"!`);
  };

  const addTenantClient = (client: Omit<TenantClient, 'id' | 'createdAt'>) => {
    const newTenant: TenantClient = {
      ...client,
      id: `tenant-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setTenantClients(prev => [newTenant, ...prev]);
    showToast(`Empresa cliente ${client.companyName} cadastrada no Painel Master!`);
  };

  return (
    <AppContext.Provider value={{
      currentRole,
      setCurrentRole,
      activeTab,
      setActiveTab,
      appCustomization,
      updateCustomization,
      portalTabs,
      updateTabLabel,
      reorderTab,
      toggleTabActive,
      deleteTab,
      addCustomTab,
      resetMasterCustomization,
      masterNavigateTo,
      jobs,
      candidate,
      applications,
      interviews,
      documents,
      timeLogs,
      payslips,
      benefits,
      vacationRequests,
      employees,
      tenantClients,
      saasPlans,
      auditLogs,
      talentPool,
      addJob,
      createJob: addJob,
      applyToJob,
      clockIn,
      clockOut,
      requestVacation,
      addEmployee,
      updateEmployee,
      uploadDocument,
      approveDocument,
      approveVacation,
      updateCandidateCv,
      updateApplicationStatus,
      addInterview,
      updateInterview,
      addTenantClient,
      toastMessage,
      showToast,
      selectedJob,
      setSelectedJob,
      selectedPayslip,
      setSelectedPayslip
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};
