import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { Layers, Plus, CheckCircle2, Clock, BookOpen, X } from 'lucide-react';
import { LessonPlan } from '../../types';

export const TeacherLessonPlanner: React.FC = () => {
  const { currentTeacher, lessonPlans } = useSchool();
  const [plans, setPlans] = useState<LessonPlan[]>(lessonPlans);
  const [isAddOpen, setIsAddOpen] = useState(false);

  const [newPlan, setNewPlan] = useState({
    class: '10',
    subject: 'Mathematics',
    unit: 'Unit 9: Coordinate Geometry',
    topic: 'Section Formula & Distance Derivations',
    date: '2026-10-22',
    learningObjectives: 'Students will apply Cartesian coordinate coordinates to partition line segments in ratio m:n.',
    activities: 'Interactive coordinate graphing on millimeter grid sheet.',
    homework: 'Chapter 9 Exercise 9.1 Questions 1 to 6.',
    syllabusProgress: 45
  });

  const handleAddPlan = (e: React.FormEvent) => {
    e.preventDefault();
    const created: LessonPlan = {
      ...newPlan,
      id: `lp-${Date.now()}`,
      teacherId: currentTeacher.id,
      status: 'planned'
    };
    setPlans([created, ...plans]);
    setIsAddOpen(false);
  };

  // Syllabus progress milestones
  const syllabusModules = [
    { name: 'Unit 1: Real Numbers & Euclid Division', progress: 100 },
    { name: 'Unit 2: Polynomials & Factoring', progress: 100 },
    { name: 'Unit 3: Pair of Linear Equations', progress: 100 },
    { name: 'Unit 4: Quadratic Equations', progress: 100 },
    { name: 'Unit 5: Arithmetic Progressions', progress: 75 },
    { name: 'Unit 6: Triangles & Similarity Theorems', progress: 60 },
    { name: 'Unit 7: Introduction to Trigonometry', progress: 35 },
    { name: 'Unit 8: Statistics & Probability', progress: 15 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
            Curriculum Delivery
          </span>
          <h2 className="font-display font-bold text-2xl text-slate-900 dark:text-white mt-0.5">
            Lesson Planner & Syllabus Tracking
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Grade 10 Mathematics · Academic Year 2026–27 CBSE Pedagogical Framework
          </p>
        </div>

        <button
          onClick={() => setIsAddOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Lesson Plan</span>
        </button>
      </div>

      {/* Syllabus Progress Tracking Card */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-display font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-sky-600 dark:text-sky-400" />
            <span>Syllabus Completion Index (Term 1 & 2)</span>
          </h3>
          <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            Term 1 Target: 100% on Track
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          {syllabusModules.map((mod, idx) => (
            <div key={idx} className="space-y-1.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-slate-800 dark:text-slate-200">{mod.name}</span>
                <span className="font-mono font-bold text-sky-600 dark:text-sky-400 tabular-nums">
                  {mod.progress}%
                </span>
              </div>
              <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${
                    mod.progress === 100 ? 'bg-emerald-500' : mod.progress >= 50 ? 'bg-sky-500' : 'bg-amber-500'
                  }`}
                  style={{ width: `${mod.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Structured Lesson Plans List */}
      <div className="space-y-4">
        <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
          Scheduled Lesson Plans
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {plans.map((lp) => (
            <div
              key={lp.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-sky-600 dark:text-sky-400">
                    {lp.unit}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">{lp.date}</span>
                </div>

                <h4 className="font-display font-bold text-base text-slate-900 dark:text-white">
                  {lp.topic}
                </h4>

                <div className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5 pt-1">
                  <div>
                    <span className="font-semibold text-slate-700 dark:text-slate-200 block text-[11px]">
                      Learning Objectives:
                    </span>
                    <p className="line-clamp-2 text-slate-500">{lp.learningObjectives}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-700 dark:text-slate-200 block text-[11px]">
                      Class Activities:
                    </span>
                    <p className="line-clamp-1 text-slate-500">{lp.activities}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-700 dark:text-slate-200 block text-[11px]">
                      Homework / Practice:
                    </span>
                    <p className="line-clamp-1 text-slate-500">{lp.homework}</p>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px]">
                <span className="text-slate-400">Class: Grade {lp.class}</span>
                <span className="px-2 py-0.5 rounded-md font-semibold bg-sky-50 dark:bg-sky-950 text-sky-700 dark:text-sky-300 capitalize">
                  {lp.status.replace('_', ' ')}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Plan Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3 border-slate-100 dark:border-slate-800">
              <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
                Create New Lesson Plan
              </h3>
              <button onClick={() => setIsAddOpen(false)} className="text-slate-400">✕</button>
            </div>

            <form onSubmit={handleAddPlan} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Unit Title</label>
                <input
                  type="text"
                  required
                  value={newPlan.unit}
                  onChange={(e) => setNewPlan({ ...newPlan, unit: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Lesson Topic</label>
                <input
                  type="text"
                  required
                  value={newPlan.topic}
                  onChange={(e) => setNewPlan({ ...newPlan, topic: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Learning Objectives</label>
                <textarea
                  rows={2}
                  required
                  value={newPlan.learningObjectives}
                  onChange={(e) => setNewPlan({ ...newPlan, learningObjectives: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Activities & Homework</label>
                <input
                  type="text"
                  required
                  value={newPlan.homework}
                  onChange={(e) => setNewPlan({ ...newPlan, homework: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddOpen(false)}
                  className="px-4 py-2 text-slate-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-sky-600 text-white font-semibold rounded-lg"
                >
                  Save Plan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
