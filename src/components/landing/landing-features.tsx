"use client";

import { motion } from "motion/react";
import { ArrowUpRight, FileText, Target, Download, ShieldCheck } from "lucide-react";

export function LandingFeatures() {
  return (
    <section className="relative flex min-h-screen flex-col justify-center border-t px-6 py-24">
      <div className="mx-auto w-full max-w-5xl space-y-16">
        <motion.div
          initial={{ opacity: 0, filter: "blur(8px)", y: 12 }}
          whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="space-y-2"
        >
          <h2 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl">
            From blank page to finished resume.
          </h2>
          <p className="text-lg text-muted-foreground">No blinking cursor. Just answer a few prompts.</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Large tile: AI writes every section */}
          <motion.div
            initial={{ opacity: 0, filter: "blur(8px)", y: 20 }}
            whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative flex min-h-[320px] flex-col justify-between overflow-hidden rounded-3xl bg-amber-400 p-8 text-black sm:col-span-2"
          >
            <div className="space-y-2">
              <h3 className="text-3xl font-bold sm:text-4xl">AI writes every section</h3>
              <p className="max-w-md text-sm text-black/70">
                Summary, experience bullets, project descriptions, and skills — generated, editable, and yours to refine.
              </p>
            </div>
            <div className="flex items-end justify-between">
              <div className="space-y-0.5">
                <p className="text-xs font-medium text-black/60">Powered by</p>
                <p className="text-xl font-bold">Gemini</p>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-black/10">
                <ArrowUpRight className="h-5 w-5" />
              </div>
            </div>
          </motion.div>

          {/* Fill in basics */}
          <motion.div
            initial={{ opacity: 0, filter: "blur(8px)", y: 20 }}
            whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="flex min-h-[220px] flex-col justify-between rounded-3xl bg-teal-500 p-7 text-white"
          >
            <FileText className="h-7 w-7" />
            <div className="space-y-1">
              <h3 className="text-xl font-bold">Fill in the basics</h3>
              <p className="text-sm text-white/80">Your role, experience, and skills. That's it.</p>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15">
              <ArrowUpRight className="h-4 w-4" />
            </div>
          </motion.div>

          {/* ATS score */}
          <motion.div
            initial={{ opacity: 0, filter: "blur(8px)", y: 20 }}
            whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            className="flex min-h-[220px] flex-col justify-between rounded-3xl bg-pink-400 p-7 text-black"
          >
            <Target className="h-7 w-7" />
            <div className="space-y-1">
              <h3 className="text-xl font-bold">Check your ATS score</h3>
              <p className="text-sm text-black/70">Real feedback on keyword match and clarity.</p>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-black/10">
              <ArrowUpRight className="h-4 w-4" />
            </div>
          </motion.div>

          {/* You approve everything */}
          <motion.div
            initial={{ opacity: 0, filter: "blur(8px)", y: 20 }}
            whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
            className="flex min-h-[220px] flex-col justify-between rounded-3xl border bg-muted/30 p-7"
          >
            <ShieldCheck className="h-7 w-7 text-primary" />
            <div className="space-y-1">
              <h3 className="text-xl font-bold">You approve everything</h3>
              <p className="text-sm text-muted-foreground">Nothing saves automatically — every line is yours to edit first.</p>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
              <ArrowUpRight className="h-4 w-4 text-primary" />
            </div>
          </motion.div>

          {/* Export a real PDF */}
          <motion.div
            initial={{ opacity: 0, filter: "blur(8px)", y: 20 }}
            whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
            className="relative flex min-h-[220px] flex-col justify-between overflow-hidden rounded-3xl bg-neutral-900 p-7 text-white dark:bg-white dark:text-black"
          >
            <Download className="h-7 w-7" />
            <div className="space-y-1">
              <h3 className="text-xl font-bold">Export a real PDF</h3>
              <p className="text-sm opacity-70">Selectable text, built to pass real ATS parsers.</p>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 dark:bg-black/10">
              <ArrowUpRight className="h-4 w-4" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Blurred white mask transitioning into footer */}
      <div
        className="pointer-events-none absolute inset-x-0 -bottom-0 h-40"
        style={{
          background: "linear-gradient(to bottom, transparent, white)",
          backdropFilter: "blur(20px)",
          maskImage: "linear-gradient(to bottom, transparent, black)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent, black)",
        }}
      />
    </section>
  );
}