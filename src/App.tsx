

import React, { useState, useMemo, useEffect } from 'react';
import { 
  Users, 
  Network, 
  User, 
  Clock, 
  Search, 
  SlidersHorizontal, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Briefcase, 
  UserCheck, 
  MapPinned, 
  FileText, 
  DollarSign, 
  Plus, 
  CheckCircle2, 
  FileSpreadsheet,
  X
} from 'lucide-react';

// ==========================================
// TYPES & INTERFACES
// ==========================================

interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  role: string;
  department: string;
  email: string;
  phone: string;
  managerId: string | null;
  avatarColor: string;
  startDate: string;
  location: string;
  bio: string;
}

interface TimeLog {
  id: string;
  date: string;
  clockIn: string;
  clockOut: string | null;
  duration: string | null;
  location: string;
}

interface LeaveRequest {
  id: string;
  type: 'PTO' | 'Sick Leave' | 'Maternity/Paternity' | 'Unpaid';
  startDate: string;
  endDate: string;
  status: 'Approved' | 'Pending' | 'Rejected';
  reason: string;
}

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  emergencyName: string;
  emergencyPhone: string;
  emergencyRelation: string;
  routingNumber: string;
  accountNumber: string;
  taxStatus: string;
}

// ==========================================
// MOCK DATA
// ==========================================

const INITIAL_EMPLOYEES: Employee[] = [
  {
    id: '1',
    firstName: 'Zarah',
    lastName: 'Joe',
    role: 'Chief Executive Officer',
    department: 'Executive',
    email: 'zarah.jeo@enterprise.com',
    phone: '+1 (555) 019-2834',
    managerId: null,
    avatarColor: 'bg-indigo-600',
    startDate: '2018-03-12',
    location: 'New York (HQ)',
    bio: 'Zarah has over 15 years of executive experience leading scaleups in corporate technology transformation.'
  },
  {
    id: '2',
    firstName: 'Michael',
    lastName: 'luis',
    role: 'VP of Engineering',
    department: 'Engineering',
    email: 'michael.luis@enterprise.com',
    phone: '+1 (555) 014-9382',
    managerId: '1',
    avatarColor: 'bg-emerald-600',
    startDate: '2019-06-20',
    location: 'San Francisco',
    bio: 'Michael oversees global engineering efforts, driving software stability and performance optimization.'
  },
  {
    id: '3',
    firstName: 'Zophia',
    lastName: 'Rodriguez',
    role: 'HeHHad of People Operations',
    department: 'Human Resources',
    email: 'zophia.rodriguez@enterprise.com',
    phone: '+1 (555) 017-4829',
    managerId: '1',
    avatarColor: 'bg-violet-600',
    startDate: '2020-01-15',
    location: 'New York (HQ)',
    bio: 'Zophia manages recruitment, talent development, and workspace compliance.'
  },
  {
    id: '4',
    firstName: 'Alex',
    lastName: 'Him',
    role: 'Senior Software Engineer',
    department: 'Engineering',
    email: 'alex.Him@enterprise.com',
    phone: '+1 (555) 012-3849',
    managerId: '2',
    avatarColor: 'bg-sky-600',
    startDate: '2021-08-01',
    location: 'Remote (USA)',
    bio: 'Alex is the lead technical maintainer of core platform services and security architecture.'
  },
  {
    id: '5',
    firstName: 'Emily',
    lastName: 'Taju',
    role: 'HR Business Partner',
    department: 'Human Resources',
    email: 'emily.taju@enterprise.com',
    phone: '+1 (555) 015-1102',
    managerId: '3',
    avatarColor: 'bg-rose-600',
    startDate: '2022-02-10',
    location: 'Chicago',
    bio: 'Emily facilitates talent alignment, performance reviews, and conflict mitigation.'
  },
  {
    id: '6',
    firstName: 'David',
    lastName: 'Olatunji',
    role: 'Frontend Engineer',
    department: 'Engineering',
    email: 'david.olatunji@enterprise.com',
    phone: '+1 (555) 011-8899',
    managerId: '4',
    avatarColor: 'bg-amber-600',
    startDate: '2023-05-14',
    location: 'Remote (Canada)',
    bio: 'David coordinates cross-functional efforts to modernise end-user web experiences.'
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<'directory' | 'profile' | 'time'>('directory');

  // Employee Directory State
  
  const [employees] = useState<Employee[]>(INITIAL_EMPLOYEES);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'org'>('grid');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  // Profile Management State
  const [profile, setProfile] = useState<UserProfile>({
    firstName: 'Alex',
    lastName: 'Kim',
    email: 'alex.kim@enterprise.com',
    phone: '+1 (555) 012-3849',
    address: '123 Pine St, San Francisco, CA 94109',
    emergencyName: 'Jane Kim',
    emergencyPhone: '+1 (555) 987-6543',
    emergencyRelation: 'Spouse',
    routingNumber: '*********',
    accountNumber: '*********',
    taxStatus: 'Single (W-4 Standard)'
  });
  const [profileSavedMsg, setProfileSavedMsg] = useState(false);

  // Time & Attendance State
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [clockInTime, setClockInTime] = useState<string | null>(null);
  const [currentDuration, setCurrentDuration] = useState('00:00:00');
  const [geoLocationStatus, setGeoLocationStatus] = useState<string>('Not Validated');
  const [geoCoordinates, setGeoCoordinates] = useState<string | null>(null);
  const [timeLogs, setTimeLogs] = useState<TimeLog[]>([
    { id: '1', date: '2024-11-01', clockIn: '09:02 AM', clockOut: '05:15 PM', duration: '8h 13m', location: 'Office (37.7749° N, -122.4194° W)' },
    { id: '2', date: '2024-10-31', clockIn: '08:55 AM', clockOut: '05:00 PM', duration: '8h 05m', location: 'Remote (37.8044° N, -122.2711° W)' }
  ]);

  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([
    { id: '1', type: 'PTO', startDate: '2024-11-20', endDate: '2024-11-24', status: 'Approved', reason: 'Family vacation' },
    { id: '2', type: 'Sick Leave', startDate: '2024-10-15', endDate: '2024-10-15', status: 'Approved', reason: 'Dental appointment' }
  ]);

  const [newLeave, setNewLeave] = useState<{
    type: 'PTO' | 'Sick Leave' | 'Maternity/Paternity' | 'Unpaid';
    startDate: string;
    endDate: string;
    reason: string;
  }>({
    type: 'PTO',
    startDate: '',
    endDate: '',
    reason: ''
  });

  // Time counter effect
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let interval: any;
    if (isClockedIn && clockInTime) {
      interval = setInterval(() => {
        const diff = Date.now() - new Date(clockInTime).getTime();
        const hrs = Math.floor(diff / 3600000).toString().padStart(2, '0');
        const mins = Math.floor((diff % 3600000) / 60000).toString().padStart(2, '0');
        const secs = Math.floor((diff % 60000) / 1000).toString().padStart(2, '0');
        setCurrentDuration(`${hrs}:${mins}:${secs}`);
      }, 1000);
    } else {
      setCurrentDuration('00:00:00');
    }
    return () => clearInterval(interval);
  }, [isClockedIn, clockInTime]);

  // ==========================================
  // DIRECTORY FILTERING
  // ==========================================

  const filteredEmployees = useMemo(() => {
    return employees.filter(emp => {
      const matchesSearch = `${emp.firstName} ${emp.lastName} ${emp.role}`.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDept = selectedDept === 'All' || emp.department === selectedDept;
      return matchesSearch && matchesDept;
    });
  }, [employees, searchTerm, selectedDept]);

  const departments = useMemo(() => {
    return ['All', ...Array.from(new Set(employees.map(emp => emp.department)))];
  }, [employees]);

  // ==========================================
  // TIME & GEOLOCATION METHODS
  // ==========================================

  const handleClockInOut = () => {
    if (!isClockedIn) {
      setGeoLocationStatus('Locating...');
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const lat = position.coords.latitude.toFixed(4);
            const lng = position.coords.longitude.toFixed(4);
            setGeoCoordinates(`${lat}° N, ${lng}° W`);
            setGeoLocationStatus('Validated');
            triggerClockIn(`${lat}° N, ${lng}° W`);
          },
          () => {
            setGeoCoordinates('37.7749° N, -122.4194° W');
            setGeoLocationStatus('Validated (Simulated)');
            triggerClockIn('Simulated (37.7749° N, -122.4194° W)');
          }
        );
      } else {
        setGeoLocationStatus('Not Supported');
        triggerClockIn('Unknown Location');
      }
    } else {
      const now = new Date();
      const newLog: TimeLog = {
        id: Date.now().toString(),
        date: now.toISOString().split('T')[0],
        clockIn: clockInTime ? new Date(clockInTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Unknown',
        clockOut: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        duration: currentDuration,
        location: geoCoordinates || 'Unknown Location'
      };
      setTimeLogs([newLog, ...timeLogs]);
      setIsClockedIn(false);
      setClockInTime(null);
      setGeoCoordinates(null);
      setGeoLocationStatus('Not Validated');
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const triggerClockIn = (_locString: string) => {
    setIsClockedIn(true);
    setClockInTime(new Date().toString());
  };

  // ==========================================
  // SUBMIT LEAVE REQUEST
  // ==========================================

  const handleLeaveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeave.startDate || !newLeave.endDate || !newLeave.reason) return;
    const request: LeaveRequest = {
      id: Date.now().toString(),
      type: newLeave.type,
      startDate: newLeave.startDate,
      endDate: newLeave.endDate,
      status: 'Pending',
      reason: newLeave.reason
    };
    setLeaveRequests([request, ...leaveRequests]);
    setNewLeave({ type: 'PTO', startDate: '', endDate: '', reason: '' });
  };

  // ==========================================
  // UPDATE PROFILE HANDLER
  // ==========================================

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProfileSavedMsg(true);
    setTimeout(() => setProfileSavedMsg(false), 4000);
  };

  // ==========================================
  // ORG CHART COMPONENT (Hierarchical Tree Structure)
  // ==========================================

  const OrgNode: React.FC<{ emp: Employee; all: Employee[] }> = ({ emp, all }) => {
    const directReports = all.filter(e => e.managerId === emp.id);
    return (
      <div className="flex flex-col items-center">
        <div 
          onClick={() => setSelectedEmployee(emp)}
          className="cursor-pointer border border-slate-200 hover:border-indigo-400 bg-white shadow-sm hover:shadow p-4 rounded-xl w-60 text-center transition-all duration-200"
        >
          <div className={`w-10 h-10 rounded-full ${emp.avatarColor} text-white flex items-center justify-center mx-auto text-sm font-semibold mb-2`}>
            {emp.firstName[0]}{emp.lastName[0]}
          </div>
          <h4 className="font-semibold text-slate-800 text-sm">{emp.firstName} {emp.lastName}</h4>
          <p className="text-xs text-indigo-600 font-medium">{emp.role}</p>
          <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-wider">{emp.department}</p>
        </div>
        
        {directReports.length > 0 && (
          <div className="flex flex-col items-center mt-4 relative">
            <div className="w-px h-6 bg-slate-300"></div>
            <div className="flex gap-6 relative">
              <div className="absolute top-0 left-1/2 right-1/2 border-t border-slate-300"></div>
              {directReports.map((report, idx) => (
                <div key={report.id} className="relative pt-4">
                  {/* Visual connection lines to sibling nodes */}
                  {directReports.length > 1 && (
                    <div className={`absolute top-0 border-t border-slate-300 h-4
                      ${idx === 0 ? 'left-1/2 right-0' : ''}
                      ${idx === directReports.length - 1 ? 'right-1/2 left-0' : ''}
                      ${idx > 0 && idx < directReports.length - 1 ? 'left-0 right-0' : ''}
                    `}></div>
                  )}
                  <OrgNode emp={report} all={all} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const rootEmployees = employees.filter(emp => !emp.managerId);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans antialiased">
      {/* Header Bar */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-sm shadow-indigo-100">
            W
          </div>
          <div>
            <h1 className="font-semibold text-lg text-slate-900 leading-tight">Workforce & HR Suite</h1>
            <p className="text-xs text-slate-500">Enterprise Administration Portal</p>
          </div>
        </div>

        {/* Current Employee mini widget */}
        <div className="flex items-center gap-3 border-l pl-6 border-slate-200">
          <div className="text-right">
            <p className="text-sm font-semibold text-slate-800">{profile.firstName} {profile.lastName}</p>
            <p className="text-xs text-slate-500">Software Architecture</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-sky-600 text-white flex items-center justify-center font-bold text-sm">
            {profile.firstName[0]}{profile.lastName[0]}
          </div>
        </div>
      </header>

      {/* Main Layout Area */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Navigation Sidebar */}
        <aside className="w-full md:w-64 bg-white border-b md:border-b-0 md:border-r border-slate-200 p-4 flex flex-col gap-1 shrink-0">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 mb-2">Modules</p>
          
          <button 
            onClick={() => setActiveTab('directory')}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'directory' 
                ? 'bg-indigo-50 text-indigo-700' 
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <Users className="w-4 h-4" />
            Employee Directory
          </button>

          <button 
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'profile' 
                ? 'bg-indigo-50 text-indigo-700' 
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <User className="w-4 h-4" />
            Profile Management
          </button>

          <button 
            onClick={() => setActiveTab('time')}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'time' 
                ? 'bg-indigo-50 text-indigo-700' 
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <Clock className="w-4 h-4" />
            Time & Attendance
          </button>
        </aside>

        {/* Content Viewport */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto max-w-7xl mx-auto w-full">

          {/* ==========================================
              MODULE 1: EMPLOYEE DIRECTORY & ORG CHART
              ========================================== */}
          {activeTab === 'directory' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-950">Employee Directory & Hierarchy</h2>
                  <p className="text-sm text-slate-500">Search profiles, structure visual organizational reporting, and manage access.</p>
                </div>

                <div className="inline-flex rounded-lg border border-slate-200 bg-white p-1">
                  <button 
                    onClick={() => setViewMode('grid')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                      viewMode === 'grid' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Users className="w-3.5 h-3.5" /> Grid View
                  </button>
                  <button 
                    onClick={() => setViewMode('org')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                      viewMode === 'org' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Network className="w-3.5 h-3.5" /> Org Chart
                  </button>
                </div>
              </div>

              {viewMode === 'grid' ? (
                <>
                  {/* Search and Filters */}
                  <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col md:flex-row gap-4 items-center">
                    <div className="relative w-full md:flex-1">
                      <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                      <input 
                        type="text" 
                        placeholder="Search by name, role, department..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9 pr-4 py-2 w-full text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50/50"
                      />
                    </div>
                    <div className="flex items-center gap-2 w-full md:w-auto">
                      <SlidersHorizontal className="h-4 w-4 text-slate-500 shrink-0" />
                      <select 
                        value={selectedDept}
                        onChange={(e) => setSelectedDept(e.target.value)}
                        className="text-sm border border-slate-200 rounded-lg p-2 bg-white w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        {departments.map(dept => (
                          <option key={dept} value={dept}>{dept} Department</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Grid Listing */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredEmployees.map(emp => (
                      <div 
                        key={emp.id} 
                        className="bg-white border border-slate-200 hover:border-slate-300 rounded-xl p-5 shadow-sm hover:shadow transition-all flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center gap-4 mb-4">
                            <div className={`w-12 h-12 rounded-full ${emp.avatarColor} text-white flex items-center justify-center font-bold text-lg`}>
                              {emp.firstName[0]}{emp.lastName[0]}
                            </div>
                            <div>
                              <h3 className="font-semibold text-slate-950 text-base">{emp.firstName} {emp.lastName}</h3>
                              <p className="text-xs text-indigo-600 font-medium">{emp.role}</p>
                              <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold tracking-wide uppercase bg-slate-100 text-slate-600 mt-1">
                                {emp.department}
                              </span>
                            </div>
                          </div>
                          
                          <div className="space-y-2 border-t border-slate-100 pt-4 text-xs text-slate-600">
                            <div className="flex items-center gap-2">
                              <Mail className="w-3.5 h-3.5 text-slate-400" />
                              <span className="truncate">{emp.email}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone className="w-3.5 h-3.5 text-slate-400" />
                              <span>{emp.phone}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="w-3.5 h-3.5 text-slate-400" />
                              <span>{emp.location}</span>
                            </div>
                          </div>
                        </div>

                        <button 
                          onClick={() => setSelectedEmployee(emp)}
                          className="mt-5 w-full text-center bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold py-2 rounded-lg border border-slate-200 transition-colors"
                        >
                          View Details & Org Context
                        </button>
                      </div>
                    ))}
                  </div>

                  {filteredEmployees.length === 0 && (
                    <div className="text-center py-12 bg-white rounded-xl border border-dashed border-slate-200">
                      <Users className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                      <p className="text-slate-800 font-medium text-sm">No employees match details</p>
                      <p className="text-slate-500 text-xs mt-1">Try modifying your search or filter requirements.</p>
                    </div>
                  )}
                </>
              ) : (
                /* Org Chart Viewport */
                <div className="bg-white border border-slate-200 rounded-xl p-8 overflow-auto min-h-125 flex justify-center">
                  <div className="pt-4">
                    {rootEmployees.map(root => (
                      <OrgNode key={root.id} emp={root} all={employees} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}


          {/* ==========================================
              MODULE 2: PROFILE MANAGEMENT (SELF-SERVICE)
              ========================================== */}
          {activeTab === 'profile' && (
            <div className="space-y-6 max-w-4xl">
              <div>
                <h2 className="text-xl font-bold text-slate-950">Profile Management Portal</h2>
                <p className="text-sm text-slate-500">Submit and audit emergency contact channels, tax classification adjustments, and direct deposits.</p>
              </div>

              {profileSavedMsg && (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg p-3 flex items-center gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Profile adjustments successfully staged and routed to HR review queue.
                </div>
              )}

              <form onSubmit={handleProfileSubmit} className="space-y-6">
                
                {/* Section 1: Demographics */}
                <div className="bg-white border border-slate-200 rounded-xl p-6">
                  <h3 className="font-bold text-slate-900 border-b pb-3 mb-4 flex items-center gap-2 text-sm">
                    <User className="w-4 h-4 text-indigo-600" /> Personal Identity Details
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">First Name</label>
                      <input 
                        type="text" 
                        value={profile.firstName}
                        onChange={(e) => setProfile({...profile, firstName: e.target.value})}
                        className="w-full text-sm border border-slate-200 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Last Name</label>
                      <input 
                        type="text" 
                        value={profile.lastName}
                        onChange={(e) => setProfile({...profile, lastName: e.target.value})}
                        className="w-full text-sm border border-slate-200 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Personal Email Address</label>
                      <input 
                        type="email" 
                        value={profile.email}
                        onChange={(e) => setProfile({...profile, email: e.target.value})}
                        className="w-full text-sm border border-slate-200 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Mobile Contact Phone</label>
                      <input 
                        type="text" 
                        value={profile.phone}
                        onChange={(e) => setProfile({...profile, phone: e.target.value})}
                        className="w-full text-sm border border-slate-200 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 outline-none"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Residential Address</label>
                      <input 
                        type="text" 
                        value={profile.address}
                        onChange={(e) => setProfile({...profile, address: e.target.value})}
                        className="w-full text-sm border border-slate-200 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 2: Emergency Contact */}
                <div className="bg-white border border-slate-200 rounded-xl p-6">
                  <h3 className="font-bold text-slate-900 border-b pb-3 mb-4 flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-indigo-600" /> Emergency Communications
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Full Name</label>
                      <input 
                        type="text" 
                        value={profile.emergencyName}
                        onChange={(e) => setProfile({...profile, emergencyName: e.target.value})}
                        className="w-full text-sm border border-slate-200 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Relationship</label>
                      <input 
                        type="text" 
                        value={profile.emergencyRelation}
                        onChange={(e) => setProfile({...profile, emergencyRelation: e.target.value})}
                        className="w-full text-sm border border-slate-200 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Primary Contact Number</label>
                      <input 
                        type="text" 
                        value={profile.emergencyPhone}
                        onChange={(e) => setProfile({...profile, emergencyPhone: e.target.value})}
                        className="w-full text-sm border border-slate-200 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 3: Direct Deposit & Taxes */}
                <div className="bg-white border border-slate-200 rounded-xl p-6">
                  <h3 className="font-bold text-slate-900 border-b pb-3 mb-4 flex items-center gap-2 text-sm">
                    <DollarSign className="w-4 h-4 text-indigo-600" /> Direct Deposit & IRS Tax Classification
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Routing Number (ABA)</label>
                      <input 
                        type="text" 
                        value={profile.routingNumber}
                        onChange={(e) => setProfile({...profile, routingNumber: e.target.value})}
                        className="w-full text-sm border border-slate-200 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 outline-none font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Account Number</label>
                      <input 
                        type="text" 
                        value={profile.accountNumber}
                        onChange={(e) => setProfile({...profile, accountNumber: e.target.value})}
                        className="w-full text-sm border border-slate-200 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 outline-none font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Tax Filing Classification</label>
                      <select 
                        value={profile.taxStatus}
                        onChange={(e) => setProfile({...profile, taxStatus: e.target.value})}
                        className="w-full text-sm border border-slate-200 rounded-lg p-2.5 bg-white focus:ring-2 focus:ring-indigo-500 outline-none"
                      >
                        <option>Single (W-4 Standard)</option>
                        <option>Married filing jointly</option>
                        <option>Head of household</option>
                      </select>
                    </div>
                  </div>
                  
                  {/* Tax Documents Audit List */}
                  <div className="mt-6 pt-6 border-t border-slate-100">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Retrieved W-4 / Employment Tax Documents</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="flex items-center justify-between p-3 border border-slate-200 rounded-lg bg-slate-50/50">
                        <div className="flex items-center gap-2.5">
                          <FileText className="w-4.5 h-4.5 text-slate-500" />
                          <div>
                            <p className="text-xs font-semibold text-slate-800">Form W-4 (2024)</p>
                            <p className="text-[10px] text-slate-500">Processed 12/01/2023</p>
                          </div>
                        </div>
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">ACTIVE</span>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 border border-slate-200 rounded-lg bg-slate-50/50">
                        <div className="flex items-center gap-2.5">
                          <FileText className="w-4.5 h-4.5 text-slate-500" />
                          <div>
                            <p className="text-xs font-semibold text-slate-800">Form I-9 Verification</p>
                            <p className="text-[10px] text-slate-500">Validated Onboarding</p>
                          </div>
                        </div>
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">VERIFIED</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button 
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm px-6 py-2.5 rounded-lg shadow-sm transition-colors"
                  >
                    Stage Adjustments for Verification
                  </button>
                </div>
              </form>
            </div>
          )}


          {/* ==========================================
              MODULE 3: TIME & ATTENDANCE
              ========================================== */}
          {activeTab === 'time' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-bold text-slate-950">Time & Attendance Hub</h2>
                <p className="text-sm text-slate-500">Audit timesheet metrics, handle clock operations with automatic geoposition verification, or request leave.</p>
              </div>

              {/* Top Row: Clock-in Widget and Geolocation Log */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Clock Panel */}
                <div className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between shadow-sm">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Time Clock</span>
                      <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-semibold ${
                        isClockedIn ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${isClockedIn ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`}></span>
                        {isClockedIn ? 'Currently Active' : 'Not Clocked In'}
                      </span>
                    </div>

                    <div className="text-center py-6">
                      <p className="text-3xl font-mono font-bold tracking-tight text-slate-900">{currentDuration}</p>
                      <p className="text-xs text-slate-400 mt-1">Shift Duration Progress Tracker</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <button 
                      onClick={handleClockInOut}
                      className={`w-full py-3 rounded-lg text-sm font-bold text-white shadow-sm transition-all ${
                        isClockedIn 
                          ? 'bg-rose-600 hover:bg-rose-700' 
                          : 'bg-indigo-600 hover:bg-indigo-700'
                      }`}
                    >
                      {isClockedIn ? 'Clock Out' : 'Authenticate & Clock In'}
                    </button>

                    <div className="flex items-center justify-between text-xs border-t pt-3 border-slate-100">
                      <div className="flex items-center gap-1.5 text-slate-500">
                        <MapPinned className="w-3.5 h-3.5" />
                        <span>Geo-Validation:</span>
                      </div>
                      <span className={`font-semibold ${
                        geoLocationStatus.includes('Validated') ? 'text-emerald-600' : 'text-slate-600'
                      }`}>
                        {geoLocationStatus}
                      </span>
                    </div>
                    {geoCoordinates && (
                      <p className="text-[10px] text-center font-mono text-slate-400">Position coordinates: {geoCoordinates}</p>
                    )}
                  </div>
                </div>

                {/* Submit PTO/Leave Request Form */}
                <div className="bg-white border border-slate-200 rounded-xl p-6 lg:col-span-2 shadow-sm">
                  <h3 className="font-bold text-slate-900 border-b pb-3 mb-4 text-sm">Request PTO / Leave Workflows</h3>
                  <form onSubmit={handleLeaveSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">Leave Classification</label>
                        <select 
                          value={newLeave.type}
                          // eslint-disable-next-line @typescript-eslint/no-explicit-any
                          onChange={(e: any) => setNewLeave({...newLeave, type: e.target.value})}
                          className="w-full text-sm border border-slate-200 rounded-lg p-2 bg-white focus:ring-2 focus:ring-indigo-500 outline-none"
                        >
                          <option value="PTO">PTO (Vacation)</option>
                          <option value="Sick Leave">Sick Leave</option>
                          <option value="Maternity/Paternity">Maternity/Paternity</option>
                          <option value="Unpaid">Unpaid Leave</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">Start Date</label>
                        <input 
                          type="date" 
                          value={newLeave.startDate}
                          onChange={(e) => setNewLeave({...newLeave, startDate: e.target.value})}
                          required
                          className="w-full text-sm border border-slate-200 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">End Date</label>
                        <input 
                          type="date" 
                          value={newLeave.endDate}
                          onChange={(e) => setNewLeave({...newLeave, endDate: e.target.value})}
                          required
                          className="w-full text-sm border border-slate-200 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">Operational Coverage Reason</label>
                      <input 
                        type="text" 
                        placeholder="Please state primary reasons for cover request..."
                        value={newLeave.reason}
                        onChange={(e) => setNewLeave({...newLeave, reason: e.target.value})}
                        required
                        className="w-full text-sm border border-slate-200 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                      />
                    </div>

                    <div className="flex justify-end pt-2">
                      <button 
                        type="submit"
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs px-4 py-2 rounded-lg shadow-sm transition-colors flex items-center gap-1.5"
                      >
                        <Plus className="w-3.5 h-3.5" /> File Request Route
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              {/* Bottom Row: Timesheet Logs & Leave Approvals Tracker */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Timesheet Audit Trail */}
                <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-slate-900 text-sm">Historical Work Timesheet Logs</h3>
                    <FileSpreadsheet className="w-4 h-4 text-slate-400" />
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs text-slate-600 border-collapse">
                      <thead>
                        <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider">
                          <th className="pb-2.5">Date</th>
                          <th className="pb-2.5">Clock In</th>
                          <th className="pb-2.5">Clock Out</th>
                          <th className="pb-2.5">Total Hours</th>
                          <th className="pb-2.5 text-right">Validated Point</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {timeLogs.map(log => (
                          <tr key={log.id} className="hover:bg-slate-50/50">
                            <td className="py-2.5 font-medium text-slate-800">{log.date}</td>
                            <td className="py-2.5 text-emerald-600 font-medium">{log.clockIn}</td>
                            <td className="py-2.5 text-rose-600 font-medium">{log.clockOut || '---'}</td>
                            <td className="py-2.5 font-semibold text-slate-900">{log.duration || '---'}</td>
                            <td className="py-2.5 text-right font-mono text-[9px] text-slate-400 truncate max-w-37.5">{log.location}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Leave Requests Approvals */}
                <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-slate-900 text-sm">Leave Approvals & Workflow Status</h3>
                    <UserCheck className="w-4 h-4 text-slate-400" />
                  </div>
                  <div className="space-y-3">
                    {leaveRequests.map(req => (
                      <div key={req.id} className="border border-slate-150 rounded-lg p-3 bg-slate-50/50 flex items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-xs text-slate-800">{req.type}</span>
                            <span className="text-[10px] text-slate-400">•</span>
                            <span className="text-[10px] text-slate-500 font-mono">{req.startDate} to {req.endDate}</span>
                          </div>
                          <p className="text-xs text-slate-600 mt-1 leading-relaxed">"{req.reason}"</p>
                        </div>
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold tracking-wide uppercase ${
                          req.status === 'Approved' 
                            ? 'bg-emerald-100 text-emerald-800' 
                            : req.status === 'Pending' 
                            ? 'bg-amber-100 text-amber-800' 
                            : 'bg-rose-100 text-rose-800'
                        }`}>
                          {req.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          )}

        </main>
      </div>

      {/* ==========================================
          MODAL: EMPLOYEE DETAIL DRAWER
          ========================================== */}
      {selectedEmployee && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex justify-center items-center p-4">
          <div className="bg-white border border-slate-200 shadow-2xl rounded-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="bg-slate-50 border-b border-slate-150 p-5 flex justify-between items-center">
              <h3 className="font-bold text-slate-900 text-sm">Detailed Personnel Record</h3>
              <button 
                onClick={() => setSelectedEmployee(null)}
                className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              <div className="flex items-center gap-4">
                <div className={`w-16 h-16 rounded-full ${selectedEmployee.avatarColor} text-white flex items-center justify-center font-extrabold text-xl`}>
                  {selectedEmployee.firstName[0]}{selectedEmployee.lastName[0]}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-lg leading-tight">{selectedEmployee.firstName} {selectedEmployee.lastName}</h4>
                  <p className="text-sm text-indigo-600 font-medium">{selectedEmployee.role}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{selectedEmployee.department} Team</p>
                </div>
              </div>

              {selectedEmployee.bio && (
                <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-150">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Administrative Bio</p>
                  <p className="text-xs text-slate-700 leading-relaxed font-normal">{selectedEmployee.bio}</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4 text-xs border-t border-b border-slate-100 py-4">
                <div>
                  <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Email Contact</p>
                  <p className="font-semibold text-slate-800 mt-0.5 break-all">{selectedEmployee.email}</p>
                </div>
                <div>
                  <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Contact Extension</p>
                  <p className="font-semibold text-slate-800 mt-0.5">{selectedEmployee.phone}</p>
                </div>
                <div>
                  <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Hire Start Date</p>
                  <p className="font-semibold text-slate-800 mt-0.5 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    {selectedEmployee.startDate}
                  </p>
                </div>
                <div>
                  <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Regional HQ Location</p>
                  <p className="font-semibold text-slate-800 mt-0.5 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {selectedEmployee.location}
                  </p>
                </div>
              </div>

              {/* Hierarchy Context */}
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Internal Organization Alignment</p>
                <div className="space-y-2 text-xs">
                  {selectedEmployee.managerId ? (
                    <div className="flex items-center gap-2 text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                      <Briefcase className="w-4 h-4 text-slate-400" />
                      <span>Reports to: <strong className="text-slate-800 font-semibold">{
                        employees.find(e => e.id === selectedEmployee.managerId)?.firstName + ' ' +
                        employees.find(e => e.id === selectedEmployee.managerId)?.lastName
                      }</strong></span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-indigo-700 bg-indigo-50/50 p-2.5 rounded-lg border border-indigo-100">
                      <Briefcase className="w-4 h-4 text-indigo-600" />
                      <span className="font-semibold">Top Level Executive Leader</span>
                    </div>
                  )}

                  {employees.filter(e => e.managerId === selectedEmployee.id).length > 0 && (
                    <div className="flex items-start gap-2 text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                      <Network className="w-4 h-4 text-slate-400 mt-0.5" />
                      <div>
                        <span>Direct Reports:</span>
                        <div className="flex flex-wrap gap-1 mt-1.5">
                          {employees.filter(e => e.managerId === selectedEmployee.id).map(report => (
                            <span key={report.id} className="bg-white px-2 py-0.5 rounded border border-slate-200 text-[10px] font-medium text-slate-700">
                              {report.firstName} {report.lastName}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-slate-50 border-t border-slate-150 p-4 flex justify-end">
              <button 
                onClick={() => setSelectedEmployee(null)}
                className="bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs px-4 py-2 rounded-lg transition-colors"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}