import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DocumentItem } from '../../types';
import { FileText, Upload, CheckCircle2, Clock, AlertCircle, Plus, ShieldCheck } from 'lucide-react';

export const CandidateDocuments: React.FC = () => {
  const { documents, uploadDocument } = useApp();
  const [docType, setDocType] = useState<DocumentItem['type']>('RG');
  const [docName, setDocName] = useState('');

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!docName.trim()) return;
    uploadDocument({
      type: docType,
      name: docName.endsWith('.pdf') ? docName : `${docName}.pdf`
    });
    setDocName('');
  };

  return (
    <div className="space-y-6 py-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Upload de Documentos de Admissão</h1>
        <p className="text-xs text-slate-500 mt-1">Envie com segurança seus comprovantes para validação do RH</p>
      </div>

      {/* Upload Form */}
      <form onSubmit={handleUpload} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
        <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
          <Upload className="w-4 h-4 text-blue-600" /> Enviar Novo Documento
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Tipo de Documento</label>
            <select
              value={docType}
              onChange={(e) => setDocType(e.target.value as any)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-500"
            >
              <option value="RG">RG / Identidade</option>
              <option value="CPF">CPF</option>
              <option value="Carteira de Trabalho">Carteira de Trabalho (CTPS)</option>
              <option value="Comprovante Residência">Comprovante de Residência</option>
              <option value="Diploma">Diploma / Certificado</option>
              <option value="Outro">Outros Documentos</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Nome do Arquivo</label>
            <input
              type="text"
              required
              placeholder="Ex: RG_Lucas_Atualizado"
              value={docName}
              onChange={(e) => setDocName(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <button
          type="submit"
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4" /> Enviar para Análise
        </button>
      </form>

      {/* Documents List */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs">
        <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-3">Documentos Enviados</h3>

        <div className="divide-y divide-slate-100">
          {documents.map(doc => (
            <div key={doc.id} className="py-3.5 flex items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-slate-100 text-slate-700 rounded-xl">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-slate-800 block">{doc.name}</span>
                  <span className="text-slate-400">Tipo: {doc.type} • Enviado em {doc.uploadDate}</span>
                </div>
              </div>

              <div>
                {doc.status === 'Aprovado' && (
                  <span className="px-3 py-1 bg-emerald-50 text-emerald-700 font-bold border border-emerald-200 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Aprovado
                  </span>
                )}
                {doc.status === 'Pendente' && (
                  <span className="px-3 py-1 bg-amber-50 text-amber-700 font-bold border border-amber-200 rounded-full flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> Em Análise
                  </span>
                )}
                {doc.status === 'Rejeitado' && (
                  <span className="px-3 py-1 bg-rose-50 text-rose-700 font-bold border border-rose-200 rounded-full flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" /> Rejeitado
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
