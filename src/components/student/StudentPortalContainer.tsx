import React, { useState, useEffect, useRef } from 'react';
import { useSchool } from '../../context/SchoolContext';
import {
  Sparkles,
  Palette,
  ShieldCheck,
  Award,
  Download,
  GraduationCap,
  HeartHandshake,
  X,
  ChevronRight,
  CheckCircle2,
  Phone,
  Mail,
  Calendar,
  Clock,
  BookOpen,
  Headphones,
  Flame,
  Volume2,
  VolumeX,
  Play,
  Pause,
  RotateCcw,
  Star,
  Zap,
  Check
} from 'lucide-react';
import { ReportCardModal } from '../common/ReportCardModal';

export type StudentThemeMode = 'cosmic' | 'cyber' | 'sunrise' | 'emerald' | 'ocean';

interface StudentPortalContainerProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  children: React.ReactNode;
}

// Motivational Quotes collection for students
const MOTIVATIONAL_QUOTES = [
  { text: "Knowledge is power. Information is liberating. Education is the premise of progress.", author: "Kofi Annan" },
  { text: "Dream, dream, dream. Dreams transform into thoughts and thoughts result in action.", author: "Dr. A.P.J. Abdul Kalam" },
  { text: "Live as if you were to die tomorrow. Learn as if you were to live forever.", author: "Mahatma Gandhi" },
  { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
  { text: "Education is the most powerful weapon which you can use to change the world.", author: "Nelson Mandela" },
  { text: "Success is the sum of small efforts, repeated day in and day out.", author: "Robert Collier" }
];

export const StudentPortalContainer: React.FC<StudentPortalContainerProps> = ({
  currentPath,
  onNavigate,
  children
}) => {
  const { currentUser, currentStudent, marks } = useSchool();
  const [theme, setTheme] = useState<StudentThemeMode>(() => {
    return (localStorage.getItem('cps_student_theme') as StudentThemeMode) || 'cosmic';
  });
  const [isParentDeskOpen, setIsParentDeskOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isFocusStationOpen, setIsFocusStationOpen] = useState(false);
  const [confettiActive, setConfettiActive] = useState(false);
  const [quoteToast, setQuoteToast] = useState<{ text: string; author: string } | null>(null);
  const [studentXP, setStudentXP] = useState(() => {
    const saved = localStorage.getItem('cps_student_xp');
    return saved ? parseInt(saved, 10) : 840;
  });

  // Focus Station Pomodoro Timer
  const [focusSeconds, setFocusSeconds] = useState(25 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [focusModeType, setFocusModeType] = useState<'study' | 'break'>('study');
  const [soundPlaying, setSoundPlaying] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const noiseNodeRef = useRef<AudioNode | null>(null);

  useEffect(() => {
    localStorage.setItem('cps_student_theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('cps_student_xp', studentXP.toString());
  }, [studentXP]);

  // Pomodoro countdown effect
  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && focusSeconds > 0) {
      interval = setInterval(() => {
        setFocusSeconds((prev) => prev - 1);
      }, 1000);
    } else if (focusSeconds === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      triggerCelebration();
      if (focusModeType === 'study') {
        setStudentXP((prev) => prev + 50);
        setFocusModeType('break');
        setFocusSeconds(5 * 60);
      } else {
        setFocusModeType('study');
        setFocusSeconds(25 * 60);
      }
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, focusSeconds, focusModeType]);

  // Stop sound on unmount
  useEffect(() => {
    return () => {
      stopAmbientSound();
    };
  }, []);

  const activeStudent =
    currentUser && currentUser.role === 'student' ? (currentUser as any) : currentStudent;

  // Synthesized chime & ambient sound using Web Audio API
  const playChime = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6 arpeggio
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.08 + 0.5);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.08);
        osc.stop(ctx.currentTime + i * 0.08 + 0.6);
      });
    } catch {
      // Audio not permitted or unsupported, fail silently
    }
  };

  const toggleAmbientSound = () => {
    if (soundPlaying) {
      stopAmbientSound();
    } else {
      startAmbientSound();
    }
  };

  const startAmbientSound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      audioContextRef.current = ctx;

      // Create gentle brownian rain noise
      const bufferSize = ctx.sampleRate * 2;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        data[i] = (lastOut + 0.02 * white) / 1.02;
        lastOut = data[i];
        data[i] *= 2.5; // boost
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = buffer;
      whiteNoise.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 600;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.08, ctx.currentTime);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      whiteNoise.start();

      noiseNodeRef.current = whiteNoise;
      setSoundPlaying(true);
    } catch {
      setSoundPlaying(false);
    }
  };

  const stopAmbientSound = () => {
    if (noiseNodeRef.current) {
      try {
        (noiseNodeRef.current as any).stop();
      } catch {}
      noiseNodeRef.current = null;
    }
    if (audioContextRef.current) {
      try {
        audioContextRef.current.close();
      } catch {}
      audioContextRef.current = null;
    }
    setSoundPlaying(false);
  };

  const triggerCelebration = () => {
    playChime();
    setConfettiActive(true);
    const randomQuote = MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)];
    setQuoteToast(randomQuote);
    setStudentXP((prev) => prev + 25);
    setTimeout(() => {
      setConfettiActive(false);
    }, 4000);
  };

  // Background configurations for 5 colorful themes
  const themeConfigs = {
    cosmic: {
      name: 'Cosmic Aurora',
      icon: '🌌',
      lightGradient: 'from-violet-100/80 via-indigo-100/70 to-fuchsia-100/60',
      darkGradient: 'dark:from-slate-950 dark:via-indigo-950/80 dark:to-purple-950/70',
      orb1: 'bg-indigo-500/30 dark:bg-indigo-500/35',
      orb2: 'bg-fuchsia-500/25 dark:bg-fuchsia-500/30',
      orb3: 'bg-cyan-400/25 dark:bg-cyan-400/30',
      orb4: 'bg-amber-400/20 dark:bg-amber-400/25',
      bannerAccent: 'from-indigo-600 via-purple-600 to-pink-500',
      primaryGlow: 'shadow-indigo-500/20'
    },
    cyber: {
      name: 'Cyber Glow',
      icon: '⚡',
      lightGradient: 'from-fuchsia-100/80 via-cyan-100/70 to-indigo-100/70',
      darkGradient: 'dark:from-slate-950 dark:via-fuchsia-950/60 dark:to-cyan-950/60',
      orb1: 'bg-pink-500/30 dark:bg-pink-500/35',
      orb2: 'bg-cyan-400/30 dark:bg-cyan-400/35',
      orb3: 'bg-purple-600/25 dark:bg-purple-600/30',
      orb4: 'bg-yellow-400/20 dark:bg-yellow-400/25',
      bannerAccent: 'from-pink-500 via-purple-600 to-cyan-500',
      primaryGlow: 'shadow-pink-500/20'
    },
    sunrise: {
      name: 'Sunrise Horizon',
      icon: '🌅',
      lightGradient: 'from-amber-100/80 via-rose-100/70 to-purple-100/60',
      darkGradient: 'dark:from-slate-950 dark:via-rose-950/60 dark:to-amber-950/50',
      orb1: 'bg-amber-500/30 dark:bg-amber-500/35',
      orb2: 'bg-rose-500/30 dark:bg-rose-500/35',
      orb3: 'bg-orange-400/25 dark:bg-orange-400/30',
      orb4: 'bg-fuchsia-500/20 dark:bg-fuchsia-500/25',
      bannerAccent: 'from-amber-500 via-rose-500 to-purple-600',
      primaryGlow: 'shadow-rose-500/20'
    },
    emerald: {
      name: 'Emerald Oasis',
      icon: '🌿',
      lightGradient: 'from-emerald-100/80 via-teal-100/70 to-cyan-100/60',
      darkGradient: 'dark:from-slate-950 dark:via-emerald-950/70 dark:to-teal-950/60',
      orb1: 'bg-emerald-500/30 dark:bg-emerald-500/35',
      orb2: 'bg-teal-400/30 dark:bg-teal-400/35',
      orb3: 'bg-cyan-400/25 dark:bg-cyan-400/30',
      orb4: 'bg-lime-400/20 dark:bg-lime-400/25',
      bannerAccent: 'from-emerald-500 via-teal-500 to-cyan-600',
      primaryGlow: 'shadow-emerald-500/20'
    },
    ocean: {
      name: 'Oceanic Azure',
      icon: '🌊',
      lightGradient: 'from-sky-100/80 via-cyan-100/70 to-blue-100/60',
      darkGradient: 'dark:from-slate-950 dark:via-blue-950/70 dark:to-cyan-950/60',
      orb1: 'bg-sky-500/30 dark:bg-sky-500/35',
      orb2: 'bg-blue-600/25 dark:bg-blue-500/30',
      orb3: 'bg-cyan-400/30 dark:bg-cyan-400/35',
      orb4: 'bg-indigo-400/20 dark:bg-indigo-400/25',
      bannerAccent: 'from-sky-500 via-blue-600 to-indigo-600',
      primaryGlow: 'shadow-sky-500/20'
    }
  };

  const currentTheme = themeConfigs[theme];

  const formatTimer = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div
      className={`relative min-h-[calc(100vh-4rem)] bg-gradient-to-br ${currentTheme.lightGradient} ${currentTheme.darkGradient} transition-colors duration-700 overflow-hidden pb-12`}
    >
      {/* Floating Confetti Particles Overlay */}
      {confettiActive && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {Array.from({ length: 45 }).map((_, i) => {
            const randomLeft = Math.random() * 100;
            const randomDelay = Math.random() * 1.5;
            const randomDuration = 2 + Math.random() * 2;
            const colors = [
              '#f43f5e',
              '#ec4899',
              '#8b5cf6',
              '#3b82f6',
              '#06b6d4',
              '#10b981',
              '#f59e0b'
            ];
            const color = colors[i % colors.length];
            return (
              <div
                key={i}
                className="absolute w-3 h-3 rounded-sm opacity-90"
                style={{
                  left: `${randomLeft}%`,
                  top: '-20px',
                  backgroundColor: color,
                  transform: `rotate(${Math.random() * 360}deg)`,
                  animation: `confetti-fall ${randomDuration}s linear ${randomDelay}s forwards`
                }}
              />
            );
          })}
          <style>{`
            @keyframes confetti-fall {
              0% { transform: translateY(0) rotate(0deg); opacity: 1; }
              100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
            }
          `}</style>
        </div>
      )}

      {/* Motivational Quote Toast */}
      {quoteToast && (
        <div className="fixed top-20 right-6 z-50 max-w-sm p-4 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-indigo-200 dark:border-indigo-800 shadow-2xl animate-in slide-in-from-top-4 duration-300">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2 text-amber-500 font-bold text-xs uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Sparkle Inspiration</span>
            </div>
            <button
              onClick={() => setQuoteToast(null)}
              className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="text-xs text-slate-800 dark:text-slate-100 mt-2 font-medium italic leading-relaxed">
            "{quoteToast.text}"
          </p>
          <div className="mt-2 text-right">
            <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold">
              — {quoteToast.author}
            </span>
          </div>
        </div>
      )}

      {/* Dynamic Colorful Aurora Floating Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        {/* Floating Orb 1 */}
        <div
          className={`absolute -top-20 -left-20 w-[28rem] h-[28rem] rounded-full ${currentTheme.orb1} blur-3xl animate-student-orb-1 transition-colors duration-700`}
        />
        {/* Floating Orb 2 */}
        <div
          className={`absolute top-1/4 -right-24 w-[34rem] h-[34rem] rounded-full ${currentTheme.orb2} blur-3xl animate-student-orb-2 transition-colors duration-700`}
        />
        {/* Floating Orb 3 */}
        <div
          className={`absolute bottom-20 left-1/4 w-[26rem] h-[26rem] rounded-full ${currentTheme.orb3} blur-3xl animate-student-orb-3 transition-colors duration-700`}
        />
        {/* Floating Orb 4 */}
        <div
          className={`absolute -bottom-20 right-1/4 w-[30rem] h-[30rem] rounded-full ${currentTheme.orb4} blur-3xl animate-student-orb-1 transition-colors duration-700`}
        />

        {/* Delicate Geometric Constellation & Academic Watermark Overlay */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.04] dark:opacity-[0.08] pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="academic-mesh" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="1.5" fill="currentColor" />
              <circle cx="80" cy="80" r="1.5" fill="currentColor" />
              <path
                d="M 20 20 L 80 80 M 80 20 L 20 80"
                stroke="currentColor"
                strokeWidth="0.5"
                strokeDasharray="2 2"
              />
              <circle cx="80" cy="20" r="1" fill="currentColor" />
              <circle cx="20" cy="80" r="1" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#academic-mesh)" />
        </svg>

        {/* Ambient Sparkles */}
        <div className="absolute top-12 left-1/5 text-amber-400/50 animate-student-sparkle">
          <Sparkles className="w-5 h-5" />
        </div>
        <div className="absolute top-44 right-1/4 text-fuchsia-400/50 animate-student-sparkle [animation-delay:1.2s]">
          <Sparkles className="w-4 h-4" />
        </div>
        <div className="absolute bottom-36 left-16 text-cyan-400/50 animate-student-sparkle [animation-delay:2.4s]">
          <Sparkles className="w-6 h-6" />
        </div>
      </div>

      {/* Main Content Container with Glassmorphism */}
      <div className="relative z-10 space-y-6">
        {/* Top Premium Atmosphere Bar */}
        <div className="p-4 sm:p-5 rounded-3xl bg-white/85 dark:bg-slate-900/85 backdrop-blur-2xl border border-white/80 dark:border-slate-800/80 shadow-xl shadow-indigo-500/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Left: Student Identity & Gamified Scholar Badge */}
          <div className="flex items-center gap-3.5">
            <div
              className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${currentTheme.bannerAccent} p-0.5 shadow-lg flex items-center justify-center shrink-0 animate-float-slow`}
            >
              <div className="w-full h-full rounded-[14px] bg-white dark:bg-slate-900 flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="font-display font-black text-base sm:text-lg text-slate-900 dark:text-white tracking-tight">
                  {activeStudent.name}
                </h2>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/60">
                  <Award className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>Grade {activeStudent.class}-{activeStudent.section} · Roll #{activeStudent.rollNo}</span>
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 border border-amber-200/60 dark:border-amber-800/60">
                  <Flame className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                  <span>14-Day Streak</span>
                </span>
              </div>

              {/* Student XP Progress & Parent Assurance Label */}
              <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
                  <span className="font-bold text-indigo-600 dark:text-indigo-400">Level 4 Scholar</span>
                  <div className="w-24 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full transition-all"
                      style={{ width: `${(studentXP % 1000) / 10}%` }}
                    />
                  </div>
                  <span className="font-mono text-[10px] text-slate-400">{studentXP} XP</span>
                </div>

                <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Parent-Verified Portal</span>
                </span>
              </div>
            </div>
          </div>

          {/* Right: Gamified Controls (Theme Switcher, Sparkle Boost, Focus Station, Parent Desk) */}
          <div className="flex items-center gap-2.5 flex-wrap sm:flex-nowrap justify-between md:justify-end">
            {/* Sparkle Boost Button (Students Love This!) */}
            <button
              onClick={triggerCelebration}
              title="Claim Daily Sparkle Boost (+25 XP)"
              className="px-3 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-900 font-bold text-xs shadow-md shadow-amber-500/20 flex items-center gap-1.5 transition-all cursor-pointer hover:scale-105 active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-900" />
              <span className="hidden sm:inline">Boost</span>
            </button>

            {/* Focus Study Station Trigger */}
            <button
              onClick={() => setIsFocusStationOpen(!isFocusStationOpen)}
              className={`px-3 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-sm ${
                isFocusStationOpen || isTimerRunning
                  ? 'bg-indigo-600 text-white shadow-indigo-500/25 ring-2 ring-indigo-400'
                  : 'bg-white/80 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200/80 dark:border-slate-700'
              }`}
            >
              <Headphones className="w-3.5 h-3.5 text-indigo-400" />
              <span>{isTimerRunning ? formatTimer(focusSeconds) : 'Focus'}</span>
            </button>

            {/* 5 Themes Switcher */}
            <div className="flex items-center gap-1 p-1 rounded-2xl bg-slate-100/90 dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80">
              {(['cosmic', 'cyber', 'sunrise', 'emerald', 'ocean'] as StudentThemeMode[]).map((mode) => {
                const cfg = themeConfigs[mode];
                const isActive = theme === mode;
                return (
                  <button
                    key={mode}
                    onClick={() => {
                      setTheme(mode);
                      playChime();
                    }}
                    title={cfg.name}
                    className={`px-2 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
                      isActive
                        ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm border border-slate-200/80 dark:border-slate-700 scale-105 ring-1 ring-indigo-500/30'
                        : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <span>{cfg.icon}</span>
                  </button>
                );
              })}
            </div>

            {/* Parent Desk Overview Button (For Guardians) */}
            <button
              onClick={() => setIsParentDeskOpen(true)}
              className="px-3.5 py-2 bg-gradient-to-r from-indigo-600 via-sky-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-bold text-xs rounded-xl shadow-md shadow-indigo-500/20 flex items-center gap-1.5 transition-all cursor-pointer hover:scale-[1.02] shrink-0"
            >
              <HeartHandshake className="w-4 h-4 text-amber-300" />
              <span>Parent Desk</span>
            </button>
          </div>
        </div>

        {/* Embedded / Floating Focus Study Station (Pomodoro + Lo-Fi Audio) */}
        {isFocusStationOpen && (
          <div className="p-5 rounded-3xl student-card-glass border-2 border-indigo-400/40 shadow-2xl bg-gradient-to-r from-indigo-950/90 via-slate-900/95 to-purple-950/90 text-white space-y-4 animate-in slide-in-from-top-3 duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-300">
                  <Headphones className="w-5 h-5 text-indigo-300" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-display font-extrabold text-base text-white">
                      Study Focus Station
                    </h3>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/30 text-indigo-200 border border-indigo-400/30 uppercase">
                      {focusModeType === 'study' ? '25m Deep Work' : '5m Power Break'}
                    </span>
                  </div>
                  <p className="text-xs text-indigo-200/80">
                    Built-in Pomodoro timer with soothing ambient white noise to maximize retention
                  </p>
                </div>
              </div>

              {/* Timer Controls */}
              <div className="flex items-center gap-3">
                <div className="font-mono font-black text-3xl text-amber-300 tracking-wider tabular-nums bg-black/40 px-4 py-1.5 rounded-2xl border border-white/10">
                  {formatTimer(focusSeconds)}
                </div>

                <button
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                  className={`p-3 rounded-xl font-bold text-xs flex items-center justify-center transition-all cursor-pointer shadow-lg ${
                    isTimerRunning
                      ? 'bg-rose-600 hover:bg-rose-500 text-white'
                      : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold'
                  }`}
                >
                  {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                </button>

                <button
                  onClick={() => {
                    setIsTimerRunning(false);
                    setFocusSeconds(focusModeType === 'study' ? 25 * 60 : 5 * 60);
                  }}
                  title="Reset Timer"
                  className="p-3 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                {/* Lo-Fi Ambient Rain Noise Toggle */}
                <button
                  onClick={toggleAmbientSound}
                  title={soundPlaying ? 'Mute Ambient Rain' : 'Play Lo-Fi Rain Sound'}
                  className={`px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                    soundPlaying
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/30'
                      : 'bg-white/10 hover:bg-white/20 text-cyan-200 border border-cyan-400/30'
                  }`}
                >
                  {soundPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                  <span>{soundPlaying ? 'Rain On' : 'Rain Sound'}</span>
                </button>

                <button
                  onClick={() => setIsFocusStationOpen(false)}
                  className="p-2 rounded-xl text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Dynamic Nested Student Page Content */}
        <div className="transition-all duration-300">{children}</div>
      </div>

      {/* Parent Desk & Verification Modal (Parents Love This Official Dossier!) */}
      {isParentDeskOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-6 bg-gradient-to-r from-indigo-900 via-slate-900 to-indigo-950 text-white relative">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Parental Verification & Oversight Center</span>
                  </div>
                  <h3 className="font-display font-bold text-xl text-white">
                    Official Student & Guardian Dossier
                  </h3>
                  <p className="text-xs text-indigo-200/80">
                    Cambridge Public School Institutional Portal · Academic Year 2024-2026
                  </p>
                </div>
                <button
                  onClick={() => setIsParentDeskOpen(false)}
                  className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
              {/* Student Identity Card */}
              <div className="p-4 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-lg font-display shadow-md">
                    {activeStudent.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                      {activeStudent.name}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Class {activeStudent.class}-{activeStudent.section} · Roll #{activeStudent.rollNo}
                    </p>
                    <p className="text-xs font-mono font-semibold text-indigo-600 dark:text-indigo-400 mt-0.5">
                      Student ID: {activeStudent.studentId}
                    </p>
                  </div>
                </div>

                <div className="text-left sm:text-right text-xs space-y-1">
                  <span className="inline-block px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-semibold">
                    Status: Enrolled & Good Standing
                  </span>
                  <p className="text-slate-500 dark:text-slate-400">
                    Term 1 Attendance: <strong>94.2%</strong>
                  </p>
                </div>
              </div>

              {/* Parent Quick Metrics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
                  <span className="text-[11px] text-slate-400 block font-medium">Guardian Name</span>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-100 mt-1 block">
                    {activeStudent.parentName || 'Mrs. & Mr. Sharma'}
                  </span>
                  <span className="text-[10px] text-slate-500">Primary Contact Linked</span>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
                  <span className="text-[11px] text-slate-400 block font-medium">Guardian Phone</span>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-100 mt-1 block flex items-center gap-1">
                    <Phone className="w-3 h-3 text-emerald-500" />
                    <span>{activeStudent.phone || '+91 98765 43210'}</span>
                  </span>
                  <span className="text-[10px] text-emerald-600">SMS Alerts Verified</span>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
                  <span className="text-[11px] text-slate-400 block font-medium">Fee Clearance</span>
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-1 block flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Cleared for Term 1</span>
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">Rcpt #CPS-24-884</span>
                </div>
              </div>

              {/* Academic Health & Conduct for Parents */}
              <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-indigo-500" />
                  <span>Academic Standing & Conduct Assessment</span>
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                    <span className="text-[10px] text-slate-400 block">CCE Grade</span>
                    <strong className="text-lg font-display text-indigo-600 dark:text-indigo-400">A+</strong>
                    <span className="text-[10px] text-slate-500 block">Distinction</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                    <span className="text-[10px] text-slate-400 block">Class Rank</span>
                    <strong className="text-lg font-display text-emerald-600 dark:text-emerald-400">#2</strong>
                    <span className="text-[10px] text-slate-500 block">Top 5%</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                    <span className="text-[10px] text-slate-400 block">Discipline</span>
                    <strong className="text-lg font-display text-sky-600 dark:text-sky-400">Exemplary</strong>
                    <span className="text-[10px] text-slate-500 block">0 Infractions</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                    <span className="text-[10px] text-slate-400 block">Homework</span>
                    <strong className="text-lg font-display text-amber-600 dark:text-amber-400">96%</strong>
                    <span className="text-[10px] text-slate-500 block">On-Time Submissions</span>
                  </div>
                </div>
              </div>

              {/* Direct Actions for Parents */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => {
                    setIsParentDeskOpen(false);
                    setIsReportOpen(true);
                  }}
                  className="flex-1 py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Official Term 1 Report Card</span>
                </button>
                <button
                  onClick={() => {
                    setIsParentDeskOpen(false);
                    onNavigate('/student/communication');
                  }}
                  className="py-3 px-4 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Mail className="w-4 h-4" />
                  <span>Message Class Teacher</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Official Report Card Modal */}
      <ReportCardModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        student={activeStudent}
        marks={marks}
      />
    </div>
  );
};
