import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { CheckSquare, Search, Filter, Calendar, Download, Users } from 'lucide-react';

export const AdminAttendance: React.FC = () => {
  const { students } = useSchool();
  const [selectedClass, setSelectedClass] = useState('All');
  const [selectedDate, setSelectedDate] = useState('2026-10-10');
  const [searchQuery, setSearchQuery] = useState('');

  // Class by class summary
  const classBreakdown = [
    { grade: 'Grade 6-A', strength: 36, present: 35, absent: 1, rate: 97.2 },
    { grade: 'Grade 6-B', strength: 36, present: 34, absent: 2, rate: 94.4 },
    { grade: 'Grade 7-A', strength: 36, present: 34, absent: 2, rate: 94.4 },
    { grade: 'Grade 7-B', strength: 36, present: 35, absent: 1, rate: 97.2 },
    { grade: 'Grade 8-A', strength: 36, present: 33, absent: 3, rate: 91.6 },
    { grade: 'Grade 8-B', strength: 36, present: 34, absent: 2, rate: 94.4 },
    { grade: 'Grade 9-A', strength: 36, present: 35, absent: 1, rate: 97.2 },
    { grade: 'Grade 9-B', strength: 36, present: 33, absent: 3, rate: 91.6 },
    { grade: 'Grade 10-A', strength: 36, present: 35, absent: 1, rate: 97.2 },
    { grade: 'Grade 10-B', strength: 35, present: 33, absent: 2, rate: 94.2 },
    { grade: 'Grade 11-A', strength: 36, present: 34, absent: 2, rate: 94.4 },
    { grade: 'Grade 11-B', strength: 35, present: 32, absent: 3, rate: 91.4 },
    { grade: 'Grade 12-A', strength: 35, present: 34, absent: 1, rate: 97.1 },
    { grade: 'Grade 12-B', strength: 35, present: 33, absent: 2, rate: 94.2 }
  ];

  const totalSchoolStrength = classBreakdown.reduce((sum, c) => sum + c.strength, 0); // 498 ~ 500
  const totalPresentToday = classBreakdown.reduce((sum, c) => sum + c.present, 0);
  const totalAbsentToday = classBreakdown.reduce((sum, c) => sum + c.absent, 0);
  const overallRate = ((totalPresentToday / totalSchoolStrength) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
            Attendance Surveillance
          </span>
          <h2 className="font-display font-bold text-2xl text-slate-900 dark:text-white mt-0.5">
            School-Wide Attendance & Absence Monitor
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Real-time synchronization across all class rolls and biometric turnstiles
          </p>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-medium"
          />
          <button
            onClick={() => alert('Attendance report exported.')}
            className="px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Summary</span>
          </button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
          <span className="text-xs text-slate-500">Total Enrolled Strength</span>
          <p className="font-display font-bold text-3xl text-slate-900 dark:text-white tabular-nums">
            {totalSchoolStrength}
          </p>
          <p className="text-[11px] text-slate-400">Across 14 Cohorts</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
          <span className="text-xs text-slate-500">Students Present</span>
          <p className="font-display font-bold text-3xl text-emerald-600 dark:text-emerald-400 tabular-nums">
            {totalPresentToday}
          </p>
          <p className="text-[11px] text-emerald-600 font-semibold">{overallRate}% Overall Turnout</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
          <span className="text-xs text-slate-500">Students Absent</span>
          <p className="font-display font-bold text-3xl text-rose-600 dark:text-rose-400 tabular-nums">
            {totalAbsentToday}
          </p>
          <p className="text-[11px] text-rose-600 font-medium">Automatic SMS Dispatched to Parents</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
          <span className="text-xs text-slate-500">Faculty Turnout</span>
          <p className="font-display font-bold text-3xl text-indigo-600 dark:text-indigo-400 tabular-nums">
            29 / 30
          </p>
          <p className="text-[11px] text-slate-400">1 Faculty on Sanctioned Leave</p>
        </div>
      </div>

      {/* Class by class breakdown table */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
          Class-Wise Roll Call Status ({selectedDate})
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 uppercase text-[10px] tracking-wider border-y border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3 px-4 font-semibold">Cohort Section</th>
                <th className="py-3 px-4 text-center font-semibold">Total Students</th>
                <th className="py-3 px-4 text-center font-semibold text-emerald-600">Present</th>
                <th className="py-3 px-4 text-center font-semibold text-rose-600">Absent</th>
                <th className="py-3 px-4 text-right font-semibold">Turnout %</th>
                <th className="py-3 px-4 text-center font-semibold">Registry Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {classBreakdown.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                  <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">
                    {row.grade}
                  </td>
                  <td className="py-3 px-4 text-center tabular-nums text-slate-700 dark:text-slate-300">
                    {row.strength}
                  </td>
                  <td className="py-3 px-4 text-center tabular-nums font-semibold text-emerald-600 dark:text-emerald-400">
                    {row.present}
                  </td>
                  <td className="py-3 px-4 text-center tabular-nums font-semibold text-rose-600 dark:text-rose-400">
                    {row.absent}
                  </td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-slate-900 dark:text-white tabular-nums">
                    {row.rate}%
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                      SUBMITTED
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
