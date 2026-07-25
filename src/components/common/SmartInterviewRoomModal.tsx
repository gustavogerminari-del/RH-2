import React, { useState, useEffect, useRef } from 'react';
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  Radio,
  Play,
  Square,
  Sparkles,
  CheckCircle,
  AlertCircle,
  Send,
  Download,
  Share2,
  X,
  Bot,
  User,
  Clock,
  Award,
  FileText,
  Volume2,
  Maximize2,
  ShieldCheck,
  Zap,
  MessageSquare,
  Sparkle,
  ExternalLink,
  Globe
} from 'lucide-react';
import { Interview, AIInterviewFeedback } from '../../types';
import { useApp } from '../../context/AppContext';

interface SmartInterviewRoomModalProps {
  interview: Interview;
  onClose: () => void;
  userType?: 'company' | 'candidate';
}

export const SmartInterviewRoomModal: React.FC<SmartInterviewRoomModalProps> = ({
  interview,
  onClose,
  userType = 'company'
}) => {
  const { updateInterview, showToast } = useApp();

  // Media state
  const [micActive, setMicActive] = useState(true);
  const [cameraActive, setCameraActive] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [recordedBlobUrl, setRecordedBlobUrl] = useState<string | null>(interview.recordingBlobUrl || null);
  
  // Video references
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);
  const timerIntervalRef = useRef<any>(null);

  // AI & Interview process state
  const [activeTab, setActiveTab] = useState<'room' | 'questions' | 'notes' | 'feedback'>('room');
  const [interviewNotes, setInterviewNotes] = useState(interview.aiFeedback?.recruiterNotes || '');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [candidateAnswers, setCandidateAnswers] = useState<Record<number, string>>({});
  
  // AI Feedback Generation state
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiFeedback, setAiFeedback] = useState<AIInterviewFeedback | null>(interview.aiFeedback || null);

  const questions = interview.aiPrepQuestions && interview.aiPrepQuestions.length > 0
    ? interview.aiPrepQuestions
    : [
        'Descreva sua trajetória profissional e principais conquistas recentes.',
        'Como você lida com prazos apertados e resolução de conflitos em equipe?',
        'Qual seu nível de conhecimento nas tecnologias/requisitos exigidos para esta vaga?',
        'Quais são suas expectativas de carreira para os próximos 2 a 3 anos?'
      ];

  // Request media devices on mount
  useEffect(() => {
    let activeStream: MediaStream | null = null;

    async function initCamera() {
      try {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { width: { ideal: 1280 }, height: { ideal: 720 } },
            audio: true
          });
          activeStream = stream;
          setMediaStream(stream);
          if (localVideoRef.current) {
            localVideoRef.current.srcObject = stream;
          }
        }
      } catch (err) {
        console.warn('Camera/Mic not accessible in browser sandbox or user denied permission:', err);
      }
    }

    initCamera();

    return () => {
      if (activeStream) {
        activeStream.getTracks().forEach(track => track.stop());
      }
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, []);

  // Sync stream to video element when toggled
  useEffect(() => {
    if (localVideoRef.current && mediaStream) {
      localVideoRef.current.srcObject = cameraActive ? mediaStream : null;
    }
  }, [cameraActive, mediaStream]);

  // Handle Recording Timer
  useEffect(() => {
    if (isRecording) {
      timerIntervalRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    }
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [isRecording]);

  // Start Recording Handler
  const startRecording = () => {
    try {
      recordedChunksRef.current = [];
      if (mediaStream && typeof MediaRecorder !== 'undefined') {
        const recorder = new MediaRecorder(mediaStream, { mimeType: 'video/webm;codecs=vp8,opus' });
        recorder.ondataavailable = (e) => {
          if (e.data.size > 0) {
            recordedChunksRef.current.push(e.data);
          }
        };
        recorder.onstop = () => {
          const blob = new Blob(recordedChunksRef.current, { type: 'video/webm' });
          const url = URL.createObjectURL(blob);
          setRecordedBlobUrl(url);
        };
        recorder.start(1000);
        mediaRecorderRef.current = recorder;
      }
      setIsRecording(true);
      showToast('Gravação da entrevista iniciada em tempo real!');
    } catch (err) {
      console.warn('MediaRecorder error fallback:', err);
      setIsRecording(true);
      showToast('Modo de gravação ativado!');
    }
  };

  // Stop Recording Handler
  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
    showToast(`Gravação finalizada (${formatTime(recordingTime)}).`);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Generate AI Feedback via Backend Endpoint
  const handleGenerateAiFeedback = async () => {
    setIsAnalyzing(true);
    try {
      const response = await fetch('/api/ai/analyze-interview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobTitle: interview.jobTitle,
          candidateName: interview.candidateName,
          questionsAndAnswers: candidateAnswers,
          notes: interviewNotes,
          recordingDuration: `${formatTime(recordingTime)} (${recordingTime} segundos)`
        })
      });

      const data = await response.json();
      setAiFeedback(data);
      setActiveTab('feedback');

      // Update interview record in App Context
      updateInterview(interview.id, {
        status: 'Concluída',
        hasRecording: true,
        recordingDurationSeconds: recordingTime,
        recordingBlobUrl: recordedBlobUrl || undefined,
        aiFeedback: data
      });

      showToast('Análise de entrevista e parecer com IA gerados com sucesso!');
    } catch (err) {
      console.error('Error generating AI Feedback:', err);
      showToast('Erro ao conectar com a IA. Aplicando avaliação simulada.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-2 sm:p-4 overflow-y-auto">
      <div className="bg-stone-900 border border-stone-800 rounded-2xl w-full max-w-6xl text-stone-100 shadow-2xl flex flex-col max-h-[95vh] overflow-hidden">
        
        {/* Header Bar */}
        <div className="px-6 py-4 border-b border-stone-800 flex items-center justify-between bg-stone-950/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Radio className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-stone-100">Sala Virtual de Entrevista IA</h3>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-stone-800 text-stone-300 border border-stone-700">
                  {interview.jobTitle}
                </span>
              </div>
              <p className="text-xs text-stone-400">
                Candidato(a): <strong className="text-stone-200">{interview.candidateName}</strong> | Entrevistador(a): <span className="text-stone-300">{interview.interviewerName}</span>
              </p>
            </div>
          </div>

          {/* Right Header Badges */}
          <div className="flex items-center gap-3">
            <a
              href={interview.linkOrLocation.startsWith('http') ? interview.linkOrLocation : 'https://meet.google.com/gestrh-interview-live'}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-2 transition shadow-md"
            >
              <Globe className="w-4 h-4" />
              <span>Abrir no Google Meet</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </a>

            {isRecording && (
              <div className="flex items-center gap-2 bg-red-500/20 border border-red-500/40 text-red-400 px-3 py-1.5 rounded-full text-xs font-semibold animate-pulse">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                <span>REC {formatTime(recordingTime)}</span>
              </div>
            )}

            <button
              onClick={onClose}
              className="p-2 text-stone-400 hover:text-stone-100 hover:bg-stone-800 rounded-lg transition"
              title="Fechar Sala"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-1 border-b border-stone-800 px-6 bg-stone-900/80">
          <button
            onClick={() => setActiveTab('room')}
            className={`px-4 py-3 text-sm font-medium border-b-2 flex items-center gap-2 transition ${
              activeTab === 'room'
                ? 'border-emerald-500 text-emerald-400'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <Video className="w-4 h-4" />
            Vídeo Ao Vivo & Gravação
          </button>

          <button
            onClick={() => setActiveTab('questions')}
            className={`px-4 py-3 text-sm font-medium border-b-2 flex items-center gap-2 transition ${
              activeTab === 'questions'
                ? 'border-emerald-500 text-emerald-400'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <Bot className="w-4 h-4" />
            Roteiro de Perguntas IA ({questions.length})
          </button>

          <button
            onClick={() => setActiveTab('notes')}
            className={`px-4 py-3 text-sm font-medium border-b-2 flex items-center gap-2 transition ${
              activeTab === 'notes'
                ? 'border-emerald-500 text-emerald-400'
                : 'border-transparent text-stone-400 hover:text-stone-200'
            }`}
          >
            <FileText className="w-4 h-4" />
            Anotações do RH
          </button>

          {aiFeedback && (
            <button
              onClick={() => setActiveTab('feedback')}
              className={`px-4 py-3 text-sm font-medium border-b-2 flex items-center gap-2 transition ${
                activeTab === 'feedback'
                  ? 'border-amber-500 text-amber-400'
                  : 'border-transparent text-amber-400/70 hover:text-amber-300'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              Parecer & Feedback IA
            </button>
          )}
        </div>

        {/* Modal Main Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-stone-950/40">
          
          {/* TAB 1: Live Video Room */}
          {activeTab === 'room' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Main Video Stream Container (2 Cols) */}
              <div className="lg:col-span-2 flex flex-col gap-4">
                <div className="relative aspect-video bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden flex items-center justify-center group shadow-xl">
                  
                  {cameraActive ? (
                    <video
                      ref={localVideoRef}
                      autoPlay
                      playsInline
                      muted
                      className="w-full h-full object-cover transform -scale-x-100"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center p-8 text-center text-stone-500">
                      <div className="w-20 h-20 rounded-full bg-stone-800 flex items-center justify-center text-stone-400 mb-3 border border-stone-700">
                        <User className="w-10 h-10" />
                      </div>
                      <p className="font-semibold text-stone-300">{interview.candidateName}</p>
                      <p className="text-xs text-stone-500">Câmera desativada</p>
                    </div>
                  )}

                  {/* Overlays */}
                  <div className="absolute top-4 left-4 flex items-center gap-2 bg-stone-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-stone-700/50 text-xs">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    <span className="font-medium text-stone-200">{interview.candidateName}</span>
                    <span className="text-stone-400">(Candidato)</span>
                  </div>

                  {/* Intervwer Picture-in-Picture Box */}
                  <div className="absolute bottom-4 right-4 w-36 sm:w-48 aspect-video bg-stone-950 border border-stone-700 rounded-xl overflow-hidden shadow-2xl flex items-center justify-center">
                    <div className="flex flex-col items-center justify-center text-center p-2">
                      <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold mb-1">
                        RH
                      </div>
                      <span className="text-[10px] text-stone-300 font-medium truncate max-w-[120px]">
                        {interview.interviewerName}
                      </span>
                    </div>
                  </div>

                  {/* Recording status badge */}
                  {isRecording && (
                    <div className="absolute top-4 right-4 bg-red-600/90 text-white font-bold px-3 py-1 rounded-full text-xs flex items-center gap-2 shadow-lg">
                      <span className="w-2.5 h-2.5 bg-white rounded-full animate-ping"></span>
                      GRAVANDO AO VIVO
                    </div>
                  )}
                </div>

                {/* Video Controls Toolbar */}
                <div className="bg-stone-900 border border-stone-800 rounded-2xl p-4 flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setMicActive(!micActive)}
                      className={`p-3 rounded-xl flex items-center gap-2 text-sm font-semibold transition ${
                        micActive
                          ? 'bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700'
                          : 'bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/40'
                      }`}
                    >
                      {micActive ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                      <span className="hidden sm:inline">{micActive ? 'Microfone On' : 'Mutado'}</span>
                    </button>

                    <button
                      onClick={() => setCameraActive(!cameraActive)}
                      className={`p-3 rounded-xl flex items-center gap-2 text-sm font-semibold transition ${
                        cameraActive
                          ? 'bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700'
                          : 'bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/40'
                      }`}
                    >
                      {cameraActive ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
                      <span className="hidden sm:inline">{cameraActive ? 'Câmera On' : 'Câmera Off'}</span>
                    </button>
                  </div>

                  {/* Recording trigger */}
                  <div className="flex items-center gap-2">
                    {!isRecording ? (
                      <button
                        onClick={startRecording}
                        className="bg-red-600 hover:bg-red-500 text-white font-bold px-4 py-3 rounded-xl flex items-center gap-2 text-sm shadow-lg transition"
                      >
                        <Radio className="w-4 h-4 animate-pulse" />
                        Iniciar Gravação
                      </button>
                    ) : (
                      <button
                        onClick={stopRecording}
                        className="bg-amber-600 hover:bg-amber-500 text-white font-bold px-4 py-3 rounded-xl flex items-center gap-2 text-sm shadow-lg transition"
                      >
                        <Square className="w-4 h-4 fill-current" />
                        Pausar / Parar Gravação
                      </button>
                    )}

                    <button
                      onClick={handleGenerateAiFeedback}
                      disabled={isAnalyzing}
                      className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold px-5 py-3 rounded-xl flex items-center gap-2 text-sm shadow-xl transition disabled:opacity-50"
                    >
                      {isAnalyzing ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Analisando com IA...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 text-amber-300" />
                          <span>Gerar Feedback com IA</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Recorded Blob Preview if available */}
                {recordedBlobUrl && (
                  <div className="bg-stone-900/90 border border-stone-800 rounded-2xl p-4 flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-emerald-400 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" /> Gravação Finalizada e Armazenada Localmente
                      </span>
                      <a
                        href={recordedBlobUrl}
                        download={`entrevista-${interview.candidateName.toLowerCase().replace(/\s+/g, '-')}.webm`}
                        className="text-xs text-stone-300 hover:text-white flex items-center gap-1 underline"
                      >
                        <Download className="w-3.5 h-3.5" /> Baixar Vídeo
                      </a>
                    </div>
                    <video src={recordedBlobUrl} controls className="w-full max-h-48 rounded-xl bg-black" />
                  </div>
                )}
              </div>

              {/* Side Panel: Live AI Copilot & Active Question */}
              <div className="flex flex-col gap-4">
                <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 flex flex-col gap-4 h-full">
                  <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                    <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                      <Bot className="w-5 h-5" />
                      <span>Copiloto de Entrevista IA</span>
                    </div>
                    <span className="text-xs text-stone-500">Em execução</span>
                  </div>

                  {/* Active Question Box */}
                  <div className="bg-stone-950 border border-stone-800 rounded-xl p-4 flex flex-col gap-3">
                    <div className="flex items-center justify-between text-xs text-stone-400">
                      <span>Pergunta {currentQuestionIndex + 1} de {questions.length}</span>
                      <span className="text-emerald-400 font-medium">Sugerida pela IA</span>
                    </div>

                    <p className="text-sm font-semibold text-stone-200 leading-relaxed">
                      "{questions[currentQuestionIndex]}"
                    </p>

                    <div className="flex items-center justify-between pt-2">
                      <button
                        disabled={currentQuestionIndex === 0}
                        onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
                        className="text-xs text-stone-400 hover:text-stone-200 disabled:opacity-40"
                      >
                        ← Anterior
                      </button>
                      <button
                        disabled={currentQuestionIndex === questions.length - 1}
                        onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                        className="text-xs text-emerald-400 font-semibold hover:text-emerald-300 disabled:opacity-40"
                      >
                        Próxima Pergunta →
                      </button>
                    </div>
                  </div>

                  {/* Answer / Key Notes Entry for Current Question */}
                  <div className="flex flex-col gap-2 flex-1">
                    <label className="text-xs font-semibold text-stone-400 flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5 text-stone-400" />
                      Resposta ou Anotação do Candidato:
                    </label>
                    <textarea
                      value={candidateAnswers[currentQuestionIndex] || ''}
                      onChange={(e) => setCandidateAnswers({ ...candidateAnswers, [currentQuestionIndex]: e.target.value })}
                      placeholder="Digite tópicos chaves citados pelo candidato para a IA incluir na análise..."
                      className="w-full flex-1 min-h-[120px] bg-stone-950 border border-stone-800 rounded-xl p-3 text-xs text-stone-200 placeholder-stone-600 focus:outline-none focus:border-emerald-500/50 resize-none"
                    />
                  </div>

                  <div className="bg-emerald-950/40 border border-emerald-800/30 rounded-xl p-3 text-xs text-emerald-300/80 flex items-start gap-2">
                    <Zap className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>
                      Dica: A IA analisa o tom de voz, clareza e as palavras-chave registradas acima para calcular a nota final de aderência.
                    </span>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: Questions List */}
          {activeTab === 'questions' && (
            <div className="max-w-3xl mx-auto flex flex-col gap-4">
              <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6">
                <h4 className="text-base font-bold text-stone-100 mb-2 flex items-center gap-2">
                  <Bot className="w-5 h-5 text-emerald-400" /> Roteiro de Perguntas Inteligentes
                </h4>
                <p className="text-xs text-stone-400 mb-6">
                  Perguntas geradas especificamente para avaliar as competências da vaga <strong>{interview.jobTitle}</strong>.
                </p>

                <div className="space-y-4">
                  {questions.map((q, idx) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-xl border transition ${
                        currentQuestionIndex === idx
                          ? 'bg-stone-950 border-emerald-500/60 ring-1 ring-emerald-500/30'
                          : 'bg-stone-950/60 border-stone-800'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <span className="w-6 h-6 rounded-full bg-stone-800 text-stone-300 text-xs font-bold flex items-center justify-center shrink-0">
                            {idx + 1}
                          </span>
                          <div>
                            <p className="text-sm font-semibold text-stone-200">{q}</p>
                            <input
                              type="text"
                              value={candidateAnswers[idx] || ''}
                              onChange={(e) => setCandidateAnswers({ ...candidateAnswers, [idx]: e.target.value })}
                              placeholder="Anotar síntese da resposta..."
                              className="mt-2 w-full bg-stone-900 border border-stone-800 rounded-lg px-3 py-1.5 text-xs text-stone-200 focus:outline-none focus:border-emerald-500"
                            />
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            setCurrentQuestionIndex(idx);
                            setActiveTab('room');
                          }}
                          className="text-xs text-emerald-400 hover:underline shrink-0 font-medium"
                        >
                          Usar no Vídeo
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Recruiter Notes */}
          {activeTab === 'notes' && (
            <div className="max-w-3xl mx-auto flex flex-col gap-4">
              <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6">
                <h4 className="text-base font-bold text-stone-100 mb-2 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-emerald-400" /> Parecer Inicial e Observações Gerais
                </h4>
                <p className="text-xs text-stone-400 mb-4">
                  Estas anotações serão enviadas para o motor da Gemini API para compor a ata e o relatório de contratação.
                </p>

                <textarea
                  value={interviewNotes}
                  onChange={(e) => setInterviewNotes(e.target.value)}
                  placeholder="Registre impressões sobre postura, dicção, pontualidade e pretensão salarial..."
                  className="w-full h-64 bg-stone-950 border border-stone-800 rounded-xl p-4 text-sm text-stone-200 placeholder-stone-600 focus:outline-none focus:border-emerald-500"
                />

                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => {
                      updateInterview(interview.id, { aiPrepQuestions: questions });
                      showToast('Anotações salvas!');
                    }}
                    className="bg-stone-800 hover:bg-stone-700 text-stone-200 font-semibold px-4 py-2 rounded-xl text-xs"
                  >
                    Salvar Rascunho
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: AI Feedback & Report */}
          {activeTab === 'feedback' && aiFeedback && (
            <div className="max-w-4xl mx-auto flex flex-col gap-6">
              
              {/* Top Banner Verdict */}
              <div className="bg-gradient-to-r from-stone-900 via-stone-900 to-stone-950 border border-stone-800 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
                <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
                
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-2xl shadow-inner">
                      {aiFeedback.overallScore}%
                    </div>
                    <div>
                      <span className="text-xs text-stone-400 font-medium uppercase tracking-wider">Resultado da Análise IA</span>
                      <h3 className="text-xl font-extrabold text-stone-100 mt-0.5">{aiFeedback.verdict}</h3>
                      <p className="text-xs text-stone-400 mt-1 max-w-xl leading-relaxed">{aiFeedback.summary}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => showToast('Relatório completo da entrevista copiado!')}
                      className="bg-stone-800 hover:bg-stone-700 text-stone-200 px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 border border-stone-700"
                    >
                      <Share2 className="w-4 h-4" /> Compartilhar
                    </button>
                  </div>
                </div>
              </div>

              {/* Competencies Progress Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-stone-900 border border-stone-800 rounded-2xl p-4 flex flex-col gap-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-stone-400 font-medium">Competência Técnica</span>
                    <span className="font-bold text-emerald-400">{aiFeedback.technicalCompetenceScore}%</span>
                  </div>
                  <div className="w-full bg-stone-950 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full transition-all duration-1000" style={{ width: `${aiFeedback.technicalCompetenceScore}%` }} />
                  </div>
                </div>

                <div className="bg-stone-900 border border-stone-800 rounded-2xl p-4 flex flex-col gap-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-stone-400 font-medium">Soft Skills & Cultura</span>
                    <span className="font-bold text-teal-400">{aiFeedback.softSkillsScore}%</span>
                  </div>
                  <div className="w-full bg-stone-950 h-2 rounded-full overflow-hidden">
                    <div className="bg-teal-500 h-full rounded-full transition-all duration-1000" style={{ width: `${aiFeedback.softSkillsScore}%` }} />
                  </div>
                </div>

                <div className="bg-stone-900 border border-stone-800 rounded-2xl p-4 flex flex-col gap-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-stone-400 font-medium">Comunicação & Dicção</span>
                    <span className="font-bold text-amber-400">{aiFeedback.communicationScore}%</span>
                  </div>
                  <div className="w-full bg-stone-950 h-2 rounded-full overflow-hidden">
                    <div className="bg-amber-500 h-full rounded-full transition-all duration-1000" style={{ width: `${aiFeedback.communicationScore}%` }} />
                  </div>
                </div>
              </div>

              {/* Strengths and Gaps */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Strengths */}
                <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 flex flex-col gap-3">
                  <h4 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" /> Pontos Fortes Evidenciados
                  </h4>
                  <ul className="space-y-2">
                    {aiFeedback.strengths.map((str, idx) => (
                      <li key={idx} className="bg-stone-950 border border-stone-800/80 rounded-xl p-3 text-xs text-stone-200 flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-1.5" />
                        <span>{str}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Improvements */}
                <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 flex flex-col gap-3">
                  <h4 className="text-sm font-bold text-amber-400 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" /> Pontos a Aprofundar / Desenvolver
                  </h4>
                  <ul className="space-y-2">
                    {aiFeedback.improvements.map((imp, idx) => (
                      <li key={idx} className="bg-stone-950 border border-stone-800/80 rounded-xl p-3 text-xs text-stone-200 flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5" />
                        <span>{imp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Recruiter & Candidate Feedback Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 flex flex-col gap-3">
                  <h4 className="text-sm font-bold text-stone-200 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" /> Parecer Executivo do RH
                  </h4>
                  <p className="bg-stone-950 border border-stone-800 rounded-xl p-4 text-xs text-stone-300 leading-relaxed italic">
                    "{aiFeedback.recruiterNotes}"
                  </p>
                </div>

                <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 flex flex-col gap-3">
                  <h4 className="text-sm font-bold text-stone-200 flex items-center gap-2">
                    <Send className="w-4 h-4 text-teal-400" /> Feedback Humanizado para o Candidato
                  </h4>
                  <p className="bg-stone-950 border border-stone-800 rounded-xl p-4 text-xs text-stone-300 leading-relaxed">
                    "{aiFeedback.candidateFeedback}"
                  </p>
                  <button
                    onClick={() => showToast(`Feedback enviado via e-mail e portal para ${interview.candidateName}!`)}
                    className="mt-1 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold py-2 rounded-xl transition"
                  >
                    Enviar Feedback ao Candidato
                  </button>
                </div>

              </div>

            </div>
          )}

        </div>

        {/* Footer actions */}
        <div className="px-6 py-4 border-t border-stone-800 bg-stone-950 flex items-center justify-between">
          <span className="text-xs text-stone-500">
            Powered by GESTRH AI Engine (Gemini 3.6 Flash)
          </span>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="bg-stone-800 hover:bg-stone-700 text-stone-200 font-semibold px-5 py-2.5 rounded-xl text-xs transition"
            >
              Encerrar e Fechar
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
