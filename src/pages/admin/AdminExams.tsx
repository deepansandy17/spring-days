import React from 'react';
import { Award, Calendar, Clock, MapPin, CheckCircle2, Download } from 'lucide-react';

export const AdminExams: React.FC = () => {
  const examSchedules = [
    {
      subject: 'Mathematics',
      class: 'Grade 10 (All Sections)',
      date: '2026-11-03',
      time: '09:00 AM - 12:00 PM',
      room: 'Examination Hall A (Seats 1–72)',
      maxMarks: 80,
      status: 'Scheduled'
    },
    {
      subject: 'Science (Physics, Chemistry, Biology)',
      class: 'Grade 10 (All Sections)',
      date: '2026-11-05',
      time: '09:00 AM - 12:00 PM',
      room: 'Examination Hall A (Seats 1–72)',
      maxMarks: 80,
      status: 'Scheduled'
    },
    {
      subject: 'English Language & Literature',
      class: 'Grade 10 (All Sections)',
      date: '2026-11-09',
      time: '09:00 AM - 12:00 PM',
      room: 'Examination Hall A (Seats 1–72)',
      maxMarks: 80,
      status: 'Scheduled'
    },
    {
      subject: 'Social Science (History, Geo, Civics)',
      class: 'Grade 10 (All Sections)',
      date: '2026-11-12',
      time: '09:00 AM - 12:00 PM',
      room: 'Examination Hall A (Seats 1–72)',
      maxMarks: 80,
      status: 'Scheduled'
    },
    {
      subject: 'Computer Applications / AI',
      class: 'Grade 10 (All Sections)',
      date: '2026-11-16',
      time: '09:00 AM - 11:30 AM',
      room: 'Computer Science Lab 1 & 2',
      maxMarks: 50,
      status: 'Scheduled'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
            Assessment Operations
          </span>
          <h2 className="font-display font-bold text-2xl text-slate-900 dark:text-white mt-0.5">
            Term 1 Mid-Year Examination Blueprint & Seating
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Official timetable, hall allotment, invigilation duties, and result publication
          </p>
        </div>

        <button
          onClick={() => alert('Hall tickets generated and dispatched to Student Portals.')}
          className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-all"
        >
          Publish Hall Tickets
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {examSchedules.map((ex, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-sky-50 dark:bg-sky-950 text-sky-700 dark:text-sky-300 uppercase">
                {ex.class}
              </span>
              <span className="text-xs font-mono text-slate-400">{ex.date}</span>
            </div>

            <h4 className="font-display font-bold text-base text-slate-900 dark:text-white">
              {ex.subject}
            </h4>

            <div className="space-y-1 text-xs text-slate-500 pt-1">
              <p className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>{ex.time}</span>
              </p>
              <p className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{ex.room}</span>
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold">
              <span className="text-slate-600 dark:text-slate-300">Max Marks: {ex.maxMarks}</span>
              <span className="text-emerald-600 dark:text-emerald-400">{ex.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
