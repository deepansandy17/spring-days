import React from 'react';
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
  AlertCircle
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

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="rounded-2xl p-6 sm:p-8 bg-gradient-to-r from-blue-900 via-slate-900 to-indigo-950 text-white relative overflow-hidden shadow-lg border border-blue-800/40">
        <div className="relative z-10 max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-white/10 text-xs font-medium text-sky-200">
            <span>{currentTeacher.department}</span>
            <span>·</span>
            <span>Class Teacher: Grade 10-A</span>
            <span>·</span>
            <span>Employee #{currentTeacher.employeeId}</span>
          </div>
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-white">
            Welcome, {currentTeacher.name} 🎓
          </h1>
          <p className="text-xs sm:text-sm text-sky-200/90 leading-relaxed">
            You have {todayClasses.length} instructional periods scheduled today. There are{' '}
            {pendingSubmissions.length} student submission{pendingSubmissions.length === 1 ? '' : 's'} waiting for your grading.
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => onNavigate('/teacher/attendance')}
              className="px-4 py-2 bg-sky-500 hover:bg-sky-400 text-white rounded-lg text-xs font-semibold shadow-md transition-all flex items-center gap-1.5"
            >
              <CheckSquare className="w-3.5 h-3.5" />
              <span>Take Today's Attendance</span>
            </button>
            <button
              onClick={() => onNavigate('/teacher/gradebook')}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 border border-white/20"
            >
              <Award className="w-3.5 h-3.5" />
              <span>Enter Exam Marks</span>
            </button>
            <button
              onClick={() => onNavigate('/teacher/assignments')}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 border border-white/20"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create Assignment</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-medium">Total Students</span>
            <span className="p-1.5 rounded-lg bg-sky-50 dark:bg-sky-950 text-sky-600">
              <Users className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <p className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white tabular-nums">
              {assignedStudents.length}
            </p>
            <span className="text-[11px] text-slate-400">Grades 10A & 10B</span>
          </div>
          <p className="text-[11px] text-slate-400">Class Teacher: 10-A (36 students)</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-medium">Classes Today</span>
            <span className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600">
              <Clock className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <p className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white tabular-nums">
              {todayClasses.length}
            </p>
            <span className="text-[11px] text-indigo-600 font-semibold">Periods</span>
          </div>
          <p className="text-[11px] text-slate-400">Next: 09:00 AM (Room 304)</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-medium">Pending Reviews</span>
            <span className="p-1.5 rounded-lg bg-amber-50 dark:bg-amber-950 text-amber-600">
              <FileText className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <p className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white tabular-nums">
              {pendingSubmissions.length}
            </p>
            <span className="text-[11px] text-amber-600 font-medium">Submissions</span>
          </div>
          <p className="text-[11px] text-slate-400">Awaiting grade & comments</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-medium">Today's Attendance</span>
            <span className={`p-1.5 rounded-lg ${isAttendanceMarkedToday ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-600' : 'bg-rose-50 dark:bg-rose-950 text-rose-600'}`}>
              <CheckSquare className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <p className="font-display font-extrabold text-lg sm:text-xl text-slate-900 dark:text-white">
              {isAttendanceMarkedToday ? 'Submitted' : 'Pending'}
            </p>
          </div>
          <p className="text-[11px] text-slate-400">Class 10-A Morning Roll Call</p>
        </div>
      </div>

      {/* Main Grid: Today's Schedule & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Today's Teaching Schedule */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-sky-600 dark:text-sky-400" />
              <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
                Today's Teaching Schedule (Monday)
              </h3>
            </div>
            <button
              onClick={() => onNavigate('/teacher/timetable')}
              className="text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline"
            >
              Full Schedule
            </button>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {todayClasses.map((cls) => (
              <div
                key={cls.id}
                className="py-3 flex items-center justify-between gap-4 hover:bg-slate-50/50 dark:hover:bg-slate-800/40 rounded-lg px-2"
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs font-bold">
                    P{cls.period}
                  </span>
                  <div>
                    <h4 className="text-xs font-semibold text-slate-900 dark:text-white">
                      {cls.subject} — Grade {cls.class}-{cls.section}
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Location: {cls.room}
                    </p>
                  </div>
                </div>
                <span className="text-xs font-mono text-slate-600 dark:text-slate-300 tabular-nums">
                  {cls.time}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Submissions to Review */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-sky-600 dark:text-sky-400" />
              <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
                Submissions to Grade
              </h3>
            </div>
            <button
              onClick={() => onNavigate('/teacher/assignments')}
              className="text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline"
            >
              Assignments Desk
            </button>
          </div>

          <div className="space-y-3">
            {pendingSubmissions.length === 0 ? (
              <div className="text-center py-10 text-slate-400 text-xs">
                No submissions waiting for review. All evaluated!
              </div>
            ) : (
              pendingSubmissions.map((sub) => {
                const asg = assignments.find((a) => a.id === sub.assignmentId);
                return (
                  <div
                    key={sub.id}
                    className="p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-xs text-slate-900 dark:text-white">
                        {sub.studentName}
                      </span>
                      <span className="text-[10px] text-slate-400">{sub.submittedAt}</span>
                    </div>
                    <p className="text-[11px] text-sky-600 dark:text-sky-400 font-medium">
                      {asg?.title || 'Assignment'}
                    </p>
                    <p className="text-[11px] text-slate-500 line-clamp-1 italic">"{sub.content}"</p>
                    <button
                      onClick={() => onNavigate('/teacher/assignments')}
                      className="text-[11px] font-semibold text-sky-600 dark:text-sky-400 hover:underline pt-1 block"
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
    </div>
  );
};
