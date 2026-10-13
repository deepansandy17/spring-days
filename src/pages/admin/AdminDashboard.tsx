import React from 'react';
import { useSchool } from '../../context/SchoolContext';
import {
  Users,
  GraduationCap,
  Layers,
  CheckSquare,
  DollarSign,
  FileText,
  TrendingUp,
  UserPlus,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Bell,
  BookOpen,
  Sparkles
} from 'lucide-react';

interface AdminDashboardProps {
  onNavigate: (path: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigate }) => {
  const {
    students,
    teachers,
    attendance,
    fees,
    admissions,
    leaves,
    announcements,
    setAdminInspectionMode
  } = useSchool();

  // Metrics
  const totalStudents = students.length; // ~500
  const totalTeachers = teachers.length; // 30
  const totalClasses = 14;

  const totalFeeDue = fees.reduce((sum, f) => sum + f.amountDue, 0);
  const totalFeePaid = fees.reduce((sum, f) => sum + f.amountPaid, 0);
  const feeCollectionRate = totalFeeDue > 0 ? ((totalFeePaid / totalFeeDue) * 100).toFixed(1) : '86.4';

  const pendingLeaves = leaves.filter((l) => l.status === 'pending');
  const newAdmissions = admissions.filter((a) => a.status === 'new');

  // Distribution data
  const classDistribution = [
    { grade: 'Grade 6', count: 72, pct: 14.4 },
    { grade: 'Grade 7', count: 72, pct: 14.4 },
    { grade: 'Grade 8', count: 72, pct: 14.4 },
    { grade: 'Grade 9', count: 72, pct: 14.4 },
    { grade: 'Grade 10', count: 71, pct: 14.2 },
    { grade: 'Grade 11', count: 71, pct: 14.2 },
    { grade: 'Grade 12', count: 70, pct: 14.0 }
  ];

  const weeklyAttendanceTrend = [
    { day: 'Mon', rate: 95.2 },
    { day: 'Tue', rate: 94.8 },
    { day: 'Wed', rate: 93.6 },
    { day: 'Thu', rate: 94.9 },
    { day: 'Fri', rate: 92.4 }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="rounded-2xl p-6 sm:p-8 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white relative overflow-hidden shadow-lg border border-indigo-900/50">
        <div className="relative z-10 max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-white/10 text-xs font-medium text-indigo-200">
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
            <span>Chennai Public School Administrative Control Center</span>
          </div>
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-white">
            Administrative ERP Overview
          </h1>
          <p className="text-xs sm:text-sm text-indigo-200/90 leading-relaxed">
            School operations running nominal. As School Admin Staff, you have full institutional clearance to inspect the IDs, credentials, and dossiers of all <strong>500 students</strong> and <strong>30 faculty teachers</strong>, supervise both portals, and onboard new members.
          </p>
          <div className="pt-2 flex flex-wrap gap-2.5">
            <button
              onClick={() => onNavigate('/admin/students')}
              className="px-3.5 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-lg text-xs font-semibold shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Users className="w-3.5 h-3.5" />
              <span>Inspect All 500 Students & IDs</span>
            </button>
            <button
              onClick={() => onNavigate('/admin/teachers')}
              className="px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Inspect All 30 Teachers & IDs</span>
            </button>
            <button
              onClick={() => {
                setAdminInspectionMode('teacher');
                onNavigate('/teacher/dashboard');
              }}
              className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 border border-white/20 cursor-pointer"
              title="Admin right to supervise Teacher Portal"
            >
              <BookOpen className="w-3.5 h-3.5 text-blue-300" />
              <span>Supervise Teacher Portal</span>
            </button>
            <button
              onClick={() => {
                setAdminInspectionMode('student');
                onNavigate('/student/dashboard');
              }}
              className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 border border-white/20 cursor-pointer"
              title="Admin right to supervise Student Portal"
            >
              <Users className="w-3.5 h-3.5 text-sky-300" />
              <span>Supervise Student Portal</span>
            </button>
          </div>
        </div>
      </div>

      {/* 6 Metric KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <button
          onClick={() => onNavigate('/admin/students')}
          className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-1 text-left hover:border-sky-500 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-slate-500 group-hover:text-sky-600 font-medium">All Students</span>
            <Users className="w-3.5 h-3.5 text-sky-500" />
          </div>
          <p className="font-display font-extrabold text-2xl text-slate-900 dark:text-white tabular-nums">
            {totalStudents}
          </p>
          <span className="text-[10px] text-emerald-600 font-semibold">Admin: Full 500 IDs</span>
        </button>

        <button
          onClick={() => onNavigate('/admin/teachers')}
          className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-1 text-left hover:border-blue-500 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-slate-500 group-hover:text-blue-600 font-medium">All Faculty</span>
            <GraduationCap className="w-3.5 h-3.5 text-blue-500" />
          </div>
          <p className="font-display font-extrabold text-2xl text-slate-900 dark:text-white tabular-nums">
            {totalTeachers}
          </p>
          <span className="text-[10px] text-sky-600 font-semibold">Admin: Full 30 IDs</span>
        </button>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
          <span className="text-[11px] text-slate-500 block">Active Sections</span>
          <p className="font-display font-extrabold text-2xl text-slate-900 dark:text-white tabular-nums">
            {totalClasses}
          </p>
          <span className="text-[10px] text-slate-400">Grades 6–12 (A & B)</span>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
          <span className="text-[11px] text-slate-500 block">School Attendance</span>
          <p className="font-display font-extrabold text-2xl text-emerald-600 dark:text-emerald-400 tabular-nums">
            94.6%
          </p>
          <span className="text-[10px] text-emerald-600 font-semibold">Above Target</span>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
          <span className="text-[11px] text-slate-500 block">Fee Collection</span>
          <p className="font-display font-extrabold text-2xl text-indigo-600 dark:text-indigo-400 tabular-nums">
            {feeCollectionRate}%
          </p>
          <span className="text-[10px] text-slate-400">Term 1 & 2 Dues</span>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
          <span className="text-[11px] text-slate-500 block">Pending Leaves</span>
          <p className="font-display font-extrabold text-2xl text-amber-600 dark:text-amber-400 tabular-nums">
            {pendingLeaves.length}
          </p>
          <button
            onClick={() => onNavigate('/admin/teachers')}
            className="text-[10px] text-sky-600 dark:text-sky-400 hover:underline font-semibold block"
          >
            Review Now →
          </button>
        </div>
      </div>

      {/* Main Grids: Cohort Distribution & Attendance Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Attendance Trends */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <CheckSquare className="w-4 h-4 text-sky-600 dark:text-sky-400" />
              <span>School Attendance Trend This Week</span>
            </h3>
            <span className="text-xs text-slate-400">500 Students Enrolled</span>
          </div>

          <div className="space-y-3 pt-2">
            {weeklyAttendanceTrend.map((item) => (
              <div key={item.day} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-slate-700 dark:text-slate-300 w-12">{item.day}</span>
                  <div className="flex-1 mx-3 h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full transition-all"
                      style={{ width: `${item.rate}%` }}
                    />
                  </div>
                  <span className="font-mono font-bold text-slate-900 dark:text-white tabular-nums w-12 text-right">
                    {item.rate}%
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
            <span>Average Daily Turnout: 473 students</span>
            <button
              onClick={() => onNavigate('/admin/attendance')}
              className="text-sky-600 dark:text-sky-400 font-semibold hover:underline"
            >
              Class-wise Breakdown →
            </button>
          </div>
        </div>

        {/* Student Grade Distribution */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>Class Strength Matrix</span>
            </h3>
            <span className="text-xs text-slate-400">Total: 500</span>
          </div>

          <div className="space-y-2 pt-1">
            {classDistribution.map((item) => (
              <div key={item.grade} className="flex items-center justify-between text-xs py-1">
                <span className="font-medium text-slate-700 dark:text-slate-300">{item.grade}</span>
                <span className="font-mono text-slate-500 tabular-nums">
                  {item.count} students ({item.pct}%)
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Newly Joined Students & Teachers Registry Widget */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-display font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Newly Joined Students & Teachers Registry</span>
            </h3>
            <p className="text-xs text-slate-500">
              Live directory of students and faculty onboarded to Chennai Public School SmartHub
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('/admin/students')}
              className="px-3 py-1.5 bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800 rounded-lg text-xs font-semibold hover:bg-sky-100 dark:hover:bg-sky-900 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Enroll Student</span>
            </button>
            <button
              onClick={() => onNavigate('/admin/teachers')}
              className="px-3 py-1.5 bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 rounded-lg text-xs font-semibold hover:bg-blue-100 dark:hover:bg-blue-900 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Appoint Teacher</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          {/* Recent Students */}
          <div className="space-y-2 border border-slate-100 dark:border-slate-800/80 rounded-xl p-3 bg-slate-50/50 dark:bg-slate-800/30">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Enrolled Students Registry
            </span>
            {students.slice(0, 3).map((stu) => (
              <div
                key={stu.id}
                className="flex items-center justify-between text-xs p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/60"
              >
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-slate-900 dark:text-white">{stu.name}</span>
                    {stu.isNewlyJoined && (
                      <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 font-bold uppercase">
                        New
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-400">
                    Grade {stu.class}-{stu.section} · ID: <strong className="text-slate-700 dark:text-slate-300 font-mono">{stu.studentId}</strong>
                    {stu.password && (
                      <span className="ml-1 text-sky-600 dark:text-sky-400 font-mono">
                        (Pass: {stu.password})
                      </span>
                    )}
                  </span>
                </div>
                <button
                  onClick={() => onNavigate('/admin/students')}
                  className="text-[11px] text-sky-600 dark:text-sky-400 font-semibold hover:underline cursor-pointer"
                >
                  View Details →
                </button>
              </div>
            ))}
          </div>

          {/* Recent Teachers */}
          <div className="space-y-2 border border-slate-100 dark:border-slate-800/80 rounded-xl p-3 bg-slate-50/50 dark:bg-slate-800/30">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Instructional Faculty Registry
            </span>
            {teachers.slice(0, 3).map((t) => (
              <div
                key={t.id}
                className="flex items-center justify-between text-xs p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/60"
              >
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-slate-900 dark:text-white">{t.name}</span>
                    {t.isNewlyJoined && (
                      <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 font-bold uppercase">
                        New
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-400">
                    {t.department} · ID: <strong className="text-slate-700 dark:text-slate-300 font-mono">{t.employeeId}</strong>
                    {t.password && (
                      <span className="ml-1 text-blue-600 dark:text-blue-400 font-mono">
                        (Pass: {t.password})
                      </span>
                    )}
                  </span>
                </div>
                <button
                  onClick={() => onNavigate('/admin/teachers')}
                  className="text-[11px] text-sky-600 dark:text-sky-400 font-semibold hover:underline cursor-pointer"
                >
                  View Details →
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Desk: Admissions Inquiries & Leave Review Alerts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pending Teacher Leaves */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <Calendar className="w-4 h-4 text-amber-600" />
              <span>Pending Teacher Leave Applications</span>
            </h3>
            <button
              onClick={() => onNavigate('/admin/teachers')}
              className="text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline"
            >
              Review Desk
            </button>
          </div>

          <div className="space-y-3">
            {pendingLeaves.length === 0 ? (
              <p className="text-xs text-slate-400 py-6 text-center">No pending leave requests.</p>
            ) : (
              pendingLeaves.map((l) => (
                <div
                  key={l.id}
                  className="p-3.5 rounded-xl border border-amber-200 dark:border-amber-900/60 bg-amber-50/40 dark:bg-amber-950/20 space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <strong className="text-xs text-slate-900 dark:text-white">{l.teacherName}</strong>
                    <span className="text-[10px] text-amber-700 dark:text-amber-300 font-bold uppercase">
                      {l.leaveType} ({l.days} days)
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-1 italic">
                    "{l.reason}"
                  </p>
                  <div className="flex items-center justify-between text-[11px] pt-1">
                    <span className="text-slate-400">Starting: {l.startDate}</span>
                    <button
                      onClick={() => onNavigate('/admin/teachers')}
                      className="font-semibold text-sky-600 dark:text-sky-400 hover:underline"
                    >
                      Process Leave →
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* New Admissions Enquiries */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <UserPlus className="w-4 h-4 text-sky-600 dark:text-sky-400" />
              <span>Recent Admission Inquiries</span>
            </h3>
            <button
              onClick={() => onNavigate('/admin/admissions')}
              className="text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline"
            >
              All Inquiries
            </button>
          </div>

          <div className="space-y-3">
            {admissions.slice(0, 3).map((adm) => (
              <div
                key={adm.id}
                className="p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <strong className="text-xs text-slate-900 dark:text-white">{adm.applicantName}</strong>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize bg-sky-50 dark:bg-sky-950 text-sky-700 dark:text-sky-300">
                    {adm.status.replace('_', ' ')}
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  Applying for {adm.appliedClass} · Parent: {adm.parentName}
                </p>
                <div className="flex items-center justify-between text-[11px] pt-1 text-slate-400">
                  <span>Contact: {adm.parentPhone}</span>
                  <button
                    onClick={() => onNavigate('/admin/admissions')}
                    className="font-semibold text-sky-600 dark:text-sky-400 hover:underline"
                  >
                    Review Application →
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
