import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import {
  FileText,
  Plus,
  CheckCircle2,
  Clock,
  Upload,
  User,
  Paperclip,
  X,
  Search,
  Award
} from 'lucide-react';
import { Assignment, Submission } from '../../types';

export const TeacherAssignments: React.FC = () => {
  const {
    currentTeacher,
    assignments,
    submissions,
    createAssignment,
    gradeSubmission
  } = useSchool();

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [reviewingSubmission, setReviewingSubmission] = useState<{
    submission: Submission;
    assignment: Assignment;
  } | null>(null);

  // New assignment form state
  const [newAsg, setNewAsg] = useState({
    title: '',
    subject: 'Mathematics',
    class: '10',
    section: 'A',
    description: '',
    dueDate: '2026-10-20',
    maxMarks: 25,
    attachmentName: 'Math_Worksheet_Practice.pdf'
  });

  // Review modal state
  const [gradeScore, setGradeScore] = useState<number>(24);
  const [gradeFeedback, setGradeFeedback] = useState('Well presented calculations and clear steps.');

  const teacherAssignments = assignments.filter((a) => a.teacherId === currentTeacher.id);
  const teacherAsgIds = new Set(teacherAssignments.map((a) => a.id));
  const relevantSubmissions = submissions.filter((s) => teacherAsgIds.has(s.assignmentId));

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAsg.title) return;
    createAssignment({
      ...newAsg,
      teacherId: currentTeacher.id,
      teacherName: currentTeacher.name
    });
    setIsCreateOpen(false);
    setNewAsg({
      title: '',
      subject: 'Mathematics',
      class: '10',
      section: 'A',
      description: '',
      dueDate: '2026-10-20',
      maxMarks: 25,
      attachmentName: 'Math_Worksheet_Practice.pdf'
    });
  };

  const handleGradeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewingSubmission) return;
    gradeSubmission(reviewingSubmission.submission.id, gradeScore, gradeFeedback);
    setReviewingSubmission(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
            Instructional Tasks
          </span>
          <h2 className="font-display font-bold text-2xl text-slate-900 dark:text-white mt-0.5">
            Assignment Manager & Submission Grading
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Author assignments for your classes and evaluate student deliverables
          </p>
        </div>

        <button
          onClick={() => setIsCreateOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Assignment</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Published Assignments */}
        <div className="lg:col-span-7 space-y-4">
          <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
            Published Assignments ({teacherAssignments.length})
          </h3>

          <div className="space-y-4">
            {teacherAssignments.map((asg) => {
              const subsForThis = relevantSubmissions.filter((s) => s.assignmentId === asg.id);
              const reviewedCount = subsForThis.filter((s) => s.status === 'reviewed').length;

              return (
                <div
                  key={asg.id}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-sky-600 dark:text-sky-400">
                      {asg.subject} · Grade {asg.class}-{asg.section}
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      Due: {asg.dueDate}
                    </span>
                  </div>

                  <h4 className="font-display font-bold text-base text-slate-900 dark:text-white">
                    {asg.title}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {asg.description}
                  </p>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
                    <span>
                      Submissions: <strong>{subsForThis.length}</strong> (Reviewed: {reviewedCount})
                    </span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                      Max Marks: {asg.maxMarks}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Submissions Queue */}
        <div className="lg:col-span-5 space-y-4">
          <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
            Student Submissions Queue ({relevantSubmissions.length})
          </h3>

          <div className="space-y-3">
            {relevantSubmissions.length === 0 ? (
              <div className="p-8 text-center text-slate-400 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs">
                No submissions received yet.
              </div>
            ) : (
              relevantSubmissions.map((sub) => {
                const asg = assignments.find((a) => a.id === sub.assignmentId);
                const isReviewed = sub.status === 'reviewed';

                return (
                  <div
                    key={sub.id}
                    className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-slate-900 dark:text-white">
                        {sub.studentName}
                      </span>
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize ${
                          isReviewed
                            ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                            : 'bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300'
                        }`}
                      >
                        {isReviewed ? `Graded: ${sub.score}/${asg?.maxMarks || 25}` : 'Pending Review'}
                      </span>
                    </div>

                    <p className="text-[11px] font-medium text-sky-600 dark:text-sky-400">
                      {asg?.title || 'Assignment'}
                    </p>

                    <p className="text-xs text-slate-600 dark:text-slate-300 italic line-clamp-2">
                      "{sub.content}"
                    </p>

                    <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400">
                      <span>Submitted: {sub.submittedAt}</span>
                      <button
                        onClick={() => {
                          if (asg) {
                            setGradeScore(sub.score || Math.round((asg.maxMarks * 0.9)));
                            setGradeFeedback(sub.feedback || 'Good systematic approach.');
                            setReviewingSubmission({ submission: sub, assignment: asg });
                          }
                        }}
                        className="font-semibold text-sky-600 dark:text-sky-400 hover:underline"
                      >
                        {isReviewed ? 'Edit Grade' : 'Grade Submission →'}
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Create Assignment Modal */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3 border-slate-100 dark:border-slate-800">
              <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
                Create New Class Assignment
              </h3>
              <button
                onClick={() => setIsCreateOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Assignment Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Arithmetic Progression Sum Formula Applications"
                  value={newAsg.title}
                  onChange={(e) => setNewAsg({ ...newAsg, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Grade
                  </label>
                  <select
                    value={newAsg.class}
                    onChange={(e) => setNewAsg({ ...newAsg, class: e.target.value })}
                    className="w-full px-2.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                  >
                    <option value="10">Grade 10</option>
                    <option value="9">Grade 9</option>
                    <option value="11">Grade 11</option>
                  </select>
                </div>
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Section
                  </label>
                  <select
                    value={newAsg.section}
                    onChange={(e) => setNewAsg({ ...newAsg, section: e.target.value })}
                    className="w-full px-2.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                  >
                    <option value="A">Section A</option>
                    <option value="B">Section B</option>
                  </select>
                </div>
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Max Marks
                  </label>
                  <input
                    type="number"
                    value={newAsg.maxMarks}
                    onChange={(e) => setNewAsg({ ...newAsg, maxMarks: parseInt(e.target.value) || 25 })}
                    className="w-full px-2.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Due Deadline Date
                </label>
                <input
                  type="date"
                  value={newAsg.dueDate}
                  onChange={(e) => setNewAsg({ ...newAsg, dueDate: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Detailed Instructions
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Outline questions, step-by-step methodology expectations..."
                  value={newAsg.description}
                  onChange={(e) => setNewAsg({ ...newAsg, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCreateOpen(false)}
                  className="px-4 py-2 text-slate-500 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-lg shadow-sm"
                >
                  Publish to Students
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Review & Grade Modal */}
      {reviewingSubmission && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3 border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
                  Evaluate Student Submission
                </h3>
                <p className="text-xs text-sky-600 dark:text-sky-400">
                  {reviewingSubmission.submission.studentName} · {reviewingSubmission.assignment.title}
                </p>
              </div>
              <button
                onClick={() => setReviewingSubmission(null)}
                className="p-1 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-700 text-xs space-y-1">
              <span className="font-semibold text-slate-700 dark:text-slate-300">Submitted Notes:</span>
              <p className="text-slate-600 dark:text-slate-400 italic">
                "{reviewingSubmission.submission.content}"
              </p>
              <div className="pt-1 flex items-center gap-1.5 text-sky-600 dark:text-sky-400">
                <Paperclip className="w-3.5 h-3.5" />
                <span>{reviewingSubmission.submission.attachmentName || 'Work_Submission.pdf'}</span>
              </div>
            </div>

            <form onSubmit={handleGradeSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Awarded Marks (Out of {reviewingSubmission.assignment.maxMarks})
                </label>
                <input
                  type="number"
                  min={0}
                  max={reviewingSubmission.assignment.maxMarks}
                  value={gradeScore}
                  onChange={(e) => setGradeScore(parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono text-sm font-bold"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Faculty Constructive Feedback
                </label>
                <textarea
                  rows={3}
                  required
                  value={gradeFeedback}
                  onChange={(e) => setGradeFeedback(e.target.value)}
                  placeholder="Provide pedagogical feedback and suggestions..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setReviewingSubmission(null)}
                  className="px-4 py-2 text-slate-500 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg shadow-sm"
                >
                  Save Grade & Return Feedback
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
