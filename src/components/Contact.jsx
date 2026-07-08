import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SOCIAL_LINKS = [
  {
    name: 'GitHub',
    url: 'https://github.com/MR-ARKO-JANA',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
    ),
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/arkojana',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
    ),
  },
  {
    name: 'X (Twitter)',
    url: 'https://x.com/JanaArko45187',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
    ),
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/mr_arko_j99/',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
    ),
  },
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/arko.jana.982',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
    ),
  },
];

export default function Contact() {
  const sectionRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse"
        }
      });
      
      // Select all animatable elements
      const elements = sectionRef.current.querySelectorAll('.animate-element');
      
      // Stagger them fading directly upward
      tl.fromTo(elements,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: "power3.out" }
      );
      
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Construct mailto link as a simple fallback
    const name = e.target.elements.name.value;
    const email = e.target.elements.email.value;
    const message = e.target.elements.message.value;
    
    const mailtoLink = `mailto:arkojana45@gmail.com?subject=Portfolio Contact from ${name}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${message}`)}`;
    window.open(mailtoLink, '_blank');
  };

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#030303] flex items-center justify-center py-24 px-6 md:px-12 overflow-hidden"
    >
      {/* Intense Background Glow */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-0">
        <div className="w-[800px] h-[500px] bg-cyan-600/10 rounded-full blur-[150px] mix-blend-screen opacity-50" />
      </div>

      <div className="max-w-2xl w-full relative z-10 flex flex-col items-center text-center">
        
        {/* Header Block */}
        <div className="mb-12 animate-element">
          <p className="text-cyan-400 font-mono text-sm tracking-[0.3em] uppercase font-bold mb-4">
            [ Get In Touch ]
          </p>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-white leading-none mb-6 drop-shadow-xl" style={{ fontFamily: "'Outfit', sans-serif" }}>
            Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 font-serif italic pr-2">Connect</span>
          </h2>
          <p className="text-gray-400 font-light text-lg tracking-wide leading-relaxed max-w-xl mx-auto">
            Have a project idea, need a developer for your team, or want to collaborate on something exciting? I'd love to hear from you. Let's build something impactful together.
          </p>
        </div>

        {/* Social Links */}
        <div className="animate-element flex flex-wrap justify-center gap-4 mb-12">
          {SOCIAL_LINKS.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/10 text-gray-400 hover:text-cyan-400 hover:border-cyan-400/40 transition-all duration-300 text-sm font-medium tracking-wide no-underline group"
            >
              <span className="group-hover:scale-110 transition-transform duration-300">{social.icon}</span>
              <span className="hidden sm:inline">{social.name}</span>
            </a>
          ))}
        </div>
        
        {/* Email Direct Link */}
        <div className="animate-element mb-10">
          <a 
            href="mailto:arkojana45@gmail.com" 
            className="text-gray-500 hover:text-cyan-400 transition-colors duration-300 text-sm tracking-widest uppercase no-underline"
          >
            arkojana45@gmail.com
          </a>
        </div>

        {/* Form Block */}
        <form ref={formRef} onSubmit={handleSubmit} className="w-full flex flex-col space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name Input */}
            <div className="relative group animate-element">
              <input 
                type="text" 
                id="name"
                name="name"
                required
                className="peer w-full bg-white/5 border border-white/5 text-white text-base rounded-xl px-5 py-4 outline-none transition-all duration-300 focus:bg-white/10 focus:border-cyan-400/50 focus:shadow-[0_0_20px_rgba(6,182,212,0.2)] placeholder-transparent"
                placeholder="Name"
              />
              <label htmlFor="name" className="absolute left-5 top-4 text-gray-500 text-base pointer-events-none transition-all duration-300 peer-focus:-top-3 peer-focus:text-xs peer-focus:text-cyan-400 peer-valid:-top-3 peer-valid:text-xs peer-valid:text-gray-400 bg-[#030303] px-1 rounded">
                Name
              </label>
            </div>
            
            {/* Email Input */}
            <div className="relative group animate-element">
              <input 
                type="email" 
                id="email"
                name="email"
                required
                className="peer w-full bg-white/5 border border-white/5 text-white text-base rounded-xl px-5 py-4 outline-none transition-all duration-300 focus:bg-white/10 focus:border-cyan-400/50 focus:shadow-[0_0_20px_rgba(6,182,212,0.2)] placeholder-transparent"
                placeholder="Email"
              />
              <label htmlFor="email" className="absolute left-5 top-4 text-gray-500 text-base pointer-events-none transition-all duration-300 peer-focus:-top-3 peer-focus:text-xs peer-focus:text-cyan-400 peer-valid:-top-3 peer-valid:text-xs peer-valid:text-gray-400 bg-[#030303] px-1 rounded">
                Email
              </label>
            </div>
          </div>

          {/* Message Textarea */}
          <div className="relative group animate-element">
            <textarea 
              id="message"
              name="message"
              required
              rows="5"
              className="peer w-full bg-white/5 border border-white/5 text-white text-base rounded-xl px-5 py-4 outline-none transition-all duration-300 focus:bg-white/10 focus:border-cyan-400/50 focus:shadow-[0_0_20px_rgba(6,182,212,0.2)] placeholder-transparent resize-none"
              placeholder="Message"
            ></textarea>
            <label htmlFor="message" className="absolute left-5 top-4 text-gray-500 text-base pointer-events-none transition-all duration-300 peer-focus:-top-3 peer-focus:text-xs peer-focus:text-cyan-400 peer-valid:-top-3 peer-valid:text-xs peer-valid:text-gray-400 bg-[#030303] px-1 rounded">
              Message
            </label>
          </div>

          {/* Submit Button */}
          <div className="animate-element pt-4 flex justify-center">
            <button 
              type="submit" 
              className="relative group overflow-hidden rounded-full w-full md:w-auto px-12 py-4 border border-cyan-400/30 bg-black text-white text-sm uppercase tracking-[0.2em] font-medium transition-all duration-500 hover:scale-[1.02] hover:border-cyan-400 shadow-[0_0_0_rgba(6,182,212,0)] hover:shadow-[0_0_30px_rgba(6,182,212,0.3)]"
            >
              {/* Animated Inner Sweep */}
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-600/0 via-cyan-600/20 to-cyan-600/0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
              
              <span className="relative z-10 flex items-center justify-center space-x-3">
                <span>Send Message</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300 text-cyan-400">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </span>
            </button>
          </div>
          
        </form>
        
        {/* Footer */}
        <div className="animate-element mt-16 pt-8 border-t border-white/5 w-full text-center">
          <p className="text-gray-600 text-sm tracking-wide">
            © {new Date().getFullYear()} Arko Jana. Built with React, Three.js & GSAP.
          </p>
        </div>
      </div>

      {/* Shimmer keyframe */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}} />
    </section>
  );
}
