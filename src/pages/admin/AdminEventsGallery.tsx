import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { Calendar, Plus, MapPin, Clock, Image, Trash2, CheckCircle2 } from 'lucide-react';
import { SchoolEvent } from '../../types';

export const AdminEventsGallery: React.FC = () => {
  const { events } = useSchool();
  const [eventList, setEventList] = useState<SchoolEvent[]>(events);
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);

  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '2026-11-20',
    time: '10:00 AM - 04:00 PM',
    venue: 'CPS Central Amphitheatre',
    category: 'Cultural' as SchoolEvent['category'],
    description: ''
  });

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEvent.title) return;
    const created: SchoolEvent = {
      ...newEvent,
      id: `evt-${Date.now()}`,
      image: '/src/assets/images/hero_school_campus_1791637300796.jpg'
    };
    setEventList([created, ...eventList]);
    setIsAddEventOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
            Campus Engagements
          </span>
          <h2 className="font-display font-bold text-2xl text-slate-900 dark:text-white mt-0.5">
            School Events & Gallery Management
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Coordinate inter-school symposiums, cultural carnivals, and photographic records
          </p>
        </div>

        <button
          onClick={() => setIsAddEventOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Event</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {eventList.map((evt) => (
          <div
            key={evt.id}
            className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex flex-col justify-between"
          >
            {evt.image && (
              <div className="h-44 overflow-hidden">
                <img
                  src={evt.image}
                  alt={evt.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            )}
            <div className="p-5 space-y-2 flex-1">
              <div className="flex items-center justify-between text-[10px]">
                <span className="font-bold px-2 py-0.5 rounded-full bg-sky-50 dark:bg-sky-950 text-sky-700 dark:text-sky-300 uppercase">
                  {evt.category}
                </span>
                <span className="text-slate-400 font-semibold">{evt.date}</span>
              </div>

              <h4 className="font-display font-bold text-base text-slate-900 dark:text-white">
                {evt.title}
              </h4>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">
                {evt.description}
              </p>

              <div className="pt-2 text-[11px] text-slate-400 space-y-1">
                <p className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{evt.time}</span>
                </p>
                <p className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{evt.venue}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      {isAddEventOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 text-xs">
            <div className="flex items-center justify-between border-b pb-3 border-slate-100 dark:border-slate-800">
              <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
                Schedule Institutional Event
              </h3>
              <button onClick={() => setIsAddEventOpen(false)} className="text-slate-400">✕</button>
            </div>

            <form onSubmit={handleAddEvent} className="space-y-4">
              <div>
                <label className="block text-slate-400 mb-1">Event Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Annual Inter-School Science Fair"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Date</label>
                  <input
                    type="date"
                    required
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Category</label>
                  <select
                    value={newEvent.category}
                    onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                  >
                    <option value="Academic">Academic</option>
                    <option value="Sports">Sports</option>
                    <option value="Cultural">Cultural</option>
                    <option value="Celebration">Celebration</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Time & Venue</label>
                <input
                  type="text"
                  required
                  value={newEvent.venue}
                  onChange={(e) => setNewEvent({ ...newEvent, venue: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Event Narrative Description</label>
                <textarea
                  rows={3}
                  required
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddEventOpen(false)}
                  className="px-4 py-2 text-slate-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-sky-600 text-white font-semibold rounded-lg shadow-sm"
                >
                  Create Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
