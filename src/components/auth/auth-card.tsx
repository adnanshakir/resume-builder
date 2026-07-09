"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { motion } from "motion/react";

interface AuthCardProps {
  title: string;
  description: string;
  fields: React.ReactNode;
  action: React.ReactNode;
  footer: React.ReactNode;
}

export function AuthCard({ title, description, fields, action, footer }: AuthCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <Card className="w-full max-w-sm overflow-hidden py-0 gap-0">
        <CardContent className="space-y-4 px-6 pt-6 pb-6">
          <div className="space-y-1 mb-6">
            <h1 className="text-2xl font-semibold">{title}</h1>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
          {fields}
        </CardContent>

        <Separator />

        <div className="space-y-3 bg-muted/40 px-6 py-5">
          {action}
          <p className="text-sm text-center text-muted-foreground">{footer}</p>
        </div>
      </Card>
    </motion.div>
  );
}
