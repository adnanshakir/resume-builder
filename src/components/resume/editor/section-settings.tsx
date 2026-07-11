"use client";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { buttonVariants } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowUp, ArrowDown, Settings2 } from "lucide-react";
import { cn } from "@/lib/utils";

const SECTION_LABELS: Record<string, string> = {
  experience: "Experience",
  projects: "Projects",
  education: "Education",
  certifications: "Certifications",
};
const ALL_SECTIONS = ["experience", "projects", "education", "certifications"];

interface SectionSettingsProps {
  sectionOrder: string[];
  onChange: (order: string[]) => void;
}

export function SectionSettings({ sectionOrder, onChange }: SectionSettingsProps) {
  const toggle = (id: string) => {
    onChange(sectionOrder.includes(id) ? sectionOrder.filter((s) => s !== id) : [...sectionOrder, id]);
  };

  const move = (id: string, dir: -1 | 1) => {
    const idx = sectionOrder.indexOf(id);
    const newIdx = idx + dir;
    if (newIdx < 0 || newIdx >= sectionOrder.length) return;
    const next = [...sectionOrder];
    [next[idx], next[newIdx]] = [next[newIdx], next[idx]];
    onChange(next);
  };

  return (
    <Popover>
      <PopoverTrigger className={cn(buttonVariants({ variant: "outline", size: "sm" }))}>
        <Settings2 className="h-3.5 w-3.5" /> Sections
      </PopoverTrigger>
      <PopoverContent className="w-64 space-y-3">
        <p className="text-xs text-muted-foreground">Choose sections to include and reorder them.</p>
        {ALL_SECTIONS.map((id) => {
          const included = sectionOrder.includes(id);
          const idx = sectionOrder.indexOf(id);
          return (
            <div key={id} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Checkbox checked={included} onCheckedChange={() => toggle(id)} />
                <span className="text-sm">{SECTION_LABELS[id]}</span>
              </div>
              {included && (
                <div className="flex gap-1 text-muted-foreground">
                  <button onClick={() => move(id, -1)} disabled={idx === 0} className="disabled:opacity-30">
                    <ArrowUp className="h-3.5 w-3.5" />
                  </button>
                  <button onClick={() => move(id, 1)} disabled={idx === sectionOrder.length - 1} className="disabled:opacity-30">
                    <ArrowDown className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </PopoverContent>
    </Popover>
  );
}