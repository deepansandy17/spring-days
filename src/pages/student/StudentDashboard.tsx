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
  ChevronRight
} from 'lucide-react';
import { ReportCardModal } from '../../components/common/ReportCardModal';

interface StudentDashboardProps {
  onNavigate: (path: string) => void;
}

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

  const activeStudent =
    currentUser && currentUser.role === 'student' ? (currentUser as any) : currentStudent;

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

      {/* Welcome Banner */}
      <div className="rounded-2xl p-6 sm:p-8 bg-gradient-to-r from-sky-900 via-slate-900 to-indigo-950 text-white relative overflow-hidden shadow-lg border border-sky-800/40">
        <div className="relative z-10 max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-white/10 text-xs font-medium text-sky-200">
            <span>Grade {activeStudent.class}-{activeStudent.section}</span>
            <span>·</span>
            <span>Roll #{activeStudent.rollNo}</span>
            <span>·</span>
            <span>Academic Term 1</span>
          </div>
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-white">
            Good Morning, {activeStudent.name} 👋
          </h1>
          <p className="text-xs sm:text-sm text-sky-200/90 leading-relaxed">
            Welcome to your CPS SmartHub. You have {pendingAssignments.length} pending assignment{pendingAssignments.length === 1 ? '' : 's'} and your next class begins at 09:00 AM in Room 304.
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => onNavigate('/student/assignments')}
              className="px-4 py-2 bg-sky-500 hover:bg-sky-400 text-white rounded-lg text-xs font-semibold shadow-md transition-all flex items-center gap-1.5"
            >
              <span>View Assignments</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setIsReportOpen(true)}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 border border-white/20"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Report Card</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Animated KPI Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Attendance */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span className="font-medium">Attendance Rate</span>
            <span className="p-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600">
              <CheckCircle2 className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <p className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white tabular-nums">
              {currentStudent.attendanceRate}%
            </p>
            <span className="text-[11px] text-emerald-600 font-semibold">Above 85% Target</span>
          </div>
          <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all"
              style={{ width: `${currentStudent.attendanceRate}%` }}
            />
          </div>
        </div>

        {/* Pending Assignments */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span className="font-medium">Pending Tasks</span>
            <span className="p-1.5 rounded-lg bg-sky-50 dark:bg-sky-950/40 text-sky-600">
              <FileText className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <p className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white tabular-nums">
              {pendingAssignments.length}
            </p>
            <span className="text-[11px] text-sky-600 font-medium">Due this week</span>
          </div>
          <p className="text-[11px] text-slate-400">Next due: Quadratic Equations</p>
        </div>

        {/* Upcoming Exams */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span className="font-medium">Upcoming Exams</span>
            <span className="p-1.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-600">
              <Calendar className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <p className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white tabular-nums">
              2
            </p>
            <span className="text-[11px] text-amber-600 font-medium">Term 1 Series</span>
          </div>
          <p className="text-[11px] text-slate-400">Starts Nov 3, 2026</p>
        </div>

        {/* Average Score */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span className="font-medium">Academic Average</span>
            <span className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600">
              <TrendingUp className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <p className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white tabular-nums">
              {avgScore}%
            </p>
            <span className="text-[11px] text-indigo-600 font-semibold">Grade A+ (Rank #2)</span>
          </div>
          <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${avgScore}%` }} />
          </div>
        </div>
      </div>

      {/* Main Grid: Schedule + Subject Marks Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Today's Timetable */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-sky-600 dark:text-sky-400" />
              <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
                Today's Daily Schedule (Monday)
              </h3>
            </div>
            <button
              onClick={() => onNavigate('/student/timetable')}
              className="text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline"
            >
              Full Weekly Grid
            </button>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {todaySlots.map((slot) => (
              <div
                key={slot.id}
                className="py-3 flex items-center justify-between gap-4 hover:bg-slate-50/50 dark:hover:bg-slate-800/40 rounded-lg px-2 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-700 dark:text-slate-300">
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
        <div className="lg:col-span-5 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-sky-600 dark:text-sky-400" />
              <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
                Subject Mastery
              </h3>
            </div>
            <button
              onClick={() => onNavigate('/student/academics')}
              className="text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline"
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
                    className="h-full rounded-full transition-all bg-sky-500"
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
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-sky-600 dark:text-sky-400" />
              <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
                Upcoming School Events
              </h3>
            </div>
            <button
              onClick={() => onNavigate('/student/calendar')}
              className="text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline"
            >
              Full Calendar
            </button>
          </div>

          <div className="space-y-3">
            {events.slice(0, 3).map((evt) => (
              <div
                key={evt.id}
                className="p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex items-start justify-between gap-4"
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
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-sky-600 dark:text-sky-400" />
              <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
                Latest Announcements
              </h3>
            </div>
            <button
              onClick={() => onNavigate('/student/announcements')}
              className="text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline"
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
