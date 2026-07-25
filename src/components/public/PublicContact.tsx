import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';

export const PublicContact: React.FC = () => {
  const { showToast } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Sua mensagem foi enviada! Nosso time responderá em breve.');
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="max-w-4xl mx-auto py-8 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-serif font-bold text-[#2D3128]">Entre em Contato Conosco</h1>
        <p className="text-xs text-[#7A7D75]">Tire suas dúvidas sobre o GESTRH ou solicite uma demonstração para sua empresa.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-4">
          <div className="bg-white p-5 rounded-3xl border border-[#E9E5D9] flex items-center gap-3 shadow-xs">
            <Mail className="w-5 h-5 text-[#5D6D4E] shrink-0" />
            <div>
              <span className="text-[11px] text-[#7A7D75] font-medium block">E-mail</span>
              <span className="text-xs font-bold text-[#2D3128]">contato@gestrh.com.br</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-[#E9E5D9] flex items-center gap-3 shadow-xs">
            <Phone className="w-5 h-5 text-[#8C7355] shrink-0" />
            <div>
              <span className="text-[11px] text-[#7A7D75] font-medium block">Atendimento</span>
              <span className="text-xs font-bold text-[#2D3128]">(11) 4003-8899</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-[#E9E5D9] flex items-center gap-3 shadow-xs">
            <MapPin className="w-5 h-5 text-[#5D6D4E] shrink-0" />
            <div>
              <span className="text-[11px] text-[#7A7D75] font-medium block">Sede</span>
              <span className="text-xs font-bold text-[#2D3128]">Av. Paulista, 1000 - SP</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="md:col-span-2 bg-white p-8 rounded-3xl border border-[#E9E5D9] space-y-4 shadow-xs">
          <div>
            <label className="block text-xs font-bold text-[#2D3128] mb-1">Seu Nome *</label>
            <input
              type="text"
              required
              placeholder="Ex: Maria Santos"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#F8F7F2] border border-[#E9E5D9] rounded-2xl px-3.5 py-2.5 text-xs text-[#2D3128] focus:outline-none focus:border-[#5D6D4E] font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#2D3128] mb-1">Seu E-mail *</label>
            <input
              type="email"
              required
              placeholder="Ex: maria@empresa.com.br"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#F8F7F2] border border-[#E9E5D9] rounded-2xl px-3.5 py-2.5 text-xs text-[#2D3128] focus:outline-none focus:border-[#5D6D4E] font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#2D3128] mb-1">Mensagem *</label>
            <textarea
              rows={4}
              required
              placeholder="Como podemos ajudar você ou sua empresa?"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-[#F8F7F2] border border-[#E9E5D9] rounded-2xl p-3 text-xs text-[#2D3128] focus:outline-none focus:border-[#5D6D4E] font-medium"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#5D6D4E] hover:bg-[#4c5b3e] text-white font-bold rounded-2xl text-xs flex items-center justify-center gap-2 transition-colors shadow-xs"
          >
            <Send className="w-4 h-4" /> Enviar Mensagem
          </button>
        </form>
      </div>
    </div>
  );
};
