

import React, { useState, useEffect } from 'react';

// Interfaces
interface Program {
  id: string;
  ageGroup: string;
  title: string;
  description: string;
  intensity: string;
  features: string[];
}

interface TacticalPlayer {
  id: number;
  name: string;
  role: string;
  x: number; // Percentage from left
  y: number; // Percentage from top
}

export const CastleBrotherAcademy: React.FC = () => {
  // State for interactive tactical board
  const [activePlayer, setActivePlayer] = useState<number>(0);
  const [ballPosition, setBallPosition] = useState<{ x: number; y: number }>({ x: 50, y: 75 });
  const [isPassing, setIsPassing] = useState<boolean>(false);
  const [passCount, setPassCount] = useState<number>(0);

  // State for logo interaction
  const [hoveredLogoSegment, setHoveredLogoSegment] = useState<number | null>(null);

  // State for active program tab
  const [selectedProgram, setSelectedProgram] = useState<string>('u15');

  // Contact form state
  const [formData, setFormData] = useState({ name: '', email: '', age: '', position: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Tactical players data (5 brothers formation)
  const players: TacticalPlayer[] = [
    { id: 0, name: 'Brother Alpha (Striker)', role: 'Striker', x: 50, y: 20 },
    { id: 1, name: 'Brother Beta (Winger)', role: 'Left Winger', x: 20, y: 40 },
    { id: 2, name: 'Brother Gamma (Winger)', role: 'Right Winger', x: 80, y: 40 },
    { id: 3, name: 'Brother Delta (Midfielder)', role: 'Playmaker', x: 50, y: 55 },
    { id: 4, name: 'Brother Sigma (Defender)', role: 'Captain/CB', x: 50, y: 80 },
  ];

  // Handle passing ball on tactical board
  const handlePass = (player: TacticalPlayer) => {
    if (isPassing || player.id === activePlayer) return;
    
    setIsPassing(true);
    // Set ball coordinates to destination player
    setBallPosition({ x: player.x, y: player.y });
    
    setTimeout(() => {
      setActivePlayer(player.id);
      setIsPassing(false);
      setPassCount(prev => prev + 1);
    }, 600); // Duration matches CSS transition
  };

  // Reset ball to active player on initial render
  useEffect(() => {
    const initialPlayer = players[activePlayer];
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setBallPosition({ x: initialPlayer.x, y: initialPlayer.y });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const programs: Program[] = [
    {
      id: 'u12',
      ageGroup: 'U11 - U13',
      title: 'Foundation Academy',
      description: 'Focusing on core motor skills, ball mastery, and building the joy of teamwork.',
      intensity: 'Technical Focus',
      features: ['3 Training sessions/week', 'Local weekend festivals', 'Individual progress reports'],
    },
    {
      id: 'u15',
      ageGroup: 'U14 - U16',
      title: 'Development Academy',
      description: 'Introduction to tactical systems, physical conditioning, and high-performance habits.',
      intensity: 'Tactical & Physical',
      features: ['4 Training sessions/week', 'National youth league entry', 'Video analysis sessions'],
    },
    {
      id: 'u19',
      ageGroup: 'U17 - U21',
      title: 'Elite Pro Pathway',
      description: 'Direct preparation for professional environments, showcases, and senior team integration.',
      intensity: 'High Performance',
      features: ['Daily professional regimen', 'International showcase tournaments', 'Scout & Agent networking'],
    },
  ];

  const logoValues = [
    { text: "Unity", desc: "Standing together as one team." },
    { text: "Strength", desc: "Built like a castle's foundation." },
    { text: "Brotherhood", desc: "Supporting peers on and off the pitch." },
    { text: "Honor", desc: "Respecting the game and opponents." },
    { text: "Ambition", desc: "Striving for elite standard." }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans overflow-x-hidden selection:bg-amber-500 selection:text-slate-900">
      
      {/* Custom Styles for Ambient Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(3deg); }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.05); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float 8s ease-in-out infinite;
          animation-delay: 2s;
        }
        .animate-pulse-glow {
          animation: pulseGlow 4s ease-in-out infinite;
        }
      `}</style>

      {/* Floating background decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-600/10 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '2s' }} />

      {/* Header / Navigation */}
      <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo Brand Area */}
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="relative w-12 h-12 flex items-center justify-center bg-slate-900 rounded-xl border border-amber-500/30 group-hover:border-amber-500 transition-colors duration-300">
              {/* SVG Logo: 5 stylized brothers holding hands forming a castle crown shape */}
              <svg viewBox="0 0 100 100" className="w-10 h-10 transition-transform duration-500 group-hover:rotate-12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="42" stroke="currentColor" className="text-slate-800" strokeWidth="2" strokeDasharray="4 4" />
                {/* 5 Head nodes */}
                <circle cx="50" cy="22" r="4" fill="#F59E0B" /> {/* Top / Alpha */}
                <circle cx="78" cy="42" r="4" fill="#F59E0B" /> {/* Right */}
                <circle cx="68" cy="74" r="4" fill="#F59E0B" /> {/* Bottom Right */}
                <circle cx="32" cy="74" r="4" fill="#F59E0B" /> {/* Bottom Left */}
                <circle cx="22" cy="42" r="4" fill="#F59E0B" /> {/* Left */}
                
                {/* Connecting arms / body arches */}
                <path d="M 50 26 C 60 26, 70 32, 78 42 M 78 42 C 76 54, 72 66, 68 74 M 68 74 C 58 78, 42 78, 32 74 M 32 74 C 28 66, 24 54, 22 42 M 22 42 C 30 32, 40 26, 50 26" 
                      stroke="#10B981" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                
                {/* Central star/shield element representing the bond */}
                <path d="M 50 38 L 54 48 L 64 48 L 56 54 L 59 64 L 50 58 L 41 64 L 44 54 L 36 48 L 46 48 Z" fill="#F59E0B" opacity="0.8" />
              </svg>
            </div>
            <div>
              <span className="text-lg font-bold tracking-wider uppercase text-slate-100">
                Castle<span className="text-amber-500">Brother</span>
              </span>
              <p className="text-[10px] text-emerald-400 font-semibold tracking-widest uppercase">Football Academy</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#about" className="hover:text-amber-500 transition-colors">About Us</a>
            <a href="#interactive" className="hover:text-amber-500 transition-colors">Tactical Play</a>
            <a href="#programs" className="hover:text-amber-500 transition-colors">Programs</a>
            <a href="#contact" className="hover:text-amber-500 transition-colors">Apply</a>
          </nav>

          <div className="flex items-center gap-4">
            <a href="#contact" className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-linear-to-r from-emerald-600 to-emerald-500 text-white font-semibold text-sm shadow-lg shadow-emerald-900/20 hover:shadow-emerald-700/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200">
              Join Trials
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 md:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Text */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Now Recruiting for 2025/2026 Season
              </span>
              <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
                Where <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-400 to-amber-500">Brothers</span> Turn Into <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-emerald-500">Champions</span>
              </h1>
              <p className="text-lg text-slate-400 max-w-xl mx-auto lg:mx-0">
                CastleBrother Academy blends elite European training methodologies with an unbreakable family bond. We don't just develop world-class technical footballers; we construct resilient characters.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <a href="#programs" className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold transition-all duration-200 hover:scale-105 text-center">
                  Explore Programs
                </a>
                <a href="#interactive" className="w-full sm:w-auto px-8 py-3.5 rounded-xl border border-slate-700 hover:border-slate-500 text-slate-300 font-semibold transition-all duration-200 text-center flex items-center justify-center gap-2">
                  Interactive Pitch
                  <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                </a>
              </div>
            </div>

            {/* Interactive Hero Logo Playground */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <div className="relative p-8 bg-slate-900/60 rounded-3xl border border-slate-800 shadow-2xl w-full max-w-md mx-auto overflow-hidden group">
                <div className="absolute inset-0 bg-linear-to-b from-amber-500/5 to-transparent pointer-events-none" />
                
                <h3 className="text-center text-sm font-bold tracking-widest text-slate-500 uppercase mb-6">
                  The Brotherhood Shield
                </h3>

                {/* Animated Logo Display */}
                <div className="relative w-64 h-64 mx-auto flex items-center justify-center">
                  
                  {/* Decorative rotating backdrop track */}
                  <div className="absolute inset-0 rounded-full border border-slate-800 border-dashed animate-spin" style={{ animationDuration: '60s' }} />

                  {/* Highlighting background aura */}
                  <div className={`absolute w-40 h-40 rounded-full blur-2xl transition-all duration-700 pointer-events-none opacity-40 ${
                    hoveredLogoSegment !== null ? 'bg-amber-500/30 scale-110' : 'bg-emerald-500/20'
                  }`} />

                  {/* Complex SVG Logo with hoverable paths */}
                  <svg viewBox="0 0 100 100" className="w-48 h-48 relative z-10 drop-shadow-[0_0_15px_rgba(245,158,11,0.1)]">
                    {/* Ring line */}
                    <circle cx="50" cy="50" r="32" stroke="#334155" strokeWidth="1.5" fill="none" />

                    {/* Interactive Figures */}
                    {logoValues.map((_val, idx) => {
                      // Calculate positions of figures to map specific interactive areas
                      const angle = (idx * 2 * Math.PI) / 5 - Math.PI / 2;
                      const cx = 50 + 32 * Math.cos(angle);
                      const cy = 50 + 32 * Math.sin(angle);
                      
                      return (
                        <g 
                          key={idx}
                          className="cursor-pointer"
                          onMouseEnter={() => setHoveredLogoSegment(idx)}
                          onMouseLeave={() => setHoveredLogoSegment(null)}
                        >
                          {/* Anchor Circle to hover */}
                          <circle 
                            cx={cx} 
                            cy={cy} 
                            r="10" 
                            fill="transparent" 
                          />
                          {/* Visual head marker */}
                          <circle 
                            cx={cx} 
                            cy={cy} 
                            r={hoveredLogoSegment === idx ? '6' : '4.5'} 
                            className="transition-all duration-300"
                            fill={hoveredLogoSegment === idx ? '#10B981' : '#F59E0B'} 
                          />
                          {/* Pulse halo for active item */}
                          {hoveredLogoSegment === idx && (
                            <circle 
                              cx={cx} 
                              cy={cy} 
                              r="10" 
                              className="animate-ping opacity-75"
                              fill="none"
                              stroke="#10B981"
                              strokeWidth="1.5"
                            />
                          )}
                        </g>
                      );
                    })}

                    {/* Connection arches */}
                    <path 
                      d="M 50 18 C 62 18, 74 26, 82 50 M 82 50 C 78 68, 68 78, 50 82 M 50 82 C 32 78, 22 68, 18 50 M 18 50 C 26 26, 38 18, 50 18" 
                      stroke="#10B981" 
                      strokeWidth="3.5" 
                      strokeLinecap="round" 
                      opacity="0.8"
                    />

                    {/* Center Core */}
                    <g className="pointer-events-none">
                      <polygon 
                        points="50,38 53,46 62,46 55,51 57,59 50,54 43,59 45,51 38,46 47,46" 
                        fill={hoveredLogoSegment !== null ? '#10B981' : '#F59E0B'} 
                        className="transition-all duration-300 transform-gpu origin-center"
                        style={{ transform: hoveredLogoSegment !== null ? 'scale(1.15)' : 'scale(1)' }}
                      />
                    </g>
                  </svg>
                </div>

                {/* Values Card changing on Hover */}
                <div className="mt-6 text-center min-h-17.5 flex flex-col justify-center transition-all duration-300">
                  {hoveredLogoSegment !== null ? (
                    <div className="animate-fade-in">
                      <span className="text-emerald-400 font-bold text-lg tracking-wide uppercase">
                        {logoValues[hoveredLogoSegment].text}
                      </span>
                      <p className="text-xs text-slate-300 mt-1">
                        {logoValues[hoveredLogoSegment].desc}
                      </p>
                    </div>
                  ) : (
                    <div>
                      <span className="text-amber-500 font-semibold text-sm uppercase tracking-widest">
                        Interactive Crest
                      </span>
                      <p className="text-xs text-slate-400 mt-1">
                        Hover over any anchor point of the Brotherhood ring to explore our pillars.
                      </p>
                    </div>
                  )}
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Interactive Tactical Board Section */}
      <section id="interactive" className="py-20 bg-slate-900/40 border-y border-slate-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Experience Our Playstyle</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2">The Interactive Tactical Pitch</h2>
            <p className="text-slate-400 mt-3 text-sm sm:text-base">
              The CastleBrother playstyle relies on swift, accurate passes and synchronized positioning. Click on the players to pass the ball around the pitch and try to raise your play count!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Technical Pitch Board */}
            <div className="lg:col-span-8 flex flex-col justify-between">
              
              {/* Tactical Pitch Box */}
              <div className="relative aspect-4/3 w-full bg-slate-950 rounded-2xl border-2 border-slate-800 overflow-hidden shadow-2xl p-4">
                
                {/* Grass Background & Lines */}
                <div className="absolute inset-0 opacity-15 bg-linear-to-b from-emerald-950 to-emerald-900" />
                
                {/* Center Pitch Circle */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border border-slate-700/60 pointer-events-none" />
                {/* Center Line */}
                <div className="absolute top-1/2 left-0 right-0 h-px bg-slate-700/60 pointer-events-none" />
                {/* Penalty Box Areas */}
                <div className="absolute top-0 left-1/4 right-1/4 h-24 border-b border-x border-slate-700/50 rounded-b-lg pointer-events-none" />
                <div className="absolute bottom-0 left-1/4 right-1/4 h-24 border-t border-x border-slate-700/50 rounded-t-lg pointer-events-none" />

                {/* Interactive Player Nodes */}
                {players.map((p) => {
                  const isCurrent = activePlayer === p.id;
                  return (
                    <button
                      key={p.id}
                      onClick={() => handlePass(p)}
                      disabled={isPassing || isCurrent}
                      className="absolute -translate-x-1/2 -translate-y-1/2 group focus:outline-none z-20"
                      style={{ left: `${p.x}%`, top: `${p.y}%` }}
                    >
                      {/* Pulse Ring for next available actions */}
                      {!isCurrent && !isPassing && (
                        <span className="absolute inset-0 rounded-full bg-emerald-500/20 scale-150 animate-ping" />
                      )}
                      
                      {/* Player Icon/Node */}
                      <div className={`relative flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 transition-all duration-300 ${
                        isCurrent 
                          ? 'bg-amber-500 border-amber-300 text-slate-950 font-bold scale-110 shadow-[0_0_15px_rgba(245,158,11,0.5)]' 
                          : 'bg-slate-900 hover:bg-emerald-950 border-slate-700 text-slate-100 hover:border-emerald-500 scale-100'
                      }`}>
                        <span className="text-xs sm:text-sm font-semibold">
                          #{p.id + 1}
                        </span>
                      </div>

                      {/* Tooltip Player Info */}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-max max-w-35 px-2 py-1 bg-slate-950/90 text-[10px] text-slate-300 rounded border border-slate-800 opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 shadow-md">
                        <p className="font-bold text-slate-100">{p.name}</p>
                        <p className="text-slate-400 text-[9px]">{p.role}</p>
                      </div>
                    </button>
                  );
                })}

                {/* Animated Football */}
                <div 
                  className={`absolute w-5 h-5 sm:w-6 sm:h-6 -translate-x-1/2 -translate-y-1/2 z-30 transition-all ease-out duration-600 ${
                    isPassing ? 'scale-110' : 'scale-100'
                  }`}
                  style={{ 
                    left: `${ballPosition.x}%`, 
                    top: `${ballPosition.y}%`,
                  }}
                >
                  {/* Soccer ball SVG */}
                  <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_4px_6px_rgba(0,0,0,0.6)] animate-spin" style={{ animationDuration: isPassing ? '0.4s' : '4s' }}>
                    <circle cx="50" cy="50" r="46" fill="#F8FAFC" stroke="#0F172A" strokeWidth="6" />
                    <path d="M 50 14 L 62 26 L 50 38 L 38 26 Z M 22 50 L 34 38 L 46 50 L 34 62 Z M 78 50 L 66 38 L 54 50 L 66 62 Z M 50 86 L 62 74 L 50 62 L 38 74 Z" fill="#0F172A" />
                  </svg>
                </div>

              </div>
            </div>

            {/* Tactical Game Stats & Insights */}
            <div className="lg:col-span-4 flex flex-col justify-between gap-6">
              
              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-lg font-bold text-slate-100 mb-2 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                    Tactical Dashboard
                  </h4>
                  <p className="text-xs text-slate-400">
                    Interact directly with the pitch on the left. Tap active positions to transfer the ball across the defense-to-attack setup.
                  </p>

                  <div className="mt-6 space-y-4">
                    <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800">
                      <span className="text-[10px] text-slate-400 block uppercase font-semibold">Active Position</span>
                      <span className="text-sm font-semibold text-amber-500">
                        {players[activePlayer].name}
                      </span>
                    </div>
                    
                    <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800">
                      <span className="text-[10px] text-slate-400 block uppercase font-semibold">Tactical Action</span>
                      <span className="text-sm font-semibold text-slate-200">
                        {isPassing ? 'Passing the ball...' : 'Awaiting Next Pass'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-800 flex justify-between items-center">
                  <div>
                    <span className="text-xs text-slate-400 block">Total Passes Completed</span>
                    <span className="text-3xl font-extrabold text-white">{passCount}</span>
                  </div>
                  <button 
                    onClick={() => { setPassCount(0); handlePass(players[0]); }}
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold rounded-lg border border-slate-800 hover:border-slate-700 transition"
                  >
                    Reset Count
                  </button>
                </div>
              </div>

              {/* Academy Philosophy Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <span className="text-2xl font-bold text-emerald-400 block">95%</span>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Academy Pass Accuracy</span>
                </div>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <span className="text-2xl font-bold text-amber-500 block">18+</span>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Pro Signings 2024</span>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* Academy Core Pillars / About Section */}
      <section id="about" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="relative">
            {/* Visual representation of structural training */}
            <div className="absolute inset-0 bg-linear-to-tr from-amber-500/10 to-transparent rounded-2xl pointer-events-none" />
            <div className="relative p-8 bg-slate-900/60 rounded-2xl border border-slate-800/80 space-y-6">
              
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/20 font-bold">1</div>
                <div>
                  <h4 className="text-base font-bold text-slate-100">Synchronized Tactical Intellect</h4>
                  <p className="text-sm text-slate-400 mt-1">
                    Every member behaves as one. We train cognitive skills, allowing players to predict spaces, options, and movement pathways before they happen.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/20 font-bold">2</div>
                <div>
                  <h4 className="text-base font-bold text-slate-100">Castle Defense Doctrine</h4>
                  <p className="text-sm text-slate-400 mt-1">
                    Defenders and midfielders work as interactive defensive blocks, creating impenetrable zonal shields.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/20 font-bold">3</div>
                <div>
                  <h4 className="text-base font-bold text-slate-100">Life Education Program</h4>
                  <p className="text-sm text-slate-400 mt-1">
                    Football is just the catalyst. CastleBrother ensures top-tier academic guidance, emotional resilience tutoring, and sports nutrition management.
                  </p>
                </div>
              </div>

            </div>
          </div>

          <div className="space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-500">How We Build Future Stars</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">We Build The Athletes Who Build The Future</h2>
            <p className="text-slate-400">
              The academy was founded in 2012 with a foundational ethos: "The brotherhood builds the individual." In standard development centers, individual competitiveness often breaks team solidarity. At CastleBrother, players grow together, unlocking each other's hidden strengths.
            </p>
            <div className="pt-4 flex flex-wrap gap-4">
              <div className="px-4 py-2 bg-slate-900 rounded-lg border border-slate-800 text-sm text-slate-300">
                ⭐ UEFA Pro Licensed Coaching
              </div>
              <div className="px-4 py-2 bg-slate-900 rounded-lg border border-slate-800 text-sm text-slate-300">
                ⚡ Advanced Bio-Metrics Assessment
              </div>
              <div className="px-4 py-2 bg-slate-900 rounded-lg border border-slate-800 text-sm text-slate-300">
                ✈️ Annual European Club Tournaments
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Development Programs Section */}
      <section id="programs" className="py-20 bg-slate-900/20 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Tailored Youth Paths</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2">Elite Development Pathways</h2>
            <p className="text-slate-400 mt-3 text-sm sm:text-base">
              Explore custom curriculums designed to optimize physical, emotional, and tactical growth depending on age and skill metrics.
            </p>
          </div>

          {/* Interactive Path Tabs */}
          <div className="flex justify-center gap-2 mb-12 bg-slate-950 p-1.5 rounded-xl border border-slate-800 max-w-md mx-auto">
            {programs.map((prog) => (
              <button
                key={prog.id}
                onClick={() => setSelectedProgram(prog.id)}
                className={`flex-1 py-2.5 px-4 rounded-lg text-xs sm:text-sm font-bold transition-all duration-200 ${
                  selectedProgram === prog.id 
                    ? 'bg-amber-500 text-slate-950 shadow-md' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                {prog.ageGroup}
              </button>
            ))}
          </div>

          {/* Selected Program Showcase Card */}
          <div className="max-w-4xl mx-auto">
            {programs.map((prog) => {
              if (prog.id !== selectedProgram) return null;
              return (
                <div 
                  key={prog.id} 
                  className="bg-slate-900/70 p-6 sm:p-10 rounded-2xl border border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-8 items-center transition-all duration-500 animate-fade-in"
                >
                  <div className="space-y-4">
                    <span className="px-3 py-1 rounded bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                      {prog.intensity}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                      {prog.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {prog.description}
                    </p>
                  </div>

                  <div className="bg-slate-950 p-6 rounded-xl border border-slate-800/80 space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-amber-500">Included Features</h4>
                    <ul className="space-y-3">
                      {prog.features.map((feat, i) => (
                        <li key={i} className="flex items-center gap-3 text-xs sm:text-sm text-slate-300">
                          <svg className="w-4 h-4 text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                          </svg>
                          {feat}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Registration/Application Form Section */}
      <section id="contact" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 p-8 sm:p-12 items-center">
            
            {/* Invite Info */}
            <div className="space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Start Your Journey</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                Secure a Trial at Our Elite Base Camp
              </h2>
              <p className="text-slate-400 text-sm sm:text-base">
                Our selection process focuses equally on potential, tactical intelligence, and attitude. Submit basic player credentials, and our head recruiter will email registration forms and physical trials details within 48 hours.
              </p>
              
              <div className="space-y-4 pt-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-950 flex items-center justify-center border border-slate-800">
                    📍
                  </div>
                  <span className="text-sm text-slate-300">CastleBrother Arena & Training Grounds, UK</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-950 flex items-center justify-center border border-slate-800">
                    ✉️
                  </div>
                  <span className="text-sm text-slate-300">admissions@castlebrotheracademy.com</span>
                </div>
              </div>
            </div>

            {/* Application Form */}
            <div className="bg-slate-950 p-6 sm:p-8 rounded-2xl border border-slate-800">
              {formSubmitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto text-3xl">
                    ✓
                  </div>
                  <h3 className="text-xl font-bold text-white">Application Received</h3>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto">
                    We will analyze candidate details. Check your email inbox shortly for detailed program trial coordinates.
                  </p>
                  <button 
                    onClick={() => { setFormSubmitted(false); setFormData({ name: '', email: '', age: '', position: '' }); }}
                    className="mt-4 px-4 py-2 bg-slate-900 text-slate-300 rounded-lg text-xs"
                  >
                    Apply for Another Player
                  </button>
                </div>
              ) : (
                <form 
                  onSubmit={(e) => { e.preventDefault(); setFormSubmitted(true); }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                      Player Name
                    </label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Leo Brother"
                      className="w-full bg-slate-900 border border-slate-800 focus:border-emerald-500 rounded-lg px-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none transition-all duration-200"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                        Player Age
                      </label>
                      <input 
                        type="number" 
                        required
                        min="8"
                        max="21"
                        value={formData.age}
                        onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                        placeholder="e.g. 15"
                        className="w-full bg-slate-900 border border-slate-800 focus:border-emerald-500 rounded-lg px-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                        Favoured Position
                      </label>
                      <select 
                        required
                        value={formData.position}
                        onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-800 focus:border-emerald-500 rounded-lg px-4 py-2.5 text-sm text-slate-100 focus:outline-none transition-all duration-200"
                      >
                        <option value="">Select...</option>
                        <option value="GK">Goalkeeper</option>
                        <option value="DEF">Defender</option>
                        <option value="MID">Midfielder</option>
                        <option value="FWD">Forward</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                      Parent / Guardian Email
                    </label>
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="guardian@example.com"
                      className="w-full bg-slate-900 border border-slate-800 focus:border-emerald-500 rounded-lg px-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none transition-all duration-200"
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full mt-4 py-3 bg-emerald-600 hover:bg-emerald-500 active:scale-[0.99] text-white font-bold text-sm rounded-lg transition-all shadow-md shadow-emerald-950/40"
                  >
                    Submit Trial Invitation
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 py-12 text-slate-500 text-xs text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex items-center justify-center gap-3">
            <span className="text-sm font-bold uppercase tracking-widest text-slate-300">
              Castle<span className="text-amber-500">Brother</span>
            </span>
          </div>
          <p className="max-w-md mx-auto text-slate-500">
            Official Development Partner & Youth Football Academy. Accredited training facility. All Rights Reserved © {new Date().getFullYear()}.
          </p>
          <div className="flex justify-center gap-6 text-slate-400">
            <a href="#" className="hover:text-amber-500 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-amber-500 transition-colors">Terms of Use</a>
            <a href="#" className="hover:text-amber-500 transition-colors">Safeguarding</a>
          </div>
        </div>
      </footer>

    </div>
  );
};


