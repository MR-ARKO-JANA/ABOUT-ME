import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if device has mouse (not touch)
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }
    
    setIsVisible(true);
    
    const cursor = cursorRef.current;
    const dot = dotRef.current;
    
    // Quick setter for better performance
    const xSetCursor = gsap.quickSetter(cursor, "x", "px");
    const ySetCursor = gsap.quickSetter(cursor, "y", "px");
    const xSetDot = gsap.quickSetter(dot, "x", "px");
    const ySetDot = gsap.quickSetter(dot, "y", "px");
    
    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const posCursor = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const posDot = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    
    const onMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    
    window.addEventListener("mousemove", onMouseMove);
    
    // Tick loop for smooth trailing effect
    const ticker = gsap.ticker.add(() => {
      // Dot follows exactly
      posDot.x += (mouse.x - posDot.x) * 0.8;
      posDot.y += (mouse.y - posDot.y) * 0.8;
      xSetDot(posDot.x);
      ySetDot(posDot.y);
      
      // Cursor ring follows with delay
      posCursor.x += (mouse.x - posCursor.x) * 0.15;
      posCursor.y += (mouse.y - posCursor.y) * 0.15;
      xSetCursor(posCursor.x);
      ySetCursor(posCursor.y);
    });

    // Magnetic / Hover effects
    const handleMouseOver = (e) => {
      if (e.target.closest('a, button, input, textarea, .magnetic, .group')) {
        gsap.to(cursor, { 
          scale: 1.5, 
          backgroundColor: 'rgba(6, 182, 212, 0.1)', 
          borderColor: 'rgba(6, 182, 212, 0.5)', 
          duration: 0.3 
        });
        gsap.to(dot, { scale: 0.5, opacity: 0, duration: 0.3 });
      }
    };
    
    const handleMouseOut = (e) => {
      if (e.target.closest('a, button, input, textarea, .magnetic, .group')) {
        gsap.to(cursor, { 
          scale: 1, 
          backgroundColor: 'transparent', 
          borderColor: 'rgba(255, 255, 255, 0.3)', 
          duration: 0.3 
        });
        gsap.to(dot, { scale: 1, opacity: 1, duration: 0.3 });
      }
    };

    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      gsap.ticker.remove(ticker);
    };
  }, []);

  return (
    <>
      <div 
        ref={cursorRef} 
        className={`fixed top-0 left-0 w-8 h-8 rounded-full border border-white/30 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference ${!isVisible ? 'hidden' : ''}`}
      />
      <div 
        ref={dotRef} 
        className={`fixed top-0 left-0 w-1 h-1 bg-cyan-400 rounded-full pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2 ${!isVisible ? 'hidden' : ''}`}
      />
    </>
  );
}
