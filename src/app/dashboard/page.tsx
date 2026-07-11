"use client";

import { useResumes } from "@/hooks/use-resumes";
import { useDeleteResume } from "@/hooks/use-delete-resume";
import { ResumeCard } from "@/components/resume/resume-card";
import { Button } from "@/components/ui/button";
import { Plus, Loader2 } from "lucide-react";

export default function DashboardPage() {
  const { resumes, loading, creating, createResume, refetch } = useResumes();
  const { deleteResume, deletingId } = useDeleteResume(refetch);

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <div className="mb-10 flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold">Your Resumes</h1>
          <p className="text-sm text-muted-foreground">Pick up where you left off, or start a new one.</p>
        </div>
        {resumes.length > 0 && (
          <Button onClick={createResume} disabled={creating}>
            {creating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
            New Resume
          </Button>
        )}
      </div>

      {loading ? (
        <p className="text-sm text-muted-foreground">Loading resumes...</p>
      ) : resumes.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-1 rounded-xl border border-dashed py-24 text-center">
          <p className="text-sm text-muted-foreground">You don&apos;t have any resumes yet.</p>
          <Button onClick={createResume} disabled={creating} className="mt-4">
            {creating ? <Loader2 className="h-4 w-4 animate-spin" /> : "Create your first resume"}
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {resumes.map((resume) => (
            <ResumeCard
              key={resume._id}
              resume={resume}
              onDelete={deleteResume}
              deleting={deletingId === resume._id}
            />
          ))}
        </div>
      )}
    </div>
  );
}