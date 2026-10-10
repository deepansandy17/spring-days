import React from 'react';
import { useSchool } from '../../context/SchoolContext';
import { Clock, MapPin, Users, BookOpen } from 'lucide-react';

export const TeacherTimetable: React.FC = () => {
  const { currentTeacher, timetable } = useSchool();

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

  const mySlots = timetable.filter((t) => t.teacherId === currentTeacher.id);

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
        <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
          Faculty Schedule
        </span>
        <h2 className="font-display font-bold text-2xl text-slate-900 dark:text-white mt-0.5">
          Teaching Master Timetable
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          {currentTeacher.name} · {currentTeacher.department}
        </p>
      </div>

      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs overflow-x-auto">
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
                  const slot = mySlots.find((s) => s.day === day && s.period === p);
                  return (
                    <td key={p} className="p-1.5 text-center">
                      {slot ? (
                        <div className="p-2 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-left space-y-0.5">
                          <p className="font-bold text-xs text-blue-900 dark:text-blue-200 truncate">
                            Grade {slot.class}-{slot.section}
                          </p>
                          <p className="text-[10px] text-slate-600 dark:text-slate-400 truncate">{slot.subject}</p>
                          <p className="text-[9px] text-sky-600 dark:text-sky-400 font-medium truncate">{slot.room}</p>
                        </div>
                      ) : (
                        <div className="p-2 rounded-xl text-slate-400 text-[10px] italic">
                          Free / Prep
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
