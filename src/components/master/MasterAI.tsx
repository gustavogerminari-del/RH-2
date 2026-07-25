import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Cpu, Sparkles, Save, CheckCircle2, RefreshCw } from 'lucide-react';

export const MasterAI: React.FC = () => {
  const { showToast } = useApp();
  const [model, setModel] = useState('gemini-2.5-flash');
  const [temperature, setTemperature] = useState('0.2');
  const [systemPrompt, setSystemPrompt] = useState(
    'Você é o assistente executivo de RH e Recrutamento do GestRH. Analise currículos e gere justificativas técnicas objetivas com pontuação de match de 0 a 100%.'
  );

  const handleSaveAI = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Parâmetros da Engine de Inteligência Artificial Gemini atualizados!');
  };

  return (
    <div className="max-w-3xl mx-auto py-6 space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Configuração da Engine IA Gemini</h1>
        <p className="text-xs text-slate-500 mt-1">Ajuste modelos, temperatura de geração e prompts do sistema para o GestRH</p>
      </div>

      <form onSubmit={handleSaveAI} className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5 shadow-xs text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Modelo de Linguagem (SDK @google/genai)</label>
            <select
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-bold text-purple-700"
            >
              <option value="gemini-2.5-flash">Gemini 2.5 Flash (Ultrarrápido - Recomendado)</option>
              <option value="gemini-2.5-pro">Gemini 2.5 Pro (Raciocínio Profundo)</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Temperatura de Amostragem</label>
            <input
              type="text"
              value={temperature}
              onChange={(e) => setTemperature(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-bold"
            />
          </div>
        </div>

        <div>
          <label className="block font-bold text-slate-700 mb-1">Prompt do Sistema (RH Analyst Prompt)</label>
          <textarea
            rows={5}
            value={systemPrompt}
            onChange={(e) => setSystemPrompt(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 leading-relaxed font-mono"
          />
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl text-xs flex items-center gap-2 transition-colors shadow-xs"
          >
            <Save className="w-4 h-4" /> Salvar Parâmetros IA
          </button>
        </div>
      </form>
    </div>
  );
};
