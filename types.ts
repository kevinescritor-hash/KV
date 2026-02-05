
export interface Experience {
  id: string;
  category: 'Fisioterapia' | 'Profesorado' | 'Otros';
  role: string;
  company: string;
  period: string;
  description?: string;
  details?: string[];
  hoverText?: string; // New field for the requested explanatory text
}

export interface Skill {
  name: string;
  icon?: string;
}

export interface TeachingStyle {
  name: string;
  icon: string;
}

export interface Project {
  title: string;
  description: string;
  url: string;
  icon: string;
}

export interface CVData {
  name: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  languages: { name: string; level: string }[];
  extras: string[];
  experience: Experience[];
  softSkills: string[];
  techSkills: Skill[];
  teachingStyles: TeachingStyle[];
  portfolio: Project[];
}
