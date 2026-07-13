

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  MapPin, 
  Briefcase, 
  Globe, 
  Github, 
  Linkedin, 
  X, 
  Plus, 
  Filter,
  ExternalLink
} from 'lucide-react';

// --- TYPES ---
interface Developer {
  id: string;
  name: string;
  title: string;
  location: string;
  avatar: string;
  availability: 'Available' | 'Busy' | 'Open to Offers';
  skills: string[];
  bio: string;
  github?: string;
  linkedin?: string;
  portfolio?: string;
  email: string;
}

interface Filters {
  search: string;
  location: string;
  selectedSkills: string[];
  availableOnly: boolean;
}

// --- MOCK DATA ---
const INITIAL_DEVELOPERS: Developer[] = [
  {
    id: '1',
    name: 'Sarah Jenkins',
    title: 'Senior Frontend Engineer',
    location: 'San Francisco, CA',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80',
    availability: 'Available',
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'Framer Motion'],
    bio: 'Passionate frontend developer focused on building highly interactive, accessible, and performant web applications with modern technologies.',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    portfolio: 'https://example.com',
    email: 'sarah.j@example.com'
  },
  {
    id: '2',
    name: 'Marcus Chen',
    title: 'Full Stack Developer',
    location: 'Toronto, ON',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80',
    availability: 'Open to Offers',
    skills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'GraphQL'],
    bio: 'Pragmatic software engineer with a focus on writing clean, testable code. Experienced in building scalable APIs and responsive UI systems.',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    email: 'marcus.chen@example.com'
  },
  {
    id: '3',
    name: 'Elena Rostova',
    title: 'UI/UX Engineer',
    location: 'Berlin, DE',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80',
    availability: 'Busy',
    skills: ['Figma', 'React', 'Tailwind CSS', 'CSS Grid', 'Three.js'],
    bio: 'Bridging the gap between beautiful visual designs and functional frontends. Specializing in micro-interactions and motion design.',
    github: 'https://github.com',
    portfolio: 'https://example.com',
    email: 'elena.r@example.com'
  },
  {
    id: '4',
    name: 'Amara Diallo',
    title: 'Mobile & Web Developer',
    location: 'London, UK',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&h=150&q=80',
    availability: 'Available',
    skills: ['React', 'React Native', 'TypeScript', 'Tailwind CSS', 'Firebase'],
    bio: 'Cross-platform app developer. Helping startups turn ideas into live products quickly and efficiently.',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    portfolio: 'https://example.com',
    email: 'amara@example.com'
  },
  {
    id: '5',
    name: 'Kenji Takahashi',
    title: 'Backend Specialist',
    location: 'Tokyo, JP',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80',
    availability: 'Open to Offers',
    skills: ['Node.js', 'Express', 'TypeScript', 'MongoDB', 'Docker'],
    bio: 'Designing robust database architectures and APIs. Advocate for serverless technologies and automation pipelines.',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    email: 'kenji@example.com'
  },
  {
    id: '6',
    name: 'Kenji Erica',
    title: 'Backend Specialist',
    location: 'Tokyo, JP',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80',
    availability: 'Open to Offers',
    skills: ['Node.js', 'Express', 'TypeScript', 'MongoDB', 'Docker'],
    bio: 'Designing robust database architectures and APIs. Advocate for serverless technologies and automation pipelines.',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    email: 'kenji@example.com'
  },
  {
    id: '7',
    name: 'Cisse Diallo',
    title: 'Mobile Developer',
    location: 'Darker, Senegal',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&h=150&q=80',
    availability: 'Available',
    skills: ['React', 'React Native', 'TypeScript', 'Tailwind CSS', 'Firebase'],
    bio: 'Cross-platform app developer. Helping startups turn ideas into live products quickly and efficiently.',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    portfolio: 'https://example.com',
    email: 'amara@example.com'
  },
  {
    id: '8',
    name: 'Kang Chen',
    title: 'Full Stack Developer',
    location: 'Toronto, ON',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80',
    availability: 'Open to Offers',
    skills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'GraphQL'],
    bio: 'Pragmatic software engineer with a focus on writing clean, testable code. Experienced in building scalable APIs and responsive UI systems.',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    email: 'marcus.chen@example.com'
  },
  {
    id: '9',
    name: 'Marcus Rus',
    title: 'Full Stack Developer',
    location: 'Toronto, ON',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80',
    availability: 'Open to Offers',
    skills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'GraphQL'],
    bio: 'Pragmatic software engineer with a focus on writing clean, testable code. Experienced in building scalable APIs and responsive UI systems.',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    email: 'marcus.chen@example.com'
  },
  {
    id: '10',
    name: 'Sarah Loveth',
    title: 'Senior Frontend Engineer',
    location: 'San Francisco, CA',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80',
    availability: 'Available',
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'Framer Motion'],
    bio: 'Passionate frontend developer focused on building highly interactive, accessible, and performant web applications with modern technologies.',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    portfolio: 'https://example.com',
    email: 'sarah.j@example.com'
  },

  
];

const ALL_SKILLS = [
  'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 
  'Next.js', 'Node.js', 'PostgreSQL', 'GraphQL', 
  'Figma', 'CSS Grid', 'Three.js', 'React Native', 
  'Firebase', 'Express', 'MongoDB', 'Docker'
];

const LOCATIONS = ['All Locations', 'San Francisco, CA', 'Toronto, ON', 'Berlin, DE', 'London, UK', 'Tokyo, JP'];

export default function App() {
  const [developers, setDevelopers] = useState<Developer[]>(INITIAL_DEVELOPERS);
  const [selectedDeveloper, setSelectedDeveloper] = useState<Developer | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  const [filters, setFilters] = useState<Filters>({
    search: '',
    location: 'All Locations',
    selectedSkills: [],
    availableOnly: false
  });

  // --- FILTER LOGIC ---
  const filteredDevelopers = useMemo(() => {
    return developers.filter(dev => {
      const matchesSearch = 
        dev.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        dev.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        dev.bio.toLowerCase().includes(filters.search.toLowerCase());

      const matchesLocation = 
        filters.location === 'All Locations' || dev.location === filters.location;

      const matchesSkills = 
        filters.selectedSkills.length === 0 || 
        filters.selectedSkills.every(skill => dev.skills.includes(skill));

      const matchesAvailability = 
        !filters.availableOnly || dev.availability === 'Available';

      return matchesSearch && matchesLocation && matchesSkills && matchesAvailability;
    });
  }, [developers, filters]);

  // --- TOGGLE SKILL SELECTION ---
  const handleSkillToggle = (skill: string) => {
    setFilters(prev => ({
      ...prev,
      selectedSkills: prev.selectedSkills.includes(skill)
        ? prev.selectedSkills.filter(s => s !== skill)
        : [...prev.selectedSkills, skill]
    }));
  };

  // --- ADD NEW DEVELOPER ---
  const handleAddDeveloper = (newDev: Omit<Developer, 'id'>) => {
    const id = (developers.length + 1).toString();
    setDevelopers(prev => [...prev, { ...newDev, id }]);
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      location: 'All Locations',
      selectedSkills: [],
      availableOnly: false
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased selection:bg-indigo-100">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-100">
              <span className="font-extrabold text-lg">DF</span>
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900">DevFind</h1>
              <p className="text-xs text-slate-500">Developer Directory</p>
            </div>
          </div>
          
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-1.5 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 transition duration-150"
          >
            <Plus className="h-4 w-4" />
            <span>Join Directory</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <div className="mb-10 text-center md:text-left md:flex md:items-center md:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Discover and Connect with Developers
            </h2>
            <p className="mt-2 text-base text-slate-600">
              A curated platform to browse registered software engineers, filterable by locations, engineering skills, and current availability status.
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-4 justify-center md:justify-end text-sm text-slate-600">
            <div className="rounded-lg bg-white px-4 py-2 shadow-sm border border-slate-100 text-center">
              <span className="block text-xl font-bold text-slate-900">{developers.length}</span>
              <span>Registered</span>
            </div>
            <div className="rounded-lg bg-white px-4 py-2 shadow-sm border border-slate-100 text-center">
              <span className="block text-xl font-bold text-green-600">
                {developers.filter(d => d.availability === 'Available').length}
              </span>
              <span>Available Now</span>
            </div>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1 space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                <span className="flex items-center gap-2 font-bold text-slate-900">
                  <Filter className="h-4 w-4 text-slate-500" />
                  Filters
                </span>
                {(filters.search || filters.location !== 'All Locations' || filters.selectedSkills.length > 0 || filters.availableOnly) && (
                  <button 
                    onClick={clearFilters}
                    className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
                  >
                    Clear All
                  </button>
                )}
              </div>

              <div className="space-y-5">
                {/* Search */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Name, title, or bio..."
                      value={filters.search}
                      onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                      className="w-full rounded-lg border border-slate-200 py-2 pl-9 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Location</label>
                  <select
                    value={filters.location}
                    onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                    className="w-full rounded-lg border border-slate-200 bg-white p-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  >
                    {LOCATIONS.map(loc => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                </div>

                {/* Availability Toggle */}
                <div>
                  <label className="flex items-center gap-2 cursor-pointer py-1">
                    <input
                      type="checkbox"
                      checked={filters.availableOnly}
                      onChange={(e) => setFilters(prev => ({ ...prev, availableOnly: e.target.checked }))}
                      className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-sm font-medium text-slate-700">Available for Hire Only</span>
                  </label>
                </div>

                {/* Skills Multi-select */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                    Skills ({filters.selectedSkills.length})
                  </label>
                  <div className="flex flex-wrap gap-1.5 max-h-48 overflow-y-auto pr-1">
                    {ALL_SKILLS.map(skill => {
                      const isSelected = filters.selectedSkills.includes(skill);
                      return (
                        <button
                          key={skill}
                          onClick={() => handleSkillToggle(skill)}
                          className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium transition ${
                            isSelected 
                              ? 'bg-indigo-600 text-white' 
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          {skill}
                          {isSelected && <X className="h-3 w-3" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Directory Listings */}
          <div className="lg:col-span-3">
            {filteredDevelopers.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-white py-16 px-4 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                  <Search className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-slate-900">No Developers Found</h3>
                <p className="mt-1 text-sm text-slate-500">
                  Try adjusting your search query, location filter, or skill tags.
                </p>
                <button
                  onClick={clearFilters}
                  className="mt-4 rounded-lg bg-indigo-50 px-3 py-2 text-xs font-semibold text-indigo-600 hover:bg-indigo-100 transition"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <motion.div 
                layout 
                className="grid grid-cols-1 gap-4 sm:grid-cols-2"
              >
                <AnimatePresence mode="popLayout">
                  {filteredDevelopers.map(dev => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      key={dev.id}
                      onClick={() => setSelectedDeveloper(dev)}
                      className="group cursor-pointer rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md hover:border-slate-300 flex flex-col justify-between"
                    >
                      <div>
                        {/* Status + Avatar */}
                        <div className="flex items-start justify-between gap-4">
                          <img 
                            src={dev.avatar} 
                            alt={dev.name} 
                            className="h-12 w-12 rounded-xl object-cover ring-2 ring-slate-100"
                          />
                          <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                            dev.availability === 'Available' 
                              ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/10' 
                              : dev.availability === 'Open to Offers' 
                              ? 'bg-amber-50 text-amber-700 ring-1 ring-amber-600/10'
                              : 'bg-slate-100 text-slate-600 ring-1 ring-slate-500/10'
                          }`}>
                            <span className={`h-1.5 w-1.5 rounded-full ${
                              dev.availability === 'Available' ? 'bg-emerald-500' : dev.availability === 'Open to Offers' ? 'bg-amber-500' : 'bg-slate-400'
                            }`} />
                            {dev.availability}
                          </span>
                        </div>

                        {/* Title Info */}
                        <div className="mt-4">
                          <h3 className="font-bold text-slate-900 group-hover:text-indigo-600 transition">
                            {dev.name}
                          </h3>
                          <p className="text-sm font-medium text-slate-600">{dev.title}</p>
                          
                          <div className="mt-2.5 flex items-center gap-1 text-xs text-slate-500">
                            <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
                            <span>{dev.location}</span>
                          </div>
                        </div>

                        {/* Bio snippet */}
                        <p className="mt-3 text-xs text-slate-500 line-clamp-2 leading-relaxed">
                          {dev.bio}
                        </p>
                      </div>

                      {/* Skills Snippet */}
                      <div className="mt-5 pt-4 border-t border-slate-100">
                        <div className="flex flex-wrap gap-1">
                          {dev.skills.slice(0, 3).map(skill => (
                            <span 
                              key={skill} 
                              className="inline-flex rounded bg-slate-50 px-2 py-0.5 text-[10px] font-semibold text-slate-600 ring-1 ring-inset ring-slate-500/10"
                            >
                              {skill}
                            </span>
                          ))}
                          {dev.skills.length > 3 && (
                            <span className="inline-flex items-center rounded bg-indigo-50 px-2 py-0.5 text-[10px] font-bold text-indigo-700">
                              +{dev.skills.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </div>

        </div>
      </main>

      {/* --- DEVELOPER DETAIL MODAL --- */}
      <AnimatePresence>
        {selectedDeveloper && (
          <React.Fragment>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedDeveloper(null)}
              className="fixed inset-0 z-50 bg-slate-900"
            />
            {/* Modal Box */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 16 }}
                transition={{ duration: 0.2 }}
                className="w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-xl border border-slate-200"
              >
                {/* Header Profile background */}
                <div className="h-24 bg-gradient-to-r from-indigo-500 to-indigo-800 p-4 flex justify-end">
                  <button 
                    onClick={() => setSelectedDeveloper(null)}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm hover:bg-white/30 transition"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="relative px-6 pb-6">
                  {/* Absolute positioning of Avatar to overlap the gradient */}
                  <div className="absolute -top-10 left-6">
                    <img 
                      src={selectedDeveloper.avatar} 
                      alt={selectedDeveloper.name} 
                      className="h-20 w-20 rounded-2xl object-cover ring-4 ring-white shadow-md"
                    />
                  </div>

                  <div className="pt-12">
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div>
                        <h3 className="text-xl font-bold text-slate-900">{selectedDeveloper.name}</h3>
                        <p className="text-sm font-semibold text-indigo-600">{selectedDeveloper.title}</p>
                      </div>
                      <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
                        selectedDeveloper.availability === 'Available' 
                          ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/10' 
                          : selectedDeveloper.availability === 'Open to Offers' 
                          ? 'bg-amber-50 text-amber-700 ring-1 ring-amber-600/10'
                          : 'bg-slate-100 text-slate-600 ring-1 ring-slate-500/10'
                      }`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${
                          selectedDeveloper.availability === 'Available' ? 'bg-emerald-500' : selectedDeveloper.availability === 'Open to Offers' ? 'bg-amber-500' : 'bg-slate-400'
                        }`} />
                        {selectedDeveloper.availability}
                      </span>
                    </div>

                    <div className="mt-3 flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5 text-slate-400" />
                        {selectedDeveloper.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Briefcase className="h-3.5 w-3.5 text-slate-400" />
                        {selectedDeveloper.email}
                      </span>
                    </div>

                    <div className="mt-5">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">About</h4>
                      <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">
                        {selectedDeveloper.bio}
                      </p>
                    </div>

                    <div className="mt-5">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Skills & Tech</h4>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {selectedDeveloper.skills.map(skill => (
                          <span 
                            key={skill} 
                            className="inline-flex rounded bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Socials / External links */}
                    <div className="mt-6 pt-5 border-t border-slate-100 flex gap-3">
                      {selectedDeveloper.github && (
                        <a 
                          href={selectedDeveloper.github} 
                          target="_blank" 
                          rel="noreferrer"
                          className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3.5 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 transition"
                        >
                          <Github className="h-4 w-4" />
                          GitHub
                        </a>
                      )}
                      {selectedDeveloper.linkedin && (
                        <a 
                          href={selectedDeveloper.linkedin} 
                          target="_blank" 
                          rel="noreferrer"
                          className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3.5 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 transition"
                        >
                          <Linkedin className="h-4 w-4" />
                          LinkedIn
                        </a>
                      )}
                      {selectedDeveloper.portfolio && (
                        <a 
                          href={selectedDeveloper.portfolio} 
                          target="_blank" 
                          rel="noreferrer"
                          className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3.5 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50 transition"
                        >
                          <Globe className="h-4 w-4" />
                          Portfolio
                        </a>
                      )}
                      <a 
                        href={`mailto:${selectedDeveloper.email}`}
                        className="ml-auto flex items-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-700 shadow-sm transition"
                      >
                        Email Developer
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </React.Fragment>
        )}
      </AnimatePresence>

      {/* --- ADD NEW DEVELOPER MODAL --- */}
      <AnimatePresence>
        {isAddModalOpen && (
          <React.Fragment>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddModalOpen(false)}
              className="fixed inset-0 z-50 bg-slate-900"
            />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 16 }}
                className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-xl border border-slate-200"
              >
                <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
                  <h3 className="font-bold text-slate-900">Add Profile to Directory</h3>
                  <button 
                    onClick={() => setIsAddModalOpen(false)}
                    className="rounded-lg p-1 text-slate-400 hover:bg-slate-50 hover:text-slate-600"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                
                <AddDeveloperForm 
                  onClose={() => setIsAddModalOpen(false)} 
                  onSubmit={handleAddDeveloper} 
                />
              </motion.div>
            </div>
          </React.Fragment>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- SUB-COMPONENT: ADD DEVELOPER FORM ---
interface AddFormProps {
  onClose: () => void;
  onSubmit: (dev: Omit<Developer, 'id'>) => void;
}

function AddDeveloperForm({ onClose, onSubmit }: AddFormProps) {
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('San Francisco, CA');
  const [availability, setAvailability] = useState<'Available' | 'Busy' | 'Open to Offers'>('Available');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [bio, setBio] = useState('');
  const [email, setEmail] = useState('');
  
  const handleToggleFormSkill = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !title || !bio || !email) return;

    // Use placeholder avatar
    const avatar = `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 1000000)}?auto=format&fit=crop&w=150&h=150&q=80`;

    onSubmit({
      name,
      title,
      location,
      avatar,
      availability,
      skills: selectedSkills.length > 0 ? selectedSkills : ['React'],
      bio,
      email,
      github: 'https://github.com',
      linkedin: 'https://linkedin.com'
    });
    
    onClose();
  };

  return (
    <form onSubmit={handleFormSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name *</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-500"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Role Title *</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Frontend Architect"
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Location</label>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500"
          >
            {LOCATIONS.filter(loc => loc !== 'All Locations').map(loc => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Status</label>
          <select
            value={availability}
            onChange={(e) => setAvailability(e.target.value as never)}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-indigo-500"
          >
            <option value="Available">Available</option>
            <option value="Open to Offers">Open to Offers</option>
            <option value="Busy">Busy</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address *</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="yourname@domain.com"
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-500"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">Bio Description *</label>
        <textarea
          required
          rows={3}
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="A brief introduction highlighting your key engineering domains and design patterns..."
          className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-500 resize-none"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1.5">Select Skills</label>
        <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto border border-slate-100 p-2 rounded-lg bg-slate-50">
          {ALL_SKILLS.map(skill => {
            const active = selectedSkills.includes(skill);
            return (
              <button
                type="button"
                key={skill}
                onClick={() => handleToggleFormSkill(skill)}
                className={`rounded px-2 py-1 text-xs font-medium transition ${
                  active 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {skill}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 transition"
        >
          Add Developer
        </button>
      </div>
    </form>
  );
}

