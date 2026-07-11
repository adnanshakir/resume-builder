"use client";

import { IResume } from "@/types/resume.types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { buttonVariants, Button } from "@/components/ui/button";
import { FileText, Trash2, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";

interface ResumeCardProps {
  resume: IResume;
  onDelete: (resumeId: string) => void;
  deleting: boolean;
}

export function ResumeCard({ resume, onDelete, deleting }: ResumeCardProps) {
  const router = useRouter();

  return (
    <Card className="transition-colors hover:bg-muted/50">
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <div onClick={() => router.push(`/resume/${resume._id}`)} className="flex flex-1 cursor-pointer items-center gap-3">
          <FileText className="h-5 w-5 text-muted-foreground" />
          <CardTitle className="text-base font-medium">{resume.title}</CardTitle>
        </div>

        <AlertDialog>
          <AlertDialogTrigger
            className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "h-7 w-7 text-muted-foreground hover:text-destructive")}
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
      <CardContent onClick={() => router.push(`/resume/${resume._id}`)} className="cursor-pointer">
        <p className="text-xs text-muted-foreground">
          Last updated {resume.updatedAt ? new Date(resume.updatedAt).toLocaleDateString() : "—"}
        </p>
      </CardContent>
    </Card>
  );
}