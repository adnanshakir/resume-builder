import { Globe, Mail, Phone, MapPin } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { IResume } from "@/types/resume.types";
import { dummyResume } from "@/constants/dummy-resume";

interface ResumePreviewProps {
  resume: IResume | null;
  loading: boolean;
}

function LinkIcon({ href, icon: Icon, label }: { href?: string; icon: any; label: string }) {
  if (!href) return null;
  const url = href.startsWith("http") ? href : `https://${href}`;
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" title={label} className="text-gray-700 hover:text-black">
      <Icon className="h-3.5 w-3.5" />
    </a>
  );
}

export function ResumePreview({ resume, loading }: ResumePreviewProps) {
  if (loading) {
    return (
      <div className="flex h-[1123px] w-[794px] items-center justify-center bg-white text-sm text-gray-400 shadow-md">
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
  const isPlaceholder = !resume?.personalInfo?.fullname;

  const SectionHeading = ({ children }: { children: React.ReactNode }) => (
    <h2 className="mb-2 border-b border-gray-300 pb-1 text-sm font-bold uppercase tracking-wide text-black">
      {children}
    </h2>
  );

  return (
    <div
      id="resume-preview"
      className={`h-[1123px] w-[794px] overflow-hidden bg-white p-12 text-black shadow-md ${
        isPlaceholder ? "opacity-60" : ""
      }`}
    >
      <div className="space-y-1 pb-4 text-center">
        <h1 className="text-2xl font-bold">{personalInfo.fullname}</h1>
        <div className="flex flex-wrap items-center justify-center gap-x-2 text-xs text-gray-600">
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
          {(personalInfo.github || personalInfo.linkedin || personalInfo.portfolio) && <span>|</span>}
          <LinkIcon href={personalInfo.github} icon={FaGithub} label="GitHub" />
          <LinkIcon href={personalInfo.linkedin} icon={FaLinkedin} label="LinkedIn" />
          <LinkIcon href={personalInfo.portfolio} icon={Globe} label="Portfolio" />
        </div>
      </div>

      <div className="space-y-5">
        {summary && (
          <section>
            <SectionHeading>Summary</SectionHeading>
            <p className="text-sm leading-6 text-gray-800">{summary}</p>
          </section>
        )}

        {!!workExperience?.length && (
          <section>
            <SectionHeading>Experience</SectionHeading>
            <div className="space-y-3">
              {workExperience.map((exp, i) => (
                <div key={i}>
                  <div className="flex items-baseline justify-between">
                    <p className="text-sm font-semibold">{exp.position} · {exp.company}</p>
                    <p className="text-xs text-gray-500">
                      {exp.startDate} – {exp.currentlyWorking ? "Present" : exp.endDate}
                    </p>
                  </div>
                  <ul className="mt-1 list-disc space-y-0.5 pl-4">
                    {exp.description?.map((d, j) => (
                      <li key={j} className="text-sm text-gray-800">{d}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {!!projects?.length && (
          <section>
            <SectionHeading>Projects</SectionHeading>
            <div className="space-y-3">
              {projects.map((proj, i) => (
                <div key={i}>
                  <p className="text-sm font-semibold">
                    {proj.title}
                    {!!proj.techStack?.length && (
                      <span className="font-normal text-gray-600"> — {proj.techStack.join(", ")}</span>
                    )}
                  </p>
                  <ul className="mt-1 list-disc space-y-0.5 pl-4">
                    {proj.description?.map((d, j) => (
                      <li key={j} className="text-sm text-gray-800">{d}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {!!education?.length && (
          <section>
            <SectionHeading>Education</SectionHeading>
            <div className="space-y-1">
              {education.map((edu, i) => (
                <div key={i} className="flex items-baseline justify-between">
                  <p className="text-sm font-semibold">{edu.degree}, {edu.institution}</p>
                  <p className="text-xs text-gray-500">{edu.startDate} – {edu.endDate}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {!!skills?.length && (
          <section>
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
        )}

        {!!certifications?.length && (
          <section>
            <SectionHeading>Certifications</SectionHeading>
            <ul className="list-disc space-y-0.5 pl-4">
              {certifications.map((c, i) => (
                <li key={i} className="text-sm text-gray-800">{c}</li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}