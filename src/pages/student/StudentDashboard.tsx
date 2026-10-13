import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import {
  GraduationCap,
  Calendar,
  Clock,
  FileText,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Download,
  ArrowRight,
  BookOpen,
  ChevronRight,
  Sparkles,
  ShieldCheck,
  Award,
  HeartHandshake,
  Phone,
  Flame,
  CheckSquare,
  Square,
  Lightbulb,
  Zap,
  BookMarked,
  Star,
  HelpCircle
} from 'lucide-react';
import { ReportCardModal } from '../../components/common/ReportCardModal';

interface StudentDashboardProps {
  onNavigate: (path: string) => void;
}

const STUDENT_RIDDLES = [
  {
    question: "What has keys, but no locks; space, but no room; and you can enter, but never leave?",
    answer: "A Computer Keyboard! ⌨️"
  },
  {
    question: "What is so fragile that even saying its name breaks it?",
    answer: "Silence! 🤫"
  },
  {
    question: "The more of this you take, the more you leave behind. What is it?",
    answer: "Footsteps! 👣"
  },
  {
    question: "What can travel all around the world while remaining in the same corner?",
    answer: "A Postage Stamp! 📮"
  }
];

export const StudentDashboard: React.FC<StudentDashboardProps> = ({ onNavigate }) => {
  const {
    currentUser,
    currentStudent,
    timetable,
    assignments,
    submissions,
    marks,
    announcements,
    events
  } = useSchool();
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [riddleIdx, setRiddleIdx] = useState(0);
  const [showRiddleAnswer, setShowRiddleAnswer] = useState(false);
  const [quests, setQuests] = useState([
    { id: 'q1', title: 'Review Quadratic Equations Homework', xp: 50, path: '/student/assignments', done: true },
    { id: 'q2', title: 'Check Room 304 & Physics Laboratory timetable', xp: 30, path: '/student/timetable', done: false },
    { id: 'q3', title: 'Read Chemistry Revision Guide in Repository', xp: 40, path: '/student/materials', done: false }
  ]);

  const activeStudent =
    currentUser && currentUser.role === 'student' ? (currentUser as any) : currentStudent;

  const toggleQuest = (id: string) => {
    setQuests((prev) =>
      prev.map((q) => (q.id === id ? { ...q, done: !q.done } : q))
    );
  };

  // Stats calculation
  const studentSubmissions = submissions.filter((s) => s.studentId === activeStudent.id);
  const submittedIds = new Set(studentSubmissions.map((s) => s.assignmentId));
  const pendingAssignments = assignments.filter((a) => !submittedIds.has(a.id));

  const studentMarks = marks.filter((m) => m.studentId === activeStudent.id);
  const avgScore =
    studentMarks.length > 0
      ? (studentMarks.reduce((sum, m) => sum + m.total, 0) / studentMarks.length).toFixed(1)
      : '87.8';

  // Today's schedule (e.g. Monday slots)
  const todaySlots = timetable.filter((t) => t.day === 'Monday').sort((a, b) => a.period - b.period);

  return (
    <div className="space-y-6">
      {/* Newly Joined Student Welcome Banner */}
      {activeStudent.isNewlyJoined && (
        <div className="p-4 rounded-2xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 text-sky-950 dark:text-sky-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-2.5 text-xs">
            <span className="w-2 h-2 rounded-full bg-sky-500 animate-ping shrink-0" />
            <p>
              <strong>Newly Enrolled Account:</strong> Welcome to CPS! You signed in with your admin-assigned Student ID ({activeStudent.studentId}). You can now customize your profile details and set your personal password.
            </p>
          </div>
          <button
            onClick={() => onNavigate('/student/profile')}
            className="px-3 py-1.5 bg-sky-600 hover:bg-sky-700 text-white rounded-lg text-xs font-semibold shrink-0 transition-colors cursor-pointer"
          >
            Update Profile & Password →
          </button>
        </div>
      )}

      {/* Welcome Banner - Ultra Vibrant & Engaging */}
      <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-950 text-white relative overflow-hidden shadow-2xl border border-indigo-400/30">
        {/* Colorful Ambient Glows inside Hero */}
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-fuchsia-500/25 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-cyan-400/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/3 w-40 h-40 bg-amber-400/15 rounded-full blur-xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-semibold text-sky-200 border border-white/20">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Grade {activeStudent.class}-{activeStudent.section} · Roll #{activeStudent.rollNo}</span>
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/25 text-emerald-300 border border-emerald-400/30 text-xs font-medium">
              <Flame className="w-3.5 h-3.5 text-orange-400" />
              <span>14-Day Perfect Streak</span>
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-purple-500/25 text-purple-200 border border-purple-400/30 text-xs font-medium">
              <Award className="w-3.5 h-3.5 text-yellow-300" />
              <span>Honor Roll Rank #2</span>
            </span>
          </div>

          <h1 className="font-display font-extrabold text-2xl sm:text-4xl text-white tracking-tight">
            Welcome back, {activeStudent.name}! 🚀
          </h1>
          <p className="text-xs sm:text-sm text-indigo-100/90 leading-relaxed font-normal">
            Your personalized CPS learning workspace is primed and ready. You have {pendingAssignments.length} pending task{pendingAssignments.length === 1 ? '' : 's'} to conquer and next period starts at 09:00 AM in Room 304.
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => onNavigate('/student/assignments')}
              className="px-4 py-2.5 bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-400 hover:to-indigo-400 text-white rounded-xl text-xs font-semibold shadow-lg shadow-sky-500/25 transition-all flex items-center gap-2 cursor-pointer hover:scale-[1.02]"
            >
              <span>Explore Assignments</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setIsReportOpen(true)}
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold transition-all flex items-center gap-2 border border-white/25 cursor-pointer backdrop-blur-md"
            >
              <Download className="w-3.5 h-3.5 text-amber-300" />
              <span>Download Official Report Card</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Colorful Glassmorphic KPI Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Attendance (Emerald Brilliance) */}
        <div className="p-5 rounded-2xl student-card-glass border-t-4 border-emerald-500 space-y-2 hover:-translate-y-0.5 transition-transform">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span className="font-semibold text-slate-700 dark:text-slate-300">Verified Attendance</span>
            <span className="p-2 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 shadow-sm">
              <CheckCircle2 className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <p className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white tabular-nums">
              {currentStudent.attendanceRate}%
            </p>
            <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">Above 85% Target</span>
          </div>
          <div className="w-full h-2 bg-emerald-100 dark:bg-emerald-950/60 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all"
              style={{ width: `${currentStudent.attendanceRate}%` }}
            />
          </div>
          <p className="text-[10px] text-slate-400">Parent & School certified records</p>
        </div>

        {/* Pending Assignments (Electric Cyan / Sky) */}
        <div className="p-5 rounded-2xl student-card-glass border-t-4 border-sky-500 space-y-2 hover:-translate-y-0.5 transition-transform">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span className="font-semibold text-slate-700 dark:text-slate-300">Pending Tasks</span>
            <span className="p-2 rounded-xl bg-sky-500/15 text-sky-600 dark:text-sky-400 shadow-sm">
              <FileText className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <p className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white tabular-nums">
              {pendingAssignments.length}
            </p>
            <span className="text-[11px] text-sky-600 dark:text-sky-400 font-semibold">Active tasks</span>
          </div>
          <div className="w-full h-2 bg-sky-100 dark:bg-sky-950/60 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-sky-500 to-indigo-500 rounded-full transition-all"
              style={{ width: `${Math.max(10, 100 - pendingAssignments.length * 20)}%` }}
            />
          </div>
          <p className="text-[10px] text-slate-400">Next due: Quadratic Equations</p>
        </div>

        {/* Upcoming Exams (Golden Amber Sunburst) */}
        <div className="p-5 rounded-2xl student-card-glass border-t-4 border-amber-500 space-y-2 hover:-translate-y-0.5 transition-transform">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span className="font-semibold text-slate-700 dark:text-slate-300">Upcoming Exams</span>
            <span className="p-2 rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400 shadow-sm">
              <Calendar className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <p className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white tabular-nums">
              2
            </p>
            <span className="text-[11px] text-amber-600 dark:text-amber-400 font-semibold">Term 1 Series</span>
          </div>
          <div className="w-full h-2 bg-amber-100 dark:bg-amber-950/60 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-amber-500 to-orange-400 rounded-full w-3/4" />
          </div>
          <p className="text-[10px] text-slate-400">Begins in 21 days (Syllabus locked)</p>
        </div>

        {/* Average Score (Radiant Purple / Ruby) */}
        <div className="p-5 rounded-2xl student-card-glass border-t-4 border-purple-500 space-y-2 hover:-translate-y-0.5 transition-transform">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span className="font-semibold text-slate-700 dark:text-slate-300">Academic Score</span>
            <span className="p-2 rounded-xl bg-purple-500/15 text-purple-600 dark:text-purple-400 shadow-sm">
              <TrendingUp className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <p className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white tabular-nums">
              {avgScore}%
            </p>
            <span className="text-[11px] text-purple-600 dark:text-purple-400 font-bold">Grade A+ (Rank #2)</span>
          </div>
          <div className="w-full h-2 bg-purple-100 dark:bg-purple-950/60 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all"
              style={{ width: `${avgScore}%` }}
            />
          </div>
          <p className="text-[10px] text-slate-400">Continuous Assessment Distinction</p>
        </div>
      </div>

      {/* Official Parent & Guardian Assurance Card (Parents Love This Clear, High-Status Reassurance!) */}
      <div className="p-6 rounded-3xl student-card-glass border border-indigo-200/60 dark:border-indigo-900/40 shadow-xl bg-gradient-to-r from-white/95 via-indigo-50/40 to-purple-50/30 dark:from-slate-900/90 dark:via-indigo-950/40 dark:to-slate-900/90 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-md">
              <ShieldCheck className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
                  Parent & Guardian Oversight Assurance
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
                  Verified Active
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                All academic records, daily attendance, discipline logs, and term grade cards are synchronized with guardians in real time.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsReportOpen(true)}
              className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-sm flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Official Report Card (PDF)</span>
            </button>
            <button
              onClick={() => onNavigate('/student/communication')}
              className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              <HeartHandshake className="w-3.5 h-3.5 text-indigo-500" />
              <span>Contact Teachers</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-1 border-t border-slate-200/60 dark:border-slate-800/60 text-xs">
          <div className="p-2.5 rounded-xl bg-white/70 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
            <span className="text-[10px] text-slate-400 block font-medium">Guardian Registered</span>
            <strong className="text-slate-800 dark:text-slate-200 text-xs mt-0.5 block">
              {activeStudent.parentName || 'Mrs. & Mr. Sharma'}
            </strong>
          </div>
          <div className="p-2.5 rounded-xl bg-white/70 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
            <span className="text-[10px] text-slate-400 block font-medium">SMS & Email Alerts</span>
            <strong className="text-slate-800 dark:text-slate-200 text-xs mt-0.5 block flex items-center gap-1">
              <Phone className="w-3 h-3 text-emerald-500" />
              <span>{activeStudent.phone || '+91 98765 43210'}</span>
            </strong>
          </div>
          <div className="p-2.5 rounded-xl bg-white/70 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
            <span className="text-[10px] text-slate-400 block font-medium">Fee Clearance</span>
            <strong className="text-emerald-600 dark:text-emerald-400 text-xs mt-0.5 block flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              <span>All Dues Cleared (Term 1)</span>
            </strong>
          </div>
          <div className="p-2.5 rounded-xl bg-white/70 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
            <span className="text-[10px] text-slate-400 block font-medium">Disciplinary Standing</span>
            <strong className="text-indigo-600 dark:text-indigo-400 text-xs mt-0.5 block">
              Exemplary Conduct (Grade A)
            </strong>
          </div>
        </div>
      </div>

      {/* Interactive Student Power-Up Station: Daily Quests & Brain Teaser */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Daily Scholar Quests */}
        <div className="lg:col-span-7 p-6 rounded-3xl student-card-glass border-t-4 border-indigo-500 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-indigo-500/15 text-indigo-600 dark:text-indigo-400">
                <Zap className="w-5 h-5" />
              </span>
              <div>
                <h3 className="font-display font-extrabold text-base text-slate-900 dark:text-white">
                  Today's Scholar Quests
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Earn XP, unlock achievements, and power up your academic streak
                </p>
              </div>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/50">
              {quests.filter((q) => q.done).length} / {quests.length} Completed
            </span>
          </div>

          <div className="space-y-2.5">
            {quests.map((q) => (
              <div
                key={q.id}
                className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                  q.done
                    ? 'bg-emerald-50/60 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900/50'
                    : 'bg-white/70 dark:bg-slate-800/60 border-slate-200/60 dark:border-slate-700/60 hover:border-indigo-300'
                }`}
              >
                <div
                  onClick={() => toggleQuest(q.id)}
                  className="flex items-center gap-3 cursor-pointer select-none flex-1"
                >
                  <button className="text-indigo-600 dark:text-indigo-400">
                    {q.done ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    ) : (
                      <div className="w-5 h-5 rounded-md border-2 border-slate-300 dark:border-slate-600 hover:border-indigo-500" />
                    )}
                  </button>
                  <span
                    className={`text-xs font-semibold ${
                      q.done
                        ? 'line-through text-slate-400 dark:text-slate-500'
                        : 'text-slate-800 dark:text-slate-100'
                    }`}
                  >
                    {q.title}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300">
                    +{q.xp} XP
                  </span>
                  <button
                    onClick={() => onNavigate(q.path)}
                    className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:text-indigo-600 text-xs font-medium cursor-pointer"
                    title="Open task"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Brain Teaser & Quick Launchpad */}
        <div className="lg:col-span-5 p-6 rounded-3xl student-card-glass border-t-4 border-fuchsia-500 shadow-xl space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-fuchsia-500/15 text-fuchsia-600 dark:text-fuchsia-400">
                  <Lightbulb className="w-5 h-5" />
                </span>
                <h3 className="font-display font-extrabold text-base text-slate-900 dark:text-white">
                  Brain Teaser of the Day
                </h3>
              </div>
              <button
                onClick={() => {
                  setShowRiddleAnswer(false);
                  setRiddleIdx((prev) => (prev + 1) % STUDENT_RIDDLES.length);
                }}
                className="text-[11px] font-bold text-fuchsia-600 dark:text-fuchsia-400 hover:underline cursor-pointer"
              >
                Next Riddle →
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-gradient-to-r from-fuchsia-500/10 via-purple-500/10 to-indigo-500/10 border border-fuchsia-200/50 dark:border-fuchsia-900/40 space-y-2.5">
              <p className="text-xs font-medium text-slate-800 dark:text-slate-100 italic leading-relaxed">
                "{STUDENT_RIDDLES[riddleIdx].question}"
              </p>

              {showRiddleAnswer ? (
                <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-800 dark:text-emerald-200 text-xs font-bold animate-in fade-in duration-200">
                  {STUDENT_RIDDLES[riddleIdx].answer}
                </div>
              ) : (
                <button
                  onClick={() => setShowRiddleAnswer(true)}
                  className="px-3 py-1.5 bg-fuchsia-600 hover:bg-fuchsia-500 text-white rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer"
                >
                  Reveal Answer ✨
                </button>
              )}
            </div>
          </div>

          {/* Quick Launchpad Buttons */}
          <div className="space-y-2 pt-2 border-t border-slate-200/60 dark:border-slate-800/60">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Quick Student Launchpad
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => onNavigate('/student/materials')}
                className="p-2.5 rounded-xl bg-white/70 dark:bg-slate-800/60 hover:bg-indigo-50 dark:hover:bg-slate-700/60 border border-slate-200/60 dark:border-slate-700/60 text-xs font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2 transition-all cursor-pointer shadow-xs"
              >
                <BookOpen className="w-4 h-4 text-emerald-500" />
                <span>Repository</span>
              </button>
              <button
                onClick={() => onNavigate('/student/timetable')}
                className="p-2.5 rounded-xl bg-white/70 dark:bg-slate-800/60 hover:bg-indigo-50 dark:hover:bg-slate-700/60 border border-slate-200/60 dark:border-slate-700/60 text-xs font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2 transition-all cursor-pointer shadow-xs"
              >
                <Clock className="w-4 h-4 text-sky-500" />
                <span>Class Slots</span>
              </button>
              <button
                onClick={() => onNavigate('/student/communication')}
                className="p-2.5 rounded-xl bg-white/70 dark:bg-slate-800/60 hover:bg-indigo-50 dark:hover:bg-slate-700/60 border border-slate-200/60 dark:border-slate-700/60 text-xs font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2 transition-all cursor-pointer shadow-xs"
              >
                <HeartHandshake className="w-4 h-4 text-rose-500" />
                <span>Ask Teacher</span>
              </button>
              <button
                onClick={() => onNavigate('/student/announcements')}
                className="p-2.5 rounded-xl bg-white/70 dark:bg-slate-800/60 hover:bg-indigo-50 dark:hover:bg-slate-700/60 border border-slate-200/60 dark:border-slate-700/60 text-xs font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2 transition-all cursor-pointer shadow-xs"
              >
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Circulars</span>
              </button>
            </div>
          </div>
        </div>
      </div>


      {/* Main Grid: Schedule + Subject Marks Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Today's Timetable */}
        <div className="lg:col-span-7 p-6 rounded-3xl student-card-glass space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-sky-600 dark:text-sky-400" />
              <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
                Today's Daily Schedule (Monday)
              </h3>
            </div>
            <button
              onClick={() => onNavigate('/student/timetable')}
              className="text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline cursor-pointer"
            >
              Full Weekly Grid
            </button>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {todaySlots.map((slot) => (
              <div
                key={slot.id}
                className="py-3 flex items-center justify-between gap-4 hover:bg-slate-50/70 dark:hover:bg-slate-800/50 rounded-xl px-2.5 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-50 to-sky-100 dark:from-slate-800 dark:to-indigo-950 flex items-center justify-center text-xs font-bold text-indigo-700 dark:text-indigo-300 shadow-xs border border-indigo-200/40 dark:border-indigo-800/40">
                    P{slot.period}
                  </span>
                  <div>
                    <h4 className="text-xs font-semibold text-slate-900 dark:text-white">
                      {slot.subject}
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      {slot.teacherName} · {slot.room}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono text-slate-600 dark:text-slate-300 tabular-nums">
                    {slot.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Academic Performance Chart */}
        <div className="lg:col-span-5 p-6 rounded-3xl student-card-glass space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
                Subject Mastery
              </h3>
            </div>
            <button
              onClick={() => onNavigate('/student/academics')}
              className="text-xs font-semibold text-purple-600 dark:text-purple-400 hover:underline cursor-pointer"
            >
              Report Details
            </button>
          </div>

          <div className="space-y-3 pt-1">
            {studentMarks.slice(0, 5).map((m) => (
              <div key={m.id} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-slate-700 dark:text-slate-300">{m.subject}</span>
                  <span className="font-mono font-semibold text-slate-900 dark:text-white tabular-nums">
                    {m.total} / 100 ({m.grade})
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all bg-gradient-to-r from-indigo-500 to-purple-500"
                    style={{ width: `${m.total}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row: Upcoming Events & School Notices */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Events */}
        <div className="p-6 rounded-3xl student-card-glass space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-sky-600 dark:text-sky-400" />
              <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
                Upcoming School Events
              </h3>
            </div>
            <button
              onClick={() => onNavigate('/student/calendar')}
              className="text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline cursor-pointer"
            >
              Full Calendar
            </button>
          </div>

          <div className="space-y-3">
            {events.slice(0, 3).map((evt) => (
              <div
                key={evt.id}
                className="p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800/80 bg-white/60 dark:bg-slate-800/40 flex items-start justify-between gap-4"
              >
                <div>
                  <span className="text-[10px] font-semibold text-sky-600 dark:text-sky-400 uppercase">
                    {evt.category}
                  </span>
                  <h4 className="text-xs font-semibold text-slate-900 dark:text-white mt-0.5">
                    {evt.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{evt.venue}</p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xs font-medium text-slate-700 dark:text-slate-300 block">
                    {evt.date}
                  </span>
                  <span className="text-[10px] text-slate-400">{evt.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notices */}
        <div className="p-6 rounded-3xl student-card-glass space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-sky-600 dark:text-sky-400" />
              <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
                Latest Announcements
              </h3>
            </div>
            <button
              onClick={() => onNavigate('/student/announcements')}
              className="text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline cursor-pointer"
            >
              View All Notices
            </button>
          </div>

          <div className="space-y-3">
            {announcements.slice(0, 3).map((ann) => (
              <div
                key={ann.id}
                className="p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 space-y-1"
              >
                <div className="flex items-center justify-between text-[10px]">
                  <span className="font-semibold text-sky-600 dark:text-sky-400">{ann.category}</span>
                  <span className="text-slate-400">{ann.date}</span>
                </div>
                <h4 className="text-xs font-semibold text-slate-900 dark:text-white">
                  {ann.title}
                </h4>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 line-clamp-2">
                  {ann.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Official Report Card Modal */}
      <ReportCardModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        student={currentStudent}
        marks={marks}
      />
    </div>
  );
};
