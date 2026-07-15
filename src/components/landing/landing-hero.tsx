"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Sparkles, Target, FileCheck } from "lucide-react";

const trustPoints = [
  { icon: Sparkles, label: "AI-written, fully editable" },
  { icon: Target, label: "Built-in ATS scoring" },
  { icon: FileCheck, label: "Real, selectable-text PDF" },
];

export function LandingHero() {
  return (
    <section className="relative flex min-h-[calc(100vh-100px)] flex-col items-center justify-center overflow-hidden px-6 py-20 text-center">
      <motion.div
        initial={{ opacity: 0, filter: "blur(10px)", y: 12 }}
        whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="mx-auto max-w-3xl space-y-7"
      >
        <h1 className="mx-auto max-w-3xl text-balance text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl">
          Build a resume that gets you hired, in minutes.
        </h1>

        <p className="mx-auto max-w-xl text-balance text-lg text-muted-foreground">
          Tell us your role and skills. AI drafts the summary, experience, and skills sections —
          you stay in control, editing and approving every line before it's yours.
        </p>

        <div className="flex justify-center pt-2">
          <Link href="/auth/register" className={cn(buttonVariants({ size: "lg" }), "px-8 text-base")}>
            Build your resume — free
          </Link>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-4 text-sm text-muted-foreground">
          {trustPoints.map((point) => (
            <span key={point.label} className="flex items-center gap-1.5">
              <point.icon className="h-3.5 w-3.5" />
              {point.label}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Fade to dark, transitioning into the Features section below */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40"
        style={{
          background: "linear-gradient(to bottom, transparent, var(--background))",
          backdropFilter: "blur(16px)",
          maskImage: "linear-gradient(to bottom, transparent, black)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent, black)",
        }}
      />
    </section>
  );
}