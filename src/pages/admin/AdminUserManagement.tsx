import React, { useState } from 'react';
import { Shield, Check, X, Lock, Key, Users, CheckCircle2 } from 'lucide-react';

export const AdminUserManagement: React.FC = () => {
  const [permissionsMatrix, setPermissionsMatrix] = useState({
    super_admin: { view: true, create: true, edit: true, delete: true, approve: true },
    admin: { view: true, create: true, edit: true, delete: false, approve: true },
    teacher: { view: true, create: true, edit: true, delete: false, approve: false },
    student: { view: true, create: false, edit: false, delete: false, approve: false }
  });

  const [savedNotice, setSavedNotice] = useState(false);

  const togglePerm = (roleKey: keyof typeof permissionsMatrix, perm: 'view' | 'create' | 'edit' | 'delete' | 'approve') => {
    setPermissionsMatrix((prev) => ({
      ...prev,
      [roleKey]: {
        ...prev[roleKey],
        [perm]: !prev[roleKey][perm]
      }
    }));
  };

  const handleSave = () => {
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
            Access Control
          </span>
          <h2 className="font-display font-bold text-2xl text-slate-900 dark:text-white mt-0.5">
            Role-Based Access Control (RBAC) & Governance
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Enforcing strict authorization partitions across institutional accounts
          </p>
        </div>

        <button
          onClick={handleSave}
          className="px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-all self-start sm:self-auto"
        >
          Save Permissions Matrix
        </button>
      </div>

      {savedNotice && (
        <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          <span>Security access control policies successfully committed and enforced.</span>
        </div>
      )}

      {/* Permissions Matrix Table */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <h3 className="font-display font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
          <Shield className="w-4 h-4 text-sky-600 dark:text-sky-400" />
          <span>Institutional Role Permission Matrix</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left min-w-[600px]">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 uppercase text-[10px] tracking-wider border-y border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3 px-4 font-semibold">User Role</th>
                <th className="py-3 px-4 text-center font-semibold">View Records</th>
                <th className="py-3 px-4 text-center font-semibold">Create Records</th>
                <th className="py-3 px-4 text-center font-semibold">Edit Data</th>
                <th className="py-3 px-4 text-center font-semibold">Delete / Deactivate</th>
                <th className="py-3 px-4 text-center font-semibold">Approve Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {/* Super Admin */}
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                <td className="py-4 px-4">
                  <span className="font-bold text-slate-900 dark:text-white block">Super Admin</span>
                  <span className="text-[10px] text-slate-400">Board Trustees & Principal</span>
                </td>
                {(['view', 'create', 'edit', 'delete', 'approve'] as const).map((perm) => (
                  <td key={perm} className="py-4 px-4 text-center">
                    <button
                      onClick={() => togglePerm('super_admin', perm)}
                      className={`w-7 h-7 rounded-lg inline-flex items-center justify-center transition-colors ${
                        permissionsMatrix.super_admin[perm]
                          ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-600'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                      }`}
                    >
                      {permissionsMatrix.super_admin[perm] ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                    </button>
                  </td>
                ))}
              </tr>

              {/* Admin */}
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                <td className="py-4 px-4">
                  <span className="font-bold text-slate-900 dark:text-white block">School Admin</span>
                  <span className="text-[10px] text-slate-400">Vice Principal & Registrars</span>
                </td>
                {(['view', 'create', 'edit', 'delete', 'approve'] as const).map((perm) => (
                  <td key={perm} className="py-4 px-4 text-center">
                    <button
                      onClick={() => togglePerm('admin', perm)}
                      className={`w-7 h-7 rounded-lg inline-flex items-center justify-center transition-colors ${
                        permissionsMatrix.admin[perm]
                          ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-600'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                      }`}
                    >
                      {permissionsMatrix.admin[perm] ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                    </button>
                  </td>
                ))}
              </tr>

              {/* Teacher */}
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                <td className="py-4 px-4">
                  <span className="font-bold text-slate-900 dark:text-white block">Teacher Faculty</span>
                  <span className="text-[10px] text-slate-400">Class In-charges & Subject Teachers</span>
                </td>
                {(['view', 'create', 'edit', 'delete', 'approve'] as const).map((perm) => (
                  <td key={perm} className="py-4 px-4 text-center">
                    <button
                      onClick={() => togglePerm('teacher', perm)}
                      className={`w-7 h-7 rounded-lg inline-flex items-center justify-center transition-colors ${
                        permissionsMatrix.teacher[perm]
                          ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-600'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                      }`}
                    >
                      {permissionsMatrix.teacher[perm] ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                    </button>
                  </td>
                ))}
              </tr>

              {/* Student */}
              <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                <td className="py-4 px-4">
                  <span className="font-bold text-slate-900 dark:text-white block">Student / Learner</span>
                  <span className="text-[10px] text-slate-400">Read-only academic desk & assignments</span>
                </td>
                {(['view', 'create', 'edit', 'delete', 'approve'] as const).map((perm) => (
                  <td key={perm} className="py-4 px-4 text-center">
                    <button
                      onClick={() => togglePerm('student', perm)}
                      className={`w-7 h-7 rounded-lg inline-flex items-center justify-center transition-colors ${
                        permissionsMatrix.student[perm]
                          ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-600'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                      }`}
                    >
                      {permissionsMatrix.student[perm] ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
