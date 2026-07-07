import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SplitText({ children, className = "", delay = 0 }) {
  const containerRef = useRef(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Select all the span characters
    const chars = containerRef.current.querySelectorAll('.split-char');
    
    gsap.fromTo(chars, 
      { 
        opacity: 0, 
        y: 40,
        rotateX: -90,
        transformOrigin: "50% 50% -20px"
      },
      {
        opacity: 1, 
        y: 0,
        rotateX: 0,
        duration: 0.8,
        stagger: 0.02,
        ease: "back.out(1.7)",
        delay: delay,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, [delay]);

  // If children isn't a string, just render normally to avoid crashes
  if (typeof children !== 'string') {
    return <span className={className}>{children}</span>;
  }

  // Split string into words, then characters
  const words = children.split(' ');

  return (
    <span ref={containerRef} className={`inline-block ${className}`} style={{ perspective: "400px" }}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap mr-[0.25em]">
          {word.split('').map((char, charIndex) => (
            <span 
              key={`${wordIndex}-${charIndex}`} 
              className="split-char inline-block"
            >
              {char}
            </span>
          ))}
        </span>
      ))}
    </span>
  );
}
