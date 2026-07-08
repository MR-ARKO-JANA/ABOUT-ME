import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Import project screenshots
import imgNearhelp from '../assets/projects/nearhelp.png';
import imgNyaya from '../assets/projects/nyaya-sahayak.png';
import imgSplitwise from '../assets/projects/splitwise.png';
import imgResume from '../assets/projects/ai-resume.png';
import imgApads from '../assets/projects/apads.png';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    id: '01',
    name: 'NearHelp',
    description: 'Real-time emergency response platform connecting people in crisis with nearby responders using geolocation, AI-powered guidance, and WebSocket communication.',
    tech: ['Node.js', 'MongoDB', 'Socket.IO', 'Gemini AI', 'Leaflet.js'],
    image: imgNearhelp,
    link: 'https://github.com/MR-ARKO-JANA',
    blend: 'mix-blend-luminosity brightness-75',
  },
  {
    id: '02',
    name: 'Nyaya Sahayak',
    description: 'AI-powered Hindi chargesheet review assistant with NER, crime classification, and semantic similarity — deployed on Google Cloud Run.',
    tech: ['Python', 'Gemini AI', 'Streamlit', 'Docker', 'GCP'],
    image: imgNyaya,
    link: 'https://nyaya-sahayak-j7wnpg7szq-uc.a.run.app',
    blend: 'mix-blend-luminosity brightness-80',
  },
  {
    id: '03',
    name: 'Splitwise Clone',
    description: 'Full-stack expense sharing app with real-time sync, analytics, multiple split types, and enterprise-grade security (JWT, Helmet, rate limiting).',
    tech: ['Node.js', 'Express 5', 'MongoDB', 'Socket.IO', 'Chart.js'],
    image: imgSplitwise,
    link: 'https://github.com/MR-ARKO-JANA',
    blend: 'mix-blend-luminosity grayscale',
  },
  {
    id: '04',
    name: 'AI Resume Screener',
    description: 'Intelligent resume screening system with automated candidate evaluation, CI/CD pipeline, and Docker containerization.',
    tech: ['Node.js', 'Express', 'MongoDB', 'Docker', 'Railway'],
    image: imgResume,
    link: 'https://github.com/MR-ARKO-JANA',
    blend: 'mix-blend-luminosity brightness-75',
  },
  {
    id: '05',
    name: 'APADS',
    description: 'AI-Powered Accident Detection System using Computer Vision for real-time detection with automated emergency alerts via SMS and email.',
    tech: ['Python', 'TensorFlow', 'OpenCV', 'Flask', 'React', 'Docker'],
    image: imgApads,
    link: 'https://github.com/MR-ARKO-JANA',
    blend: 'mix-blend-overlay brightness-110 saturate-125',
  }
];

const ProjectCard = ({ project }) => {
  const cardRef = useRef(null);
  const glowRef = useRef(null);
  const imageRef = useRef(null);
  
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    
    // Calculate mouse position strictly bounded within the card [-1, 1]
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    // Apply 3D tilt mapped against mouse offset (multiplied by degrees of max tilt)
    gsap.to(cardRef.current, {
      rotateY: x * 15,
      rotateX: -y * 15,
      transformPerspective: 1000,
      ease: 'power2.out',
      duration: 0.4
    });
    
    // Move the glow to follow the cursor exactly
    gsap.to(glowRef.current, {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      opacity: 1,
      duration: 0.2
    });
    
    // Inverse parallax on the image inside
    gsap.to(imageRef.current, {
      x: -x * 20,
      y: -y * 20,
      scale: 1.1,
      ease: 'power2.out',
      duration: 0.4
    });
  };

  const handleMouseLeave = () => {
    // Snap back everything cleanly
    gsap.to(cardRef.current, {
      rotateY: 0,
      rotateX: 0,
      ease: 'power3.out',
      duration: 0.6
    });
    
    gsap.to(glowRef.current, {
      opacity: 0,
      duration: 0.4
    });
    
    gsap.to(imageRef.current, {
      x: 0,
      y: 0,
      scale: 1.0,
      ease: 'power3.out',
      duration: 0.6
    });
  };

  return (
    <div 
      className="project-card relative w-full h-[450px] rounded-xl overflow-hidden cursor-pointer group bg-black border border-white/10"
      style={{ transformStyle: 'preserve-3d' }}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-zinc-900">
        <img 
          ref={imageRef}
          src={project.image} 
          alt={project.name} 
          className={`absolute inset-0 w-full h-[120%] -top-[10%] object-cover object-center ${project.blend} transition-all duration-[1.5s]`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-black/60 z-10" />
      </div>

      {/* Dynamic Hover Glow Layer Tracker */}
      <div 
        ref={glowRef}
        className="absolute w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none z-10 -translate-x-1/2 -translate-y-1/2 opacity-0 mix-blend-screen"
      />
      
      {/* Laser Border overlay on Hover */}
      <div className="absolute inset-0 border border-cyan-400/0 group-hover:border-cyan-400/40 rounded-xl transition-colors duration-500 z-20 pointer-events-none" />

      {/* Foreground Content */}
      <div className="absolute inset-0 z-30 p-8 flex flex-col justify-end pointer-events-none" style={{ transform: 'translateZ(30px)' }}>
        
        {/* Project Number */}
        <div className="text-cyan-400/80 font-mono text-xs tracking-[0.3em] mb-2 font-bold uppercase transition-transform duration-500 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100">
          Project // {project.id}
        </div>
        
        <h3 className="text-3xl font-bold tracking-tight text-white mb-3 leading-none drop-shadow-xl" style={{ fontFamily: "'Outfit', sans-serif" }}>
          {project.name}
        </h3>
        
        <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-6 font-light max-w-[90%]">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-6 pointer-events-auto">
          {project.tech.map((tool) => (
            <span key={tool} className="text-[10px] uppercase tracking-widest px-3 py-1.5 border border-cyan-400/20 rounded-full text-cyan-300/80 font-medium">
              {tool}
            </span>
          ))}
        </div>
        
        <div className="mt-auto pointer-events-auto w-fit">
          <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-sm uppercase tracking-[0.2em] font-medium text-white group/link relative no-underline">
            <span className="relative overflow-hidden block">
              <span className="block group-hover/link:-translate-y-full transition-transform duration-300">View Project</span>
              <span className="block absolute inset-0 translate-y-full group-hover/link:translate-y-0 transition-transform duration-300 text-cyan-400">View Project</span>
            </span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform duration-300 text-cyan-400">
              <line x1="5" y1="19" x2="19" y2="5"></line>
              <polyline points="10 5 19 5 19 14"></polyline>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};


export default function Projects() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse"
        }
      });
      
      // Header Animation
      tl.fromTo(headerRef.current.children,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power3.out" }
      );
      
      // Select cards via class
      const cards = sectionRef.current.querySelectorAll('.project-card');
      
      tl.fromTo(cards,
        { opacity: 0, y: 100, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 1.2, stagger: 0.15, ease: "power3.out" },
        "-=0.6"
      );
      
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="projects" 
      ref={sectionRef}
      className="w-full min-h-screen bg-[#030303] py-32 px-6 md:px-12 lg:px-24 flex flex-col justify-center relative overflow-hidden"
    >
      <div className="max-w-[90rem] mx-auto w-full relative z-10">
        
        {/* Header Block */}
        <div ref={headerRef} className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-8">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl lg:text-[4.5rem] font-bold tracking-tighter text-white leading-none drop-shadow-lg mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Featured <span className="font-serif italic font-light opacity-80 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 pr-2">Projects</span>
            </h2>
          </div>
          <p className="text-gray-400 font-light tracking-wide text-base md:text-lg max-w-sm mt-6 md:mt-0 leading-relaxed md:text-right">
            Real-world applications built with AI, full-stack engineering, and cloud-native architecture.
          </p>
        </div>
        
        {/* Grid Container — 2 cols on md, 3 cols on lg */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-12 place-items-center">
          {PROJECTS.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
        
      </div>
      
      {/* Background Ambience line-grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-0" 
           style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '100px 100px' }} 
      />
    </section>
  );
}
