"use client";

import { IResume } from "@/types/resume.types";
import { DownloadPdfButton } from "@/components/resume/pdf/download-pdf-button";
import { useDeleteResume } from "@/hooks/use-delete-resume";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function FinishStep({ resume }: { resume: IResume }) {
  const { deleteResume, deletingId } = useDeleteResume();
  const deleting = deletingId === resume._id;

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold">You're all set 🎉</h2>
        <p className="text-sm text-muted-foreground">Download your resume, or make changes using the steps above.</p>
      </div>

      <DownloadPdfButton resume={resume} />

      <AlertDialog>
        <AlertDialogTrigger className={cn(buttonVariants({ variant: "ghost" }), "w-full text-destructive hover:text-destructive")}>
          <Trash2 className="h-4 w-4" /> Delete this resume
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this resume?</AlertDialogTitle>
            <AlertDialogDescription>This action can't be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction disabled={deleting} onClick={() => deleteResume(resume._id!)}>
              {deleting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}