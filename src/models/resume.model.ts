import mongoose from "mongoose";
import { IResume } from "../types/resume.types";

let resumeSchema = new mongoose.Schema<IResume>(
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
      default: {}
    },

    workExperience: {
      type: [
        {
          company: String,
          position: String,
          startDate: String,
          endDate: String,
          description: String,
        },
      ],
      default: [],
    },

    projects: {
      type: [
        {
          title: String,
          description: String,
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
      type: [String],
      default: [],
    },

    certifications: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

let resumeModel = mongoose.model("Resume", resumeSchema);

export default resumeModel;