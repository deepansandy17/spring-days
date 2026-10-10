import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { MessageSquare, Send, User, BookOpen, Clock } from 'lucide-react';

export const StudentCommunication: React.FC = () => {
  const { currentStudent, messages, sendMessage, teachers } = useSchool();
  const [selectedTeacherId, setSelectedTeacherId] = useState(teachers[0]?.id || 'teacher-demo-01');
  const [newMsgContent, setNewMsgContent] = useState('');
  const [subjectText, setSubjectText] = useState('Academic Clarification');

  // Filter messages for current student
  const studentMessages = messages.filter(
    (m) => m.senderId === currentStudent.id || m.recipientId === currentStudent.id
  );

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMsgContent.trim()) return;
    sendMessage(selectedTeacherId, newMsgContent, subjectText);
    setNewMsgContent('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
        <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
          Faculty Communication
        </span>
        <h2 className="font-display font-bold text-2xl text-slate-900 dark:text-white mt-0.5">
          Messages & Consultations
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Direct secure communication channels with your class teachers and subject instructors
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Messages Feed */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <h3 className="font-display font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-sky-600 dark:text-sky-400" />
            <span>Consultation Thread</span>
          </h3>

          <div className="space-y-3 max-h-[440px] overflow-y-auto pr-2">
            {studentMessages.length === 0 ? (
              <p className="text-xs text-slate-400 text-center py-10">No messages yet. Send a note to your teacher.</p>
            ) : (
              studentMessages.map((msg) => {
                const isMe = msg.senderId === currentStudent.id;
                return (
                  <div
                    key={msg.id}
                    className={`p-4 rounded-xl border text-xs space-y-1.5 ${
                      isMe
                        ? 'bg-sky-50/70 dark:bg-sky-950/30 border-sky-200 dark:border-sky-800 ml-6'
                        : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 mr-6'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-semibold text-slate-900 dark:text-white">
                        {isMe ? 'You' : msg.senderName}
                      </span>
                      <span className="text-slate-400">{msg.timestamp}</span>
                    </div>
                    {msg.subject && (
                      <p className="text-[11px] font-medium text-sky-600 dark:text-sky-400">
                        Re: {msg.subject}
                      </p>
                    )}
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{msg.content}</p>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Compose Form */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
            Send Message to Teacher
          </h3>

          <form onSubmit={handleSend} className="space-y-4 text-xs">
            <div>
              <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                Select Instructor
              </label>
              <select
                value={selectedTeacherId}
                onChange={(e) => setSelectedTeacherId(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-hidden focus:border-sky-500"
              >
                {teachers.slice(0, 8).map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name} ({t.department})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                Subject Topic
              </label>
              <input
                type="text"
                value={subjectText}
                onChange={(e) => setSubjectText(e.target.value)}
                placeholder="e.g. Question regarding Question Set 4.2"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-hidden focus:border-sky-500"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                Query / Note
              </label>
              <textarea
                rows={4}
                required
                value={newMsgContent}
                onChange={(e) => setNewMsgContent(e.target.value)}
                placeholder="Type your message with respect and clarity..."
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-hidden focus:border-sky-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-xl flex items-center justify-center gap-2 shadow-sm transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send Message</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
