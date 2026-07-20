import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { vertexShader, fragmentShader } from './HeroShaders';

import imgMan from '../assets/man/arkojana.jpeg';

export default function Hero() {
  const containerRef = useRef(null);
  const cursorRef = useRef(null);
  const textRef = useRef(null);
  
  // Create refs to hold things that need cleanup or updates
  const uniformRef = useRef(null);
  const mouseTarget = useRef({ x: 0.5, y: 0.5 });
  const mouseCurrent = useRef({ x: 0.5, y: 0.5 });
  
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    
    // Initial Hero Entrance Animation (AOS style smooth fade-up)
    gsap.fromTo(container, 
      { opacity: 0, y: 80 }, 
      { opacity: 1, y: 0, duration: 2, ease: "power3.out", delay: 0.1 }
    );
    
    // Text entrance animation (Fade down)
    if (textRef.current) {
      gsap.fromTo(textRef.current,
        { opacity: 0, y: -60 },
        { opacity: 1, y: 0, duration: 1.5, ease: "power3.out", delay: 0.8 }
      );
    }
    
    // 1. Setup Three.js Scene
    const scene = new THREE.Scene();
    
    // We use an orthographic camera to map perfectly to a screen setup
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    
    const width = container.clientWidth;
    const height = container.clientHeight;
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    container.appendChild(renderer.domElement);

    // 2. Load textures
    const textureLoader = new THREE.TextureLoader();
    let isTexturesLoaded = false;
    
    // Define uniforms up front so they can be mutated
    const uniforms = {
      uTexture1: { value: null }, // Spiderman
      uTexture2: { value: null }, // Man
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uHovered: { value: 0.0 }, // 0 to 1 value smoothly handled by GSAP
      uRadius: { value: 0.25 }, // Reveal radius size
      uSoftness: { value: 0.15 }, // Softness of the edge
      uScale: { value: 0.05 }, // Scale zoom amount
      uResolution: { value: new THREE.Vector2(width, height) },
      uImageResolution: { value: new THREE.Vector2(1920, 1080) }, // Assuming 16:9 for default
      uImageScale: { value: 1.4 } // Control image size (1.4 makes it smaller)
    };
    
    uniformRef.current = uniforms;

    Promise.all([
      textureLoader.loadAsync(imgMan)
    ]).then(([tex1]) => {
      // Use default ThreeJS filters for high quality mipmapping
      
      uniforms.uTexture1.value = tex1;
      uniforms.uTexture2.value = tex1;
      
      // Update image resolution based on the first loaded texture's actual dimensions
      if (tex1.image) {
        uniforms.uImageResolution.value.set(tex1.image.width, tex1.image.height);
      }
      
      isTexturesLoaded = true;
    });

    // 3. Create full-screen plane geometry and shader material
    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let isVisible = true;
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    observer.observe(container);

    // 4. GSAP Ticker for render loop and smooth lerping
    const renderTick = () => {
      if (!isTexturesLoaded || !isVisible) return;
      
      // Lerp the mouse coordinates smoothly
      mouseCurrent.current.x = gsap.utils.interpolate(mouseCurrent.current.x, mouseTarget.current.x, 0.1);
      mouseCurrent.current.y = gsap.utils.interpolate(mouseCurrent.current.y, mouseTarget.current.y, 0.1);
      
      uniforms.uMouse.value.set(mouseCurrent.current.x, mouseCurrent.current.y);
      
      // Also update DOM custom cursor position if needed
      if(cursorRef.current) {
        gsap.set(cursorRef.current, {
           x: mouseCurrent.current.x * width,
           y: mouseCurrent.current.y * height,
        });
      }

      renderer.render(scene, camera);
    };
    
    gsap.ticker.add(renderTick);

    // 5. Setup interaction event handlers
    const onMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / width;
      // In Three.js UV space, Y=0 is bottom, Y=1 is top.
      const y = 1.0 - ((e.clientY - rect.top) / height);
      
      mouseTarget.current.x = x;
      mouseTarget.current.y = y;
      
      // For DOM cursor, use standard coordinates
      if(cursorRef.current) {
        gsap.to(cursorRef.current, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1,
            ease: "power2.out"
        });
      }
    };
    
    const onMouseEnter = () => {
      setIsHovered(true);
      gsap.to(uniforms.uHovered, {
        value: 1.0,
        duration: 1.2,
        ease: "power3.out"
      });
      if(cursorRef.current) {
         gsap.to(cursorRef.current, { scale: 1, opacity: 1, duration: 0.3 });
      }
    };
    
    const onMouseLeave = () => {
      setIsHovered(false);
      gsap.to(uniforms.uHovered, {
        value: 0.0,
        duration: 1.2,
        ease: "power3.out"
      });
      if(cursorRef.current) {
         gsap.to(cursorRef.current, { scale: 0, opacity: 0, duration: 0.3 });
      }
    };

    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('mouseenter', onMouseEnter);
    container.addEventListener('mouseleave', onMouseLeave);

    // 6. Handle resize
    const onResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h);
      uniforms.uResolution.value.set(w, h);
    };
    
    window.addEventListener('resize', onResize);

    // Mobile fallback (Tap)
    const onTouch = (e) => {
        if(e.touches.length > 0) {
            const touch = e.touches[0];
            const rect = container.getBoundingClientRect();
            mouseTarget.current.x = (touch.clientX - rect.left) / width;
            mouseTarget.current.y = 1.0 - ((touch.clientY - rect.top) / height);
            
            // Toggle hover effect on touch
            if (!isHovered) {
                onMouseEnter();
            }
        }
    };
    
    container.addEventListener('touchstart', onTouch);
    container.addEventListener('touchmove', onTouch);

    // 7. Cleanup
    return () => {
      gsap.ticker.remove(renderTick);
      window.removeEventListener('resize', onResize);
      container.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('mouseenter', onMouseEnter);
      container.removeEventListener('mouseleave', onMouseLeave);
      container.removeEventListener('touchstart', onTouch);
      container.removeEventListener('touchmove', onTouch);
      
      container.removeChild(renderer.domElement);
      renderer.dispose();
      material.dispose();
      geometry.dispose();
      observer.disconnect();
    };
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black flex items-center justify-center">
      {/* Three.js Canvas Container */}
      <div 
        ref={containerRef} 
        className="absolute inset-0 z-0 select-none"
      />
      
      {/* Custom Cursor / Light Bloom Overlay */}
      <div 
        ref={cursorRef}
        className="fixed top-0 left-0 w-32 h-32 rounded-full pointer-events-none z-20 opacity-0 scale-0"
        style={{
          background: 'radial-gradient(circle, rgba(6,182,212,0.15) 0%, rgba(6,182,212,0) 70%)',
          transform: 'translate(-50%, -50%)'
        }}
      />
      
      {/* Foreground UI Components */}
      <div ref={textRef} className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-center mx-auto w-full max-w-[90rem] px-8 lg:px-16 mt-20">
        <div 
          className="w-full flex flex-col md:flex-row justify-between md:items-end transition-all duration-700 ease-out transform gap-10" 
          style={{ transform: isHovered ? 'translateY(-20px)' : 'translateY(0px)' }}
        >
            
          {/* Left Side: Intro and Title */}
          <div className="flex-1 max-w-lg lg:max-w-xl text-left">
            <p className="text-sm md:text-base text-cyan-400 font-medium tracking-widest uppercase mb-6 opacity-90 drop-shadow-md">
              Hey, I'm Arko Jana
            </p>
            
            <h1 className="text-2xl md:text-3xl lg:text-5xl xl:text-[3.5rem] font-bold tracking-tighter drop-shadow-2xl leading-[1.05]" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Building Intelligent<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 font-serif italic font-light pr-2">Systems</span> from<br />
              End to End
            </h1>
          </div>
          
          {/* Right Side: Description and CTA */}
          <div className=" flex-1 max-w-md text-left md:text-right flex flex-col md:items-end">
            <p className="w-110 text-lg md:text-xl text-gray-300 drop-shadow-xl font-light tracking-wide leading-relaxed mb-8">
              Full-Stack Developer & AI Engineer. I build scalable, intelligent applications — merging AI/ML with robust cloud-native architectures for real-world impact.
            </p>
            
            <a 
              href="#projects"
              className="pointer-events-auto px-8 py-4 rounded-full border border-cyan-400/30 text-white text-sm tracking-[0.2em] uppercase font-medium hover:bg-cyan-400 hover:text-black hover:border-cyan-400 transition-all duration-500 backdrop-blur-sm shadow-xl inline-block no-underline"
            >
              View My Work
            </a>
          </div>
            
        </div>
      </div>
      
      {/* Overlay border/frame for cinematic effect */}
      <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/50 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 to-transparent z-10 pointer-events-none" />
    </div>
  );
}
