import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { MessageSquare, Send, Users, Bell, Megaphone, Check } from 'lucide-react';

export const TeacherCommunication: React.FC = () => {
  const { currentTeacher, students, messages, sendMessage, createAnnouncement } = useSchool();
  const [activeTab, setActiveTab] = useState<'messages' | 'broadcast'>('messages');

  const [selectedStudentId, setSelectedStudentId] = useState(students[0]?.id || 'student-demo-01');
  const [msgContent, setMsgContent] = useState('');
  const [broadcastTitle, setBroadcastTitle] = useState('');
  const [broadcastContent, setBroadcastContent] = useState('');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const teacherMessages = messages.filter(
    (m) => m.senderId === currentTeacher.id || m.recipientId === currentTeacher.id
  );

  const handleSendPrivate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!msgContent.trim()) return;
    sendMessage(selectedStudentId, msgContent, 'Academic Feedback & Query');
    setMsgContent('');
    setToastMsg('Message sent to student.');
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastTitle || !broadcastContent) return;
    createAnnouncement({
      title: broadcastTitle,
      content: broadcastContent,
      category: 'Academic',
      targetAudience: 'class-10',
      publishedBy: currentTeacher.name,
      publishedRole: 'Class Teacher Grade 10-A'
    });
    setBroadcastTitle('');
    setBroadcastContent('');
    setToastMsg('Class announcement published to Grade 10 students.');
    setTimeout(() => setToastMsg(null), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs px-4 py-2.5 rounded-xl shadow-lg border border-slate-700 flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
            Communication Gateway
          </span>
          <h2 className="font-display font-bold text-2xl text-slate-900 dark:text-white mt-0.5">
            Student Messages & Class Announcements
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Publish official class circulars or converse with individual students privately
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('messages')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              activeTab === 'messages'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            Direct Messages
          </button>
          <button
            onClick={() => setActiveTab('broadcast')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              activeTab === 'broadcast'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            Class Announcement
          </button>
        </div>
      </div>

      {activeTab === 'messages' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Thread List */}
          <div className="lg:col-span-7 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <h3 className="font-display font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-sky-600 dark:text-sky-400" />
              <span>Conversation History</span>
            </h3>

            <div className="space-y-3 max-h-[440px] overflow-y-auto pr-2">
              {teacherMessages.length === 0 ? (
                <p className="text-xs text-slate-400 text-center py-10">No messages in mailbox.</p>
              ) : (
                teacherMessages.map((msg) => {
                  const isMe = msg.senderId === currentTeacher.id;
                  return (
                    <div
                      key={msg.id}
                      className={`p-4 rounded-xl border text-xs space-y-1.5 ${
                        isMe
                          ? 'bg-blue-50/70 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800 ml-6'
                          : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 mr-6'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-semibold text-slate-900 dark:text-white">
                          {isMe ? 'You' : msg.senderName}
                        </span>
                        <span className="text-slate-400">{msg.timestamp}</span>
                      </div>
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
              Send Student Message
            </h3>

            <form onSubmit={handleSendPrivate} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Select Student</label>
                <select
                  value={selectedStudentId}
                  onChange={(e) => setSelectedStudentId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                >
                  {students.slice(0, 15).map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} (Roll #{s.rollNo} · Grade {s.class}-{s.section})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Message Content</label>
                <textarea
                  rows={4}
                  required
                  value={msgContent}
                  onChange={(e) => setMsgContent(e.target.value)}
                  placeholder="Type message to the student / parent..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-xl flex items-center justify-center gap-2 shadow-sm"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Private Message</span>
              </button>
            </form>
          </div>
        </div>
      ) : (
        /* Class Announcement Broadcast */
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs max-w-2xl mx-auto space-y-4">
          <div className="flex items-center gap-2">
            <Megaphone className="w-5 h-5 text-sky-600 dark:text-sky-400" />
            <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
              Broadcast Class Notice (Grade 10-A)
            </h3>
          </div>

          <form onSubmit={handleSendBroadcast} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-400 mb-1">Notice Headline *</label>
              <input
                type="text"
                required
                placeholder="e.g. Mathematics Formula Sheet for Tomorrow's Quiz"
                value={broadcastTitle}
                onChange={(e) => setBroadcastTitle(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">Notice Body *</label>
              <textarea
                rows={4}
                required
                placeholder="Write the circular details clearly..."
                value={broadcastContent}
                onChange={(e) => setBroadcastContent(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-xl flex items-center justify-center gap-2 shadow-sm"
            >
              <Megaphone className="w-4 h-4" />
              <span>Broadcast Notice to Class 10-A</span>
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
