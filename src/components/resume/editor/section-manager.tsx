"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
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
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const excluded = ALL_SECTIONS.filter((id) => !sectionOrder.includes(id));

  const toggle = (id: string) => {
    onChange(
      sectionOrder.includes(id)
        ? sectionOrder.filter((s) => s !== id)
        : [...sectionOrder, id],
    );
  };

  return (
    <Sheet>
      <SheetTrigger className={cn(buttonVariants({ variant: "outline", size: "sm" }))}>
        <ListChecks className="h-3.5 w-3.5" /> Manage Sections
      </SheetTrigger>
      <SheetContent side="left" className="w-80">
        <SheetHeader>
          <SheetTitle>Manage Sections</SheetTitle>
        </SheetHeader>

        <div className="space-y-6 px-4">
          <div className="space-y-1">
            <p className="text-xs font-medium text-muted-foreground">Included — drag to reorder</p>
            <div className="space-y-1">
              {sectionOrder.map((id) => (
                <div
                  key={id}
                  draggable
                  onDragStart={() => setDraggedId(id)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => {
                    if (!draggedId || draggedId === id) return;
                    const withoutDragged = sectionOrder.filter((item) => item !== draggedId);
                    const targetIndex = withoutDragged.indexOf(id);
                    withoutDragged.splice(targetIndex, 0, draggedId);
                    onChange(withoutDragged);
                    setDraggedId(null);
                  }}
                  className={cn(
                    "flex cursor-grab items-center gap-2 rounded-md border bg-background px-3 py-2 text-sm active:cursor-grabbing",
                    draggedId === id && "opacity-40",
                  )}
                >
                  <GripVertical className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <Checkbox checked onCheckedChange={() => toggle(id)} />
                  <span>{SECTION_LABELS[id] ?? id}</span>
                </div>
              ))}
            </div>
          </div>

          {!!excluded.length && (
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground">Not included</p>
              <div className="space-y-1">
                {excluded.map((id) => (
                  <div
                    key={id}
                    className="flex items-center gap-2 rounded-md border border-dashed px-3 py-2 text-sm text-muted-foreground"
                  >
                    <div className="w-4" />
                    <Checkbox checked={false} onCheckedChange={() => toggle(id)} />
                    <span>{SECTION_LABELS[id] ?? id}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}