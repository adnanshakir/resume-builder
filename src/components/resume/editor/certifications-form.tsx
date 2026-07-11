"use client";

import { useState } from "react";
import { toast } from "sonner";
import { resumeService } from "@/services/resume.service";
import { IResume } from "@/types/resume.types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2, Plus, X } from "lucide-react";

interface CertificationsFormProps {
  resume: IResume;
  onUpdate: (resume: IResume) => void;
  onSaved?: () => void;
}

export function CertificationsForm({ resume, onUpdate, onSaved }: CertificationsFormProps) {
  const [entries, setEntries] = useState<string[]>(resume.certifications ?? []);
  const [value, setValue] = useState("");
  const [saving, setSaving] = useState(false);

  const addEntry = () => {
    if (!value.trim()) return;
    setEntries((prev) => [...prev, value.trim()]);
    setValue("");
  };

  const removeEntry = (index: number) => {
    setEntries((prev) => prev.filter((_, i) => i !== index));
  };

  const onSave = async () => {
    setSaving(true);
    const res = await resumeService.update(resume._id!, { certifications: entries });
    setSaving(false);

    if (!res.success || !res.data) {
      toast.error(res.message);
      return;
    }

    toast.success("Certifications saved");
    onUpdate(res.data);
    onSaved?.();
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold">Certifications</h2>
        <p className="text-sm text-muted-foreground">
          Add any relevant certifications — optional, skip if none apply.
        </p>
      </div>

      {!!entries.length && (
        <div className="space-y-2">
          {entries.map((c, i) => (
            <div key={i} className="flex items-center justify-between rounded-md border px-3 py-2 text-sm">
              <span>{c}</span>
              <button onClick={() => removeEntry(i)} className="text-muted-foreground hover:text-destructive">
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="flex gap-2">
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="AWS Certified Developer – Associate"
          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addEntry())}
        />
        <Button onClick={addEntry} variant="outline">
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <Button onClick={onSave} disabled={saving} className="w-full">
        {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save & Finish"}
      </Button>
    </div>
  );
}