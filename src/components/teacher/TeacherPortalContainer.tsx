import React, { useState, useEffect } from 'react';
import { useSchool } from '../../context/SchoolContext';
import {
  BookOpen,
  Feather,
  Quote,
  Sparkles,
  Palette,
  Clock,
  Calendar,
  CheckCircle2,
  Users,
  Award,
  FileText,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Copy,
  Check,
  Download,
  Printer,
  Compass,
  GraduationCap,
  Briefcase,
  X,
  ExternalLink,
  ShieldCheck,
  Search,
  Bell,
  SlidersHorizontal,
  Bookmark
} from 'lucide-react';

export type TeacherThemeMode = 'oxford' | 'cambridge' | 'merlot' | 'noir' | 'parchment';

interface TeacherPortalContainerProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  children: React.ReactNode;
}

// Scholastic Poetry and Pedagogical Verses for Educators
export interface ScholasticVerse {
  id: string;
  title: string;
  author: string;
  year?: string;
  excerpt: string;
  fullPoem: string[];
  pedagogicalReflection: string;
  category: 'Enlightenment' | 'Perseverance' | 'Guiding Youth' | 'Wisdom' | 'Duty & Vocation';
}

export const SCHOLASTIC_POEMS: ScholasticVerse[] = [
  {
    id: 'tagore-mind',
    title: 'Where the Mind is Without Fear',
    author: 'Rabindranath Tagore',
    year: '1910 (Gitanjali)',
    excerpt: 'Where the mind is without fear and the head is held high;\nWhere knowledge is free;\nWhere the clear stream of reason has not lost its way...',
    fullPoem: [
      'Where the mind is without fear and the head is held high;',
      'Where knowledge is free;',
      'Where the world has not been broken up into fragments',
      'By narrow domestic walls;',
      'Where words come out from the depth of truth;',
      'Where tireless striving stretches its arms towards perfection;',
      'Where the clear stream of reason has not lost its way',
      'Into the dreary desert sand of dead habit;',
      'Where the mind is led forward by thee',
      'Into ever-widening thought and action—',
      'Into that heaven of freedom, my Father, let my country awake.'
    ],
    pedagogicalReflection: 'As educators, our sacred duty is not merely the transmission of facts, but cultivating an intellectual haven where young minds fearlessly question, reason with clarity, and rise above domestic bias toward holistic perfection.',
    category: 'Enlightenment'
  },
  {
    id: 'frost-woods',
    title: 'Stopping by Woods on a Snowy Evening',
    author: 'Robert Frost',
    year: '1923',
    excerpt: 'The woods are lovely, dark and deep,\nBut I have promises to keep,\nAnd miles to go before I sleep,\nAnd miles to go before I sleep.',
    fullPoem: [
      'Whose woods these are I think I know.',
      'His house is in the village though;',
      'He will not see me stopping here',
      'To watch his woods fill up with snow.',
      '',
      'My little horse must think it queer',
      'To stop without a farmhouse near',
      'Between the woods and frozen lake',
      'The darkest evening of the year.',
      '',
      'The woods are lovely, dark and deep,',
      'But I have promises to keep,',
      'And miles to go before I sleep,',
      'And miles to go before I sleep.'
    ],
    pedagogicalReflection: 'The solemn promise of a teacher: despite the fatigue of evaluating hundreds of manuscripts and guiding uncertain adolescents, our commitment to their destiny keeps us marching forward with unwavering dedication.',
    category: 'Duty & Vocation'
  },
  {
    id: 'gibran-teaching',
    title: 'The Prophet: On Teaching',
    author: 'Kahlil Gibran',
    year: '1923',
    excerpt: 'If he is indeed wise he does not bid you enter the house of his wisdom,\nbut rather leads you to the threshold of your own mind.',
    fullPoem: [
      'Then said a teacher, Speak to us of Teaching.',
      'And he said:',
      'No man can reveal to you aught but that which already lies half asleep in the dawning of your knowledge.',
      'The teacher who walks in the shadow of the temple, among his followers, gives not of his wisdom but rather of his faith and his lovingness.',
      'If he is indeed wise he does not bid you enter the house of his wisdom, but rather leads you to the threshold of your own mind.',
      'The astronomer may speak to you of his understanding of space, but he cannot give you his understanding.',
      'The musician may sing to you of the rhythm which is in all space, but he cannot give you the ear which arrests the rhythm nor the voice that echoes it.',
      'And he who is versed in the science of numbers can tell of the regions of weight and measure, but he cannot conduct you thither.',
      'For the vision of one man lends not its wings to another man.'
    ],
    pedagogicalReflection: 'True teaching is empowerment, not dogma. We lead each student to the threshold of their own cognition, encouraging autonomous critical inquiry rather than mere rote repetition.',
    category: 'Wisdom'
  },
  {
    id: 'dickinson-stature',
    title: 'We Never Know How High We Are',
    author: 'Emily Dickinson',
    year: 'c. 1870',
    excerpt: 'We never know how high we are\nTill we are called to rise;\nAnd then, if we are true to plan,\nOur statures touch the skies—',
    fullPoem: [
      'We never know how high we are',
      'Till we are called to rise;',
      'And then, if we are true to plan,',
      'Our statures touch the skies—',
      '',
      'The Heroism we recite',
      'Would be a daily thing,',
      'Did not ourselves the Cubits warp',
      'For fear to be a King—'
    ],
    pedagogicalReflection: 'Every child sitting before us holds latent greatness. Our calling is to call them to rise, refusing to allow self-doubt to shrink the boundless potential within their hearts.',
    category: 'Guiding Youth'
  },
  {
    id: 'radhakrishnan-light',
    title: 'The Pillar of True Thought',
    author: 'Dr. Sarvepalli Radhakrishnan',
    year: 'National Education Address',
    excerpt: 'Teachers should be the best minds in the country.\nTrue teachers are those who help us think for ourselves;\nEducation is not merely the acquisition of information, but the initiation into a higher life.',
    fullPoem: [
      'Teachers should be the best minds in the country.',
      'A life of joy and happiness is possible only on the basis of knowledge and science.',
      'True teachers are those who help us think for ourselves,',
      'Who cultivate humility before mystery and courage before truth.',
      'Tolerance is the homage which the finite mind pays to the inexhaustibility of the Infinite.',
      'Education is not merely the acquisition of information,',
      'It is the initiation into a higher life,',
      'The training of the human soul in the pursuit of truth and the practice of virtue.'
    ],
    pedagogicalReflection: 'The teacher stands as the vanguard of civilized culture. Our role is to model intellectual courage and moral integrity, nurturing students into virtuous, self-reliant global citizens.',
    category: 'Enlightenment'
  },
  {
    id: 'angelou-torch',
    title: 'The Educator’s Continuum',
    author: 'Maya Angelou',
    year: 'Philosophical Address',
    excerpt: 'This is the value of the teacher: to give what was given to you,\nto lift as you climb, and to illuminate the path for those who follow.',
    fullPoem: [
      'I’ve learned that people will forget what you said,',
      'People will forget what you did,',
      'But people will never forget how you made them feel.',
      'When you learn, teach. When you get, give.',
      'This is the value of the teacher:',
      'To lift as you climb,',
      'To reach back into the quiet corners of the classroom',
      'And illuminate the path for those who follow in your footsteps.'
    ],
    pedagogicalReflection: 'Students will carry the atmosphere of our kindness and high standards for decades after they leave our classrooms. Cultivate both relentless rigor and profound empathy.',
    category: 'Guiding Youth'
  }
];

export const TeacherPortalContainer: React.FC<TeacherPortalContainerProps> = ({
  currentPath,
  onNavigate,
  children
}) => {
  const { currentTeacher, students, timetable, assignments, submissions, attendance } = useSchool();

  // Theme selection saved to localStorage
  const [theme, setTheme] = useState<TeacherThemeMode>(() => {
    return (localStorage.getItem('cps_teacher_theme') as TeacherThemeMode) || 'oxford';
  });

  // Poetry banner state
  const [verseIndex, setVerseIndex] = useState(0);
  const [isPoetryExpanded, setIsPoetryExpanded] = useState(true);
  const [selectedPoemModal, setSelectedPoemModal] = useState<ScholasticVerse | null>(null);
  const [copiedToast, setCopiedToast] = useState(false);
  const [isDossierOpen, setIsDossierOpen] = useState(false);
  const [isClassRegisterOpen, setIsClassRegisterOpen] = useState(false);
  const [registerSearch, setRegisterSearch] = useState('');

  useEffect(() => {
    localStorage.setItem('cps_teacher_theme', theme);
  }, [theme]);

  const activeVerse = SCHOLASTIC_POEMS[verseIndex];

  const handleNextVerse = () => {
    setVerseIndex((prev) => (prev + 1) % SCHOLASTIC_POEMS.length);
  };

  const handlePrevVerse = () => {
    setVerseIndex((prev) => (prev - 1 + SCHOLASTIC_POEMS.length) % SCHOLASTIC_POEMS.length);
  };

  const handleCopyVerse = (e: React.MouseEvent) => {
    e.stopPropagation();
    const textToCopy = `"${activeVerse.title}" by ${activeVerse.author}\n\n${activeVerse.fullPoem.join('\n')}\n\n[Shared for Chennai Public School — Faculty Morning Reflection]`;
    navigator.clipboard?.writeText(textToCopy);
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 2500);
  };

  // Theme Styling Configurations (strictly professional, executive, scholastic)
  const themeStyles = {
    oxford: {
      name: 'Oxford Blue & Champagne Gold',
      code: 'oxford',
      accentColor: 'border-amber-500/80',
      badgeBg: 'bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-300 border-amber-200 dark:border-amber-800/60',
      bannerGradient: 'from-[#0B192C] via-[#1E3E62] to-[#0A192F]',
      bannerText: 'text-amber-300',
      bannerSub: 'text-slate-300',
      crestColor: 'text-amber-400',
      pillActive: 'bg-[#1E3E62] text-white border-amber-500/40',
      toolbarBorder: 'border-slate-300/80 dark:border-slate-800'
    },
    cambridge: {
      name: 'Cambridge Forest & Burnished Brass',
      code: 'cambridge',
      accentColor: 'border-emerald-600/80',
      badgeBg: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/60',
      bannerGradient: 'from-[#042F2E] via-[#064E3B] to-[#0D3B2E]',
      bannerText: 'text-emerald-200',
      bannerSub: 'text-emerald-100/80',
      crestColor: 'text-emerald-400',
      pillActive: 'bg-[#064E3B] text-white border-emerald-400/40',
      toolbarBorder: 'border-emerald-900/20 dark:border-emerald-900/40'
    },
    merlot: {
      name: 'Imperial Burgundy & Warm Ivory',
      code: 'merlot',
      accentColor: 'border-rose-600/80',
      badgeBg: 'bg-rose-50 dark:bg-rose-950/40 text-rose-950 dark:text-rose-200 border-rose-200 dark:border-rose-800/60',
      bannerGradient: 'from-[#2B0910] via-[#4A0E17] to-[#3B0713]',
      bannerText: 'text-rose-200',
      bannerSub: 'text-rose-100/80',
      crestColor: 'text-rose-400',
      pillActive: 'bg-[#4A0E17] text-white border-rose-400/40',
      toolbarBorder: 'border-rose-900/20 dark:border-rose-900/40'
    },
    noir: {
      name: 'Executive Noir & Platinum',
      code: 'noir',
      accentColor: 'border-sky-500/80',
      badgeBg: 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 border-slate-300 dark:border-slate-700',
      bannerGradient: 'from-[#0B0F19] via-[#1E293B] to-[#0F172A]',
      bannerText: 'text-sky-300',
      bannerSub: 'text-slate-300',
      crestColor: 'text-sky-400',
      pillActive: 'bg-slate-800 text-white border-sky-400/40',
      toolbarBorder: 'border-slate-300 dark:border-slate-800'
    },
    parchment: {
      name: 'Heritage Scholar & Sepia',
      code: 'parchment',
      accentColor: 'border-amber-700/80',
      badgeBg: 'bg-amber-100/60 dark:bg-amber-950/50 text-amber-950 dark:text-amber-200 border-amber-300/80 dark:border-amber-800/60',
      bannerGradient: 'from-[#25150C] via-[#3E2314] to-[#2B170D]',
      bannerText: 'text-amber-200',
      bannerSub: 'text-amber-100/80',
      crestColor: 'text-amber-400',
      pillActive: 'bg-[#3E2314] text-white border-amber-600/40',
      toolbarBorder: 'border-amber-900/20 dark:border-amber-900/40'
    }
  };

  const currentThemeConfig = themeStyles[theme];

  // Navigation Links for Teachers
  const teacherNavTabs = [
    { label: 'Executive Overview', path: '/teacher/dashboard', icon: Briefcase },
    { label: 'Attendance Roll Call', path: '/teacher/attendance', icon: CheckCircle2 },
    { label: 'Academic Gradebook', path: '/teacher/gradebook', icon: Award },
    { label: 'Assignments Desk', path: '/teacher/assignments', icon: FileText },
    { label: 'Instructional Timetable', path: '/teacher/timetable', icon: Clock },
    { label: 'Class 10-A Roster', path: '/teacher/students', icon: Users },
    { label: 'Lesson Planner', path: '/teacher/lesson-planner', icon: BookOpen },
    { label: 'Faculty Repository', path: '/teacher/materials', icon: Bookmark },
    { label: 'Faculty Leaves', path: '/teacher/leave', icon: Calendar },
    { label: 'Academic Credentials', path: '/teacher/profile', icon: GraduationCap }
  ];

  // Grade 10-A registered students count
  const classStudents = students.filter((s) => s.class === '10' && s.section === 'A');
  const filteredRegister = classStudents.filter(
    (s) =>
      s.name.toLowerCase().includes(registerSearch.toLowerCase()) ||
      String(s.rollNo).includes(registerSearch.toLowerCase()) ||
      s.studentId.toLowerCase().includes(registerSearch.toLowerCase())
  );

  return (
    <div className="space-y-6 teacher-scholastic-grid pb-12 transition-colors">
      {/* 1. TOP EXECUTIVE FACULTY SUITE BANNER */}
      <div className="rounded-2xl p-5 sm:p-6 bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm relative overflow-hidden">
        {/* Subtle executive top border accent */}
        <div
          className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${
            theme === 'oxford'
              ? 'from-[#0B192C] via-amber-500 to-[#1E3E62]'
              : theme === 'cambridge'
              ? 'from-[#042F2E] via-emerald-500 to-[#064E3B]'
              : theme === 'merlot'
              ? 'from-[#2B0910] via-rose-500 to-[#4A0E17]'
              : theme === 'noir'
              ? 'from-slate-900 via-sky-500 to-slate-800'
              : 'from-[#25150C] via-amber-600 to-[#3E2314]'
          }`}
        />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Faculty Identification */}
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-slate-900 dark:bg-slate-800 text-white flex items-center justify-center font-display font-bold text-lg shadow-sm border border-slate-700/60 shrink-0">
              <span className="font-serif-scholastic italic text-xl">CPS</span>
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Faculty Workspace · Academic Year 2026–2027
                </span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${currentThemeConfig.badgeBg}`}
                >
                  Grade 10-A Class Coordinator
                </span>
              </div>
              <h1 className="font-display font-extrabold text-xl sm:text-2xl text-slate-900 dark:text-white flex items-center gap-2">
                <span>{currentTeacher.name}</span>
                <span className="text-xs font-mono font-medium px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                  EMP #{currentTeacher.employeeId}
                </span>
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Department of {currentTeacher.department} · Chennai Public School (Affiliation CBSE #1930211)
              </p>
            </div>
          </div>

          {/* Theme Selector & Executive Controls */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Theme Picker Dropdown */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
              <Palette className="w-3.5 h-3.5 ml-1.5 text-slate-500" />
              <span className="text-[11px] font-medium text-slate-600 dark:text-slate-300 mr-1 hidden sm:inline">
                Faculty Theme:
              </span>
              {(['oxford', 'cambridge', 'merlot', 'noir', 'parchment'] as TeacherThemeMode[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setTheme(t)}
                  title={themeStyles[t].name}
                  className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg transition-all capitalize ${
                    theme === t
                      ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs font-bold'
                      : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Quick Action: Class Register Lookup */}
            <button
              onClick={() => setIsClassRegisterOpen(true)}
              className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white rounded-xl text-xs font-medium shadow-xs transition-all flex items-center gap-1.5 border border-slate-700"
            >
              <Users className="w-3.5 h-3.5" />
              <span>Class 10-A Register</span>
            </button>

            {/* Quick Action: Academic Dossier */}
            <button
              onClick={() => setIsDossierOpen(true)}
              className="px-3 py-1.5 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-medium border border-slate-200 dark:border-slate-700 shadow-xs transition-all flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Academic Dossier</span>
            </button>
          </div>
        </div>

        {/* Rapid Status Bar */}
        <div className="mt-4 pt-3.5 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600 dark:text-slate-400">
          <div className="flex flex-wrap items-center gap-4">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>Active Period:</span>
              <strong className="text-slate-900 dark:text-white font-mono">Period 3 (10:45 AM – 11:30 AM)</strong>
            </span>
            <span className="hidden sm:inline text-slate-300 dark:text-slate-700">|</span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>Instructional Schedule:</span>
              <strong className="text-slate-900 dark:text-white">Monday Timetable Active</strong>
            </span>
            <span className="hidden sm:inline text-slate-300 dark:text-slate-700">|</span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>Roll Call Today:</span>
              <strong className="text-emerald-600 dark:text-emerald-400 font-semibold">Completed (10-A)</strong>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-mono text-slate-500">Board Sync: Real-Time</span>
          </div>
        </div>
      </div>

      {/* 2. THE EDUCATOR'S VERSE: SCHOLASTIC POETRY & PEDAGOGICAL ANTHOLOGY */}
      {/* Addresses requirement: "the theme of the poem which doesn't look same as the students portal" */}
      <div
        className={`rounded-2xl transition-all shadow-md overflow-hidden bg-gradient-to-r ${currentThemeConfig.bannerGradient} text-white border border-white/10`}
      >
        <div className="p-5 sm:p-6">
          <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-3 mb-4">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-white/10 text-amber-300">
                <Feather className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-300/80">
                  Scholastic Inscription · Faculty Reflection
                </span>
                <h3 className="font-serif-scholastic italic text-base sm:text-lg text-white font-semibold">
                  The Educator’s Anthology & Pedagogical Verse
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={handlePrevVerse}
                title="Previous Poetic Verse"
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs font-mono px-2 text-slate-300">
                {verseIndex + 1} / {SCHOLASTIC_POEMS.length}
              </span>
              <button
                onClick={handleNextVerse}
                title="Next Poetic Verse"
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsPoetryExpanded(!isPoetryExpanded)}
                className="ml-2 p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors text-xs flex items-center gap-1"
                title={isPoetryExpanded ? 'Collapse Verse' : 'Expand Verse'}
              >
                {isPoetryExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Verse Display */}
          {isPoetryExpanded && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-8 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-white/15 text-amber-200">
                    {activeVerse.category}
                  </span>
                  <span className="text-xs text-slate-300">
                    — {activeVerse.year || 'Timeless Educational Canon'}
                  </span>
                </div>

                <div className="pl-4 border-l-2 border-amber-400/60 py-1 space-y-2">
                  <h4 className="font-serif-scholastic font-bold text-xl sm:text-2xl text-white tracking-wide">
                    "{activeVerse.title}"
                  </h4>
                  <p className="font-serif-scholastic italic text-sm sm:text-base text-slate-100/90 leading-relaxed whitespace-pre-line">
                    {activeVerse.excerpt}
                  </p>
                  <p className="text-xs font-medium text-amber-300/90 tracking-wide uppercase pt-1">
                    — {activeVerse.author}
                  </p>
                </div>
              </div>

              {/* Pedagogical Takeaway & Actions */}
              <div className="lg:col-span-4 p-4 rounded-xl bg-black/25 border border-white/10 space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                  <Compass className="w-3.5 h-3.5 text-amber-300" />
                  <span>Pedagogical Reflection</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  {activeVerse.pedagogicalReflection}
                </p>

                <div className="pt-2 flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedPoemModal(activeVerse)}
                    className="px-3 py-1.5 rounded-lg bg-white/15 hover:bg-white/25 text-white text-xs font-medium transition-all flex items-center gap-1.5"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Read Full Verse</span>
                  </button>

                  <button
                    onClick={handleCopyVerse}
                    className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs"
                  >
                    {copiedToast ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedToast ? 'Copied to Clipboard!' : 'Copy for Classroom'}</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {!isPoetryExpanded && (
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 font-serif-scholastic italic text-slate-200">
                <Quote className="w-3.5 h-3.5 text-amber-400" />
                <span className="font-semibold">{activeVerse.title}</span>
                <span className="text-slate-400">({activeVerse.author}):</span>
                <span className="line-clamp-1 italic">"{activeVerse.excerpt.split('\n')[0]}"</span>
              </div>
              <button
                onClick={() => setSelectedPoemModal(activeVerse)}
                className="text-amber-300 hover:underline text-xs shrink-0"
              >
                View Full Text
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 3. EXECUTIVE FACULTY NAVIGATOR (Sub-navigation tabs) */}
      <div className="p-2 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {teacherNavTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = currentPath === tab.path;
            return (
              <button
                key={tab.path}
                onClick={() => onNavigate(tab.path)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all border ${
                  isActive
                    ? `${currentThemeConfig.pillActive} shadow-xs font-semibold`
                    : 'border-transparent text-slate-600 dark:text-slate-400 hover:bg-slate-100/80 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. MAIN TEACHER CONTENT VIEWPORT */}
      <div className="transition-all duration-200">{children}</div>

      {/* 5. FULL POETRY & REFLECTION MODAL */}
      {selectedPoemModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="space-y-1">
                <span className="text-[11px] font-mono uppercase tracking-widest text-amber-700 dark:text-amber-400">
                  {selectedPoemModal.category} · Classical Anthology
                </span>
                <h3 className="font-serif-scholastic font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white">
                  {selectedPoemModal.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Authored by <strong className="text-slate-800 dark:text-slate-200">{selectedPoemModal.author}</strong> ({selectedPoemModal.year})
                </p>
              </div>
              <button
                onClick={() => setSelectedPoemModal(null)}
                className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Complete Verse text */}
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 space-y-2">
              {selectedPoemModal.fullPoem.map((line, idx) => (
                <p
                  key={idx}
                  className={`font-serif-scholastic text-sm sm:text-base leading-relaxed ${
                    line === '' ? 'h-3' : 'text-slate-800 dark:text-slate-200'
                  }`}
                >
                  {line}
                </p>
              ))}
            </div>

            {/* Pedagogical reflection */}
            <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/50 space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 dark:text-amber-300">
                <Compass className="w-4 h-4" />
                <span>Pedagogical Application for the Classroom</span>
              </div>
              <p className="text-xs text-amber-950/90 dark:text-amber-200/90 leading-relaxed">
                {selectedPoemModal.pedagogicalReflection}
              </p>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => {
                  const text = `"${selectedPoemModal.title}" by ${selectedPoemModal.author}\n\n${selectedPoemModal.fullPoem.join('\n')}`;
                  navigator.clipboard?.writeText(text);
                  setCopiedToast(true);
                  setTimeout(() => setCopiedToast(false), 2000);
                }}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold rounded-xl flex items-center gap-1.5"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copiedToast ? 'Copied Full Verse!' : 'Copy Verse'}</span>
              </button>

              <button
                onClick={() => setSelectedPoemModal(null)}
                className="px-5 py-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-semibold rounded-xl"
              >
                Close Anthology
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. CLASS 10-A ROSTER QUICK LOOKUP DRAWER */}
      {isClassRegisterOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-2xl w-full p-6 space-y-4 shadow-2xl max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                <div>
                  <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
                    Class 10-A Official Register
                  </h3>
                  <p className="text-xs text-slate-500">
                    {classStudents.length} Students Assigned · Class Teacher {currentTeacher.name}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsClassRegisterOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search by student name or roll number..."
                value={registerSearch}
                onChange={(e) => setRegisterSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Student Table */}
            <div className="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800 border border-slate-100 dark:border-slate-800 rounded-xl">
              {filteredRegister.length === 0 ? (
                <div className="py-8 text-center text-xs text-slate-400">No students found matching query.</div>
              ) : (
                filteredRegister.map((s) => (
                  <div
                    key={s.id}
                    className="p-3 flex items-center justify-between hover:bg-slate-50/70 dark:hover:bg-slate-800/40 text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 font-bold flex items-center justify-center font-mono">
                        #{s.rollNo}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-white">{s.name}</p>
                        <p className="text-[11px] text-slate-400">
                          ID: {s.studentId} · Guardian: {s.parentName} ({s.parentPhone})
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 font-mono font-medium">
                        Att: {s.attendanceRate}%
                      </span>
                      <button
                        onClick={() => {
                          setIsClassRegisterOpen(false);
                          onNavigate('/teacher/gradebook');
                        }}
                        className="px-2 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded text-[11px] font-medium text-slate-700 dark:text-slate-300"
                      >
                        Gradebook →
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setIsClassRegisterOpen(false)}
                className="px-4 py-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-semibold rounded-xl"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 7. ACADEMIC DOSSIER PRINT / EXPORT MODAL */}
      {isDossierOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-5 shadow-2xl max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-slate-900 text-white">
                  <Printer className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
                    Faculty Academic Dossier
                  </h3>
                  <p className="text-xs text-slate-500">
                    Official Term 1 Summary for Department of {currentTeacher.department}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsDossierOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4 pb-3 border-b border-slate-200 dark:border-slate-800">
                <div>
                  <span className="text-slate-400">Class Coordinator:</span>
                  <p className="font-bold text-slate-900 dark:text-white text-sm">{currentTeacher.name}</p>
                </div>
                <div>
                  <span className="text-slate-400">Employee ID:</span>
                  <p className="font-bold text-slate-900 dark:text-white text-sm">#{currentTeacher.employeeId}</p>
                </div>
                <div>
                  <span className="text-slate-400">Assigned Sections:</span>
                  <p className="font-bold text-slate-900 dark:text-white">Grade 10-A, Grade 10-B</p>
                </div>
                <div>
                  <span className="text-slate-400">Average Class Attendance:</span>
                  <p className="font-bold text-emerald-600 dark:text-emerald-400">93.4%</p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
                  Instructional Pacing & Syllabus Status:
                </h4>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span>Unit 1 to Unit 4: Linear Equations & Coordinate Geometry</span>
                      <strong className="text-emerald-600">100% Completed</strong>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full w-full" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span>Unit 5: Triangles & Trigonometric Applications</span>
                      <strong className="text-sky-600">85% In Progress</strong>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-sky-500 h-full w-[85%]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => {
                  window.print();
                }}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold shadow-xs flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Official Dossier</span>
              </button>
              <button
                onClick={() => setIsDossierOpen(false)}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
