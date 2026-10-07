"use client";

import React, { useState } from "react";
import { BellIcon, CheckCircle2Icon, Loader2Icon } from "lucide-react";
import { toast } from "sonner";
import { buttonVariants } from "../../lib/utils/buttonVariants";
import { subscribeNotify } from "../../lib/utils/formActions";

type Status = "idle" | "loading" | "success" | "error";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function NotifyForm({ productSlug, productName }: {productSlug: string;productName: string;}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!EMAIL_PATTERN.test(email.trim())) {
      setError("Enter a valid email address.");
      return;
    }
    setError(null);
    setStatus("loading");
    const result = await subscribeNotify(email.trim(), productSlug);
    if (result.ok) {
      setStatus("success");
      toast.success(result.message);
    } else {
      setStatus("error");
      setError(result.message);
    }
  }

  if (status === "success") {
    return (
      <p role="status" className="flex items-center gap-2 rounded-lg bg-accent px-4 py-3 text-sm font-medium text-accent-foreground">
        <CheckCircle2Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
        You're on the list for {productName}.
      </p>);

  }

  return (
    <form onSubmit={handleSubmit} noValidate className="max-w-md">
      <label htmlFor="notify-email" className="text-sm font-semibold text-foreground">
        Get notified when it launches
      </label>
      <div className="mt-2 flex flex-col gap-2 sm:flex-row">
        <input
          id="notify-email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="you@yourshop.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? "notify-error" : "notify-hint"}
          className="h-11 flex-1 rounded-lg border border-border bg-background px-3.5 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring aria-[invalid=true]:border-destructive" />
        
        <button type="submit" disabled={status === "loading"} className={buttonVariants({ size: "md" })}>
          {status === "loading" ? <Loader2Icon className="h-4 w-4 animate-spin" aria-hidden="true" /> : <BellIcon className="h-4 w-4" aria-hidden="true" />}
          Notify me
        </button>
      </div>
      {error ?
      <p id="notify-error" role="alert" className="mt-2 text-sm text-destructive">{error}</p> :

      <p id="notify-hint" className="mt-2 text-sm text-muted-foreground">One email when it's live. No spam, ever.</p>
      }
    </form>);

}