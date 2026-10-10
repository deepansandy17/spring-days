import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import {
  DollarSign,
  Search,
  CheckCircle2,
  Clock,
  Printer,
  Download,
  Plus,
  CreditCard,
  AlertCircle
} from 'lucide-react';
import { FeeRecord } from '../../types';
import { FeeReceiptModal } from '../../components/common/FeeReceiptModal';

export const AdminFees: React.FC = () => {
  const { fees, payFee } = useSchool();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedReceiptFee, setSelectedReceiptFee] = useState<FeeRecord | null>(null);

  const totalDue = fees.reduce((sum, f) => sum + f.amountDue, 0);
  const totalPaid = fees.reduce((sum, f) => sum + f.amountPaid, 0);
  const pendingAmount = totalDue - totalPaid;
  const paidCount = fees.filter((f) => f.status === 'paid').length;
  const pendingCount = fees.filter((f) => f.status !== 'paid').length;

  const filtered = fees.filter((f) => {
    const matchesStatus = filterStatus === 'all' || f.status === filterStatus;
    const matchesSearch =
      f.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (f.receiptNo && f.receiptNo.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  const handleRecordPayment = (feeId: string) => {
    payFee(feeId, 'UPI / NetBanking');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
            Treasury & Accounts
          </span>
          <h2 className="font-display font-bold text-2xl text-slate-900 dark:text-white mt-0.5">
            Fee Management & Collection Ledger
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Tracking term tuition fees, digital ERP subscriptions, and generating verifiable receipts
          </p>
        </div>

        <button
          onClick={() => {
            alert('Financial collection ledger exported as CSV report.');
          }}
          className="px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Fee Statement</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
          <span className="text-xs text-slate-500">Total Billed Fees</span>
          <p className="font-display font-bold text-2xl sm:text-3xl text-slate-900 dark:text-white tabular-nums">
            ₹{totalDue.toLocaleString()}
          </p>
          <p className="text-[11px] text-slate-400">Academic Year 2026–27</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
          <span className="text-xs text-slate-500">Total Cleared Collection</span>
          <p className="font-display font-bold text-2xl sm:text-3xl text-emerald-600 dark:text-emerald-400 tabular-nums">
            ₹{totalPaid.toLocaleString()}
          </p>
          <p className="text-[11px] text-emerald-600 font-semibold">{paidCount} Paid Records ({((totalPaid / totalDue) * 100).toFixed(1)}%)</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
          <span className="text-xs text-slate-500">Pending Dues</span>
          <p className="font-display font-bold text-2xl sm:text-3xl text-amber-600 dark:text-amber-400 tabular-nums">
            ₹{pendingAmount.toLocaleString()}
          </p>
          <p className="text-[11px] text-amber-600 font-medium">{pendingCount} Students Pending</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
          <span className="text-xs text-slate-500">Next Due Milestone</span>
          <p className="font-display font-bold text-xl sm:text-2xl text-slate-900 dark:text-white">
            Oct 31, 2026
          </p>
          <p className="text-[11px] text-slate-400">Term 2 Final Cutoff</p>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="relative w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search student or receipt number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:outline-hidden focus:border-sky-500"
          />
        </div>

        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
          {(['all', 'paid', 'pending', 'partial', 'overdue'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-lg capitalize font-medium transition-colors ${
                filterStatus === st
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Fee Table */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left min-w-[700px]">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 uppercase text-[10px] tracking-wider border-y border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3 px-3 font-semibold">Student Name</th>
                <th className="py-3 px-3 font-semibold">Class / Section</th>
                <th className="py-3 px-3 font-semibold">Term</th>
                <th className="py-3 px-3 text-right font-semibold">Billed Amount</th>
                <th className="py-3 px-3 text-right font-semibold">Amount Paid</th>
                <th className="py-3 px-3 text-center font-semibold">Due Date</th>
                <th className="py-3 px-3 text-center font-semibold">Status</th>
                <th className="py-3 px-3 text-right font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filtered.map((fee) => (
                <tr key={fee.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                  <td className="py-3 px-3 font-semibold text-slate-900 dark:text-white">
                    {fee.studentName}
                    <span className="block font-mono text-[10px] text-slate-400 font-normal">
                      {fee.studentId}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-slate-600 dark:text-slate-300">
                    Grade {fee.class}-{fee.section}
                  </td>
                  <td className="py-3 px-3 font-medium text-slate-700 dark:text-slate-200">
                    {fee.term}
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-medium text-slate-900 dark:text-white tabular-nums">
                    ₹{fee.amountDue.toLocaleString()}
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-medium text-emerald-600 dark:text-emerald-400 tabular-nums">
                    ₹{fee.amountPaid.toLocaleString()}
                  </td>
                  <td className="py-3 px-3 text-center text-slate-500">
                    {fee.dueDate}
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        fee.status === 'paid'
                          ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                          : fee.status === 'overdue'
                          ? 'bg-rose-50 dark:bg-rose-950 text-rose-700 dark:text-rose-300'
                          : fee.status === 'partial'
                          ? 'bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300'
                          : 'bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300'
                      }`}
                    >
                      {fee.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right space-x-2">
                    {fee.status === 'paid' ? (
                      <button
                        onClick={() => setSelectedReceiptFee(fee)}
                        className="text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline inline-flex items-center gap-1"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span>Receipt</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => handleRecordPayment(fee.id)}
                        className="px-2.5 py-1 rounded-lg bg-sky-600 hover:bg-sky-700 text-white font-semibold text-[11px] shadow-xs"
                      >
                        Record Pay
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Official Fee Receipt Modal */}
      <FeeReceiptModal
        isOpen={Boolean(selectedReceiptFee)}
        onClose={() => setSelectedReceiptFee(null)}
        fee={selectedReceiptFee}
      />
    </div>
  );
};
