import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import {
  Users,
  CheckSquare,
  Award,
  FileText,
  Clock,
  Plus,
  ArrowRight,
  TrendingUp,
  Calendar,
  AlertCircle,
  Briefcase,
  BookOpen,
  CheckCircle2,
  Bookmark,
  ChevronRight,
  Sparkles,
  ShieldCheck,
  Compass,
  GraduationCap
} from 'lucide-react';

interface TeacherDashboardProps {
  onNavigate: (path: string) => void;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ onNavigate }) => {
  const { currentTeacher, students, timetable, assignments, submissions, attendance } = useSchool();

  // Stats
  const assignedStudents = students.filter(
    (s) => s.class === '10' && (s.section === 'A' || s.section === 'B')
  );

  const teacherAssignments = assignments.filter((a) => a.teacherId === currentTeacher.id);
  const teacherAsgIds = new Set(teacherAssignments.map((a) => a.id));
  const pendingSubmissions = submissions.filter(
    (s) => teacherAsgIds.has(s.assignmentId) && s.status === 'submitted'
  );

  // Today's schedule
  const todayClasses = timetable
    .filter((t) => t.teacherId === currentTeacher.id && t.day === 'Monday')
    .sort((a, b) => a.period - b.period);

  const isAttendanceMarkedToday = attendance.some(
    (a) => a.class === '10' && a.section === 'A' && a.date === '2026-10-10'
  );

  // Pastoral attention: Students with attendance < 85% or below 50% average
  const studentsNeedingAttention = assignedStudents.filter((s) => s.attendanceRate < 85);

  return (
    <div className="space-y-6">
      {/* 1. EXECUTIVE WELCOME BANNER */}
      <div className="rounded-2xl p-6 sm:p-8 bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white relative overflow-hidden shadow-lg border border-slate-700/80">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/10 text-xs font-mono text-slate-200 border border-white/15">
            <span className="font-semibold text-amber-300">FACULTY OF {currentTeacher.department.toUpperCase()}</span>
            <span>·</span>
            <span>Grade 10-A Class Coordinator</span>
            <span>·</span>
            <span>EMP #{currentTeacher.employeeId}</span>
          </div>

          <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
            Academic Desk — {currentTeacher.name}
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans max-w-2xl">
            You are scheduled for <strong className="text-white">{todayClasses.length} instructional periods</strong> today.
            There are <strong className="text-amber-300">{pendingSubmissions.length} student submission{pendingSubmissions.length === 1 ? '' : 's'}</strong> awaiting your faculty evaluation and commentary.
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => onNavigate('/teacher/attendance')}
              className="px-4 py-2 bg-slate-100 hover:bg-white text-slate-900 rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-1.5"
            >
              <CheckSquare className="w-3.5 h-3.5 text-blue-600" />
              <span>Take Today's Attendance</span>
            </button>
            <button
              onClick={() => onNavigate('/teacher/gradebook')}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 border border-white/20"
            >
              <Award className="w-3.5 h-3.5 text-amber-300" />
              <span>Official Gradebook</span>
            </button>
            <button
              onClick={() => onNavigate('/teacher/assignments')}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 border border-white/20"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Issue Assignment</span>
            </button>
            <button
              onClick={() => onNavigate('/teacher/lesson-planner')}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 border border-white/20"
            >
              <BookOpen className="w-3.5 h-3.5 text-emerald-300" />
              <span>Lesson Planner</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. EXECUTIVE KPI CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Students */}
        <div className="p-5 rounded-2xl teacher-card-executive space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-semibold uppercase tracking-wider text-[10px]">Registered Cohort</span>
            <span className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400">
              <Users className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <p className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white tabular-nums">
              {assignedStudents.length}
            </p>
            <span className="text-[11px] text-slate-500">Grades 10A & 10B</span>
          </div>
          <p className="text-[11px] text-slate-400">Section 10-A: 36 students</p>
        </div>

        {/* Classes Today */}
        <div className="p-5 rounded-2xl teacher-card-executive space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-semibold uppercase tracking-wider text-[10px]">Instructional Periods</span>
            <span className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400">
              <Clock className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <p className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white tabular-nums">
              {todayClasses.length}
            </p>
            <span className="text-[11px] text-indigo-600 dark:text-indigo-400 font-semibold">Periods Today</span>
          </div>
          <p className="text-[11px] text-slate-400">Next: 09:00 AM (Room 304)</p>
        </div>

        {/* Pending Reviews */}
        <div className="p-5 rounded-2xl teacher-card-executive space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-semibold uppercase tracking-wider text-[10px]">Pending Evaluation</span>
            <span className="p-1.5 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400">
              <FileText className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <p className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white tabular-nums">
              {pendingSubmissions.length}
            </p>
            <span className="text-[11px] text-amber-600 dark:text-amber-400 font-medium">Submissions</span>
          </div>
          <p className="text-[11px] text-slate-400">Awaiting marks & feedback</p>
        </div>

        {/* Attendance Status */}
        <div className="p-5 rounded-2xl teacher-card-executive space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-semibold uppercase tracking-wider text-[10px]">Morning Roll Call</span>
            <span
              className={`p-1.5 rounded-lg ${
                isAttendanceMarkedToday
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400'
                  : 'bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400'
              }`}
            >
              <CheckSquare className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <p className="font-display font-extrabold text-lg sm:text-xl text-slate-900 dark:text-white">
              {isAttendanceMarkedToday ? 'Submitted' : 'Pending'}
            </p>
          </div>
          <p className="text-[11px] text-slate-400">Class 10-A Morning Ledger</p>
        </div>
      </div>

      {/* 3. MAIN GRID: TODAY'S SCHEDULE & PENDING REVIEWS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Today's Teaching Schedule */}
        <div className="lg:col-span-7 p-6 rounded-2xl teacher-card-executive space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-slate-700 dark:text-slate-300" />
              <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
                Instructional Schedule (Monday)
              </h3>
            </div>
            <button
              onClick={() => onNavigate('/teacher/timetable')}
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              <span>Full Week Timetable</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {todayClasses.map((cls) => (
              <div
                key={cls.id}
                className="py-3.5 flex items-center justify-between gap-4 hover:bg-slate-50/70 dark:hover:bg-slate-800/40 rounded-xl px-2.5 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 flex items-center justify-center text-xs font-mono font-bold border border-slate-200 dark:border-slate-700">
                    P{cls.period}
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                      {cls.subject} — Grade {cls.class}-{cls.section}
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Assigned Room: <span className="font-semibold text-slate-700 dark:text-slate-300">{cls.room}</span>
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono font-semibold text-slate-800 dark:text-slate-200 tabular-nums">
                    {cls.time}
                  </span>
                  <span className="block text-[10px] text-slate-400">45 Mins</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Submissions to Review */}
        <div className="lg:col-span-5 p-6 rounded-2xl teacher-card-executive space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-slate-700 dark:text-slate-300" />
              <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
                Submissions to Grade
              </h3>
            </div>
            <button
              onClick={() => onNavigate('/teacher/assignments')}
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              <span>Assignments Desk</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {pendingSubmissions.length === 0 ? (
              <div className="text-center py-12 text-slate-400 text-xs space-y-1">
                <CheckCircle2 className="w-6 h-6 mx-auto text-emerald-500 mb-1" />
                <p className="font-semibold text-slate-700 dark:text-slate-300">All Assignments Evaluated</p>
                <p className="text-[11px]">There are no pending submissions in your queue.</p>
              </div>
            ) : (
              pendingSubmissions.map((sub) => {
                const asg = assignments.find((a) => a.id === sub.assignmentId);
                return (
                  <div
                    key={sub.id}
                    className="p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-xs text-slate-900 dark:text-white">
                        {sub.studentName}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">{sub.submittedAt}</span>
                    </div>
                    <p className="text-[11px] text-blue-700 dark:text-blue-400 font-semibold">
                      {asg?.title || 'Assignment'}
                    </p>
                    <p className="text-[11px] text-slate-500 line-clamp-1 italic">"{sub.content}"</p>
                    <button
                      onClick={() => onNavigate('/teacher/assignments')}
                      className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:underline pt-1 block"
                    >
                      Review & Assign Grade →
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* 4. ACADEMIC PACING & PASTORAL CARE MODULE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* CBSE Term 1 Syllabus Pacing */}
        <div className="lg:col-span-6 p-6 rounded-2xl teacher-card-executive space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white">
                CBSE Class 10 Mathematics — Term 1 Curriculum Pacing
              </h3>
            </div>
            <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded">
              88% Completed
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <div className="flex justify-between text-[11px] mb-1">
                <span className="text-slate-700 dark:text-slate-300 font-medium">Real Numbers & Polynomials</span>
                <span className="text-emerald-600 font-bold">100% Complete</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full w-full" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[11px] mb-1">
                <span className="text-slate-700 dark:text-slate-300 font-medium">Quadratic Equations & Arithmetic Progressions</span>
                <span className="text-emerald-600 font-bold">100% Complete</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full w-full" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[11px] mb-1">
                <span className="text-slate-700 dark:text-slate-300 font-medium">Triangles & Coordinate Geometry</span>
                <span className="text-blue-600 font-bold">75% (In Progress)</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-blue-600 h-full w-3/4" />
              </div>
            </div>
          </div>
        </div>

        {/* Pastoral Care Alert: Attendance Watchlist */}
        <div className="lg:col-span-6 p-6 rounded-2xl teacher-card-executive space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <h3 className="font-display font-bold text-sm text-slate-900 dark:text-white">
                Grade 10-A Pastoral Care & Attendance Watchlist
              </h3>
            </div>
            <span className="text-[11px] text-slate-400">CBSE 75% Mandatory</span>
          </div>

          <div className="space-y-2.5">
            {studentsNeedingAttention.slice(0, 3).map((stu) => (
              <div
                key={stu.id}
                className="p-3 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 flex items-center justify-between text-xs"
              >
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">{stu.name}</p>
                  <p className="text-[11px] text-slate-500">Roll #{stu.rollNo} · ID: {stu.studentId}</p>
                </div>
                <div className="text-right">
                  <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-300">
                    {stu.attendanceRate}% Attendance
                  </span>
                  <button
                    onClick={() => onNavigate('/teacher/communication')}
                    className="block text-[11px] text-blue-600 dark:text-blue-400 hover:underline mt-1"
                  >
                    Parent Notice →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
