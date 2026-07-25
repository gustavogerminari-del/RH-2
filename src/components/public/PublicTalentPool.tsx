import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserCheck, Sparkles, Upload, CheckCircle2, FileText, Send } from 'lucide-react';

export const PublicTalentPool: React.FC = () => {
  const { showToast } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [area, setArea] = useState('Tecnologia');
  const [resumeText, setResumeText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      showToast('Por favor, preencha os campos obrigatórios.');
      return;
    }
    setSubmitted(true);
    showToast('Inscrição no Banco de Talentos realizada com sucesso!');
  };

  return (
    <div className="max-w-3xl mx-auto py-8 space-y-8">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 bg-[#E9F0E6] text-[#5D6D4E] px-3 py-1 rounded-full text-xs font-bold border border-[#5D6D4E]/20">
          <UserCheck className="w-3.5 h-3.5" /> Cadastro no Banco de Talentos
        </div>
        <h1 className="text-3xl font-serif font-bold text-[#2D3128]">Faça parte do nosso Banco de Talentos com IA</h1>
        <p className="text-xs text-[#7A7D75] max-w-lg mx-auto">
          Mesmo sem uma vaga aberta no momento, seu perfil será analisado continuamente pela nossa IA para recrutamento em novas oportunidades.
        </p>
      </div>

      {submitted ? (
        <div className="bg-[#E9F0E6] border border-[#5D6D4E]/30 rounded-3xl p-8 text-center space-y-4">
          <CheckCircle2 className="w-12 h-12 text-[#5D6D4E] mx-auto" />
          <h2 className="text-xl font-serif font-bold text-[#2D3128]">Cadastro Concluído com Sucesso!</h2>
          <p className="text-xs text-[#2D3128] max-w-md mx-auto">
            Seu currículo foi indexado em nosso Banco de Talentos. Quando surgirem oportunidades compatíveis com seu perfil, nosso RH entrará em contato.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="px-5 py-2.5 bg-[#5D6D4E] hover:bg-[#4c5b3e] text-white rounded-xl text-xs font-bold transition-colors"
          >
            Cadastrar Outro Currículo
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 border border-[#E9E5D9] shadow-xs space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#2D3128] mb-1">Nome Completo *</label>
              <input
                type="text"
                required
                placeholder="Ex: Lucas Germinari"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#F8F7F2] border border-[#E9E5D9] rounded-2xl px-3.5 py-2.5 text-xs text-[#2D3128] focus:outline-none focus:border-[#5D6D4E] font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#2D3128] mb-1">E-mail de Contato *</label>
              <input
                type="email"
                required
                placeholder="Ex: lucas@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#F8F7F2] border border-[#E9E5D9] rounded-2xl px-3.5 py-2.5 text-xs text-[#2D3128] focus:outline-none focus:border-[#5D6D4E] font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#2D3128] mb-1">Telefone / WhatsApp</label>
              <input
                type="text"
                placeholder="(11) 99999-9999"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-[#F8F7F2] border border-[#E9E5D9] rounded-2xl px-3.5 py-2.5 text-xs text-[#2D3128] focus:outline-none focus:border-[#5D6D4E] font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#2D3128] mb-1">Área de Interesse</label>
              <select
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="w-full bg-[#F8F7F2] border border-[#E9E5D9] rounded-2xl px-3.5 py-2.5 text-xs text-[#2D3128] focus:outline-none focus:border-[#5D6D4E] font-medium"
              >
                <option value="Tecnologia">Tecnologia & Engenharia</option>
                <option value="Recursos Humanos">Recursos Humanos & DHO</option>
                <option value="Departamento Pessoal">Departamento Pessoal & Folha</option>
                <option value="Financeiro">Financeiro & Contabilidade</option>
                <option value="Design">Design & Produto</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#2D3128] mb-1">
              Cole o Resumo do seu Currículo ou Experiências
            </label>
            <textarea
              rows={4}
              placeholder="Descreva suas habilidades técnicas, experiências anteriores e objetivos de carreira..."
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              className="w-full bg-[#F8F7F2] border border-[#E9E5D9] rounded-2xl p-3 text-xs text-[#2D3128] focus:outline-none focus:border-[#5D6D4E] font-medium"
            />
          </div>

          <div className="border-2 border-dashed border-[#E9E5D9] rounded-2xl p-6 text-center hover:bg-[#F8F7F2] transition-colors cursor-pointer">
            <Upload className="w-8 h-8 text-[#8C7355] mx-auto mb-2" />
            <p className="text-xs font-bold text-[#2D3128]">Anexar Currículo (PDF ou DOCX)</p>
            <p className="text-[11px] text-[#7A7D75] mt-1">Arraste e solte o arquivo aqui ou clique para selecionar</p>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#5D6D4E] hover:bg-[#4c5b3e] text-white font-bold rounded-2xl text-xs flex items-center justify-center gap-2 shadow-xs transition-colors"
          >
            <Send className="w-4 h-4" /> Registrar no Banco de Talentos
          </button>
        </form>
      )}
    </div>
  );
};
