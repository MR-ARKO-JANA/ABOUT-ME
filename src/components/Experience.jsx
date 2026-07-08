import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Particles from './Particles';
import SplitText from './SplitText';

gsap.registerPlugin(ScrollTrigger);

const EXPERIENCES = [
  {
    id: 1,
    role: "Full Stack Development Intern",
    company: "Cognifyz Technologies",
    period: "Nov 2025 - Present",
    description: "Developed end-to-end web features by integrating React interfaces with Node.js logic. Designed clean RESTful APIs and optimized database routing, decreasing server-side data latency by 20%. Utilized robust full-stack methodologies to address complex bugs.",
    skills: ["JavaScript", "Python", "FastAPI", "PostgreSQL", "WebRTC", "AWS", "React"],
    link: "#" // Replace with actual link
  },
  {
    id: 2,
    role: "Web Development Intern",
    company: "Zaalima Development Pvt. Ltd",
    period: "Mar 2026 - May 2026",
    description: "Integrated frontend interfaces with backend logic, enhancing user engagement by 15%. Developed structured RESTful APIs and optimized database storage. Employed effective full-stack methodologies to address complex bugs, improving deployment efficiency.",
    skills: ["Node.js", "Express.js", "MongoDB", "HTML", "CSS", "Socket.io"],
    link: "#" // Replace with actual link
  },
  {
    id: 3,
    role: "Frontend Developer",
    company: "Bharat Gaming News",
    period: "Nov 2025 - Jan 2026",
    description: "Developed responsive user interfaces for a gaming news platform using modern web technologies. Implemented dynamic components to showcase articles. Optimized website performance reducing page load time by 25%. Collaborated on API integration.",
    skills: ["HTML", "CSS", "JavaScript", "Git", "Express", "Node.js"],
    link: "#" // Replace with actual link
  }
];

export default function Experience() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const timelineRef = useRef(null);

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

      // Timeline Items Animation
      const items = timelineRef.current.querySelectorAll('.timeline-item');
      items.forEach((item, index) => {
        gsap.fromTo(item,
          { opacity: 0, x: -50 },
          {
            opacity: 1, x: 0,
            duration: 0.8, delay: index * 0.2, ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });
      
      // Vertical line animation
      gsap.fromTo('.timeline-line',
        { scaleY: 0 },
        {
          scaleY: 1, duration: 1.5, ease: "power3.inOut",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse"
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="experience" 
      ref={sectionRef}
      className="w-full py-32 px-6 md:px-12 lg:px-24 bg-black relative overflow-hidden"
    >
      <Particles count={40} color="rgba(6, 182, 212, 0.3)" />
      {/* Background glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-900/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none -translate-y-1/2 -translate-x-1/2" />
      
      <div className="max-w-[90rem] mx-auto w-full relative z-10">
        
        {/* Header Block */}
        <div ref={headerRef} className="mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-[4.5rem] font-bold tracking-tighter text-white leading-none drop-shadow-lg mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>
            <SplitText>Professional</SplitText> <span className="font-serif italic font-light opacity-80 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 pr-2">Experience</span>
          </h2>
          <p className="text-gray-400 font-light tracking-wide text-lg max-w-2xl mt-6 leading-relaxed">
            My journey through the industry, building scalable solutions and learning from real-world challenges.
          </p>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative pl-8 md:pl-0 max-w-4xl mx-auto">
          {/* Vertical Line */}
          <div className="timeline-line absolute left-[3px] md:left-1/2 top-0 bottom-0 w-[3px] bg-gradient-to-b from-cyan-400 via-cyan-500/80 to-transparent shadow-[0_0_15px_rgba(6,182,212,0.6)] origin-top md:-translate-x-1/2 rounded-full" />

          {EXPERIENCES.map((exp, index) => (
            <div key={exp.id} className="timeline-item relative mb-16 md:w-1/2 md:odd:pr-12 md:even:pl-12 md:even:ml-auto group">
              
              {/* Timeline Dot */}
              <div className="absolute left-[-2rem] md:left-auto md:odd:-right-[5px] md:even:-left-[4px] top-2 w-[9px] h-[9px] bg-black border-2 border-cyan-400 rounded-full group-hover:scale-150 group-hover:bg-cyan-400 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.8)] transition-all duration-300 z-10" />

              {/* Content Card */}
              <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-cyan-400/30 transition-colors duration-500 backdrop-blur-sm relative overflow-hidden">
                {/* Hover gradient sweep */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <span className="text-cyan-400 font-mono text-xs tracking-[0.2em] uppercase font-bold mb-2 block">
                    {exp.period}
                  </span>
                  <h3 className="text-2xl font-bold text-white mb-1" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    {exp.role}
                  </h3>
                  <h4 className="text-lg text-gray-300 font-medium mb-4 italic">
                    {exp.company}
                  </h4>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6 font-light">
                    {exp.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {exp.skills.map((skill) => (
                      <span key={skill} className="text-[10px] uppercase tracking-widest px-3 py-1 bg-white/5 border border-white/10 rounded-full text-gray-300">
                        {skill}
                      </span>
                    ))}
                  </div>
                  
                  {exp.link && (
                    <a href={exp.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.2em] font-medium text-cyan-400 hover:text-white transition-colors duration-300 no-underline group/btn">
                      <span>View Credential</span>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform duration-300">
                        <line x1="5" y1="19" x2="19" y2="5"></line>
                        <polyline points="10 5 19 5 19 14"></polyline>
                      </svg>
                    </a>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
