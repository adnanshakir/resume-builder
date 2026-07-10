"use client";

import { useParams } from "next/navigation";
import { useResume } from "@/hooks/use-resume";
import { ResumePreview } from "@/components/resume/preview/resume-preview";
import { Loader2 } from "lucide-react";
import { PersonalInfoForm } from "@/components/resume/editor/personal-info-form";
import { SummaryForm } from "@/components/resume/editor/summery-form";

export default function ResumeEditorPage() {
  const { resumeId } = useParams<{ resumeId: string }>();
  const { resume, loading, setResume } = useResume(resumeId);

  return (
    <div className="grid h-screen lg:grid-cols-2">
      <div className="overflow-y-auto border-r px-8 py-10">
        <div className="mx-auto max-w-lg space-y-10">
          {loading || !resume ? (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              Loading resume...
            </div>
          ) : (
            <>
              <section className="space-y-4">
                <h2 className="text-lg font-semibold">Personal Information</h2>
                <PersonalInfoForm resume={resume} onUpdate={setResume} />
              </section>

              <section className="space-y-4 border-t pt-8">
                <h2 className="text-lg font-semibold">Professional Summary</h2>
                <SummaryForm resume={resume} onUpdate={setResume} />
              </section>
            </>
          )}
        </div>
      </div>

      <div className="hidden overflow-y-auto bg-muted/30 px-8 py-10 lg:block">
        <ResumePreview resume={resume} loading={loading} />
      </div>
    </div>
  );
}
