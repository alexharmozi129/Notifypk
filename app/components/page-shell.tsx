"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { pageTransition } from "./motion";

export default function PageShell({ children }: { children: ReactNode }) {
  return (
    <motion.div initial={pageTransition.initial} animate={pageTransition.animate}>
      {children}
    </motion.div>
  );
}
