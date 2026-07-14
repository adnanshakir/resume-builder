"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  id: string;
  label: string;
}

interface ResumeStepperProps {
  steps: Step[];
  currentStep: number;
  onStepClick: (index: number) => void;
}

export function ResumeStepper({ steps, currentStep, onStepClick }: ResumeStepperProps) {
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="space-y-3">
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <div className="h-full bg-primary transition-all duration-300" style={{ width: `${progress}%` }} />
      </div>

      <div className="flex flex-wrap gap-2">
        {steps.map((step, index) => (
          <button
            key={step.id}
            onClick={() => onStepClick(index)}
            disabled={index > currentStep}
            className={cn(
              "flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs transition-colors",
              index === currentStep && "border-primary bg-primary/10 text-primary",
              index < currentStep && "border-muted-foreground/20 text-muted-foreground",
              index > currentStep && "cursor-not-allowed border-muted-foreground/10 text-muted-foreground/40",
            )}
          >
            {index < currentStep && <Check className="h-3 w-3" />}
            {step.label}
          </button>
        ))}
      </div>
    </div>
  );
}
