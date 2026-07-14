import { IResume } from "@/types/resume.types";
import { dummyResume } from "@/constants/dummy-resume";

interface ResumePreviewProps {
  resume: IResume | null;
  loading: boolean;
  sectionOrder: string[];
}

export function ResumePreview({ resume, loading, sectionOrder }: ResumePreviewProps) {
  if (loading) {
    return (
      <div
        style={{
          backgroundColor: "#ffffff",
          color: "#111111",
          colorScheme: "light",
          forcedColorAdjust: "none",
        }}
        className="flex h-280.75 w-198.5 items-center justify-center text-sm text-gray-400 shadow-md"
      >
        Loading preview...
      </div>
    );
  }

  const personalInfo = resume?.personalInfo?.fullname ? resume.personalInfo : dummyResume.personalInfo;
  const summary = resume?.summary || dummyResume.summary;
  const skills = resume?.skills?.length ? resume.skills : dummyResume.skills;

  const workExperience = resume?.workExperience?.length ? resume.workExperience : dummyResume.workExperience;
  const projects = resume?.projects?.length ? resume.projects : dummyResume.projects;
  const education = resume?.education?.length ? resume.education : dummyResume.education;
  const certifications = resume?.certifications?.length ? resume.certifications : dummyResume.certifications;

  const renderSection = (id: string) => {
    switch (id) {
      case "experience":
        return (
          !!workExperience.length && (
            <section key={id}>
              <SectionHeading>Experience</SectionHeading>
              <div className="space-y-3">
                {workExperience.map((exp, i) => (
                  <div key={i}>
                    <div className="flex items-baseline justify-between">
                      <p className="text-sm font-semibold">
                        {exp.position} · {exp.company}
                      </p>
                      <p className="text-xs text-gray-500">
                        {exp.startDate} – {exp.currentlyWorking ? "Present" : exp.endDate}
                      </p>
                    </div>
                    <ul className="mt-1 list-disc space-y-0.5 pl-4">
                      {exp.description?.map((d, j) => (
                        <li key={j} className="text-sm text-gray-800">
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )
        );

      case "projects":
        return (
          !!projects.length && (
            <section key={id}>
              <SectionHeading>Projects</SectionHeading>
              <div className="space-y-3">
                {projects.map((proj, i) => (
                  <div key={i}>
                    <p className="text-sm font-semibold">
                      {proj.title}
                      {!!proj.techStack?.length && <span className="font-normal text-gray-600"> — {proj.techStack.join(", ")}</span>}
                    </p>
                    <ul className="mt-1 list-disc space-y-0.5 pl-4">
                      {proj.description?.map((d, j) => (
                        <li key={j} className="text-sm text-gray-800">
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )
        );

      case "education":
        return (
          !!education.length && (
            <section key={id}>
              <SectionHeading>Education</SectionHeading>
              <div className="space-y-1">
                {education.map((edu, i) => (
                  <div key={i} className="flex items-baseline justify-between">
                    <p className="text-sm font-semibold">
                      {edu.degree}, {edu.institution}
                    </p>
                    <p className="text-xs text-gray-500">
                      {edu.startDate} – {edu.endDate}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )
        );

      case "skills":
        return (
          !!skills?.length && (
            <section key={id}>
              <SectionHeading>Skills</SectionHeading>
              <div className="space-y-1">
                {skills.map((s) => (
                  <p key={s.category} className="text-sm text-gray-800">
                    <span className="font-semibold">{s.category}: </span>
                    {s.items.join(", ")}
                  </p>
                ))}
              </div>
            </section>
          )
        );

      case "certifications":
        return (
          !!certifications.length && (
            <section key={id}>
              <SectionHeading>Certifications</SectionHeading>
              <ul className="list-disc space-y-0.5 pl-4">
                {certifications.map((c, i) => (
                  <li key={i} className="text-sm text-gray-800">
                    {c}
                  </li>
                ))}
              </ul>
            </section>
          )
        );

      default:
        return null;
    }
  };

  const SectionHeading = ({ children }: { children: React.ReactNode }) => (
    <h2 className="mb-2 border-b border-gray-300 pb-1 text-sm font-bold uppercase tracking-wide text-black">{children}</h2>
  );

  return (
    <div
      id="resume-preview"
      style={{
        backgroundColor: "#ffffff",
        color: "#111111",
        colorScheme: "light",
        forcedColorAdjust: "none",
      }}
      className="h-280.75 w-198.5 overflow-hidden p-12"
    >
      <div className="space-y-1 pb-4 text-center">
        <h1 className="text-2xl font-bold">{personalInfo.fullname}</h1>
        <div className="flex flex-wrap items-center justify-center gap-x-2 text-xs text-gray-600">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.mobile && (
            <>
              <span>|</span>
              <span>{personalInfo.mobile}</span>
            </>
          )}
          {personalInfo.location && (
            <>
              <span>|</span>
              <span>{personalInfo.location}</span>
            </>
          )}
          {personalInfo.github && (
            <>
              <span>|</span>
              <a
                href={personalInfo.github.startsWith("http") ? personalInfo.github : `https://${personalInfo.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                GitHub
              </a>
            </>
          )}
          {personalInfo.linkedin && (
            <>
              <span>|</span>
              <a
                href={personalInfo.linkedin.startsWith("http") ? personalInfo.linkedin : `https://${personalInfo.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                LinkedIn
              </a>
            </>
          )}
          {personalInfo.portfolio && (
            <>
              <span>|</span>
              <a
                href={personalInfo.portfolio.startsWith("http") ? personalInfo.portfolio : `https://${personalInfo.portfolio}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Portfolio
              </a>
            </>
          )}
        </div>
      </div>

      <div className="space-y-5">
        {summary && (
          <section>
            <SectionHeading>Summary</SectionHeading>
            <p className="text-sm leading-6 text-gray-800">{summary}</p>
          </section>
        )}

        {sectionOrder.map(renderSection)}
      </div>
    </div>
  );
}
