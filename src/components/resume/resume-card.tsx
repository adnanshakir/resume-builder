"use client";

import { useState } from "react";
import { IResume } from "@/types/resume.types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileText, Trash2, Loader2, Pencil, Check, X } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";

interface ResumeCardProps {
  resume: IResume;
  onDelete: (resumeId: string) => void;
  onRename: (resumeId: string, title: string) => Promise<boolean>;
  deleting: boolean;
}

export function ResumeCard({ resume, onDelete, onRename, deleting }: ResumeCardProps) {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(resume.title);
  const [saving, setSaving] = useState(false);

  const saveTitle = async () => {
    if (!title.trim() || title === resume.title) {
      setTitle(resume.title);
      setEditing(false);
      return;
    }
    setSaving(true);
    const ok = await onRename(resume._id!, title.trim());
    setSaving(false);
    if (ok) setEditing(false);
  };

  const cancelEdit = () => {
    setTitle(resume.title);
    setEditing(false);
  };

  return (
    <Card className="transition-colors hover:bg-muted/50">
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <div className="flex flex-1 items-center gap-3 overflow-hidden">
          <FileText className="h-5 w-5 shrink-0 text-muted-foreground" />
          {editing ? (
            <div className="flex flex-1 items-center gap-1">
              <Input
                autoFocus
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") saveTitle();
                  if (e.key === "Escape") cancelEdit();
                }}
                className="h-7 text-sm"
              />
              <button onClick={saveTitle} disabled={saving} className="text-muted-foreground hover:text-foreground">
                {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Check className="h-3.5 w-3.5" />}
              </button>
              <button onClick={cancelEdit} className="text-muted-foreground hover:text-destructive">
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : (
            <div
              onClick={() => router.push(`/resume/${resume._id}`)}
              className="group flex flex-1 cursor-pointer items-center gap-2 overflow-hidden"
            >
              <CardTitle className="truncate text-base font-medium">{resume.title}</CardTitle>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setEditing(true);
                }}
                className="shrink-0 text-muted-foreground opacity-0 hover:text-foreground group-hover:opacity-100"
              >
                <Pencil className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
        </div>

        <AlertDialog>
          <AlertDialogTrigger
            className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "h-7 w-7 shrink-0 text-muted-foreground hover:text-destructive")}
            onClick={(e) => e.stopPropagation()}
          >
            {deleting ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete "{resume.title}"?</AlertDialogTitle>
              <AlertDialogDescription>This action can't be undone.</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => onDelete(resume._id!)}>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardHeader>
      <CardContent onClick={() => !editing && router.push(`/resume/${resume._id}`)} className="cursor-pointer">
        <p className="text-xs text-muted-foreground">
          Last updated {resume.updatedAt ? new Date(resume.updatedAt).toLocaleDateString() : "—"}
        </p>
      </CardContent>
    </Card>
  );
}