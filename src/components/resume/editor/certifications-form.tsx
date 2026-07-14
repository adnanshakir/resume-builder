"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { resumeService } from "@/services/resume.service";
import { IResume } from "@/types/resume.types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { DownloadPdfButton } from "@/components/resume/pdf/download-pdf-button";
import { useDeleteResume } from "@/hooks/use-delete-resume";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Loader2, Plus, X, Trash2 } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CertificationsFormProps {
  resume: IResume;
  onUpdate: (resume: IResume) => void;
}

export function CertificationsForm({ resume, onUpdate }: CertificationsFormProps) {
  const [entries, setEntries] = useState<string[]>(resume.certifications ?? []);
  const [value, setValue] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const { deleteResume, deletingId } = useDeleteResume();
  const deleting = deletingId === resume._id;

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

    toast.success("Resume completed");
    onUpdate(res.data);
    setSaved(true);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold">Certifications</h2>
        <p className="text-sm text-muted-foreground">Add any relevant certifications — optional, skip if none apply.</p>
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

      {saved && (
        <div className="space-y-3 rounded-lg border bg-muted/30 p-4">
          <p className="text-sm font-medium">Your resume is ready 🎉</p>
          <DownloadPdfButton resume={resume} />

          <AlertDialog>
            <AlertDialogTrigger className={cn(buttonVariants({ variant: "ghost" }), "w-full text-destructive hover:text-destructive")}>
              <Trash2 className="h-4 w-4" /> Delete this resume
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete this resume?</AlertDialogTitle>
                <AlertDialogDescription>This action can't be undone. This will permanently delete this resume.</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className={cn(buttonVariants({ variant: "outline", size: "sm" }))}>
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  className={cn(buttonVariants({ variant: "outline", size: "sm" }), "text-destructive hover:text-destructive")}
                  disabled={deleting}
                  onClick={() => deleteResume(resume._id!)}
                >
                  {deleting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Delete"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )}
    </div>
  );
}
