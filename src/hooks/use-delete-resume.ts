import { useState } from "react";
import { toast } from "sonner";
import { resumeService } from "@/services/resume.service";

export function useDeleteResume(onSuccess?: () => void) {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const deleteResume = async (resumeId: string) => {
    setDeletingId(resumeId);
    const res = await resumeService.delete(resumeId);
    setDeletingId(null);

    if (!res.success) {
      toast.error(res.message);
      return false;
    }

    toast.success("Resume deleted");
    onSuccess?.();
    return true;
  };

  return { deleteResume, deletingId };
}