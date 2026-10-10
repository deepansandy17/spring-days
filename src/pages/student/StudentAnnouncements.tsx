import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { Bell, Pin, Search, Calendar, UserCheck } from 'lucide-react';

export const StudentAnnouncements: React.FC = () => {
  const { announcements } = useSchool();
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = announcements.filter((ann) => {
    const matchesCat = filterCategory === 'all' || ann.category.toLowerCase() === filterCategory.toLowerCase();
    const matchesSearch =
      ann.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ann.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
            Official Circulars
          </span>
          <h2 className="font-display font-bold text-2xl text-slate-900 dark:text-white mt-0.5">
            School Notices & Circulars
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Authoritative communications from the Principal, Vice Principal & Academic Coordinator
          </p>
        </div>

        {/* Search */}
        <div className="relative max-w-xs w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search circulars..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:outline-hidden focus:border-sky-500"
          />
        </div>
      </div>

      <div className="space-y-4">
        {filtered.map((ann) => (
          <div
            key={ann.id}
            className={`p-6 rounded-2xl bg-white dark:bg-slate-900 border shadow-xs space-y-3 transition-all ${
              ann.isPinned
                ? 'border-sky-300 dark:border-sky-800 ring-1 ring-sky-500/10'
                : 'border-slate-200 dark:border-slate-800'
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-sky-50 dark:bg-sky-950 text-sky-700 dark:text-sky-300 uppercase">
                  {ann.category}
                </span>
                {ann.isPinned && (
                  <span className="flex items-center gap-1 text-[10px] font-semibold text-amber-600 dark:text-amber-400">
                    <Pin className="w-3 h-3" /> Pinned Circular
                  </span>
                )}
              </div>
              <span className="text-xs text-slate-400">{ann.date}</span>
            </div>

            <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
              {ann.title}
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
              {ann.content}
            </p>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
              <div className="flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5 text-sky-500" />
                <span>Issued by: <strong>{ann.publishedBy}</strong> ({ann.publishedRole})</span>
              </div>
              <span>Chennai Public School Administrative Cell</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
