import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Heart,
  Save,
  Check,
  Lock,
  Bell,
  Shield,
  Key,
  Sparkles,
  Award,
  BookOpen,
  Edit3
} from 'lucide-react';
import { StudentProfile as IStudentProfile } from '../../types';

export const StudentProfile: React.FC = () => {
  const { currentUser, currentStudent, updateStudentProfile } = useSchool();

  // Active student is the currently logged-in student (including newly joined), or fallback currentStudent
  const activeStudent: IStudentProfile =
    currentUser && currentUser.role === 'student'
      ? (currentUser as IStudentProfile)
      : currentStudent;

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: activeStudent.name || '',
    phone: activeStudent.phone || '',
    dob: activeStudent.dob || '',
    bloodGroup: activeStudent.bloodGroup || 'O+',
    address: activeStudent.address || '',
    parentName: activeStudent.parentName || '',
    parentPhone: activeStudent.parentPhone || '',
    parentEmail: activeStudent.parentEmail || '',
    bio: activeStudent.bio || 'CBSE High School Scholar aiming for Science & Engineering excellence.',
    extracurriculars: activeStudent.extracurriculars || 'Robotics Club, School Cricket XI, Margazhi Choir'
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
    updateStudentProfile({
      name: formData.name.trim() || activeStudent.name,
      phone: formData.phone.trim(),
      dob: formData.dob,
      bloodGroup: formData.bloodGroup,
      address: formData.address.trim(),
      parentName: formData.parentName.trim(),
      parentPhone: formData.parentPhone.trim(),
      parentEmail: formData.parentEmail.trim(),
      bio: formData.bio.trim(),
      extracurriculars: formData.extracurriculars.trim()
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

    // Persist new password into student record
    updateStudentProfile({ password: passwordState.newPass });
    setPassMessage({
      text: 'Password successfully changed! You can use this new password for all future logins.',
      isError: false
    });
    setPasswordState({ currentPass: '', newPass: '', confirmPass: '' });
    setTimeout(() => setPassMessage(null), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-3xl student-card-glass border-t-4 border-indigo-500 shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Account Management & Profile Settings
          </span>
          <h2 className="font-display font-bold text-2xl text-slate-900 dark:text-white mt-0.5">
            Student Profile Dossier
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Institutional Student ID: <strong className="font-mono text-slate-800 dark:text-slate-200">{activeStudent.studentId}</strong> · Grade {activeStudent.class}-{activeStudent.section}
          </p>
        </div>

        {savedSuccess && (
          <div className="flex items-center gap-1.5 text-xs text-emerald-700 dark:text-emerald-300 font-semibold bg-emerald-50 dark:bg-emerald-950 px-3 py-2 rounded-xl border border-emerald-200 dark:border-emerald-800 animate-in fade-in">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>Profile Details Updated & Saved</span>
          </div>
        )}
      </div>

      {/* Onboarding Banner for Newly Joined Students */}
      {activeStudent.isNewlyJoined && (
        <div className="p-4 rounded-2xl bg-indigo-50/90 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 text-indigo-950 dark:text-indigo-100 flex items-start gap-3 shadow-xs">
          <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs">
            <p className="font-bold text-sm">
              Welcome to Cambridge Public School SmartHub!
            </p>
            <p className="text-indigo-800 dark:text-indigo-300 leading-relaxed">
              Your student entry account was registered by School Administration with Student ID <strong className="font-mono">{activeStudent.studentId}</strong>. You can customize your profile information, contact numbers, and update your security password below.
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: ID Card */}
        <div className="lg:col-span-4 p-6 rounded-3xl student-card-glass space-y-4 text-center">
          <div className="w-24 h-24 rounded-2xl mx-auto overflow-hidden border-2 border-sky-500/30 shadow-md">
            <img
              src={activeStudent.avatar}
              alt={activeStudent.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <div>
            <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
              {activeStudent.name}
            </h3>
            <p className="text-xs text-sky-600 dark:text-sky-400 font-semibold">
              Grade {activeStudent.class} - Section {activeStudent.section} (Roll #{activeStudent.rollNo})
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5 font-mono">{activeStudent.studentId}</p>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-left text-xs space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Institutional Email</span>
              <strong className="text-slate-800 dark:text-slate-200 font-mono text-[11px]">{activeStudent.email}</strong>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Blood Group</span>
              <strong className="text-slate-800 dark:text-slate-200">{activeStudent.bloodGroup}</strong>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Date of Birth</span>
              <strong className="text-slate-800 dark:text-slate-200">{activeStudent.dob}</strong>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Enrolled Since</span>
              <strong className="text-slate-800 dark:text-slate-200">{activeStudent.joinedDate}</strong>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Attendance Rate</span>
              <strong className="text-emerald-600 dark:text-emerald-400 font-bold">{activeStudent.attendanceRate}%</strong>
            </div>
          </div>
        </div>

        {/* Right Column: Editable Profile Details & Security */}
        <div className="lg:col-span-8 space-y-6">
          {/* Personal & Contact Details Card */}
          <div className="p-6 rounded-3xl student-card-glass space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                <span>Student Information & Contact Details</span>
              </h3>
              <button
                type="button"
                onClick={() => setIsEditing(!isEditing)}
                className="text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline cursor-pointer"
              >
                {isEditing ? 'Cancel Editing' : 'Edit Profile Details'}
              </button>
            </div>

            <form onSubmit={handleProfileSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                    Student Full Name
                  </label>
                  <input
                    type="text"
                    disabled={!isEditing}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full px-3 py-2 rounded-xl border text-xs text-slate-900 dark:text-white ${
                      isEditing
                        ? 'border-sky-500 bg-white dark:bg-slate-900'
                        : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                    Primary Contact Phone
                  </label>
                  <input
                    type="tel"
                    disabled={!isEditing}
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={`w-full px-3 py-2 rounded-xl border text-xs text-slate-900 dark:text-white ${
                      isEditing
                        ? 'border-sky-500 bg-white dark:bg-slate-900'
                        : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60'
                    }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    disabled={!isEditing}
                    value={formData.dob}
                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                    className={`w-full px-3 py-2 rounded-xl border text-xs text-slate-900 dark:text-white ${
                      isEditing
                        ? 'border-sky-500 bg-white dark:bg-slate-900'
                        : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                    Blood Group
                  </label>
                  <select
                    disabled={!isEditing}
                    value={formData.bloodGroup}
                    onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                    className={`w-full px-3 py-2 rounded-xl border text-xs text-slate-900 dark:text-white ${
                      isEditing
                        ? 'border-sky-500 bg-white dark:bg-slate-900'
                        : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60'
                    }`}
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                    Parent / Guardian Name
                  </label>
                  <input
                    type="text"
                    disabled={!isEditing}
                    value={formData.parentName}
                    onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                    className={`w-full px-3 py-2 rounded-xl border text-xs text-slate-900 dark:text-white ${
                      isEditing
                        ? 'border-sky-500 bg-white dark:bg-slate-900'
                        : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                    Parent Phone Contact
                  </label>
                  <input
                    type="tel"
                    disabled={!isEditing}
                    value={formData.parentPhone}
                    onChange={(e) => setFormData({ ...formData, parentPhone: e.target.value })}
                    className={`w-full px-3 py-2 rounded-xl border text-xs text-slate-900 dark:text-white ${
                      isEditing
                        ? 'border-sky-500 bg-white dark:bg-slate-900'
                        : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                  Residential Address in Chennai
                </label>
                <textarea
                  rows={2}
                  disabled={!isEditing}
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className={`w-full px-3 py-2 rounded-xl border text-xs text-slate-900 dark:text-white ${
                    isEditing
                      ? 'border-sky-500 bg-white dark:bg-slate-900'
                      : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60'
                  }`}
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                  Student Bio & Academic Aspirations
                </label>
                <textarea
                  rows={2}
                  disabled={!isEditing}
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className={`w-full px-3 py-2 rounded-xl border text-xs text-slate-900 dark:text-white ${
                    isEditing
                      ? 'border-sky-500 bg-white dark:bg-slate-900'
                      : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60'
                  }`}
                />
              </div>

              {isEditing && (
                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-sky-600 hover:bg-sky-700 active:bg-sky-800 text-white font-semibold rounded-xl flex items-center gap-2 shadow-md shadow-sky-600/20 cursor-pointer"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Profile Changes</span>
                  </button>
                </div>
              )}
            </form>
          </div>

          {/* Change Security Password */}
          <div className="p-6 rounded-3xl student-card-glass space-y-4">
            <div>
              <h3 className="font-display font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <Key className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                <span>Change Security Password</span>
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                Newly joined students can replace their initial administrator-assigned password here.
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
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:border-sky-500"
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
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:border-sky-500"
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
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:border-sky-500"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-1">
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold rounded-xl hover:opacity-90 transition-opacity cursor-pointer shadow-sm"
                >
                  Update Student Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
