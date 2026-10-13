import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { Calendar as CalendarIcon, Clock, MapPin, ChevronLeft, ChevronRight, Tag } from 'lucide-react';

export const StudentCalendar: React.FC = () => {
  const { events, assignments } = useSchool();
  const [selectedMonth, setSelectedMonth] = useState('October 2026');

  // Unified Calendar events
  const calendarEvents = [
    ...events.map((e) => ({
      id: e.id,
      title: e.title,
      date: e.date,
      type: 'event' as const,
      category: e.category,
      time: e.time,
      venue: e.venue
    })),
    ...assignments.map((a) => ({
      id: a.id,
      title: `Deadline: ${a.title}`,
      date: a.dueDate,
      type: 'assignment' as const,
      category: a.subject,
      time: '11:59 PM',
      venue: 'Portal Submission'
    })),
    {
      id: 'hol-01',
      title: 'Ayudha Puja & Deepavali Holidays',
      date: '2026-10-30',
      type: 'holiday' as const,
      category: 'Holiday',
      time: 'All Day',
      venue: 'Campus Closed'
    },
    {
      id: 'ex-01',
      title: 'Term 1 Mid-Year Exams Commence',
      date: '2026-11-03',
      type: 'exam' as const,
      category: 'Exam',
      time: '09:00 AM - 12:00 PM',
      venue: 'Exam Hall 1'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl student-card-glass border-t-4 border-amber-500 shadow-lg">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
            Campus Almanac
          </span>
          <h2 className="font-display font-bold text-2xl text-slate-900 dark:text-white mt-0.5">
            Academic Calendar & Key Dates
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Tracking exams, holiday breaks, extracurricular activities, and homework submissions
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-600 dark:text-slate-400 p-2 rounded-xl bg-slate-100/60 dark:bg-slate-800/60">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-xs" /> Exam
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-500 shadow-xs" /> Deadline
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-xs" /> Event
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-xs" /> Holiday
          </span>
        </div>
      </div>

      {/* Events List / Timeline */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {calendarEvents.map((evt) => {
          const badgeColor =
            evt.type === 'exam'
              ? 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border-rose-300'
              : evt.type === 'assignment'
              ? 'bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border-sky-300'
              : evt.type === 'holiday'
              ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-300'
              : 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-300';

          const topBorderColor =
            evt.type === 'exam'
              ? 'border-t-4 border-rose-500'
              : evt.type === 'assignment'
              ? 'border-t-4 border-sky-500'
              : evt.type === 'holiday'
              ? 'border-t-4 border-amber-500'
              : 'border-t-4 border-emerald-500';

          return (
            <div
              key={evt.id}
              className={`p-5 rounded-3xl student-card-glass shadow-sm space-y-3 flex flex-col justify-between hover:scale-[1.01] transition-transform ${topBorderColor}`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase ${badgeColor}`}>
                    {evt.type}
                  </span>
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    {evt.date}
                  </span>
                </div>

                <h3 className="font-display font-bold text-base text-slate-900 dark:text-white leading-snug">
                  {evt.title}
                </h3>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 space-y-1">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{evt.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{evt.venue}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
