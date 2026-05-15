export type TeamMember = {
  id: string;
  name: string;
  role: string;
  title: string;
  bio: string;
  image: string;
  skills: string[];
  experience: string;
  education: {
    title: string;
    organization: string;
    period: string;
  }[];
  contact: {
    email: string;
    phone: string;
    linkedin: string;
    telegram: string;
    github: string;
    instagram: string;
  };
  projects: TeamProject[];
};

export type TeamProject = {
  name: string;
  description: string;
  link: string;
  demo: string;
  imageLight: string;
  imageDark?: string;
  technologies: string[] | {
    frontend: string[];
    backend: string[];
  };
  type: 'individual' | 'team';
  features?: string[];
  contributors?: string[];
};

export type Service = {
  title: string;
  description: string;
  icon: string;
  technologies: string[];
  deliverables: string[];
};

export type TeamData = {
  team: {
    name: string;
    tagline: string;
    description: string;
    mission: string;
    email: string;
    telegram: string;
    experience: string;
    projectsCompleted: string;
    technologies: {
      frontend: string[];
      backend: string[];
      tools: string[];
    };
  };
  members: TeamMember[];
  teamProjects: TeamProject[];
  services: Service[];
};
