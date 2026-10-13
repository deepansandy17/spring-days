import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import {
  BookOpen,
  Search,
  Download,
  Star,
  Eye,
  FileText,
  Video,
  FileCode,
  Folder,
  X,
  Check
} from 'lucide-react';
import { LearningMaterial } from '../../types';

export const StudentMaterials: React.FC = () => {
  const { materials, toggleFavoriteMaterial } = useSchool();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [previewMaterial, setPreviewMaterial] = useState<LearningMaterial | null>(null);
  const [downloadToast, setDownloadToast] = useState<string | null>(null);

  const categories = [
    'All',
    'Textbooks',
    'Lecture Notes',
    'Question Papers',
    'Revision Materials',
    'Syllabus'
  ];

  const filtered = materials.filter((m) => {
    const matchesCat = selectedCategory === 'All' || m.category === selectedCategory;
    const matchesSearch =
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.uploadedBy.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleDownload = (m: LearningMaterial) => {
    setDownloadToast(`Downloading "${m.title}" (${m.fileSize})...`);
    setTimeout(() => setDownloadToast(null), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Toast */}
      {downloadToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs px-4 py-2.5 rounded-xl shadow-lg border border-slate-700 flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{downloadToast}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl student-card-glass border-t-4 border-emerald-500 shadow-lg">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            Digital Repository
          </span>
          <h2 className="font-display font-bold text-2xl text-slate-900 dark:text-white mt-0.5">
            Learning Materials & Question Banks
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Official teacher notes, past board questions, and digital textbooks
          </p>
        </div>

        {/* Search */}
        <div className="relative max-w-xs w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search resources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-white/70 dark:bg-slate-800/70 border border-slate-200/60 dark:border-slate-700/60 rounded-xl text-xs focus:outline-hidden focus:border-emerald-500"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
              selectedCategory === cat
                ? 'bg-emerald-600 text-white shadow-xs font-bold'
                : 'bg-white/80 dark:bg-slate-900/80 text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-800/60 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Materials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((mat) => (
          <div
            key={mat.id}
            className="p-5 rounded-3xl student-card-glass border-t-4 border-emerald-500 shadow-sm flex flex-col justify-between space-y-4 hover:border-emerald-400/80 transition-all hover:scale-[1.01]"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 uppercase">
                  {mat.fileType} · {mat.fileSize}
                </span>
                <button
                  onClick={() => toggleFavoriteMaterial(mat.id)}
                  className="p-1 text-slate-400 hover:text-amber-500"
                  title="Favorite"
                >
                  <Star
                    className={`w-4 h-4 ${
                      mat.isFavorite ? 'fill-amber-400 text-amber-400' : ''
                    }`}
                  />
                </button>
              </div>

              <span className="text-xs font-semibold text-sky-600 dark:text-sky-400 block">
                {mat.subject} · {mat.category}
              </span>

              <h3 className="font-display font-bold text-base text-slate-900 dark:text-white line-clamp-2">
                {mat.title}
              </h3>

              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                {mat.description}
              </p>

              <p className="text-[11px] text-slate-400 pt-1">
                By {mat.uploadedBy} · {mat.uploadDate}
              </p>
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
              <button
                onClick={() => setPreviewMaterial(mat)}
                className="flex-1 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg flex items-center justify-center gap-1.5 transition-colors"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Quick Preview</span>
              </button>
              <button
                onClick={() => handleDownload(mat)}
                className="flex-1 py-2 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-700 rounded-lg flex items-center justify-center gap-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Preview Modal */}
      {previewMaterial && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-start justify-between border-b pb-3 border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-[10px] font-bold text-sky-600 dark:text-sky-400 uppercase">
                  {previewMaterial.category} ({previewMaterial.fileType})
                </span>
                <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white mt-0.5">
                  {previewMaterial.title}
                </h3>
              </div>
              <button
                onClick={() => setPreviewMaterial(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2 text-xs">
              <p className="font-semibold text-slate-800 dark:text-slate-200">
                Resource Overview:
              </p>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {previewMaterial.description}
              </p>
              <div className="grid grid-cols-2 gap-2 pt-2 text-[11px] text-slate-500">
                <p>Instructor: <strong>{previewMaterial.uploadedBy}</strong></p>
                <p>Date Published: <strong>{previewMaterial.uploadDate}</strong></p>
                <p>File Size: <strong>{previewMaterial.fileSize}</strong></p>
                <p>Class: <strong>Grade {previewMaterial.class}</strong></p>
              </div>
            </div>

            {/* Simulated document pages */}
            <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-6 bg-white dark:bg-slate-950 text-center space-y-2">
              <FileText className="w-12 h-12 text-sky-500 mx-auto" />
              <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Document Preview (Page 1 of 18)
              </p>
              <p className="text-[11px] text-slate-400 max-w-md mx-auto">
                "Chapter Exemplar 4.2: Standard quadratic roots derivation using completion of squares method with accompanying geometric visualizations."
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setPreviewMaterial(null)}
                className="px-4 py-2 text-xs text-slate-600 dark:text-slate-400 hover:bg-slate-100 rounded-lg"
              >
                Close
              </button>
              <button
                onClick={() => {
                  handleDownload(previewMaterial);
                  setPreviewMaterial(null);
                }}
                className="px-5 py-2 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-700 rounded-lg"
              >
                Download Document ({previewMaterial.fileSize})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
