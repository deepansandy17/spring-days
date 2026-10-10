import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { Bell, Plus, Pin, Send, Trash2, CheckCircle2 } from 'lucide-react';
import { Announcement } from '../../types';

export const AdminAnnouncements: React.FC = () => {
  const { currentAdmin, announcements, createAnnouncement } = useSchool();
  const [isPublishOpen, setIsPublishOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [form, setForm] = useState({
    title: '',
    content: '',
    category: 'Academic' as Announcement['category'],
    targetAudience: 'all' as Announcement['targetAudience'],
    isPinned: false
  });

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.content) return;
    createAnnouncement({
      ...form,
      publishedBy: currentAdmin.name,
      publishedRole: currentAdmin.designation
    });
    setIsPublishOpen(false);
    setToastMessage('Circular successfully published across school portals!');
    setTimeout(() => setToastMessage(null), 3000);
    setForm({
      title: '',
      content: '',
      category: 'Academic',
      targetAudience: 'all',
      isPinned: false
    });
  };

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs px-4 py-2.5 rounded-xl shadow-lg border border-slate-700 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
            Institutional Notices
          </span>
          <h2 className="font-display font-bold text-2xl text-slate-900 dark:text-white mt-0.5">
            School Announcements & Circular Broadcast
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Publish school-wide circulars with targeted audience delivery and notification pushes
          </p>
        </div>

        <button
          onClick={() => setIsPublishOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Publish New Notice</span>
        </button>
      </div>

      {/* Published List */}
      <div className="space-y-4">
        {announcements.map((ann) => (
          <div
            key={ann.id}
            className={`p-6 rounded-2xl bg-white dark:bg-slate-900 border shadow-xs space-y-3 ${
              ann.isPinned
                ? 'border-sky-300 dark:border-sky-800 ring-1 ring-sky-500/10'
                : 'border-slate-200 dark:border-slate-800'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-sky-50 dark:bg-sky-950 text-sky-700 dark:text-sky-300 uppercase">
                  {ann.category}
                </span>
                <span className="text-[10px] font-semibold text-slate-400">
                  Target: {ann.targetAudience.toUpperCase()}
                </span>
                {ann.isPinned && (
                  <span className="flex items-center gap-1 text-[10px] font-semibold text-amber-600">
                    <Pin className="w-3 h-3" /> Pinned
                  </span>
                )}
              </div>
              <span className="text-xs text-slate-400">{ann.date}</span>
            </div>

            <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
              {ann.title}
            </h3>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
              {ann.content}
            </p>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400">
              Published by: <strong>{ann.publishedBy}</strong> ({ann.publishedRole})
            </div>
          </div>
        ))}
      </div>

      {/* Publish Modal */}
      {isPublishOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3 border-slate-100 dark:border-slate-800">
              <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
                Draft Official School Notice
              </h3>
              <button onClick={() => setIsPublishOpen(false)} className="text-slate-400">✕</button>
            </div>

            <form onSubmit={handlePublish} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Notice Headline *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Schedule for Mid-Term Laboratory Practicals"
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
                    <option value="Academic">Academic</option>
                    <option value="Events">Events</option>
                    <option value="Urgent">Urgent Alert</option>
                    <option value="Holidays">Holidays</option>
                    <option value="General">General</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Target Audience</label>
                  <select
                    value={form.targetAudience}
                    onChange={(e) => setForm({ ...form, targetAudience: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                  >
                    <option value="all">All School (Students & Staff)</option>
                    <option value="students">Students Only</option>
                    <option value="teachers">Teaching Faculty Only</option>
                    <option value="class-10">Grade 10 Specifically</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Notice Body *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Official instructions and circular details..."
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="pinnedCheck"
                  checked={form.isPinned}
                  onChange={(e) => setForm({ ...form, isPinned: e.target.checked })}
                  className="w-4 h-4 text-sky-600 rounded-sm"
                />
                <label htmlFor="pinnedCheck" className="text-slate-600 dark:text-slate-300">
                  Pin this circular to the top of all dashboards
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsPublishOpen(false)}
                  className="px-4 py-2 text-slate-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-sky-600 text-white font-semibold rounded-lg shadow-sm"
                >
                  Broadcast Notice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
