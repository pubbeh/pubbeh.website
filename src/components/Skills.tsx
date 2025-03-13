import { cn } from '@/lib/utils';
import { SkillGroup } from '@/types/profile';
import { CheckCircle } from 'lucide-react';

interface SkillsProps {
  skillGroups: SkillGroup[];
}

const SkillBar = ({ name, level, showLevel = false }: { name: string; level: number; showLevel?: boolean }) => {
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium">{name}</span>
      </div>
      {showLevel && (
        <div className="h-2 bg-secondary rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-1000 ease-out"
            style={{ width: `${level}%` }}
          ></div>
        </div>
      )}
    </div>
  );
};

const Skills = ({ skillGroups }: SkillsProps) => {
  return (
    <section id="skills" className="py-24 px-6">
      <div className="container max-w-5xl mx-auto">
        <div className="section-transition opacity-0 translate-y-8 js-reveal">
          <span className="inline-block text-sm uppercase tracking-widest mb-2 font-medium text-muted-foreground">
            Expertise
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Skills & Competencies</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillGroups.map((skillGroup, groupIndex) => (
            <div 
              key={skillGroup.category} 
              className={cn(
                "section-transition opacity-0 translate-y-8 js-reveal", 
                groupIndex === 1 ? "delay-100" : groupIndex === 2 ? "delay-200" : ""
              )}
            >
              <div className="p-6 bg-white rounded-lg shadow-sm h-full">
                <h3 className="text-xl font-semibold mb-6">{skillGroup.category}</h3>
                <div className="space-y-5">
                  {skillGroup.items.map((skill) => (
                    <SkillBar 
                      key={skill.name} 
                      name={skill.name} 
                      level={skill.level} 
                      showLevel={skillGroup.category === 'Languages'}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
