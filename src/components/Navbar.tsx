
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

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300",
        scrolled ? "glass shadow-sm py-3" : "bg-transparent"
      )}
    >
      <div className="container max-w-6xl mx-auto flex items-center justify-between">
        <div className="text-lg font-medium">
          <a href="#" className="tracking-tight hover:opacity-80 transition-opacity">
            Prashant Nagpal
          </a>
        </div>
        <ul className="hidden md:flex space-x-8 font-medium text-sm">
          <li>
            <a 
              href="#about" 
              className="hover:text-black/70 transition-colors duration-200"
            >
              About
            </a>
          </li>
          <li>
            <a 
              href="#experience" 
              className="hover:text-black/70 transition-colors duration-200"
            >
              Experience
            </a>
          </li>
          <li>
            <a 
              href="#skills" 
              className="hover:text-black/70 transition-colors duration-200"
            >
              Skills
            </a>
          </li>
          <li>
            <a 
              href="#education" 
              className="hover:text-black/70 transition-colors duration-200"
            >
              Education
            </a>
          </li>
          <li>
            <a 
              href="#contact" 
              className="hover:text-black/70 transition-colors duration-200"
            >
              Contact
            </a>
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
