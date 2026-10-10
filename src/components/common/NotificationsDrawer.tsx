import React from 'react';
import { useSchool } from '../../context/SchoolContext';
import { Bell, Check, Trash2, X, FileText, CheckCircle2, Award, Calendar, DollarSign, Info } from 'lucide-react';

interface NotificationsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (path: string) => void;
}

export const NotificationsDrawer: React.FC<NotificationsDrawerProps> = ({
  isOpen,
  onClose,
  onNavigate
}) => {
  const { currentUser, notifications, markNotificationRead, clearNotifications } = useSchool();

  if (!isOpen) return null;

  // Filter relevant notifications
  const userNotifications = notifications.filter(
    (n) => n.userId === currentUser?.id || n.userId === 'all' || n.targetRole === currentUser?.role || n.targetRole === 'all'
  );

  const getIcon = (type: string) => {
    switch (type) {
      case 'assignment':
        return <FileText className="w-4 h-4 text-sky-500" />;
      case 'attendance':
        return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
      case 'exam':
        return <Award className="w-4 h-4 text-amber-500" />;
      case 'fee':
        return <DollarSign className="w-4 h-4 text-emerald-500" />;
      case 'leave':
        return <Calendar className="w-4 h-4 text-purple-500" />;
      default:
        return <Info className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/40 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-sm bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-sky-600 dark:text-sky-400" />
            <h3 className="font-semibold text-sm text-slate-900 dark:text-white">
              Notifications & Alerts
            </h3>
            <span className="text-xs px-2 py-0.5 bg-sky-100 dark:bg-sky-950/60 text-sky-700 dark:text-sky-400 rounded-full font-medium">
              {userNotifications.filter((n) => !n.read).length} new
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Action strip */}
        {userNotifications.length > 0 && (
          <div className="px-4 py-2 bg-slate-50 dark:bg-slate-800/40 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Recent school events</span>
            <button
              onClick={clearNotifications}
              className="flex items-center gap-1 text-slate-500 hover:text-rose-500 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear All</span>
            </button>
          </div>
        )}

        {/* List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {userNotifications.length === 0 ? (
            <div className="text-center py-16 px-4">
              <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto text-slate-400 mb-2">
                <Bell className="w-5 h-5" />
              </div>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">All caught up!</p>
              <p className="text-xs text-slate-500 mt-1">No new alerts or pending tasks.</p>
            </div>
          ) : (
            userNotifications.map((notif) => (
              <div
                key={notif.id}
                onClick={() => {
                  markNotificationRead(notif.id);
                  if (notif.actionUrl) {
                    onClose();
                    onNavigate(notif.actionUrl);
                  }
                }}
                className={`p-3 rounded-lg border text-left cursor-pointer transition-all ${
                  notif.read
                    ? 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 opacity-75'
                    : 'bg-sky-50/60 dark:bg-sky-950/20 border-sky-200 dark:border-sky-800/60 shadow-xs'
                }`}
              >
                <div className="flex items-start gap-2.5">
                  <div className="mt-0.5 p-1 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    {getIcon(notif.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-0.5">
                      <h4 className="text-xs font-semibold text-slate-900 dark:text-white truncate">
                        {notif.title}
                      </h4>
                      <span className="text-[10px] text-slate-400 whitespace-nowrap">
                        {notif.timestamp}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                      {notif.message}
                    </p>
                  </div>
                  {!notif.read && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        markNotificationRead(notif.id);
                      }}
                      className="p-1 text-slate-400 hover:text-sky-500"
                      title="Mark as read"
                    >
                      <Check className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-200 dark:border-slate-800 text-center">
          <p className="text-[11px] text-slate-400">
            Real-time synchronization across Student, Teacher & Admin
          </p>
        </div>
      </div>
    </div>
  );
};
