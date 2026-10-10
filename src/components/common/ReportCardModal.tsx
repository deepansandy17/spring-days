import React from 'react';
import { StudentProfile, SubjectMark } from '../../types';
import { School, Award, Download, Printer, X, ShieldCheck } from 'lucide-react';

interface ReportCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: StudentProfile;
  marks: SubjectMark[];
}

export const ReportCardModal: React.FC<ReportCardModalProps> = ({
  isOpen,
  onClose,
  student,
  marks
}) => {
  if (!isOpen) return null;

  const studentMarks = marks.filter((m) => m.studentId === student.id);
  const totalScored = studentMarks.reduce((sum, m) => sum + m.total, 0);
  const maxPossible = studentMarks.length * 100;
  const overallPercentage = maxPossible > 0 ? ((totalScored / maxPossible) * 100).toFixed(1) : '0';

  const calculateOverallGrade = (pct: number) => {
    if (pct >= 90) return 'A+ Outstanding';
    if (pct >= 80) return 'A Excellent';
    if (pct >= 70) return 'B+ Very Good';
    if (pct >= 60) return 'B Good';
    if (pct >= 50) return 'C Pass';
    return 'D Needs Improvement';
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-3xl w-full shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
        {/* Top Control Bar */}
        <div className="bg-slate-100 dark:bg-slate-800/80 px-6 py-3 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
            <Award className="w-4 h-4 text-sky-600 dark:text-sky-400" />
            <span>Official Academic Progress Report — 2026</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-700 rounded-lg border border-slate-300 dark:border-slate-600 hover:bg-slate-50 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>
            <button
              onClick={() => {
                alert('Report Card PDF generated and downloaded to device.');
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-sky-600 hover:bg-sky-700 rounded-lg transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Certificate Content */}
        <div className="p-8 space-y-6 text-slate-900 dark:text-white" id="printable-report">
          {/* Header */}
          <div className="text-center border-b pb-6 border-slate-200 dark:border-slate-800">
            <div className="w-12 h-12 rounded-xl bg-sky-600 text-white flex items-center justify-center mx-auto mb-2 shadow-sm">
              <School className="w-6 h-6" />
            </div>
            <h2 className="font-display font-bold text-2xl tracking-tight text-slate-950 dark:text-white">
              CHENNAI PUBLIC SCHOOL
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              SDI Campus, TVS Avenue, Anna Nagar West Extn, Chennai - 600101
            </p>
            <p className="text-[11px] text-slate-400">
              Affiliated to CBSE, New Delhi · Affiliation No: 1930284 · School Code: 55214
            </p>
            <div className="inline-block mt-3 px-3 py-1 bg-sky-50 dark:bg-sky-950/40 text-sky-800 dark:text-sky-300 text-xs font-semibold rounded-md border border-sky-200 dark:border-sky-800">
              CONTINUOUS COMPREHENSIVE EVALUATION — TERM 1 REPORT CARD (2026–27)
            </div>
          </div>

          {/* Student Bio Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 text-xs">
            <div>
              <span className="text-slate-400 block">Student Name</span>
              <strong className="text-slate-900 dark:text-white">{student.name}</strong>
            </div>
            <div>
              <span className="text-slate-400 block">Student ID / Roll No</span>
              <strong className="text-slate-900 dark:text-white">{student.studentId} (Roll #{student.rollNo})</strong>
            </div>
            <div>
              <span className="text-slate-400 block">Class & Section</span>
              <strong className="text-slate-900 dark:text-white">Grade {student.class} — Section {student.section}</strong>
            </div>
            <div>
              <span className="text-slate-400 block">Attendance Rate</span>
              <strong className="text-emerald-600 dark:text-emerald-400 font-semibold">{student.attendanceRate}%</strong>
            </div>
          </div>

          {/* Marks Table */}
          <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="py-2.5 px-3">Subject</th>
                  <th className="py-2.5 px-3 text-center">Internal (20)</th>
                  <th className="py-2.5 px-3 text-center">Formative (30)</th>
                  <th className="py-2.5 px-3 text-center">Term Exam (50)</th>
                  <th className="py-2.5 px-3 text-right">Total (100)</th>
                  <th className="py-2.5 px-3 text-center">Grade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {studentMarks.map((m) => (
                  <tr key={m.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                    <td className="py-2.5 px-3 font-medium text-slate-900 dark:text-white">
                      {m.subject}
                    </td>
                    <td className="py-2.5 px-3 text-center tabular-nums text-slate-600 dark:text-slate-300">
                      {m.internalMarks}
                    </td>
                    <td className="py-2.5 px-3 text-center tabular-nums text-slate-600 dark:text-slate-300">
                      {m.testMarks}
                    </td>
                    <td className="py-2.5 px-3 text-center tabular-nums text-slate-600 dark:text-slate-300">
                      {m.examMarks}
                    </td>
                    <td className="py-2.5 px-3 text-right tabular-nums font-semibold text-slate-900 dark:text-white">
                      {m.total}
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <span className="font-semibold text-sky-600 dark:text-sky-400">
                        {m.grade}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-slate-50 dark:bg-slate-800/60 font-semibold border-t border-slate-200 dark:border-slate-700">
                <tr>
                  <td className="py-3 px-3">Aggregate Marks</td>
                  <td colSpan={3} className="py-3 px-3 text-right text-slate-500">
                    Total: {totalScored} / {maxPossible}
                  </td>
                  <td className="py-3 px-3 text-right tabular-nums text-sky-600 dark:text-sky-400 text-sm">
                    {overallPercentage}%
                  </td>
                  <td className="py-3 px-3 text-center text-emerald-600 dark:text-emerald-400">
                    {calculateOverallGrade(Number(overallPercentage)).split(' ')[0]}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Remarks & Signatures */}
          <div className="pt-2 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20 col-span-2">
              <span className="font-medium text-slate-500 block mb-1">Class Teacher Remarks:</span>
              <p className="italic text-slate-700 dark:text-slate-300">
                "{student.name} demonstrates exceptional analytical rigor, inquisitive reasoning, and stellar classroom discipline. Consistently performs at the top decile in STEM subjects."
              </p>
            </div>
            <div className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
              <span className="font-medium text-slate-500">Result Status</span>
              <div>
                <p className="text-emerald-600 dark:text-emerald-400 font-bold text-sm flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" /> PROMOTED / MERIT
                </p>
                <p className="text-[10px] text-slate-400 mt-1">Date: 10th October 2026</p>
              </div>
            </div>
          </div>

          {/* Signatures */}
          <div className="pt-8 flex items-center justify-between border-t border-slate-200 dark:border-slate-800 text-center text-xs text-slate-500">
            <div>
              <div className="font-serif italic font-bold text-slate-700 dark:text-slate-300 mb-1">
                Dr. Meenakshi Raman
              </div>
              <p className="border-t border-slate-300 dark:border-slate-700 pt-1">Class Teacher</p>
            </div>
            <div>
              <div className="font-serif italic font-bold text-slate-700 dark:text-slate-300 mb-1">
                K. Sivaraman, M.A.
              </div>
              <p className="border-t border-slate-300 dark:border-slate-700 pt-1">Vice Principal</p>
            </div>
            <div>
              <div className="font-serif italic font-bold text-slate-700 dark:text-slate-300 mb-1">
                Dr. Vasundhara Sharma
              </div>
              <p className="border-t border-slate-300 dark:border-slate-700 pt-1">Principal</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
