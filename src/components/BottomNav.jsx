import React, { useState, useEffect } from 'react';

const NAV_ITEMS = [
  { id: 'home', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' }, // Home
  { id: 'about', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' }, // User (About)
  { id: 'experience', icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' }, // Briefcase
  { id: 'projects', icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' }, // Image (Projects)
  { id: 'contact', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' } // Mail (Contact)
];

export default function BottomNav() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_ITEMS.map(item => document.getElementById(item.id === 'home' ? 'root' : item.id));
      let current = 0;
      sections.forEach((section, index) => {
        if (section) {
          const rect = section.getBoundingClientRect();
          // If the section's top is near the middle of the screen
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            current = index;
          }
        }
      });
      setActiveIndex(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (index, id) => {
    setActiveIndex(index);
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <style>{`
        .indicator-curve {
          position: absolute;
          top: -50%;
          width: 70px;
          height: 70px;
          background-color: #000; /* Match page background */
          border-radius: 50%;
          transition: 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          z-index: 1;
        }
        
        .indicator-curve::before {
          content: '';
          position: absolute;
          top: 50%;
          left: -22px;
          width: 20px;
          height: 20px;
          background: transparent;
          border-top-right-radius: 20px;
          box-shadow: 1px -10px 0 0 #000;
        }
        
        .indicator-curve::after {
          content: '';
          position: absolute;
          top: 50%;
          right: -22px;
          width: 20px;
          height: 20px;
          background: transparent;
          border-top-left-radius: 20px;
          box-shadow: -1px -10px 0 0 #000;
        }

        /* The floating circle inside the curve */
        .indicator-circle {
          position: absolute;
          top: -25px;
          width: 50px;
          height: 50px;
          background-color: #22d3ee; /* Cyan-400 */
          border-radius: 50%;
          border: 6px solid #000;
          transition: 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 5px 15px rgba(6, 182, 212, 0.4);
        }
      `}</style>

      {/* Show on both mobile and desktop */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-[400px] h-[70px] bg-white rounded-full flex items-center justify-between px-6 z-[100] shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
        
        {/* The moving curve cutout (matches page bg) */}
        <div 
          className="indicator-curve"
          style={{ 
            left: `calc(${activeIndex * (100 / (NAV_ITEMS.length - 1))}% - 35px)`,
          }}
        />

        {/* The floating cyan circle */}
        <div 
          className="indicator-circle text-black"
          style={{ 
            left: `calc(${activeIndex * (100 / (NAV_ITEMS.length - 1))}% - 25px)`,
          }}
        >
           {/* Active icon copy inside the circle */}
           <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d={NAV_ITEMS[activeIndex].icon} />
           </svg>
        </div>

        {/* Nav Items */}
        {NAV_ITEMS.map((item, index) => {
          const isActive = activeIndex === index;
          return (
            <button
              key={item.id}
              onClick={() => handleClick(index, item.id)}
              className="relative z-10 w-12 h-12 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 outline-none"
            >
              {/* Icon */}
              <div className={`transition-all duration-500 ${isActive ? 'opacity-0 translate-y-10' : 'opacity-100 translate-y-0 text-gray-500 hover:text-gray-800'}`}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                </svg>
              </div>
              
              {/* Text Label (Optional, shown briefly or permanently below? In the design it's just the icon) */}
              <span className={`absolute -bottom-1 text-[10px] font-bold text-cyan-600 transition-all duration-500 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                {item.id.charAt(0).toUpperCase() + item.id.slice(1)}
              </span>
            </button>
          );
        })}
      </div>
    </>
  );
}
