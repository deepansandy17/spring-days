import React from 'react';
import { useSchool } from '../../context/SchoolContext';
import { ArrowRight, School } from 'lucide-react';

interface NavbarProps {
  onNavigate: (path: string) => void;
  activeSection?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const { currentUser } = useSchool();

  const handlePortalClick = () => {
    if (!currentUser) {
      onNavigate('/login');
    } else if (currentUser.role === 'student') {
      onNavigate('/student/dashboard');
    } else if (currentUser.role === 'teacher') {
      onNavigate('/teacher/dashboard');
    } else {
      onNavigate('/admin/dashboard');
    }
  };

  return (
    <header className="sticky top-8 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-6 py-4">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => onNavigate('/')}
          className="flex items-center gap-2.5 text-slate-900 dark:text-white font-display font-bold text-lg md:text-xl tracking-tight whitespace-nowrap shrink-0 group text-left"
        >
          <div className="w-8 h-8 rounded-lg bg-sky-600 flex items-center justify-center text-white shadow-sm shadow-sky-600/30 group-hover:bg-sky-500 transition-colors">
            <School className="w-4 h-4" />
          </div>
          <span>Chennai Public School</span>
        </button>

        {/* Zone 2: 4–5 concise single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600 dark:text-slate-300">
          <a
            href="#about"
            className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors whitespace-nowrap shrink-0"
          >
            About
          </a>
          <a
            href="#academics"
            className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors whitespace-nowrap shrink-0"
          >
            Academics
          </a>
          <a
            href="#facilities"
            className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors whitespace-nowrap shrink-0"
          >
            Facilities
          </a>
          <a
            href="#admissions"
            className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors whitespace-nowrap shrink-0"
          >
            Admissions
          </a>
          <a
            href="#contact"
            className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors whitespace-nowrap shrink-0"
          >
            Contact
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handlePortalClick}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-sky-600 hover:bg-sky-700 active:bg-sky-800 rounded-lg shadow-sm shadow-sky-600/20 transition-all whitespace-nowrap shrink-0"
          >
            <span>{currentUser ? `${currentUser.role.toUpperCase()} Workspace` : 'Access Portal'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
