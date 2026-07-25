export type UserRole = 'public' | 'candidate' | 'company' | 'master';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  candidateProfileId?: string;
  companyId?: string;
}

export interface Job {
  id: string;
  title: string;
  companyName: string;
  companyLogo?: string;
  location: string;
  modality: 'Presencial' | 'Remoto' | 'Híbrido';
  contractType: 'CLT' | 'PJ' | 'Estágio' | 'Temporário';
  department: string;
  salaryRange: string;
  description: string;
  requirements: string[];
  benefits: string[];
  status: 'Ativa' | 'Pausada' | 'Encerrada';
  createdAt: string;
  applicationsCount: number;
}

export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  title: string;
  summary: string;
  experienceYears: number;
  skills: string[];
  experiences: {
    company: string;
    role: string;
    period: string;
    description: string;
  }[];
  education: {
    institution: string;
    degree: string;
    year: string;
  }[];
  languages: string[];
  matchScore?: number;
}

export interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  companyName: string;
  candidateId: string;
  candidateName: string;
  appliedAt: string;
  status: 'Inscrito' | 'Triagem' | 'Entrevista' | 'Proposta' | 'Contratado' | 'Recusado';
  aiMatchScore: number;
  aiFeedback?: string;
  notes?: string;
}

export interface AIInterviewFeedback {
  overallScore: number;
  verdict: 'Aprovado para Próxima Etapa' | 'Aprovado com Ressalvas' | 'Reprovado';
  summary: string;
  technicalCompetenceScore: number;
  softSkillsScore: number;
  communicationScore: number;
  strengths: string[];
  improvements: string[];
  recruiterNotes: string;
  candidateFeedback: string;
  recordingDuration?: string;
  recordedAt?: string;
  transcriptSample?: string;
}

export interface Interview {
  id: string;
  applicationId: string;
  jobTitle: string;
  candidateName: string;
  interviewerName: string;
  dateTime: string;
  modality: 'Online' | 'Presencial';
  linkOrLocation: string;
  status: 'Agendada' | 'Em Andamento' | 'Concluída' | 'Cancelada';
  aiPrepQuestions?: string[];
  recordingUrl?: string;
  hasRecording?: boolean;
  recordingBlobUrl?: string;
  recordingDurationSeconds?: number;
  aiFeedback?: AIInterviewFeedback;
}

export interface DocumentItem {
  id: string;
  type: 'RG' | 'CPF' | 'Carteira de Trabalho' | 'Comprovante Residência' | 'Diploma' | 'Outro';
  name: string;
  uploadDate: string;
  status: 'Aprovado' | 'Pendente' | 'Rejeitado';
  fileUrl?: string;
}

export interface TimeClockLog {
  id: string;
  date: string;
  clockIn: string;
  lunchOut?: string;
  lunchIn?: string;
  clockOut?: string;
  totalHours: string;
  status: 'Normal' | 'Hora Extra' | 'Atraso' | 'Ajuste Solicitado';
}

export interface Payslip {
  id: string;
  monthYear: string;
  referenceDate: string;
  grossSalary: number;
  netSalary: number;
  inssDeduction: number;
  irrfDeduction: number;
  vtDeduction: number;
  vrDeduction: number;
  otherDeductions: number;
  bonuses: number;
  status: 'Pago' | 'Disponível' | 'Em Processamento';
}

export interface Benefit {
  id: string;
  name: string;
  category: 'Alimentação' | 'Transporte' | 'Saúde' | 'Odonto' | 'Seguro' | 'Outro';
  provider: string;
  monthlyValue: number;
  status: 'Ativo' | 'Pendente' | 'Cancelado';
  cardNumber?: string;
}

export interface VacationRequest {
  id: string;
  startDate: string;
  endDate: string;
  daysCount: number;
  sellDays: boolean; // vender 10 dias
  status: 'Aprovado' | 'Em Análise' | 'Recusado';
  requestedAt: string;
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  cpf?: string;
  rg?: string;
  birthDate?: string;
  gender?: string;
  maritalStatus?: string;
  
  // Address
  cep?: string;
  street?: string;
  number?: string;
  complement?: string;
  neighborhood?: string;
  city?: string;
  state?: string;

  // Employment Details
  role: string;
  department: string;
  hireDate?: string;
  admissionDate?: string;
  salary: number;
  contractType?: 'CLT' | 'PJ' | 'Estágio' | 'Temporário';
  ctps?: string;
  pis?: string;
  workHours?: string;
  status: 'Ativo' | 'Férias' | 'Licença' | 'Desligado';

  // Bank Details
  bank?: string;
  agency?: string;
  account?: string;
  pixKey?: string;

  avatarUrl?: string;
}

export interface TenantClient {
  id: string;
  companyName: string;
  cnpj: string;
  planName: string;
  usersCount: number;
  employeesCount: number;
  mrr: number;
  status: 'Ativo' | 'Inadimplente' | 'Trial' | 'Cancelado';
  createdAt: string;
  contactEmail: string;
}

export interface SaaSPlan {
  id: string;
  name: string;
  monthlyPrice: number;
  maxEmployees: number;
  maxUsers: number;
  features: string[];
  popular?: boolean;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  ip: string;
  module: string;
  status: 'Sucesso' | 'Alerta' | 'Erro';
}

export interface Talent {
  id: string;
  name: string;
  email: string;
  phone: string;
  area: string;
  resumeSummary: string;
  skills: string[];
  aiMatchScore: number;
}

export interface AppModuleTab {
  id: string;
  label: string;
  iconName?: string;
  active: boolean;
  portal: 'public' | 'candidate' | 'company' | 'master';
  order: number;
  description?: string;
}

export interface AppCustomization {
  primaryColor: string;
  accentColor: string;
  headerBgColor: string;
  systemName: string;
  systemTagline: string;
  themePreset: 'sage' | 'blue' | 'dark' | 'purple' | 'emerald';
}
