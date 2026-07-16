"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FaGithub, FaTwitter } from "react-icons/fa";

export function LandingFooter() {
  return (
    <footer className="relative flex min-h-[45vh] flex-col justify-between overflow-hidden border-amber-200 bg-white text-black dark:bg-white dark:text-black rounded-t-[6rem]">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-40"
        style={{
          background: "linear-gradient(to top, transparent, yellow)",
          backdropFilter: "blur(20px)",
          maskImage: "linear-gradient(to top, transparent, black)",
          WebkitMaskImage: "linear-gradient(to top, transparent, black)",
        }}
      />
      <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, filter: "blur(10px)", y: 12 }}
          whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-lg space-y-6"
        >
          <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">Your next resume starts here.</h2>
          <Link href="/auth/register" className={cn(buttonVariants({ size: "lg" }), "bg-black px-8 text-base text-white hover:bg-black/90")}>
            Get started — it's free
          </Link>
        </motion.div>
      </div>

      <div className="border-t border-black/10 px-6 py-6">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-4 text-xs text-black/50">
            <span>© {new Date().getFullYear()} Resume Builder</span>
            <span className="hidden sm:inline">·</span>
            <span>
              Built by{" "}
              <a href="https://github.com/adnanshakir" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-black">
                Adnan
              </a>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a href="https://github.com/adnanshakir" target="_blank" rel="noopener noreferrer" className="text-black/40 hover:text-black">
              <FaGithub className="h-4 w-4" />
            </a>
            <a href="https://x.com/adnanxshakir" target="_blank" rel="noopener noreferrer" className="text-black/40 hover:text-black">
              <FaTwitter className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
