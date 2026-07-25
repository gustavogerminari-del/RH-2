import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { NotificationToast } from './components/common/NotificationToast';
import { PayslipModal } from './components/common/PayslipModal';
import { JobDetailsModal } from './components/common/JobDetailsModal';

// Public Components
import { PublicHome } from './components/public/PublicHome';
import { PublicJobs } from './components/public/PublicJobs';
import { PublicTalentPool } from './components/public/PublicTalentPool';
import { PublicCompanies } from './components/public/PublicCompanies';
import { PublicAbout } from './components/public/PublicAbout';
import { PublicContact } from './components/public/PublicContact';
import { PublicAuth } from './components/public/PublicAuth';

// Candidate Components
import { CandidateDashboard } from './components/candidate/CandidateDashboard';
import { CandidateApplications } from './components/candidate/CandidateApplications';
import { CandidateInterviews } from './components/candidate/CandidateInterviews';
import { CandidateResume } from './components/candidate/CandidateResume';
import { CandidateDocuments } from './components/candidate/CandidateDocuments';
import { CandidateTimeClock } from './components/candidate/CandidateTimeClock';
import { CandidatePayslips } from './components/candidate/CandidatePayslips';
import { CandidateBenefits } from './components/candidate/CandidateBenefits';
import { CandidateVacations } from './components/candidate/CandidateVacations';
import { CandidateProfile } from './components/candidate/CandidateProfile';

// Company Components
import { CompanyDashboard } from './components/company/CompanyDashboard';
import { CompanyEmployees } from './components/company/CompanyEmployees';
import { CompanyJobs } from './components/company/CompanyJobs';
import { CompanyTalentPool } from './components/company/CompanyTalentPool';
import { CompanyRecruitment } from './components/company/CompanyRecruitment';
import { CompanyDP } from './components/company/CompanyDP';
import { CompanyFinancial } from './components/company/CompanyFinancial';
import { CompanyReports } from './components/company/CompanyReports';
import { CompanyUsers } from './components/company/CompanyUsers';
import { CompanySettings } from './components/company/CompanySettings';

// Master Admin Components
import { MasterDashboard } from './components/master/MasterDashboard';
import { MasterClients } from './components/master/MasterClients';
import { MasterPlans } from './components/master/MasterPlans';
import { MasterModules } from './components/master/MasterModules';
import { MasterPermissions } from './components/master/MasterPermissions';
import { MasterAI } from './components/master/MasterAI';
import { MasterDatabase } from './components/master/MasterDatabase';
import { MasterLogs } from './components/master/MasterLogs';
import { MasterIntegrations } from './components/master/MasterIntegrations';

const MainContent: React.FC = () => {
  const { currentRole, activeTab } = useApp();

  const renderRoleView = () => {
    // 1. PUBLIC PORTAL
    if (currentRole === 'public') {
      switch (activeTab) {
        case 'home': return <PublicHome />;
        case 'jobs': return <PublicJobs />;
        case 'talent-pool': return <PublicTalentPool />;
        case 'companies': return <PublicCompanies />;
        case 'about': return <PublicAbout />;
        case 'contact': return <PublicContact />;
        case 'auth': return <PublicAuth />;
        default: return (
          <div className="py-12 px-6 bg-white rounded-3xl border border-slate-200 shadow-sm text-center space-y-4 my-6">
            <div className="w-12 h-12 bg-slate-100 text-slate-800 rounded-2xl flex items-center justify-center mx-auto font-bold text-xl">
              🌐
            </div>
            <h2 className="text-xl font-black text-slate-900">Módulo do Portal Público: {activeTab.toUpperCase()}</h2>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Página do portal público configurada e parametrizada via Painel Master.
            </p>
          </div>
        );
      }
    }

    // 2. CANDIDATE PORTAL
    if (currentRole === 'candidate') {
      switch (activeTab) {
        case 'dashboard': return <CandidateDashboard />;
        case 'jobs': return <PublicJobs />;
        case 'talent-pool': return <PublicTalentPool />;
        case 'applications': return <CandidateApplications />;
        case 'interviews': return <CandidateInterviews />;
        case 'resume': return <CandidateResume />;
        case 'documents': return <CandidateDocuments />;
        case 'timeclock': return <CandidateTimeClock />;
        case 'payslips': return <CandidatePayslips />;
        case 'benefits': return <CandidateBenefits />;
        case 'vacations': return <CandidateVacations />;
        case 'profile': return <CandidateProfile />;
        default: return (
          <div className="py-12 px-6 bg-white rounded-3xl border border-slate-200 shadow-sm text-center space-y-4 my-6">
            <div className="w-12 h-12 bg-blue-100 text-blue-800 rounded-2xl flex items-center justify-center mx-auto font-bold text-xl">
              👤
            </div>
            <h2 className="text-xl font-black text-slate-900">Módulo do Candidato: {activeTab.toUpperCase()}</h2>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Área de candidato criada pelo Painel Master.
            </p>
          </div>
        );
      }
    }

    // 3. COMPANY PORTAL
    if (currentRole === 'company') {
      switch (activeTab) {
        case 'dashboard': return <CompanyDashboard />;
        case 'employees': return <CompanyEmployees />;
        case 'jobs': return <CompanyJobs />;
        case 'talent-pool': return <CompanyTalentPool />;
        case 'recruitment': return <CompanyRecruitment />;
        case 'dp': return <CompanyDP />;
        case 'financial': return <CompanyFinancial />;
        case 'reports': return <CompanyReports />;
        case 'users': return <CompanyUsers />;
        case 'settings': return <CompanySettings />;
        default: return (
          <div className="py-12 px-6 bg-white rounded-3xl border border-slate-200 shadow-sm text-center space-y-4 my-6">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-2xl flex items-center justify-center mx-auto font-bold text-xl">
              🏢
            </div>
            <h2 className="text-xl font-black text-slate-900">Módulo de Empresa: {activeTab.toUpperCase()}</h2>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Módulo corporativo customizado e ativo para os gestores.
            </p>
          </div>
        );
      }
    }

    // 4. MASTER ADMIN PORTAL
    if (currentRole === 'master') {
      switch (activeTab) {
        case 'dashboard': return <MasterDashboard />;
        case 'master-clients': return <MasterClients />;
        case 'master-plans': return <MasterPlans />;
        case 'master-modules': return <MasterModules />;
        case 'master-permissions': return <MasterPermissions />;
        case 'master-ai': return <MasterAI />;
        case 'master-db': return <MasterDatabase />;
        case 'master-logs': return <MasterLogs />;
        case 'master-integrations': return <MasterIntegrations />;
        default: return (
          <div className="py-12 px-6 bg-white rounded-3xl border border-slate-200 shadow-sm text-center space-y-4 my-6">
            <div className="w-12 h-12 bg-purple-100 text-purple-700 rounded-2xl flex items-center justify-center mx-auto font-bold text-xl">
              🧩
            </div>
            <h2 className="text-xl font-black text-slate-900">Módulo Customizado Master: {activeTab.toUpperCase()}</h2>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Este módulo foi criado dinamicamente pelo Administrador Master. O formulário, regras de negócio e integrações estão ativos no ecossistema.
            </p>
            <div className="pt-2">
              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 font-bold text-xs rounded-full">
                ✓ Módulo Operacional
              </span>
            </div>
          </div>
        );
      }
    }

    return <PublicHome />;
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans antialiased">
      <Navbar />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-2">
        {renderRoleView()}
      </main>
      <Footer />
      <NotificationToast />
      <PayslipModal />
      <JobDetailsModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
