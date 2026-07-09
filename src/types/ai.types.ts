import { ISkillCategory } from "@/types/resume.types";
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

export interface AtsScoreBody {
  jobTitle: string;
  summary?: string;
  skills?: ISkillCategory[];
  workExperience?: {
    position: string;
    company: string;
    description: string[];
  }[];
  projects?: {
    title: string;
    description: string[];
    techStack: string[];
  }[];
  education?: {
    degree: string;
    institution: string;
  }[];
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

export interface ImproveContentBody {
  content: string;
  contentType: 'summary' | 'projectDescription' | 'workExperience';
}