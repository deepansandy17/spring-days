import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import {
  UserPlus,
  Search,
  CheckCircle2,
  Clock,
  XCircle,
  Eye,
  Check,
  X,
  Phone,
  Mail
} from 'lucide-react';
import { AdmissionApplication } from '../../types';

export const AdminAdmissions: React.FC = () => {
  const { admissions, updateAdmissionStatus } = useSchool();
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAdm, setSelectedAdm] = useState<AdmissionApplication | null>(null);

  const filtered = admissions.filter((a) => {
    const matchesStatus = filterStatus === 'all' || a.status === filterStatus;
    const matchesSearch =
      a.applicantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.parentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.appliedClass.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusColor = (status: AdmissionApplication['status']) => {
    switch (status) {
      case 'new':
        return 'bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300';
      case 'under_review':
        return 'bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300';
      case 'approved':
        return 'bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300';
      case 'enrolled':
        return 'bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300';
      case 'rejected':
        return 'bg-rose-50 dark:bg-rose-950 text-rose-700 dark:text-rose-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
            Admissions Cell
          </span>
          <h2 className="font-display font-bold text-2xl text-slate-900 dark:text-white mt-0.5">
            Admissions Pipeline & Applications
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Tracking online submissions from prospective parents and entrance assessment results
          </p>
        </div>

        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl self-start sm:self-auto">
          {(['all', 'new', 'under_review', 'approved', 'enrolled', 'rejected'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg capitalize transition-colors ${
                filterStatus === st
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              {st.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-xs">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search applicants..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs focus:outline-hidden focus:border-sky-500"
        />
      </div>

      {/* Admissions Table */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left min-w-[700px]">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 uppercase text-[10px] tracking-wider border-y border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3 px-3 font-semibold">Applicant Name</th>
                <th className="py-3 px-3 font-semibold">Applied Grade</th>
                <th className="py-3 px-3 font-semibold">Parent / Guardian</th>
                <th className="py-3 px-3 font-semibold">Contact Info</th>
                <th className="py-3 px-3 text-center font-semibold">Date</th>
                <th className="py-3 px-3 text-center font-semibold">Status</th>
                <th className="py-3 px-3 text-right font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filtered.map((adm) => (
                <tr key={adm.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                  <td className="py-3 px-3 font-semibold text-slate-900 dark:text-white">
                    {adm.applicantName}
                  </td>
                  <td className="py-3 px-3 text-slate-700 dark:text-slate-300 font-medium">
                    {adm.appliedClass}
                  </td>
                  <td className="py-3 px-3 text-slate-600 dark:text-slate-300">
                    {adm.parentName}
                  </td>
                  <td className="py-3 px-3 font-mono text-slate-500 text-[11px]">
                    {adm.parentPhone}
                  </td>
                  <td className="py-3 px-3 text-center text-slate-400 text-[11px]">
                    {adm.submissionDate}
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${getStatusColor(
                        adm.status
                      )}`}
                    >
                      {adm.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right space-x-1.5">
                    {adm.status === 'new' && (
                      <button
                        onClick={() => updateAdmissionStatus(adm.id, 'under_review')}
                        className="px-2.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-medium text-[11px]"
                      >
                        Review
                      </button>
                    )}
                    {adm.status === 'under_review' && (
                      <button
                        onClick={() => updateAdmissionStatus(adm.id, 'approved')}
                        className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-[11px]"
                      >
                        Approve
                      </button>
                    )}
                    {adm.status === 'approved' && (
                      <button
                        onClick={() => updateAdmissionStatus(adm.id, 'enrolled')}
                        className="px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-[11px]"
                      >
                        Enroll
                      </button>
                    )}
                    <button
                      onClick={() => setSelectedAdm(adm)}
                      className="p-1 text-slate-400 hover:text-sky-600"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4 inline" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details Modal */}
      {selectedAdm && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 text-xs">
            <div className="flex items-center justify-between border-b pb-3 border-slate-100 dark:border-slate-800">
              <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
                Admission Application Dossier
              </h3>
              <button onClick={() => setSelectedAdm(null)} className="text-slate-400">✕</button>
            </div>

            <div className="space-y-2 text-slate-600 dark:text-slate-300">
              <p>Applicant: <strong className="text-slate-900 dark:text-white">{selectedAdm.applicantName}</strong></p>
              <p>Seeking Grade: <strong>{selectedAdm.appliedClass}</strong></p>
              <p>Previous School: <strong>{selectedAdm.previousSchool || 'N/A'}</strong></p>
              <p>Parent Name: <strong>{selectedAdm.parentName}</strong></p>
              <p>Phone: <strong className="font-mono">{selectedAdm.parentPhone}</strong></p>
              <p>Email: <strong>{selectedAdm.parentEmail || 'N/A'}</strong></p>
              <p>Application Date: <strong>{selectedAdm.submissionDate}</strong></p>
              {selectedAdm.notes && (
                <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-100 dark:border-slate-800">
                  <span className="font-semibold block mb-0.5 text-slate-700 dark:text-slate-300">Parent Notes:</span>
                  <p className="italic">{selectedAdm.notes}</p>
                </div>
              )}
            </div>

            <div className="pt-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    updateAdmissionStatus(selectedAdm.id, 'rejected');
                    setSelectedAdm(null);
                  }}
                  className="px-3 py-1.5 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-lg font-semibold"
                >
                  Reject
                </button>
                <button
                  onClick={() => {
                    updateAdmissionStatus(selectedAdm.id, 'approved');
                    setSelectedAdm(null);
                  }}
                  className="px-3 py-1.5 bg-emerald-600 text-white hover:bg-emerald-700 rounded-lg font-semibold"
                >
                  Offer Admission
                </button>
              </div>
              <button
                onClick={() => setSelectedAdm(null)}
                className="px-4 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
