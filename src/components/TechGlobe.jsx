import React, { useEffect, useRef, useState, useMemo } from 'react';

const SKILLS = [
  { text: "C", icon: "c" },
  { text: "C++", icon: "cplusplus" },
  { text: "Python", icon: "python" },
  { text: "JavaScript", icon: "javascript" },
  { text: "HTML5", icon: "html5" },
  { text: "CSS3", icon: "css3" },
  { text: "React.js", icon: "react" },
  { text: "Tailwind", icon: "tailwindcss" },
  { text: "Three.js", icon: "threedotjs" },
  { text: "GSAP", icon: "greensock" },
  { text: "Node.js", icon: "nodedotjs" },
  { text: "Express.js", icon: "express" },
  { text: "FastAPI", icon: "fastapi" },
  { text: "MongoDB", icon: "mongodb" },
  { text: "PostgreSQL", icon: "postgresql" },
  { text: "Git", icon: "git" },
  { text: "AWS", icon: "amazonaws" },
  { text: "WebRTC", icon: "webrtc" },
  { text: "Socket.io", icon: "socketdotio" },
  { text: "Scikit-Learn", icon: "scikitlearn" },
  { text: "TensorFlow", icon: "tensorflow" },
  { text: "Fastify", icon: "fastify" },
  { text: "OpenAI", icon: "openai" }
];

export default function TechGlobe() {
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Generate sphere points
  const points = useMemo(() => {
    const N = SKILLS.length;
    const pts = [];
    const goldenRatio = (1 + Math.sqrt(5)) / 2;
    const angleIncrement = Math.PI * 2 * goldenRatio;

    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = angleIncrement * i;

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      pts.push({ x, y, z, item: SKILLS[i] });
    }
    return pts;
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateDim = () => {
      setDimensions({
        width: container.offsetWidth,
        height: container.offsetHeight
      });
    };
    
    updateDim();
    window.addEventListener('resize', updateDim);

    let animationFrame;
    let rotationX = 0;
    let rotationY = 0;
    
    let mouseX = 0.5;
    let mouseY = 0.5;
    
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      
      mouseX = (x - 0.5) * 2;
      mouseY = (y - 0.5) * 2;
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', () => {
      mouseX = 0.5;
      mouseY = -0.2;
    });

    const items = container.querySelectorAll('.globe-item');
    const radius = Math.min(container.offsetWidth, container.offsetHeight) / 2.5;

    const animate = () => {
      rotationY += 0.005 + (mouseX * 0.02);
      rotationX += 0.002 + (mouseY * 0.02);

      const sinX = Math.sin(rotationX);
      const cosX = Math.cos(rotationX);
      const sinY = Math.sin(rotationY);
      const cosY = Math.cos(rotationY);

      points.forEach((p, i) => {
        let rx = p.x * cosY - p.z * sinY;
        let rz = p.x * sinY + p.z * cosY;

        let ry = p.y * cosX - rz * sinX;
        let finalZ = p.y * sinX + rz * cosX;

        const perspective = 300 / (300 + finalZ * radius);
        const screenX = rx * radius * perspective;
        const screenY = ry * radius * perspective;

        const el = items[i];
        if (el) {
          el.style.transform = `translate3d(${screenX}px, ${screenY}px, 0) scale(${perspective})`;
          
          const alpha = (finalZ + 1) / 2; // 0 to 1
          el.style.opacity = Math.max(0.1, alpha);
          el.style.zIndex = Math.round(alpha * 100);
          
          if (alpha > 0.8) {
            el.style.color = '#22d3ee';
            el.style.textShadow = '0 0 10px rgba(34, 211, 238, 0.8)';
          } else {
            el.style.color = '#9ca3af';
            el.style.textShadow = 'none';
          }
        }
      });

      animationFrame = requestAnimationFrame(animate);
    };

    mouseX = 0.5;
    mouseY = -0.2;
    animate();

    return () => {
      window.removeEventListener('resize', updateDim);
      container.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrame);
    };
  }, [points]);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full aspect-square max-w-[500px] mx-auto flex items-center justify-center overflow-visible select-none cursor-crosshair"
    >
      {/* Earth-like spherical background with Tech Map Grid */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-[85%] rounded-full border border-cyan-500/30 overflow-hidden shadow-[inset_0_0_50px_rgba(6,182,212,0.3),0_0_30px_rgba(6,182,212,0.1)] pointer-events-none backdrop-blur-[2px]">
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-950/80 via-blue-900/20 to-black/40 z-10" />
        <div 
          className="absolute inset-0 opacity-10 z-0 bg-no-repeat bg-center bg-cover scale-110" 
          style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='50' cy='50' r='49' fill='none' stroke='%2322d3ee' stroke-width='0.5'/%3E%3Cellipse cx='50' cy='50' rx='25' ry='49' fill='none' stroke='%2322d3ee' stroke-width='0.5'/%3E%3Cellipse cx='50' cy='50' rx='10' ry='49' fill='none' stroke='%2322d3ee' stroke-width='0.5'/%3E%3Cline x1='1' y1='50' x2='99' y2='50' stroke='%2322d3ee' stroke-width='0.5'/%3E%3Cellipse cx='50' cy='50' rx='49' ry='25' fill='none' stroke='%2322d3ee' stroke-width='0.5'/%3E%3C/svg%3E")` 
          }} 
        />
      </div>
      
      {points.map((pt, i) => {
        const slug = pt.item.icon;
        return (
          <div
            key={i}
            className="globe-item absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 font-mono text-sm md:text-base font-bold whitespace-nowrap transition-colors duration-300 hover:text-white hover:!text-shadow-[0_0_20px_#fff] cursor-pointer"
          >
            <img src={`https://cdn.simpleicons.org/${slug}/22d3ee`} alt={pt.item.text} className="w-5 h-5 brightness-200" />
            <span>{pt.item.text}</span>
          </div>
        );
      })}
    </div>
  );
}
