import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { CalendarDays, Plus, CheckCircle2, Clock, XCircle, AlertCircle, Calendar } from 'lucide-react';
import { LeaveRequest } from '../../types';

export const TeacherLeave: React.FC = () => {
  const { currentTeacher, leaves, requestLeave } = useSchool();
  const [isApplyOpen, setIsApplyOpen] = useState(false);

  const [form, setForm] = useState({
    leaveType: 'Casual' as LeaveRequest['leaveType'],
    startDate: '2026-11-10',
    endDate: '2026-11-11',
    reason: 'Attending regional mathematics symposium at IIT Madras.'
  });

  const teacherLeaves = leaves.filter((l) => l.teacherId === currentTeacher.id);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    const start = new Date(form.startDate);
    const end = new Date(form.endDate);
    const days = Math.max(1, Math.round((end.getTime() - start.getTime()) / (1000 * 3600 * 24)) + 1);

    requestLeave({
      teacherId: currentTeacher.id,
      teacherName: currentTeacher.name,
      department: currentTeacher.department,
      leaveType: form.leaveType,
      startDate: form.startDate,
      endDate: form.endDate,
      days,
      reason: form.reason
    });

    setIsApplyOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl teacher-card-executive">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Faculty Administration
          </span>
          <h2 className="font-display font-bold text-2xl text-slate-900 dark:text-white mt-0.5">
            Leave Applications & Balances
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Apply for Casual, Medical, or On-Duty leave with administrative approval routing
          </p>
        </div>

        <button
          onClick={() => setIsApplyOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-all self-start sm:self-auto border border-slate-700"
        >
          <Plus className="w-4 h-4" />
          <span>Apply for Leave</span>
        </button>
      </div>

      {/* Leave Balances Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
          <span className="text-xs text-slate-500">Casual Leave (CL) Balance</span>
          <p className="font-display font-bold text-3xl text-sky-600 dark:text-sky-400 tabular-nums">
            {currentTeacher.leaveBalance.casual} <span className="text-sm font-normal text-slate-400">Days</span>
          </p>
          <p className="text-[11px] text-slate-400">Allowed for personal / family matters</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
          <span className="text-xs text-slate-500">Medical Leave (ML) Balance</span>
          <p className="font-display font-bold text-3xl text-emerald-600 dark:text-emerald-400 tabular-nums">
            {currentTeacher.leaveBalance.medical} <span className="text-sm font-normal text-slate-400">Days</span>
          </p>
          <p className="text-[11px] text-slate-400">Supported with medical certificate</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
          <span className="text-xs text-slate-500">On-Duty (OD) Sanction</span>
          <p className="font-display font-bold text-3xl text-indigo-600 dark:text-indigo-400 tabular-nums">
            {currentTeacher.leaveBalance.duty} <span className="text-sm font-normal text-slate-400">Days</span>
          </p>
          <p className="text-[11px] text-slate-400">CBSE evaluation & academic seminars</p>
        </div>
      </div>

      {/* Past Requests History */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
          My Leave History & Status
        </h3>

        <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
          {teacherLeaves.map((l) => (
            <div key={l.id} className="py-4 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 dark:text-white text-sm">
                    {l.leaveType} Leave ({l.days} Day{l.days > 1 ? 's' : ''})
                  </span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      l.status === 'approved'
                        ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                        : l.status === 'rejected'
                        ? 'bg-rose-50 dark:bg-rose-950 text-rose-700 dark:text-rose-300'
                        : 'bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300'
                    }`}
                  >
                    {l.status}
                  </span>
                </div>
                <span className="text-slate-400 font-mono text-[11px]">Applied: {l.appliedDate}</span>
              </div>

              <div className="text-slate-600 dark:text-slate-300 space-y-1">
                <p>
                  Duration: <strong className="text-slate-800 dark:text-slate-200">{l.startDate}</strong> to <strong className="text-slate-800 dark:text-slate-200">{l.endDate}</strong>
                </p>
                <p>Reason: <span className="italic">{l.reason}</span></p>
                {l.adminRemark && (
                  <p className="text-sky-600 dark:text-sky-400 font-medium">
                    Admin Note: "{l.adminRemark}"
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Apply Modal */}
      {isApplyOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3 border-slate-100 dark:border-slate-800">
              <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
                Submit Leave Application
              </h3>
              <button onClick={() => setIsApplyOpen(false)} className="text-slate-400">✕</button>
            </div>

            <form onSubmit={handleApply} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Leave Category</label>
                <select
                  value={form.leaveType}
                  onChange={(e) => setForm({ ...form, leaveType: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                >
                  <option value="Casual">Casual Leave (Personal / Urgent)</option>
                  <option value="Medical">Medical Leave (Health)</option>
                  <option value="On-Duty">On-Duty Leave (Official School Delegation)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Start Date</label>
                  <input
                    type="date"
                    required
                    value={form.startDate}
                    onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">End Date</label>
                  <input
                    type="date"
                    required
                    value={form.endDate}
                    onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Specific Reason</label>
                <textarea
                  rows={3}
                  required
                  value={form.reason}
                  onChange={(e) => setForm({ ...form, reason: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsApplyOpen(false)}
                  className="px-4 py-2 text-slate-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-sky-600 text-white font-semibold rounded-lg"
                >
                  Send to Principal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
