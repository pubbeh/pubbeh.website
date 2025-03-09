import { ArrowDown } from 'lucide-react';

interface HeroProps {
  name: string;
  title: string;
  tagline: string;
}

const Hero = ({ name, title, tagline }: HeroProps) => {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center px-6 relative">
      <div className="max-w-4xl text-center space-y-6 mb-12">
        <div className="animate-fade-in">
          <span className="inline-block text-sm uppercase tracking-widest mb-3 font-medium text-muted-foreground">
            {title}
          </span>
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight animate-fade-in animate-delay-100">
          {name}
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mt-4 max-w-3xl mx-auto animate-fade-in animate-delay-200">
          {tagline}
        </p>
        
        <div className="flex flex-wrap gap-4 justify-center pt-6 animate-fade-in animate-delay-300">
          <a 
            href="#about" 
            className="button-hover px-6 py-3 bg-primary text-white rounded-md font-medium shadow-sm"
          >
            Learn more
          </a>
          <a 
            href="#contact" 
            className="button-hover px-6 py-3 border border-gray-300 rounded-md font-medium"
          >
            Get in touch
          </a>
        </div>
      </div>
      
      <div className="absolute bottom-10 animate-bounce">
        <a href="#about" className="flex flex-col items-center text-muted-foreground hover:text-foreground transition-colors">
          <span className="text-sm mb-1">Scroll down</span>
          <ArrowDown size={18} />
        </a>
      </div>
    </section>
  );
};

export default Hero;
