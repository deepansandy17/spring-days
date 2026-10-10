import React from 'react';
import { FeeRecord } from '../../types';
import { School, CheckCircle, Download, Printer, X } from 'lucide-react';

interface FeeReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  fee: FeeRecord | null;
}

export const FeeReceiptModal: React.FC<FeeReceiptModalProps> = ({
  isOpen,
  onClose,
  fee
}) => {
  if (!isOpen || !fee) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-xl w-full shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
        {/* Top Control Bar */}
        <div className="bg-slate-100 dark:bg-slate-800/80 px-6 py-3 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>Official Payment Receipt</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-700 rounded-lg border border-slate-300 dark:border-slate-600 hover:bg-slate-50"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>
            <button
              onClick={() => {
                alert(`Fee Receipt ${fee.receiptNo || 'CPS-REC'} downloaded.`);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-sky-600 hover:bg-sky-700 rounded-lg"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Receipt Content */}
        <div className="p-8 space-y-6 text-slate-900 dark:text-white">
          <div className="flex items-start justify-between border-b pb-5 border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-600 text-white flex items-center justify-center">
                <School className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-slate-950 dark:text-white">
                  CHENNAI PUBLIC SCHOOL
                </h3>
                <p className="text-[11px] text-slate-500">TVS Avenue, Anna Nagar West Extn, Chennai - 600101</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Receipt No.</span>
              <strong className="text-xs font-mono text-slate-800 dark:text-slate-200">{fee.receiptNo || 'CPS/2026-27/REC-9012'}</strong>
              <span className="text-[10px] text-slate-400 block mt-0.5">Date: {fee.paidDate || '2026-10-10'}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
            <div>
              <span className="text-slate-400 block">Student Name</span>
              <strong className="text-slate-900 dark:text-white">{fee.studentName}</strong>
            </div>
            <div>
              <span className="text-slate-400 block">Class & Section</span>
              <strong className="text-slate-900 dark:text-white">Grade {fee.class} - {fee.section}</strong>
            </div>
            <div>
              <span className="text-slate-400 block">Term Installment</span>
              <strong className="text-slate-900 dark:text-white">{fee.term}</strong>
            </div>
            <div>
              <span className="text-slate-400 block">Payment Mode</span>
              <strong className="text-slate-900 dark:text-white">{fee.paymentMethod || 'Net Banking / UPI'}</strong>
            </div>
          </div>

          <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
            <table className="w-full text-xs">
              <thead className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                <tr>
                  <th className="py-2 px-3 text-left">Description</th>
                  <th className="py-2 px-3 text-right">Amount (INR)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                <tr>
                  <td className="py-2.5 px-3">Tuition & Pedagogical Laboratory Fee</td>
                  <td className="py-2.5 px-3 text-right tabular-nums">₹{Math.round(fee.amountDue * 0.7).toLocaleString()}</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3">Digital Campus ERP & Smart Library Subscription</td>
                  <td className="py-2.5 px-3 text-right tabular-nums">₹{Math.round(fee.amountDue * 0.2).toLocaleString()}</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3">Sports, STEM Maker Hub & Activities</td>
                  <td className="py-2.5 px-3 text-right tabular-nums">₹{Math.round(fee.amountDue * 0.1).toLocaleString()}</td>
                </tr>
              </tbody>
              <tfoot className="bg-slate-50 dark:bg-slate-800/60 font-bold border-t border-slate-200 dark:border-slate-700">
                <tr>
                  <td className="py-2.5 px-3 text-slate-900 dark:text-white">Total Amount Paid</td>
                  <td className="py-2.5 px-3 text-right text-emerald-600 dark:text-emerald-400 text-sm tabular-nums">
                    ₹{fee.amountPaid.toLocaleString()}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div className="pt-4 flex items-center justify-between text-xs text-slate-400 border-t border-slate-200 dark:border-slate-800">
            <div>
              <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" /> PAYMENT STATUS: SETTLED & CLEARED
              </p>
              <p className="text-[10px] mt-0.5">Computer-generated receipt, valid without physical seal.</p>
            </div>
            <div className="text-right">
              <span className="text-[11px] font-serif italic text-slate-600 dark:text-slate-300">K. Sivaraman</span>
              <p className="text-[10px] text-slate-400 border-t border-slate-300 dark:border-slate-700 pt-0.5">Accounts Officer</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
