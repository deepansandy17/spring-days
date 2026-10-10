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
  Key
} from 'lucide-react';

export const StudentProfile: React.FC = () => {
  const { currentStudent, updateStudentProfile } = useSchool();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    phone: currentStudent.phone || '',
    address: currentStudent.address || '',
    parentPhone: currentStudent.parentPhone || '',
    parentEmail: currentStudent.parentEmail || ''
  });

  const [passwordState, setPasswordState] = useState({
    currentPass: '',
    newPass: '',
    confirmPass: ''
  });

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [passMessage, setPassMessage] = useState<string | null>(null);

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateStudentProfile({
      phone: formData.phone,
      address: formData.address,
      parentPhone: formData.parentPhone,
      parentEmail: formData.parentEmail
    });
    setIsEditing(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordState.newPass !== passwordState.confirmPass) {
      setPassMessage('Passwords do not match.');
      return;
    }
    setPassMessage('Password updated successfully.');
    setPasswordState({ currentPass: '', newPass: '', confirmPass: '' });
    setTimeout(() => setPassMessage(null), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
            Account Management
          </span>
          <h2 className="font-display font-bold text-2xl text-slate-900 dark:text-white mt-0.5">
            Student Profile & Settings
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Institutional verification ID: {currentStudent.studentId}
          </p>
        </div>

        {savedSuccess && (
          <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold bg-emerald-50 dark:bg-emerald-950 px-3 py-1.5 rounded-lg border border-emerald-200">
            <Check className="w-4 h-4" />
            <span>Profile Saved</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: ID Card */}
        <div className="lg:col-span-4 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4 text-center">
          <div className="w-24 h-24 rounded-2xl mx-auto overflow-hidden border-2 border-sky-500/30 shadow-md">
            <img
              src={currentStudent.avatar}
              alt={currentStudent.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <div>
            <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
              {currentStudent.name}
            </h3>
            <p className="text-xs text-sky-600 dark:text-sky-400 font-semibold">
              Grade {currentStudent.class} - Section {currentStudent.section} (Roll #{currentStudent.rollNo})
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5 font-mono">{currentStudent.studentId}</p>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-left text-xs space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Blood Group</span>
              <strong className="text-slate-800 dark:text-slate-200">{currentStudent.bloodGroup}</strong>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Date of Birth</span>
              <strong className="text-slate-800 dark:text-slate-200">{currentStudent.dob}</strong>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Enrolled Since</span>
              <strong className="text-slate-800 dark:text-slate-200">{currentStudent.joinedDate}</strong>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Attendance Rate</span>
              <strong className="text-emerald-600 dark:text-emerald-400 font-bold">{currentStudent.attendanceRate}%</strong>
            </div>
          </div>
        </div>

        {/* Right Column: Editable Contact & Security */}
        <div className="lg:col-span-8 space-y-6">
          {/* Contact Details Card */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
                Guardian & Residential Contact
              </h3>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline"
              >
                {isEditing ? 'Cancel Editing' : 'Edit Contact Details'}
              </button>
            </div>

            <form onSubmit={handleProfileSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 mb-1">Parent / Guardian Names (Official)</label>
                  <input
                    type="text"
                    disabled
                    value={currentStudent.parentName}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-500 cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Parent Mobile Contact</label>
                  <input
                    type="tel"
                    disabled={!isEditing}
                    value={formData.parentPhone}
                    onChange={(e) => setFormData({ ...formData, parentPhone: e.target.value })}
                    className={`w-full px-3 py-2 rounded-xl border ${
                      isEditing
                        ? 'border-sky-500 bg-white dark:bg-slate-900'
                        : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60'
                    }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 mb-1">Parent Correspondence Email</label>
                  <input
                    type="email"
                    disabled={!isEditing}
                    value={formData.parentEmail}
                    onChange={(e) => setFormData({ ...formData, parentEmail: e.target.value })}
                    className={`w-full px-3 py-2 rounded-xl border ${
                      isEditing
                        ? 'border-sky-500 bg-white dark:bg-slate-900'
                        : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Student Primary Phone</label>
                  <input
                    type="tel"
                    disabled={!isEditing}
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={`w-full px-3 py-2 rounded-xl border ${
                      isEditing
                        ? 'border-sky-500 bg-white dark:bg-slate-900'
                        : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Residential Address</label>
                <textarea
                  rows={2}
                  disabled={!isEditing}
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className={`w-full px-3 py-2 rounded-xl border ${
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
                    className="px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-xl flex items-center gap-2 shadow-sm"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Contact Changes</span>
                  </button>
                </div>
              )}
            </form>
          </div>

          {/* Change Password */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <h3 className="font-display font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <Key className="w-4 h-4 text-sky-600 dark:text-sky-400" />
              <span>Change Security Password</span>
            </h3>

            {passMessage && (
              <p className="text-xs text-sky-600 dark:text-sky-400 font-medium">{passMessage}</p>
            )}

            <form onSubmit={handlePasswordChange} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-400 mb-1">Current Password</label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={passwordState.currentPass}
                    onChange={(e) => setPasswordState({ ...passwordState, currentPass: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">New Password</label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={passwordState.newPass}
                    onChange={(e) => setPasswordState({ ...passwordState, newPass: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Confirm New Password</label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={passwordState.confirmPass}
                    onChange={(e) => setPasswordState({ ...passwordState, confirmPass: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold rounded-xl hover:opacity-90"
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
