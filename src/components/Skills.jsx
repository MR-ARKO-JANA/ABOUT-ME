import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TechGlobe from './TechGlobe';
import SplitText from './SplitText';

gsap.registerPlugin(ScrollTrigger);

export default function Skills() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const globeRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      gsap.fromTo(textRef.current.children,
        { opacity: 0, y: 30 },
        { 
          opacity: 1, y: 0, 
          duration: 1, stagger: 0.2, ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse"
          }
        }
      );
      
      // Globe Fade In
      gsap.fromTo(globeRef.current,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1, scale: 1,
          duration: 1.5, ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="skills" 
      ref={sectionRef}
      className="w-full py-32 px-6 md:px-12 lg:px-24 bg-[#050505] relative overflow-hidden"
    >
      <div className="max-w-[90rem] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10">
        
        {/* Left Side: Story / Text */}
        <div ref={textRef} className="flex flex-col justify-center text-center lg:text-left">
          <p className="text-cyan-400 font-mono text-sm tracking-[0.3em] uppercase font-bold mb-4">
            [ Core Competencies ]
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-[4.5rem] font-bold tracking-tighter text-white leading-none drop-shadow-lg mb-6" style={{ fontFamily: "'Outfit', sans-serif" }}>
            <SplitText>Technical</SplitText> <br className="hidden md:block" />
            <span className="font-serif italic font-light opacity-80 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 pr-2">Arsenal</span>
          </h2>
          <p className="text-gray-400 font-light tracking-wide text-lg max-w-2xl mt-6 leading-relaxed mx-auto lg:mx-0">
            I specialize in full-stack web development and applied artificial intelligence. By combining robust backend architectures with modern frontend frameworks and machine learning algorithms, I build systems that are both highly scalable and deeply intelligent.
          </p>
          
          <p className="text-gray-500 font-mono text-xs mt-8">
            // Interact with the globe to explore my tech stack.
          </p>
        </div>

        {/* Right Side: 3D Globe */}
        <div ref={globeRef} className="relative w-full min-h-[400px] flex items-center justify-center">
          <TechGlobe />
        </div>
      </div>
    </section>
  );
}
