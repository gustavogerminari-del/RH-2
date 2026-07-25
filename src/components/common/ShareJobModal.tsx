import React, { useState, useRef, useEffect } from 'react';
import { Job } from '../../types';
import { useApp } from '../../context/AppContext';
import {
  X,
  Share2,
  Copy,
  Download,
  Send,
  Linkedin,
  Mail,
  Check,
  Sparkles,
  Image as ImageIcon,
  Palette,
  ExternalLink,
  MessageCircle
} from 'lucide-react';

interface ShareJobModalProps {
  job: Job | null;
  onClose: () => void;
}

export const ShareJobModal: React.FC<ShareJobModalProps> = ({ job, onClose }) => {
  const { showToast } = useApp();
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedText, setCopiedText] = useState(false);
  const [cardTheme, setCardTheme] = useState<'blue' | 'dark' | 'emerald' | 'purple'>('blue');
  const [cardFormat, setCardFormat] = useState<'feed' | 'square'>('feed'); // feed: 1200x630, square: 1080x1080
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Draw Banner on Canvas
  useEffect(() => {
    if (!job) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const isSquare = cardFormat === 'square';
    const width = isSquare ? 1080 : 1200;
    const height = isSquare ? 1080 : 630;

    canvas.width = width;
    canvas.height = height;

    // Background Gradient based on Theme
    let bgGrad = ctx.createLinearGradient(0, 0, width, height);
    let accentColor = '#2563eb';
    let textColor = '#0f172a';
    let badgeBg = '#dbeafe';
    let badgeText = '#1e40af';

    if (cardTheme === 'blue') {
      bgGrad.addColorStop(0, '#f8fafc');
      bgGrad.addColorStop(1, '#eff6ff');
      accentColor = '#2563eb';
      badgeBg = '#dbeafe';
      badgeText = '#1d4ed8';
    } else if (cardTheme === 'dark') {
      bgGrad.addColorStop(0, '#0f172a');
      bgGrad.addColorStop(1, '#1e293b');
      accentColor = '#38bdf8';
      textColor = '#ffffff';
      badgeBg = '#334155';
      badgeText = '#38bdf8';
    } else if (cardTheme === 'emerald') {
      bgGrad.addColorStop(0, '#f0fdf4');
      bgGrad.addColorStop(1, '#dcfce7');
      accentColor = '#059669';
      badgeBg = '#bbf7d0';
      badgeText = '#166534';
    } else if (cardTheme === 'purple') {
      bgGrad.addColorStop(0, '#faf5ff');
      bgGrad.addColorStop(1, '#f3e8ff');
      accentColor = '#9333ea';
      badgeBg = '#e9d5ff';
      badgeText = '#6b21a8';
    }

    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // Decorative Shapes / Borders
    ctx.lineWidth = 12;
    ctx.strokeStyle = accentColor;
    ctx.strokeRect(30, 30, width - 60, height - 60);

    // Top Header: GestRH + Company Name
    ctx.fillStyle = cardTheme === 'dark' ? '#94a3b8' : '#64748b';
    ctx.font = 'bold 28px sans-serif';
    ctx.fillText('GESTRH • PORTAL DE VAGAS', 70, 90);

    ctx.fillStyle = accentColor;
    ctx.font = 'bold 36px sans-serif';
    ctx.fillText(job.companyName.toUpperCase(), 70, 140);

    // Department Badge
    ctx.fillStyle = badgeBg;
    const deptWidth = ctx.measureText(job.department).width + 40;
    ctx.roundRect ? ctx.roundRect(70, 170, deptWidth, 48, 12) : ctx.fillRect(70, 170, deptWidth, 48);
    ctx.fill();

    ctx.fillStyle = badgeText;
    ctx.font = 'bold 22px sans-serif';
    ctx.fillText(job.department, 90, 202);

    // Modality Badge
    ctx.fillStyle = badgeBg;
    ctx.roundRect ? ctx.roundRect(90 + deptWidth, 170, 160, 48, 12) : ctx.fillRect(90 + deptWidth, 170, 160, 48);
    ctx.fill();

    ctx.fillStyle = badgeText;
    ctx.fillText(job.modality, 110 + deptWidth, 202);

    // Job Title
    ctx.fillStyle = textColor;
    ctx.font = 'bold 56px sans-serif';
    
    // Wrap title if long
    const words = job.title.split(' ');
    let line = '';
    let y = 280;
    for (let n = 0; n < words.length; n++) {
      let testLine = line + words[n] + ' ';
      let metrics = ctx.measureText(testLine);
      if (metrics.width > width - 180 && n > 0) {
        ctx.fillText(line, 70, y);
        line = words[n] + ' ';
        y += 65;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, 70, y);

    // Salary & Details Pill
    y += 60;
    ctx.fillStyle = cardTheme === 'dark' ? '#1e293b' : '#ffffff';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.08)';
    ctx.shadowBlur = 15;
    ctx.fillRect(70, y, width - 140, 90);
    ctx.shadowBlur = 0;

    ctx.fillStyle = '#10b981';
    ctx.font = 'bold 32px sans-serif';
    ctx.fillText(`💰 ${job.salaryRange}`, 100, y + 55);

    ctx.fillStyle = cardTheme === 'dark' ? '#cbd5e1' : '#475569';
    ctx.font = '26px sans-serif';
    ctx.fillText(`📍 ${job.location}  •  💼 ${job.contractType}`, 520, y + 55);

    // Key Requirements
    y += 140;
    ctx.fillStyle = cardTheme === 'dark' ? '#f8fafc' : '#1e293b';
    ctx.font = 'bold 28px sans-serif';
    ctx.fillText('REQUISITOS EM DESTAQUE:', 70, y);

    y += 45;
    ctx.font = '24px sans-serif';
    ctx.fillStyle = cardTheme === 'dark' ? '#cbd5e1' : '#334155';
    job.requirements.slice(0, isSquare ? 5 : 3).forEach((req) => {
      ctx.fillText(`✓ ${req}`, 90, y);
      y += 40;
    });

    // Footer
    const shareUrl = `${window.location.origin}/vagas/${job.id}`;
    ctx.fillStyle = accentColor;
    ctx.font = 'bold 26px sans-serif';
    ctx.fillText('👉 Candidate-se em: ' + shareUrl, 70, height - 70);

  }, [job, cardTheme, cardFormat]);

  if (!job) return null;

  // Base job URL
  const shareUrl = `${window.location.origin}/vagas/${job.id}`;

  // Pre-formatted messages
  const whatsappText = `🔥 *OPORTUNIDADE DE EMPREGO NA ${job.companyName.toUpperCase()}* 🔥\n\n🎯 *Vaga:* ${job.title}\n📍 *Local:* ${job.location} (${job.modality})\n💼 *Contrato:* ${job.contractType}\n💰 *Faixa Salarial:* ${job.salaryRange}\n🏢 *Setor:* ${job.department}\n\n📌 *Requisitos principais:*\n${job.requirements.map(r => `• ${r}`).join('\n')}\n\n👉 *Candidate-se pelo link oficial:*\n${shareUrl}\n\n#Vagas #Oportunidade #GestRH #${job.department.replace(/\s+/g, '')}`;

  const linkedinText = `🚀 Estamos contratando! A ${job.companyName} está em busca de um(a) ${job.title}.\n\n📍 Localização: ${job.location} (${job.modality})\n💼 Modelo: ${job.contractType}\n💰 Faixa Salarial: ${job.salaryRange}\n\nRequisitos:\n${job.requirements.map(r => `• ${r}`).join('\n')}\n\nConfira os detalhes e inscreva-se através do portal GestRH:\n${shareUrl}\n\n#RH #Recrutamento #VagasEmAberto #${job.department.replace(/\s+/g, '')} #GestRH`;

  // Handle Download PNG Image
  const handleDownloadImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `vaga-${job.title.toLowerCase().replace(/\s+/g, '-')}.png`;
    link.href = dataUrl;
    link.click();

    showToast('Imagem da vaga baixada com sucesso! Pronto para postar.');
  };

  // Copy Link
  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopiedLink(true);
    showToast('Link da vaga copiado!');
    setTimeout(() => setCopiedLink(false), 3000);
  };

  // Copy WhatsApp Formatted Text
  const handleCopyWhatsAppText = () => {
    navigator.clipboard.writeText(whatsappText);
    setCopiedText(true);
    showToast('Texto formatado para WhatsApp copiado!');
    setTimeout(() => setCopiedText(false), 3000);
  };

  // Copy LinkedIn Formatted Text
  const handleCopyLinkedInText = () => {
    navigator.clipboard.writeText(linkedinText);
    setCopiedText(true);
    showToast('Texto para LinkedIn copiado!');
    setTimeout(() => setCopiedText(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-3xl w-full my-6 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-600/30 text-blue-400 rounded-2xl border border-blue-500/30">
              <Share2 className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Compartilhar & Divulgar Vaga</h2>
              <p className="text-xs text-slate-400">Gere banner em imagem e links diretos para WhatsApp, LinkedIn e redes</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-800 text-slate-400 hover:text-white rounded-xl transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs text-slate-800">
          {/* Quick Direct Share Buttons */}
          <div className="space-y-2">
            <span className="font-bold text-slate-900 block text-xs uppercase tracking-wider">
              1. Envio Direto para Redes Sociais
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {/* WhatsApp Button */}
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(whatsappText)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-2xl font-bold flex flex-col items-center justify-center gap-1.5 transition-all shadow-xs group"
              >
                <MessageCircle className="w-5 h-5 text-emerald-600 group-hover:scale-110 transition-transform" />
                <span>Enviar WhatsApp</span>
              </a>

              {/* LinkedIn Button */}
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200 rounded-2xl font-bold flex flex-col items-center justify-center gap-1.5 transition-all shadow-xs group"
              >
                <Linkedin className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
                <span>Postar LinkedIn</span>
              </a>

              {/* Copy Link Button */}
              <button
                onClick={handleCopyLink}
                className="p-3 bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200 rounded-2xl font-bold flex flex-col items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer"
              >
                {copiedLink ? <Check className="w-5 h-5 text-emerald-600" /> : <Copy className="w-5 h-5 text-slate-600" />}
                <span>{copiedLink ? 'Link Copiado!' : 'Copiar Link'}</span>
              </button>

              {/* Email Button */}
              <a
                href={`mailto:?subject=${encodeURIComponent(`Vaga de Emprego: ${job.title} na ${job.companyName}`)}&body=${encodeURIComponent(whatsappText)}`}
                className="p-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-800 border border-indigo-200 rounded-2xl font-bold flex flex-col items-center justify-center gap-1.5 transition-all shadow-xs group"
              >
                <Mail className="w-5 h-5 text-indigo-600 group-hover:scale-110 transition-transform" />
                <span>Enviar E-mail</span>
              </a>
            </div>
          </div>

          {/* Copy Pre-Formatted Text Section */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-purple-600" /> Texto Anúncio Formatado (WhatsApp / LinkedIn)
              </span>
              <div className="flex gap-2">
                <button
                  onClick={handleCopyWhatsAppText}
                  className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[11px] font-bold flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <Copy className="w-3.5 h-3.5" /> Copiar p/ WhatsApp
                </button>
                <button
                  onClick={handleCopyLinkedInText}
                  className="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[11px] font-bold flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <Copy className="w-3.5 h-3.5" /> Copiar p/ LinkedIn
                </button>
              </div>
            </div>
            <pre className="bg-white p-3 rounded-xl border border-slate-200 text-[11px] font-mono text-slate-700 whitespace-pre-wrap max-h-36 overflow-y-auto">
              {whatsappText}
            </pre>
          </div>

          {/* Card Generator & Download Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4 text-blue-600" /> 2. Gerador de Banner de Vaga (Imagem HD)
              </span>

              {/* Theme & Format Controls */}
              <div className="flex items-center gap-2">
                <div className="flex items-center bg-slate-100 p-1 rounded-xl">
                  <button
                    onClick={() => setCardFormat('feed')}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold cursor-pointer transition-all ${
                      cardFormat === 'feed' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
                    }`}
                  >
                    Feed (16:9)
                  </button>
                  <button
                    onClick={() => setCardFormat('square')}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold cursor-pointer transition-all ${
                      cardFormat === 'square' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
                    }`}
                  >
                    Quadrado (1:1)
                  </button>
                </div>

                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                  <button
                    onClick={() => setCardTheme('blue')}
                    className={`w-5 h-5 rounded-full bg-blue-600 border-2 ${
                      cardTheme === 'blue' ? 'border-slate-900 scale-110' : 'border-transparent'
                    }`}
                    title="Azul Tech"
                  />
                  <button
                    onClick={() => setCardTheme('dark')}
                    className={`w-5 h-5 rounded-full bg-slate-900 border-2 ${
                      cardTheme === 'dark' ? 'border-blue-400 scale-110' : 'border-transparent'
                    }`}
                    title="Dark Mode"
                  />
                  <button
                    onClick={() => setCardTheme('emerald')}
                    className={`w-5 h-5 rounded-full bg-emerald-600 border-2 ${
                      cardTheme === 'emerald' ? 'border-slate-900 scale-110' : 'border-transparent'
                    }`}
                    title="Verde Conecta"
                  />
                  <button
                    onClick={() => setCardTheme('purple')}
                    className={`w-5 h-5 rounded-full bg-purple-600 border-2 ${
                      cardTheme === 'purple' ? 'border-slate-900 scale-110' : 'border-transparent'
                    }`}
                    title="Roxo IA"
                  />
                </div>
              </div>
            </div>

            {/* Canvas Preview Container */}
            <div className="bg-slate-100 p-4 rounded-2xl border border-slate-200 flex flex-col items-center justify-center space-y-3">
              <div className="max-w-full overflow-hidden rounded-xl border border-slate-300 shadow-md bg-white">
                <canvas
                  ref={canvasRef}
                  className="w-full h-auto max-h-[320px] object-contain block"
                />
              </div>

              <div className="flex items-center justify-center gap-3 w-full pt-1">
                <button
                  onClick={handleDownloadImage}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-sm transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4" /> Baixar Imagem da Vaga (PNG)
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-[11px] text-slate-500">
            URL Direta da vaga: <code className="text-blue-600 font-bold">{shareUrl}</code>
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 border border-slate-300 hover:bg-white text-slate-700 font-bold rounded-xl text-xs transition-colors cursor-pointer"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
