import mongoose, { Model } from "mongoose";
import { IResume } from "../types/resume.types";

const resumeSchema = new mongoose.Schema<IResume>(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
      default: "Untitled Resume",
    },

    summary: {
      type: String,
      default: "",
    },

    personalInfo: {
      type: {
        fullname: String,
        email: String,
        mobile: String,
        location: String,
        github: String,
        linkedin: String,
        portfolio: String,
      },
      default: {},
    },

    workExperience: {
      type: [
        {
          company: String,
          position: String,
          startDate: String,
          endDate: String,
          currentlyWorking: Boolean,
          description: [String],
        },
      ],
      default: [],
    },

    projects: {
      type: [
        {
          title: String,
          description: [String],
          githubUrl: String,
          liveUrl: String,
          techStack: [String],
        },
      ],
      default: [],
    },

    education: {
      type: [
        {
          institution: String,
          degree: String,
          startDate: String,
          endDate: String,
        },
      ],
      default: [],
    },

    skills: {
      type: [
        {
          category: String,
          items: [String],
        },
      ],
      default: [],
    },

    certifications: {
      type: [String],
      default: [],
    },
    targetJobTitle: {
      type: String,
      default: "",
    },
    experienceLevel: {
      type: String,
      default: "",
    },
    sectionOrder: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

export default (mongoose.models.Resume as mongoose.Model<IResume>) || mongoose.model<IResume>("Resume", resumeSchema);
