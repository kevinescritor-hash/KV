
import React from 'react';
import { CVData } from './types';
import { 
  Users, Brain, LifeBuoy, Rocket, GraduationCap, Flag,
  Monitor, Layout, PenTool, Image as ImageIcon, Database, Cloud, FileSpreadsheet, Presentation
} from 'lucide-react';

export const CV_DATA: CVData = {
  name: "Kevin Valcárcel Estévez",
  email: "kalcevez@gmail.com",
  phone: "697765297",
  location: "A Coruña",
  summary: "Desde pequeño he tenido una fuerte vocación de servicio y una gran curiosidad, lo que me ha hecho explorar distintos campos con los que nutrir mi experiencia académica.",
  languages: [
    { name: "Español", level: "Nativo" },
    { name: "Gallego", level: "Celga IV" },
    { name: "Inglés", level: "B2" }
  ],
  extras: ["Vehículo propio"],
  experience: [
    {
      id: "edu-1",
      category: 'Fisioterapia',
      role: "Grado en Fisioterapia",
      company: "Universidad de Vigo",
      period: "2011 - 2013"
    },
    {
      id: "edu-2",
      category: 'Fisioterapia',
      role: "Máster en Fisioterapia torácica",
      company: "Universidad Gimbernat",
      period: "2013 - 2014"
    },
    {
      id: "exp-1",
      category: 'Fisioterapia',
      role: "Responsable sanitario en población",
      company: "Asociación As burgas Ourense",
      period: "2010 - 2012"
    },
    {
      id: "exp-2",
      category: 'Fisioterapia',
      role: "Fisioterapeuta en Mutuas y Seguros",
      company: "Clínica A Coruña",
      period: "2014 - 2015"
    },
    {
      id: "exp-3",
      category: 'Fisioterapia',
      role: "Director técnico y fundador",
      company: "Clínica Steps",
      period: "2016 - 2021",
      hoverText: "Gestión integral de la clínica, coordinando equipos y optimizando la atención al paciente"
    },
    {
      id: "edu-3",
      category: 'Profesorado',
      role: "Máster en Profesorado en FP y Secundaria",
      company: "Universidad Europea",
      period: "2022 - 2023",
      details: ["Especialidad en Procesos sanitarios"]
    },
    {
      id: "exp-4",
      category: 'Profesorado',
      role: "Tutor y Profesor",
      company: "CESFOREM",
      period: "2023 - Actualidad",
      details: ["CS de Higiene Bucodental y CM de TCAE"],
      hoverText: "Creación de contenidos didácticos en Higiene Bucodental y TCAE, introduciendo herramientas de innovación pedagógica, tanto a nivel presencial como en formación a distancia"
    },
    {
      id: "oth-1",
      category: 'Otros',
      role: "Voluntario en charlas salud nivel ESO",
      company: "Cruz Roja",
      period: "2010 - 2012"
    },
    {
      id: "oth-2",
      category: 'Otros',
      role: "Monitor en respiros familiares",
      company: "FADEMGA",
      period: "2010 - 2012"
    },
    {
      id: "oth-3",
      category: 'Otros',
      role: "Monitor de campamento",
      company: "Colegio Montegrande",
      period: "2025"
    }
  ],
  softSkills: [
    "Trabajo en equipo",
    "Pensamiento crítico",
    "Resolución de problemas",
    "Creatividad",
    "Aprendizaje rápido",
    "Liderazgo"
  ],
  techSkills: [
    { name: "Canva" },
    { name: "Moodle" },
    { name: "Adobe Illustrator" },
    { name: "Photoshop" },
    { name: "Google Suite" },
    { name: "Google Drive" },
    { name: "Excel" },
    { name: "Google Classroom" }
  ],
  teachingStyles: [
    { name: "Expositiva", icon: "🏫" },
    { name: "ABJ (Aprendizaje Basado en Juegos)", icon: "🎲" },
    { name: "Microlearning", icon: "🍃" },
    { name: "ABP (Proyectos)", icon: "🧩" },
    { name: "Pactos de Aula", icon: "✍️" }
  ],
  portfolio: [
    {
      title: "Creador de rúbricas para Moodle",
      description: "TurboRúbrica: Herramienta avanzada para agilizar la creación y gestión de rúbricas de evaluación.",
      url: "https://sites.google.com/view/shevekdream/inicio/kevintools/turbor%C3%BAbrica",
      icon: "📊"
    },
    {
      title: "Gestor de PDF",
      description: "Compilador PDF: Utilidad eficiente para la compilación y organización de documentos digitales.",
      url: "https://sites.google.com/view/shevekdream/inicio/kevintools/compilador-pdf",
      icon: "📄"
    }
  ]
};

export const SOFT_SKILLS_ICONS: Record<string, React.ReactNode> = {
  "Trabajo en equipo": <Users className="w-5 h-5" />,
  "Pensamiento crítico": <Brain className="w-5 h-5" />,
  "Resolución de problemas": <LifeBuoy className="w-5 h-5" />,
  "Creatividad": <Rocket className="w-5 h-5" />,
  "Aprendizaje rápido": <GraduationCap className="w-5 h-5" />,
  "Liderazgo": <Flag className="w-5 h-5" />
};

export const TECH_SKILLS_ICONS: Record<string, React.ReactNode> = {
  "Canva": <Layout className="w-5 h-5" />,
  "Moodle": <Monitor className="w-5 h-5" />,
  "Adobe Illustrator": <PenTool className="w-5 h-5" />,
  "Photoshop": <ImageIcon className="w-5 h-5" />,
  "Google Suite": <Cloud className="w-5 h-5" />,
  "Google Drive": <Database className="w-5 h-5" />,
  "Excel": <FileSpreadsheet className="w-5 h-5" />,
  "Google Classroom": <Presentation className="w-5 h-5" />
};
