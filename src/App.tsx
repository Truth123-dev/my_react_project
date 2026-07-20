




import { useState, useEffect, useMemo } from 'react';

interface Project {
  id: number;
  title: string;
  architectureFocus: string;
  description: string;
  metrics: string; 
  tags: string[];
  liveLink: string;
  gitHubLink: string;
  tradeOffs: string; // Detailed architectural insights for transparency
}

interface SkillCategory {
  category: string;
  skills: string[];
}

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("All");
  const [expandedProjectId, setExpandedProjectId] = useState<number | null>(null);
  const [lagosTime, setLagosTime] = useState("");

  // Update Lagos Time in Real Time
  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Africa/Lagos',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      setLagosTime(new Intl.DateTimeFormat('en-US', options).format(new Date()));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Personal Information
  const name = "Joseph Elijah Isaiah";
  const role = "Junior Frontend Engineer";
  const email = "isaiaheli224@gmail.com";
  const githubUrl = "https://github.com/Truth123-dev/"; 
  const linkedinUrl = "https://linkedin.com/in/your-username"; 
  const resumeUrl = ""; 
  const profilePictureUrl = "src/assets/Elijah Pic.jpeg"; 

  const skillCategories: SkillCategory[] = [
    {
      category: "Architecture & Core",
      skills: ["TypeScript", "JavaScript", "React (v18+)", "Design Systems"]
    },
    {
      category: "State & Data Flow",
      skills: ["Redux Toolkit", "React Query / TanStack", "Context API", "GraphQL / REST APIs"]
    },
    {
      category: "Performance & Styling",
      skills: ["Tailwind CSS", "CSS Modules ", "Webpack / Vite Bundling", "Core Web Vitals Tuning"]
    },
    {
      category: "Quality & Delivery",
      skills: ["Jest / React Testing Library", "CI/CD Workflows", "Git ", "WCAG Accessibility (a11y)"]
    }
  ];

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const projects: Project[] = [
    {
      id: 1,
      title: "VisionGuard Insurance Systems Dashboard",
      architectureFocus: "Scalability & Accessibility",
      description: "Developed and documented a reusable component system using React, TypeScript, and Tailwind CSS. Built to comply with WCAG 2.1 AA accessibility guidelines.",
      metrics: "Used by 4 distinct production platforms daily",
      tags: ["React", "TypeScript", "Tailwind CSS"],
      liveLink: "https://my-react-project-824gidh6q-elijahvision-s-projects.vercel.app",
      gitHubLink: "https://github.com/Truth123-dev",
      tradeOffs: "Chose to build a custom accessible primitive wrapper rather than pulling in heavy UI frameworks. This optimized initial load weight by 35% while retaining full screen-reader compliance."
    },
    {
      id: 2,
      title: "Clientside Crypto Log",
      architectureFocus: "Clientside Data Persistence",
      description: "A lightweight clientside tracker for recording and analyzing local cryptocurrency conversions with real-time UI states.",
      metrics: "Loads state from local cache in less than 50ms",
      tags: ["React", "TypeScript", "Tailwind CSS"],
      liveLink: "https://my-react-project-exxxdsvm2-elijahvision-s-projects.vercel.app",
      gitHubLink: "https://github.com/Truth123-dev",
      tradeOffs: "Used a custom React reducer combined with localStorage synchronization to avoid the overhead of heavy global state libraries. Keeps operations entirely clientside for speed and privacy."
    },
    {
      id: 3,
      title: "SaaSGuard Vision Force",
      architectureFocus: "Static & Server-Side Rendering",
      description: "Engineered a headless CMS site layout utilizing modern caching and incremental static regeneration (ISR) strategies to optimize loading times.",
      metrics: "Achieved 95+ Score on Google Lighthouse Web Vitals",
      tags: ["React", "TypeScript", "Tailwind CSS", "GraphQL"],
      liveLink: "https://my-react-project-947msi9wh-elijahvision-s-projects.vercel.app",
      gitHubLink: "https://github.com/Truth123-dev",
      tradeOffs: "Balanced static structure with dynamic client fetches for personalized content. Decoupling structural pages from high-churn telemetry APIs prevented stale build cache issues."
    },
    {
      id: 4,
      title: "VisionGuard Car DealerViews",
      architectureFocus: "Optimistic UI Updates & Search performance",
      description: "An advanced search system allowing users to filter inventory by multiple attributes simultaneously, such as make, model, price, mileage, and fuel type.",
      metrics: "Response-to-interaction delays reduced below 100ms",
      tags: ["React", "TypeScript", "Tailwind CSS"],
      liveLink: "https://my-react-project-37zc67brw-elijahvision-s-projects.vercel.app",
      gitHubLink: "https://github.com/Truth123-dev",
      tradeOffs: "Implemented a debounced rendering cycle on user keystrokes to prevent browser thread locking during heavy multi-attribute filtering."
    },
    {
      id: 5,
      title: "E-Commerce Checkout Pipeline",
      architectureFocus: "Secure Client-Side State Management",
      description: "Authored a secure multi-step payment pipeline. Features client-side card tokenization integrations and precise validation checks.",
      metrics: "State retention system limits form progress loss during interruptions",
      tags: ["React", "Context API", "Typescript", "Tailwind CSS"],
      liveLink: "https://my-react-project-l1xry4zmv-elijahvision-s-projects.vercel.app",
      gitHubLink: "https://github.com/Truth123-dev",
      tradeOffs: "Managed step transitions with a state-machine configuration using Context API to ensure impossible payment states cannot be navigated into."
    },
    {
      id: 6,
      title: "Global Cryptocurrency Market Monitor",
      architectureFocus: "API Resilience & Data Layer Interceptors",
      description: "Created a visual monitoring platform wrapping public crypto APIs. Implemented polling mechanisms and custom API queuing.",
      metrics: "Maintains uninterrupted performance with rate-limit queuing",
      tags: ["React", "TypeScript", "Tailwind CSS", "TanStack Query"],
      liveLink: "https://my-react-project-exxxdsvm2-elijahvision-s-projects.vercel.app",
      gitHubLink: "https://github.com/Truth123-dev",
      tradeOffs: "Utilized TanStack Query's automatic exponential backoff retry strategy to prevent user API rate limit locks during sudden browser refresh loops."
    },
    {
      id: 7,
      title: "Recipe Discovery & Meal Planner",
      architectureFocus: "Fast Render Cycles & Layout Shift Reduction",
      description: "Recipe discovery application featuring drag-and-drop structural styling optimized for swift visual loading.",
      metrics: "Zero layout shift (CLS) rating on mobile platforms",
      tags: ["React", "TypeScript", "Tailwind CSS"],
      liveLink: "https://my-react-project-imkvwbxhp-elijahvision-s-projects.vercel.app",
      gitHubLink: "https://github.com/Truth123-dev",
      tradeOffs: "Employed explicit aspect ratio boxes and skeletal load-states to prevent dynamic images from causing abrupt layout changes on high-latency mobile networks."
    },
    {
      id: 8,
      title: "Tech_In_Dev Finder Directory",
      architectureFocus: "Client-Side Search Indexing & Animation Performance",
      description: "Built a searchable index directory with smooth animated interface transitions and custom filter controls.",
      metrics: "Performs instant fuzzy search indexing over 2,000+ records",
      tags: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
      liveLink: "https://reb65bq3d-elijahvision-s-projects.vercel.app",
      gitHubLink: "https://github.com/Truth123-dev",
      tradeOffs: "Used partial string pre-indexing combined with localized memoization to keep complex filter arrays from recalculating unnecessarily during UI animation frames."
    }
  ];

  // Dynamically extract all unique tags from the projects list
  const availableTags = useMemo(() => {
    const tagsSet = new Set<string>();
    projects.forEach(project => project.tags.forEach(tag => tagsSet.add(tag)));
    return ["All", ...Array.from(tagsSet)];
  }, [projects]);

  // Handle Search and Category Filter
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            project.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTag = selectedTag === "All" || project.tags.includes(selectedTag);
      return matchesSearch && matchesTag;
    });
  }, [searchQuery, selectedTag, projects]);

  const toggleProjectDetails = (id: number) => {
    setExpandedProjectId(expandedProjectId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-sky-100 selection:text-sky-900 relative overflow-hidden">
      
      {/* Background Decorative Blurs */}
      <div className="absolute top-[-10%] left-[-10%] w-150 h-150 bg-sky-200/30 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-[20%] right-[-10%] w-150px h-125 bg-orange-100/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-[10%] left-[5%] w-175 h-175 bg-sky-100/20 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <span className="text-2xl font-black tracking-tight text-slate-900">
              Elijah<span className="text-orange-500">.</span>
            </span>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#about" className="text-sm font-semibold text-slate-600 hover:text-sky-600 transition">About</a>
              <a href="#skills" className="text-sm font-semibold text-slate-600 hover:text-sky-600 transition">Expertise</a>
              <a href="#projects" className="text-sm font-semibold text-slate-600 hover:text-sky-600 transition">Projects</a>
              <a href="#collaboration" className="text-sm font-semibold text-slate-600 hover:text-sky-600 transition">Collaboration</a>
              <a href="#contact" className="text-sm font-semibold text-slate-600 hover:text-sky-600 transition">Contact</a>
              <a 
                href={resumeUrl || "#"} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-bold text-white bg-sky-600 hover:bg-sky-500 rounded-lg transition shadow-sm"
              >
                Download CV
              </a>
            </div>

            <div className="md:hidden">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-slate-500 hover:text-slate-900 focus:outline-none"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-4 space-y-1 animate-fade-in">
            <a href="#about" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-semibold text-slate-700 hover:bg-slate-50">About</a>
            <a href="#skills" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-semibold text-slate-700 hover:bg-slate-50">Expertise</a>
            <a href="#projects" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-semibold text-slate-700 hover:bg-slate-50">Projects</a>
            <a href="#collaboration" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-semibold text-slate-700 hover:bg-slate-50">Remote Work</a>
            <a href="#contact" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-semibold text-slate-700 hover:bg-slate-50">Contact</a>
            <a 
              href={resumeUrl || "#"} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="block text-center px-3 py-2 rounded-md text-base font-semibold text-white bg-sky-600 hover:bg-sky-500"
            >
              Download CV
            </a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
              </span>
              <span>Lagos Live Time: {lagosTime || "Syncing..."}</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight">
              Engineering Scalable <span className="bg-linear-to-r from-sky-600 via-sky-500 to-orange-500 bg-clip-text text-transparent">Frontend Architectures</span>
            </h1>
            
            <p className="text-2xl font-bold text-slate-700">
              {name} — <span className="text-sky-600">{role}</span>
            </p>
            
            <p className="text-lg text-slate-600 max-w-2xl leading-relaxed mx-auto lg:mx-0">
              I develop performant web interfaces with an emphasis on code clarity, scalability, and type safety. Focused on maintaining smooth cross-timezone workflows.
            </p>
            
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
              <a 
                href="#projects" 
                className="inline-flex items-center justify-center px-7 py-3.5 border border-transparent text-sm font-bold rounded-lg text-white bg-sky-600 hover:bg-sky-500 shadow-lg shadow-sky-100 hover:shadow-xl transition"
              >
                Inspect Portfolio Works
              </a>
              <a 
                href={resumeUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-7 py-3.5 border border-slate-200 text-sm font-bold rounded-lg text-slate-700 bg-white hover:bg-slate-100 transition"
              >
                Review Full CV / Resume
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-105 aspect-square lg:aspect-4/5">
              <div className="absolute inset-0 rounded-3xl bg-linear-to-tr from-sky-500 via-sky-400 to-orange-400 transform rotate-3 scale-[1.03] opacity-30 blur-md pointer-events-none"></div>
              <div className="absolute inset-0 rounded-3xl bg-white border border-slate-200 shadow-lg"></div>
              
              <img 
                src={profilePictureUrl} 
                alt={name} 
                className="relative z-10 w-full h-full object-cover rounded-3xl border-4 border-white shadow-2xl"
              />
              
              <div className="absolute bottom-4 right-4 z-20 bg-slate-900/90 backdrop-blur-md text-white px-4 py-2 rounded-lg border border-slate-800 text-xs font-bold tracking-wider uppercase">
                TS / React / Tailwinds
              </div>
            </div>
          </div>
          
        </div>
      </header>

      {/* About Section */}
      <section id="about" className="bg-white border-y border-slate-200/80 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-4">
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                Engineering <br />
                <span className="text-sky-600">Principle</span>
              </h2>
              <div className="mt-4 h-1 w-20 bg-orange-500 rounded"></div>
            </div>
            <div className="lg:col-span-8 text-lg text-slate-600 space-y-6 leading-relaxed">
              <p>
                My approach to building software prioritizes robust type safety, 
                low rendering latency, and highly semantic layouts. As an engineer,
                I focus on system modularity, ensuring that multiple development teams
                can work inside a codebase concurrently without building up technical debt.
              </p>
              <p>
                I actively collaborate with designers, back-end teams, and
                product owners to turn high-level specs into production-grade systems.
                I specialize in identifying bottlenecks in Core Web Vitals,
                restructuring complex client-side state managers, and establishing 
                resilient visual testing coverage.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Expertise Section */}
      <section id="skills" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="text-center lg:text-left mb-16">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Core Competencies
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl">
            Architectural patterns, tools, and testing practices utilized to maintain frontends.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((cat, idx) => (
            <div key={idx} className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 left-0 h-1.5 w-full bg-linear-to-r from-sky-500 to-orange-400"></div>
              <h3 className="text-lg font-bold text-slate-900 mb-5">{cat.category}</h3>
              <ul className="space-y-3.5">
                {cat.skills.map((skill, sIdx) => (
                  <li key={sIdx} className="flex items-center space-x-2.5 text-slate-600 text-sm font-semibold">
                    <svg className="w-4 h-4 text-orange-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4" />
                    </svg>
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Projects Catalog - Updated with Live Filter, Search, and Transparency Accordion */}
      <section id="projects" className="bg-slate-100/60 border-t border-slate-200/80 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                Architectural Works
              </h2>
              <p className="mt-2 text-lg text-slate-600 max-w-2xl">
                Search and filter implementations below to view dynamic code strategies.
              </p>
            </div>

            {/* Live Filter Controls */}
            <div className="w-full lg:w-auto flex flex-col sm:flex-row gap-3">
              <input 
                type="text" 
                placeholder="Search projects..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white"
              />
              
              <div className="flex flex-wrap gap-1 bg-white p-1 border border-slate-200 rounded-lg">
                {availableTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`px-3 py-1 rounded-md text-xs font-semibold transition ${
                      selectedTag === tag 
                        ? 'bg-sky-600 text-white' 
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Project List */}
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {filteredProjects.map((project) => (
                <div key={project.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between overflow-hidden hover:shadow-lg hover:border-sky-300 transition duration-300 group">
                  <div className="p-8">
                    <div className="text-xs font-bold text-orange-600 uppercase tracking-widest mb-1">
                      {project.architectureFocus}
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 group-hover:text-sky-600 transition duration-200">
                      {project.title}
                    </h3>
                    <p className="mt-4 text-slate-600 text-sm leading-relaxed">
                      {project.description}
                    </p>
                    
                    <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 font-semibold flex items-center space-x-2">
                      <svg className="w-4 h-4 text-sky-500 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4-2v-4H7v-2h4V7h2v4h4v2z"/>
                      </svg>
                      <span>{project.metrics}</span>
                    </div>

                    {/* Expandable Architecture Tradeoffs panel */}
                    <div className="mt-4 border-t border-slate-100 pt-4">
                      <button 
                        onClick={() => toggleProjectDetails(project.id)}
                        className="flex items-center justify-between w-full text-left text-xs font-bold text-sky-700 hover:text-sky-950 transition"
                      >
                        <span>{expandedProjectId === project.id ? "Hide Architectural Insights" : "Show Architectural Insights"}</span>
                        <svg 
                          className={`w-4 h-4 transform transition-transform ${expandedProjectId === project.id ? "rotate-180" : ""}`} 
                          fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      
                      {expandedProjectId === project.id && (
                        <div className="mt-3 p-3 rounded-lg bg-orange-50/50 border border-orange-100/50 text-xs text-slate-600 leading-relaxed animate-fade-in">
                          <strong className="text-slate-800 block mb-1">Decisions & Trade-offs:</strong>
                          {project.tradeOffs}
                        </div>
                      )}
                    </div>

                    {/* Tech Tags */}
                    <div className="mt-6 flex flex-wrap gap-2">
                      {project.tags.map((tag, tIdx) => (
                        <span 
                          key={tIdx} 
                          className="px-3 py-1 rounded-md bg-sky-50 text-sky-700 border border-sky-100/50 text-xs font-semibold"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Footer Actions */}
                  <div className="px-8 py-5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                    <a 
                      href={project.gitHubLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm font-bold text-slate-600 hover:text-slate-900 transition"
                    >
                      <svg className="w-5 h-5 mr-1.5" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
                    </svg>
                    Source Code
                  </a>
                  {project.liveLink ? (
                    <a 
                      href={project.liveLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm font-bold text-orange-600 hover:text-orange-700 transition"
                    >
                      View Deploy
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  ) : (
                    <span className="text-sm font-bold text-slate-400 cursor-not-allowed">
                      In Development
                    </span>
                  )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-200">
              <p className="text-slate-500 text-sm">No matches found for "{searchQuery || selectedTag}"</p>
            </div>
          )}
        </div>
      </section>

      {/* Collaboration & Remote Work Transparency Section */}
      <section id="collaboration" className="bg-slate-900 text-white py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-tr from-slate-950 via-slate-900 to-sky-950/40 opacity-80 pointer-events-none -z-10" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                Global Collaboration <br />
                <span className="text-sky-400">Seamless Integration</span>
              </h2>
              <p className="text-lg text-slate-300 leading-relaxed">
                Operating from Lagos, Nigeria, I align with international distributed groups. I rely on structured documentation and clear asynchronous communications to keep status updates, pull requests, and structural goals highly visible.
              </p>
              
              {/* Overlap timeline visualizer */}
              <div className="p-5 bg-slate-800/60 rounded-xl border border-slate-700/50 space-y-4">
                <span className="text-xs font-bold text-sky-400 uppercase tracking-widest block">Lagos (GMT+1) Overlap Availability</span>
                <div className="grid grid-cols-3 gap-2">
                  <div className="p-2 bg-slate-900/50 rounded-lg text-center">
                    <span className="block text-xs text-slate-400">UK (BST / GMT)</span>
                    <span className="text-sm font-bold text-white">Full overlap</span>
                  </div>
                  <div className="p-2 bg-slate-900/50 rounded-lg text-center">
                    <span className="block text-xs text-slate-400">Europe (CET)</span>
                    <span className="text-sm font-bold text-white">Full overlap</span>
                  </div>
                  <div className="p-2 bg-slate-900/50 rounded-lg text-center">
                    <span className="block text-xs text-slate-400">US (EST)</span>
                    <span className="text-sm font-bold text-white">4+ Hrs overlap</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 lg:pl-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-6 bg-slate-800/35 rounded-2xl border border-slate-800/80 backdrop-blur-xs">
                <h4 className="text-lg font-bold text-slate-100">Clean Code Standards</h4>
                <p className="mt-2 text-sm text-slate-400">Strict TypeScript configurations, complete automated lint checks, and modular file organization structures.</p>
              </div>
              <div className="p-6 bg-slate-800/35 rounded-2xl border border-slate-800/80 backdrop-blur-xs">
                <h4 className="text-lg font-bold text-slate-100">Accessible Delivery</h4>
                <p className="mt-2 text-sm text-slate-400">Consistent application of semantic tags and ARIA parameters to guarantee intuitive keyboard navigation flows.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Initiate Collaboration
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              I am prepared to discuss remote front-end engineering positions and system-building challenges.
            </p>
            
            <div className="mt-12 flex flex-col items-center space-y-6">
              <a 
                href={`mailto:${email}`} 
                className="inline-flex items-center space-x-3.5 px-6 py-4 rounded-xl border border-slate-200 hover:border-sky-500 bg-slate-50 hover:bg-white transition duration-300 shadow-sm hover:shadow-lg hover:shadow-sky-50/50"
              >
                <svg className="w-6 h-6 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-base sm:text-lg font-bold text-slate-950">{email}</span>
              </a>

              <div className="flex space-x-6">
                <a 
                  href={githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-slate-400 hover:text-slate-900 transition"
                  aria-label="GitHub Workspace"
                >
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
                  </svg>
                </a>
                
                <a 
                  href={linkedinUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-slate-400 hover:text-sky-600 transition"
                  aria-label="LinkedIn Profile"
                >
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-500 py-16 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-sm">
          <p>© {new Date().getFullYear()} {name}. Built to standards.</p>
          <p className="text-slate-400">Lagos, Nigeria — Synchronized Globally</p>
        </div>
      </footer>
    </div>
  );
}