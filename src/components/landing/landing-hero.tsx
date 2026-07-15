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
      {/* Animated gradient background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          animate={{ x: [0, 60, -30, 0], y: [0, -40, 30, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-1/4 top-1/4 h-[420px] w-[420px] rounded-full bg-primary/20 blur-[110px]"
        />
        <motion.div
          animate={{ x: [0, -50, 40, 0], y: [0, 40, -20, 0] }}
          transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-1/4 top-1/3 h-[380px] w-[380px] rounded-full bg-blue-500/15 blur-[110px]"
        />
        <motion.div
          animate={{ x: [0, 30, -50, 0], y: [0, -30, 20, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 left-1/3 h-[340px] w-[340px] rounded-full bg-purple-500/10 blur-[110px]"
        />
      </div>

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
    </section>
  );
}