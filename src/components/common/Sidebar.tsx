import React from 'react';
import { useSchool } from '../../context/SchoolContext';
import {
  LayoutDashboard,
  GraduationCap,
  FileText,
  Calendar,
  Clock,
  BookOpen,
  MessageSquare,
  Bell,
  User,
  Settings,
  LogOut,
  Users,
  CheckSquare,
  Award,
  CalendarDays,
  FileSpreadsheet,
  DollarSign,
  UserPlus,
  Shield,
  Layers,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  School
} from 'lucide-react';

interface SidebarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentPath,
  onNavigate,
  collapsed,
  onToggleCollapse
}) => {
  const { currentUser, logout, notifications, isAdminSession, setAdminInspectionMode } = useSchool();
  const unreadCount = notifications.filter((n) => !n.read && (n.userId === currentUser?.id || n.userId === 'all')).length;

  if (!currentUser) return null;

  const role = currentUser.role;

  interface NavItem {
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    path: string;
    badge?: number;
  }

  // Student Nav Items
  const studentItems: NavItem[] = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/student/dashboard' },
    { label: 'Academics & Grades', icon: GraduationCap, path: '/student/academics' },
    { label: 'Assignments', icon: FileText, path: '/student/assignments' },
    { label: 'Timetable', icon: Clock, path: '/student/timetable' },
    { label: 'Calendar', icon: Calendar, path: '/student/calendar' },
    { label: 'Learning Materials', icon: BookOpen, path: '/student/materials' },
    { label: 'Communication', icon: MessageSquare, path: '/student/communication' },
    { label: 'Announcements', icon: Bell, path: '/student/announcements', badge: unreadCount > 0 ? unreadCount : undefined },
    { label: 'My Profile', icon: User, path: '/student/profile' }
  ];

  // Teacher Nav Items
  const teacherItems: NavItem[] = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/teacher/dashboard' },
    { label: 'Take Attendance', icon: CheckSquare, path: '/teacher/attendance' },
    { label: 'Gradebook', icon: Award, path: '/teacher/gradebook' },
    { label: 'Assignments', icon: FileText, path: '/teacher/assignments' },
    { label: 'My Timetable', icon: Clock, path: '/teacher/timetable' },
    { label: 'Class Students', icon: Users, path: '/teacher/students' },
    { label: 'Lesson Planner', icon: Layers, path: '/teacher/lesson-planner' },
    { label: 'Materials Library', icon: BookOpen, path: '/teacher/materials' },
    { label: 'Messages', icon: MessageSquare, path: '/teacher/communication' },
    { label: 'Leave Requests', icon: CalendarDays, path: '/teacher/leave' },
    { label: 'Profile', icon: User, path: '/teacher/profile' }
  ];

  // Admin Nav Items
  const adminItems: NavItem[] = [
    { label: 'Dashboard Overview', icon: LayoutDashboard, path: '/admin/dashboard' },
    { label: 'Students Directory', icon: Users, path: '/admin/students' },
    { label: 'Teacher Faculty', icon: GraduationCap, path: '/admin/teachers' },
    { label: 'Classes & Sections', icon: Layers, path: '/admin/classes' },
    { label: 'School Attendance', icon: CheckSquare, path: '/admin/attendance' },
    { label: 'Academics & Exams', icon: Award, path: '/admin/exams' },
    { label: 'Master Timetable', icon: Clock, path: '/admin/timetable' },
    { label: 'Fee Management', icon: DollarSign, path: '/admin/fees' },
    { label: 'Announcements', icon: Bell, path: '/admin/announcements' },
    { label: 'Events & Calendar', icon: Calendar, path: '/admin/events' },
    { label: 'Admissions Desk', icon: UserPlus, path: '/admin/admissions' },
    { label: 'Reports & Analytics', icon: FileSpreadsheet, path: '/admin/reports' },
    { label: 'Roles & Permissions', icon: Shield, path: '/admin/roles' }
  ];

  const items = role === 'student' ? studentItems : role === 'teacher' ? teacherItems : adminItems;

  return (
    <aside
      className={`fixed top-12 bottom-0 left-0 z-30 flex flex-col bg-slate-900 border-r border-slate-800 text-slate-300 transition-all duration-200 select-none ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800">
        <button
          onClick={() => onNavigate('/')}
          className="flex items-center gap-3 overflow-hidden text-left"
          title="Chennai Public School"
        >
          <div className="w-9 h-9 rounded-xl bg-sky-600 flex items-center justify-center text-white shrink-0 shadow-md shadow-sky-600/30">
            <School className="w-5 h-5" />
          </div>
          {!collapsed && (
            <div className="flex flex-col min-w-0">
              <span className="font-display font-bold text-sm text-white tracking-tight truncate">
                CPS SmartHub
              </span>
              <span className="text-[11px] text-sky-400 capitalize truncate font-medium">
                {role} Portal
              </span>
            </div>
          )}
        </button>

        <button
          onClick={onToggleCollapse}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          aria-label="Toggle sidebar collapse"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Role Pill Banner */}
      {!collapsed && (
        <div className="px-4 py-3 border-b border-slate-800/80 bg-slate-950/40">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-xs font-semibold text-sky-400 border border-slate-700 overflow-hidden shrink-0">
              {currentUser.avatar ? (
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                currentUser.name.charAt(0)
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-white truncate">{currentUser.name}</p>
              <p className="text-[10px] text-slate-400 truncate">
                {role === 'student'
                  ? `Grade ${(currentUser as any).class || '10'}-${(currentUser as any).section || 'A'}`
                  : role === 'teacher'
                  ? (currentUser as any).department || 'Senior Faculty'
                  : (currentUser as any).designation || 'School Administration'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto px-2 py-4 space-y-1">
        {isAdminSession && (
          <div className="mb-3 pb-3 border-b border-slate-800 space-y-1">
            {!collapsed && (
              <p className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
                <Shield className="w-3 h-3" />
                <span>Supervisory Rights</span>
              </p>
            )}
            <button
              onClick={() => {
                setAdminInspectionMode('admin');
                onNavigate('/admin/dashboard');
              }}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                currentPath.startsWith('/admin')
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
              }`}
              title={collapsed ? 'Admin Control Center' : undefined}
            >
              <Shield className="w-4 h-4 shrink-0 text-indigo-400" />
              {!collapsed && <span className="truncate">Admin Portal</span>}
            </button>
            <button
              onClick={() => {
                setAdminInspectionMode('teacher');
                onNavigate('/teacher/dashboard');
              }}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                currentPath.startsWith('/teacher')
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
              }`}
              title={collapsed ? 'Supervise Teacher Portal' : undefined}
            >
              <BookOpen className="w-4 h-4 shrink-0 text-blue-400" />
              {!collapsed && <span className="truncate">Teacher Portal</span>}
            </button>
            <button
              onClick={() => {
                setAdminInspectionMode('student');
                onNavigate('/student/dashboard');
              }}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                currentPath.startsWith('/student')
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
              }`}
              title={collapsed ? 'Supervise Student Portal' : undefined}
            >
              <GraduationCap className="w-4 h-4 shrink-0 text-sky-400" />
              {!collapsed && <span className="truncate">Student Portal</span>}
            </button>
          </div>
        )}

        {items.map((item) => {
          const Icon = item.icon;
          const isActive = currentPath === item.path;

          return (
            <button
              key={item.path}
              onClick={() => onNavigate(item.path)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-colors group relative ${
                isActive
                  ? 'bg-sky-600 text-white shadow-sm shadow-sky-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
              }`}
              title={collapsed ? item.label : undefined}
            >
              <Icon
                className={`w-4 h-4 shrink-0 transition-transform ${
                  isActive ? 'text-white' : 'text-slate-400 group-hover:text-sky-400'
                }`}
              />
              {!collapsed && <span className="truncate flex-1 text-left">{item.label}</span>}
              {!collapsed && item.badge && (
                <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-rose-500 text-white rounded-full">
                  {item.badge}
                </span>
              )}

              {/* Tooltip on collapsed */}
              {collapsed && (
                <span className="absolute left-full ml-2 px-2.5 py-1 bg-slate-950 text-white text-[11px] rounded shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none z-50 transition-opacity">
                  {item.label}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Bottom Actions */}
      <div className="p-3 border-t border-slate-800 space-y-1">
        <button
          onClick={() => {
            logout();
            onNavigate('/login');
          }}
          className="w-full flex items-center gap-3 px-3 py-2 text-xs font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 rounded-lg transition-colors"
          title={collapsed ? 'Sign Out' : undefined}
        >
          <LogOut className="w-4 h-4 shrink-0" />
          {!collapsed && <span>Sign Out</span>}
        </button>
      </div>
    </aside>
  );
};
