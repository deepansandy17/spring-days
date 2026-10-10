import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import {
  CheckSquare,
  Users,
  Check,
  X,
  Clock,
  Save,
  Search,
  Filter,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { AttendanceRecord } from '../../types';

export const TeacherAttendance: React.FC = () => {
  const { currentTeacher, students, markAttendance, attendance } = useSchool();

  const [selectedClass, setSelectedClass] = useState('10');
  const [selectedSection, setSelectedSection] = useState('A');
  const [selectedDate, setSelectedDate] = useState('2026-10-10');
  const [searchQuery, setSearchQuery] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Filter students of selected class & section
  const classStudents = students.filter(
    (s) => s.class === selectedClass && s.section === selectedSection
  );

  // Local state for attendance statuses on this day
  const [statusMap, setStatusMap] = useState<Record<string, 'present' | 'absent' | 'late'>>(() => {
    const initial: Record<string, 'present' | 'absent' | 'late'> = {};
    classStudents.forEach((stu) => {
      const existing = attendance.find(
        (a) => a.studentId === stu.id && a.date === selectedDate
      );
      initial[stu.id] = existing ? existing.status : 'present';
    });
    return initial;
  });

  const handleStatusChange = (studentId: string, status: 'present' | 'absent' | 'late') => {
    setStatusMap((prev) => ({ ...prev, [studentId]: status }));
  };

  const handleMarkAllPresent = () => {
    const updated: Record<string, 'present' | 'absent' | 'late'> = {};
    classStudents.forEach((stu) => {
      updated[stu.id] = 'present';
    });
    setStatusMap(updated);
  };

  const handleSaveAttendance = () => {
    const records: AttendanceRecord[] = classStudents.map((stu) => ({
      id: `att-${selectedDate}-${stu.id}`,
      date: selectedDate,
      class: selectedClass,
      section: selectedSection,
      studentId: stu.id,
      studentName: stu.name,
      status: statusMap[stu.id] || 'present',
      markedByTeacherId: currentTeacher.id,
      remark: statusMap[stu.id] === 'absent' ? 'Reported Absent' : undefined
    }));

    markAttendance(records);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  // Stats for current selection
  const totalCount = classStudents.length;
  const presentCount = classStudents.filter((s) => (statusMap[s.id] || 'present') === 'present').length;
  const absentCount = classStudents.filter((s) => statusMap[s.id] === 'absent').length;
  const lateCount = classStudents.filter((s) => statusMap[s.id] === 'late').length;
  const attendancePct = totalCount > 0 ? (((presentCount + lateCount) / totalCount) * 100).toFixed(1) : '100';

  const filteredStudents = classStudents.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.rollNo.toString().includes(searchQuery) ||
      s.studentId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
            Roll Call Management
          </span>
          <h2 className="font-display font-bold text-2xl text-slate-900 dark:text-white mt-0.5">
            Daily Classroom Attendance
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Real-time synchronization across student profile reports and administrative ERP
          </p>
        </div>

        {savedSuccess && (
          <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold bg-emerald-50 dark:bg-emerald-950 px-3 py-1.5 rounded-lg border border-emerald-200">
            <CheckCircle2 className="w-4 h-4" />
            <span>Attendance Saved & Synchronized!</span>
          </div>
        )}
      </div>

      {/* Selector Strip */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-wrap items-center justify-between gap-4 text-xs">
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
              <option value="8">Grade 8</option>
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
            <label className="block text-slate-400 text-[10px] uppercase font-bold mb-1">Session Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-medium"
            >
            </input>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleMarkAllPresent}
            className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold transition-colors"
          >
            Mark All Present
          </button>
          <button
            onClick={handleSaveAttendance}
            className="px-5 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-semibold flex items-center gap-1.5 shadow-sm transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>Save Attendance</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs">
          <span className="text-slate-400 block">Class Strength</span>
          <strong className="text-xl font-display font-bold text-slate-900 dark:text-white tabular-nums">
            {totalCount} Students
          </strong>
        </div>
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs">
          <span className="text-slate-400 block">Present Count</span>
          <strong className="text-xl font-display font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">
            {presentCount} ({attendancePct}%)
          </strong>
        </div>
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs">
          <span className="text-slate-400 block">Absent Count</span>
          <strong className="text-xl font-display font-bold text-rose-600 dark:text-rose-400 tabular-nums">
            {absentCount}
          </strong>
        </div>
        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs">
          <span className="text-slate-400 block">Late Arrivals</span>
          <strong className="text-xl font-display font-bold text-amber-600 dark:text-amber-400 tabular-nums">
            {lateCount}
          </strong>
        </div>
      </div>

      {/* Search Input */}
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

      {/* Student Attendance List */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 uppercase text-[10px] tracking-wider border-y border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3 px-3 font-semibold w-16">Roll</th>
                <th className="py-3 px-3 font-semibold">Student Name</th>
                <th className="py-3 px-3 font-semibold">Student ID</th>
                <th className="py-3 px-3 font-semibold">Overall Attendance</th>
                <th className="py-3 px-3 text-center font-semibold">Status for {selectedDate}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredStudents.map((stu) => {
                const currentStatus = statusMap[stu.id] || 'present';

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
                    <td className="py-3 px-3 font-mono text-slate-400 text-[11px]">
                      {stu.studentId}
                    </td>
                    <td className="py-3 px-3 tabular-nums font-semibold text-slate-700 dark:text-slate-300">
                      {stu.attendanceRate}%
                    </td>
                    <td className="py-3 px-3 text-center">
                      <div className="inline-flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
                        <button
                          onClick={() => handleStatusChange(stu.id, 'present')}
                          className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors flex items-center gap-1 ${
                            currentStatus === 'present'
                              ? 'bg-emerald-600 text-white shadow-xs'
                              : 'text-slate-600 dark:text-slate-400 hover:text-emerald-600'
                          }`}
                        >
                          <Check className="w-3 h-3" />
                          <span>Present</span>
                        </button>
                        <button
                          onClick={() => handleStatusChange(stu.id, 'late')}
                          className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors flex items-center gap-1 ${
                            currentStatus === 'late'
                              ? 'bg-amber-600 text-white shadow-xs'
                              : 'text-slate-600 dark:text-slate-400 hover:text-amber-600'
                          }`}
                        >
                          <Clock className="w-3 h-3" />
                          <span>Late</span>
                        </button>
                        <button
                          onClick={() => handleStatusChange(stu.id, 'absent')}
                          className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors flex items-center gap-1 ${
                            currentStatus === 'absent'
                              ? 'bg-rose-600 text-white shadow-xs'
                              : 'text-slate-600 dark:text-slate-400 hover:text-rose-600'
                          }`}
                        >
                          <X className="w-3 h-3" />
                          <span>Absent</span>
                        </button>
                      </div>
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
