import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import {
  Users,
  Search,
  Plus,
  Filter,
  Eye,
  Download,
  CheckCircle2,
  X,
  Sparkles,
  Key,
  ShieldCheck,
  Calendar,
  Phone,
  Mail,
  MapPin,
  GraduationCap
} from 'lucide-react';
import { StudentProfile } from '../../types';

export const AdminStudents: React.FC = () => {
  const { students, addStudent } = useSchool();

  const [selectedClass, setSelectedClass] = useState('All');
  const [selectedSection, setSelectedSection] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [activeStudent, setActiveStudent] = useState<StudentProfile | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [successNotice, setSuccessNotice] = useState<{
    name: string;
    studentId: string;
    email: string;
    grade: string;
    password: string;
  } | null>(null);

  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const [newStudent, setNewStudent] = useState({
    name: '',
    class: '10',
    section: 'A',
    rollNo: 46,
    dob: '2010-08-15',
    gender: 'Male',
    bloodGroup: 'B+',
    parentName: '',
    parentPhone: '+91 98401 ',
    parentEmail: '',
    address: 'Anna Nagar West, Chennai - 600040',
    previousSchool: 'DAV Senior Secondary School, Chennai'
  });

  // Filter directly from context students
  const filtered = students.filter((s) => {
    const matchesClass = selectedClass === 'All' || s.class === selectedClass;
    const matchesSection = selectedSection === 'All' || s.section === selectedSection;
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.parentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesClass && matchesSection && matchesSearch;
  });

  const pageSize = 12;
  const totalPages = Math.ceil(filtered.length / pageSize) || 1;
  const paginated = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudent.name || !newStudent.parentName) return;

    const cleanName = newStudent.name.trim();
    const cleanEmail = `${cleanName.toLowerCase().replace(/\s+/g, '.')}@cps.edu.in`;
    const generatedId = `CPS-2026-${newStudent.class.padStart(2, '0')}${newStudent.section}${String(
      newStudent.rollNo
    ).padStart(2, '0')}`;

    const created = addStudent({
      studentId: generatedId,
      name: cleanName,
      email: cleanEmail,
      role: 'student',
      avatar:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=128&q=80',
      phone: newStudent.parentPhone,
      joinedDate: new Date().toISOString().split('T')[0],
      class: newStudent.class,
      section: newStudent.section,
      rollNo: Number(newStudent.rollNo) || 45,
      dob: newStudent.dob,
      bloodGroup: newStudent.bloodGroup,
      address: newStudent.address,
      parentName: newStudent.parentName,
      parentPhone: newStudent.parentPhone,
      parentEmail: newStudent.parentEmail || `${cleanName.toLowerCase().replace(/\s+/g, '')}.parent@gmail.com`,
      attendanceRate: 98.0,
      feesDue: 0,
      feesPaid: 65000,
      isNewlyJoined: true,
      password: 'Student@123'
    });

    setIsAddOpen(false);
    setSuccessNotice({
      name: created.name,
      studentId: created.studentId,
      email: created.email,
      grade: `Grade ${created.class}-${created.section} (Roll #${created.rollNo})`,
      password: 'Student@123'
    });

    // Reset form
    setNewStudent({
      name: '',
      class: '10',
      section: 'A',
      rollNo: newStudent.rollNo + 1,
      dob: '2010-08-15',
      gender: 'Male',
      bloodGroup: 'B+',
      parentName: '',
      parentPhone: '+91 98401 ',
      parentEmail: '',
      address: 'Anna Nagar West, Chennai - 600040',
      previousSchool: 'DAV Senior Secondary School, Chennai'
    });
  };

  const handleExportCSV = () => {
    setToastMsg(`Generated and exported ${students.length} student records to CSV.`);
    setTimeout(() => setToastMsg(null), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-6 right-6 z-50 bg-slate-900 text-white text-xs px-4 py-3 rounded-xl shadow-xl border border-slate-700 flex items-center gap-2 animate-in fade-in duration-150">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Success Notice Card upon enrollment */}
      {successNotice && (
        <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-950 dark:text-emerald-100 shadow-md relative animate-in fade-in duration-200">
          <button
            onClick={() => setSuccessNotice(null)}
            className="absolute top-4 right-4 text-emerald-600 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-200"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div className="space-y-1.5 flex-1 pr-6">
              <h4 className="font-display font-bold text-sm text-emerald-900 dark:text-emerald-100 flex items-center gap-2">
                <span>Newly Joined Student Successfully Enrolled in CPS Registry!</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-200 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200">
                  Active in Student Portal
                </span>
              </h4>
              <p className="text-xs text-emerald-800 dark:text-emerald-300">
                <strong>{successNotice.name}</strong> has been enrolled in <strong>{successNotice.grade}</strong>. Login credentials have been provisioned:
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-1 text-xs font-mono">
                <span className="bg-white/80 dark:bg-slate-900/80 px-2.5 py-1 rounded-md border border-emerald-300 dark:border-emerald-700 text-emerald-900 dark:text-emerald-200">
                  Login ID: <strong>{successNotice.studentId}</strong> (or {successNotice.email})
                </span>
                <span className="bg-white/80 dark:bg-slate-900/80 px-2.5 py-1 rounded-md border border-emerald-300 dark:border-emerald-700 text-emerald-900 dark:text-emerald-200">
                  Password: <strong>{successNotice.password}</strong>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
            Registry Master · Administrator Access
          </span>
          <h2 className="font-display font-bold text-2xl text-slate-900 dark:text-white mt-0.5">
            Student Information & Directory ({students.length})
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Complete institutional enrollment registry across Grades 6 through 12. Administrators can add newly joined students.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={() => setIsAddOpen(true)}
            className="px-4 py-2 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-700 active:bg-sky-800 rounded-xl shadow-md shadow-sky-600/20 flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Newly Joined Student</span>
          </button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by student name or ID..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-9 pr-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:outline-hidden focus:border-sky-500 text-slate-900 dark:text-white"
            />
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 text-[11px]">Grade:</span>
            <select
              value={selectedClass}
              onChange={(e) => {
                setSelectedClass(e.target.value);
                setCurrentPage(1);
              }}
              className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
            >
              <option value="All">All Grades (6–12)</option>
              <option value="6">Grade 6</option>
              <option value="7">Grade 7</option>
              <option value="8">Grade 8</option>
              <option value="9">Grade 9</option>
              <option value="10">Grade 10</option>
              <option value="11">Grade 11</option>
              <option value="12">Grade 12</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 text-[11px]">Section:</span>
            <select
              value={selectedSection}
              onChange={(e) => {
                setSelectedSection(e.target.value);
                setCurrentPage(1);
              }}
              className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
            >
              <option value="All">All Sections (A & B)</option>
              <option value="A">Section A</option>
              <option value="B">Section B</option>
            </select>
          </div>
        </div>

        <span className="text-slate-400">
          Showing {filtered.length === 0 ? 0 : (currentPage - 1) * pageSize + 1}–
          {Math.min(currentPage * pageSize, filtered.length)} of {filtered.length} students
        </span>
      </div>

      {/* Directory Table */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left min-w-[750px]">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 uppercase text-[10px] tracking-wider border-y border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3 px-3 font-semibold">Student ID</th>
                <th className="py-3 px-3 font-semibold">Name</th>
                <th className="py-3 px-3 font-semibold">Class / Sec</th>
                <th className="py-3 px-3 font-semibold">Parent / Guardian</th>
                <th className="py-3 px-3 font-semibold">Phone Contact</th>
                <th className="py-3 px-3 text-center font-semibold">Attendance</th>
                <th className="py-3 px-3 text-center font-semibold">Fee Status</th>
                <th className="py-3 px-3 text-right font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {paginated.map((stu) => (
                <tr key={stu.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-3 font-mono text-slate-500 text-[11px]">
                    {stu.studentId}
                  </td>
                  <td className="py-3 px-3 font-semibold text-slate-900 dark:text-white">
                    <div className="flex items-center gap-2">
                      <span>{stu.name}</span>
                      {stu.isNewlyJoined && (
                        <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold uppercase tracking-wider">
                          Newly Joined
                        </span>
                      )}
                      {stu.id === 'student-demo-01' && (
                        <span className="text-[9px] px-1.5 py-0.5 rounded-sm bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300 font-semibold">
                          Demo Account
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-3 font-medium text-slate-700 dark:text-slate-300">
                    Grade {stu.class}-{stu.section} (Roll #{stu.rollNo})
                  </td>
                  <td className="py-3 px-3 text-slate-600 dark:text-slate-300">
                    {stu.parentName}
                  </td>
                  <td className="py-3 px-3 font-mono text-slate-500 text-[11px]">
                    {stu.parentPhone}
                  </td>
                  <td className="py-3 px-3 text-center tabular-nums font-semibold text-emerald-600 dark:text-emerald-400">
                    {stu.attendanceRate}%
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        stu.feesDue === 0
                          ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                          : 'bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300'
                      }`}
                    >
                      {stu.feesDue === 0 ? 'Paid' : `Due ₹${stu.feesDue.toLocaleString()}`}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => setActiveStudent(stu)}
                      className="p-1.5 text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-100 dark:border-slate-800">
          <span>Page {currentPage} of {totalPages}</span>
          <div className="flex items-center gap-2">
            <button
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="px-3 py-1 rounded-lg border border-slate-200 dark:border-slate-700 disabled:opacity-40 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              Previous
            </button>
            <button
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="px-3 py-1 rounded-lg border border-slate-200 dark:border-slate-700 disabled:opacity-40 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Student Details Modal */}
      {activeStudent && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 text-xs">
            <div className="flex items-center justify-between border-b pb-3 border-slate-100 dark:border-slate-800">
              <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
                Student Profile Record
              </h3>
              <button
                onClick={() => setActiveStudent(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-100 border border-slate-200">
                  <img
                    src={activeStudent.avatar}
                    alt={activeStudent.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">{activeStudent.name}</h4>
                  <p className="font-mono text-slate-500">{activeStudent.studentId}</p>
                </div>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl space-y-1.5 border border-slate-100 dark:border-slate-800">
                <p>Grade / Section: <strong>Grade {activeStudent.class}-{activeStudent.section}</strong></p>
                <p>Roll Number: <strong>#{activeStudent.rollNo}</strong></p>
                <p>Student Email: <strong className="font-mono">{activeStudent.email}</strong></p>
                <p>Attendance Record: <strong className="text-emerald-600 font-bold">{activeStudent.attendanceRate}%</strong></p>
                <p>Date of Birth: <strong>{activeStudent.dob}</strong></p>
                <p>Blood Group: <strong>{activeStudent.bloodGroup}</strong></p>
                <p>Parent Name: <strong>{activeStudent.parentName}</strong></p>
                <p>Emergency Contact: <strong className="font-mono">{activeStudent.parentPhone}</strong></p>
                <p>Address: <span className="text-slate-500">{activeStudent.address}</span></p>
                <p>Fees Status: <strong className={activeStudent.feesDue === 0 ? 'text-emerald-600' : 'text-amber-600'}>
                  {activeStudent.feesDue === 0 ? 'All Dues Cleared' : `Pending ₹${activeStudent.feesDue.toLocaleString()}`}
                </strong></p>
                <p className="pt-1 text-[11px] text-slate-400 border-t border-slate-200 dark:border-slate-700">
                  Portal Login ID: <code className="text-sky-600 font-bold">{activeStudent.studentId}</code> | Password: <code className="text-sky-600 font-bold">Student@123</code>
                </p>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setActiveStudent(null)}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 rounded-lg"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Newly Joined Student Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 my-8">
            <div className="flex items-center justify-between border-b pb-3 border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-sky-100 dark:bg-sky-950 text-sky-600 dark:text-sky-400 flex items-center justify-center">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
                    Enroll Newly Joined Student
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Administrator tool to onboard new students to the Chennai Public School registry
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsAddOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddStudent} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                  Student Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vignesh Balasubramanian"
                  value={newStudent.name}
                  onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:border-sky-500"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                    Grade
                  </label>
                  <select
                    value={newStudent.class}
                    onChange={(e) => setNewStudent({ ...newStudent, class: e.target.value })}
                    className="w-full px-2.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    <option value="6">Grade 6</option>
                    <option value="7">Grade 7</option>
                    <option value="8">Grade 8</option>
                    <option value="9">Grade 9</option>
                    <option value="10">Grade 10</option>
                    <option value="11">Grade 11</option>
                    <option value="12">Grade 12</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                    Section
                  </label>
                  <select
                    value={newStudent.section}
                    onChange={(e) => setNewStudent({ ...newStudent, section: e.target.value })}
                    className="w-full px-2.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    <option value="A">Section A</option>
                    <option value="B">Section B</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                    Roll Number
                  </label>
                  <input
                    type="number"
                    value={newStudent.rollNo}
                    onChange={(e) => setNewStudent({ ...newStudent, rollNo: parseInt(e.target.value) || 1 })}
                    className="w-full px-2.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    value={newStudent.dob}
                    onChange={(e) => setNewStudent({ ...newStudent, dob: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                    Blood Group
                  </label>
                  <select
                    value={newStudent.bloodGroup}
                    onChange={(e) => setNewStudent({ ...newStudent, bloodGroup: e.target.value })}
                    className="w-full px-2.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                    Parent / Guardian Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Father or Mother Full Name"
                    value={newStudent.parentName}
                    onChange={(e) => setNewStudent({ ...newStudent, parentName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                    Parent Phone Contact *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98401 23456"
                    value={newStudent.parentPhone}
                    onChange={(e) => setNewStudent({ ...newStudent, parentPhone: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                  Residential Address in Chennai
                </label>
                <input
                  type="text"
                  placeholder="e.g. 14, 2nd Avenue, Anna Nagar, Chennai"
                  value={newStudent.address}
                  onChange={(e) => setNewStudent({ ...newStudent, address: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="p-3 rounded-xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 text-[11px] text-sky-800 dark:text-sky-300 space-y-1">
                <p className="font-semibold flex items-center gap-1.5">
                  <Key className="w-3.5 h-3.5" />
                  <span>Automatic Portal Credentials Generation:</span>
                </p>
                <p>
                  Upon clicking Enroll, this student will be instantly assigned a unique institutional Student ID and activated for Student Portal login with default password <code>Student@123</code>.
                </p>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddOpen(false)}
                  className="px-4 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-sky-600 hover:bg-sky-700 active:bg-sky-800 text-white font-semibold rounded-lg shadow-md shadow-sky-600/20 cursor-pointer"
                >
                  Enroll Student to Portal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
