import { Types } from "mongoose";
export interface IPersonalInfo {
  fullname: string;
  email: string;
  mobile: string;
  location?: string;
  github?: string;
  linkedin?: string;
  portfolio?: string;
}

export interface IWorkExperience {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  currentlyWorking: boolean;
  description: string[];
}

export interface IProjects {
  title: string;
  description: string[];
  githubUrl?: string;
  liveUrl?: string;
  techStack: string[];
}

export interface IEducation {
  institution: string;
  degree: string;
  startDate: string;
  endDate: string;
}

export interface ISkillCategory {
  category: string;
  items: string[];
}

export interface IResume {
  _id?: string;
  user_id: Types.ObjectId;
  title: string;
  summary?: string;

  sectionOrder?: string[];

  personalInfo?: IPersonalInfo;
  workExperience?: IWorkExperience[];
  projects?: IProjects[];
  education?: IEducation[];

  targetJobTitle?: string;
  experienceLevel?: string;

  certifications?: string[];
  skills?: ISkillCategory[];

  createdAt?: Date;
  updatedAt?: Date;
}
