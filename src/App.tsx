


import { useState } from 'react';

// Semantic SVG Icons
const MailIcon = () => (
  <svg className="w-4 h-4 mr-2.5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
);

const PhoneIcon = () => (
  <svg className="w-4 h-4 mr-2.5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
);

const GlobeIcon = () => (
  <svg className="w-4 h-4 mr-2.5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
);

const LinkedinIcon = () => (
  <svg className="w-4 h-4 mr-2.5 text-slate-500" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
);

const GithubIcon = () => (
  <svg className="w-4 h-4 mr-2.5 text-slate-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
);

export default function Resume() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'architecture' | 'core'>('all');

  const skills = {
    architecture: [
      'React & Next.js Frameworks',
      'TypeScript Integration',
      'Supabase BaaS Configuration',
      'PostgreSQL Schema Design',
      'Docker Containerization',
      'E2E Testing (Playwright)'
    ],
    core: [
      'Tailwind CSS & Responsive Layouts',
      'State Management (Redux Toolkit, Zustand)',
      'Git Version Control & Workflows',
      'GitLens Collaboration Auditing',
      'API Integration (REST, GraphQL)',
      'CI/CD Deployment Pipelines'
    ]
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased selection:bg-slate-200">
      <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        
        {/* Header Block (Without Image) */}
        <header className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start gap-8">
            
            {/* Profile Overview */}
            <div className="flex-1">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 mb-3">
                Ready to do.....
              </span>
              <h1 className="text-4xl font-extrabold text-slate-950 tracking-tight">
                Joseph Elijah Isaiah
              </h1>
              <p className="text-lg font-semibold text-indigo-600 mt-1">
                Junior Frontend Developer
              </p>
              <p className="text-slate-600 mt-4 text-sm leading-relaxed max-w-2xl">
                Frontend developer specialized in designing resilient user interfaces
                 and structuring robust development environments. Experienced in
                 modern client-side libraries, database integrations, and implementing
                  rigorous quality testing workflows.
              </p>
            </div>

            {/* Contact Panel */}
            <div className="w-full md:w-auto flex flex-col gap-2.5 text-xs text-slate-600 bg-slate-50 p-5 rounded-xl border border-slate-100 min-w-70">
              <h3 className="font-bold text-slate-800 uppercase tracking-wider text-[10px] mb-1">Contact & Verification</h3>
              <a href="tel:+234 913-176-6494" className="flex items-center hover:text-indigo-600 transition-colors">
                <PhoneIcon />
                <span>+234 913 176 6494</span>
              </a>
              <a href="mailto:isaiaheli224@gmail.com" className="flex items-center hover:text-indigo-600 transition-colors">
                <MailIcon />
                <span>isaiaheli224@gmail.com</span>
              </a>
              <a href="https://linkedin.com/in/elijah-isaiah-873139330" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-indigo-600 transition-colors">
                <LinkedinIcon />
                <span>linkedin.com/in/joseph-elijah-isaiah</span>
              </a>
              <a href=" https://github.com/Truth123-dev/" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-indigo-600 transition-colors">
                <GithubIcon />
                <span>github.com/joseph-elijah-isaiah</span>
              </a>
              <a href="https://github.com/Truth123-dev/" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-indigo-600 transition-colors">
                <GlobeIcon />
                <span>joseph-isaiah.Elijah</span>
              </a>
            </div>

          </div>
        </header>

        {/* Featured Senior Portfolio Callout Section */}
        <section className="bg-linear-to-r from-slate-900 to-indigo-950 text-white rounded-2xl p-6 shadow-md mb-8 border border-slate-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-lg font-bold tracking-tight text-white">
                Explore My Interactive Production Portfolio
              </h2>
              <p className="text-slate-300 text-xs mt-1 max-w-xl">
                View live case studies, production builds, comprehensive architecture breakdowns, and integrated automated test reports.
              </p>
            </div>
            <a 
              href="https://my-react-project-c43xwcyvk-elijahvision-s-projects.vercel.app" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-full md:w-auto text-center px-6 py-3 bg-white text-slate-950 font-bold text-xs rounded-xl hover:bg-slate-100 transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Visit Junior Portfolio →
            </a>
          </div>
        </section>

        {/* Dynamic Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Sidebar Section */}
          <div className="lg:col-span-1 space-y-8">
            
            {/* Tech Stack Matrix */}
            <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3 mb-4">
                Technical Spectrum
              </h2>

              {/* Stack Category Filter */}
              <div className="flex gap-1 mb-4 p-1 bg-slate-100 rounded-lg text-xs font-semibold">
                <button 
                  onClick={() => setSelectedCategory('all')}
                  className={`flex-1 py-1 px-2 rounded-md transition-all ${selectedCategory === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'}`}
                >
                  All
                </button>
                <button 
                  onClick={() => setSelectedCategory('architecture')}
                  className={`flex-1 py-1 px-2 rounded-md transition-all ${selectedCategory === 'architecture' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-500 hover:text-slate-800'}`}
                >
                  Architecture
                </button>
                <button 
                  onClick={() => setSelectedCategory('core')}
                  className={`flex-1 py-1 px-2 rounded-md transition-all ${selectedCategory === 'core' ? 'bg-white text-indigo-600 shadow-xs' : 'text-slate-500 hover:text-slate-800'}`}
                >
                  Core Dev
                </button>
              </div>

              <div className="space-y-4">
                {(selectedCategory === 'all' || selectedCategory === 'architecture') && (
                  <div>
                    <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Systems & DB</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {skills.architecture.map((skill, index) => (
                        <span key={index} className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-800">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {(selectedCategory === 'all' || selectedCategory === 'core') && (
                  <div className={selectedCategory === 'all' ? 'pt-4 border-t border-slate-100' : ''}>
                    <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Frontend & Integration</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {skills.core.map((skill, index) => (
                        <span key={index} className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-indigo-50 text-indigo-700">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* Development Standards */}
            <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3 mb-4">
                Operational Methods
              </h2>
              <ul className="text-xs text-slate-600 space-y-3 list-none">
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 mr-2.5 shrink-0" />
                  <span>Isolation of workspace tools with clean Docker setups.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 mr-2.5 shrink-0" />
                  <span>Comprehensive functional verification via automated browser emulation.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 mr-2.5 shrink-0" />
                  <span>Traceable commit practices integrated with active GitLens tracking.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 mr-2.5 shrink-0" />
                  <span>Relational data integrity maintained directly through cloud services.</span>
                </li>
              </ul>
            </section>

          </div>

          {/* Job History / Core Competencies */}
          <div className="lg:col-span-2 space-y-8">
            
            <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-bold text-slate-950 border-b border-slate-100 pb-4 mb-6">
                Professional Background
              </h2>

              <div className="space-y-8">
                
                {/* Position 1 */}
                <div className="relative pl-6 border-l border-slate-200">
                  <div className="absolute w-2.5 h-2.5 bg-indigo-600 rounded-full -left-1.25 top-1.5" />
                  
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-slate-900 text-sm">Junior Frontend Engineer</h3>
                      <p className="text-xs text-slate-500">Global Software Systems | Remote</p>
                    </div>
                    <span className="inline-flex items-center px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-medium mt-1 sm:mt-0">
                      Jan 2022 - Present
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed mb-3">
                    Architect dynamic, performant presentation layers for enterprise web services. Focus on building clean API client frameworks and setting up rigorous testing cycles.
                  </p>

                  <ul className="text-xs text-slate-600 space-y-2 list-disc pl-4">
                    <li>Migrated application pages to structured React configurations, improving overall client-side load behavior.</li>
                    <li>Developed thorough automated web checks utilizing <strong>Playwright</strong>, improving stability indicators and saving development verification cycles.</li>
                    <li>Engineered localized state stores and decoupled backend event streams using <strong>Supabase</strong> and <strong>PostgreSQL</strong> mechanisms.</li>
                    <li>Improved workspace version coordination utilizing detailed <strong>GitLens</strong> evaluations during peer code reviews.</li>
                  </ul>
                </div>

                {/* Position 2 */}
                <div className="relative pl-6 border-l border-slate-200">
                  <div className="absolute w-2.5 h-2.5 bg-slate-300 rounded-full -left-1.25 top-1.5" />
                  
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-slate-900 text-sm">Junior Frontend Developer</h3>
                      <p className="text-xs text-slate-500">Dynamic Tech Labs</p>
                    </div>
                    <span className="inline-flex items-center px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-medium mt-1 sm:mt-0">
                      Mar 2020 - Dec 2021
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed mb-3">
                    Built interface libraries and optimized user flows for digital service systems.
                  </p>

                  <ul className="text-xs text-slate-600 space-y-2 list-disc pl-4">
                    <li>Constructed responsive, pixel-aligned views based on modern layout specs with <strong>Tailwind CSS</strong>.</li>
                    <li>Utilized <strong>Docker</strong> templates to guarantee consistent local testing environments across decentralized operating systems.</li>
                    <li>Designed core state systems using Redux Toolkit to reliably coordinate structured application state changes.</li>
                  </ul>
                </div>

              </div>
            </section>

            {/* Practical System Portfolio Cases */}
            <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-bold text-slate-950 border-b border-slate-100 pb-4 mb-5">
                Technical Implementations
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-150">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-slate-900 text-xs">Real-Time Sync Platform</h3>
                    <span className="text-[9px] font-mono bg-indigo-50 text-indigo-700 px-1.5 py-0.5 rounded">Supabase / React</span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Designed an interface synchronizing local workspace databases with back-end storage pipelines, utilizing WebSockets and modern PostgreSQL storage functions.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-150">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-slate-900 text-xs">Dynamic UI Check Suite</h3>
                    <span className="text-[9px] font-mono bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded">Playwright / Actions</span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Set up an automated headless browser testing module triggered during pull requests, validating system forms and data responses.
                  </p>
                </div>

              </div>
            </section>

          </div>

        </div>

        {/* Footer */}
        <footer className="text-center text-[11px] text-slate-400 mt-12 space-y-1">
          <p>© {new Date().getFullYear()} Joseph Elijah Isaiah • Junior Frontend Developer Profile</p>
        </footer>

      </div>
    </div>
  );
}