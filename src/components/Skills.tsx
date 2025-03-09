import { cn } from '@/lib/utils';
import { SkillGroup } from '@/types/profile';

interface SkillsProps {
  skillGroups: SkillGroup[];
}

const skills = [
  {
    category: "Financial Management",
    items: [
      { name: "Financial Strategy", level: 95 },
      { name: "Budgeting & Forecasting", level: 95 },
      { name: "Financial Analysis", level: 90 },
      { name: "Cost Management", level: 95 },
      { name: "Financial Reporting", level: 90 },
      { name: "Investment Analysis", level: 85 },
    ]
  },
  {
    category: "Technical Skills",
    items: [
      { name: "Financial Modeling", level: 90 },
      { name: "ERP Systems", level: 85 },
      { name: "Business Intelligence", level: 80 },
      { name: "SQL & Data Analysis", level: 75 },
      { name: "Excel Advanced", level: 95 },
    ]
  },
  {
    category: "Leadership & Business",
    items: [
      { name: "Team Leadership", level: 90 },
      { name: "Strategic Planning", level: 85 },
      { name: "Stakeholder Management", level: 90 },
      { name: "Process Optimization", level: 85 },
      { name: "Cross-functional Collaboration", level: 90 },
    ]
  }
];

const SkillBar = ({ name, level }: { name: string; level: number }) => {
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium">{name}</span>
        <span className="text-xs text-muted-foreground">{level}%</span>
      </div>
      <div className="h-2 bg-secondary rounded-full overflow-hidden">
        <div 
          className="h-full bg-primary transition-all duration-1000 ease-out"
          style={{ width: '0%' }}
          data-width={`${level}%`}
        ></div>
      </div>
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
          {skills.map((skillGroup, groupIndex) => (
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
                    <SkillBar key={skill.name} name={skill.name} level={skill.level} />
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
