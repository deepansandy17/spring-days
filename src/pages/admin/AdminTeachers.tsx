import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import {
  GraduationCap,
  Plus,
  Calendar,
  Check,
  X,
  Search,
  BookOpen,
  CheckCircle2,
  AlertCircle,
  Key,
  ShieldCheck,
  Phone,
  Mail,
  Award,
  Layers
} from 'lucide-react';
import { TeacherProfile } from '../../types';

export const AdminTeachers: React.FC = () => {
  const { teachers, addTeacher, leaves, updateLeaveStatus } = useSchool();
  const [activeTab, setActiveTab] = useState<'roster' | 'leaves'>('roster');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddTeacherOpen, setIsAddTeacherOpen] = useState(false);
  const [adminRemark, setAdminRemark] = useState('Approved. Relieving period assigned.');
  const [successNotice, setSuccessNotice] = useState<{
    name: string;
    employeeId: string;
    email: string;
    department: string;
    password: string;
  } | null>(null);

  const [newTeacher, setNewTeacher] = useState({
    name: '',
    department: 'Mathematics',
    qualifications: 'M.Sc., B.Ed.',
    phone: '+91 98401 54321',
    email: '',
    assignedClass: '10',
    assignedSection: 'A',
    subject: 'Mathematics'
  });

  const filteredTeachers = teachers.filter(
    (t) =>
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.employeeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pendingLeaves = leaves.filter((l) => l.status === 'pending');

  const handleAddTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTeacher.name) return;

    const cleanName = newTeacher.name.trim();
    const cleanEmail =
      newTeacher.email.trim() || `${cleanName.toLowerCase().replace(/\s+/g, '.')}@cps.edu.in`;
    const generatedId = `CPS-T-${130 + teachers.length}`;

    const created = addTeacher({
      employeeId: generatedId,
      name: cleanName,
      email: cleanEmail,
      role: 'teacher',
      avatar:
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=128&q=80',
      phone: newTeacher.phone,
      joinedDate: new Date().toISOString().split('T')[0],
      department: newTeacher.department,
      qualifications: newTeacher.qualifications,
      assignedClasses: [
        {
          class: newTeacher.assignedClass,
          section: newTeacher.assignedSection,
          subject: newTeacher.department
        }
      ],
      leaveBalance: { casual: 8, medical: 12, duty: 5 },
      isNewlyJoined: true,
      password: 'Teacher@123'
    });

    setIsAddTeacherOpen(false);
    setSuccessNotice({
      name: created.name,
      employeeId: created.employeeId,
      email: created.email,
      department: created.department,
      password: 'Teacher@123'
    });

    // Reset form
    setNewTeacher({
      name: '',
      department: 'Mathematics',
      qualifications: 'M.Sc., B.Ed.',
      phone: '+91 98401 54321',
      email: '',
      assignedClass: '10',
      assignedSection: 'A',
      subject: 'Mathematics'
    });
  };

  return (
    <div className="space-y-6">
      {/* Success Notice Card upon teacher appointment */}
      {successNotice && (
        <div className="p-5 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-blue-950 dark:text-blue-100 shadow-md relative animate-in fade-in duration-200">
          <button
            onClick={() => setSuccessNotice(null)}
            className="absolute top-4 right-4 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div className="space-y-1.5 flex-1 pr-6">
              <h4 className="font-display font-bold text-sm text-blue-900 dark:text-blue-100 flex items-center gap-2">
                <span>Newly Appointed Faculty Member Successfully Registered!</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-200 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                  Active in Teacher Portal
                </span>
              </h4>
              <p className="text-xs text-blue-800 dark:text-blue-300">
                <strong>{successNotice.name}</strong> appointed to <strong>Department of {successNotice.department}</strong>. Portal credentials provisioned:
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-1 text-xs font-mono">
                <span className="bg-white/80 dark:bg-slate-900/80 px-2.5 py-1 rounded-md border border-blue-300 dark:border-blue-700 text-blue-900 dark:text-blue-200">
                  Employee ID: <strong>{successNotice.employeeId}</strong> (or {successNotice.email})
                </span>
                <span className="bg-white/80 dark:bg-slate-900/80 px-2.5 py-1 rounded-md border border-blue-300 dark:border-blue-700 text-blue-900 dark:text-blue-200">
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
            Faculty Master · Administrator Access
          </span>
          <h2 className="font-display font-bold text-2xl text-slate-900 dark:text-white mt-0.5">
            Teacher Faculty & Leave Management ({teachers.length})
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Active instructional faculties across academic departments. Administrators can appoint newly joined teachers.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
            <button
              onClick={() => setActiveTab('roster')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                activeTab === 'roster'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-semibold'
                  : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              Faculty Directory ({teachers.length})
            </button>
            <button
              onClick={() => setActiveTab('leaves')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors relative ${
                activeTab === 'leaves'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-semibold'
                  : 'text-slate-600 dark:text-slate-300'
              }`}
            >
              <span>Leave Applications</span>
              {pendingLeaves.length > 0 && (
                <span className="ml-1.5 px-1.5 py-0.2 text-[10px] font-bold bg-amber-500 text-white rounded-full">
                  {pendingLeaves.length}
                </span>
              )}
            </button>
          </div>

          <button
            onClick={() => setIsAddTeacherOpen(true)}
            className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-xl shadow-md shadow-blue-600/20 flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Newly Joined Teacher</span>
          </button>
        </div>
      </div>

      {activeTab === 'roster' ? (
        /* ROSTER TABLE */
        <div className="space-y-4">
          <div className="relative max-w-xs">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search faculty name, ID, or department..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs focus:outline-hidden focus:border-sky-500 text-slate-900 dark:text-white"
            />
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left min-w-[700px]">
                <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 uppercase text-[10px] tracking-wider border-y border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="py-3 px-3 font-semibold">Faculty Name</th>
                    <th className="py-3 px-3 font-semibold">Employee ID</th>
                    <th className="py-3 px-3 font-semibold">Department</th>
                    <th className="py-3 px-3 font-semibold">Qualifications</th>
                    <th className="py-3 px-3 font-semibold">Assigned Classes</th>
                    <th className="py-3 px-3 text-center font-semibold">Leave Balance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {filteredTeachers.map((t) => (
                    <tr key={t.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="py-3 px-3 font-semibold text-slate-900 dark:text-white">
                        <div className="flex items-center gap-2">
                          <span>{t.name}</span>
                          {t.isNewlyJoined && (
                            <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 font-bold uppercase tracking-wider">
                              Newly Joined
                            </span>
                          )}
                          {t.id === 'teacher-demo-01' && (
                            <span className="text-[9px] px-1.5 py-0.5 rounded-sm bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300 font-semibold">
                              Demo Teacher
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-3 font-mono text-slate-400 text-[11px]">
                        {t.employeeId}
                      </td>
                      <td className="py-3 px-3 font-medium text-slate-700 dark:text-slate-300">
                        {t.department}
                      </td>
                      <td className="py-3 px-3 text-slate-500">
                        {t.qualifications}
                      </td>
                      <td className="py-3 px-3 text-slate-600 dark:text-slate-400">
                        {t.assignedClasses.map((c) => `Grade ${c.class}-${c.section}`).join(', ')}
                        {t.isClassTeacherOf && ` (Class Teacher: ${t.isClassTeacherOf.class}-${t.isClassTeacherOf.section})`}
                      </td>
                      <td className="py-3 px-3 text-center font-mono text-slate-600 dark:text-slate-300">
                        CL: {t.leaveBalance.casual} | ML: {t.leaveBalance.medical}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        /* LEAVE REVIEW QUEUE */
        <div className="space-y-4">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
              Faculty Leave Review Desk
            </h3>

            <div className="space-y-4">
              {leaves.map((l) => (
                <div
                  key={l.id}
                  className={`p-5 rounded-2xl border transition-all ${
                    l.status === 'pending'
                      ? 'border-amber-300 dark:border-amber-900 bg-amber-50/30 dark:bg-amber-950/20'
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                    <div>
                      <span className="font-bold text-sm text-slate-900 dark:text-white">
                        {l.teacherName}
                      </span>
                      <span className="text-xs text-slate-500 ml-2">
                        ({l.department}) · {l.leaveType} Leave ({l.days} Day{l.days > 1 ? 's' : ''})
                      </span>
                    </div>

                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase self-start sm:self-auto ${
                        l.status === 'approved'
                          ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                          : l.status === 'rejected'
                          ? 'bg-rose-50 dark:bg-rose-950 text-rose-700 dark:text-rose-300'
                          : 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-200'
                      }`}
                    >
                      {l.status}
                    </span>
                  </div>

                  <div className="py-3 text-xs text-slate-600 dark:text-slate-300 space-y-1">
                    <p>
                      Date Range: <strong className="text-slate-900 dark:text-white">{l.startDate}</strong> to <strong className="text-slate-900 dark:text-white">{l.endDate}</strong>
                    </p>
                    <p>Reason: <span className="italic">"{l.reason}"</span></p>
                    {l.adminRemark && (
                      <p className="text-sky-600 dark:text-sky-400 font-semibold pt-1">
                        Principal Remark: "{l.adminRemark}"
                      </p>
                    )}
                  </div>

                  {l.status === 'pending' && (
                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                      <input
                        type="text"
                        placeholder="Optional administrative endorsement note..."
                        value={adminRemark}
                        onChange={(e) => setAdminRemark(e.target.value)}
                        className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 flex-1 min-w-[200px]"
                      />

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateLeaveStatus(l.id, 'rejected', 'Application rejected due to examination schedule.')}
                          className="px-4 py-1.5 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 font-semibold flex items-center gap-1 cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" />
                          <span>Reject</span>
                        </button>
                        <button
                          onClick={() => updateLeaveStatus(l.id, 'approved', adminRemark)}
                          className="px-4 py-1.5 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 font-semibold flex items-center gap-1 shadow-xs cursor-pointer"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Approve Leave</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Add Newly Joined Teacher Modal */}
      {isAddTeacherOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 my-8">
            <div className="flex items-center justify-between border-b pb-3 border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
                    Appoint Newly Joined Teacher
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Administrator tool to onboard instructional faculty to Chennai Public School
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsAddTeacherOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddTeacher} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                  Faculty Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. K. Ramesh or Mrs. Shalini Krishnan"
                  value={newTeacher.name}
                  onChange={(e) => setNewTeacher({ ...newTeacher, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:border-sky-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                    Academic Department
                  </label>
                  <select
                    value={newTeacher.department}
                    onChange={(e) => setNewTeacher({ ...newTeacher, department: e.target.value })}
                    className="w-full px-2.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    <option value="Mathematics">Mathematics</option>
                    <option value="Physics">Physics</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Biology">Biology</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="English">English</option>
                    <option value="Social Science">Social Science</option>
                    <option value="Commerce & Accounts">Commerce & Accounts</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                    Academic Qualifications
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. M.Sc., Ph.D., B.Ed."
                    value={newTeacher.qualifications}
                    onChange={(e) => setNewTeacher({ ...newTeacher, qualifications: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                    Faculty Email ID (optional)
                  </label>
                  <input
                    type="email"
                    placeholder="Auto-generated if empty"
                    value={newTeacher.email}
                    onChange={(e) => setNewTeacher({ ...newTeacher, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                    Phone Helpline Contact
                  </label>
                  <input
                    type="tel"
                    required
                    value={newTeacher.phone}
                    onChange={(e) => setNewTeacher({ ...newTeacher, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                    Assigned Primary Class
                  </label>
                  <select
                    value={newTeacher.assignedClass}
                    onChange={(e) => setNewTeacher({ ...newTeacher, assignedClass: e.target.value })}
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
                    Assigned Section
                  </label>
                  <select
                    value={newTeacher.assignedSection}
                    onChange={(e) => setNewTeacher({ ...newTeacher, assignedSection: e.target.value })}
                    className="w-full px-2.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    <option value="A">Section A</option>
                    <option value="B">Section B</option>
                  </select>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-[11px] text-blue-800 dark:text-blue-300 space-y-1">
                <p className="font-semibold flex items-center gap-1.5">
                  <Key className="w-3.5 h-3.5" />
                  <span>Automatic Faculty Credentials Generation:</span>
                </p>
                <p>
                  Upon appointment, a unique Employee ID will be generated and Teacher Portal access will be activated immediately with password <code>Teacher@123</code>.
                </p>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddTeacherOpen(false)}
                  className="px-4 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold rounded-lg shadow-md shadow-blue-600/20 cursor-pointer"
                >
                  Confirm Appointment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
