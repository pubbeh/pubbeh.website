import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Experience as ExperienceType } from '@/types/profile';

interface ExperienceProps {
  experiences: ExperienceType[];
}

const Experience = ({ experiences }: ExperienceProps) => {
  const [activeExperience, setActiveExperience] = useState<string>(experiences[0].id);

  // Group experiences by company
  const groupedExperiences = experiences.reduce((acc, exp) => {
    if (!acc[exp.company]) {
      acc[exp.company] = [];
    }
    acc[exp.company].push(exp);
    return acc;
  }, {} as Record<string, ExperienceType[]>);

  const selectedExperience = experiences.find(exp => exp.id === activeExperience) || experiences[0];

  return (
    <section id="experience" className="py-24 px-6 bg-secondary">
      <div className="container max-w-5xl mx-auto">
        <div className="section-transition opacity-0 translate-y-8 js-reveal">
          <span className="inline-block text-sm uppercase tracking-widest mb-2 font-medium text-muted-foreground">
            Career Journey
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Professional Experience</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Experience selector sidebar */}
          <div className="md:col-span-4 section-transition opacity-0 translate-y-8 js-reveal">
            <div className="flex flex-row md:flex-col overflow-x-auto md:overflow-visible space-x-4 md:space-x-0 md:space-y-4 pb-4 md:pb-0">
              {Object.entries(groupedExperiences).map(([company, exps]) => (
                <div key={company} className="space-y-2">
                  <div className="font-semibold text-lg">{company}</div>
                  {exps.map((exp) => (
                    <button
                      key={exp.id}
                      onClick={() => setActiveExperience(exp.id)}
                      className={cn(
                        "w-full px-4 py-3 text-left rounded-md transition-all whitespace-nowrap md:whitespace-normal",
                        activeExperience === exp.id
                          ? "bg-white shadow-md border border-gray-100"
                          : "hover:bg-white/50"
                      )}
                    >
                      <span className="block font-medium">{exp.position}</span>
                      <span className="text-sm text-muted-foreground block">{exp.period}</span>
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Experience details */}
          <div className="md:col-span-8 section-transition opacity-0 translate-y-8 js-reveal delay-200">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="mb-4">
                <h3 className="text-xl font-semibold">{selectedExperience.position}</h3>
                <div className="flex flex-col sm:flex-row sm:items-center text-muted-foreground mt-1">
                  <span>{selectedExperience.company}</span>
                  <span className="hidden sm:block mx-2">•</span>
                  <span>{selectedExperience.location}</span>
                </div>
                <span className="text-sm text-muted-foreground block mt-1">{selectedExperience.period}</span>
              </div>

              <ul className="space-y-4 mt-6">
                {selectedExperience.description.map((item, index) => (
                  <li key={index}>
                    <div className="flex items-start">
                      <span className="inline-block h-2 w-2 rounded-full bg-primary mt-2 mr-3 flex-shrink-0"></span>
                      <span>{item.text}</span>
                    </div>
                    {item.subPoints.length > 0 && (
                      <ul className="mt-2 ml-5 space-y-2">
                        {item.subPoints.map((subPoint, subIndex) => (
                          <li key={subIndex} className="flex items-start">
                            <span className="inline-block h-2 w-2 rounded-full border border-primary mt-2 mr-3 flex-shrink-0"></span>
                            <span className="text-muted-foreground">{subPoint}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
