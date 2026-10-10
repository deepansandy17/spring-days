import React from 'react';
import { School, MapPin, Phone, Mail, Award, Shield } from 'lucide-react';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 transition-colors pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* Col 1: Brand & Affiliation */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5 text-white font-display font-bold text-lg">
              <div className="w-8 h-8 rounded-lg bg-sky-600 flex items-center justify-center text-white">
                <School className="w-4 h-4" />
              </div>
              <span>Chennai Public School</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Empowering young minds for a smarter tomorrow through academic rigor, holistic values, and technological innovation.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Shield className="w-4 h-4 text-sky-400" />
              <span>CBSE Affiliation No: 1930284</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Ranked #1 Day-Cum-Boarding in Chennai</span>
            </div>
          </div>

          {/* Col 2: Campus Location */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm">Main Campus</h4>
            <div className="flex items-start gap-2.5 text-sm text-slate-400">
              <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
              <span>
                SDI Campus, TVS Avenue, Anna Nagar West Extension, Chennai, Tamil Nadu — 600101
              </span>
            </div>
            <div className="flex items-center gap-2.5 text-sm text-slate-400">
              <Phone className="w-4 h-4 text-sky-400 shrink-0" />
              <span>+91 44 2615 3700 / 2615 8200</span>
            </div>
            <div className="flex items-center gap-2.5 text-sm text-slate-400">
              <Mail className="w-4 h-4 text-sky-400 shrink-0" />
              <span>admissions@chennaipublicschool.com</span>
            </div>
          </div>

          {/* Col 3: Portals & Workspaces */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm">SmartHub Portals</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button
                  onClick={() => onNavigate('/student/dashboard')}
                  className="hover:text-white transition-colors"
                >
                  Student Learning Hub
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/teacher/dashboard')}
                  className="hover:text-white transition-colors"
                >
                  Teacher Academic Console
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/admin/dashboard')}
                  className="hover:text-white transition-colors"
                >
                  Administration ERP
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/login')}
                  className="hover:text-white transition-colors"
                >
                  Centralized Sign In
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Timings & Academic Year */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm">Campus Hours</h4>
            <div className="text-sm text-slate-400 space-y-1">
              <p>School Hours: 08:30 AM — 03:30 PM (Mon–Fri)</p>
              <p>Saturday: 09:00 AM — 12:45 PM (Clubs & Remedial)</p>
              <p>Visitor & Office: 09:00 AM — 04:30 PM</p>
            </div>
            <div className="pt-2 text-xs text-sky-400 font-medium">
              Academic Session 2026–2027 Active
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Chennai Public School. All rights reserved. SDI SmartHub ERP.</p>
          <div className="flex items-center gap-6">
            <span>CBSE Curriculum</span>
            <span>·</span>
            <span>Privacy Policy</span>
            <span>·</span>
            <span>Terms of Campus Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
