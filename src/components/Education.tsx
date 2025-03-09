import { Education as EducationType, Certification } from '@/types/profile';
import { BookOpen, Award, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EducationProps {
  educationItems: EducationType[];
  certifications: Certification[];
}

const Education = ({ educationItems, certifications }: EducationProps) => {
  return (
    <section id="education" className="py-24 px-6 bg-secondary">
      <div className="container max-w-5xl mx-auto">
        <div className="section-transition opacity-0 translate-y-8 js-reveal">
          <span className="inline-block text-sm uppercase tracking-widest mb-2 font-medium text-muted-foreground">
            Academic Background
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Education & Certifications</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
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

          <div className="space-y-6 section-transition opacity-0 translate-y-8 js-reveal delay-200">
            <h3 className="text-2xl font-semibold mb-6 flex items-center">
              <Award className="mr-3" size={24} />
              Certifications
            </h3>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <ul className="space-y-4">
                {certifications.map((cert, index) => (
                  <li key={index} className="pb-4 border-b last:border-b-0 last:pb-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{cert.name}</h4>
                        <span className="text-sm text-muted-foreground">{cert.institution}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{cert.year}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm mt-8">
              <h4 className="text-lg font-semibold mb-4">Continuous Learning</h4>
              <p className="text-muted-foreground">
                I regularly participate in financial leadership forums, executive education programs, and industry 
                conferences to stay current with emerging trends in financial management, digital transformation in 
                finance, and strategic business leadership.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
