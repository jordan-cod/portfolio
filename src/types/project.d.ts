export interface Project {
    id: string;
    title: {
      en: string;
      pt: string;
    };
    description: {
      en: string;
      pt: string;
    };
    technologies: string[];
    imageUrl: string;
    repoUrl?: string;
    liveUrl?: string;
  }
  