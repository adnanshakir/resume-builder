"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useResume } from "@/hooks/use-resumes";
import { resumeService } from "@/services/resume.service";
import { ResumePreview } from "@/components/resume/preview/resume-preview";
import { ResumePreviewScaler } from "@/components/resume/preview/resume-preview-scaler";
import { ResumeStepper } from "@/components/resume/editor/resume-stepper";
import { SectionManager, ALL_SECTIONS } from "@/components/resume/editor/section-manager";
import { PersonalInfoForm } from "@/components/resume/editor/personal-info-form";
import { SummaryForm } from "@/components/resume/editor/summary-form";
import { SkillsForm } from "@/components/resume/editor/skills-form";
import { ExperienceForm } from "@/components/resume/editor/experience-form";
import { ProjectsForm } from "@/components/resume/editor/projects-form";
import { EducationForm } from "@/components/resume/editor/education-form";
import { CertificationsForm } from "@/components/resume/editor/certifications-form";
import { FinishStep } from "@/components/resume/editor/finish-step";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft, ArrowRight, LayoutDashboard } from "lucide-react";

const SECTION_LABELS: Record<string, string> = {
  experience: "Experience",
  projects: "Projects",
  education: "Education",
  certifications: "Certifications",
};

function ResumeEditor({ resumeId }: { resumeId: string }) {
  const router = useRouter();
  const { resume, loading, setResume } = useResume(resumeId);
  const [currentStep, setCurrentStep] = useState(0);

  const isFresher = resume?.experienceLevel === "Fresher / Student";
  const defaultOrder = isFresher
    ? ["projects", "education", "experience", "certifications"]
    : ["experience", "projects", "education", "certifications"];

  const sectionOrder = resume?.sectionOrder?.length ? resume.sectionOrder : defaultOrder;

  const steps = [
    { id: "personal", label: "Personal Info" },
    { id: "summary", label: "Summary" },
    { id: "skills", label: "Skills" },
    ...sectionOrder.map((id) => ({ id, label: SECTION_LABELS[id], optional: true })),
    { id: "finish", label: "Finish" },
  ];

  // Clamp currentStep if steps array shrinks (e.g. a section was toggled off)
  useEffect(() => {
    if (currentStep > steps.length - 1) setCurrentStep(steps.length - 1);
  }, [steps.length, currentStep]);

  const updateSectionOrder = async (order: string[]) => {
    if (!resume?._id) return;
    const res = await resumeService.update(resume._id, { sectionOrder: order });
    if (res.success && res.data) setResume(res.data);
  };

  const goNext = () => setCurrentStep((s) => Math.min(s + 1, steps.length - 1));
  const goBack = () => setCurrentStep((s) => Math.max(s - 1, 0));

  const renderForm = () => {
    if (!resume) return null;
    switch (steps[currentStep].id) {
      case "personal": return <PersonalInfoForm resume={resume} onUpdate={setResume} onSaved={goNext} />;
      case "summary": return <SummaryForm resume={resume} onUpdate={setResume} onSaved={goNext} />;
      case "skills": return <SkillsForm resume={resume} onUpdate={setResume} onSaved={goNext} />;
      case "experience": return <ExperienceForm resume={resume} onUpdate={setResume} />;
      case "projects": return <ProjectsForm resume={resume} onUpdate={setResume} />;
      case "education": return <EducationForm resume={resume} onUpdate={setResume} />;
      case "certifications": return <CertificationsForm resume={resume} onUpdate={setResume} />;
      case "finish": return <FinishStep resume={resume} />;
      default: return null;
    }
  };

  return (
    <div className="grid h-[calc(100vh-49px)] lg:grid-cols-2">
      <div className="no-scrollbar overflow-y-auto border-r px-8 py-10">
        <div className="mx-auto max-w-lg space-y-6">
          <Button variant="ghost" size="sm" onClick={() => router.push("/dashboard")}>
            <LayoutDashboard className="h-4 w-4" /> Back to Dashboard
          </Button>

          {loading || !resume ? (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" /> Loading resume...
            </div>
          ) : (
            <>
              <SectionManager sectionOrder={sectionOrder} onChange={updateSectionOrder} />
              <ResumeStepper steps={steps} currentStep={currentStep} onStepClick={setCurrentStep} />
              <div>{renderForm()}</div>
              <div className="flex justify-between pt-2">
                <Button variant="ghost" onClick={goBack} disabled={currentStep === 0}>
                  <ArrowLeft className="h-4 w-4" /> Back
                </Button>
                <Button variant="ghost" onClick={goNext} disabled={currentStep === steps.length - 1}>
                  Next <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="no-scrollbar hidden flex-col overflow-hidden lg:flex">
        <ResumePreviewScaler>
          <ResumePreview resume={resume} loading={loading} sectionOrder={sectionOrder} />
        </ResumePreviewScaler>
      </div>
    </div>
  );
}

export default function ResumeEditorPage() {
  const { resumeId } = useParams<{ resumeId: string }>();
  return <ResumeEditor key={resumeId} resumeId={resumeId} />;
}