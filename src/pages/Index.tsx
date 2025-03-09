import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Skills from '@/components/Skills';
import Education from '@/components/Education';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import AnimationObserver from '@/components/AnimationObserver';
import { profileData } from '@/data/profile';

const Index = () => {
  useEffect(() => {
    document.title = `${profileData.name} | ${profileData.title}`;
  }, []);

  return (
    <div className="antialiased bg-white">
      <Navbar />
      <Hero 
        name={profileData.name}
        title={profileData.title}
        tagline={profileData.tagline}
      />
      <About 
        overview={profileData.about.overview}
        specialties={profileData.about.specialties}
        philosophy={profileData.about.philosophy}
      />
      <Experience experiences={profileData.experience} />
      <Skills skillGroups={profileData.skills} />
      <Education 
        educationItems={profileData.education}
        certifications={profileData.certifications}
      />
      <Contact contactInfo={profileData.contact} />
      <Footer name={profileData.name} title={profileData.title} />
      <AnimationObserver />
    </div>
  );
};

export default Index;
