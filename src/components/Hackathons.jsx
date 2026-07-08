import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ACHIEVEMENTS = [
  {
    id: 1,
    name: "Hack de Science, NIT Jamshedpur",
    year: "2026",
    description: "Secured 3rd place in this 36-hour national-level hackathon. Built 'NearHelp', a real-time emergency response platform.",
    role: "3rd Place Winner",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10 text-purple-400 mb-4 group-hover:scale-110 transition-transform duration-300 group-hover:text-cyan-400">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
        <circle cx="12" cy="12" r="1" fill="currentColor" />
      </svg>
    )
  },
  {
    id: 2,
    name: "Project Morpheus Hackathon",
    year: "2026",
    description: "Secured Runners-up position. Applied machine learning models and data science techniques to solve predictive problems.",
    role: "Runners-up",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10 text-purple-400 mb-4 group-hover:scale-110 transition-transform duration-300 group-hover:text-cyan-400">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  },
  {
    id: 3,
    name: "Google Global Student Ambassador",
    year: "2026",
    description: "Selected to represent and lead campus tech communities, fostering AI/ML and developer relations.",
    role: "Ambassador",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10 text-purple-400 mb-4 group-hover:scale-110 transition-transform duration-300 group-hover:text-cyan-400">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    )
  },
  {
    id: 4,
    name: "Microsoft Campus Ambassador",
    year: "2026",
    description: "Represented Microsoft on campus, organizing tech events and evangelizing developer tools.",
    role: "Ambassador",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10 text-purple-400 mb-4 group-hover:scale-110 transition-transform duration-300 group-hover:text-cyan-400">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
      </svg>
    )
  },
  {
    id: 5,
    name: "GirlScript Summer of Code (GSSoC)",
    year: "2026",
    description: "Selected as an Open Source Contributor, contributing to impactful open-source software and projects.",
    role: "Open Source Contributor",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10 text-purple-400 mb-4 group-hover:scale-110 transition-transform duration-300 group-hover:text-cyan-400">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    )
  }
];

export default function Hackathons() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      gsap.fromTo(headerRef.current.children,
        { opacity: 0, y: 30 },
        { 
          opacity: 1, y: 0, 
          duration: 1, stagger: 0.2, ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Cards Animation
      cardsRef.current.forEach((card, index) => {
        gsap.fromTo(card,
          { opacity: 0, y: 50, rotateX: -10 },
          {
            opacity: 1, y: 0, rotateX: 0,
            duration: 1, delay: (index % 3) * 0.15, ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e, card) => {
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    gsap.to(card, {
      rotateY: x * 20,
      rotateX: -y * 20,
      transformPerspective: 1000,
      ease: 'power2.out',
      duration: 0.4
    });
  };

  const handleMouseLeave = (card) => {
    if (!card) return;
    gsap.to(card, {
      rotateY: 0,
      rotateX: 0,
      ease: 'power3.out',
      duration: 0.6
    });
  };

  return (
    <section 
      id="hackathons" 
      ref={sectionRef}
      className="w-full py-32 px-6 md:px-12 lg:px-24 bg-[#030303] relative overflow-hidden"
    >
      <div className="max-w-[90rem] mx-auto w-full relative z-10">
        
        {/* Header Block */}
        <div ref={headerRef} className="mb-20 text-center">
          <p className="text-purple-400 font-mono text-sm tracking-[0.3em] uppercase font-bold mb-4">
            [ Milestones ]
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-[4.5rem] font-bold tracking-tighter text-white leading-none drop-shadow-lg mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>
            Hackathons & <span className="font-serif italic font-light opacity-80 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 pr-2">Achievements</span>
          </h2>
        </div>

        {/* Achievement Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ACHIEVEMENTS.map((achievement, index) => (
            <div 
              key={achievement.id} 
              ref={el => cardsRef.current[index] = el}
              className="relative p-10 rounded-2xl bg-black border border-white/5 cursor-crosshair group overflow-hidden"
              style={{ transformStyle: 'preserve-3d' }}
              onMouseMove={(e) => handleMouseMove(e, cardsRef.current[index])}
              onMouseLeave={() => handleMouseLeave(cardsRef.current[index])}
            >
              {/* Background gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Border glow */}
              <div className="absolute inset-0 border border-purple-400/0 group-hover:border-purple-400/30 rounded-2xl transition-colors duration-500 pointer-events-none" />

              <div className="relative z-10 pointer-events-none" style={{ transform: 'translateZ(30px)' }}>
                {achievement.icon}
                
                <span className="text-gray-500 font-mono text-xs tracking-widest block mb-2 group-hover:text-purple-400 transition-colors duration-300">
                  {achievement.year}
                </span>
                
                <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  {achievement.name}
                </h3>
                
                <p className="text-cyan-400 font-medium text-sm mb-4 uppercase tracking-wider">
                  {achievement.role}
                </p>
                
                <p className="text-gray-400 text-sm leading-relaxed font-light">
                  {achievement.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
