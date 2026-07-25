import React from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import {
  Users,
  Briefcase,
  ShieldAlert,
  Building2,
  Sparkles,
  UserCheck,
  FileText,
  Clock,
  DollarSign,
  Gift,
  Sun,
  LayoutDashboard,
  Search,
  Settings,
  Shield,
  Bot,
  Database,
  Lock,
  Layers,
  History,
  HardDrive,
  Sliders,
  Palette
} from 'lucide-react';

// Icon Map for Dynamic Tabs
const TAB_ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  home: Building2,
  jobs: Briefcase,
  'talent-pool': Search,
  companies: Building2,
  about: Building2,
  contact: Building2,
  auth: Lock,
  dashboard: LayoutDashboard,
  resume: FileText,
  applications: Briefcase,
  interviews: Users,
  documents: FileText,
  timeclock: Clock,
  payslips: DollarSign,
  benefits: Gift,
  vacations: Sun,
  profile: Settings,
  employees: Users,
  recruitment: Sparkles,
  dp: UserCheck,
  financial: DollarSign,
  reports: FileText,
  settings: Settings,
  users: Shield,
  'master-clients': Building2,
  'master-plans': Layers,
  'master-modules': Sliders,
  'master-permissions': Lock,
  'master-ai': Bot,
  'master-db': Database,
  'master-logs': History,
  'master-integrations': HardDrive
};

export const Navbar: React.FC = () => {
  const { currentRole, setCurrentRole, activeTab, setActiveTab, portalTabs, appCustomization } = useApp();

  const handleRoleChange = (role: UserRole) => {
    setCurrentRole(role);
  };

  const getActiveTabList = () => {
    const rawList = portalTabs[currentRole] || [];
    return rawList.filter(t => t.active !== false).sort((a, b) => a.order - b.order);
  };

  return (
    <header className="bg-white border-b border-slate-200 text-slate-800 sticky top-0 z-40 shadow-xs">
      {/* Top Banner: Global Portal Role Selector & Dynamic Branding */}
      <div 
        className="px-4 py-2 text-xs flex flex-wrap items-center justify-between gap-2 border-b border-slate-200"
        style={{ backgroundColor: appCustomization.headerBgColor }}
      >
        <div className="flex items-center gap-2.5">
          <div 
            className="w-8 h-8 rounded-xl text-white flex items-center justify-center font-serif font-bold text-lg tracking-tighter shadow-xs"
            style={{ backgroundColor: appCustomization.primaryColor }}
          >
            {appCustomization.systemName.charAt(0)}
          </div>
          <span className="font-serif font-bold text-lg tracking-tight text-slate-900 flex items-center gap-2">
            {appCustomization.systemName}{' '}
            <span className="font-sans font-normal text-slate-500 text-xs hidden sm:inline">
              | {appCustomization.systemTagline}
            </span>
          </span>
        </div>

        {/* Portal Switching Bar + Master Shortcut */}
        <div className="flex items-center gap-1.5 bg-slate-200/70 p-1 rounded-2xl border border-slate-300/50">
          <button
            onClick={() => handleRoleChange('public')}
            className={`px-3 py-1 rounded-xl font-semibold transition-all flex items-center gap-1.5 text-xs cursor-pointer ${
              currentRole === 'public'
                ? 'bg-slate-800 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" /> Portal Público
          </button>
          <button
            onClick={() => handleRoleChange('candidate')}
            className={`px-3 py-1 rounded-xl font-semibold transition-all flex items-center gap-1.5 text-xs cursor-pointer ${
              currentRole === 'candidate'
                ? 'bg-slate-800 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <Users className="w-3.5 h-3.5" /> Área do Candidato
          </button>
          <button
            onClick={() => handleRoleChange('company')}
            className={`px-3 py-1 rounded-xl font-semibold transition-all flex items-center gap-1.5 text-xs cursor-pointer ${
              currentRole === 'company'
                ? 'bg-slate-800 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" /> Área da Empresa
          </button>
          <button
            onClick={() => handleRoleChange('master')}
            className={`px-3 py-1 rounded-xl font-semibold transition-all flex items-center gap-1.5 text-xs cursor-pointer ${
              currentRole === 'master'
                ? 'bg-purple-700 text-white shadow-xs font-bold'
                : 'text-purple-700 hover:text-purple-900 hover:bg-purple-100/60 font-bold'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" /> Painel MASTER
          </button>
        </div>
      </div>

      {/* Main Sub-Navigation Tabs Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between gap-2 py-2 overflow-x-auto no-scrollbar text-xs font-medium">
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
            {getActiveTabList().map((tab) => {
              const Icon = TAB_ICON_MAP[tab.id] || LayoutDashboard;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? 'text-white font-bold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                  style={isActive ? { backgroundColor: appCustomization.primaryColor } : {}}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Quick Master Admin Module Customizer Button */}
          {currentRole === 'master' && (
            <button
              onClick={() => setActiveTab('master-modules')}
              className="px-3 py-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5 hover:opacity-90 shrink-0 cursor-pointer"
            >
              <Palette className="w-3.5 h-3.5" /> Editar Cores & Módulos
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};

