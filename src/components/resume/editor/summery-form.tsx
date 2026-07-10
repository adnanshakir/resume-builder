"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { summaryInputSchema, SummaryInputValues } from "@/schemas/resume.schema";
import { aiService } from "@/services/ai.service";
import { resumeService } from "@/services/resume.service";
import { IResume } from "@/types/resume.types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Sparkles, Loader2 } from "lucide-react";

interface SummaryFormProps {
  resume: IResume;
  onUpdate: (resume: IResume) => void;
}

export function SummaryForm({ resume, onUpdate }: SummaryFormProps) {
  const [generatedSummary, setGeneratedSummary] = useState(resume.summary ?? "");
  const [generating, setGenerating] = useState(false);
  const [saving, setSaving] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SummaryInputValues>({
    resolver: zodResolver(summaryInputSchema),
  });

  const onGenerate = async (data: SummaryInputValues) => {
    setGenerating(true);
    const res = await aiService.generateSummary({
      jobTitle: data.jobTitle,
      experienceLevel: data.experienceLevel,
      skills: data.skills.split(",").map((s) => s.trim()).filter(Boolean),
    });
    setGenerating(false);

    if (!res.success || !res.data) {
      toast.error(res.message);
      return;
    }

    setGeneratedSummary(res.data.summary);
  };

  const onSave = async () => {
    if (!generatedSummary.trim()) {
      toast.error("Summary can't be empty");
      return;
    }

    setSaving(true);
    const res = await resumeService.update(resume._id!, { summary: generatedSummary });
    setSaving(false);

    if (!res.success || !res.data) {
      toast.error(res.message);
      return;
    }

    toast.success("Summary saved");
    onUpdate(res.data);
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(onGenerate)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="jobTitle">Target Job Title</Label>
          <Input id="jobTitle" {...register("jobTitle")} placeholder="Full-stack Developer" />
          <p className="min-h-5 text-sm text-destructive">{errors.jobTitle?.message}</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="experienceLevel">Experience Level</Label>
          <Input id="experienceLevel" {...register("experienceLevel")} placeholder="Fresher / 2 years / Senior" />
          <p className="min-h-5 text-sm text-destructive">{errors.experienceLevel?.message}</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="skills">Key Skills</Label>
          <Input id="skills" {...register("skills")} placeholder="React, Node.js, MongoDB" />
          <p className="min-h-5 text-sm text-destructive">{errors.skills?.message}</p>
        </div>

        <Button type="submit" variant="secondary" disabled={generating} className="w-full">
          {generating ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              <Sparkles className="h-4 w-4" />
              Generate Summary
            </>
          )}
        </Button>
      </form>

      {generatedSummary && (
        <div className="space-y-2">
          <Label htmlFor="summaryOutput">Summary</Label>
          <Textarea
            id="summaryOutput"
            value={generatedSummary}
            onChange={(e) => setGeneratedSummary(e.target.value)}
            rows={4}
          />
          <Button onClick={onSave} disabled={saving} className="w-full">
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save & Continue"}
          </Button>
        </div>
      )}
    </div>
  );
}