"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const LEVELS = ["Fresher / Student", "1-2 years", "3-5 years", "5-8 years", "8+ years"];

interface ExperienceLevelSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export function ExperienceLevelSelect({ value, onChange }: ExperienceLevelSelectProps) {
  return (
    <div className="space-y-2">
      <Label>Experience Level</Label>
      <Select onValueChange={onChange} value={value}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select experience level" />
        </SelectTrigger>
        <SelectContent>
          {LEVELS.map((l) => (
            <SelectItem key={l} value={l}>{l}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}