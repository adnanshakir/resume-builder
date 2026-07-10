import { dummyResume } from "@/constants/dummy- resume";
import { IResume } from "@/types/resume.types";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { Globe, Mail, Phone, MapPin } from "lucide-react";

interface ResumePreviewProps {
  resume: IResume | null;
  loading: boolean;
}

export function ResumePreview({ resume, loading }: ResumePreviewProps) {
  if (loading) {
    return <div className="mx-auto flex h-[1123px] w-[794px] items-center justify-center bg-white text-sm text-gray-400 shadow-sm">Loading preview...</div>;
  }

  const personalInfo = resume?.personalInfo?.fullname ? resume.personalInfo : dummyResume.personalInfo;
  const summary = resume?.summary || dummyResume.summary;
  const skills = resume?.skills?.length ? resume.skills : dummyResume.skills;
  const workExperience = resume?.workExperience?.length ? resume.workExperience : dummyResume.workExperience;
  const projects = resume?.projects?.length ? resume.projects : dummyResume.projects;
  const education = resume?.education?.length ? resume.education : dummyResume.education;
  const certifications = resume?.certifications?.length ? resume.certifications : dummyResume.certifications;

  const isPlaceholder = !resume?.personalInfo?.fullname;

  return (
    <div id="resume-preview" className={`mx-auto w-[794px] min-h-[1123px] space-y-6 bg-white p-12 text-black shadow-sm ${isPlaceholder ? "opacity-60" : ""}`}>
      {/* Header */}
      <div className="space-y-2 border-b pb-4">
        <h1 className="text-2xl font-bold">{personalInfo.fullname}</h1>

        <div className="flex flex-wrap items-center gap-x-2 text-xs text-gray-600">
          {personalInfo.email && (
            <span className="flex items-center gap-1">
              <Mail className="h-3 w-3" /> {personalInfo.email}
            </span>
          )}
          {personalInfo.mobile && (
            <>
              <span>|</span>
              <span className="flex items-center gap-1">
                <Phone className="h-3 w-3" /> {personalInfo.mobile}
              </span>
            </>
          )}
          {personalInfo.location && (
            <>
              <span>|</span>
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3" /> {personalInfo.location}
              </span>
            </>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-x-2 text-xs text-gray-600">
          {personalInfo.github && (
            <span className="flex items-center gap-1">
              <FaGithub className="h-3 w-3" /> {personalInfo.github}
            </span>
          )}
          {personalInfo.linkedin && (
            <>
              <span>|</span>
              <span className="flex items-center gap-1">
                <FaLinkedin className="h-3 w-3" /> {personalInfo.linkedin}
              </span>
            </>
          )}
          {personalInfo.portfolio && (
            <>
              <span>|</span>
              <span className="flex items-center gap-1">
                <Globe className="h-3 w-3" /> {personalInfo.portfolio}
              </span>
            </>
          )}
        </div>
      </div>

      {summary && (
        <section>
          <h2 className="mb-1 text-sm font-semibold uppercase tracking-wide text-black">Summary</h2>
          <p className="text-sm leading-6 text-gray-800">{summary}</p>
        </section>
      )}

      {!!skills?.length && (
        <section>
          <h2 className="mb-1 text-sm font-semibold uppercase tracking-wide text-black">Skills</h2>
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
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-black">Work Experience</h2>
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
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-black">Projects</h2>
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
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-black">Education</h2>
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
          <h2 className="mb-1 text-sm font-semibold uppercase tracking-wide text-black">Certifications</h2>
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
