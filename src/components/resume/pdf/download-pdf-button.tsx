// components/resume/pdf/download-pdf-button.tsx
"use client";

import { pdf } from "@react-pdf/renderer";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import { ResumePDFDocument } from "./resume-pdf-document";
import { IResume } from "@/types/resume.types";

export function DownloadPdfButton({ resume }: { resume: IResume }) {
  const [generating, setGenerating] = useState(false);

  const handleDownload = async () => {
    setGenerating(true);
    const blob = await pdf(<ResumePDFDocument resume={resume} />).toBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${resume.personalInfo?.fullname || "resume"}.pdf`;
    link.click();
    URL.revokeObjectURL(url);
    setGenerating(false);
  };

  return (
    <Button onClick={handleDownload} disabled={generating}>
      {generating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
      Download PDF
    </Button>
  );
}