import React from 'react';
import { useSchool } from '../../context/SchoolContext';
import { GraduationCap, BookOpen, ShieldCheck, Globe, Moon, Sun, Shield, LogOut } from 'lucide-react';

interface QuickRoleSwitcherProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const QuickRoleSwitcher: React.FC<QuickRoleSwitcherProps> = ({ currentPath, onNavigate }) => {
  const {
    currentUser,
    isAdminSession,
    setAdminInspectionMode,
    logout,
    darkMode,
    toggleDarkMode
  } = useSchool();

  // 1. PUBLIC VISITOR: Strictly hide any portal access/switcher!
  if (!currentUser) {
    return null;
  }

  // 2. LOGGED IN AS STUDENT (non-admin): Can ONLY see Student Portal. No teacher or admin buttons!
  if (currentUser.role === 'student' && !isAdminSession) {
    return (
      <div className="bg-slate-900 text-slate-100 text-xs border-b border-slate-800 px-4 py-2 sticky top-0 z-50 transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span className="font-semibold text-sky-400">CPS SmartHub</span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-300">
              Student Workspace: <strong className="text-white">{currentUser.name}</strong>
              <span className="text-slate-400 ml-1.5">(Grade {(currentUser as any).class || '10'}-{(currentUser as any).section || 'A'})</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleDarkMode}
              className="p-1.5 text-slate-400 hover:text-white rounded-md hover:bg-slate-800 transition-colors"
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => {
                logout();
                onNavigate('/login');
              }}
              className="inline-flex items-center gap-1 text-slate-400 hover:text-rose-400 transition-colors font-medium px-2 py-1"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 3. LOGGED IN AS TEACHER (non-admin): Can ONLY see Teacher Portal. No student or admin buttons!
  if (currentUser.role === 'teacher' && !isAdminSession) {
    return (
      <div className="bg-slate-900 text-slate-100 text-xs border-b border-slate-800 px-4 py-2 sticky top-0 z-50 transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-400"></span>
            <span className="font-semibold text-sky-400">CPS SmartHub</span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-300">
              Faculty Academic Console: <strong className="text-white">{currentUser.name}</strong>
              <span className="text-slate-400 ml-1.5">({(currentUser as any).department || 'Teacher'})</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleDarkMode}
              className="p-1.5 text-slate-400 hover:text-white rounded-md hover:bg-slate-800 transition-colors"
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => {
                logout();
                onNavigate('/login');
              }}
              className="inline-flex items-center gap-1 text-slate-400 hover:text-rose-400 transition-colors font-medium px-2 py-1"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 4. LOGGED IN AS ADMIN: Has full authorization to see & inspect BOTH Teacher and Student portals!
  return (
    <div className="bg-slate-900 text-slate-100 text-xs border-b border-slate-800 px-4 py-2 sticky top-0 z-50 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Left: Indicator */}
        <div className="flex items-center gap-2">
          <span className="font-semibold text-indigo-400 flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-indigo-400" />
            CPS Admin Authority
          </span>
          <span className="text-slate-600 hidden sm:inline">|</span>
          <span className="text-slate-300 hidden sm:inline">
            Active View: <strong className="text-white capitalize">{currentUser.role} Workspace</strong>
            {currentUser.role !== 'admin' && ' (Admin Inspection Mode)'}
          </span>
        </div>

        {/* Center: Admin Multi-Portal Inspection Switcher (Admin has rights to see both) */}
        <div className="flex items-center gap-1 bg-slate-800/90 p-0.5 rounded-lg border border-indigo-500/30">
          <button
            onClick={() => {
              setAdminInspectionMode('admin');
              onNavigate('/admin/dashboard');
            }}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-colors whitespace-nowrap ${
              currentPath.startsWith('/admin')
                ? 'bg-indigo-600 text-white font-medium shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-700'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Admin Control Center</span>
          </button>

          <button
            onClick={() => {
              setAdminInspectionMode('teacher');
              onNavigate('/teacher/dashboard');
            }}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-colors whitespace-nowrap ${
              currentPath.startsWith('/teacher')
                ? 'bg-blue-600 text-white font-medium shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-700'
            }`}
            title="Inspect Teacher Faculty Console"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Inspect Teacher Portal</span>
          </button>

          <button
            onClick={() => {
              setAdminInspectionMode('student');
              onNavigate('/student/dashboard');
            }}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-colors whitespace-nowrap ${
              currentPath.startsWith('/student')
                ? 'bg-sky-600 text-white font-medium shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-700'
            }`}
            title="Inspect Student Learning Hub"
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Inspect Student Portal</span>
          </button>

          <button
            onClick={() => {
              onNavigate('/');
            }}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-colors whitespace-nowrap ${
              currentPath === '/'
                ? 'bg-slate-700 text-white font-medium'
                : 'text-slate-300 hover:text-white hover:bg-slate-700'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Public Site</span>
          </button>
        </div>

        {/* Right: Theme Toggle & Logout */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleDarkMode}
            className="p-1.5 text-slate-300 hover:text-white rounded-md hover:bg-slate-800 transition-colors"
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            onClick={() => {
              logout();
              onNavigate('/login');
            }}
            className="text-slate-400 hover:text-rose-400 transition-colors px-2 py-1 flex items-center gap-1"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};
