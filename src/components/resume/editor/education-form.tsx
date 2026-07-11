"use client";

import { useState } from "react";
import { toast } from "sonner";
import { resumeService } from "@/services/resume.service";
import { IResume, IEducation } from "@/types/resume.types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2, Plus, X } from "lucide-react";

interface EducationFormProps {
  resume: IResume;
  onUpdate: (resume: IResume) => void;
  onSaved?: () => void;
}

export function EducationForm({ resume, onUpdate, onSaved }: EducationFormProps) {
  const [entries, setEntries] = useState<IEducation[]>(resume.education ?? []);
  const [degree, setDegree] = useState("");
  const [institution, setInstitution] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [saving, setSaving] = useState(false);

  const addEntry = () => {
    if (!degree.trim() || !institution.trim()) {
      toast.error("Degree and institution are required");
      return;
    }

    setEntries((prev) => [...prev, { degree, institution, startDate, endDate }]);
    setDegree("");
    setInstitution("");
    setStartDate("");
    setEndDate("");
  };

  const removeEntry = (index: number) => {
    setEntries((prev) => prev.filter((_, i) => i !== index));
  };

  const onSave = async () => {
    setSaving(true);
    const res = await resumeService.update(resume._id!, { education: entries });
    setSaving(false);

    if (!res.success || !res.data) {
      toast.error(res.message);
      return;
    }

    toast.success("Education saved");
    onUpdate(res.data);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold">Education</h2>
        <p className="text-sm text-muted-foreground">
          Add your degrees or certifications in progress, most recent first.
        </p>
      </div>

      {!!entries.length && (
        <div className="space-y-2">
          {entries.map((e, i) => (
            <div key={i} className="flex items-center justify-between rounded-md border px-3 py-2 text-sm">
              <span>{e.degree}, {e.institution}</span>
              <button onClick={() => removeEntry(i)} className="text-muted-foreground hover:text-destructive">
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="space-y-4 rounded-lg border p-4">
        <div className="space-y-2">
          <Label>Degree</Label>
          <Input value={degree} onChange={(e) => setDegree(e.target.value)} placeholder="B.Tech in Computer Science" />
        </div>

        <div className="space-y-2">
          <Label>Institution</Label>
          <Input value={institution} onChange={(e) => setInstitution(e.target.value)} placeholder="University Name" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Start Date</Label>
            <Input value={startDate} onChange={(e) => setStartDate(e.target.value)} placeholder="2019" />
          </div>
          <div className="space-y-2">
            <Label>End Date</Label>
            <Input value={endDate} onChange={(e) => setEndDate(e.target.value)} placeholder="2023" />
          </div>
        </div>

        <Button onClick={addEntry} variant="outline" className="w-full">
          <Plus className="h-4 w-4" /> Add to Resume
        </Button>
      </div>

      {!!entries.length && (
        <Button onClick={onSave} disabled={saving} className="w-full">
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save & Continue"}
        </Button>
      )}
    </div>
  );
}