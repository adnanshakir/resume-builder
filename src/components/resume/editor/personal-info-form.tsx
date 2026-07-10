"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { personalInfoSchema, PersonalInfoValues } from "@/schemas/resume.schema";
import { resumeService } from "@/services/resume.service";
import { IResume } from "@/types/resume.types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface PersonalInfoFormProps {
  resume: IResume;
  onUpdate: (resume: IResume) => void;
}

export function PersonalInfoForm({ resume, onUpdate }: PersonalInfoFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PersonalInfoValues>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      fullname: resume.personalInfo?.fullname ?? "",
      email: resume.personalInfo?.email ?? "",
      mobile: resume.personalInfo?.mobile ?? "",
      location: resume.personalInfo?.location ?? "",
      github: resume.personalInfo?.github ?? "",
      linkedin: resume.personalInfo?.linkedin ?? "",
      portfolio: resume.personalInfo?.portfolio ?? "",
    },
  });

  const onSubmit = async (data: PersonalInfoValues) => {
    const res = await resumeService.update(resume._id!, { personalInfo: data });

    if (!res.success || !res.data) {
      toast.error(res.message);
      return;
    }

    toast.success("Personal info saved");
    onUpdate(res.data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2 space-y-2">
          <Label htmlFor="fullname">Full Name</Label>
          <Input id="fullname" {...register("fullname")} placeholder="John Doe" />
          <p className="min-h-5 text-sm text-destructive">{errors.fullname?.message}</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" {...register("email")} placeholder="you@example.com" />
          <p className="min-h-5 text-sm text-destructive">{errors.email?.message}</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="mobile">Mobile</Label>
          <Input id="mobile" {...register("mobile")} placeholder="9876543210" />
          <p className="min-h-5 text-sm text-destructive">{errors.mobile?.message}</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input id="location" {...register("location")} placeholder="Delhi, India" />
          <p className="min-h-5 text-sm text-destructive">{errors.location?.message}</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="github">GitHub</Label>
          <Input id="github" {...register("github")} placeholder="https://github.com/you" />
          <p className="min-h-5 text-sm text-destructive">{errors.github?.message}</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="linkedin">LinkedIn</Label>
          <Input id="linkedin" {...register("linkedin")} placeholder="https://linkedin.com/in/you" />
          <p className="min-h-5 text-sm text-destructive">{errors.linkedin?.message}</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="portfolio">Portfolio</Label>
          <Input id="portfolio" {...register("portfolio")} placeholder="https://yoursite.com" />
          <p className="min-h-5 text-sm text-destructive">{errors.portfolio?.message}</p>
        </div>
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save & Continue"}
      </Button>
    </form>
  );
}