"use client";

import React from "react";
import { motion, useScroll } from "framer-motion";

export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX: scrollYProgress }}
      className="fixed inset-x-0 top-0 z-50 h-1 origin-left bg-primary" />);


}