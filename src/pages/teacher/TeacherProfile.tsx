import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import {
  User,
  Award,
  BookOpen,
  Clock,
  Calendar,
  Mail,
  Phone,
  Edit3,
  Save,
  Check,
  Key,
  Sparkles,
  Layers,
  GraduationCap
} from 'lucide-react';
import { TeacherProfile as ITeacherProfile } from '../../types';

export const TeacherProfile: React.FC = () => {
  const { currentUser, currentTeacher, updateTeacherProfile } = useSchool();

  // Active teacher is the currently logged-in faculty member (including newly joined), or fallback currentTeacher
  const activeTeacher: ITeacherProfile =
    currentUser && currentUser.role === 'teacher'
      ? (currentUser as ITeacherProfile)
      : currentTeacher;

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: activeTeacher.name || '',
    department: activeTeacher.department || 'Mathematics',
    qualifications: activeTeacher.qualifications || 'M.Sc., B.Ed.',
    phone: activeTeacher.phone || '+91 98401 12345',
    email: activeTeacher.email || '',
    bio: activeTeacher.bio || 'Senior instructional faculty specializing in CBSE Senior Board curriculum excellence.',
    officeHours: activeTeacher.officeHours || 'Monday–Thursday: 03:30 PM – 04:30 PM (Staff Room Block B)'
  });

  const [passwordState, setPasswordState] = useState({
    currentPass: '',
    newPass: '',
    confirmPass: ''
  });

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [passMessage, setPassMessage] = useState<{ text: string; isError: boolean } | null>(null);

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateTeacherProfile({
      name: formData.name.trim() || activeTeacher.name,
      department: formData.department,
      qualifications: formData.qualifications.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      bio: formData.bio.trim(),
      officeHours: formData.officeHours.trim()
    });
    setIsEditing(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3500);
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordState.newPass) {
      setPassMessage({ text: 'Please enter a new password.', isError: true });
      return;
    }
    if (passwordState.newPass.length < 6) {
      setPassMessage({ text: 'New password must be at least 6 characters.', isError: true });
      return;
    }
    if (passwordState.newPass !== passwordState.confirmPass) {
      setPassMessage({ text: 'New passwords do not match.', isError: true });
      return;
    }

    // Persist new password into teacher record
    updateTeacherProfile({ password: passwordState.newPass });
    setPassMessage({
      text: 'Faculty password successfully changed! You can use this new password for all future logins.',
      isError: false
    });
    setPasswordState({ currentPass: '', newPass: '', confirmPass: '' });
    setTimeout(() => setPassMessage(null), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Faculty Dossier & Account Settings
          </span>
          <h2 className="font-display font-bold text-2xl text-slate-900 dark:text-white mt-0.5">
            Teacher Profile & Credentials
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Employee Code: <strong className="font-mono text-slate-800 dark:text-slate-200">{activeTeacher.employeeId}</strong> · Department of {activeTeacher.department}
          </p>
        </div>

        {savedSuccess && (
          <div className="flex items-center gap-1.5 text-xs text-emerald-700 dark:text-emerald-300 font-semibold bg-emerald-50 dark:bg-emerald-950 px-3 py-2 rounded-xl border border-emerald-200 dark:border-emerald-800 animate-in fade-in">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>Faculty Dossier Updated & Saved</span>
          </div>
        )}
      </div>

      {/* Onboarding Banner for Newly Joined Teachers */}
      {activeTeacher.isNewlyJoined && (
        <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-blue-950 dark:text-blue-100 flex items-start gap-3 shadow-xs">
          <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs">
            <p className="font-bold text-sm">
              Welcome to Chennai Public School Faculty!
            </p>
            <p className="text-blue-800 dark:text-blue-300 leading-relaxed">
              Your faculty account was initialized by School Administration with Employee ID <strong className="font-mono">{activeTeacher.employeeId}</strong>. You can update your qualifications, contact telephone, consultation hours, and set your personal secure password below.
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: ID Card */}
        <div className="lg:col-span-4 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs text-center space-y-4">
          <div className="w-24 h-24 rounded-2xl mx-auto overflow-hidden border-2 border-blue-500/30 shadow-md">
            <img
              src={activeTeacher.avatar}
              alt={activeTeacher.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <div>
            <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
              {activeTeacher.name}
            </h3>
            <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold">
              Department of {activeTeacher.department}
            </p>
            <p className="text-[11px] text-slate-400 font-mono mt-0.5">{activeTeacher.employeeId}</p>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-left text-xs space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Joining Date</span>
              <strong className="text-slate-800 dark:text-slate-200">{activeTeacher.joinedDate}</strong>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Official Email</span>
              <strong className="text-slate-800 dark:text-slate-200 font-mono text-[11px]">{activeTeacher.email}</strong>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Phone Contact</span>
              <strong className="text-slate-800 dark:text-slate-200 font-mono text-[11px]">{activeTeacher.phone}</strong>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Leave Balance</span>
              <strong className="text-emerald-600 dark:text-emerald-400 font-bold">
                CL: {activeTeacher.leaveBalance.casual} | ML: {activeTeacher.leaveBalance.medical}
              </strong>
            </div>
          </div>
        </div>

        {/* Right Column: Editable Faculty Dossier & Password Management */}
        <div className="lg:col-span-8 space-y-6">
          {/* Faculty Dossier Card */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>Instructor Profile & Credentials</span>
              </h3>
              <button
                type="button"
                onClick={() => setIsEditing(!isEditing)}
                className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
              >
                {isEditing ? 'Cancel Editing' : 'Edit Faculty Dossier'}
              </button>
            </div>

            <form onSubmit={handleProfileSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                    Faculty Full Name & Title
                  </label>
                  <input
                    type="text"
                    disabled={!isEditing}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full px-3 py-2 rounded-xl border text-xs text-slate-900 dark:text-white ${
                      isEditing
                        ? 'border-blue-500 bg-white dark:bg-slate-900'
                        : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                    Academic Department
                  </label>
                  <select
                    disabled={!isEditing}
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className={`w-full px-3 py-2 rounded-xl border text-xs text-slate-900 dark:text-white ${
                      isEditing
                        ? 'border-blue-500 bg-white dark:bg-slate-900'
                        : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60'
                    }`}
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
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                    Academic Qualifications & Degrees
                  </label>
                  <input
                    type="text"
                    disabled={!isEditing}
                    value={formData.qualifications}
                    onChange={(e) => setFormData({ ...formData, qualifications: e.target.value })}
                    className={`w-full px-3 py-2 rounded-xl border text-xs text-slate-900 dark:text-white ${
                      isEditing
                        ? 'border-blue-500 bg-white dark:bg-slate-900'
                        : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                    Helpline / Phone Contact
                  </label>
                  <input
                    type="tel"
                    disabled={!isEditing}
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={`w-full px-3 py-2 rounded-xl border text-xs text-slate-900 dark:text-white ${
                      isEditing
                        ? 'border-blue-500 bg-white dark:bg-slate-900'
                        : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                  Official Communication Email
                </label>
                <input
                  type="email"
                  disabled={!isEditing}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full px-3 py-2 rounded-xl border text-xs text-slate-900 dark:text-white ${
                    isEditing
                      ? 'border-blue-500 bg-white dark:bg-slate-900'
                      : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60'
                  }`}
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                  Teaching Philosophy & Academic Specializations
                </label>
                <textarea
                  rows={2}
                  disabled={!isEditing}
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className={`w-full px-3 py-2 rounded-xl border text-xs text-slate-900 dark:text-white ${
                    isEditing
                      ? 'border-blue-500 bg-white dark:bg-slate-900'
                      : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60'
                  }`}
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                  Office Hours & Student Consultation Availability
                </label>
                <input
                  type="text"
                  disabled={!isEditing}
                  value={formData.officeHours}
                  onChange={(e) => setFormData({ ...formData, officeHours: e.target.value })}
                  className={`w-full px-3 py-2 rounded-xl border text-xs text-slate-900 dark:text-white ${
                    isEditing
                      ? 'border-blue-500 bg-white dark:bg-slate-900'
                      : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60'
                  }`}
                />
              </div>

              {isEditing && (
                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold rounded-xl flex items-center gap-2 shadow-md shadow-blue-600/20 cursor-pointer"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Faculty Dossier Changes</span>
                  </button>
                </div>
              )}
            </form>
          </div>

          {/* Assigned Classes Preview */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3 text-xs">
            <h4 className="font-display font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>Assigned Cohorts & Classrooms</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {activeTeacher.assignedClasses.map((cls, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex items-center justify-between"
                >
                  <div>
                    <strong className="text-slate-900 dark:text-white block">
                      Grade {cls.class} - Section {cls.section}
                    </strong>
                    <span className="text-slate-400">{cls.subject}</span>
                  </div>
                  <span className="text-[10px] font-semibold text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950">
                    Active Class
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Change Security Password */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <div>
              <h3 className="font-display font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <Key className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>Change Security Password</span>
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                Newly joined teachers can replace their initial administrator-assigned password here.
              </p>
            </div>

            {passMessage && (
              <div
                className={`p-3 rounded-xl border text-xs flex items-center gap-2 ${
                  passMessage.isError
                    ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300'
                    : 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-900 text-emerald-700 dark:text-emerald-300'
                }`}
              >
                <Check className="w-4 h-4 shrink-0" />
                <span>{passMessage.text}</span>
              </div>
            )}

            <form onSubmit={handlePasswordChange} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                    Current Password
                  </label>
                  <input
                    type="password"
                    placeholder="Enter current password"
                    value={passwordState.currentPass}
                    onChange={(e) =>
                      setPasswordState({ ...passwordState, currentPass: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="Min 6 characters"
                    value={passwordState.newPass}
                    onChange={(e) =>
                      setPasswordState({ ...passwordState, newPass: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="Repeat new password"
                    value={passwordState.confirmPass}
                    onChange={(e) =>
                      setPasswordState({ ...passwordState, confirmPass: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-1">
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold rounded-xl hover:opacity-90 transition-opacity cursor-pointer shadow-sm"
                >
                  Update Faculty Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
