"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { ArrowUp, ArrowDown } from "lucide-react";

const SECTION_LABELS: Record<string, string> = {
  experience: "Experience",
  projects: "Projects",
  education: "Education",
  certifications: "Certifications",
};
export const ALL_SECTIONS = ["experience", "projects", "education", "certifications"];

interface SectionManagerProps {
  sectionOrder: string[];
  onChange: (order: string[]) => void;
}

export function SectionManager({ sectionOrder, onChange }: SectionManagerProps) {
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
    <div className="space-y-2 rounded-lg border p-3">
      <p className="text-xs font-medium text-muted-foreground">Sections</p>
      {ALL_SECTIONS.map((id) => {
        const included = sectionOrder.includes(id);
        const idx = sectionOrder.indexOf(id);
        return (
          <div key={id} className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <Checkbox checked={included} onCheckedChange={() => toggle(id)} />
              {SECTION_LABELS[id]}
            </label>
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
    </div>
  );
}