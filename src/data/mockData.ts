import {
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
  Talent
} from '../types';

export const INITIAL_JOBS: Job[] = [
  {
    id: 'job-1',
    title: 'Desenvolvedor Full Stack Senior (React & Node)',
    companyName: 'TechInova Soluções',
    location: 'São Paulo, SP',
    modality: 'Híbrido',
    contractType: 'CLT',
    department: 'Tecnologia',
    salaryRange: 'R$ 12.000 - R$ 16.000',
    description: 'Buscamos um Desenvolvedor Full Stack Sênior para liderar a evolução da nossa plataforma de microsserviços e portais internos. Você atuará diretamente na arquitetura e integração com IA.',
    requirements: [
      'Domínio avançado de React.js, TypeScript e Node.js/Express',
      'Experiência com bancos de dados relacionais (PostgreSQL) e NoSQL',
      'Conhecimento de arquitetura Serverless e Cloud (AWS ou GCP)',
      'Vivência com metodologias ágeis e CI/CD'
    ],
    benefits: ['Vale Refeição R$ 1.200/mês', 'Plano de Saúde Bradesco Top', 'Seguro de Vida', 'Auxílio Home Office R$ 400'],
    status: 'Ativa',
    createdAt: '2026-07-20',
    applicationsCount: 28,
  },
  {
    id: 'job-2',
    title: 'Analista de Recursos Humanos Sênior (BP)',
    companyName: 'Germinari Holding',
    location: 'Rio de Janeiro, RJ',
    modality: 'Presencial',
    contractType: 'CLT',
    department: 'Recursos Humanos',
    salaryRange: 'R$ 8.500 - R$ 10.500',
    description: 'Atuação como HR Business Partner responsável por estratégias de atração de talentos, People Analytics, avaliação de desempenho e gestão do clima organizacional.',
    requirements: [
      'Superior completo em Psicologia, Administração ou Gestão de RH',
      'Mínimo de 5 anos como HRBP ou Analista de RH Sênior',
      'Domínio em subsistemas de DPA e T&D',
      'Conhecimento avançado em subsistemas de Recrutamento com IA'
    ],
    benefits: ['Vale Refeição R$ 1.000', 'Vale Transporte ou Combustível', 'Gympass Gold'],
    status: 'Ativa',
    createdAt: '2026-07-18',
    applicationsCount: 19,
  },
  {
    id: 'job-3',
    title: 'Especialista em Departamento Pessoal (Folha & eSocial)',
    companyName: 'Logística Sul-Americana',
    location: 'Curitiba, PR',
    modality: 'Remoto',
    contractType: 'CLT',
    department: 'Departamento Pessoal',
    salaryRange: 'R$ 7.000 - R$ 9.000',
    description: 'Responsável pelo fechamento mensal da folha de pagamento para +800 colaboradores, transmissão do eSocial, SEFIP, relatórios de FGTS e encargos trabalhistas.',
    requirements: [
      'Sólidos conhecimentos da Legislação Trabalhista (CLT)',
      'Experiência comprovada em eSocial, DCTFWeb e Reinf',
      'Excelente raciocínio analítico para conferência de impostos'
    ],
    benefits: ['Plano de Saúde Unimed', 'Vale Refeição R$ 900', 'Plano Odontológico'],
    status: 'Ativa',
    createdAt: '2026-07-22',
    applicationsCount: 14,
  },
  {
    id: 'job-4',
    title: 'UX/UI Designer Pleno',
    companyName: 'Fintech PagExpress',
    location: 'Florianópolis, SC',
    modality: 'Remoto',
    contractType: 'PJ',
    department: 'Design',
    salaryRange: 'R$ 8.000 - R$ 10.000',
    description: 'Criação de jornadas de usuário intuitivas para nossos aplicativos de pagamento e painéis administrativos para estabelecimentos comerciais.',
    requirements: [
      'Portfólio consistente com cases de UI/UX para Web e Mobile',
      'Domínio avançado de Figma, Design System e prototipagem interativa',
      'Habilidade em conduzir testes de usabilidade e pesquisas com usuários'
    ],
    benefits: ['Horário flexível', 'Bônus por performance semestral'],
    status: 'Ativa',
    createdAt: '2026-07-23',
    applicationsCount: 42,
  }
];

export const INITIAL_CANDIDATE: Candidate = {
  id: 'cand-101',
  name: 'Lucas Germinari',
  email: 'lucas.candidato@gestrh.com.br',
  phone: '(11) 98765-4321',
  location: 'São Paulo, SP',
  title: 'Engenheiro de Software & Especialista em Sistemas de RH',
  summary: 'Desenvolvedor com mais de 6 anos de experiência em arquitetura de aplicações Web escaláveis, especialista em React, TypeScript e automação de processos corporativos com Inteligência Artificial.',
  experienceYears: 6,
  skills: ['React.js', 'TypeScript', 'Node.js', 'Express', 'Tailwind CSS', 'PostgreSQL', 'IA Generativa', 'Gestão Ágil (Scrum)'],
  experiences: [
    {
      company: 'DataFlow Systems',
      role: 'Desenvolvedor Full Stack Senior',
      period: '2023 - Atual',
      description: 'Liderança técnica no desenvolvimento do módulo de automação de folha e inteligência preditiva para turnover.'
    },
    {
      company: 'WebPulse Tech',
      role: 'Desenvolvedor Front-end Pleno',
      period: '2020 - 2023',
      description: 'Criação de interfaces responsivas e dashboards analíticos para acompanhamento de KPIs de RH.'
    }
  ],
  education: [
    {
      institution: 'Universidade de São Paulo (USP)',
      degree: 'Bacharelado em Ciência da Computação',
      year: '2016 - 2020'
    }
  ],
  languages: ['Português (Nativo)', 'Inglês (Avançado/Fluente)', 'Espanhol (Intermediário)']
};

export const INITIAL_APPLICATIONS: Application[] = [
  {
    id: 'app-1',
    jobId: 'job-1',
    jobTitle: 'Desenvolvedor Full Stack Senior (React & Node)',
    companyName: 'TechInova Soluções',
    candidateId: 'cand-101',
    candidateName: 'Lucas Germinari',
    appliedAt: '2026-07-21',
    status: 'Entrevista',
    aiMatchScore: 94,
    aiFeedback: 'Candidato possui altíssima compatibilidade técnica (React, TypeScript, Node.js) e vivência em soluções para Recursos Humanos.',
    notes: 'Aprovado na triagem técnica. Agendada entrevista com o Lead de Engenharia.'
  },
  {
    id: 'app-2',
    jobId: 'job-4',
    jobTitle: 'UX/UI Designer Pleno',
    companyName: 'Fintech PagExpress',
    candidateId: 'cand-101',
    candidateName: 'Lucas Germinari',
    appliedAt: '2026-07-23',
    status: 'Triagem',
    aiMatchScore: 78,
    aiFeedback: 'Perfil forte em front-end com conhecimentos de prototipagem no Figma.',
    notes: 'Aguardando avaliação da liderança de design.'
  }
];

export const INITIAL_INTERVIEWS: Interview[] = [
  {
    id: 'int-1',
    applicationId: 'app-1',
    jobTitle: 'Desenvolvedor Full Stack Senior (React & Node)',
    candidateName: 'Lucas Germinari',
    interviewerName: 'Mariana Costa (Tech Lead)',
    dateTime: '2026-07-26 às 14:30',
    modality: 'Online',
    linkOrLocation: 'Sala Virtual GESTRH Live',
    status: 'Agendada',
    aiPrepQuestions: [
      'Como você aborda a migração de microsserviços mantendo alta disponibilidade?',
      'Qual sua experiência na otimização de consultas SQL para grandes volumes de dados de colaboradores?',
      'Como você integra modelos de IA (ex: Gemini API) com segurança no backend?'
    ]
  },
  {
    id: 'int-2',
    applicationId: 'app-102',
    jobTitle: 'Especialista em Departamento Pessoal',
    candidateName: 'Ana Beatriz Souza',
    interviewerName: 'Carlos Santos (RH Director)',
    dateTime: '2026-07-20 às 10:00',
    modality: 'Online',
    linkOrLocation: 'Sala Virtual GESTRH Live',
    status: 'Concluída',
    hasRecording: true,
    recordingDurationSeconds: 1240,
    aiPrepQuestions: [
      'Como você lida com os eventos de desligamento e S-2299 no eSocial?',
      'Qual o seu processo para auditagem de encargos trabalhistas antes do fechamento?'
    ],
    aiFeedback: {
      overallScore: 94,
      verdict: 'Aprovado para Próxima Etapa',
      summary: 'A candidata demonstrou conhecimento ímpar na rotina de eSocial, legislação CLT e condução de equipes operacionais de DP.',
      technicalCompetenceScore: 96,
      softSkillsScore: 92,
      communicationScore: 94,
      strengths: [
        'Domínio técnico avançado da malha do eSocial e DCTFWeb',
        'Comunicação articulada e segurança nas respostas',
        'Visão preventiva de contingências trabalhistas'
      ],
      improvements: [
        'Aprofundar vivência com implementação de ponto eletrônico em larga escala',
        'Compartilhar mais cases de automação com Python/Excel em rotinas passadas'
      ],
      recruiterNotes: 'Candidata nota 10. Forte recomendação de contratação para liderar o squad de DP e eSocial.',
      candidateFeedback: 'Parabéns pela excelente entrevista! A equipe apreciou muito seu conhecimento em eSocial e clareza nas explicações.',
      recordingDuration: '20m 40s',
      recordedAt: '2026-07-20 10:20'
    }
  }
];

export const INITIAL_DOCUMENTS: DocumentItem[] = [
  {
    id: 'doc-1',
    type: 'RG',
    name: 'RG_Lucas_Germinari.pdf',
    uploadDate: '2026-07-15',
    status: 'Aprovado',
    fileUrl: '#'
  },
  {
    id: 'doc-2',
    type: 'CPF',
    name: 'CPF_Comprovante_Receita.pdf',
    uploadDate: '2026-07-15',
    status: 'Aprovado',
    fileUrl: '#'
  },
  {
    id: 'doc-3',
    type: 'Carteira de Trabalho',
    name: 'CTPS_Digital_2026.pdf',
    uploadDate: '2026-07-16',
    status: 'Aprovado',
    fileUrl: '#'
  },
  {
    id: 'doc-4',
    type: 'Comprovante Residência',
    name: 'Conta_Luz_Julho_2026.pdf',
    uploadDate: '2026-07-20',
    status: 'Pendente',
    fileUrl: '#'
  }
];

export const INITIAL_TIME_LOGS: TimeClockLog[] = [
  {
    id: 'clk-1',
    date: '2026-07-24 (Hoje)',
    clockIn: '08:02',
    lunchOut: '12:00',
    lunchIn: '13:00',
    clockOut: '17:05',
    totalHours: '08h 03m',
    status: 'Normal'
  },
  {
    id: 'clk-2',
    date: '2026-07-23',
    clockIn: '07:58',
    lunchOut: '12:01',
    lunchIn: '13:00',
    clockOut: '18:15',
    totalHours: '09h 16m',
    status: 'Hora Extra'
  },
  {
    id: 'clk-3',
    date: '2026-07-22',
    clockIn: '08:15',
    lunchOut: '12:00',
    lunchIn: '13:00',
    clockOut: '17:00',
    totalHours: '07h 45m',
    status: 'Atraso'
  }
];

export const INITIAL_PAYSLIPS: Payslip[] = [
  {
    id: 'pay-jun-2026',
    monthYear: 'Junho / 2026',
    referenceDate: '05/07/2026',
    grossSalary: 12500.00,
    inssDeduction: 908.85,
    irrfDeduction: 2150.40,
    vtDeduction: 0.00,
    vrDeduction: 120.00,
    otherDeductions: 150.00,
    bonuses: 800.00,
    netSalary: 10170.75,
    status: 'Pago'
  },
  {
    id: 'pay-mai-2026',
    monthYear: 'Maio / 2026',
    referenceDate: '05/06/2026',
    grossSalary: 12500.00,
    inssDeduction: 908.85,
    irrfDeduction: 2150.40,
    vtDeduction: 0.00,
    vrDeduction: 120.00,
    otherDeductions: 150.00,
    bonuses: 0.00,
    netSalary: 9370.75,
    status: 'Pago'
  }
];

export const INITIAL_BENEFITS: Benefit[] = [
  {
    id: 'ben-1',
    name: 'Vale Refeição e Alimentação (Caju)',
    category: 'Alimentação',
    provider: 'Caju Benefícios',
    monthlyValue: 1200.00,
    status: 'Ativo',
    cardNumber: '**** **** **** 8842'
  },
  {
    id: 'ben-2',
    name: 'Plano de Saúde Especial',
    category: 'Saúde',
    provider: 'Bradesco Saúde Exclusivo',
    monthlyValue: 850.00,
    status: 'Ativo',
    cardNumber: 'BRD-7749102'
  },
  {
    id: 'ben-3',
    name: 'Gympass / Wellhub',
    category: 'Outro',
    provider: 'Wellhub Platinum',
    monthlyValue: 220.00,
    status: 'Ativo'
  }
];

export const INITIAL_VACATION_REQUESTS: VacationRequest[] = [
  {
    id: 'vac-1',
    startDate: '2026-09-10',
    endDate: '2026-09-25',
    daysCount: 15,
    sellDays: false,
    status: 'Aprovado',
    requestedAt: '2026-06-10'
  }
];

export const INITIAL_EMPLOYEES: Employee[] = [
  {
    id: 'emp-1',
    name: 'Carlos Eduardo Silva',
    email: 'carlos.silva@techinova.com.br',
    phone: '(11) 97123-4455',
    role: 'Engenheiro de Dados Senior',
    department: 'Tecnologia',
    hireDate: '2022-03-15',
    salary: 13800.00,
    status: 'Ativo'
  },
  {
    id: 'emp-2',
    name: 'Juliana Fernandes',
    email: 'juliana.f@techinova.com.br',
    phone: '(11) 98877-6655',
    role: 'Coordenadora de Marketing',
    department: 'Marketing',
    hireDate: '2023-01-10',
    salary: 9200.00,
    status: 'Ativo'
  },
  {
    id: 'emp-3',
    name: 'Renato Oliveira',
    email: 'renato.o@techinova.com.br',
    phone: '(21) 99112-2334',
    role: 'Analista Financeiro Pleno',
    department: 'Financeiro',
    hireDate: '2024-05-20',
    salary: 6500.00,
    status: 'Férias'
  },
  {
    id: 'emp-4',
    name: 'Beatriz Lima',
    email: 'beatriz.lima@techinova.com.br',
    phone: '(11) 97788-9900',
    role: 'Gerente de Recursos Humanos',
    department: 'Recursos Humanos',
    hireDate: '2021-08-01',
    salary: 16500.00,
    status: 'Ativo'
  }
];

export const INITIAL_TENANT_CLIENTS: TenantClient[] = [
  {
    id: 'tenant-1',
    companyName: 'TechInova Soluções SA',
    cnpj: '12.345.678/0001-90',
    planName: 'Enterprise RH + IA',
    usersCount: 18,
    employeesCount: 240,
    mrr: 4500.00,
    status: 'Ativo',
    createdAt: '2025-01-15',
    contactEmail: 'diretoria@techinova.com.br'
  },
  {
    id: 'tenant-2',
    companyName: 'Germinari Holding',
    cnpj: '98.765.432/0001-10',
    planName: 'Profissional RH',
    usersCount: 8,
    employeesCount: 95,
    mrr: 1890.00,
    status: 'Ativo',
    createdAt: '2025-04-10',
    contactEmail: 'rh@germinari.com.br'
  },
  {
    id: 'tenant-3',
    companyName: 'Logística Sul-Americana',
    cnpj: '45.112.334/0001-55',
    planName: 'Enterprise RH + IA',
    usersCount: 25,
    employeesCount: 820,
    mrr: 8900.00,
    status: 'Ativo',
    createdAt: '2024-11-01',
    contactEmail: 'dp@logisul.com.br'
  }
];

export const INITIAL_SAAS_PLANS: SaaSPlan[] = [
  {
    id: 'plan-basic',
    name: 'Básico Starter',
    monthlyPrice: 490.00,
    maxEmployees: 30,
    maxUsers: 3,
    features: [
      'Portal do Colaborador',
      'Gestão de Holerites e Benefícios',
      'Controle de Ponto Básico',
      'Até 2 vagas ativas simuladas'
    ]
  },
  {
    id: 'plan-pro',
    name: 'Profissional RH',
    monthlyPrice: 1890.00,
    maxEmployees: 150,
    maxUsers: 10,
    popular: true,
    features: [
      'Tudo do Plano Básico',
      'Triagem com IA para vagas (200 resumos/mês)',
      'Banco de Talentos com busca inteligente',
      'Relatórios e People Analytics completo',
      'Assinatura Digital de Documentos'
    ]
  },
  {
    id: 'plan-enterprise',
    name: 'Enterprise RH + IA Unlimited',
    monthlyPrice: 4500.00,
    maxEmployees: 1000,
    maxUsers: 50,
    features: [
      'Acesso ilimitado a todos os módulos com IA',
      'Atendimento e Suporte 24/7 com SLA dedicado',
      'Customização White-Label total',
      'Integração via API com WhatsApp & eSocial',
      'Gerente de Sucesso de Conta dedicado'
    ]
  }
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'log-1',
    timestamp: '2026-07-24 11:42:01',
    user: 'admin.master@gestrh.com.br',
    action: 'Atualização de Parâmetros do Gemini AI (Match Threshold = 85%)',
    ip: '189.120.45.12',
    module: 'Módulo IA',
    status: 'Sucesso'
  },
  {
    id: 'log-2',
    timestamp: '2026-07-24 10:15:33',
    user: 'beatriz.lima@techinova.com.br',
    action: 'Aprovação de solicitação de Férias (Emp. Renato Oliveira)',
    ip: '201.54.98.11',
    module: 'Departamento Pessoal',
    status: 'Sucesso'
  },
  {
    id: 'log-3',
    timestamp: '2026-07-24 09:02:18',
    user: 'lucas.candidato@gestrh.com.br',
    action: 'Registro de Ponto Entrada (08:02)',
    ip: '177.33.10.88',
    module: 'Ponto Eletrônico',
    status: 'Sucesso'
  }
];

export const INITIAL_TALENT_POOL: Talent[] = [
  {
    id: 'talent-1',
    name: 'Carolina Mendes',
    email: 'carolina.mendes@email.com',
    phone: '(11) 98877-6655',
    area: 'Tecnologia',
    resumeSummary: 'Desenvolvedora Frontend Sênior especializada em React, Next.js, TypeScript e Design Systems. 7 anos de experiência no mercado de Fintechs.',
    skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Redux', 'Jest'],
    aiMatchScore: 96
  },
  {
    id: 'talent-2',
    name: 'Roberto Souza',
    email: 'roberto.souza@email.com',
    phone: '(21) 97766-5544',
    area: 'Tecnologia',
    resumeSummary: 'Engenheiro Backend focado em Node.js, Python, microsserviços, PostgreSQL e AWS. Ampla vivência em sistemas de altíssima escala e mensageria RabbitMQ.',
    skills: ['Node.js', 'Python', 'PostgreSQL', 'Docker', 'AWS', 'Kubernetes'],
    aiMatchScore: 92
  },
  {
    id: 'talent-3',
    name: 'Fernanda Lima',
    email: 'fernanda.lima@email.com',
    phone: '(31) 96655-4433',
    area: 'Recursos Humanos',
    resumeSummary: 'Especialista em Atração de Talentos Tech & HRBP. Forte habilidade em recrutamento preditivo com IA, estratégias de EVP e People Analytics.',
    skills: ['Tech Sourcing', 'HRBP', 'People Analytics', 'Gupy', 'Atratividade de Marca'],
    aiMatchScore: 90
  },
  {
    id: 'talent-4',
    name: 'Marcelo Oliveira',
    email: 'marcelo.oliveira@email.com',
    phone: '(41) 95544-3322',
    area: 'Design',
    resumeSummary: 'Product Designer Lead com foco em pesquisa de usuário, arquitetura de informação e prototipagem em Figma para aplicações B2B SaaS.',
    skills: ['Figma', 'UI/UX Design', 'User Research', 'Design Systems', 'Prototipagem'],
    aiMatchScore: 88
  }
];
