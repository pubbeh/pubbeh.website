import { ArrowUp } from 'lucide-react';

interface FooterProps {
  name: string;
  title: string;
}

const Footer = ({ name, title }: FooterProps) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-gray-900 text-white py-12 px-6">
      <div className="container max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold">{name}</h2>
            <p className="text-gray-400 mt-1">{title}</p>
          </div>
          
          <div className="flex space-x-6">
            <a 
              href="https://www.linkedin.com/in/nagpal-p/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300 transition-colors"
              aria-label="LinkedIn"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect width="4" height="12" x="2" y="9"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
            <a 
              href="mailto:prashant.nagpal@example.com"
              className="hover:text-gray-300 transition-colors"
              aria-label="Email"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <path d="m22 6-10 7L2 6"></path>
              </svg>
            </a>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Prashant Nagpal. All rights reserved.
          </p>
          
          <button 
            onClick={scrollToTop}
            className="mt-4 md:mt-0 flex items-center text-sm text-gray-400 hover:text-white transition-colors"
          >
            Back to top
            <ArrowUp size={16} className="ml-1" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
