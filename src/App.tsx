
import { useState, useEffect } from 'react';
import { Mail, Globe, Github, Linkedin, Briefcase, GraduationCap, Code, User, FileText, Send, MapPin, Languages, Clock, FileDown } from 'lucide-react';

interface Experience {
  role: string;
  company: string;
  period: string;
  description: string[];
}

interface Project {
  name: string;
  tech: string;
  link: string;
  description: string;
}

export default function ResumeAndCoverLetter() {
  const [copied, setCopied] = useState(false);

  // Typewriter effect state
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const words = ["Junior Frontend Developer", "React & TypeScript Specialist", "Remote-Ready Collaborator", "International Candidate"];
  const [wordIndex, setWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const handleType = () => {
      const currentWord = words[wordIndex];
      if (!isDeleting) {
        setCurrentText(currentWord.substring(0, currentText.length + 1));
        if (currentText === currentWord) {
          setTypingSpeed(2000);
          setIsDeleting(true);
        } else {
          setTypingSpeed(100);
        }
      } else {
        setCurrentText(currentWord.substring(0, currentText.length - 1));
        if (currentText === "") {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
          setTypingSpeed(500);
        } else {
          setTypingSpeed(50);
        }
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, wordIndex, typingSpeed, words]);

  const personalInfo = {
    name: "Joseph Elijah Isaiah",
    email: "isaiaheli224@gmail.com",
    portfolio: "https://my-react-project-c43xwcyvk-elijahvision-s-projects.vercel.app",
    github: "https://github.com/Truth123-dev/",
    linkedin: "https://www.linkedin.com/in/elijah-isaiah-873139330",
    resumeUrl: "https://my-react-project-lj3kof4wt-elijahvision-s-projects.vercel.app", // Direct Resume Link
    location: "Global / Remote-Ready",
    timezone: "UTC-5 to UTC+3 operational alignment",
    languages: "English (C2 Professional)",
    summary: "Detail-oriented Junior Frontend Developer with an international mindset, ready to contribute to distributed software engineering teams. Focused on developing responsive user interfaces using React, TypeScript, and Tailwind CSS. Pragmatic programmer dedicated to code quality, usability, and cross-cultural communication."
  };

  const skills: string[] = [
    "React.js", "TypeScript", "JavaScript (ES6+)", "Tailwind CSS",
    "HTML5 & Semantic CSS", "Git & GitHub workflow", "RESTful API Integration",
    "Responsive & Mobile-First Design", "State Management",
    "Framer Motion", "Figma-to-Code Implementation"
  ];

  const experiences: Experience[] = [
    {
      role: "Junior Frontend Developer (Ready To Work!)",
      company: "TechPulse Solutions , Freelancer , Joshmint Technology",
      period: "Jan 2023 - Jun 2025",
      description: [
        "Collaborated with developers across three timezones to support customer-facing dashboard development using React.",
        "Created responsive layouts using Tailwind CSS, ensuring accessibility standards (WCAG) were met.",
        "Assisted in standardizing components to simplify code maintenance across development cycles.",
        "Engaged in standard Agile processes, including standups, sprint reviews, and pair-programming sessions."
      ]
    }
  ];

  const projects: Project[] = [
        {
      name: "E-Commerce Checkout Pipeline",
      tech: "React, TypeScript, Tailwind CSS, Context API, Chart.js",
      link: "https://my-react-project-l1xry4zmv-elijahvision-s-projects.vercel.app",
      description:
        "Authored a secure multi-step payment pipeline. Features client-side card tokenization integrations and precise validation checks.",
    },
    {
      name: "SaaSGuard Vision Force",
      tech: "React, Context API, Tailwind CSS, GraphQL , LocalStorage",
      link: "https://my-react-project-947msi9wh-elijahvision-s-projects.vercel.app",
      description:
        "Engineered a headless CMS site layout utilizing modern caching and incremental static regeneration (ISR) strategies to optimize loading times.",
    },
    {
      name: "VisionGuard Car DealerViews",
      tech: "React, TypeScript, Tailwind CSS, ",
      link: "https://my-react-project-37zc67brw-elijahvision-s-projects.vercel.app",
      description:
        "Implemented a debounced rendering cycle on user keystrokes to prevent browser thread locking during heavy multi-attribute filtering.",
    },
    {
      name: "Recipe Discovery & Meal Planner",
      tech: " React, Context API, Tailwind CSS ",
      link: "https://my-react-project-imkvwbxhp-elijahvision-s-projects.vercel.app",
      description:
        "Recipe discovery application featuring drag-and-drop structural styling optimized for swift visual loading.",
    },
    {
      name: "Tech_In_Dev Finder Directory",
      tech: "React, TypeScript, Tailwind CSS, Framer Motion",
      link: "https://my-react-project-reb65bq3d-elijahvision-s-projects.vercel.app",
      description:
        "Built a searchable index directory with smooth animated interface transitions and custom filter controls.",
    },
    {
      name: "VisionGuard Insurance Systems Dashboard",
      tech: "React, Context API, Tailwind CSS,",
      link: "https://my-react-project-824gidh6q-elijahvision-s-projects.vercel.app",
      description:
        "Developed and documented a reusable component system using React, TypeScript, and Tailwind CSS. Built to comply with WCAG 2.1 AA accessibility guidelines.",
    },
  ];

  const education = {
    degree: "B.S. in Computer Science & Digital Communication & Joshmint Technology",
    institution: " OnlineInternational Tech University",
    period: "2019 - 2023"
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0B132B] text-white py-12 px-4 sm:px-6 lg:px-8 font-sans selection:bg-orange-500 selection:text-white relative overflow-hidden">
      
      {/* EMBEDDED STYLES FOR FLAWLESS TRANSITIONS */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }
        .delay-400 { animation-delay: 400ms; }
        .delay-500 { animation-delay: 500ms; }
      `}</style>

      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* RESUME CARD */}
        <div className="animate-fade-in-up bg-[#1C2541] rounded-2xl shadow-2xl overflow-hidden border border-slate-700 transition-all duration-500 hover:shadow-orange-500/5 hover:border-slate-600">
          
          {/* HEADER SECTION */}
          <header className="bg-[#0B132B] p-8 sm:p-10 border-b border-slate-700 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
            <div className="space-y-1">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                {personalInfo.name}
              </h1>
              
              {/* Looping Typewriter */}
              <div className="h-8 flex items-center">
                <p className="text-orange-500 font-semibold text-lg">
                  {currentText}
                  <span className="animate-pulse border-r-2 border-orange-500 ml-1"></span>
                </p>
              </div>

              {/* International Logistics Details */}
              <div className="pt-2 space-y-1.5 text-xs text-slate-400">
                <p className="flex items-center gap-1.5"><MapPin size={13} className="text-slate-500" /> {personalInfo.location}</p>
                <p className="flex items-center gap-1.5"><Clock size={13} className="text-slate-500" /> {personalInfo.timezone}</p>
                <p className="flex items-center gap-1.5"><Languages size={13} className="text-slate-500" /> {personalInfo.languages}</p>
              </div>
            </div>

            {/* Contact, Social, and PDF Links */}
            <div className="flex flex-col gap-2.5 text-sm text-slate-300 w-full sm:w-auto">
              <button 
                onClick={handleCopyEmail}
                className="flex items-center gap-2 hover:text-orange-400 transition-all duration-200 transform hover:translate-x-1 text-left cursor-pointer"
              >
                <Mail size={16} className="text-orange-500" />
                <span>{copied ? "Copied!" : personalInfo.email}</span>
              </button>
              <a href={personalInfo.portfolio} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-orange-400 transition-all duration-200 transform hover:translate-x-1">
                <Globe size={16} className="text-orange-500" />
                <span>Portfolio Website</span>
              </a>
              <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-orange-400 transition-all duration-200 transform hover:translate-x-1">
                <Github size={16} className="text-orange-500" />
                <span>GitHub Profile</span>
              </a>
              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-orange-400 transition-all duration-200 transform hover:translate-x-1">
                <Linkedin size={16} className="text-orange-500" />
                <span>LinkedIn Profile</span>
              </a>
              
              {/* Highlighted Resume Link */}
              <a 
                href={personalInfo.resumeUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="mt-2 flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-bold py-2 px-4 rounded-lg text-xs transition-all duration-300 shadow-md hover:shadow-orange-500/20"
              >
                <FileDown size={14} />
                <span>Download PDF Resume</span>
              </a>
            </div>
          </header>

          {/* MAIN BODY CONTENT */}
          <div className="p-8 sm:p-10 space-y-8">
            
            {/* PROFESSIONAL SUMMARY */}
            <section className="animate-fade-in-up delay-100 transition-all duration-300 hover:scale-[1.01]">
              <h2 className="text-xl font-bold text-orange-500 flex items-center gap-2 mb-3 border-b border-slate-700 pb-2">
                <User size={20} /> Professional Summary
              </h2>
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                {personalInfo.summary}
              </p>
            </section>

            {/* TECHNICAL SKILLS */}
            <section className="animate-fade-in-up delay-200 transition-all duration-300 hover:scale-[1.01]">
              <h2 className="text-xl font-bold text-orange-500 flex items-center gap-2 mb-3 border-b border-slate-700 pb-2">
                <Code size={20} /> Technical Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span 
                    key={index} 
                    className="bg-[#0B132B] text-slate-200 border border-slate-600 px-3 py-1.5 rounded-lg text-sm font-medium hover:border-orange-500 hover:scale-105 transition-all duration-300 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>

            {/* EXPERIENCE */}
            <section className="animate-fade-in-up delay-300 transition-all duration-300 hover:scale-[1.01]">
              <h2 className="text-xl font-bold text-orange-500 flex items-center gap-2 mb-4 border-b border-slate-700 pb-2">
                <Briefcase size={20} /> Work Experience
              </h2>
              <div className="space-y-6">
                {experiences.map((exp, index) => (
                  <div key={index} className="bg-[#0B132B] p-5 rounded-xl border border-slate-700 transition-all duration-300 hover:border-slate-500">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-3">
                      <h3 className="text-lg font-semibold text-white">
                        {exp.role} <span className="text-orange-500">@ {exp.company}</span>
                      </h3>
                      <span className="text-xs font-semibold bg-slate-800 text-slate-300 px-2.5 py-1 rounded-md w-fit mt-1 sm:mt-0">
                        {exp.period}
                      </span>
                    </div>
                    <ul className="list-disc list-inside space-y-2 text-slate-300 text-sm leading-relaxed">
                      {exp.description.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* SIX PROJECTS WITH HOVER SCALING */}
            <section className="animate-fade-in-up delay-400">
              <h2 className="text-xl font-bold text-orange-500 flex items-center gap-2 mb-4 border-b border-slate-700 pb-2">
                <Code size={20} /> Technical Projects (6)
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projects.map((project, index) => (
                  <div 
                    key={index} 
                    className="bg-[#0B132B] p-5 rounded-xl border border-slate-700 flex flex-col justify-between transform transition-all duration-300 hover:scale-[1.03] hover:border-orange-500/50 hover:shadow-lg hover:shadow-orange-500/5"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-2 gap-2">
                        <h3 className="font-bold text-white text-base leading-tight">{project.name}</h3>
                        <a 
                          href={project.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-xs bg-orange-500 hover:bg-orange-600 text-white px-2.5 py-1 rounded-md transition-colors font-medium whitespace-nowrap"
                        >
                          Code
                        </a>
                      </div>
                      <p className="text-xs text-orange-400 font-medium mb-3">{project.tech}</p>
                      <p className="text-slate-300 text-sm leading-relaxed">{project.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* EDUCATION */}
            <section className="animate-fade-in-up delay-500 transition-all duration-300 hover:scale-[1.01]">
              <h2 className="text-xl font-bold text-orange-500 flex items-center gap-2 mb-3 border-b border-slate-700 pb-2">
                <GraduationCap size={20} /> Education
              </h2>
              <div className="bg-[#0B132B] p-5 rounded-xl border border-slate-700 flex flex-col sm:flex-row justify-between sm:items-center transition-all duration-300 hover:border-slate-500">
                <div>
                  <h3 className="font-bold text-white text-base">{education.degree}</h3>
                  <p className="text-slate-300 text-sm">{education.institution}</p>
                </div>
                <span className="text-xs font-semibold bg-slate-800 text-slate-300 px-2.5 py-1 rounded-md w-fit mt-2 sm:mt-0">
                  {education.period}
                </span>
              </div>
            </section>

          </div>
        </div>

        {/* COVER LETTER CARD */}
        <div className="animate-fade-in-up delay-500 bg-[#1C2541] rounded-2xl shadow-2xl overflow-hidden border border-slate-700 transition-all duration-500 hover:shadow-orange-500/5 hover:border-slate-600">
          
          <header className="bg-[#0B132B] p-8 sm:p-10 border-b border-slate-700 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <FileText size={24} className="text-orange-500" /> Professional Cover Letter
              </h2>
              <p className="text-slate-400 text-sm mt-1">
                Structured for international remote/hybrid integrations
              </p>
            </div>
            
            <a 
              href={`mailto:${personalInfo.email}?subject=Frontend Developer Application - ${personalInfo.name}`}
              className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-semibold px-4 py-2.5 rounded-lg text-sm transition-all duration-300 cursor-pointer shadow-md hover:shadow-orange-500/20"
            >
              <Send size={16} />
              <span>Apply via Email</span>
            </a>
          </header>

          <div className="p-8 sm:p-10 text-slate-300 space-y-6 text-sm sm:text-base leading-relaxed">
            
            {/* Metadata Contact Box */}
            <div className="text-slate-400 text-xs sm:text-sm space-y-1 mb-6 border-l-2 border-orange-500 pl-4 bg-[#0B132B]/50 p-4 rounded-r-lg">
              <p className="font-semibold text-slate-300">{personalInfo.name}</p>
              <p>{personalInfo.email}</p>
              <p>{personalInfo.location}</p>
              <p>{personalInfo.timezone}</p>
              <p className="pt-2">{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
            </div>

            <div className="text-sm">
              <p className="font-bold text-slate-200">Hiring Committee</p>
              <p className="text-slate-400">Engineering and Talent Development</p>
            </div>

            <p>Dear Hiring Team,</p>

            <p>
              I am writing to share my credentials for the Junior Frontend Developer role.
               Equipped with technical expertise in <strong>React</strong>, <strong>TypeScript</strong>,
                and <strong>Tailwind CSS</strong>, alongside structured training in cross-functional 
                communication, I am excited to contribute to your engineering objectives.
            </p>

            <p>
              My professional background includes internships with distributed developer squads,
               requiring transparent communication and strict version control practices. Operating
                across dynamic timezone parameters taught me to value asynchronous documentation and
                 proactive task management. During my term at Apex Global Tech, I focused on turning
                  responsive layouts into code, standardizing shared UI modules, and analyzing 
                  performance across diverse standard browsers.
            </p>

            <p>
              To complement my practical experience, I have developed six technical portfolio 
              projects. These deployments demonstrate core competencies in asynchronous state
               orchestration, structured REST API integrations, responsive CSS modules,
                and local user settings. Furthermore, my multi-currency and international team 
                planning projects highlight my commitment to solving international and high-utility 
                problems.
            </p>

            <p>
              Given my schedule flexibility to align with your key core operating hours,
               I am confident I can integrate into your current engineering cycle without 
               friction. I appreciate your review of my qualifications and look forward to the
                prospect of discussing how my abilities align with your frontend division.
            </p>

            <div className="pt-4">
              <p>Sincerely,</p>
              <p className="font-bold text-white mt-1">{personalInfo.name}</p>
              <p className="text-orange-500 text-sm">{personalInfo.name}</p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}