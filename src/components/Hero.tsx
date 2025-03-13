import { ArrowDown } from 'lucide-react';

interface HeroProps {
  name: string;
  title: string;
  tagline: string;
}

const Hero = ({ name, title, tagline }: HeroProps) => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen flex items-center px-6 relative">
      <div className="container max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left column - Text content */}
          <div className="space-y-6">
            <div className="animate-fade-in">
              <span className="inline-block text-sm uppercase tracking-widest mb-3 font-medium text-muted-foreground">
                {title}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight animate-fade-in animate-delay-100">
              {name}
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mt-4 max-w-3xl animate-fade-in animate-delay-200">
              {tagline}
            </p>
            
            <div className="flex flex-wrap gap-4 pt-6 animate-fade-in animate-delay-300">
              <button 
                onClick={() => scrollToSection('about')}
                className="button-hover px-6 py-3 bg-primary text-white rounded-md font-medium shadow-sm"
              >
                Learn more
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="button-hover px-6 py-3 border border-gray-300 rounded-md font-medium"
              >
                Get in touch
              </button>
            </div>
          </div>

          {/* Right column - Image */}
          <div className="relative animate-fade-in animate-delay-200">
            <div className="relative w-[64%] aspect-square max-w-md mx-auto">
              <img
                src="/Prashant Nagpal.jpeg"
                alt={name}
                className="rounded-lg shadow-xl object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <button 
          onClick={() => scrollToSection('about')}
          className="flex flex-col items-center text-muted-foreground hover:text-foreground transition-colors"
        >
          <span className="text-sm mb-1">Scroll down</span>
          <ArrowDown size={18} />
        </button>
      </div>
    </section>
  );
};

export default Hero;
