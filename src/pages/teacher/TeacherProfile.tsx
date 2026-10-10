import React from 'react';
import { useSchool } from '../../context/SchoolContext';
import { User, Award, BookOpen, Clock, Calendar, Mail, Phone } from 'lucide-react';

export const TeacherProfile: React.FC = () => {
  const { currentTeacher } = useSchool();

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
        <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
          Faculty Dossier
        </span>
        <h2 className="font-display font-bold text-2xl text-slate-900 dark:text-white mt-0.5">
          Instructor Profile & Credentials
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Employee Code: {currentTeacher.employeeId} · Department of {currentTeacher.department}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs text-center space-y-4">
          <div className="w-24 h-24 rounded-2xl mx-auto overflow-hidden border-2 border-sky-500/30 shadow-md">
            <img
              src={currentTeacher.avatar}
              alt={currentTeacher.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <div>
            <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
              {currentTeacher.name}
            </h3>
            <p className="text-xs text-sky-600 dark:text-sky-400 font-semibold">
              Senior Faculty & Academic Mentor
            </p>
            <p className="text-[11px] text-slate-400 font-mono mt-0.5">{currentTeacher.employeeId}</p>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-left text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Joining Date</span>
              <strong className="text-slate-800 dark:text-slate-200">{currentTeacher.joinedDate}</strong>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Class In-charge</span>
              <strong className="text-slate-800 dark:text-slate-200">Grade 10 - Section A</strong>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Official Email</span>
              <strong className="text-slate-800 dark:text-slate-200">{currentTeacher.email}</strong>
            </div>
          </div>
        </div>

        <div className="lg:col-span-8 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6 text-xs">
          <div>
            <h4 className="font-display font-bold text-base text-slate-900 dark:text-white mb-2">
              Academic Qualifications & Pedagogy
            </h4>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
              {currentTeacher.qualifications}
              <br />
              <span className="text-slate-400 mt-1 block">
                Specializations: Applied Mathematical Modelling, Discrete Probability, CBSE Senior Board Assessment Rubric Design.
              </span>
            </p>
          </div>

          <div>
            <h4 className="font-display font-bold text-base text-slate-900 dark:text-white mb-3">
              Assigned Classes & Subjects
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentTeacher.assignedClasses.map((cls, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between"
                >
                  <div>
                    <strong className="text-slate-900 dark:text-white block">
                      Grade {cls.class} - Section {cls.section}
                    </strong>
                    <span className="text-slate-400">{cls.subject}</span>
                  </div>
                  <span className="text-[10px] font-semibold text-sky-600 dark:text-sky-400 px-2 py-0.5 rounded-full bg-sky-50 dark:bg-sky-950">
                    Active Cohort
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
