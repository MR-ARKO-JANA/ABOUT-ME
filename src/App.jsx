import React from 'react';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Experience from './components/Experience';
import Hackathons from './components/Hackathons';
import Certificates from './components/Certificates';
import CustomCursor from './components/Cursor';
import BottomNav from './components/BottomNav';

function App() {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Hackathons />
      <Certificates />
      <Projects />
      <Contact />
      <BottomNav />
    </>
  );
}

export default App;
