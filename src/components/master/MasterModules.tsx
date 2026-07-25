import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import {
  Palette,
  Sliders,
  ArrowUp,
  ArrowDown,
  Trash2,
  Edit3,
  Plus,
  Eye,
  EyeOff,
  RotateCcw,
  Check,
  ExternalLink,
  Sparkles,
  Building2,
  Users,
  Briefcase,
  ShieldAlert,
  Layers,
  Type,
  Layout
} from 'lucide-react';

export const MasterModules: React.FC = () => {
  const {
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
    showToast
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'modules' | 'theme' | 'teleport'>('modules');
  const [selectedPortal, setSelectedPortal] = useState<'public' | 'candidate' | 'company' | 'master'>('company');

  // Inline name editing state
  const [editingTabId, setEditingTabId] = useState<string | null>(null);
  const [editingLabel, setEditingLabel] = useState('');

  // New module state
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTabLabel, setNewTabLabel] = useState('');
  const [newTabDesc, setNewTabDesc] = useState('');

  // Branding text state
  const [sysName, setSysName] = useState(appCustomization.systemName);
  const [sysTagline, setSysTagline] = useState(appCustomization.systemTagline);

  // Preset Themes
  const THEME_PRESETS = [
    {
      name: 'Verde Oliva (Padrão)',
      preset: 'sage',
      primaryColor: '#5D6D4E',
      accentColor: '#8C7355',
      headerBgColor: '#F8F7F2'
    },
    {
      name: 'Azul Corporativo',
      preset: 'blue',
      primaryColor: '#2563eb',
      accentColor: '#1d4ed8',
      headerBgColor: '#eff6ff'
    },
    {
      name: 'Dark Luxury (Noturno)',
      preset: 'dark',
      primaryColor: '#0f172a',
      accentColor: '#38bdf8',
      headerBgColor: '#1e293b'
    },
    {
      name: 'Roxo Imperial Tech',
      preset: 'purple',
      primaryColor: '#7e22ce',
      accentColor: '#a855f7',
      headerBgColor: '#faf5ff'
    },
    {
      name: 'Esmeralda Conecta',
      preset: 'emerald',
      primaryColor: '#059669',
      accentColor: '#10b981',
      headerBgColor: '#f0fdf4'
    }
  ];

  const handleApplyPreset = (preset: typeof THEME_PRESETS[0]) => {
    updateCustomization({
      themePreset: preset.preset as any,
      primaryColor: preset.primaryColor,
      accentColor: preset.accentColor,
      headerBgColor: preset.headerBgColor
    });
  };

  const handleSaveBranding = () => {
    updateCustomization({
      systemName: sysName,
      systemTagline: sysTagline
    });
  };

  const startEditTab = (id: string, currentLabel: string) => {
    setEditingTabId(id);
    setEditingLabel(currentLabel);
  };

  const saveEditTab = (portal: string, tabId: string) => {
    if (!editingLabel.trim()) return;
    updateTabLabel(portal, tabId, editingLabel.trim());
    setEditingTabId(null);
  };

  const handleAddNewModule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTabLabel.trim()) return;
    const tabId = `mod-${Date.now()}`;
    addCustomTab(selectedPortal, {
      id: tabId,
      label: newTabLabel.trim(),
      description: newTabDesc.trim() || 'Módulo adicionado pelo Administrador Master'
    });
    setNewTabLabel('');
    setNewTabDesc('');
    setShowAddModal(false);
  };

  const currentPortalTabsList = (portalTabs[selectedPortal] || []).sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-6 py-6 text-slate-800">
      {/* Page Title & Overview */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-purple-100 text-purple-800 font-bold text-xs rounded-full uppercase tracking-wider flex items-center gap-1">
              <ShieldAlert className="w-3.5 h-3.5" /> Controle Total Master
            </span>
            <span className="text-xs text-slate-400">• Todos os privilégios habilitados</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 mt-2">Gestão Master de Módulos, Páginas & Temas</h1>
          <p className="text-xs text-slate-500 mt-1">
            Altere nomes de abas, ordens de exibição, exclua módulos, mude as cores de todas as páginas e acesse qualquer recurso instantaneamente.
          </p>
        </div>

        <button
          onClick={resetMasterCustomization}
          className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl text-xs flex items-center gap-2 transition-colors cursor-pointer shrink-0"
        >
          <RotateCcw className="w-4 h-4 text-slate-500" /> Redefinir para Padrão
        </button>
      </div>

      {/* Main Tab Navigation inside Master Modules Editor */}
      <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 w-fit">
        <button
          onClick={() => setActiveSubTab('modules')}
          className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer ${
            activeSubTab === 'modules' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Sliders className="w-4 h-4 text-purple-600" />
          <span>Gestão de Módulos (Nomes, Mover, Excluir)</span>
        </button>
        <button
          onClick={() => setActiveSubTab('theme')}
          className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer ${
            activeSubTab === 'theme' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Palette className="w-4 h-4 text-blue-600" />
          <span>Cores & Personalização Visual</span>
        </button>
        <button
          onClick={() => setActiveSubTab('teleport')}
          className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer ${
            activeSubTab === 'teleport' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <ExternalLink className="w-4 h-4 text-emerald-600" />
          <span>Acesso Direto / Teleporte a Todos os Módulos</span>
        </button>
      </div>

      {/* SUB-TAB 1: MODULES MANAGEMENT (RENAME, MOVE, DELETE, ADD) */}
      {activeSubTab === 'modules' && (
        <div className="space-y-6">
          {/* Portal Selector Bar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Selecione o Portal:</span>
              <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
                <button
                  onClick={() => setSelectedPortal('public')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all ${
                    selectedPortal === 'public' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600'
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5" /> Portal Público
                </button>
                <button
                  onClick={() => setSelectedPortal('candidate')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all ${
                    selectedPortal === 'candidate' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600'
                  }`}
                >
                  <Users className="w-3.5 h-3.5" /> Área do Candidato
                </button>
                <button
                  onClick={() => setSelectedPortal('company')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all ${
                    selectedPortal === 'company' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600'
                  }`}
                >
                  <Briefcase className="w-3.5 h-3.5" /> Área da Empresa
                </button>
                <button
                  onClick={() => setSelectedPortal('master')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all ${
                    selectedPortal === 'master' ? 'bg-purple-700 text-white shadow-xs' : 'text-slate-600'
                  }`}
                >
                  <ShieldAlert className="w-3.5 h-3.5" /> Painel Master
                </button>
              </div>
            </div>

            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Adicionar Novo Módulo a este Portal
            </button>
          </div>

          {/* List of Modules for Selected Portal */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between text-xs font-bold">
              <span>Módulos Ativos no Portal {selectedPortal.toUpperCase()} ({currentPortalTabsList.length})</span>
              <span>Ações Master: Renomear • Mover • Visibilidade • Excluir</span>
            </div>

            <div className="divide-y divide-slate-100">
              {currentPortalTabsList.map((tab, idx) => (
                <div
                  key={tab.id}
                  className={`p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors ${
                    !tab.active ? 'bg-slate-50/80 opacity-75' : 'hover:bg-slate-50/50'
                  }`}
                >
                  {/* Left: Position badge, Name, and Description */}
                  <div className="flex items-start gap-3 flex-1">
                    <span className="px-2.5 py-1 bg-slate-100 text-slate-700 font-bold rounded-lg text-xs border border-slate-200 shrink-0">
                      #{idx + 1}
                    </span>

                    <div className="space-y-1 flex-1">
                      {editingTabId === tab.id ? (
                        <div className="flex items-center gap-2 max-w-md">
                          <input
                            type="text"
                            value={editingLabel}
                            onChange={(e) => setEditingLabel(e.target.value)}
                            className="px-3 py-1.5 border border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-xl text-xs font-bold text-slate-900 flex-1 bg-white"
                            autoFocus
                          />
                          <button
                            onClick={() => saveEditTab(selectedPortal, tab.id)}
                            className="p-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg cursor-pointer"
                            title="Salvar Novo Nome"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-slate-900 text-sm">{tab.label}</h3>
                          <button
                            onClick={() => startEditTab(tab.id, tab.label)}
                            className="p-1 text-slate-400 hover:text-purple-600 rounded cursor-pointer"
                            title="Renomear este Módulo"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}

                      <p className="text-xs text-slate-500">{tab.description || 'Módulo do sistema'}</p>
                    </div>
                  </div>

                  {/* Right: Controls (Move Up/Down, Toggle Visibility, Access, Delete) */}
                  <div className="flex items-center gap-2 shrink-0">
                    {/* Move Up / Down */}
                    <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200">
                      <button
                        onClick={() => reorderTab(selectedPortal, tab.id, 'up')}
                        disabled={idx === 0}
                        className="p-1.5 text-slate-600 hover:text-slate-900 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                        title="Mover para cima"
                      >
                        <ArrowUp className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => reorderTab(selectedPortal, tab.id, 'down')}
                        disabled={idx === currentPortalTabsList.length - 1}
                        className="p-1.5 text-slate-600 hover:text-slate-900 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                        title="Mover para baixo"
                      >
                        <ArrowDown className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Active / Hide Toggle */}
                    <button
                      onClick={() => toggleTabActive(selectedPortal, tab.id)}
                      className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-colors ${
                        tab.active
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
                          : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                      }`}
                    >
                      {tab.active ? <Eye className="w-3.5 h-3.5 text-emerald-600" /> : <EyeOff className="w-3.5 h-3.5 text-slate-500" />}
                      <span>{tab.active ? 'Ativo' : 'Oculto'}</span>
                    </button>

                    {/* Direct Teleport / Test Page */}
                    <button
                      onClick={() => masterNavigateTo(selectedPortal as UserRole, tab.id)}
                      className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold rounded-xl text-xs border border-blue-200 flex items-center gap-1 transition-colors cursor-pointer"
                      title="Abrir este módulo imediatamente"
                    >
                      <ExternalLink className="w-3.5 h-3.5" /> Abrir Módulo
                    </button>

                    {/* Delete Module Button */}
                    <button
                      onClick={() => {
                        if (confirm(`Tem certeza que deseja EXCLUIR o módulo "${tab.label}" do portal ${selectedPortal.toUpperCase()}?`)) {
                          deleteTab(selectedPortal, tab.id);
                        }
                      }}
                      className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl border border-red-200 transition-colors cursor-pointer"
                      title="Excluir Módulo Permanentemente"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: THEME & COLOR CUSTOMIZATION */}
      {activeSubTab === 'theme' && (
        <div className="space-y-6">
          {/* Preset Themes Selector */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-600" /> Temas de Cores Pré-configurados (1 Clique)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
              {THEME_PRESETS.map((p) => (
                <button
                  key={p.preset}
                  onClick={() => handleApplyPreset(p)}
                  className={`p-4 rounded-2xl border text-left flex flex-col justify-between gap-3 transition-all cursor-pointer hover:shadow-md ${
                    appCustomization.themePreset === p.preset
                      ? 'border-purple-600 ring-2 ring-purple-500/20 bg-purple-50/30'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <span className="font-bold text-xs text-slate-900">{p.name}</span>
                  <div className="flex items-center gap-1.5">
                    <div className="w-6 h-6 rounded-full border border-slate-300 shadow-xs" style={{ backgroundColor: p.primaryColor }} title="Cor Primária" />
                    <div className="w-6 h-6 rounded-full border border-slate-300 shadow-xs" style={{ backgroundColor: p.accentColor }} title="Cor Destaque" />
                    <div className="w-6 h-6 rounded-full border border-slate-300 shadow-xs" style={{ backgroundColor: p.headerBgColor }} title="Fundo Cabeçalho" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Custom Color Pickers & Branding Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Custom Palette Editor */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Palette className="w-5 h-5 text-blue-600" /> Editor Personalizado de Cores
              </h2>

              <div className="space-y-4 text-xs">
                {/* Primary Color Picker */}
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl border border-slate-200">
                  <div>
                    <span className="font-bold text-slate-900 block">Cor Primária (Abas ativas & Destaques)</span>
                    <span className="text-slate-500 text-[11px]">Define a cor dos botões e do menu ativo</span>
                  </div>
                  <input
                    type="color"
                    value={appCustomization.primaryColor}
                    onChange={(e) => updateCustomization({ primaryColor: e.target.value })}
                    className="w-10 h-10 rounded-xl cursor-pointer border-0 p-0"
                  />
                </div>

                {/* Accent Color Picker */}
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl border border-slate-200">
                  <div>
                    <span className="font-bold text-slate-900 block">Cor de Destaque Secundária</span>
                    <span className="text-slate-500 text-[11px]">Usada em selos, badges e destaques</span>
                  </div>
                  <input
                    type="color"
                    value={appCustomization.accentColor}
                    onChange={(e) => updateCustomization({ accentColor: e.target.value })}
                    className="w-10 h-10 rounded-xl cursor-pointer border-0 p-0"
                  />
                </div>

                {/* Header Background Picker */}
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl border border-slate-200">
                  <div>
                    <span className="font-bold text-slate-900 block">Fundo do Cabeçalho Superior</span>
                    <span className="text-slate-500 text-[11px]">Cor do topo da aplicação onde fica o seletor de portais</span>
                  </div>
                  <input
                    type="color"
                    value={appCustomization.headerBgColor}
                    onChange={(e) => updateCustomization({ headerBgColor: e.target.value })}
                    className="w-10 h-10 rounded-xl cursor-pointer border-0 p-0"
                  />
                </div>
              </div>
            </div>

            {/* Platform Branding & Naming */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Type className="w-5 h-5 text-indigo-600" /> Nome da Plataforma & Subtítulo Global
              </h2>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Nome do Sistema (Ex: GESTRH, TALENTPRO)</label>
                  <input
                    type="text"
                    value={sysName}
                    onChange={(e) => setSysName(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-slate-300 focus:ring-2 focus:ring-purple-500 rounded-xl text-xs font-bold text-slate-900"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Subtítulo / Slogan do Topo</label>
                  <input
                    type="text"
                    value={sysTagline}
                    onChange={(e) => setSysTagline(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-slate-300 focus:ring-2 focus:ring-purple-500 rounded-xl text-xs font-bold text-slate-900"
                  />
                </div>

                <button
                  onClick={handleSaveBranding}
                  className="w-full py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl text-xs shadow-sm transition-colors cursor-pointer"
                >
                  Salvar Novo Nome & Subtítulo
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 3: TELEPORT DIRECT ACCESS TO ALL MODULES */}
      {activeSubTab === 'teleport' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 mb-1">
              <ExternalLink className="w-5 h-5 text-emerald-600" /> Matriz de Acesso Direto a Todos os Módulos da Plataforma
            </h2>
            <p className="text-xs text-slate-500 mb-6">
              Como Administrador Master, você pode acessar e inspecionar instantaneamente qualquer módulo de qualquer portal em 1 clique.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(['public', 'candidate', 'company', 'master'] as const).map((portal) => (
                <div key={portal} className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                      {portal === 'public' && <Building2 className="w-4 h-4 text-slate-600" />}
                      {portal === 'candidate' && <Users className="w-4 h-4 text-blue-600" />}
                      {portal === 'company' && <Briefcase className="w-4 h-4 text-emerald-600" />}
                      {portal === 'master' && <ShieldAlert className="w-4 h-4 text-purple-600" />}
                      Portal: {portal.toUpperCase()}
                    </span>
                    <span className="text-[11px] font-bold text-slate-500">
                      {(portalTabs[portal] || []).length} Módulos
                    </span>
                  </div>

                  <div className="space-y-2">
                    {(portalTabs[portal] || []).map((t) => (
                      <div
                        key={t.id}
                        className="bg-white p-3 rounded-xl border border-slate-200 flex items-center justify-between gap-2 shadow-2xs"
                      >
                        <div>
                          <span className="font-bold text-xs text-slate-900 block">{t.label}</span>
                          <span className="text-[10px] text-slate-400 font-mono">ID: {t.id}</span>
                        </div>

                        <button
                          onClick={() => masterNavigateTo(portal, t.id)}
                          className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg text-xs flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          <ExternalLink className="w-3 h-3" /> Entrar
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Modal for Adding New Custom Module */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4">
          <div className="bg-white p-6 rounded-3xl shadow-2xl border border-slate-200 max-w-md w-full space-y-4">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Plus className="w-5 h-5 text-purple-600" /> Adicionar Novo Módulo ao Portal {selectedPortal.toUpperCase()}
            </h2>

            <form onSubmit={handleAddNewModule} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Nome do Módulo / Aba</label>
                <input
                  type="text"
                  placeholder="Ex: Treinamentos, Compliance, Ouvidoria..."
                  value={newTabLabel}
                  onChange={(e) => setNewTabLabel(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 font-bold text-slate-900"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Descrição Breve do Módulo</label>
                <input
                  type="text"
                  placeholder="Ex: Gestão e acompanhamento de cursos e certificações"
                  value={newTabDesc}
                  onChange={(e) => setNewTabDesc(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 text-slate-700"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold rounded-xl cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl shadow-xs cursor-pointer"
                >
                  Criar Módulo agora
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
