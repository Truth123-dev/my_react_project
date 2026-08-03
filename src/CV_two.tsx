


import { useState } from "react";
import {
  Mail,
  Globe,
  Github,
  Linkedin,
  Briefcase,
  GraduationCap,
  Code,
  User,
  FileText,
  Send,
} from "lucide-react";

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

  const personalInfo = {
    name: "Joseph Elijah Isaiah",
    title: "Junior Frontend Developer",
    email: "isaiaheli224@gmail.com",
    phone: "+234 913-176-6494",
    portfolio:
      "https://my-react-project-c43xwcyvk-elijahvision-s-projects.vercel.app",
    github: "https://github.com/Truth123-dev/",
    linkedin: "https://www.linkedin.com/in/elijah-isaiah-873139330",
    location: "Lagos, Nigeria",
    summary:
      "Dedicated Junior Frontend Developer with practical experience in building user-focused web applications. Proficient in React, TypeScript, and modern CSS frameworks like Tailwind. Adept at turning design mockups into responsive, accessible code and continuously refining performance to improve user experience.",
  };

  const skills: string[] = [
    "React.js",
    "TypeScript",
    "JavaScript (ES6+)",
    "Tailwind CSS",
    "HTML5 / CSS3",
    "Git & GitHub",
    "RESTful APIs",
    "Responsive Design",
    "Next.js (Basics)",
    "State Management",
    "Framer Motion",
    "Figma to Code",
  ];

  const experiences: Experience[] = [
    {
      role: "Junior Frontend Developer (Ready To Work!)",
      company: "TechPulse Solutions , Freelancer , Joshmint Technology",
      period: "Jan 2023 - Jun 2026",
      description: [
        "Collaborated on development of customer-facing dashboards using React and TypeScript, optimizing loading times.",
        "Converted wireframes and UI specs into semantic, mobile-first layouts using Tailwind CSS.",
        "Helped refactor legacy CSS modules into utilities, which reduced standard codebase sizes.",
        "Active contributor in Agile planning sessions, standups, and structured peer code reviews.",
      ],
    },
  ];

  // Six distinct frontend-focused projects
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
    degree: "B.S. in Computer Science & Joshmint Technology",
    institution: "State University & Joshmint Technology",
    period: "2019 - 2023",
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0B132B] text-white py-12 px-4 sm:px-6 lg:px-8 font-sans selection:bg-orange-500 selection:text-white">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* RESUME CARD */}
        <div className="bg-[#1C2541] rounded-2xl shadow-2xl overflow-hidden border border-slate-700">
          {/* HEADER SECTION */}
          <header className="bg-[#0B132B] p-8 sm:p-10 border-b border-slate-700 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                {personalInfo.name}
              </h1>
              <p className="text-orange-500 font-semibold text-lg mt-1">
                {personalInfo.title}
              </p>
              <p className="text-xs text-slate-400 mt-2 flex items-center gap-1">
                <span>{personalInfo.location}</span>
              </p>
            </div>

            {/* Contact & Social Links */}
            <div className="flex flex-col gap-2.5 text-sm text-slate-300">
              <button
                onClick={handleCopyEmail}
                className="flex items-center gap-2 hover:text-orange-400 transition-colors text-left"
              >
                <Mail size={16} className="text-orange-500" />
                <span>{copied ? "Copied!" : personalInfo.email}</span>
              </button>
              <a
                href={personalInfo.portfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-orange-400 transition-colors"
              >
                <Globe size={16} className="text-orange-500" />
                <span>Portfolio Website</span>
              </a>
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-orange-400 transition-colors"
              >
                <Github size={16} className="text-orange-500" />
                <span>GitHub Profile</span>
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-orange-400 transition-colors"
              >
                <Linkedin size={16} className="text-orange-500" />
                <span>LinkedIn Profile</span>
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
                  <div
                    key={index}
                    className="bg-[#0B132B] p-5 rounded-xl border border-slate-700"
                  >
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-3">
                      <h3 className="text-lg font-semibold text-white">
                        {exp.role}{" "}
                        <span className="text-orange-500">@ {exp.company}</span>
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

            {/* SIX PROJECTS */}
            <section>
              <h2 className="text-xl font-bold text-orange-500 flex items-center gap-2 mb-4 border-b border-slate-700 pb-2">
                <Code size={20} /> Highlighted Projects (6)
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projects.map((project, index) => (
                  <div
                    key={index}
                    className="bg-[#0B132B] p-5 rounded-xl border border-slate-700 flex flex-col justify-between hover:border-slate-500 transition-colors"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-2 gap-2">
                        <h3 className="font-bold text-white text-base leading-tight">
                          {project.name}
                        </h3>
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs bg-orange-500 hover:bg-orange-600 text-white px-2.5 py-1 rounded-md transition-colors font-medium whitespace-nowrap"
                        >
                          Code
                        </a>
                      </div>
                      <p className="text-xs text-orange-400 font-medium mb-3">
                        {project.tech}
                      </p>
                      <p className="text-slate-300 text-sm leading-relaxed">
                        {project.description}
                      </p>
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
                  <h3 className="font-bold text-white text-base">
                    {education.degree}
                  </h3>
                  <p className="text-slate-300 text-sm">
                    {education.institution}
                  </p>
                </div>
                <span className="text-xs font-semibold bg-slate-800 text-slate-300 px-2.5 py-1 rounded-md w-fit mt-2 sm:mt-0">
                  {education.period}
                </span>
              </div>
            </section>
          </div>
        </div>

        {/* COVER LETTER CARD */}
        <div className="bg-[#1C2541] rounded-2xl shadow-2xl overflow-hidden border border-slate-700">
          <header className="bg-[#0B132B] p-8 sm:p-10 border-b border-slate-700 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <FileText size={24} className="text-orange-500" /> Cover Letter
              </h2>
              <p className="text-slate-400 text-sm mt-1">
                Targeted at Junior Frontend Developer positions
              </p>
            </div>

            <a
              href={`mailto:${personalInfo.email}?subject=Frontend Developer Application - ${personalInfo.name}`}
              className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2.5 rounded-lg text-sm transition-colors cursor-pointer"
            >
              <Send size={16} />
              <span>Apply Now via Email</span>
            </a>
          </header>

          <div className="p-8 sm:p-10 text-slate-300 space-y-6 text-sm sm:text-base leading-relaxed">
            {/* Metadata */}
            <div className="text-slate-400 text-xs sm:text-sm space-y-1 mb-6 border-l-2 border-orange-500 pl-4">
              <p className="font-semibold text-slate-300">
                {personalInfo.name}
              </p>
              <p>
                {personalInfo.phone} | {personalInfo.email}
              </p>
              <p>{personalInfo.location}</p>
              <p className="pt-2">
                {new Date().toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>

            {/* Recipient info */}
            <div className="text-sm">
              <p className="font-bold text-slate-200">Hiring Team</p>
              <p className="text-slate-400">Engineering Recruitment</p>
            </div>

            <p>Dear Hiring Manager,</p>

            <p>
              I am writing to express my strong interest in the Junior Frontend
              Developer position. With a solid foundation in building
              component-driven user interfaces using <strong>React</strong>,{" "}
              <strong>TypeScript</strong>, and <strong>Tailwind CSS</strong>, I
              am eager to contribute to your engineering goals and grow
              alongside a collaborative development team.
            </p>

            <p>
              During my recent internship at TechPulse Solutions, I worked
              alongside senior developers to transform Figma mockups into
              functional frontend components. This experience sharpened my eye
              for design accuracy and taught me the value of structured codebase
              organizations. I actively optimized existing UI layouts, resulting
              in performance improvements, and learned to write testable,
              maintainable code within standard continuous integration and
              deployment pipelines.
            </p>

            <p>
              Beyond work experience, I have developed and published six
              individual applications to test complex state patterns and modern
              development configurations. From handling complex asynchronous
              APIs in custom search utilities to managing application-wide
              contexts in task trackers, I consistently prioritize responsive
              styling, accessibility, and intuitive navigation.
            </p>

            <p>
              I would welcome the opportunity to discuss how my technical skills
              and eagerness to learn can align with your development priorities.
              Thank you for your time, consideration, and attention.
            </p>

            <div className="pt-4">
              <p>Sincerely,</p>
              <p className="font-bold text-white mt-1">{personalInfo.name}</p>
              <p className="text-orange-500 text-sm">{personalInfo.title}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}