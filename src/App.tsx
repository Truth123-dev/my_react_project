

import React, { useState, useMemo } from 'react';

// ==========================================
// TYPES & INTERFACES
// ==========================================

export interface Space {
  id: string;
  name: string;
  type: 'desk' | 'room' | 'office';
  status: 'available' | 'reserved';
  x: number;
  y: number;
  width: number;
  height: number;
  currentOccupant?: string;
}

export interface Booking {
  id: string;
  spaceId: string;
  spaceName: string;
  date: string;
  timeStart: string;
  timeEnd: string;
  user: string;
  resources: string[];
  recurring: 'none' | 'daily' | 'weekly';
  timezone: string;
}

export interface Visitor {
  id: string;
  name: string;
  email: string;
  hostName: string;
  purpose: string;
  signedNDA: boolean;
  status: 'expected' | 'checked_in' | 'checked_out';
  checkInTime?: string;
}

type KioskViewType = 'registry' | 'kiosk_start' | 'kiosk_form' | 'kiosk_nda' | 'kiosk_done';

// ==========================================
// INITIAL MOCK DATA
// ==========================================

const INITIAL_SPACES: Space[] = [
  // Desks Area Left
  { id: 'desk-1', name: 'Desk 01', type: 'desk', status: 'available', x: 80, y: 80, width: 60, height: 40 },
  { id: 'desk-2', name: 'Desk 02', type: 'desk', status: 'reserved', x: 80, y: 140, width: 60, height: 40, currentOccupant: 'Sarah Connor' },
  { id: 'desk-3', name: 'Desk 03', type: 'desk', status: 'available', x: 80, y: 200, width: 60, height: 40 },
  
  { id: 'desk-4', name: 'Desk 04', type: 'desk', status: 'available', x: 160, y: 80, width: 60, height: 40 },
  { id: 'desk-5', name: 'Desk 05', type: 'desk', status: 'available', x: 160, y: 140, width: 60, height: 40 },
  { id: 'desk-6', name: 'Desk 06', type: 'desk', status: 'reserved', x: 160, y: 200, width: 60, height: 40, currentOccupant: 'Alex Mercer' },

  // Meeting Rooms Right
  { id: 'room-alpha', name: 'Boardroom Alpha', type: 'room', status: 'available', x: 450, y: 60, width: 140, height: 100 },
  { id: 'room-beta', name: 'Huddle Room Beta', type: 'room', status: 'reserved', x: 450, y: 190, width: 140, height: 80, currentOccupant: 'Marketing Sync' },
  
  // Executive Offices Top Right
  { id: 'office-1', name: 'Executive Suite A', type: 'office', status: 'available', x: 620, y: 60, width: 120, height: 100 },
];

const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'b-1',
    spaceId: 'room-beta',
    spaceName: 'Huddle Room Beta',
    date: new Date().toISOString().split('T')[0],
    timeStart: '10:00',
    timeEnd: '11:30',
    user: 'Marketing Sync',
    resources: ['Projector', 'Whiteboard'],
    recurring: 'weekly',
    timezone: 'America/New_York',
  },
  {
    id: 'b-2',
    spaceId: 'desk-2',
    spaceName: 'Desk 02',
    date: new Date().toISOString().split('T')[0],
    timeStart: '09:00',
    timeEnd: '17:00',
    user: 'Sarah Connor',
    resources: [],
    recurring: 'none',
    timezone: 'America/New_York',
  }
];

const INITIAL_VISITORS: Visitor[] = [
  { id: 'v-1', name: 'Alice Smith', email: 'alice@example.com', hostName: 'John Doe', purpose: 'Client Interview', signedNDA: true, status: 'checked_in', checkInTime: '09:15 AM' },
  { id: 'v-2', name: 'Bob Jenkins', email: 'bob@example.com', hostName: 'Clara Oswald', purpose: 'Vendor Delivery', signedNDA: false, status: 'expected' },
];

const TIMEZONES = [
  { value: 'America/New_York', label: 'EST (UTC-5)' },
  { value: 'Europe/London', label: 'GMT (UTC+0)' },
  { value: 'Asia/Tokyo', label: 'JST (UTC+9)' },
];

// ==========================================
// MAIN DASHBOARD COMPONENT
// ==========================================

export default function WorkspaceManagement() {
  const [activeTab, setActiveTab] = useState<'floorplan' | 'scheduler' | 'visitor'>('floorplan');
  const [spaces, setSpaces] = useState<Space[]>(INITIAL_SPACES);
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);
  const [visitors, setVisitors] = useState<Visitor[]>(INITIAL_VISITORS);
  const [selectedSpace, setSelectedSpace] = useState<Space | null>(null);

  const handleReserveSpace = (spaceId: string, occupantName: string) => {
    if (!occupantName.trim()) return;

    setSpaces(prev => prev.map(space => {
      if (space.id === spaceId) {
        return { ...space, status: 'reserved', currentOccupant: occupantName };
      }
      return space;
    }));

    const targetSpace = spaces.find(s => s.id === spaceId);
    if (targetSpace) {
      const newBooking: Booking = {
        id: `b-${Date.now()}`,
        spaceId: targetSpace.id,
        spaceName: targetSpace.name,
        date: new Date().toISOString().split('T')[0],
        timeStart: '09:00',
        timeEnd: '17:00',
        user: occupantName,
        resources: [],
        recurring: 'none',
        timezone: 'America/New_York'
      };
      setBookings(prev => [newBooking, ...prev]);
    }
    setSelectedSpace(null);
  };

  const handleReleaseSpace = (spaceId: string) => {
    setSpaces(prev => prev.map(space => {
      if (space.id === spaceId) {
        return { ...space, status: 'available', currentOccupant: undefined };
      }
      return space;
    }));
    setBookings(prev => prev.filter(b => b.spaceId !== spaceId));
    setSelectedSpace(null);
  };

  const handleAddBooking = (newBooking: Booking) => {
    setBookings(prev => [newBooking, ...prev]);
  };

  const handleDeleteBooking = (id: string) => {
    setBookings(prev => prev.filter(b => b.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-850 flex flex-col font-sans">
      {/* NAVIGATION HEADER */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-indigo-600 rounded-lg text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div>
              <span className="font-bold text-lg text-slate-900 tracking-tight">FlexSpace</span>
              <span className="text-xs block text-slate-500 font-medium">Workspace & Facility Portal</span>
            </div>
          </div>

          <nav className="flex space-x-1 bg-slate-100 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('floorplan')}
              className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'floorplan'
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              <span>Floor Plan</span>
            </button>
            <button
              onClick={() => setActiveTab('scheduler')}
              className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'scheduler'
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>Scheduler</span>
            </button>
            <button
              onClick={() => setActiveTab('visitor')}
              className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === 'visitor'
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span>Visitors</span>
            </button>
          </nav>
        </div>
      </header>

      {/* RENDER ACTIVE SCREEN */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {activeTab === 'floorplan' && (
          <FloorPlanTab
            spaces={spaces}
            selectedSpace={selectedSpace}
            setSelectedSpace={setSelectedSpace}
            onReserve={handleReserveSpace}
            onRelease={handleReleaseSpace}
          />
        )}

        {activeTab === 'scheduler' && (
          <SchedulerTab
            spaces={spaces}
            bookings={bookings}
            onAddBooking={handleAddBooking}
            onDeleteBooking={handleDeleteBooking}
          />
        )}

        {activeTab === 'visitor' && (
          <VisitorTab
            visitors={visitors}
            setVisitors={setVisitors}
          />
        )}
      </main>
    </div>
  );
}

// ==========================================
// SUB-COMPONENT: INTERACTIVE FLOOR PLAN
// ==========================================

interface FloorPlanTabProps {
  spaces: Space[];
  selectedSpace: Space | null;
  setSelectedSpace: (space: Space | null) => void;
  onReserve: (spaceId: string, occupant: string) => void;
  onRelease: (spaceId: string) => void;
}

function FloorPlanTab({ spaces, selectedSpace, setSelectedSpace, onReserve, onRelease }: FloorPlanTabProps) {
  const [occupantName, setOccupantName] = useState('');

  const handleSelectSpace = (space: Space) => {
    setSelectedSpace(space);
    setOccupantName(space.currentOccupant || '');
  };

  const reservedCount = useMemo(() => spaces.filter(s => s.status === 'reserved').length, [spaces]);
  const availableCount = useMemo(() => spaces.filter(s => s.status === 'available').length, [spaces]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Interactive Office Map</h1>
          <p className="text-slate-500 text-sm">Select desks, shared spaces, or boardrooms directly from the visual map canvas.</p>
        </div>
        <div className="flex items-center space-x-4 bg-white p-3 rounded-xl border border-slate-200 self-start shadow-sm text-xs font-semibold">
          <div className="flex items-center space-x-1.5">
            <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 inline-block border border-emerald-600" />
            <span className="text-slate-700">{availableCount} Available</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="w-3.5 h-3.5 rounded-full bg-rose-500 inline-block border border-rose-600" />
            <span className="text-slate-700">{reservedCount} Reserved</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* SVG RENDER PANEL */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col">
          <div className="mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">HQ - East Wing Level 3</span>
            <span className="text-xs text-slate-400 block mt-0.5">Clickable interface layout mapping</span>
          </div>

          <div className="overflow-x-auto">
            <svg
              viewBox="0 0 800 360"
              className="w-full h-auto border border-slate-200 rounded-xl bg-slate-50"
              style={{ minWidth: '600px' }}
            >
              {/* Boundaries & Walls */}
              <rect x="10" y="10" width="780" height="340" fill="none" stroke="#cbd5e1" strokeWidth="3" />
              <line x1="400" y1="10" x2="400" y2="350" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="6,4" />
              <line x1="10" y1="280" x2="400" y2="280" stroke="#cbd5e1" strokeWidth="2" />
              
              {/* Text Area Labels */}
              <text x="30" y="315" fill="#94a3b8" className="text-xs font-semibold tracking-wider">COLLABORATIVE ZONE</text>
              <text x="420" y="315" fill="#94a3b8" className="text-xs font-semibold tracking-wider">BOARD MEETING ZONE</text>

              {/* Spaces Layout Rendering */}
              {spaces.map((space) => {
                const isSelected = selectedSpace?.id === space.id;
                const isReserved = space.status === 'reserved';
                
                let fillVal = 'fill-emerald-50';
                let strokeVal = 'stroke-emerald-500';
                
                if (isReserved) {
                  fillVal = 'fill-rose-50';
                  strokeVal = 'stroke-rose-500';
                }
                if (isSelected) {
                  fillVal = 'fill-indigo-50';
                  strokeVal = 'stroke-indigo-600';
                }

                return (
                  <g
                    key={space.id}
                    onClick={() => handleSelectSpace(space)}
                    className="cursor-pointer transition-all duration-150 hover:opacity-85"
                  >
                    <rect
                      x={space.x}
                      y={space.y}
                      width={space.width}
                      height={space.height}
                      rx="6"
                      className={`${fillVal} ${strokeVal}`}
                      strokeWidth={isSelected ? '3' : '2'}
                    />
                    <text
                      x={space.x + space.width / 2}
                      y={space.y + space.height / 2 + 4}
                      textAnchor="middle"
                      className={`text-[10px] font-bold select-none ${
                        isSelected ? 'fill-indigo-950' : isReserved ? 'fill-rose-950' : 'fill-emerald-950'
                      }`}
                    >
                      {space.name}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
          <p className="text-xs text-slate-400 mt-4 text-center">
            💡 Select any desk block on the map to configure or release assignments.
          </p>
        </div>

        {/* SIDE BAR ASSIGNMENT PANEL */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm h-fit">
          <h2 className="text-lg font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">
            Inspector Panel
          </h2>

          {selectedSpace ? (
            <div className="space-y-4">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  selectedSpace.type === 'room' ? 'bg-indigo-100 text-indigo-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {selectedSpace.type === 'room' ? '⚡ Conference Room' : '🏢 Office Desk'}
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-1">{selectedSpace.name}</h3>
                <p className="text-xs text-slate-400">ID Reference: {selectedSpace.id}</p>
              </div>

              {selectedSpace.status === 'reserved' ? (
                <div className="space-y-3">
                  <div className="p-3.5 bg-rose-50 border border-rose-100 rounded-lg text-rose-800 text-sm">
                    <p className="font-semibold">Currently Assigned:</p>
                    <p className="text-xs mt-0.5">{selectedSpace.currentOccupant}</p>
                  </div>
                  <button
                    onClick={() => onRelease(selectedSpace.id)}
                    className="w-full bg-rose-600 hover:bg-rose-700 text-white font-medium py-2 rounded-lg text-xs transition-colors"
                  >
                    Release Assignment
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="p-3.5 bg-emerald-50 border border-emerald-100 rounded-lg text-emerald-800 text-xs">
                    This workspace is completely open and free to reserve.
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      Assigned Occupant
                    </label>
                    <input
                      type="text"
                      placeholder="Enter occupant's full name"
                      value={occupantName}
                      onChange={(e) => setOccupantName(e.target.value)}
                      className="w-full text-xs border border-slate-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    />
                  </div>
                  <button
                    onClick={() => onReserve(selectedSpace.id, occupantName)}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-lg text-xs transition-colors"
                  >
                    Assign Space
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12 text-slate-400">
              <svg className="w-12 h-12 mx-auto text-slate-300 mb-3" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.303.197l-1.593 1.593M21.75 12H19.5m-.197 5.303l-1.593-1.593M12 21.75V19.5m-5.303-.197l1.593-1.593M2.25 12H4.5m.197-5.303L6.29 8.29" />
              </svg>
              <p className="text-xs">Click a workspace element inside the map canvas to manage its settings.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ==========================================
// SUB-COMPONENT: SCHEDULER ENGINE
// ==========================================

interface SchedulerTabProps {
  spaces: Space[];
  bookings: Booking[];
  onAddBooking: (booking: Booking) => void;
  onDeleteBooking: (id: string) => void;
}

function SchedulerTab({ spaces, bookings, onAddBooking, onDeleteBooking }: SchedulerTabProps) {
  const [selectedFilterSpace, setSelectedFilterSpace] = useState<string>('all');
  const [timezone, setTimezone] = useState('America/New_York');

  // Booking Form Fields
  const [targetSpaceId, setTargetSpaceId] = useState('');
  const [organizer, setOrganizer] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('10:00');
  const [recurrence, setRecurrence] = useState<'none' | 'daily' | 'weekly'>('none');
  const [selectedOverlays, setSelectedOverlays] = useState<string[]>([]);

  const handleOverlayToggle = (res: string) => {
    setSelectedOverlays(prev =>
      prev.includes(res) ? prev.filter(item => item !== res) : [...prev, res]
    );
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetSpaceId || !organizer.trim()) return;

    const matchedSpace = spaces.find(s => s.id === targetSpaceId);

    const newBooking: Booking = {
      id: `booking-${Date.now()}`,
      spaceId: targetSpaceId,
      spaceName: matchedSpace ? matchedSpace.name : 'Workspace Room',
      date,
      timeStart: startTime,
      timeEnd: endTime,
      user: organizer,
      resources: selectedOverlays,
      recurring: recurrence,
      timezone: timezone
    };

    onAddBooking(newBooking);
    setOrganizer('');
    setSelectedOverlays([]);
  };

  const filteredBookings = useMemo(() => {
    if (selectedFilterSpace === 'all') return bookings;
    return bookings.filter(b => b.spaceId === selectedFilterSpace);
  }, [bookings, selectedFilterSpace]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Facility Scheduler</h1>
        <p className="text-slate-500 text-sm">Coordinate reservations, repeat frequencies, and specific resource dependencies.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ADD BOOKING FORM */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm h-fit">
          <h2 className="text-base font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
            <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Reserve Slot
          </h2>

          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Target Space</label>
              <select
                required
                value={targetSpaceId}
                onChange={(e) => setTargetSpaceId(e.target.value)}
                className="w-full text-xs border border-slate-200 rounded-lg px-3 py-2 bg-white"
              >
                <option value="">-- Choose Space --</option>
                {spaces.map(s => (
                  <option key={s.id} value={s.id}>{s.name} ({s.type})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Host/User</label>
              <input
                type="text"
                required
                placeholder="Organizer's full name"
                value={organizer}
                onChange={(e) => setOrganizer(e.target.value)}
                className="w-full text-xs border border-slate-200 rounded-lg px-3 py-2 focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Date</label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full text-xs border border-slate-200 rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Timezone</label>
                <select
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  className="w-full text-xs border border-slate-200 rounded-lg px-3 py-2 bg-white"
                >
                  {TIMEZONES.map(tz => (
                    <option key={tz.value} value={tz.value}>{tz.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Start Time</label>
                <input
                  type="time"
                  required
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full text-xs border border-slate-200 rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">End Time</label>
                <input
                  type="time"
                  required
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full text-xs border border-slate-200 rounded-lg px-3 py-2"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Repeat Frequency</label>
              <div className="flex gap-4 mt-1">
                {['none', 'daily', 'weekly'].map((opt) => (
                  <label key={opt} className="inline-flex items-center text-xs text-slate-700 capitalize cursor-pointer">
                    <input
                      type="radio"
                      name="recurrence"
                      value={opt}
                      checked={recurrence === opt}
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      onChange={() => setRecurrence(opt as any)}
                      className="mr-1.5 text-indigo-600 border-slate-300 focus:ring-0"
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Extra Equipment</label>
              <div className="grid grid-cols-2 gap-2 mt-1.5">
                {['Projector', 'Whiteboard', 'AV Equipment', 'Catering Support'].map((item) => {
                  const active = selectedOverlays.includes(item);
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => handleOverlayToggle(item)}
                      className={`text-left text-xs px-2.5 py-1.5 rounded-lg border transition-all ${
                        active
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-700 font-semibold'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-xl text-xs transition-colors mt-2"
            >
              Add Booking Block
            </button>
          </form>
        </div>

        {/* SCHEDULE LIST DISPLAY */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-slate-500">Filter Selection:</span>
              <select
                value={selectedFilterSpace}
                onChange={(e) => setSelectedFilterSpace(e.target.value)}
                className="text-xs border border-slate-200 rounded-lg px-3 py-1.5 bg-white font-medium"
              >
                <option value="all">All Desks & Rooms</option>
                {spaces.map(s => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
              <h3 className="font-bold text-slate-800 text-xs">Active Scheduled Blocks ({filteredBookings.length})</h3>
            </div>

            <div className="divide-y divide-slate-100 max-h-115 overflow-y-auto">
              {filteredBookings.length === 0 ? (
                <p className="p-8 text-center text-slate-400 text-xs">No active bookings found for your filter criteria.</p>
              ) : (
                filteredBookings.map((b) => (
                  <div key={b.id} className="p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 hover:bg-slate-50 transition-colors">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-slate-900">{b.spaceName}</h4>
                        <span className="text-[9px] bg-indigo-50 border border-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full font-bold capitalize">
                          {b.recurring !== 'none' ? `🔄 Repeat: ${b.recurring}` : 'Single Event'}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500">
                        Organizer: <span className="font-medium text-slate-800">{b.user}</span> • Date: {b.date}
                      </p>
                      
                      {b.resources.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {b.resources.map(overlay => (
                            <span key={overlay} className="bg-slate-100 text-slate-600 border border-slate-200 text-[9px] px-1.5 py-0.5 rounded">
                              {overlay}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right sm:border-r sm:pr-4 border-slate-200">
                        <span className="text-xs font-bold text-slate-900">{b.timeStart} - {b.timeEnd}</span>
                        <span className="block text-[9px] text-slate-400 font-medium">Local: {b.timezone.split('/')[1]?.replace('_', ' ') || b.timezone}</span>
                      </div>
                      <button
                        onClick={() => onDeleteBooking(b.id)}
                        className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Delete Schedule"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// SUB-COMPONENT: VISITOR DESK & KIOSK
// ==========================================

interface VisitorTabProps {
  visitors: Visitor[];
  setVisitors: React.Dispatch<React.SetStateAction<Visitor[]>>;
}

function VisitorTab({ visitors, setVisitors }: VisitorTabProps) {
  const [visitorName, setVisitorName] = useState('');
  const [visitorEmail, setVisitorEmail] = useState('');
  const [hostName, setHostName] = useState('');
  const [purpose, setPurpose] = useState('');
  const [signedNDA, setSignedNDA] = useState(false);
  
  const [kioskSubView, setKioskSubView] = useState<KioskViewType>('registry');
  const [successCheckedInName, setSuccessCheckedInName] = useState('');

  const handleStartCheckIn = () => {
    setKioskSubView('kiosk_form');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!visitorName || !visitorEmail || !hostName) return;
    setKioskSubView('kiosk_nda');
  };

  const handleFinalizeCheckIn = () => {
    const newVisitor: Visitor = {
      id: `visitor-${Date.now()}`,
      name: visitorName,
      email: visitorEmail,
      hostName,
      purpose,
      signedNDA,
      status: 'checked_in',
      checkInTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setVisitors(prev => [newVisitor, ...prev]);
    setSuccessCheckedInName(visitorName);

    // Clear state inputs
    setVisitorName('');
    setVisitorEmail('');
    setHostName('');
    setPurpose('');
    setSignedNDA(false);

    setKioskSubView('kiosk_done');
  };

  const updateVisitorStatus = (visitorId: string, status: 'checked_in' | 'checked_out') => {
    setVisitors(prev => prev.map(v => {
      if (v.id === visitorId) {
        return {
          ...v,
          status,
          checkInTime: status === 'checked_in' ? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : v.checkInTime
        };
      }
      return v;
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Visitor Desk Management</h1>
          <p className="text-slate-500 text-sm">Register incoming visitors, track NDA signings, and review facility entry records.</p>
        </div>
        
        <div className="flex bg-slate-100 p-1 rounded-lg self-start">
          <button
            onClick={() => setKioskSubView('registry')}
            className={`px-4 py-2 text-xs font-semibold rounded-md transition-all ${
              kioskSubView === 'registry' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Reception Logs
          </button>
          <button
            onClick={() => setKioskSubView('kiosk_start')}
            className={`px-4 py-2 text-xs font-semibold rounded-md transition-all ${
              kioskSubView !== 'registry' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            🖥️ Kiosk Tablet Mode
          </button>
        </div>
      </div>

      {kioskSubView === 'registry' ? (
        /* RECEPTION DESK LOGS VIEW */
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 bg-slate-50 border-b border-slate-200">
            <h3 className="font-bold text-slate-800 text-xs">Guest Entry Logs</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-650 text-[10px] uppercase font-bold tracking-wider">
                  <th className="p-4 border-b border-slate-200">Visitor Info</th>
                  <th className="p-4 border-b border-slate-200">Destination Host</th>
                  <th className="p-4 border-b border-slate-200">Purpose</th>
                  <th className="p-4 border-b border-slate-200">NDA Signed</th>
                  <th className="p-4 border-b border-slate-200">Status</th>
                  <th className="p-4 border-b border-slate-200">Time Logged</th>
                  <th className="p-4 border-b border-slate-200 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                {visitors.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center p-8 text-slate-450">No logged guests for today.</td>
                  </tr>
                ) : (
                  visitors.map((v) => (
                    <tr key={v.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-4">
                        <div className="font-bold text-slate-900">{v.name}</div>
                        <div className="text-[10px] text-slate-400">{v.email}</div>
                      </td>
                      <td className="p-4">{v.hostName}</td>
                      <td className="p-4">{v.purpose || '-'}</td>
                      <td className="p-4">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold ${
                          v.signedNDA ? 'bg-emerald-50 text-emerald-800 border border-emerald-150' : 'bg-rose-50 text-rose-800 border border-rose-150'
                        }`}>
                          {v.signedNDA ? '✓ Signed' : '✗ Unsigned'}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold capitalize ${
                          v.status === 'checked_in' ? 'bg-indigo-50 text-indigo-700 border border-indigo-150' :
                          v.status === 'checked_out' ? 'bg-slate-100 text-slate-600' : 'bg-amber-50 text-amber-700 border border-amber-150'
                        }`}>
                          {v.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="p-4 font-mono text-slate-500">{v.checkInTime || '--:--'}</td>
                      <td className="p-4 text-right">
                        {v.status === 'expected' && (
                          <button
                            onClick={() => updateVisitorStatus(v.id, 'checked_in')}
                            className="text-[10px] bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-1 px-2 rounded transition-all"
                          >
                            Check In
                          </button>
                        )}
                        {v.status === 'checked_in' && (
                          <button
                            onClick={() => updateVisitorStatus(v.id, 'checked_out')}
                            className="text-[10px] bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold py-1 px-2 rounded transition-all"
                          >
                            Check Out
                          </button>
                        )}
                        {v.status === 'checked_out' && (
                          <span className="text-[10px] text-slate-400 font-medium">Completed</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* VIRTUAL TABLET KIOSK WORKFLOW */
        <div className="max-w-md mx-auto bg-slate-900 text-white rounded-3xl border-8 border-slate-950 p-6 shadow-2xl relative min-h-115 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-[9px] tracking-widest text-indigo-400 font-bold uppercase">Front Lobby Kiosk</span>
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          </div>

          {/* KIOSK SCREEN 1: SPLASH LANDING */}
          {kioskSubView === 'kiosk_start' && (
            <div className="py-12 text-center space-y-6 my-auto">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold tracking-tight text-white">Welcome Visitors</h3>
                <p className="text-xs text-slate-400">Please check in to alert your host of your arrival.</p>
              </div>
              <div>
                <button
                  onClick={handleStartCheckIn}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-xl text-sm shadow-md transition-colors inline-block"
                >
                  Start Check-In
                </button>
              </div>
            </div>
          )}

          {/* KIOSK SCREEN 2: REGISTRATION FORM */}
          {kioskSubView === 'kiosk_form' && (
            <form onSubmit={handleFormSubmit} className="space-y-4 my-auto">
              <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wide">Enter Guest Details</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={visitorName}
                    onChange={(e) => setVisitorName(e.target.value)}
                    className="w-full text-xs bg-slate-950 border border-slate-700 text-white rounded px-3 py-2 focus:outline-none focus:border-indigo-500"
                    placeholder="e.g. Jane Doe"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={visitorEmail}
                    onChange={(e) => setVisitorEmail(e.target.value)}
                    className="w-full text-xs bg-slate-950 border border-slate-700 text-white rounded px-3 py-2 focus:outline-none focus:border-indigo-500"
                    placeholder="e.g. jane@example.com"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Target Host</label>
                    <input
                      type="text"
                      required
                      value={hostName}
                      onChange={(e) => setHostName(e.target.value)}
                      className="w-full text-xs bg-slate-950 border border-slate-700 text-white rounded px-3 py-2 focus:outline-none focus:border-indigo-500"
                      placeholder="Host Name"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Visit Purpose</label>
                    <input
                      type="text"
                      value={purpose}
                      onChange={(e) => setPurpose(e.target.value)}
                      className="w-full text-xs bg-slate-950 border border-slate-700 text-white rounded px-3 py-2 focus:outline-none focus:border-indigo-500"
                      placeholder="e.g. Interview"
                    />
                  </div>
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setKioskSubView('kiosk_start')}
                  className="w-1/3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold py-2 rounded-lg text-xs transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-2/3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 rounded-lg text-xs transition-colors"
                >
                  Continue
                </button>
              </div>
            </form>
          )}

          {/* KIOSK SCREEN 3: NDA AGREEMENT SIGN-OFF */}
          {kioskSubView === 'kiosk_nda' && (
            <div className="space-y-4 my-auto">
              <h3 className="text-xs font-bold uppercase tracking-wide text-slate-100">Facility NDA & Liability Terms</h3>
              <div className="bg-slate-950 p-3 h-28 rounded border border-slate-850 text-[10px] overflow-y-auto text-slate-400 leading-relaxed space-y-2">
                <p className="font-bold">1. Confidentiality Terms</p>
                <p>The visitor agrees that structural mockups, facility layouts, proprietary machinery, and documents visible in this workspace are confidential and are not to be photographed or distributed.</p>
                <p className="font-bold">2. Safety and Liability</p>
                <p>The visitor agrees to abide by standard building safety guidelines and acknowledges they are entering workspace spaces at their own discretion.</p>
              </div>

              <label className="flex items-start gap-2.5 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={signedNDA}
                  onChange={(e) => setSignedNDA(e.target.checked)}
                  className="mt-0.5 rounded bg-slate-950 border-slate-750 text-indigo-600 focus:ring-0"
                />
                <span className="text-xs text-slate-300">
                  I accept the Terms of Visitor Entry.
                </span>
              </label>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setKioskSubView('kiosk_form')}
                  className="w-1/2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold py-2 rounded-lg text-xs transition-all"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleFinalizeCheckIn}
                  disabled={!signedNDA}
                  className={`w-1/2 font-bold py-2 rounded-lg text-xs transition-all ${
                    signedNDA ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  Sign In
                </button>
              </div>
            </div>
          )}

          {/* KIOSK SCREEN 4: SIGN-IN SUCCESS */}
          {kioskSubView === 'kiosk_done' && (
            <div className="py-8 text-center space-y-5 my-auto">
              <div className="w-14 h-14 bg-emerald-950 border border-emerald-500 rounded-full text-emerald-400 flex items-center justify-center mx-auto text-xl">
                ✓
              </div>
              <div className="space-y-1.5">
                <h3 className="text-xl font-bold text-white">Welcome, {successCheckedInName}!</h3>
                <p className="text-xs text-slate-400 px-6 leading-relaxed">
                  Your registration is complete. A notification ping has been sent directly to your host. Please wait in the lobby area.
                </p>
              </div>
              <button
                onClick={() => setKioskSubView('kiosk_start')}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold py-2 px-6 rounded-lg transition-colors"
              >
                Done
              </button>
            </div>
          )}

          <div className="text-[9px] text-slate-500 text-center pt-2">
            Facility System Integration • Powered by FlexSpace
          </div>
        </div>
      )}
    </div>
  );
}