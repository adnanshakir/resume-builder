import { IResume } from "@/types/resume.types";

interface ResumePreviewProps {
  resume: IResume | null;
  loading: boolean;
}

export function ResumePreview({ resume, loading }: ResumePreviewProps) {
  if (loading || !resume) {
    return (
      <div className="mx-auto flex min-h-[500px] max-w-2xl items-center justify-center rounded-lg bg-white text-sm text-gray-400 shadow-sm">
        {loading ? "Loading preview..." : "No resume data"}
      </div>
    );
  }

  const { personalInfo, summary, skills, workExperience, projects, education, certifications } = resume;

  return (
    <div id="resume-preview" className="mx-auto max-w-2xl space-y-6 rounded-lg bg-white p-10 text-black shadow-sm">
      {/* Header */}
      <div className="space-y-1 border-b pb-4">
        <h1 className="text-2xl font-bold">{personalInfo?.fullname || "Your Name"}</h1>
        <div className="flex flex-wrap gap-x-3 text-xs text-gray-600">
          {personalInfo?.email && <span>{personalInfo.email}</span>}
          {personalInfo?.mobile && <span>• {personalInfo.mobile}</span>}
          {personalInfo?.location && <span>• {personalInfo.location}</span>}
          {personalInfo?.github && <span>• {personalInfo.github}</span>}
          {personalInfo?.linkedin && <span>• {personalInfo.linkedin}</span>}
          {personalInfo?.portfolio && <span>• {personalInfo.portfolio}</span>}
        </div>
      </div>

      {summary && (
        <section>
          <h2 className="mb-1 text-sm font-semibold uppercase tracking-wide text-gray-700">Summary</h2>
          <p className="text-sm leading-6 text-gray-800">{summary}</p>
        </section>
      )}

      {!!skills?.length && (
        <section>
          <h2 className="mb-1 text-sm font-semibold uppercase tracking-wide text-gray-700">Skills</h2>
          <div className="space-y-1">
            {skills.map((s) => (
              <p key={s.category} className="text-sm text-gray-800">
                <span className="font-medium">{s.category}: </span>
                {s.items.join(", ")}
              </p>
            ))}
          </div>
        </section>
      )}

      {!!workExperience?.length && (
        <section>
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-700">Work Experience</h2>
          <div className="space-y-4">
            {workExperience.map((exp, i) => (
              <div key={i}>
                <div className="flex items-baseline justify-between">
                  <p className="text-sm font-medium">
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
      )}

      {!!projects?.length && (
        <section>
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-700">Projects</h2>
          <div className="space-y-4">
            {projects.map((proj, i) => (
              <div key={i}>
                <p className="text-sm font-medium">
                  {proj.title}
                  {!!proj.techStack?.length && ` — ${proj.techStack.join(", ")}`}
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
      )}

      {!!education?.length && (
        <section>
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-700">Education</h2>
          <div className="space-y-2">
            {education.map((edu, i) => (
              <div key={i} className="flex items-baseline justify-between">
                <p className="text-sm font-medium">
                  {edu.degree}, {edu.institution}
                </p>
                <p className="text-xs text-gray-500">
                  {edu.startDate} – {edu.endDate}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {!!certifications?.length && (
        <section>
          <h2 className="mb-1 text-sm font-semibold uppercase tracking-wide text-gray-700">Certifications</h2>
          <ul className="list-disc space-y-0.5 pl-4">
            {certifications.map((c, i) => (
              <li key={i} className="text-sm text-gray-800">
                {c}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}