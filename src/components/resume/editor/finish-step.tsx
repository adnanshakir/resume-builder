"use client";

import { IResume } from "@/types/resume.types";
import { DownloadPdfButton } from "@/components/resume/pdf/download-pdf-button";
import { CheckCircle2 } from "lucide-react";

export function FinishStep({ resume }: { resume: IResume }) {
  return (
    <div className="flex flex-col items-center justify-center space-y-6 py-12 text-center">
      <CheckCircle2 className="h-14 w-14 text-primary" />

      <div className="space-y-2">
        <h2 className="text-3xl font-semibold">Your resume is ready</h2>
        <p className="text-base text-muted-foreground">
          Download it now, or head back to any step above to keep refining it.
        </p>
      </div>

      <DownloadPdfButton resume={resume} />
    </div>
  );
}