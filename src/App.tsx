import React, { useState, useEffect } from 'react';
import { SchoolProvider, useSchool } from './context/SchoolContext';
import { QuickRoleSwitcher } from './components/common/QuickRoleSwitcher';
import { Sidebar } from './components/common/Sidebar';
import { DashboardHeader } from './components/common/DashboardHeader';

// Public Pages
import { LandingPage } from './pages/public/LandingPage';
import { LoginPage } from './pages/public/LoginPage';

// Student Pages
import { StudentDashboard } from './pages/student/StudentDashboard';
import { StudentAcademics } from './pages/student/StudentAcademics';
import { StudentAssignments } from './pages/student/StudentAssignments';
import { StudentTimetable } from './pages/student/StudentTimetable';
import { StudentCalendar } from './pages/student/StudentCalendar';
import { StudentMaterials } from './pages/student/StudentMaterials';
import { StudentCommunication } from './pages/student/StudentCommunication';
import { StudentAnnouncements } from './pages/student/StudentAnnouncements';
import { StudentProfile as StudentProfilePage } from './pages/student/StudentProfile';
import { StudentPortalContainer } from './components/student/StudentPortalContainer';

// Teacher Pages
import { TeacherDashboard } from './pages/teacher/TeacherDashboard';
import { TeacherAttendance } from './pages/teacher/TeacherAttendance';
import { TeacherGradebook } from './pages/teacher/TeacherGradebook';
import { TeacherAssignments } from './pages/teacher/TeacherAssignments';
import { TeacherTimetable } from './pages/teacher/TeacherTimetable';
import { TeacherStudents } from './pages/teacher/TeacherStudents';
import { TeacherLessonPlanner } from './pages/teacher/TeacherLessonPlanner';
import { TeacherMaterials } from './pages/teacher/TeacherMaterials';
import { TeacherCommunication } from './pages/teacher/TeacherCommunication';
import { TeacherLeave } from './pages/teacher/TeacherLeave';
import { TeacherProfile as TeacherProfilePage } from './pages/teacher/TeacherProfile';

// Admin Pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminStudents } from './pages/admin/AdminStudents';
import { AdminTeachers } from './pages/admin/AdminTeachers';
import { AdminClasses } from './pages/admin/AdminClasses';
import { AdminAttendance } from './pages/admin/AdminAttendance';
import { AdminExams } from './pages/admin/AdminExams';
import { AdminFees } from './pages/admin/AdminFees';
import { AdminAnnouncements } from './pages/admin/AdminAnnouncements';
import { AdminEventsGallery } from './pages/admin/AdminEventsGallery';
import { AdminAdmissions } from './pages/admin/AdminAdmissions';

import { ShieldAlert, ArrowRight, ShieldCheck, Eye } from 'lucide-react';

const AppContent: React.FC = () => {
  const { currentUser, isAdminSession } = useSchool();

  // Internal routing state synced with history
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname && window.location.pathname !== '/'
      ? window.location.pathname
      : '/';
  });

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const navigate = (path: string) => {
    setCurrentPath(path);
    window.history.pushState({}, '', path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // 1. PUBLIC VISITOR ACCESS CONTROL:
  // If no user is logged in, they can NEVER see any portal (Student, Teacher, or Admin).
  const isUnauthenticated = !currentUser;
  const isExplicitPublicPage = currentPath === '/' || currentPath === '/login';

  // Role authorization guard
  const renderDashboardContent = () => {
    if (!currentUser) {
      return null;
    }

    const isAuthorizedAdmin = currentUser.role === 'admin' || isAdminSession;

    // STUDENT PORTAL ROUTES
    if (currentPath.startsWith('/student')) {
      // Students can see Student Portal. Admin has rights to see BOTH Teacher and Student portals.
      // Teachers CANNOT see Student Portal!
      if (!isAuthorizedAdmin && currentUser.role !== 'student') {
        return (
          <div className="max-w-md mx-auto my-16 p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-center space-y-4 shadow-lg">
            <div className="w-12 h-12 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 flex items-center justify-center mx-auto">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
              Faculty Access Restricted
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Faculty accounts can only access the Teacher Portal. Access to the Student Learning Workspace is restricted to enrolled students and school administration.
            </p>
            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => navigate('/teacher/dashboard')}
                className="w-full py-2.5 bg-blue-600 text-white font-semibold text-xs rounded-xl shadow-sm flex items-center justify-center gap-1.5"
              >
                <span>Return to My Teacher Portal</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        );
      }

      // If Admin is inspecting student portal, display supervisory banner
      const adminSupervisionBanner = isAuthorizedAdmin && currentUser.role !== 'student' && (
        <div className="mb-6 p-4 rounded-xl bg-indigo-950/80 border border-indigo-700/50 text-indigo-100 flex items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-2.5">
            <Eye className="w-4 h-4 text-indigo-400 shrink-0" />
            <span className="text-xs">
              <strong>Admin Supervisory Mode:</strong> You are viewing the Student Learning Workspace with institutional supervisory authority.
            </span>
          </div>
          <button
            onClick={() => navigate('/admin/dashboard')}
            className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg shrink-0 whitespace-nowrap transition-colors"
          >
            Return to Admin Center
          </button>
        </div>
      );

      // Student routes
      const studentView = () => {
        switch (currentPath) {
          case '/student/dashboard':
            return <StudentDashboard onNavigate={navigate} />;
          case '/student/academics':
            return <StudentAcademics />;
          case '/student/assignments':
            return <StudentAssignments />;
          case '/student/timetable':
            return <StudentTimetable />;
          case '/student/calendar':
            return <StudentCalendar />;
          case '/student/materials':
            return <StudentMaterials />;
          case '/student/communication':
            return <StudentCommunication />;
          case '/student/announcements':
            return <StudentAnnouncements />;
          case '/student/profile':
            return <StudentProfilePage />;
          default:
            return <StudentDashboard onNavigate={navigate} />;
        }
      };

      return (
        <StudentPortalContainer currentPath={currentPath} onNavigate={navigate}>
          {adminSupervisionBanner}
          {studentView()}
        </StudentPortalContainer>
      );
    }

    // TEACHER PORTAL ROUTES
    if (currentPath.startsWith('/teacher')) {
      // Teachers can see Teacher Portal. Admin has rights to see BOTH Teacher and Student portals.
      // Students CANNOT see Teacher Portal!
      if (!isAuthorizedAdmin && currentUser.role !== 'teacher') {
        return (
          <div className="max-w-md mx-auto my-16 p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-center space-y-4 shadow-lg">
            <div className="w-12 h-12 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 flex items-center justify-center mx-auto">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
              Student Access Restricted
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Student accounts can only access the Student Portal. Access to the Faculty Academic Desk and gradebook is strictly prohibited.
            </p>
            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => navigate('/student/dashboard')}
                className="w-full py-2.5 bg-sky-600 text-white font-semibold text-xs rounded-xl shadow-sm flex items-center justify-center gap-1.5"
              >
                <span>Return to My Student Portal</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        );
      }

      // If Admin is inspecting teacher portal, display supervisory banner
      const adminSupervisionBanner = isAuthorizedAdmin && currentUser.role !== 'teacher' && (
        <div className="mb-6 p-4 rounded-xl bg-blue-950/80 border border-blue-700/50 text-blue-100 flex items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-2.5">
            <Eye className="w-4 h-4 text-blue-400 shrink-0" />
            <span className="text-xs">
              <strong>Admin Supervisory Mode:</strong> You are viewing the Teacher Faculty Workspace with institutional supervisory authority.
            </span>
          </div>
          <button
            onClick={() => navigate('/admin/dashboard')}
            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg shrink-0 whitespace-nowrap transition-colors"
          >
            Return to Admin Center
          </button>
        </div>
      );

      // Teacher routes
      const teacherView = () => {
        switch (currentPath) {
          case '/teacher/dashboard':
            return <TeacherDashboard onNavigate={navigate} />;
          case '/teacher/attendance':
            return <TeacherAttendance />;
          case '/teacher/gradebook':
            return <TeacherGradebook />;
          case '/teacher/assignments':
            return <TeacherAssignments />;
          case '/teacher/timetable':
            return <TeacherTimetable />;
          case '/teacher/students':
            return <TeacherStudents />;
          case '/teacher/lesson-planner':
            return <TeacherLessonPlanner />;
          case '/teacher/materials':
            return <TeacherMaterials />;
          case '/teacher/communication':
            return <TeacherCommunication />;
          case '/teacher/leave':
            return <TeacherLeave />;
          case '/teacher/profile':
            return <TeacherProfilePage />;
          default:
            return <TeacherDashboard onNavigate={navigate} />;
        }
      };

      return (
        <>
          {adminSupervisionBanner}
          {teacherView()}
        </>
      );
    }

    // ADMIN PORTAL ROUTES
    if (currentPath.startsWith('/admin')) {
      // Only Admin has rights to see Admin Portal!
      // Students and Teachers CANNOT see Admin Portal!
      if (!isAuthorizedAdmin) {
        return (
          <div className="max-w-md mx-auto my-16 p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-center space-y-4 shadow-lg">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 flex items-center justify-center mx-auto">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
              Administrator Clearance Required
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              This administrative control center is restricted exclusively to School Management. Non-admin accounts cannot access this portal.
            </p>
            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() =>
                  navigate(currentUser.role === 'student' ? '/student/dashboard' : '/teacher/dashboard')
                }
                className="w-full py-2.5 bg-indigo-600 text-white font-semibold text-xs rounded-xl shadow-sm flex items-center justify-center gap-1.5"
              >
                <span>
                  Return to My {currentUser.role === 'student' ? 'Student' : 'Teacher'} Portal
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        );
      }

      // Admin routes (Master Timetable, Reports & Analytics, and Roles & Permissions deleted per requirement)
      switch (currentPath) {
        case '/admin/dashboard':
          return <AdminDashboard onNavigate={navigate} />;
        case '/admin/students':
          return <AdminStudents />;
        case '/admin/teachers':
          return <AdminTeachers />;
        case '/admin/classes':
          return <AdminClasses />;
        case '/admin/attendance':
          return <AdminAttendance />;
        case '/admin/exams':
          return <AdminExams />;
        case '/admin/fees':
          return <AdminFees />;
        case '/admin/announcements':
          return <AdminAnnouncements />;
        case '/admin/events':
          return <AdminEventsGallery />;
        case '/admin/admissions':
          return <AdminAdmissions />;
        default:
          return <AdminDashboard onNavigate={navigate} />;
      }
    }

    return <LandingPage onNavigate={navigate} />;
  };

  const getBreadcrumbs = () => {
    const parts = currentPath.split('/').filter(Boolean);
    if (parts.length <= 1) return ['Dashboard'];
    return parts.slice(1).map((p) => p.replace('-', ' ').replace(/\b\w/g, (c) => c.toUpperCase()));
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col transition-colors selection:bg-sky-500 selection:text-white">
      {/* Role Switcher: strictly hidden for public visitors; role-aware for logged in users */}
      <QuickRoleSwitcher currentPath={currentPath} onNavigate={navigate} />

      {/* If user is not authenticated: strictly render public site or login page. Never render portals! */}
      {isUnauthenticated ? (
        <main className="flex-1">
          {currentPath === '/login' ? (
            <LoginPage onNavigate={navigate} />
          ) : currentPath === '/' ? (
            <LandingPage onNavigate={navigate} />
          ) : (
            <LoginPage
              onNavigate={navigate}
              redirectNotice="Public visitors cannot access internal portals without authentication. Please log in to your designated workspace."
            />
          )}
        </main>
      ) : isExplicitPublicPage ? (
        <main className="flex-1">
          {currentPath === '/login' ? (
            <LoginPage onNavigate={navigate} />
          ) : (
            <LandingPage onNavigate={navigate} />
          )}
        </main>
      ) : (
        // Authenticated Dashboard Layout
        <div className="flex flex-1 relative">
          {/* Collapsible Sidebar */}
          <Sidebar
            currentPath={currentPath}
            onNavigate={navigate}
            collapsed={sidebarCollapsed}
            onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          />

          {/* Main Viewport */}
          <div
            className={`flex-1 flex flex-col min-w-0 transition-all duration-200 ${
              sidebarCollapsed ? 'ml-20' : 'ml-64'
            }`}
          >
            <DashboardHeader
              currentPath={currentPath}
              onNavigate={navigate}
              breadcrumbs={getBreadcrumbs()}
            />

            <main className="flex-1 p-6 lg:p-8 max-w-7xl w-full mx-auto">
              {renderDashboardContent()}
            </main>
          </div>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <SchoolProvider>
      <AppContent />
    </SchoolProvider>
  );
}
