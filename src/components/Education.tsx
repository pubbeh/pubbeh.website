import { Education as EducationType } from '@/types/profile';
import { BookOpen, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EducationProps {
  educationItems: EducationType[];
}

const Education = ({ educationItems }: EducationProps) => {
  return (
    <section id="education" className="py-24 px-6 bg-secondary">
      <div className="container max-w-5xl mx-auto">
        <div className="section-transition opacity-0 translate-y-8 js-reveal">
          <span className="inline-block text-sm uppercase tracking-widest mb-2 font-medium text-muted-foreground">
            Academic Background
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Education</h2>
        </div>

        <div className="grid grid-cols-1 gap-12">
          <div className="space-y-6 section-transition opacity-0 translate-y-8 js-reveal">
            <h3 className="text-2xl font-semibold mb-6 flex items-center">
              <BookOpen className="mr-3" size={24} />
              Education
            </h3>
            
            <div className="space-y-8">
              {educationItems.map((item, index) => (
                <div 
                  key={index}
                  className={cn(
                    "bg-white p-6 rounded-lg shadow-sm transition-all duration-300",
                    "hover:shadow-md"
                  )}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-lg font-semibold">{item.degree}</h4>
                    <span className="flex items-center text-sm text-muted-foreground ml-2">
                      <Calendar size={14} className="mr-1" />
                      {item.year}
                    </span>
                  </div>
                  <div className="text-muted-foreground mb-3">{item.institution}</div>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
