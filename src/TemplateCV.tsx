

import { Mail, Globe, Github, Linkedin, Briefcase, GraduationCap, Code, User } from 'lucide-react';

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

export default function Resume() {
  // Personal Information
  const personalInfo = {
    name: "Joseph Elijah Isaiah",
    title: "Junior Frontend Developer",
    email: "isaiaheli224@gmail.com",
    portfolio: "https://my-react-project-c43xwcyvk-elijahvision-s-projects.vercel.app",
    github: "https://github.com/Truth123-dev/",
    linkedin: "https://www.linkedin.com/in/elijah-isaiah-873139330",
    summary: "Motivated and detail-oriented Junior Frontend Developer with a strong foundation in React, TypeScript, and modern CSS frameworks like Tailwind. Passionate about building accessible, high-performance web applications and eager to contribute to a dynamic engineering team."
  };

  // Technical Skills
  const skills: string[] = [
    "React.js", "TypeScript", "JavaScript (ES6+)", "Tailwind CSS",
    "HTML5 / CSS3", "Git & GitHub", "RESTful APIs", "Responsive Design",
    "Vite", "Jest", "UI/UX Principles", "Figma to Code"
  ];
 
  // Work Experience
  const experiences: Experience[] = [
    {
      role: "Junior Frontend Developer (Ready To Work!)",
      company: "Self Employ Freelancer",
      period: "Jan 2024 - Jun 2025",
      description: [
        "Developed and maintained responsive user interfaces using React, TypeScript, and Tailwind CSS.",
        "Collaborated with UX/UI designers in Figma to implement pixel-perfect web components.",
        "Optimized application performance, resulting in a 60% increase in Lighthouse loading scores.",
        "Participated in daily stand-ups and code reviews using Git and GitHub."
      ]
    }
  ];

  // Projects
  const projects: Project[] = [
    {
      name: "E-Commerce Checkout Pipeline",
      tech: "React, TypeScript, Tailwind CSS, Context API, Chart.js",
      link: "https://my-react-project-l1xry4zmv-elijahvision-s-projects.vercel.app",
      description: "Authored a secure multi-step payment pipeline. Features client-side card tokenization integrations and precise validation checks."
    },
    {
      name: "SaaSGuard Vision Force",
      tech: "React, Context API, Tailwind CSS, GraphQL , LocalStorage",
      link: "https://my-react-project-947msi9wh-elijahvision-s-projects.vercel.app",
      description: "Engineered a headless CMS site layout utilizing modern caching and incremental static regeneration (ISR) strategies to optimize loading times."
    },
    {
      name: "VisionGuard Car DealerViews",
      tech: "React, TypeScript, Tailwind CSS, ",
      link: "https://my-react-project-37zc67brw-elijahvision-s-projects.vercel.app",
      description: "Implemented a debounced rendering cycle on user keystrokes to prevent browser thread locking during heavy multi-attribute filtering."
    },
    {
      name: "Recipe Discovery & Meal Planner",
      tech: " React, Context API, Tailwind CSS ",
      link: "https://my-react-project-imkvwbxhp-elijahvision-s-projects.vercel.app",
      description: "Recipe discovery application featuring drag-and-drop structural styling optimized for swift visual loading."
    },
    {
      name: "Tech_In_Dev Finder Directory",
      tech: "React, TypeScript, Tailwind CSS, Framer Motion",
      link: "https://my-react-project-reb65bq3d-elijahvision-s-projects.vercel.app",
      description: "Built a searchable index directory with smooth animated interface transitions and custom filter controls."
    },
    {
      name: "VisionGuard Insurance Systems Dashboard",
      tech: "React, Context API, Tailwind CSS,",
      link: "https://my-react-project-824gidh6q-elijahvision-s-projects.vercel.app",
      description: "Developed and documented a reusable component system using React, TypeScript, and Tailwind CSS. Built to comply with WCAG 2.1 AA accessibility guidelines."
    }
  ];

  // Education
  const education = {
    degree: "B.S. in Computer Science & Josminst Tecnology",
    institution: "State University",
    period: "2019 - 2023"
  };

  return (
    <div className="min-h-screen bg-[#0B132B] text-white py-12 px-4 sm:px-6 lg:px-8 font-sans selection:bg-orange-500 selection:text-white">
      <div className="max-w-4xl mx-auto bg-[#1C2541] rounded-2xl shadow-2xl overflow-hidden border border-slate-700">
        
        {/* HEADER SECTION */}
        <header className="bg-[#0B132B] p-8 sm:p-10 border-b border-slate-700 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              {personalInfo.name}
            </h1>
            <p className="text-orange-500 font-semibold text-lg mt-1">
              {personalInfo.title}
            </p>
          </div>

          {/* Contact & Social Links */}
          <div className="flex flex-col gap-2 text-sm text-slate-300">
            <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-2 hover:text-orange-400 transition-colors">
              <Mail size={16} className="text-orange-500" />
              <span>{personalInfo.email}</span>
            </a>
            <a href={personalInfo.portfolio} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-orange-400 transition-colors">
              <Globe size={16} className="text-orange-500" />
              <span>Portfolio</span>
            </a>
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-orange-400 transition-colors">
              <Github size={16} className="text-orange-500" />
              <span>GitHub</span>
            </a>
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-orange-400 transition-colors">
              <Linkedin size={16} className="text-orange-500" />
              <span>LinkedIn</span>
            </a>
          </div>
        </header>

        {/* MAIN BODY CONTENT */}
        <div className="p-8 sm:p-10 space-y-8">
          
          {/* PROFESSIONAL SUMMARY */}
          <section>
            <h2 className="text-xl font-bold text-orange-500 flex items-center gap-2 mb-3 border-b border-slate-700 pb-2">
              <User size={20} /> Professional Summary
            </h2>
            <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
              {personalInfo.summary}
            </p>
          </section>

          {/* TECHNICAL SKILLS */}
          <section>
            <h2 className="text-xl font-bold text-orange-500 flex items-center gap-2 mb-3 border-b border-slate-700 pb-2">
              <Code size={20} /> Technical Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span 
                  key={index} 
                  className="bg-[#0B132B] text-slate-200 border border-slate-600 px-3 py-1.5 rounded-lg text-sm font-medium hover:border-orange-500 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>

          {/* EXPERIENCE */}
          <section>
            <h2 className="text-xl font-bold text-orange-500 flex items-center gap-2 mb-4 border-b border-slate-700 pb-2">
              <Briefcase size={20} /> Experience
            </h2>
            <div className="space-y-6">
              {experiences.map((exp, index) => (
                <div key={index} className="bg-[#0B132B] p-5 rounded-xl border border-slate-700">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-2">
                    <h3 className="text-lg font-semibold text-white">
                      {exp.role} <span className="text-orange-500">@ {exp.company}</span>
                    </h3>
                    <span className="text-xs font-semibold bg-slate-800 text-slate-300 px-2.5 py-1 rounded-md w-fit mt-1 sm:mt-0">
                      {exp.period}
                    </span>
                  </div>
                  <ul className="list-disc list-inside space-y-1.5 text-slate-300 text-sm">
                    {exp.description.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* PROJECTS */}
          <section>
            <h2 className="text-xl font-bold text-orange-500 flex items-center gap-2 mb-4 border-b border-slate-700 pb-2">
              <Code size={20} /> Featured Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.map((project, index) => (
                <div key={index} className="bg-[#0B132B] p-5 rounded-xl border border-slate-700 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-white text-base">{project.name}</h3>
                      <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xs bg-orange-500 hover:bg-orange-600 text-white px-2.5 py-1 rounded-md transition-colors font-medium"
                      >
                        Code
                      </a>
                    </div>
                    <p className="text-xs text-orange-400 font-medium mb-2">{project.tech}</p>
                    <p className="text-slate-300 text-sm">{project.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* EDUCATION */}
          <section>
            <h2 className="text-xl font-bold text-orange-500 flex items-center gap-2 mb-3 border-b border-slate-700 pb-2">
              <GraduationCap size={20} /> Education
            </h2>
            <div className="bg-[#0B132B] p-5 rounded-xl border border-slate-700 flex flex-col sm:flex-row justify-between sm:items-center">
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
    </div>
  );
}