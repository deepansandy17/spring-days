import React from 'react';
import { useSchool } from '../../context/SchoolContext';
import { FileSpreadsheet, Download, FileText, CheckCircle2 } from 'lucide-react';

export const AdminReports: React.FC = () => {
  const reports = [
    {
      title: 'Term 1 Comprehensive Academic Performance & Decile Ranks',
      category: 'Academics',
      description: 'Complete class-by-class marks register, subject distinction percentages, and failure mitigation lists.',
      format: 'PDF & CSV (1.8 MB)',
      updated: 'Oct 09, 2026'
    },
    {
      title: 'Institutional Attendance Audit & Chronic Absenteeism Log',
      category: 'Surveillance',
      description: 'Daily turnout percentages across 14 sections with flagged students below 80% statutory attendance.',
      format: 'XLSX (940 KB)',
      updated: 'Today at 08:30 AM'
    },
    {
      title: 'Tuition Fee Arrears & Defaulter Registry 2026–27',
      category: 'Finance',
      description: 'Detailed list of outstanding term installments, pending reconciliation, and automated reminder logs.',
      format: 'CSV (620 KB)',
      updated: 'Oct 08, 2026'
    },
    {
      title: 'Faculty Instructional Workload & Sanctioned Leave Ledger',
      category: 'Human Resources',
      description: 'Teaching periods per faculty, substitute coverage allocation, and remaining casual/medical leave balances.',
      format: 'PDF (1.2 MB)',
      updated: 'Oct 05, 2026'
    },
    {
      title: 'CBSE Affiliation Compliance & Laboratory Safety Audit',
      category: 'Statutory',
      description: 'Official infrastructure, safety certificates, teacher-pupil ratio, and library catalog inventory report.',
      format: 'PDF (4.5 MB)',
      updated: 'Sep 30, 2026'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
        <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
          Executive Intelligence
        </span>
        <h2 className="font-display font-bold text-2xl text-slate-900 dark:text-white mt-0.5">
          Institutional Reports & Analytics Exports
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Export verified statutory and operational datasets for CBSE board and management audits
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reports.map((rep, idx) => (
          <div
            key={idx}
            className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[10px]">
                <span className="font-bold px-2 py-0.5 rounded-md bg-sky-50 dark:bg-sky-950 text-sky-700 dark:text-sky-300 uppercase">
                  {rep.category}
                </span>
                <span className="text-slate-400">{rep.updated}</span>
              </div>

              <h4 className="font-display font-bold text-base text-slate-900 dark:text-white">
                {rep.title}
              </h4>

              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {rep.description}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400 font-mono text-[11px]">{rep.format}</span>
              <button
                onClick={() => alert(`Generated and downloaded: ${rep.title}`)}
                className="px-3.5 py-1.5 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Report</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
