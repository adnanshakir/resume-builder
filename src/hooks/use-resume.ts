import { useEffect, useState, useCallback } from "react";
import { toast } from "sonner";
import { resumeService } from "@/services/resume.service";
import { IResume } from "@/types/resume.types";
import { useRouter } from "next/navigation";

export function useResumes() {
  const [resumes, setResumes] = useState<IResume[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const router = useRouter();

  const fetchResumes = useCallback(async () => {
    setLoading(true);
    const res = await resumeService.getAll();
    setLoading(false);

    if (!res.success) {
      toast.error(res.message);
      return;
    }

    setResumes(res.data ?? []);
  }, []);

  const createResume = async () => {
    setCreating(true);
    const res = await resumeService.create();
    setCreating(false);

    if (!res.success || !res.data) {
      toast.error(res.message);
      return;
    }

    router.push(`/resume/${res.data._id}`);
  };

  useEffect(() => {
    fetchResumes();
  }, [fetchResumes]);

  return { resumes, loading, creating, createResume, refetch: fetchResumes };
}

export function useResume(resumeId: string) {
  const [resume, setResume] = useState<IResume | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchResume = useCallback(async () => {
    setLoading(true);
    const res = await resumeService.getById(resumeId);
    setLoading(false);

    if (!res.success) {
      toast.error(res.message);
      return;
    }

    setResume(res.data ?? null);
  }, [resumeId]);

  useEffect(() => {
    fetchResume();
  }, [fetchResume]);

  return { resume, loading, refetch: fetchResume, setResume };
}