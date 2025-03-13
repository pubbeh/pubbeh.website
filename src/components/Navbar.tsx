import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300",
        scrolled ? "glass shadow-sm py-3" : "bg-transparent"
      )}
    >
      <div className="container max-w-6xl mx-auto flex items-center justify-between">
        <div className="text-lg font-medium">
          <button 
            onClick={() => scrollToSection('hero')}
            className="tracking-tight hover:opacity-80 transition-opacity"
          >
            Prashant Nagpal
          </button>
        </div>
        <ul className="hidden md:flex space-x-8 font-medium text-sm">
          <li>
            <button 
              onClick={() => scrollToSection('about')}
              className="hover:text-black/70 transition-colors duration-200"
            >
              About
            </button>
          </li>
          <li>
            <button 
              onClick={() => scrollToSection('experience')}
              className="hover:text-black/70 transition-colors duration-200"
            >
              Experience
            </button>
          </li>
          <li>
            <button 
              onClick={() => scrollToSection('skills')}
              className="hover:text-black/70 transition-colors duration-200"
            >
              Skills
            </button>
          </li>
          <li>
            <button 
              onClick={() => scrollToSection('education')}
              className="hover:text-black/70 transition-colors duration-200"
            >
              Education
            </button>
          </li>
          <li>
            <button 
              onClick={() => scrollToSection('contact')}
              className="hover:text-black/70 transition-colors duration-200"
            >
              Contact
            </button>
          </li>
        </ul>
        <div className="md:hidden">
          {/* Mobile menu button - simplified for this version */}
          <button className="p-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
