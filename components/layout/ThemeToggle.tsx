"use client";

import React from "react";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { buttonVariants } from "../../lib/utils/buttonVariants";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const dark = resolvedTheme === "dark";
  return (
    <button
      type="button"
      onClick={() => setTheme(dark ? "light" : "dark")}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className={buttonVariants({ variant: "ghost", size: "icon" })}>
      
      {dark ? <SunIcon className="h-5 w-5" aria-hidden="true" /> : <MoonIcon className="h-5 w-5" aria-hidden="true" />}
    </button>);

}
