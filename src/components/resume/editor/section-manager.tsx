"use client";

import { useState, useRef } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { buttonVariants } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { GripVertical, ListChecks } from "lucide-react";
import { cn } from "@/lib/utils";

export const SECTION_LABELS: Record<string, string> = {
  skills: "Skills",
  experience: "Experience",
  projects: "Projects",
  education: "Education",
  certifications: "Certifications",
};
export const ALL_SECTIONS = ["skills", "experience", "projects", "education", "certifications"];

interface SectionManagerProps {
  sectionOrder: string[];
  onChange: (order: string[]) => void;
}

export function SectionManager({ sectionOrder, onChange }: SectionManagerProps) {
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const excluded = ALL_SECTIONS.filter((id) => !sectionOrder.includes(id));

  const toggle = (id: string) => {
    onChange(
      sectionOrder.includes(id)
        ? sectionOrder.filter((s) => s !== id)
        : [...sectionOrder, id],
    );
  };

  const handlePointerDown = (index: number) => {
    setDragIndex(index);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (dragIndex === null || !listRef.current) return;
    const rows = Array.from(listRef.current.querySelectorAll("[data-row]"));
    const y = e.clientY;

    let newHoverIndex = rows.length - 1;
    for (let i = 0; i < rows.length; i++) {
      const rect = rows[i].getBoundingClientRect();
      if (y < rect.top + rect.height / 2) {
        newHoverIndex = i;
        break;
      }
    }
    setHoverIndex(newHoverIndex);
  };

  const handlePointerUp = () => {
    if (dragIndex === null || hoverIndex === null || dragIndex === hoverIndex) {
      setDragIndex(null);
      setHoverIndex(null);
      return;
    }
    const next = [...sectionOrder];
    const [moved] = next.splice(dragIndex, 1);
    next.splice(hoverIndex, 0, moved);
    onChange(next);
    setDragIndex(null);
    setHoverIndex(null);
  };

  return (
    <Popover>
      <PopoverTrigger className={cn(buttonVariants({ variant: "outline", size: "sm" }))}>
        <ListChecks className="h-3.5 w-3.5" /> Manage Sections
      </PopoverTrigger>
      <PopoverContent align="start" className="w-80 space-y-4">
        <div className="space-y-1">
          <p className="text-xs font-medium text-muted-foreground">Included — drag to reorder</p>
          <div
            ref={listRef}
            className="space-y-1"
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={() => { if (dragIndex !== null) handlePointerUp(); }}
          >
            {sectionOrder.map((id, index) => (
              <div
                key={id}
                data-row
                className={cn(
                  "flex items-center gap-2 rounded-md border bg-background px-3 py-2 text-sm transition-transform",
                  dragIndex === index && "z-10 opacity-50",
                  hoverIndex === index && dragIndex !== null && dragIndex !== index && "border-primary",
                )}
              >
                <span
                  onPointerDown={() => handlePointerDown(index)}
                  className="cursor-grab touch-none select-none active:cursor-grabbing"
                >
                  <GripVertical className="h-4 w-4 text-muted-foreground" />
                </span>
                <Checkbox checked onCheckedChange={() => toggle(id)} />
                <span>{SECTION_LABELS[id]}</span>
              </div>
            ))}
          </div>
        </div>

        {!!excluded.length && (
          <div className="space-y-1">
            <p className="text-xs font-medium text-muted-foreground">Not included</p>
            <div className="space-y-1">
              {excluded.map((id) => (
                <div key={id} className="flex items-center gap-2 rounded-md border border-dashed px-3 py-2 text-sm text-muted-foreground">
                  <div className="w-4" />
                  <Checkbox checked={false} onCheckedChange={() => toggle(id)} />
                  <span>{SECTION_LABELS[id]}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}