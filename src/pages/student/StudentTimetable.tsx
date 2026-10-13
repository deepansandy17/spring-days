import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { Clock, Calendar, MapPin, User, ChevronLeft, ChevronRight } from 'lucide-react';

export const StudentTimetable: React.FC = () => {
  const { currentStudent, timetable } = useSchool();
  const [viewMode, setViewMode] = useState<'daily' | 'weekly'>('weekly');
  const [selectedDay, setSelectedDay] = useState<'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday'>('Monday');

  const days: ('Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday')[] = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday'
  ];

  const periods = [1, 2, 3, 4, 5, 6, 7];
  const timeLabels = [
    '09:00 - 09:45',
    '09:45 - 10:30',
    '10:45 - 11:30',
    '11:30 - 12:15',
    '13:00 - 13:45',
    '13:45 - 14:30',
    '14:30 - 15:15'
  ];

  const classSlots = timetable.filter(
    (t) => t.class === currentStudent.class && t.section === currentStudent.section
  );

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl student-card-glass border-t-4 border-indigo-500 shadow-lg">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Instructional Schedule
          </span>
          <h2 className="font-display font-bold text-2xl text-slate-900 dark:text-white mt-0.5">
            Class Timetable (Grade {currentStudent.class}-{currentStudent.section})
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Official instructional periods · Room 304 & Designated Laboratories
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl self-start sm:self-auto">
          <button
            onClick={() => setViewMode('weekly')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              viewMode === 'weekly'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            Weekly Grid
          </button>
          <button
            onClick={() => setViewMode('daily')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              viewMode === 'daily'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            Daily Cards
          </button>
        </div>
      </div>

      {viewMode === 'daily' ? (
        /* DAILY VIEW */
        <div className="space-y-4">
          {/* Day Selector */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {days.map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedDay === day
                    ? 'bg-sky-600 text-white shadow-sm'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50'
                }`}
              >
                {day}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {classSlots
              .filter((slot) => slot.day === selectedDay)
              .sort((a, b) => a.period - b.period)
              .map((slot) => (
                <div
                  key={slot.id}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="w-8 h-8 rounded-lg bg-sky-50 dark:bg-sky-950 text-sky-600 dark:text-sky-400 flex items-center justify-center font-bold text-xs">
                      P{slot.period}
                    </span>
                    <span className="text-xs font-mono text-slate-500 tabular-nums">
                      {slot.time}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
                      {slot.subject}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 flex items-center gap-1.5 mt-1">
                      <User className="w-3.5 h-3.5 text-sky-500 shrink-0" />
                      <span>{slot.teacherName}</span>
                    </p>
                    <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>{slot.room}</span>
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ) : (
        /* WEEKLY GRID VIEW */
        <div className="p-6 rounded-3xl student-card-glass shadow-sm overflow-x-auto">
          <table className="w-full text-xs min-w-[700px]">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500">
                <th className="py-3 px-3 text-left font-semibold w-24">Day</th>
                {periods.map((p, idx) => (
                  <th key={p} className="py-3 px-2 text-center font-semibold">
                    <div>Period {p}</div>
                    <div className="text-[10px] text-slate-400 font-normal tabular-nums">{timeLabels[idx]}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {days.map((day) => (
                <tr key={day} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                  <td className="py-4 px-3 font-semibold text-slate-900 dark:text-white">
                    {day}
                  </td>
                  {periods.map((p) => {
                    const slot = classSlots.find((s) => s.day === day && s.period === p);
                    return (
                      <td key={p} className="p-1.5 text-center">
                        {slot ? (
                          <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 text-left space-y-0.5">
                            <p className="font-bold text-xs text-slate-900 dark:text-white truncate">
                              {slot.subject}
                            </p>
                            <p className="text-[10px] text-slate-500 truncate">{slot.teacherName.split(' ')[1] || slot.teacherName}</p>
                            <p className="text-[9px] text-sky-600 dark:text-sky-400 truncate">{slot.room}</p>
                          </div>
                        ) : (
                          <span className="text-slate-300 dark:text-slate-700">—</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
