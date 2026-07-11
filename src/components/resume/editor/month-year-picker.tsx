"use client";

import { useState } from "react";
import { format, parse } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface MonthYearPickerProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export function MonthYearPicker({ value, onChange, disabled, placeholder = "Select date" }: MonthYearPickerProps) {
  const [open, setOpen] = useState(false);
  const date = value ? parse(value, "MMM yyyy", new Date()) : undefined;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        disabled={disabled}
        className={cn(
          buttonVariants({ variant: "outline" }),
          "w-full justify-start text-left font-normal",
          !value && "text-muted-foreground",
        )}
      >
        <CalendarIcon className="mr-2 h-4 w-4" />
        {value || placeholder}
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          captionLayout="dropdown"
          selected={date}
          onSelect={(d) => {
            if (!d) return;
            onChange(format(d, "MMM yyyy"));
            setOpen(false);
          }}
          defaultMonth={date}
        />
      </PopoverContent>
    </Popover>
  );
}