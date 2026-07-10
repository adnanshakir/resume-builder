export const dummyResume = {
  personalInfo: {
    fullname: "John Doe",
    email: "john.doe@example.com",
    mobile: "9876543210",
    location: "Delhi, India",
    github: "github.com/johndoe",
    linkedin: "linkedin.com/in/johndoe",
    portfolio: "johndoe.dev",
  },
  summary:
    "Results-driven Full-stack Developer with experience building scalable web applications using React, Node.js, and MongoDB. Passionate about writing clean, maintainable code and delivering impactful products.",
  skills: [
    { category: "Languages", items: ["JavaScript", "TypeScript"] },
    { category: "Frameworks", items: ["React", "Next.js", "Express"] },
    { category: "Tools", items: ["Git", "Docker", "Postman"] },
  ],
  workExperience: [
    {
      company: "Tech Company Inc.",
      position: "Software Engineer",
      startDate: "Jan 2023",
      endDate: "Present",
      currentlyWorking: true,
      description: [
        "Developed and maintained core features for a customer-facing web application",
        "Collaborated with cross-functional teams to ship features on schedule",
        "Improved application performance through code optimization",
      ],
    },
  ],
  projects: [
    {
      title: "Project Name",
      techStack: ["React", "Node.js", "MongoDB"],
      description: ["Built a full-stack application with real-time data synchronization", "Implemented authentication and role-based access control"],
    },
  ],
  education: [
    {
      degree: "B.Tech in Computer Science",
      institution: "University Name",
      startDate: "2019",
      endDate: "2023",
    },
  ],
  certifications: ["AWS Certified Developer – Associate"],
};
