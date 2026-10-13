import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import {
  FileText,
  Upload,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileCheck,
  Search,
  Paperclip,
  X
} from 'lucide-react';
import { Assignment } from '../../types';

export const StudentAssignments: React.FC = () => {
  const { currentStudent, assignments, submissions, submitAssignment } = useSchool();

  const [activeFilter, setActiveFilter] = useState<'all' | 'pending' | 'submitted' | 'reviewed'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [submittingAssignment, setSubmittingAssignment] = useState<Assignment | null>(null);
  const [submissionNotes, setSubmissionNotes] = useState('');
  const [attachmentFile, setAttachmentFile] = useState('Homework_Completed_Submission.pdf');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Filter assignments for student's class
  const classAssignments = assignments.filter(
    (a) => a.class === currentStudent.class && (a.section === currentStudent.section || a.section === 'All')
  );

  const getStatus = (asgId: string) => {
    const sub = submissions.find((s) => s.assignmentId === asgId && s.studentId === currentStudent.id);
    if (!sub) return 'pending';
    return sub.status; // 'submitted' or 'reviewed'
  };

  const getSubmission = (asgId: string) => {
    return submissions.find((s) => s.assignmentId === asgId && s.studentId === currentStudent.id);
  };

  const filteredAssignments = classAssignments.filter((asg) => {
    const status = getStatus(asg.id);
    const matchesFilter =
      activeFilter === 'all' ||
      (activeFilter === 'pending' && status === 'pending') ||
      (activeFilter === 'submitted' && status === 'submitted') ||
      (activeFilter === 'reviewed' && status === 'reviewed');

    const matchesSearch =
      asg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asg.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asg.teacherName.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!submittingAssignment) return;
    setIsSubmitting(true);

    setTimeout(() => {
      submitAssignment(submittingAssignment.id, submissionNotes || 'Completed homework solution attached.', attachmentFile);
      setIsSubmitting(false);
      setSubmittingAssignment(null);
      setSubmissionNotes('');
    }, 400);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl student-card-glass border-t-4 border-sky-500 shadow-lg">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
            Coursework & Projects
          </span>
          <h2 className="font-display font-bold text-2xl text-slate-900 dark:text-white mt-0.5">
            Class Assignments & Submissions
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Grade {currentStudent.class}-{currentStudent.section} coursework assigned by your faculty
          </p>
        </div>

        {/* Filter controls */}
        <div className="flex items-center gap-1 p-1 bg-slate-100/80 dark:bg-slate-800/80 rounded-xl self-start sm:self-auto border border-slate-200/50 dark:border-slate-700/50">
          {(['all', 'pending', 'submitted', 'reviewed'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg capitalize transition-colors cursor-pointer ${
                activeFilter === tab
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Filter by title, subject or teacher..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 student-card-glass rounded-xl text-xs focus:outline-hidden focus:border-sky-500"
        />
      </div>

      {/* Assignment Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredAssignments.length === 0 ? (
          <div className="col-span-2 text-center py-16 student-card-glass rounded-3xl">
            <FileText className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">No assignments found</p>
            <p className="text-xs text-slate-500">You are all caught up on this category.</p>
          </div>
        ) : (
          filteredAssignments.map((asg) => {
            const status = getStatus(asg.id);
            const sub = getSubmission(asg.id);

            return (
              <div
                key={asg.id}
                className="p-5 rounded-3xl student-card-glass shadow-sm flex flex-col justify-between space-y-4 hover:border-sky-400/80 dark:hover:border-sky-500/80 hover:shadow-md transition-all"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-semibold text-sky-600 dark:text-sky-400">
                      {asg.subject}
                    </span>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize ${
                        status === 'reviewed'
                          ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300'
                          : status === 'submitted'
                          ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300'
                          : 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300'
                      }`}
                    >
                      {status === 'pending' ? 'Pending Submission' : status}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
                    {asg.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {asg.description}
                  </p>

                  <div className="text-[11px] text-slate-400 space-y-0.5 pt-1">
                    <p>Assigned by: <strong className="text-slate-700 dark:text-slate-300">{asg.teacherName}</strong></p>
                    <p className="flex items-center gap-1.5 text-rose-600 dark:text-rose-400 font-medium">
                      <Clock className="w-3.5 h-3.5" /> Due: {asg.dueDate} (Max Marks: {asg.maxMarks})
                    </p>
                  </div>

                  {asg.attachmentName && (
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-[11px] text-slate-600 dark:text-slate-300 mt-1">
                      <Paperclip className="w-3 h-3 text-sky-500" />
                      <span>{asg.attachmentName}</span>
                    </div>
                  )}
                </div>

                {/* Submission Details / Action Button */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                  {status === 'pending' ? (
                    <button
                      onClick={() => setSubmittingAssignment(asg)}
                      className="w-full py-2.5 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-700 rounded-xl transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload & Submit Work</span>
                    </button>
                  ) : status === 'submitted' ? (
                    <div className="bg-blue-50/60 dark:bg-blue-950/30 p-3 rounded-xl border border-blue-100 dark:border-blue-900 text-xs">
                      <div className="flex items-center justify-between text-blue-700 dark:text-blue-300 font-medium">
                        <span className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Work Submitted
                        </span>
                        <span className="text-[10px] text-slate-400">{sub?.submittedAt}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1">Awaiting evaluation by {asg.teacherName}</p>
                    </div>
                  ) : (
                    <div className="bg-emerald-50/60 dark:bg-emerald-950/30 p-3 rounded-xl border border-emerald-100 dark:border-emerald-900 text-xs space-y-1">
                      <div className="flex items-center justify-between text-emerald-800 dark:text-emerald-300 font-bold">
                        <span>Evaluated & Graded</span>
                        <span className="text-sm font-mono">{sub?.score} / {asg.maxMarks}</span>
                      </div>
                      {sub?.feedback && (
                        <p className="text-[11px] text-slate-600 dark:text-slate-300 italic">
                          Feedback: "{sub.feedback}"
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Submission Modal */}
      {submittingAssignment && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3 border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
                  Submit Assignment
                </h3>
                <p className="text-xs text-sky-600 dark:text-sky-400">{submittingAssignment.title}</p>
              </div>
              <button
                onClick={() => setSubmittingAssignment(null)}
                className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Upload Assignment File (PDF / DOCX / Code)
                </label>
                <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-4 text-center hover:bg-slate-50 dark:hover:bg-slate-800/40 cursor-pointer">
                  <Upload className="w-6 h-6 text-sky-500 mx-auto mb-1" />
                  <p className="font-medium text-slate-700 dark:text-slate-300">{attachmentFile}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Click to simulate attaching completed file (1.4 MB)</p>
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Student Comments / Notes for {submittingAssignment.teacherName}
                </label>
                <textarea
                  rows={3}
                  placeholder="Summarize your solution or mention any references used..."
                  value={submissionNotes}
                  onChange={(e) => setSubmissionNotes(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:border-sky-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSubmittingAssignment(null)}
                  className="px-4 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-lg shadow-sm transition-colors"
                >
                  {isSubmitting ? 'Submitting...' : 'Confirm Submission'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
