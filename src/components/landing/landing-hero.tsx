"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Sparkles, Target, FileCheck } from "lucide-react";
import { useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useMotionValueEvent, useSpring } from "motion/react";

const trustPoints = [
  { icon: Sparkles, label: "AI-written, fully editable" },
  { icon: Target, label: "Built-in ATS scoring" },
  { icon: FileCheck, label: "Real, selectable-text PDF" },
];

export function LandingHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { damping: 30, stiffness: 200, mass: 0.5 });
  const y = useSpring(rawY, { damping: 30, stiffness: 200, mass: 0.5 });

  const [pos, setPos] = useState({ x: 0, y: 0 });

  // keep React state in sync with the spring so we can read it in inline styles
  useMotionValueEvent(x, "change", (latest) => setPos((p) => ({ ...p, x: latest })));
  useMotionValueEvent(y, "change", (latest) => setPos((p) => ({ ...p, y: latest })));

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.closest("[data-no-grid-glow]")) {
      setVisible(false);
      return;
    }

    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set(e.clientX - rect.left);
    rawY.set(e.clientY - rect.top);
    setVisible(true);
  };

  const handleMouseLeave = useCallback(() => {
    setVisible(false);
  }, []);

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex h-screen flex-col items-center justify-center overflow-hidden px-6 py-20 text-center "
    >
      {/* Base static grid — unchanged */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle, var(--foreground) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage: "radial-gradient(ellipse 60% 50% at 50% 40%, black 20%, transparent 85%)",
          WebkitMaskImage: "radial-gradient(ellipse 60% 50% at 50% 40%, black 20%, transparent 85%)",
          opacity: 0.25,
        }}
      />

      {/* Cursor-following glow layer, now trailing via spring */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-500 ease-out"
        style={{
          backgroundImage: "radial-gradient(circle, var(--foreground) 1.6px, transparent 1.5px)",
          backgroundSize: "28px 28px",
          opacity: visible ? 0.9 : 0,
          maskImage: `radial-gradient(180px circle at ${pos.x}px ${pos.y}px, black, transparent)`,
          WebkitMaskImage: `radial-gradient(180px circle at ${pos.x}px ${pos.y}px, black, transparent)`,
        }}
      />

      <motion.div
        initial={{ opacity: 0, filter: "blur(10px)", y: 12 }}
        whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative mx-auto max-w-3xl space-y-7"
      >
        <h1 className="mx-auto max-w-3xl text-balance text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl">
          Build a resume that gets you hired, in minutes.
        </h1>

        <p className="mx-auto max-w-xl text-balance text-lg text-muted-foreground">
          Tell us your role and skills. AI drafts the summary, experience, and skills sections —
          you stay in control, editing and approving every line before it's yours.
        </p>

        <div className="flex justify-center pt-2">
          <Link
            href="/auth/register"
            data-no-grid-glow
            className={cn(buttonVariants({ size: "lg" }), "px-8 text-base")}
          >
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