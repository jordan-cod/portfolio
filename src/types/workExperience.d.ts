export interface WorkExperience {
    id: string;
    company: string;
    position: {
        en: string;
        pt: string;
    };
    startDate: string;
    endDate?: string;
    description: {
      en: string;
      pt: string;
    };
    technologies: string[];
  }
  