import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
// import { Projects } from './components/Projects';
import { Education } from './components/Education';
import { Contact } from './components/Contact';
import { FloatingBubbles } from './components/FloatingBubbles';
import { Loader } from './components/Loader';
import './index.css';

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <Loader />
      <main className="bg-[#0b0616] min-h-screen text-purple-50 selection:bg-purple-500/30 overflow-x-hidden relative">
        <FloatingBubbles />
        {/* Navbar could go here if requested, but focusing on sections */}
        <Hero />
        <About />
        <Skills />
        <Experience />
        {/* <Projects /> */}
        <Education />
        <Contact />

        {/* Footer */}
        <footer className="py-8 text-center text-gray-500 text-sm bg-[#0b0616] border-t border-white/5">
          <p>© {new Date().getFullYear()} Jenil Diyora. All rights reserved.</p>
        </footer>
      </main>
    </>
  );
}

export default App;
