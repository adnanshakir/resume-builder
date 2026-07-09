"use client";

import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";

const features = [
  {
    title: "AI Resume Writing",
    description:
      "Generate professional summaries, work experience, and project descriptions tailored to your profile.",
  },
  {
    title: "ATS Optimization",
    description:
      "Improve keyword relevance and analyze your resume with an integrated ATS score.",
  },
  {
    title: "Guided Builder",
    description:
      "Complete one section at a time with AI assistance and live resume previews.",
  },
  {
    title: "Instant Export",
    description:
      "Download a clean, professional PDF that's ready to share with recruiters.",
  },
];

interface AuthLayoutProps {
  children: React.ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Left */}
      <div className="hidden lg:block">
        <div className="sticky top-0 h-screen p-0">
          <div className="flex h-full w-full flex-col justify-center overflow-hidden rounded-r-[60px] bg-muted/40 px-14">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45 }}
              className="max-w-lg space-y-10"
            >
              <div className="space-y-4">
                <span className="text-sm font-medium text-primary">
                  Resume Builder
                </span>

                <motion.h1
                  initial={{ opacity: 0, filter: "blur(8px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="text-4xl font-semibold leading-tight"
                >
                  Build an ATS-friendly resume with AI.
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, filter: "blur(8px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                  className="text-lg leading-8 text-muted-foreground"
                >
                  Create a polished resume by answering a few simple questions.
                  Generate professional content, improve every section, and export
                  a recruiter-ready PDF in minutes.
                </motion.p>
              </div>

              <div className="space-y-5">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 + index * 0.08, duration: 0.4 }}
                    className="flex gap-4"
                  >
                    <div className="mt-1">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-medium">{feature.title}</h3>
                      <p className="text-sm leading-6 text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center justify-center px-6 py-12">
        {children}
      </div>
    </div>
  );
}