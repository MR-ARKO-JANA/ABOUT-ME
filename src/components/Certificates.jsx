import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CERTIFICATES = [
  {
    id: 1,
    name: "J.P. Morgan Software Engineering Virtual Experience",
    issuer: "Forage / J.P. Morgan",
    tags: ["Software Engineering", "Agile", "Python"]
  },
  {
    id: 2,
    name: "Cybersecurity Specialization",
    issuer: "Coursera",
    tags: ["Security", "Network", "Cryptography"]
  },
  {
    id: 3,
    name: "10 Day Projects Bootcamp",
    issuer: "Udemy",
    tags: ["Full-Stack", "JavaScript", "Projects"]
  },
  {
    id: 4,
    name: "ECPPOCT314 Certification",
    issuer: "Technical Certification",
    tags: ["Certification", "Technology"]
  }
];

export default function Certificates() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const marqueeRef = useRef(null);
  const trackRef = useRef(null);

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

      // Infinite Marquee Animation
      const track = trackRef.current;
      const totalWidth = track.scrollWidth / 2; // Since we duplicated items
      
      gsap.to(track, {
        x: -totalWidth,
        ease: "none",
        duration: 30, // Slow scroll
        repeat: -1,
        modifiers: {
          x: gsap.utils.unitize(x => parseFloat(x) % totalWidth) // Seamless loop
        }
      });
      
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseEnter = () => {
    gsap.getTweensOf(trackRef.current).forEach(t => t.timeScale(0.2));
  };
  
  const handleMouseLeave = () => {
    gsap.getTweensOf(trackRef.current).forEach(t => t.timeScale(1));
  };

  // Duplicate for seamless infinite scrolling
  const marqueeItems = [...CERTIFICATES, ...CERTIFICATES];

  return (
    <section 
      id="certificates" 
      ref={sectionRef}
      className="w-full py-32 bg-black relative overflow-hidden"
    >
      <div className="max-w-[90rem] mx-auto w-full relative z-10 px-6 md:px-12 lg:px-24 mb-16">
        {/* Header Block */}
        <div ref={headerRef} className="text-center md:text-left">
          <p className="text-blue-400 font-mono text-sm tracking-[0.3em] uppercase font-bold mb-4">
            [ Continuous Learning ]
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-[4rem] font-bold tracking-tighter text-white leading-none drop-shadow-lg mb-6" style={{ fontFamily: "'Outfit', sans-serif" }}>
            Licenses & <br className="hidden md:block"/>
            <span className="font-serif italic font-light opacity-80 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Certifications</span>
          </h2>
        </div>
      </div>

      {/* Marquee Track */}
      <div 
        ref={marqueeRef}
        className="w-full overflow-hidden flex cursor-grab active:cursor-grabbing"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div ref={trackRef} className="flex gap-8 px-4 flex-nowrap" style={{ width: 'max-content' }}>
          {marqueeItems.map((cert, index) => (
            <div 
              key={`${cert.id}-${index}`} 
              className="group magnetic cert-item flex-shrink-0 w-[350px] md:w-[450px] relative rounded-3xl overflow-hidden p-[2px]"
            >
              {/* Animated Electric Border Layer (Visible always, amber color) */}
              <div 
                className="absolute inset-[-100%] z-0 animate-electric-border opacity-30 group-hover:opacity-100 transition-opacity duration-500 group-hover:[animation-duration:2s]"
                style={{
                  background: 'conic-gradient(from 0deg, transparent 60%, #f59e0b 100%)' // Amber
                }}
              />
              
              {/* Secondary Electric Border for intense glow on hover */}
              <div 
                className="absolute inset-[-100%] z-0 animate-electric-border blur-md opacity-0 group-hover:opacity-90 transition-opacity duration-500 group-hover:[animation-duration:2s]"
                style={{
                  background: 'conic-gradient(from 0deg, transparent 60%, #f59e0b 100%)'
                }}
              />

              <div className="flex flex-col justify-between p-8 rounded-[22px] bg-[#050505] border border-white/5 group-hover:border-transparent transition-all duration-500 relative z-10 h-full w-full">
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    {cert.name}
                  </h3>
                  <p className="text-gray-400 font-medium text-sm mb-8">
                    {cert.issuer}
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {cert.tags.map(tag => (
                    <span key={tag} className="text-[10px] uppercase tracking-widest px-3 py-1 bg-black border border-white/10 rounded-full text-gray-300 group-hover:border-blue-400/20 transition-colors duration-300">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
