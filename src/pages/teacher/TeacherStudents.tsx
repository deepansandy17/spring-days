import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { Users, Search, Phone, Mail, Award, CheckCircle2, FileText, ChevronRight } from 'lucide-react';
import { StudentProfile } from '../../types';

export const TeacherStudents: React.FC = () => {
  const { currentTeacher, students, marks } = useSchool();
  const [selectedClass, setSelectedClass] = useState('10');
  const [selectedSection, setSelectedSection] = useState('A');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeStudentModal, setActiveStudentModal] = useState<StudentProfile | null>(null);

  const classStudents = students.filter(
    (s) => s.class === selectedClass && s.section === selectedSection
  );

  const filtered = classStudents.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.rollNo.toString().includes(searchQuery)
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl teacher-card-executive">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Student Roster
          </span>
          <h2 className="font-display font-bold text-2xl text-slate-900 dark:text-white mt-0.5">
            Classroom Student Information
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Grade {selectedClass}-{selectedSection} student profiles, attendance metrics, and parental contacts
          </p>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2">
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-medium"
          >
            <option value="10">Grade 10</option>
            <option value="9">Grade 9</option>
            <option value="11">Grade 11</option>
          </select>
          <select
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
            className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-medium"
          >
            <option value="A">Section A</option>
            <option value="B">Section B</option>
          </select>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-xs">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search student or roll no..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs focus:outline-hidden focus:border-sky-500"
        />
      </div>

      {/* Student Directory Table */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left min-w-[650px]">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 uppercase text-[10px] tracking-wider border-y border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3 px-3 font-semibold w-16">Roll</th>
                <th className="py-3 px-3 font-semibold">Student Name</th>
                <th className="py-3 px-3 font-semibold">Student ID</th>
                <th className="py-3 px-3 font-semibold">Parent / Guardian</th>
                <th className="py-3 px-3 font-semibold">Contact</th>
                <th className="py-3 px-3 text-center font-semibold">Attendance</th>
                <th className="py-3 px-3 text-right font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filtered.map((stu) => (
                <tr key={stu.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                  <td className="py-3 px-3 font-mono text-slate-500 tabular-nums">
                    #{stu.rollNo}
                  </td>
                  <td className="py-3 px-3 font-semibold text-slate-900 dark:text-white">
                    {stu.name}
                    {stu.id === 'student-demo-01' && (
                      <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded-sm bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300 font-semibold">
                        Demo
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-3 font-mono text-slate-400 text-[11px]">
                    {stu.studentId}
                  </td>
                  <td className="py-3 px-3 text-slate-600 dark:text-slate-300">
                    {stu.parentName}
                  </td>
                  <td className="py-3 px-3 text-slate-500 font-mono text-[11px]">
                    {stu.parentPhone}
                  </td>
                  <td className="py-3 px-3 text-center tabular-nums font-semibold text-emerald-600 dark:text-emerald-400">
                    {stu.attendanceRate}%
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => setActiveStudentModal(stu)}
                      className="text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline"
                    >
                      View Dossier →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Dossier Modal */}
      {activeStudentModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3 border-slate-100 dark:border-slate-800">
              <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
                Student Profile Dossier
              </h3>
              <button
                onClick={() => setActiveStudentModal(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-sky-600 text-white flex items-center justify-center font-bold text-sm">
                  {activeStudentModal.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                    {activeStudentModal.name}
                  </h4>
                  <p className="text-slate-400">
                    Grade {activeStudentModal.class}-{activeStudentModal.section} · Roll #{activeStudentModal.rollNo}
                  </p>
                </div>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl space-y-1.5 text-slate-600 dark:text-slate-300">
                <p>Student ID: <strong className="font-mono text-slate-900 dark:text-white">{activeStudentModal.studentId}</strong></p>
                <p>Date of Birth: <strong>{activeStudentModal.dob}</strong></p>
                <p>Blood Group: <strong>{activeStudentModal.bloodGroup}</strong></p>
                <p>Attendance Record: <strong className="text-emerald-600 font-bold">{activeStudentModal.attendanceRate}%</strong></p>
                <p>Parents: <strong>{activeStudentModal.parentName}</strong></p>
                <p>Parent Contact: <strong className="font-mono">{activeStudentModal.parentPhone}</strong></p>
                <p>Address: <span className="text-slate-500">{activeStudentModal.address}</span></p>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setActiveStudentModal(null)}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 rounded-lg"
                >
                  Close Dossier
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
