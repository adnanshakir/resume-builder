"use client";

import { useState } from "react";
import { toast } from "sonner";
import { aiService } from "@/services/ai.service";
import { resumeService } from "@/services/resume.service";
import { IResume, IProjects } from "@/types/resume.types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Sparkles, Loader2, Plus, X } from "lucide-react";

interface ProjectsFormProps {
  resume: IResume;
  onUpdate: (resume: IResume) => void;
  onSaved?: () => void;
}

export function ProjectsForm({ resume, onUpdate, onSaved }: ProjectsFormProps) {
  const [entries, setEntries] = useState<IProjects[]>(resume.projects ?? []);
  const [title, setTitle] = useState("");
  const [techStack, setTechStack] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [rawDescription, setRawDescription] = useState("");
  const [bullets, setBullets] = useState<string[]>([]);
  const [generating, setGenerating] = useState(false);
  const [saving, setSaving] = useState(false);

  const onGenerate = async () => {
    if (!title.trim() || !techStack.trim() || !rawDescription.trim()) {
      toast.error("Project title, tech stack, and description are required");
      return;
    }

    setGenerating(true);
    const res = await aiService.generateProjectDesc({
      jobTitle: "",
      experienceLevel: "",
      techStack: techStack.split(",").map((t) => t.trim()).filter(Boolean),
      projectTitle: title,
      projectDescription: rawDescription,
      githubUrl,
      liveUrl,
    });
    setGenerating(false);

    if (!res.success || !res.data) {
      toast.error(res.message);
      return;
    }

    setBullets(res.data.description);
  };

  const addEntry = () => {
    const newEntry: IProjects = {
      title,
      description: bullets,
      githubUrl: githubUrl || undefined,
      liveUrl: liveUrl || undefined,
      techStack: techStack.split(",").map((t) => t.trim()).filter(Boolean),
    };
    setEntries((prev) => [...prev, newEntry]);
    setTitle("");
    setTechStack("");
    setGithubUrl("");
    setLiveUrl("");
    setRawDescription("");
    setBullets([]);
  };

  const removeEntry = (index: number) => {
    setEntries((prev) => prev.filter((_, i) => i !== index));
  };

  const onSave = async () => {
    setSaving(true);
    const res = await resumeService.update(resume._id!, { projects: entries });
    setSaving(false);

    if (!res.success || !res.data) {
      toast.error(res.message);
      return;
    }

    toast.success("Projects saved");
    onUpdate(res.data);
    onSaved?.();
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold">Projects</h2>
        <p className="text-sm text-muted-foreground">
          Add each project one at a time — describe what you built in plain language and AI will turn it into resume-ready bullet points.
        </p>
      </div>

      {!!entries.length && (
        <div className="space-y-2">
          {entries.map((e, i) => (
            <div key={i} className="flex items-center justify-between rounded-md border px-3 py-2 text-sm">
              <span>{e.title}</span>
              <button onClick={() => removeEntry(i)} className="text-muted-foreground hover:text-destructive">
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="space-y-4 rounded-lg border p-4">
        <div className="space-y-2">
          <Label>Project Title</Label>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="TaskFlow" />
        </div>

        <div className="space-y-2">
          <Label>Tech Stack</Label>
          <Input value={techStack} onChange={(e) => setTechStack(e.target.value)} placeholder="React, Node.js, MongoDB" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>GitHub URL (optional)</Label>
            <Input value={githubUrl} onChange={(e) => setGithubUrl(e.target.value)} placeholder="https://github.com/..." />
          </div>
          <div className="space-y-2">
            <Label>Live URL (optional)</Label>
            <Input value={liveUrl} onChange={(e) => setLiveUrl(e.target.value)} placeholder="https://..." />
          </div>
        </div>

        <div className="space-y-2">
          <Label>What did you build?</Label>
          <Textarea
            value={rawDescription}
            onChange={(e) => setRawDescription(e.target.value)}
            placeholder="made a task management app with drag and drop, used sockets for real time updates..."
            rows={3}
          />
        </div>

        <Button onClick={onGenerate} variant="secondary" disabled={generating} className="w-full">
          {generating ? <Loader2 className="h-4 w-4 animate-spin" /> : <><Sparkles className="h-4 w-4" /> Generate Description</>}
        </Button>

        {!!bullets.length && (
          <div className="space-y-2">
            <Label>Generated bullets (editable)</Label>
            <Textarea
              value={bullets.join("\n")}
              onChange={(e) => setBullets(e.target.value.split("\n"))}
              rows={4}
            />
            <Button onClick={addEntry} variant="outline" className="w-full">
              <Plus className="h-4 w-4" /> Add to Resume
            </Button>
          </div>
        )}
      </div>

      {!!entries.length && (
        <Button onClick={onSave} disabled={saving} className="w-full">
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save & Continue"}
        </Button>
      )}
    </div>
  );
}