"use client";

import { Button } from "@/components/ui/button";
import { useResumes } from "@/hooks/use-resume";
import { ResumeCard } from "@/components/resume/resume-card";
import { Plus, Loader2 } from "lucide-react";

export default function DashboardPage() {
  const { resumes, loading, creating, createResume } = useResumes();

  return (
    <div className="min-h-screen w-full px-8 py-10">
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
        <div className="flex min-h-[70vh] flex-col items-center justify-center rounded-xl border border-dashed text-center">
          <p className="text-sm text-muted-foreground">You don&apos;t have any resumes yet.</p>

          <Button onClick={createResume} disabled={creating} className="mt-4">
            {creating ? <Loader2 className="h-4 w-4 animate-spin" /> : "Create your first resume"}
          </Button>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {resumes.map((resume) => (
            <ResumeCard key={resume._id} resume={resume} />
          ))}
        </div>
      )}
    </div>
  );
}
