import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { UserRole } from '../../types';
import { DEMO_CREDENTIALS } from '../../data/mockData';
import {
  School,
  GraduationCap,
  BookOpen,
  ShieldCheck,
  Eye,
  EyeOff,
  ArrowRight,
  Lock,
  Mail,
  AlertCircle,
  Sparkles,
  ShieldAlert,
  Info
} from 'lucide-react';

interface LoginPageProps {
  onNavigate: (path: string) => void;
  redirectNotice?: string;
  initialRole?: UserRole;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  onNavigate,
  redirectNotice,
  initialRole = 'student'
}) => {
  const { login } = useSchool();

  const [selectedRole, setSelectedRole] = useState<UserRole>(initialRole);
  const [email, setEmail] = useState(DEMO_CREDENTIALS[initialRole].email);
  const [password, setPassword] = useState(DEMO_CREDENTIALS[initialRole].password);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(redirectNotice || null);
  const [showCredentialHint, setShowCredentialHint] = useState(false);

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setError(null);
    setShowCredentialHint(false);
    setEmail(DEMO_CREDENTIALS[role].email);
    setPassword(DEMO_CREDENTIALS[role].password);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    setTimeout(() => {
      const success = login(selectedRole, email, password);
      setLoading(false);
      if (success) {
        if (selectedRole === 'student') onNavigate('/student/dashboard');
        else if (selectedRole === 'teacher') onNavigate('/teacher/dashboard');
        else onNavigate('/admin/dashboard');
      } else {
        setError(
          `Invalid credentials for ${selectedRole.toUpperCase()} portal. Please verify your Email/ID and Password.`
        );
      }
    }, 400);
  };

  const handleQuickDemoFill = (role: UserRole) => {
    handleRoleSelect(role);
    setToastMessage(`Prefilled ${role.toUpperCase()} credentials`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-center py-10 sm:px-6 lg:px-8 selection:bg-sky-500 selection:text-white transition-colors relative">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-slate-900 text-white text-xs px-4 py-3 rounded-xl shadow-xl border border-slate-700 flex items-center gap-2.5 max-w-md animate-in fade-in duration-150">
          <Sparkles className="w-4 h-4 text-sky-400 shrink-0" />
          <span className="leading-tight">{toastMessage}</span>
        </div>
      )}

      {/* Brand Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <button
          onClick={() => onNavigate('/')}
          className="inline-flex items-center gap-2.5 text-slate-900 dark:text-white group mx-auto mb-3"
        >
          <div className="w-10 h-10 rounded-xl bg-sky-600 flex items-center justify-center text-white shadow-md shadow-sky-600/30 group-hover:bg-sky-500 transition-colors">
            <School className="w-5 h-5" />
          </div>
          <span className="font-display font-bold text-xl tracking-tight text-slate-950 dark:text-white">
            Chennai Public School
          </span>
        </button>
        <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-white tracking-tight">
          SmartHub Portal Access
        </h2>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          Strict role-isolated gateway. Public visitors must authenticate to access portals.
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-xl px-4 sm:px-0">
        <div className="bg-white dark:bg-slate-900 py-8 px-6 sm:px-10 shadow-xl border border-slate-200 dark:border-slate-800 rounded-2xl">
          {/* Distinct Portal Selection Tabs */}
          <div className="mb-6">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Select Your Designated Portal
            </div>

            <div className="grid grid-cols-3 gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
              {/* Student Portal Tab */}
              <button
                type="button"
                onClick={() => handleRoleSelect('student')}
                className={`py-2 px-2 rounded-lg text-center font-medium text-xs transition-all flex flex-col items-center gap-1 ${
                  selectedRole === 'student'
                    ? 'bg-white dark:bg-slate-900 text-sky-700 dark:text-sky-400 shadow-sm font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <GraduationCap className="w-4 h-4" />
                <span>Student</span>
              </button>

              {/* Teacher Portal Tab */}
              <button
                type="button"
                onClick={() => handleRoleSelect('teacher')}
                className={`py-2 px-2 rounded-lg text-center font-medium text-xs transition-all flex flex-col items-center gap-1 ${
                  selectedRole === 'teacher'
                    ? 'bg-white dark:bg-slate-900 text-blue-700 dark:text-blue-400 shadow-sm font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>Teacher</span>
              </button>

              {/* Admin Portal Tab */}
              <button
                type="button"
                onClick={() => handleRoleSelect('admin')}
                className={`py-2 px-2 rounded-lg text-center font-medium text-xs transition-all flex flex-col items-center gap-1 ${
                  selectedRole === 'admin'
                    ? 'bg-white dark:bg-slate-900 text-indigo-700 dark:text-indigo-400 shadow-sm font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Admin</span>
              </button>
            </div>
          </div>

          {/* Role Policy Notice Banner */}
          <div
            className={`p-3.5 rounded-xl border text-xs mb-6 flex items-start gap-2.5 transition-colors ${
              selectedRole === 'student'
                ? 'bg-sky-50 dark:bg-sky-950/30 border-sky-200 dark:border-sky-900 text-sky-900 dark:text-sky-300'
                : selectedRole === 'teacher'
                ? 'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-900 text-blue-900 dark:text-blue-300'
                : 'bg-indigo-50 dark:bg-indigo-950/30 border-indigo-200 dark:border-indigo-900 text-indigo-900 dark:text-indigo-300'
            }`}
          >
            {selectedRole === 'admin' ? (
              <ShieldCheck className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
            ) : (
              <Info className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0 mt-0.5" />
            )}
            <div className="space-y-0.5">
              <p className="font-semibold text-[11px] uppercase tracking-wide">
                {selectedRole === 'student' && 'Student Workspace Isolation'}
                {selectedRole === 'teacher' && 'Faculty Console Isolation'}
                {selectedRole === 'admin' && 'Administrative Super-Rights'}
              </p>
              <p className="text-[11px] leading-relaxed opacity-90">
                {selectedRole === 'student' &&
                  'Enrolled students have isolated access ONLY to their coursework, timetable, assignments, and grades. Access to Faculty and Admin areas is strictly restricted.'}
                {selectedRole === 'teacher' &&
                  'Faculty members have isolated access ONLY to classroom attendance, marks entry, and lesson materials. Access to Student and Admin areas is restricted.'}
                {selectedRole === 'admin' &&
                  'School Administrators hold multi-portal authority with verified rights to access, inspect, and supervise BOTH Teacher and Student portals, plus add newly joined students & faculty.'}
              </p>
            </div>
          </div>

          {/* Authentication Form */}
          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            {error && (
              <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                {selectedRole === 'student' && 'Student Email ID / Student ID (e.g., CPS-2024-042)'}
                {selectedRole === 'teacher' && 'Teacher Email ID / Employee ID (e.g., CPS-T-108)'}
                {selectedRole === 'admin' && 'Administrator Email ID (e.g., admin@cps.demo)'}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={
                    selectedRole === 'student'
                      ? 'student@cps.demo or Student ID'
                      : selectedRole === 'teacher'
                      ? 'teacher@cps.demo or Employee ID'
                      : 'admin@cps.demo'
                  }
                  className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:border-sky-500 text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                Security Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-9 pr-10 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:border-sky-500 text-xs"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-3.5 h-3.5 text-sky-600 rounded-sm border-slate-300 focus:ring-sky-500"
                />
                <span className="text-slate-600 dark:text-slate-400">Remember credentials</span>
              </label>

              <button
                type="button"
                onClick={() => setShowCredentialHint(!showCredentialHint)}
                className="text-sky-600 dark:text-sky-400 hover:underline"
              >
                Credential Hint
              </button>
            </div>

            {showCredentialHint && (
              <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[11px] text-slate-600 dark:text-slate-300 space-y-1">
                <p>
                  <strong>{selectedRole.toUpperCase()} Demo Credentials:</strong>
                </p>
                <p>Login ID: <code className="bg-slate-200 dark:bg-slate-700 px-1 py-0.5 rounded">{DEMO_CREDENTIALS[selectedRole].email}</code></p>
                <p>Password: <code className="bg-slate-200 dark:bg-slate-700 px-1 py-0.5 rounded">{DEMO_CREDENTIALS[selectedRole].password}</code></p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 text-xs font-semibold text-white rounded-xl transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50 mt-4 cursor-pointer ${
                selectedRole === 'student'
                  ? 'bg-sky-600 hover:bg-sky-700 shadow-sky-600/25'
                  : selectedRole === 'teacher'
                  ? 'bg-blue-600 hover:bg-blue-700 shadow-blue-600/25'
                  : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-600/25'
              }`}
            >
              {loading ? (
                <span>Verifying {selectedRole.toUpperCase()} Credentials...</span>
              ) : (
                <>
                  <span>Sign In to {selectedRole === 'student' ? 'Student Workspace' : selectedRole === 'teacher' ? 'Faculty Portal' : 'Admin Authority'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Pre-fill for Selected Role */}
          <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 text-xs">
            <div className="flex items-center justify-between mb-2.5">
              <span className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                Quick Demo Account for {selectedRole.toUpperCase()}
              </span>
              <span className="text-[10px] text-slate-400">Testing Sandbox</span>
            </div>

            <button
              type="button"
              onClick={() => handleQuickDemoFill(selectedRole)}
              className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-left flex items-center justify-between"
            >
              <div>
                <p className="font-semibold text-slate-900 dark:text-white capitalize">
                  {selectedRole === 'student'
                    ? 'Aarav Sundaram (Grade 10-A)'
                    : selectedRole === 'teacher'
                    ? 'Dr. Meenakshi Raman (Mathematics HOD)'
                    : 'R. Sivaraman (Vice Principal & Admin)'}
                </p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">
                  {DEMO_CREDENTIALS[selectedRole].email} · Password: {DEMO_CREDENTIALS[selectedRole].password}
                </p>
              </div>
              <span className="text-[11px] font-semibold text-sky-600 dark:text-sky-400">
                1-Click Pre-fill →
              </span>
            </button>
          </div>
        </div>

        {/* Back Link */}
        <div className="text-center mt-6">
          <button
            onClick={() => onNavigate('/')}
            className="text-xs text-slate-500 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400"
          >
            ← Return to Chennai Public School Public Website
          </button>
        </div>
      </div>
    </div>
  );
};
