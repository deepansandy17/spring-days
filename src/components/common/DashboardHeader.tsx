import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import {
  Bell,
  Search,
  Moon,
  Sun,
  User,
  LogOut,
  ChevronRight,
  BookOpen,
  Users,
  FileText
} from 'lucide-react';
import { NotificationsDrawer } from './NotificationsDrawer';

interface DashboardHeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  title?: string;
  breadcrumbs?: string[];
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  currentPath,
  onNavigate,
  title,
  breadcrumbs = []
}) => {
  const {
    currentUser,
    darkMode,
    toggleDarkMode,
    logout,
    notifications,
    students,
    teachers,
    assignments,
    announcements
  } = useSchool();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const unreadCount = notifications.filter(
    (n) => !n.read && (n.userId === currentUser?.id || n.userId === 'all' || n.targetRole === currentUser?.role || n.targetRole === 'all')
  ).length;

  // Search filtering
  const q = searchQuery.toLowerCase().trim();
  const searchResults = q
    ? {
        students: students.filter((s) => s.name.toLowerCase().includes(q) || s.studentId.toLowerCase().includes(q)).slice(0, 3),
        teachers: teachers.filter((t) => t.name.toLowerCase().includes(q) || t.department.toLowerCase().includes(q)).slice(0, 3),
        assignments: assignments.filter((a) => a.title.toLowerCase().includes(q) || a.subject.toLowerCase().includes(q)).slice(0, 3),
        announcements: announcements.filter((a) => a.title.toLowerCase().includes(q)).slice(0, 2)
      }
    : null;

  const hasResults =
    searchResults &&
    (searchResults.students.length > 0 ||
      searchResults.teachers.length > 0 ||
      searchResults.assignments.length > 0 ||
      searchResults.announcements.length > 0);

  return (
    <>
      <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 flex items-center justify-between gap-4 sticky top-12 z-20 transition-colors">
        {/* Left: Breadcrumbs & Title */}
        <div className="flex items-center gap-2 min-w-0">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <span className="capitalize font-medium text-sky-600 dark:text-sky-400">
              {currentUser?.role || 'Portal'}
            </span>
            {breadcrumbs.map((crumb, idx) => (
              <React.Fragment key={idx}>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className={idx === breadcrumbs.length - 1 ? 'text-slate-900 dark:text-white font-medium' : ''}>
                  {crumb}
                </span>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Center: Global Search with Instant Dropdown */}
        <div className="relative flex-1 max-w-md hidden sm:block">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search students, teachers, assignments, announcements..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              className="w-full pl-9 pr-4 py-2 bg-slate-100 dark:bg-slate-800/80 border border-transparent focus:border-sky-500 dark:focus:border-sky-500 rounded-lg text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden transition-colors"
            />
          </div>

          {/* Search Dropdown */}
          {isSearchFocused && searchQuery && (
            <div
              className="absolute left-0 right-0 top-full mt-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl overflow-hidden z-50 text-xs max-h-96 overflow-y-auto"
              onMouseDown={(e) => e.preventDefault()} // prevent blur
            >
              {!hasResults ? (
                <div className="p-4 text-center text-slate-400">No matching school records found</div>
              ) : (
                <div className="p-2 space-y-3">
                  {searchResults.students.length > 0 && (
                    <div>
                      <p className="px-2 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                        <Users className="w-3 h-3 text-sky-500" /> Students
                      </p>
                      {searchResults.students.map((s) => (
                        <div
                          key={s.id}
                          onClick={() => {
                            setSearchQuery('');
                            setIsSearchFocused(false);
                            if (currentUser?.role === 'admin') onNavigate('/admin/students');
                            else if (currentUser?.role === 'teacher') onNavigate('/teacher/students');
                          }}
                          className="px-2.5 py-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer flex items-center justify-between"
                        >
                          <span className="font-medium text-slate-800 dark:text-slate-200">{s.name}</span>
                          <span className="text-[10px] text-slate-400">Grade {s.class}-{s.section} · {s.studentId}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {searchResults.teachers.length > 0 && (
                    <div>
                      <p className="px-2 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                        <BookOpen className="w-3 h-3 text-indigo-500" /> Teachers
                      </p>
                      {searchResults.teachers.map((t) => (
                        <div
                          key={t.id}
                          onClick={() => {
                            setSearchQuery('');
                            setIsSearchFocused(false);
                            if (currentUser?.role === 'admin') onNavigate('/admin/teachers');
                          }}
                          className="px-2.5 py-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer flex items-center justify-between"
                        >
                          <span className="font-medium text-slate-800 dark:text-slate-200">{t.name}</span>
                          <span className="text-[10px] text-slate-400">{t.department}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {searchResults.assignments.length > 0 && (
                    <div>
                      <p className="px-2 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                        <FileText className="w-3 h-3 text-emerald-500" /> Assignments
                      </p>
                      {searchResults.assignments.map((a) => (
                        <div
                          key={a.id}
                          onClick={() => {
                            setSearchQuery('');
                            setIsSearchFocused(false);
                            if (currentUser?.role === 'student') onNavigate('/student/assignments');
                            else onNavigate('/teacher/assignments');
                          }}
                          className="px-2.5 py-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer flex items-center justify-between"
                        >
                          <span className="font-medium text-slate-800 dark:text-slate-200 truncate max-w-[240px]">{a.title}</span>
                          <span className="text-[10px] text-slate-400">{a.subject}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Notifications Button */}
          <button
            onClick={() => setIsNotifOpen(true)}
            className="relative p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Notifications"
            aria-label="View notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white dark:ring-slate-900" />
            )}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title={darkMode ? 'Light Mode' : 'Dark Mode'}
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* User Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <div className="w-7 h-7 rounded-full bg-sky-600 text-white flex items-center justify-center text-xs font-semibold overflow-hidden border border-slate-200 dark:border-slate-700">
                {currentUser?.avatar ? (
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  currentUser?.name.charAt(0) || 'U'
                )}
              </div>
              <div className="text-left hidden lg:block">
                <p className="text-xs font-semibold text-slate-900 dark:text-white leading-tight truncate max-w-[120px]">
                  {currentUser?.name || 'User'}
                </p>
                <p className="text-[10px] text-slate-400 capitalize">
                  {currentUser?.role || 'Guest'}
                </p>
              </div>
            </button>

            {isProfileOpen && (
              <div
                className="absolute right-0 top-full mt-2 w-52 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl py-1.5 z-50 text-xs"
                onClick={() => setIsProfileOpen(false)}
              >
                <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800">
                  <p className="font-semibold text-slate-900 dark:text-white truncate">{currentUser?.name}</p>
                  <p className="text-[11px] text-slate-400 truncate">{currentUser?.email}</p>
                </div>
                <button
                  onClick={() => {
                    if (currentUser?.role === 'student') onNavigate('/student/profile');
                    else if (currentUser?.role === 'teacher') onNavigate('/teacher/profile');
                    else onNavigate('/admin/roles');
                  }}
                  className="w-full px-3 py-2 text-left hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2 text-slate-700 dark:text-slate-300"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>My Profile & Settings</span>
                </button>
                <button
                  onClick={() => {
                    logout();
                    onNavigate('/login');
                  }}
                  className="w-full px-3 py-2 text-left hover:bg-rose-50 dark:hover:bg-rose-950/30 flex items-center gap-2 text-rose-600 dark:text-rose-400"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Slide-over Notifications */}
      <NotificationsDrawer
        isOpen={isNotifOpen}
        onClose={() => setIsNotifOpen(false)}
        onNavigate={onNavigate}
      />
    </>
  );
};
