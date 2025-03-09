export interface Education {
  degree: string;
  institution: string;
  year: string;
  description: string;
}

export interface Certification {
  name: string;
  institution: string;
  year: string;
}

export interface SkillGroup {
  category: string;
  items: {
    name: string;
    level: number;
  }[];
}

export interface ExperiencePoint {
  text: string;
  subPoints: string[];
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  period: string;
  description: ExperiencePoint[];
}

export interface Profile {
  name: string;
  title: string;
  tagline: string;
  about: {
    overview: string[];
    specialties: string[];
    philosophy: string;
  };
  education: Education[];
  certifications: Certification[];
  skills: SkillGroup[];
  experience: Experience[];
  contact: {
    email: string;
    linkedin: string;
    phone: string;
    location: string;
  };
} 