import { useEffect, useState } from 'react';
import Lenis from '@studio-freight/lenis';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
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

  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <Loader onComplete={() => setIsLoading(false)} />
      {!isLoading && <Navbar />}
      <main className="bg-[#0b0616] min-h-screen text-purple-50 selection:bg-purple-500/30 overflow-x-hidden relative">
        <FloatingBubbles />
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Contact />

        {/* Footer */}
        <footer className="py-20 text-center bg-[#0b0616] border-t border-white/5 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-accent-primary/5 pointer-events-none" />
          <div className="container mx-auto px-6 relative z-10">
            <div className="flex flex-col items-center gap-6">
              <div className="flex items-center gap-6">
                <a
                  href="https://www.linkedin.com/in/jenil-diyora-061380360/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-white/5 hover:bg-accent-primary/20 text-gray-400 hover:text-white transition-all duration-300 border border-white/10 hover:border-accent-primary/30"
                >
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                </a>
              </div>
              <p className="text-gray-400 font-medium">© {new Date().getFullYear()} Jenil Diyora. Built with Precision. 🫧</p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}

export default App;
