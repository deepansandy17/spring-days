import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { BookOpen, Plus, Upload, Download, Trash2, FileText, CheckCircle2, X } from 'lucide-react';
import { LearningMaterial } from '../../types';

export const TeacherMaterials: React.FC = () => {
  const { currentTeacher, materials, addLearningMaterial } = useSchool();
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  const [form, setForm] = useState({
    title: '',
    category: 'Lecture Notes' as LearningMaterial['category'],
    subject: 'Mathematics',
    class: '10',
    fileSize: '6.4 MB',
    fileType: 'PDF' as LearningMaterial['fileType'],
    description: ''
  });

  const teacherMaterials = materials.filter(
    (m) => m.uploadedBy.includes('Meenakshi') || m.subject === 'Mathematics'
  );

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title) return;
    addLearningMaterial({
      ...form,
      uploadedBy: currentTeacher.name
    });
    setIsUploadOpen(false);
    setForm({
      title: '',
      category: 'Lecture Notes',
      subject: 'Mathematics',
      class: '10',
      fileSize: '6.4 MB',
      fileType: 'PDF',
      description: ''
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl teacher-card-executive">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Repository Management
          </span>
          <h2 className="font-display font-bold text-2xl text-slate-900 dark:text-white mt-0.5">
            Class Learning Materials Library
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Upload question banks, formula booklets, and slide presentations for your students
          </p>
        </div>

        <button
          onClick={() => setIsUploadOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-all self-start sm:self-auto border border-slate-700"
        >
          <Upload className="w-4 h-4" />
          <span>Upload Study Material</span>
        </button>
      </div>

      {/* Grid of Materials */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {teacherMaterials.map((mat) => (
          <div
            key={mat.id}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-sky-50 dark:bg-sky-950 text-sky-700 dark:text-sky-300 uppercase">
                  {mat.category}
                </span>
                <span className="text-[10px] text-slate-400">{mat.fileSize} · {mat.fileType}</span>
              </div>

              <h4 className="font-display font-bold text-base text-slate-900 dark:text-white">
                {mat.title}
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                {mat.description}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
              <span>{mat.downloadCount} student downloads</span>
              <span>{mat.uploadDate}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Modal */}
      {isUploadOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3 border-slate-100 dark:border-slate-800">
              <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
                Upload New Study Material
              </h3>
              <button onClick={() => setIsUploadOpen(false)} className="text-slate-400">✕</button>
            </div>

            <form onSubmit={handleUpload} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Resource Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Chapter 4 Solved Board Exam Questions"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                  >
                    <option value="Lecture Notes">Lecture Notes</option>
                    <option value="Question Papers">Question Papers</option>
                    <option value="Revision Materials">Revision Materials</option>
                    <option value="Textbooks">Textbooks</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Target Class</label>
                  <select
                    value={form.class}
                    onChange={(e) => setForm({ ...form, class: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                  >
                    <option value="10">Grade 10</option>
                    <option value="9">Grade 9</option>
                    <option value="11">Grade 11</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Description / Table of Contents</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Summarize the concepts covered in this handout..."
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsUploadOpen(false)}
                  className="px-4 py-2 text-slate-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-sky-600 text-white font-semibold rounded-lg"
                >
                  Upload & Share
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
