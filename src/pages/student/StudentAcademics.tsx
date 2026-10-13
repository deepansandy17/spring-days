import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import {
  GraduationCap,
  Award,
  Download,
  Calendar,
  CheckCircle2,
  TrendingUp,
  FileText
} from 'lucide-react';
import { ReportCardModal } from '../../components/common/ReportCardModal';

export const StudentAcademics: React.FC = () => {
  const { currentStudent, marks } = useSchool();
  const [isReportOpen, setIsReportOpen] = useState(false);

  const studentMarks = marks.filter((m) => m.studentId === currentStudent.id);
  const totalScored = studentMarks.reduce((sum, m) => sum + m.total, 0);
  const maxPossible = studentMarks.length * 100;
  const overallPercentage = maxPossible > 0 ? ((totalScored / maxPossible) * 100).toFixed(1) : '87.8';

  return (
    <div className="space-y-6">
      {/* Header with Download Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl student-card-glass border-t-4 border-indigo-500 shadow-lg">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Academic Progress & Evaluation
          </span>
          <h2 className="font-display font-bold text-2xl text-slate-900 dark:text-white mt-0.5">
            Grades & Examination Scorecards
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Grade {currentStudent.class}-{currentStudent.section} · Term 1 Continuous Comprehensive Evaluation (CCE)
          </p>
        </div>

        <button
          onClick={() => setIsReportOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-sky-600 hover:from-indigo-500 hover:to-sky-500 text-white rounded-xl text-xs font-semibold shadow-md transition-all self-start sm:self-auto cursor-pointer hover:scale-[1.02]"
        >
          <Download className="w-4 h-4" />
          <span>Download Official Report Card</span>
        </button>
      </div>

      {/* KPI Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl student-card-glass border-t-4 border-indigo-500 shadow-sm">
          <span className="text-xs text-slate-500 block font-medium">Overall Aggregate</span>
          <p className="font-display font-bold text-3xl text-indigo-600 dark:text-indigo-400 tabular-nums mt-1">
            {overallPercentage}%
          </p>
          <p className="text-[11px] text-indigo-600 dark:text-indigo-400 font-semibold mt-1">Grade A+ (Distinction with Merit)</p>
        </div>

        <div className="p-5 rounded-2xl student-card-glass border-t-4 border-sky-500 shadow-sm">
          <span className="text-xs text-slate-500 block font-medium">Marks Scored</span>
          <p className="font-display font-bold text-3xl text-slate-900 dark:text-white tabular-nums mt-1">
            {totalScored} <span className="text-lg text-slate-400 font-normal">/ {maxPossible}</span>
          </p>
          <p className="text-[11px] text-slate-400 mt-1">Across 7 Evaluated Subjects</p>
        </div>

        <div className="p-5 rounded-2xl student-card-glass border-t-4 border-emerald-500 shadow-sm">
          <span className="text-xs text-slate-500 block font-medium">Class Decile Rank</span>
          <p className="font-display font-bold text-3xl text-emerald-600 dark:text-emerald-400 tabular-nums mt-1">
            #2 <span className="text-lg text-slate-400 font-normal">in 10-A</span>
          </p>
          <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold mt-1">Top 5% Cohort (Honor Roll)</p>
        </div>
      </div>

      {/* Marks Table */}
      <div className="p-6 rounded-3xl student-card-glass space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
            Term 1 Mid-Year Examination Subject Breakdown
          </h3>
          <span className="text-xs text-slate-400">Exam: September 2026 Assessment</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 uppercase text-[10px] tracking-wider border-y border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3 px-4 font-semibold">Subject</th>
                <th className="py-3 px-4 text-center font-semibold">Internal (20)</th>
                <th className="py-3 px-4 text-center font-semibold">Formative (30)</th>
                <th className="py-3 px-4 text-center font-semibold">Term Exam (50)</th>
                <th className="py-3 px-4 text-right font-semibold">Total (100)</th>
                <th className="py-3 px-4 text-center font-semibold">Grade</th>
                <th className="py-3 px-4 font-semibold">Teacher Remarks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {studentMarks.map((m) => (
                <tr key={m.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                  <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">
                    {m.subject}
                  </td>
                  <td className="py-3 px-4 text-center tabular-nums text-slate-600 dark:text-slate-300">
                    {m.internalMarks}
                  </td>
                  <td className="py-3 px-4 text-center tabular-nums text-slate-600 dark:text-slate-300">
                    {m.testMarks}
                  </td>
                  <td className="py-3 px-4 text-center tabular-nums text-slate-600 dark:text-slate-300">
                    {m.examMarks}
                  </td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-slate-900 dark:text-white tabular-nums">
                    {m.total}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300">
                      {m.grade}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-500 dark:text-slate-400 italic text-[11px]">
                    {m.teacherRemarks || 'Satisfactory'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ReportCardModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        student={currentStudent}
        marks={marks}
      />
    </div>
  );
};
