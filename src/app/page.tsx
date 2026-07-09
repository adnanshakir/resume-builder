"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, FileText } from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border bg-muted"
        >
          <FileText className="h-8 w-8" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="max-w-4xl text-5xl font-bold tracking-tight md:text-6xl"
        >
          Build ATS-friendly resumes with AI.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2 }}
          className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground"
        >
          Generate professional summaries, improve work experience, optimize for
          ATS, and export polished resumes—all from one guided workflow.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.3 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            href="/auth/register"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Get Started
            <ArrowRight className="h-4 w-4" />
          </Link>

          <Link
            href="/auth/login"
            className="inline-flex items-center rounded-lg border px-6 py-3 text-sm font-medium transition-colors hover:bg-muted"
          >
            Log In
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
          className="mt-20 grid gap-6 md:grid-cols-3"
        >
          <Feature
            title="AI Writing"
            description="Generate summaries, work experience, and project descriptions."
          />
          <Feature
            title="ATS Optimization"
            description="Improve keyword relevance and check your ATS score."
          />
          <Feature
            title="PDF Export"
            description="Download a clean, professional resume ready to share."
          />
        </motion.div>
      </div>
    </main>
  );
}

function Feature({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border bg-card p-6 text-left">
      <h3 className="mb-2 font-semibold">{title}</h3>
      <p className="text-sm leading-6 text-muted-foreground">
        {description}
      </p>
    </div>
  );
}