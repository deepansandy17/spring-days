import React from 'react';
import { useSchool } from '../../context/SchoolContext';
import { Layers, Users, GraduationCap, MapPin } from 'lucide-react';

export const AdminClasses: React.FC = () => {
  const { teachers } = useSchool();

  const classSections = [
    { grade: '6', section: 'A', room: 'Room 101', students: 36, teacher: 'Mrs. Sunita Verma' },
    { grade: '6', section: 'B', room: 'Room 102', students: 36, teacher: 'Mrs. Deepa Krishnan' },
    { grade: '7', section: 'A', room: 'Room 103', students: 36, teacher: 'Mrs. Usha Raghavan' },
    { grade: '7', section: 'B', room: 'Room 104', students: 36, teacher: 'Mr. Ganesan Pillai' },
    { grade: '8', section: 'A', room: 'Room 201', students: 36, teacher: 'Dr. Kavitha Subramanian' },
    { grade: '8', section: 'B', room: 'Room 202', students: 36, teacher: 'Mr. Suresh Kumar' },
    { grade: '9', section: 'A', room: 'Room 203', students: 36, teacher: 'Mr. Rajeshwar Sharma' },
    { grade: '9', section: 'B', room: 'Room 204', students: 36, teacher: 'Mrs. Radhika Chandran' },
    { grade: '10', section: 'A', room: 'Room 304', students: 36, teacher: 'Dr. Meenakshi Raman' },
    { grade: '10', section: 'B', room: 'Room 305', students: 35, teacher: 'Prof. R. Venkatraman' },
    { grade: '11', section: 'A (Science)', room: 'Room 401', students: 36, teacher: 'Mrs. Lakshmi Narayanan' },
    { grade: '11', section: 'B (Commerce)', room: 'Room 402', students: 35, teacher: 'Mr. Anand Parthasarathy' },
    { grade: '12', section: 'A (Science)', room: 'Room 403', students: 35, teacher: 'Dr. Anita Selvaraj' },
    { grade: '12', section: 'B (Commerce)', room: 'Room 404', students: 35, teacher: 'Mrs. Preetha Mohan' }
  ];

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
        <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
          Cohort Architecture
        </span>
        <h2 className="font-display font-bold text-2xl text-slate-900 dark:text-white mt-0.5">
          Classes & Cohort Sections (14 Active Rooms)
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Distribution of student strength and class in-charge faculty assignments
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {classSections.map((cls, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-sky-50 dark:bg-sky-950 text-sky-700 dark:text-sky-300">
                Grade {cls.grade} — Section {cls.section}
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" /> {cls.room}
              </span>
            </div>

            <div className="space-y-1.5 pt-1 text-xs text-slate-600 dark:text-slate-300">
              <p className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-sky-500 shrink-0" />
                <span>Class Teacher: <strong className="text-slate-900 dark:text-white">{cls.teacher}</strong></span>
              </p>
              <p className="flex items-center gap-2">
                <Users className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Enrolled Students: <strong className="text-slate-900 dark:text-white">{cls.students}</strong></span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
