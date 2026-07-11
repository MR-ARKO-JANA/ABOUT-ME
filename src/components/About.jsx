import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Reuse our hero assets for the dual-identity mask effect
import imgSpiderman from '../assets/spiderman/20260407_055437.png';
import imgMan from '../assets/man/arkojana.jpeg';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);
  const textContainerRef = useRef(null);
  const imageContainerRef = useRef(null);
  const maskRef = useRef(null);
  
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  // 1. ScrollTrigger entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create a timeline bound to the scroll position
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%", // triggers when the top of the section hits 75% of the viewport height
          toggleActions: "play none none reverse" // play forwards on scroll down, reverse on scroll out
        }
      });

      // Select all text lines that have the 'stagger-reveal' class
      const textElements = textContainerRef.current.querySelectorAll('.stagger-reveal');
      
      // Select the image container
      const imgElement = imageContainerRef.current;

      tl.fromTo(imgElement, 
        { opacity: 0, x: -50 }, 
        { opacity: 1, x: 0, duration: 1.2, ease: "power3.out" }
      )
      .fromTo(textElements, 
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: "power3.out" },
        "-=0.8" // start before image is fully in
      );
      
    }, sectionRef);

    return () => ctx.revert(); // clean up ScrollTrigger
  }, []);

  // 2. Interactive Spotlight Mask
  const handleMouseMove = (e) => {
    if (!imageContainerRef.current) return;
    
    // Get mouse position relative to the image container
    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    // Use GSAP to smoothly lerp the mask center
    gsap.to(maskRef.current, {
      '--x': `${x}%`,
      '--y': `${y}%`,
      duration: 0.4,
      ease: 'power2.out'
    });
  };

  const handleMouseLeave = () => {
    // Return to default center position smoothly
    gsap.to(maskRef.current, {
      '--x': '50%',
      '--y': '50%',
      duration: 0.8,
      ease: 'power3.out'
    });
  };

  return (
    <section 
    id='about'
      ref={sectionRef} 
      className="relative w-full min-h-screen bg-black flex items-center justify-center py-24 px-6 md:px-12 lg:px-24 overflow-hidden"
    >
      {/* Background Ambience Layer */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-900/10 blur-[120px] rounded-full " />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMiIvPjwvc3ZnPg==')] opacity-30 mix-blend-overlay" />
      </div>

      <div className="max-w-[90rem] w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10">
        
        {/* Left Column: Interactive Portrait */}
        <div 
          ref={imageContainerRef}
          className="relative w-full aspect-[4/5] max-w-md mx-auto lg:max-w-none rounded-2xl overflow-hidden cursor-crosshair group shadow-2xl border border-white/5"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ transform: 'translateZ(0)' }} // Hardware acceleration
        >
          {/* Base Layer: Developer Portrait (Moody/Dark) */}
          <img 
            src={imgMan} 
            alt="Arko Jana - Developer" 
            className="absolute inset-0 w-full h-full object-cover object-center opacity-80 transition-all duration-700 group-hover:scale-105"
          />

          {/* Masked Overlay: Superhero Persona (Vibrant) */}
          <div 
            ref={maskRef}
            className="absolute inset-0 w-full h-full"
            style={{
              '--x': '50%',
              '--y': '50%',
              clipPath: 'circle(15% at var(--x) var(--y))',
              transition: 'clip-path 0.1s ease-out'
            }}
          >
            <img 
              src={imgSpiderman} 
              alt="Creative Persona" 
              className="absolute inset-0 w-full h-full object-cover object-center scale-105 group-hover:scale-110 transition-transform duration-[2s] ease-out"
            />
            
            {/* Inner spotlight glow matched inside the mask */}
            <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/20 to-black/80" />
          </div>

          {/* Interaction Hint Overlay */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
             <div className="w-24 h-24 rounded-full border border-cyan-400/20 scale-150 animate-ping absolute" />
          </div>
        </div>

        {/* Right Column: Story & Details */}
        <div ref={textContainerRef} className="flex flex-col justify-center space-y-10">
          
          <div className="overflow-hidden">
            <h2 className="stagger-reveal text-5xl md:text-6xl font-bold tracking-tighter text-white leading-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Who I <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 font-serif italic pr-4">Am</span>
            </h2>
          </div>

          <div className="overflow-hidden">
            <p className="stagger-reveal text-lg md:text-xl text-gray-400 font-light leading-relaxed max-w-xl">
              I'm Arko Jana — a Full-Stack Developer & AI Engineer passionate about building intelligent, production-ready systems. From crafting real-time emergency platforms at NIT Jamshedpur hackathons to deploying AI-powered legal tech on Google Cloud, I thrive at the intersection of code and intelligence. My work spans Python, Node.js, React, TensorFlow, Docker, and cloud-native architectures.
            </p>
          </div>

          {/* Expertise Highlights */}
          <div className="overflow-hidden">
            <div className="stagger-reveal grid grid-cols-2 gap-x-8 gap-y-4 pt-4 border-t border-white/10 max-w-xl">
              {[
                "AI & Machine Learning", 
                "Full-Stack Development", 
                "Cloud & DevOps", 
                "System Architecture"
              ].map((skill, i) => (
                <div key={i} className="flex items-center space-x-3 group">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-cyan-400 transition-colors duration-300" />
                  <span className="text-gray-300 text-sm md:text-base font-medium tracking-wide uppercase group-hover:text-white transition-colors duration-300">
                    {skill}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack Badges */}
          <div className="overflow-hidden">
            <div className="stagger-reveal flex flex-wrap gap-2 max-w-xl">
              {['Python', 'Node.js', 'React', 'MongoDB', 'TensorFlow', 'Docker', 'GCP', 'Socket.IO'].map((tech, i) => (
                <span key={i} className="text-[10px] uppercase tracking-widest px-3 py-1.5 border border-cyan-400/20 rounded-full text-cyan-300/80 font-medium hover:border-cyan-400/50 hover:text-cyan-300 transition-all duration-300">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Quote Block */}
          <div className="overflow-hidden mt-6">
            <blockquote className="stagger-reveal border-l-2 border-cyan-400/50 pl-6 py-2">
              <p className="text-xl md:text-2xl text-gray-200 font-serif italic">
                "Code builds the foundation. <br /> Intelligence breaks the boundaries."
              </p>
            </blockquote>
          </div>
          
        </div>

      </div>
    </section>
  );
}
