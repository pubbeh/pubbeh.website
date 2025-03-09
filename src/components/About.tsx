interface AboutProps {
  overview: string[];
  specialties: string[];
  philosophy: string;
}

const About = ({ overview, specialties, philosophy }: AboutProps) => {
  return (
    <section id="about" className="py-24 px-6">
      <div className="container max-w-5xl mx-auto">
        <div className="section-transition opacity-0 translate-y-8 js-reveal">
          <span className="inline-block text-sm uppercase tracking-widest mb-2 font-medium text-muted-foreground">
            About Me
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Professional Overview</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6 section-transition opacity-0 translate-y-8 js-reveal">
            <p className="text-lg">
              I am a results-driven finance leader with extensive experience in strategic financial management, 
              currently serving as Head of Finance at GetYourGuide, a leading online marketplace for travel experiences.
            </p>
            <p className="text-lg">
              With a background in finance and business administration, I specialize in financial planning, 
              analysis, and operational excellence. I have a proven track record of driving financial strategy, 
              optimizing processes, and supporting business growth across global organizations.
            </p>
            <p className="text-lg">
              I'm passionate about leveraging financial insights to drive strategic decision-making and 
              create sustainable business value while building high-performing finance teams.
            </p>
          </div>
          <div className="space-y-6 section-transition opacity-0 translate-y-8 js-reveal delay-200">
            <div className="bg-secondary p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Core Specialties</h3>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Financial Strategy & Planning</li>
                <li>Business Performance Analysis</li>
                <li>Financial Modeling & Forecasting</li>
                <li>Cost Optimization</li>
                <li>Budgeting & Resource Allocation</li>
                <li>Financial Systems Implementation</li>
                <li>Team Leadership & Development</li>
                <li>Stakeholder Management</li>
              </ul>
            </div>
            <div className="bg-secondary p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Professional Philosophy</h3>
              <p className="text-muted-foreground">
                I believe that effective financial management goes beyond numbers to drive strategic value. 
                My approach combines analytical rigor with business partnership to create financial strategies 
                that enable growth, innovation, and long-term success.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
