"use client";

import { useState } from "react";
import { toast } from "sonner";
import { aiService } from "@/services/ai.service";
import { resumeService } from "@/services/resume.service";
import { IResume, ISkillCategory } from "@/types/resume.types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { X, Sparkles, Loader2 } from "lucide-react";

interface SkillsFormProps {
  resume: IResume;
  onUpdate: (resume: IResume) => void;
  onSaved?: () => void;
}

export function SkillsForm({ resume, onUpdate, onSaved }: SkillsFormProps) {
  const [jobTitle, setJobTitle] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [rawSkills, setRawSkills] = useState("");
  const [skills, setSkills] = useState<ISkillCategory[]>(resume.skills ?? []);
  const [generating, setGenerating] = useState(false);
  const [saving, setSaving] = useState(false);

  const onGenerate = async () => {
    if (!jobTitle.trim()) {
      toast.error("Job title is required");
      return;
    }

    setGenerating(true);
    const res = await aiService.generateSkills({
      jobTitle,
      experienceLevel,
      skills: rawSkills.split(",").map((s) => s.trim()).filter(Boolean),
    });
    setGenerating(false);

    if (!res.success || !res.data) {
      toast.error(res.message);
      return;
    }

    setSkills(res.data.skills);
  };

  const updateCategoryItems = (index: number, value: string) => {
    setSkills((prev) =>
      prev.map((cat, i) => (i === index ? { ...cat, items: value.split(",").map((s) => s.trim()) } : cat)),
    );
  };

  const removeCategory = (index: number) => {
    setSkills((prev) => prev.filter((_, i) => i !== index));
  };

  const onSave = async () => {
    setSaving(true);
    const res = await resumeService.update(resume._id!, { skills });
    setSaving(false);

    if (!res.success || !res.data) {
      toast.error(res.message);
      return;
    }

    toast.success("Skills saved");
    onUpdate(res.data);
    onSaved?.();
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold">Skills</h2>
        <p className="text-sm text-muted-foreground">
          Enter your target role and any skills you already know — AI will organize them into categories and fill in commonly paired tools you may have missed.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="jobTitle">Target Job Title</Label>
          <Input id="jobTitle" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} placeholder="Full-stack Developer" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="rawSkills">Skills you already know (optional)</Label>
          <Input id="rawSkills" value={rawSkills} onChange={(e) => setRawSkills(e.target.value)} placeholder="React, MongoDB" />
        </div>

        <Button onClick={onGenerate} variant="secondary" disabled={generating} className="w-full">
          {generating ? <Loader2 className="h-4 w-4 animate-spin" /> : <><Sparkles className="h-4 w-4" /> Generate Skills</>}
        </Button>
      </div>

      {!!skills.length && (
        <div className="space-y-3">
          {skills.map((cat, i) => (
            <div key={i} className="space-y-1">
              <div className="flex items-center justify-between">
                <Label>{cat.category}</Label>
                <button onClick={() => removeCategory(i)} className="text-muted-foreground hover:text-destructive">
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
              <Input
                value={cat.items.join(", ")}
                onChange={(e) => updateCategoryItems(i, e.target.value)}
              />
            </div>
          ))}

          <Button onClick={onSave} disabled={saving} className="w-full">
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save & Continue"}
          </Button>
        </div>
      )}
    </div>
  );
}