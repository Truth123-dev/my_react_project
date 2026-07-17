


import { useState } from 'react';

interface Project {
  id: number;
  title: string;
  architectureFocus: string;
  description: string;
  metrics: string; // Shows quantitative/senior impact
  tags: string[];
  liveLink: string;
  gitHubLink: string;
}

interface SkillCategory {
  category: string;
  skills: string[];
}

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Personal Information
  const name = "Joseph Elijah Isaiah";
  const role = "Junior Frontend Engineer";
  const location = "Lagos, Nigeria (UTC+1) — Ready To work";
  const email = "isaiaheli224@gmail.com";
  const githubUrl = " https://github.com/Truth123-dev/"; 
  const linkedinUrl = "https://linkedin.com/in/your-username"; 
  const resumeUrl = ""; 
  const profilePictureUrl = "src/assets/Elijah Pic.jpeg"; // High-quality 1:1 image suggested

  // junior-focused Skill Categories
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

  // 8 junior-Caliber Projects
  const projects: Project[] = [
    {
      id: 1,
      title: "VisionGuard Insurance Systems Dashboard",
      architectureFocus: " Scalability & Accessibility",
      description: "Developed and documented a reusable component system using React, TypeScript, and Tailwind CSS. Built to comply with WCAG 2.1 AA accessibility guidelines, reducing duplicate frontend layouts across internal teams.",
      metrics: "Used by 4 distinct production platforms daily",
      tags: ["React", "TypeScript", "Tailwind CSS", ],
      liveLink: "my-react-project-824gidh6q-elijahvision-s-projects.vercel.app",
      gitHubLink: "https://github.com/Truth123-dev"
    },
    {
      id: 2,
      title: "Clientside Cypto Log",
      architectureFocus: "Clientside Log",
      description: "Clientside Cypto Log.",
      metrics: "Clientside Cypto Line",
      tags: ["React", "TypeScript","Tailwinds"],
      liveLink: "my-react-project-exxxdsvm2-elijahvision-s-projects.vercel.app",
      gitHubLink: "https://github.com/Truth123-dev"
    },
    {
      id: 3,
      title: "SaaSGuard Vision Force ",
      architectureFocus: "Static & Server-Side Rendering Strategies",
      description: "Engineered a headless CMS-integrated static site layout utilizing modern caching and incremental static regeneration (ISR) strategies to optimize loading times for global audiences.",
      metrics: "Achieved 95+ Score on Google Lighthouse Web Vitals",
      tags: ["React", "TypeScript", "Tailwind CSS", "GraphQL"],
      liveLink: "my-react-project-947msi9wh-elijahvision-s-projects.vercel.app",
      gitHubLink: "https://github.com/Truth123-dev"
    },
    {
      id: 4,
      title: "VisionGuard Car DealerViews",
      architectureFocus: "Optimistic UI Updates & Offline Capability",
       "description": "An advanced search system allowing users to filter inventory by multiple attributes simultaneously, such as make, model, price, mileage, and fuel type.",
  "metrics": "Search response time, search-to-lead conversion rate, bounce rate on search results pages.",
      tags: ["React", "TypeScript", "Tailwind CSS", ],
      liveLink: "my-react-project-37zc67brw-elijahvision-s-projects.vercel.app",
      gitHubLink: "https://github.com/Truth123-dev"
    },
    {
      id: 5,
      title: "E-Commerce Checkout Pipeline & Gateway Integration",
      architectureFocus: "Secure Client-Side State Management",
      description: "Authored a secure multi-step payment pipeline. Features client-side card tokenization integrations, multi-currency conversion selectors, and precise checkout form validation checks.",
      metrics: "Reduced checkout session drop-offs by integrating step-restoring state",
      tags: ["React", "Context API", "Tailwind CSS", "Stripe API"],
      liveLink: "",
      gitHubLink: "https://github.com/Truth123-dev"
    },
    {
      id: 6,
      title: "Global Cryptocurrency Market Monitoring System",
      architectureFocus: "API Resilience & Data Layer Interceptor Design",
      description: "Created a visual monitoring platform wrapping third-party public crypto APIs. Implemented polling mechanisms, dynamic data-table filtering, and local client watch-list persistence.",
      metrics: "Maintains uninterrupted performance with custom API rate-limit queuing",
      tags: ["React", "TypeScript", "Tailwind CSS", "TanStack Query"],
      liveLink: "my-react-project-exxxdsvm2-elijahvision-s-projects.vercel.app",
      gitHubLink: "https://github.com/Truth123-dev"
    },
    {
      id: 7,
      title: "Recipe Discovery & Meal Planner",
      architectureFocus: "Fast Roaster Planing & Progressive ",
      description: "Recipe Discovery & Meal Planner.",
      metrics: "Zero layout shift (CLS) rating on mobile platforms",
      tags: ["React", "TypeScript", "Tailwind CSS"],
      liveLink: "my-react-project-imkvwbxhp-elijahvision-s-projects.vercel.app",
      gitHubLink: "https://github.com/Truth123-dev"
    },
    {
      id: 8,
      title: "Tech_In_Dev_Find Developer Directory Place",
      architectureFocus: "Client-Side Search Indexing & UI Polish",
      description: "Built a searchable index directory with smooth animated interface transitions, robust filter controls, and customized profile generation capabilities.",
      metrics: "Performs instant fuzzy search indexing over 2,000+ localized records",
      tags: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
      liveLink: "reb65bq3d-elijahvision-s-projects.vercel.app",
      gitHubLink: "reb65bq3d-elijahvision-s-projects.vercel.app"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-sky-100 selection:text-sky-900 relative overflow-hidden">
      
      {/* Premium Ambient Light Drops */}
      <div className="absolute top-[-10%] left-[-10%] w-150 h-150 bg-sky-200/30 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-[20%] right-[-10%] w-150px h-125 bg-orange-100/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-[10%] left-[5%] w-175 h-175 bg-sky-100/20 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <span className="text-2xl font-black tracking-tight text-slate-900">
              Elijah<span className="text-orange-500">.</span>
            </span>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#about" className="text-sm font-semibold text-slate-600 hover:text-sky-600 transition">About</a>
              <a href="#skills" className="text-sm font-semibold text-slate-600 hover:text-sky-600 transition">Expertise</a>
              <a href="#projects" className="text-sm font-semibold text-slate-600 hover:text-sky-600 transition">Projects</a>
              <a href="#collaboration" className="text-sm font-semibold text-slate-600 hover:text-sky-600 transition">Ready To Work</a>
              <a href="#contact" className="text-sm font-semibold text-slate-600 hover:text-sky-600 transition">Contact</a>
              <a 
                href={resumeUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-bold text-white bg-sky-600 hover:bg-sky-500 rounded-lg transition shadow-sm"
              >
                Download CV
              </a>
            </div>

            {/* Mobile menu button */}
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

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-4 space-y-1">
            <a href="#about" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-semibold text-slate-700 hover:bg-slate-50">About</a>
            <a href="#skills" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-semibold text-slate-700 hover:bg-slate-50">Expertise</a>
            <a href="#projects" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-semibold text-slate-700 hover:bg-slate-50">Projects</a>
            <a href="#collaboration" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-semibold text-slate-700 hover:bg-slate-50">Remote Work</a>
            <a href="#contact" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 rounded-md text-base font-semibold text-slate-700 hover:bg-slate-50">Contact</a>
            <a 
              href={resumeUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="block text-center px-3 py-2 rounded-md text-base font-semibold text-white bg-sky-600 hover:bg-sky-500"
            >
              Download CV
            </a>
          </div>
        )}
      </nav>

      {/* Hero Section - Upgraded with Prominent/Large Fitted Image Layout */}
      <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Details Column: spans 7 cols on large screens */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-100 text-sky-800 text-xs font-bold uppercase tracking-wider">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
              </span>
              <span>{location}</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight">
              Engineering Scalable <span className="bg-linear-to-r from-sky-600 via-sky-500 to-orange-500 bg-clip-text text-transparent">Frontend Architectures</span>
            </h1>
            
            <p className="text-2xl font-bold text-slate-700">
              {name} — <span className="text-sky-600">{role}</span>
            </p>
            
            <p className="text-lg text-slate-600 max-w-2xl leading-relaxed mx-auto lg:mx-0">
              With deep expertise in React, TypeScript, and semantic optimization, I build performant interfaces that bridge user experience with scalable codebases. Focused on facilitating successful remote outcomes with international engineering groups.
            </p>
            
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
              <a 
                href="#projects" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-7 py-3.5 border border-transparent text-sm font-bold rounded-lg text-white bg-sky-600 hover:bg-sky-500 shadow-lg shadow-sky-100 hover:shadow-xl transition"
              >
                Inspect Portfolio Works
              </a>
              <a 
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-7 py-3.5 border border-slate-200 text-sm font-bold rounded-lg text-slate-700 bg-white hover:bg-slate-100 transition"
              >
                Review Full CV / Resume
              </a>
            </div>
          </div>

          {/* Large, Fitted Image Column: spans 5 cols on large screens */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-105 aspect-square lg:aspect-4/5">
              {/* Outer Decorative Glow */}
              <div className="absolute inset-0 rounded-3xl bg-linear-to-tr from-sky-500 via-sky-400 to-orange-400 transform rotate-3 scale-[1.03] opacity-30 blur-md pointer-events-none"></div>
              {/* Backing Frame */}
              <div className="absolute inset-0 rounded-3xl bg-white border border-slate-200 shadow-lg"></div>
              
              {/* Fitted Main Image */}
              <img 
                src={profilePictureUrl} 
                alt={name} 
                className="relative z-10 w-full h-full object-cover rounded-3xl border-4 border-white shadow-2xl"
              />
              
              {/* Quick junior Tech Overlay Badge */}
              <div className="absolute bottom-4 right-4 z-20 bg-slate-900/90 backdrop-blur-md text-white px-4 py-2 rounded-lg border border-slate-800 text-xs font-bold tracking-wider uppercase">
                TS / React / Tailwinds
              </div>
            </div>
          </div>
          
        </div>
      </header>

      {/* About & Engineering Philosophy Section */}
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
                low rendering latency, and highly semantic layouts. As a senior engineer,
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
            Architectural patterns, tools, and testing practices utilized to maintain large-scale frontends.
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

      {/* Projects Catalog - Senior-Focused Architecture Examples */}
      <section id="projects" className="bg-slate-100/60 border-t border-slate-200/80 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center lg:text-left mb-16">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Architectural Works
            </h2>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl">
              Concrete implementations of technical strategies, showing a strong focus on modularity and measured output performance.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {projects.map((project) => (
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
                  
                  {/* Senior Impact Statement */}
                  <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 font-semibold flex items-center space-x-2">
                    <svg className="w-4 h-4 text-sky-500 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
                    </svg>
                    <span>{project.metrics}</span>
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
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* International / Remote Delivery Section */}
      <section id="collaboration" className="bg-slate-900 text-white py-20 lg:py-28 relative overflow-hidden">
        {/* Subtle dark pattern background */}
        <div className="absolute inset-0 bg-linear-to-tr from-slate-950 via-slate-900 to-sky-950/40 opacity-80 pointer-events-none -z-10" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                Global Collaboration <br />
                <span className="text-sky-400">Seamless Integration</span>
              </h2>
              <p className="text-lg text-slate-300 leading-relaxed">
                Operating from Lagos, Nigeria, I align my schedule with US (EST/CST), UK (GMT), and European (CET) timezones to guarantee overlapping work hours. I rely on clear, asynchronous communication and robust documentation to ensure progress remains visible across distributed teams.
              </p>
              
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700">
                  <div className="text-orange-400 text-xl font-bold">4+ Hours</div>
                  <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold mt-1">Daily GMT/EST Overlap</div>
                </div>
                <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700">
                  <div className="text-sky-400 text-xl font-bold">Asynchronous</div>
                  <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold mt-1">Documented Workflow</div>
                </div>
              </div>
            </div>

            {/* Quick stats on delivery standards */}
            <div className="lg:col-span-6 lg:pl-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-6 bg-slate-800/35 rounded-2xl border border-slate-800/80">
                <h4 className="text-lg font-bold text-slate-100">Clean Code Standards</h4>
                <p className="mt-2 text-sm text-slate-400">Strict TypeScript configurations, complete automated lint checks, and modular file organization structures.</p>
              </div>
              <div className="p-6 bg-slate-800/35 rounded-2xl border border-slate-800/80">
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
              I am prepared to discuss senior frontend roles, system engineering challenges, and team partnerships.
            </p>
            
            <div className="mt-12 flex flex-col items-center space-y-6">
              {/* Email link with accent shadow */}
              <a 
                href={`mailto:${email}`} 
                className="inline-flex items-center space-x-3.5 px-6 py-4 rounded-xl border border-slate-200 hover:border-sky-500 bg-slate-50 hover:bg-white transition duration-300 shadow-sm hover:shadow-lg hover:shadow-sky-50/50"
              >
                <svg className="w-6 h-6 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-base sm:text-lg font-bold text-slate-950">{email}</span>
              </a>

              {/* Social Channels */}
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