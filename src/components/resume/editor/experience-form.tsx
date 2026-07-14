"use client";

import { useState } from "react";
import { toast } from "sonner";
import { aiService } from "@/services/ai.service";
import { resumeService } from "@/services/resume.service";
import { IResume, IWorkExperience } from "@/types/resume.types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Sparkles, Loader2, Plus, X } from "lucide-react";
import { MonthYearPicker } from "./month-year-picker";

interface ExperienceFormProps {
  resume: IResume;
  onUpdate: (resume: IResume) => void;
  onSaved?: () => void;
}

export function ExperienceForm({ resume, onUpdate, onSaved }: ExperienceFormProps) {
  const [entries, setEntries] = useState<IWorkExperience[]>(resume.workExperience ?? []);
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [currentlyWorking, setCurrentlyWorking] = useState(false);
  const [responsibilities, setResponsibilities] = useState("");
  const [bullets, setBullets] = useState<string[]>([]);
  const [generating, setGenerating] = useState(false);
  const [saving, setSaving] = useState(false);

  const onGenerate = async () => {
    if (!company.trim() || !position.trim() || !responsibilities.trim()) {
      toast.error("Company, position, and responsibilities are required");
      return;
    }

    setGenerating(true);
    const res = await aiService.generateWorkExperience({
      jobTitle: position,
      experienceLevel: "",
      company,
      position,
      responsibilities,
      currentlyWorking,
    });
    setGenerating(false);

    if (!res.success || !res.data) {
      toast.error(res.message);
      return;
    }

    setBullets(res.data.description);
  };

  const addEntry = () => {
    const newEntry: IWorkExperience = {
      company,
      position,
      startDate,
      endDate,
      currentlyWorking,
      description: bullets,
    };
    setEntries((prev) => [...prev, newEntry]);
    setCompany("");
    setPosition("");
    setStartDate("");
    setEndDate("");
    setCurrentlyWorking(false);
    setResponsibilities("");
    setBullets([]);
  };

  const removeEntry = (index: number) => {
    setEntries((prev) => prev.filter((_, i) => i !== index));
  };

  const onSave = async () => {
    setSaving(true);
    const res = await resumeService.update(resume._id!, { workExperience: entries });
    setSaving(false);

    if (!res.success || !res.data) {
      toast.error(res.message);
      return;
    }

    toast.success("Experience saved");
    onUpdate(res.data);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold">Work Experience</h2>
        <p className="text-sm text-muted-foreground">
          Add each role one at a time — describe what you did in plain language and AI will turn it into resume-ready bullet points.
        </p>
      </div>

      {!!entries.length && (
        <div className="space-y-2">
          {entries.map((e, i) => (
            <div key={i} className="flex items-center justify-between rounded-md border px-3 py-2 text-sm">
              <span>
                {e.position} · {e.company}
              </span>
              <button onClick={() => removeEntry(i)} className="text-muted-foreground hover:text-destructive">
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="space-y-4 rounded-lg border p-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Company</Label>
            <Input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="TechNova Solutions" />
          </div>
          <div className="space-y-2">
            <Label>Position</Label>
            <Input value={position} onChange={(e) => setPosition(e.target.value)} placeholder="Software Engineer" />
          </div>
          <div className="space-y-2">
            <Label>Start Date</Label>
            <MonthYearPicker value={startDate} onChange={setStartDate} />
          </div>
          <div className="space-y-2">
            <Label>End Date</Label>
            <MonthYearPicker value={endDate} onChange={setEndDate} disabled={currentlyWorking} />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Checkbox checked={currentlyWorking} onCheckedChange={(v) => setCurrentlyWorking(!!v)} id="currentlyWorking" />
          <Label htmlFor="currentlyWorking" className="font-normal">
            I currently work here
          </Label>
        </div>

        <div className="space-y-2">
          <Label>What did you do here?</Label>
          <Textarea
            value={responsibilities}
            onChange={(e) => setResponsibilities(e.target.value)}
            placeholder="worked on backend apis, fixed bugs, helped with checkout flow..."
            rows={3}
          />
        </div>

        <Button onClick={onGenerate} variant="secondary" disabled={generating} className="w-full">
          {generating ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              <Sparkles className="h-4 w-4" /> Generate Bullet Points
            </>
          )}
        </Button>

        {!!bullets.length && (
          <div className="space-y-2">
            <Label>Generated bullets (editable)</Label>
            <Textarea value={bullets.join("\n")} onChange={(e) => setBullets(e.target.value.split("\n"))} rows={4} />
            <Button onClick={addEntry} variant="outline" className="w-full">
              <Plus className="h-4 w-4" /> Add to Resume
            </Button>
          </div>
        )}
      </div>

      {!!entries.length && (
        <Button onClick={onSave} disabled={saving} className="w-full">
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save Changes"}
        </Button>
      )}
    </div>
  );
}
