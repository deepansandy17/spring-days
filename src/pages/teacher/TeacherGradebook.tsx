import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { Award, Save, CheckCircle2, Search, Filter } from 'lucide-react';
import { SubjectMark } from '../../types';

export const TeacherGradebook: React.FC = () => {
  const { currentTeacher, students, marks, saveMarks } = useSchool();

  const [selectedClass, setSelectedClass] = useState('10');
  const [selectedSection, setSelectedSection] = useState('A');
  const [selectedSubject, setSelectedSubject] = useState('Mathematics');
  const [selectedExam, setSelectedExam] = useState('Mid-Term Assessment 2026');
  const [searchQuery, setSearchQuery] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const classStudents = students.filter(
    (s) => s.class === selectedClass && s.section === selectedSection
  );

  // Helper to calculate grade
  const computeGrade = (total: number): SubjectMark['grade'] => {
    if (total >= 90) return 'A+';
    if (total >= 80) return 'A';
    if (total >= 70) return 'B+';
    if (total >= 60) return 'B';
    if (total >= 50) return 'C';
    if (total >= 40) return 'D';
    return 'F';
  };

  // Local state map for mark entries
  const [marksMap, setMarksMap] = useState<
    Record<
      string,
      {
        internal: number;
        test: number;
        exam: number;
        remarks: string;
      }
    >
  >(() => {
    const initial: Record<
      string,
      {
        internal: number;
        test: number;
        exam: number;
        remarks: string;
      }
    > = {};

    classStudents.forEach((stu) => {
      const existing = marks.find(
        (m) =>
          m.studentId === stu.id &&
          m.subject === selectedSubject &&
          m.examName === selectedExam
      );
      if (existing) {
        initial[stu.id] = {
          internal: existing.internalMarks,
          test: existing.testMarks,
          exam: existing.examMarks,
          remarks: existing.teacherRemarks || ''
        };
      } else {
        // Generative reasonable starting marks
        const base = Math.min(96, Math.max(68, Math.round(stu.attendanceRate * 0.9)));
        initial[stu.id] = {
          internal: 18,
          test: 26,
          exam: Math.round(base * 0.5),
          remarks: 'Good analytical aptitude'
        };
      }
    });

    return initial;
  });

  const handleMarkChange = (
    studentId: string,
    field: 'internal' | 'test' | 'exam',
    value: number
  ) => {
    const max = field === 'internal' ? 20 : field === 'test' ? 30 : 50;
    const clamped = Math.max(0, Math.min(max, isNaN(value) ? 0 : value));
    setMarksMap((prev) => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [field]: clamped
      }
    }));
  };

  const handleRemarksChange = (studentId: string, remarks: string) => {
    setMarksMap((prev) => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        remarks
      }
    }));
  };

  const handleSaveMarks = () => {
    const newRecords: SubjectMark[] = classStudents.map((stu) => {
      const entry = marksMap[stu.id] || { internal: 18, test: 25, exam: 42, remarks: 'Good' };
      const total = entry.internal + entry.test + entry.exam;
      return {
        id: `mrk-${stu.id}-${selectedSubject}-${selectedExam}`,
        studentId: stu.id,
        class: selectedClass,
        section: selectedSection,
        subject: selectedSubject,
        examName: selectedExam,
        internalMarks: entry.internal,
        testMarks: entry.test,
        examMarks: entry.exam,
        total,
        grade: computeGrade(total),
        teacherRemarks: entry.remarks
      };
    });

    saveMarks(newRecords);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const filtered = classStudents.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.rollNo.toString().includes(searchQuery)
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl teacher-card-executive">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Assessment Portal
          </span>
          <h2 className="font-display font-bold text-2xl text-slate-900 dark:text-white mt-0.5">
            Teacher Gradebook & Marks Entry
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Auto-calculating total scores, percentage, and CBSE grade scale
          </p>
        </div>

        {savedSuccess && (
          <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold bg-emerald-50 dark:bg-emerald-950 px-3 py-1.5 rounded-lg border border-emerald-200">
            <CheckCircle2 className="w-4 h-4" />
            <span>Marks Published to Student Portals!</span>
          </div>
        )}
      </div>

      {/* Control Strip */}
      <div className="p-4 rounded-2xl teacher-card-executive flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex flex-wrap items-center gap-3">
          <div>
            <label className="block text-slate-400 text-[10px] uppercase font-bold mb-1">Grade</label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-medium"
            >
              <option value="10">Grade 10</option>
              <option value="9">Grade 9</option>
              <option value="11">Grade 11</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-400 text-[10px] uppercase font-bold mb-1">Section</label>
            <select
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-medium"
            >
              <option value="A">Section A</option>
              <option value="B">Section B</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-400 text-[10px] uppercase font-bold mb-1">Subject</label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-medium"
            >
              <option value="Mathematics">Mathematics</option>
              <option value="Physics">Physics</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Computer Science">Computer Science</option>
              <option value="English">English</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-400 text-[10px] uppercase font-bold mb-1">Assessment</label>
            <select
              value={selectedExam}
              onChange={(e) => setSelectedExam(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-medium"
            >
              <option value="Mid-Term Assessment 2026">Mid-Term Assessment 2026</option>
              <option value="Unit Test 1">Unit Test 1</option>
              <option value="Pre-Board Examination">Pre-Board Examination</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleSaveMarks}
          className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-semibold flex items-center gap-1.5 shadow-sm transition-colors"
        >
          <Save className="w-4 h-4" />
          <span>Save & Publish Marks</span>
        </button>
      </div>

      {/* Marks Table */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="relative max-w-xs w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by student name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:outline-hidden focus:border-sky-500"
            />
          </div>
          <span className="text-xs text-slate-400">{filtered.length} students enrolled</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left min-w-[700px]">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 uppercase text-[10px] tracking-wider border-y border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3 px-3 font-semibold w-16">Roll</th>
                <th className="py-3 px-3 font-semibold">Student Name</th>
                <th className="py-3 px-3 text-center font-semibold w-24">Internal (20)</th>
                <th className="py-3 px-3 text-center font-semibold w-24">Test (30)</th>
                <th className="py-3 px-3 text-center font-semibold w-24">Exam (50)</th>
                <th className="py-3 px-3 text-right font-semibold w-24">Total (100)</th>
                <th className="py-3 px-3 text-center font-semibold w-16">Grade</th>
                <th className="py-3 px-3 font-semibold">Teacher Observation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filtered.map((stu) => {
                const entry = marksMap[stu.id] || { internal: 18, test: 25, exam: 42, remarks: '' };
                const total = entry.internal + entry.test + entry.exam;
                const grade = computeGrade(total);

                return (
                  <tr key={stu.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                    <td className="py-3 px-3 font-mono text-slate-500 tabular-nums">
                      #{stu.rollNo}
                    </td>
                    <td className="py-3 px-3 font-semibold text-slate-900 dark:text-white">
                      {stu.name}
                      {stu.id === 'student-demo-01' && (
                        <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded-sm bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300 font-semibold">
                          Demo Student
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-3 text-center">
                      <input
                        type="number"
                        min={0}
                        max={20}
                        value={entry.internal}
                        onChange={(e) => handleMarkChange(stu.id, 'internal', parseInt(e.target.value) || 0)}
                        className="w-16 px-2 py-1 text-center font-mono rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:border-sky-500 tabular-nums"
                      />
                    </td>
                    <td className="py-3 px-3 text-center">
                      <input
                        type="number"
                        min={0}
                        max={30}
                        value={entry.test}
                        onChange={(e) => handleMarkChange(stu.id, 'test', parseInt(e.target.value) || 0)}
                        className="w-16 px-2 py-1 text-center font-mono rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:border-sky-500 tabular-nums"
                      />
                    </td>
                    <td className="py-3 px-3 text-center">
                      <input
                        type="number"
                        min={0}
                        max={50}
                        value={entry.exam}
                        onChange={(e) => handleMarkChange(stu.id, 'exam', parseInt(e.target.value) || 0)}
                        className="w-16 px-2 py-1 text-center font-mono rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:border-sky-500 tabular-nums"
                      />
                    </td>
                    <td className="py-3 px-3 text-right font-mono font-bold text-slate-900 dark:text-white tabular-nums">
                      {total}
                    </td>
                    <td className="py-3 px-3 text-center">
                      <span className="font-bold text-sky-600 dark:text-sky-400">
                        {grade}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <input
                        type="text"
                        placeholder="Add constructive remark..."
                        value={entry.remarks}
                        onChange={(e) => handleRemarksChange(stu.id, e.target.value)}
                        className="w-full px-2 py-1 text-[11px] rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent text-slate-700 dark:text-slate-300 focus:outline-hidden focus:border-sky-500"
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
