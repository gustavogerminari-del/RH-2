import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle, AlertCircle, X } from 'lucide-react';

export const NotificationToast: React.FC = () => {
  const { toastMessage } = useApp();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center gap-3 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl border border-slate-700 animate-slide-up transition-all max-w-md">
      <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
      <span className="text-sm font-medium text-slate-100">{toastMessage}</span>
    </div>
  );
};
