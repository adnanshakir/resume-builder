export interface GenerateSummeryBody {
  experienceLevel: string;
  skills: string[];
  jobTitle: string;
}

export interface GenerateSkillsBody {
  experienceLevel: string;
  jobTitle: string;
  skills?: string[];
}

export interface GenerateProjectDescBody {
  experienceLevel: string;
  jobTitle: string;
  techStack: string[];
  projectTitle: string;
  projectDescription: string;
  githubUrl?: string;
  liveUrl?: string;
}

export interface GenerateWorkExperienceBody {
  jobTitle: string;
  experienceLevel: string;
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  currentlyWorking?: boolean;
  responsibilities: string;
  techStack?: string[];
}
