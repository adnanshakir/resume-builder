"use client";

import { FileText, Sparkles, Target, Download } from "lucide-react";
import { motion, type Variants } from "motion/react";

const steps = [
  {
    number: "01",
    icon: FileText,
    title: "Fill in the basics",
    description: "Your target role, experience level, and skills — that's all it needs to get started.",
  },
  {
    number: "02",
    icon: Sparkles,
    title: "AI writes every section",
    description: "Summary, experience, projects, and skills — generated, editable, and yours to refine.",
  },
  {
    number: "03",
    icon: Target,
    title: "Check your ATS score",
    description: "Get real feedback on keyword match, clarity, and structure before you apply.",
  },
  {
    number: "04",
    icon: Download,
    title: "Export a real PDF",
    description: "A true vector PDF with selectable text, built to pass through ATS parsers.",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.25 },
  },
};

const rowVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function LandingFeatures() {
  return (
    <section className="relative border-t px-6 py-28">
      <div className="mx-auto w-full max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16 space-y-2 text-center"
        >
          <h2 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl">
            From blank page to finished resume.
          </h2>
          <p className="text-lg text-muted-foreground">No blinking cursor. Just answer a few prompts.</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="divide-y"
        >
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <motion.div key={step.number} variants={rowVariants} className="flex items-start gap-5 py-8">
                <span className="w-6 shrink-0 text-sm font-medium text-muted-foreground/50">{step.number}</span>
                <Icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <div className="space-y-1">
                  <h3 className="font-semibold">{step.title}</h3>
                  <p className="text-sm leading-6 text-muted-foreground">{step.description}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}