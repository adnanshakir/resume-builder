"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useResume } from "@/hooks/use-resume";
import { ResumePreview } from "@/components/resume/preview/resume-preview";
import { ResumeStepper } from "@/components/resume/editor/resume-stepper";
import { PersonalInfoForm } from "@/components/resume/editor/personal-info-form";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft, ArrowRight } from "lucide-react";
import { SummaryForm } from "@/components/resume/editor/summary-form";

const steps = [
  { id: "personal", label: "Personal Info" },
  { id: "summary", label: "Summary" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "certifications", label: "Certifications" },
];

export default function ResumeEditorPage() {
  const { resumeId } = useParams<{ resumeId: string }>();
  const { resume, loading, setResume } = useResume(resumeId);
  const [currentStep, setCurrentStep] = useState(0);

  const goNext = () => setCurrentStep((s) => Math.min(s + 1, steps.length - 1));
  const goBack = () => setCurrentStep((s) => Math.max(s - 1, 0));

  const renderForm = () => {
    if (!resume) return null;

    switch (steps[currentStep].id) {
      case "personal":
        return <PersonalInfoForm resume={resume} onUpdate={setResume} onSaved={goNext} />;
      case "summary":
        return <SummaryForm resume={resume} onUpdate={setResume} onSaved={goNext} />;
      default:
        return (
          <div className="rounded-lg border border-dashed py-16 text-center text-sm text-muted-foreground">
            This section is coming soon.
          </div>
        );
    }
  };

  return (
    <div className="grid h-screen lg:grid-cols-2">
      <div className="no-scrollbar overflow-y-auto border-r px-8 py-10">
        <div className="mx-auto max-w-lg space-y-8">
          {loading || !resume ? (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              Loading resume...
            </div>
          ) : (
            <>
              <ResumeStepper steps={steps} currentStep={currentStep} onStepClick={setCurrentStep} />

              <div>{renderForm()}</div>

              <div className="flex justify-between pt-2">
                <Button variant="ghost" onClick={goBack} disabled={currentStep === 0}>
                  <ArrowLeft className="h-4 w-4" /> Back
                </Button>
                <Button variant="ghost" onClick={goNext} disabled={currentStep === steps.length - 1}>
                  Skip <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="no-scrollbar hidden overflow-y-auto bg-muted/30 px-8 py-10 lg:block">
        <ResumePreview resume={resume} loading={loading} />
      </div>
    </div>
  );
}