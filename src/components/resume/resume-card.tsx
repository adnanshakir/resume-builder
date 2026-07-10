"use client";

import { IResume } from "@/types/resume.types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { useRouter } from "next/navigation";

interface ResumeCardProps {
  resume: IResume;
}

export function ResumeCard({ resume }: ResumeCardProps) {
  const router = useRouter();

  return (
    <Card
      onClick={() => router.push(`/resume/${resume._id}`)}
      className="cursor-pointer transition-colors hover:bg-muted/50"
    >
      <CardHeader className="flex-row items-center gap-3 space-y-0">
        <FileText className="h-5 w-5 text-muted-foreground" />
        <CardTitle className="text-base font-medium">{resume.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-xs text-muted-foreground">
          Last updated{" "}
          {resume.updatedAt
            ? new Date(resume.updatedAt).toLocaleDateString()
            : "—"}
        </p>
      </CardContent>
    </Card>
  );
}