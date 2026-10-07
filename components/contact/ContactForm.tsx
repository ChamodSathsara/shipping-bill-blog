"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { CheckCircle2Icon, Loader2Icon, SendIcon } from "lucide-react";
import type { ContactFormValues } from "../../lib/types/site";
import { buttonVariants } from "../../lib/utils/buttonVariants";
import { cn } from "../../lib/utils/cn";
import { submitContact } from "../../lib/utils/formActions";

const subjects = [
{ value: "general", label: "General question" },
{ value: "support", label: "Help with a tool" },
{ value: "feedback", label: "Feature request" },
{ value: "partnership", label: "Partnership" },
{ value: "advertising", label: "Advertising" }];


const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name."),
  email: z.string().trim().email("Enter a valid email address."),
  subject: z.string().min(1, "Choose a subject."),
  message: z.string().trim().min(20, "Please write at least 20 characters.").max(2000, "Keep it under 2,000 characters.")
});

const inputClass =
"w-full rounded-lg border border-border bg-background px-3.5 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring aria-[invalid=true]:border-destructive";

function FieldError({ id, message }: {id: string;message?: string;}) {
  if (!message) return null;
  return <p id={id} role="alert" className="mt-1.5 text-sm text-destructive">{message}</p>;
}

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<ContactFormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", subject: "", message: "" }
  });

  async function onSubmit(values: ContactFormValues) {
    const result = await submitContact(values);
    if (result.ok) {
      toast.success(result.message);
      reset();
      setSent(true);
    } else {
      toast.error(result.message);
    }
  }

  if (sent) {
    return (
      <div role="status" className="rounded-xl border border-border bg-card p-8 text-center">
        <CheckCircle2Icon className="mx-auto h-10 w-10 text-primary" aria-hidden="true" />
        <h2 className="mt-4 font-display text-xl font-bold text-foreground">Message sent</h2>
        <p className="mt-2 text-muted-foreground">Thanks for reaching out. We'll reply to your email soon.</p>
        <button type="button" onClick={() => setSent(false)} className={buttonVariants({ variant: "secondary", className: "mt-6" })}>
          Send another message
        </button>
      </div>);

  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5 rounded-xl border border-border bg-card p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-sm font-semibold text-foreground">Name</label>
          <input id="name" autoComplete="name" className={cn(inputClass, "mt-1.5 h-11")} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "name-error" : undefined} {...register("name")} />
          <FieldError id="name-error" message={errors.name?.message} />
        </div>
        <div>
          <label htmlFor="email" className="text-sm font-semibold text-foreground">Email</label>
          <input id="email" type="email" autoComplete="email" className={cn(inputClass, "mt-1.5 h-11")} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} {...register("email")} />
          <FieldError id="email-error" message={errors.email?.message} />
        </div>
      </div>
      <div>
        <label htmlFor="subject" className="text-sm font-semibold text-foreground">Subject</label>
        <select id="subject" className={cn(inputClass, "mt-1.5 h-11")} aria-invalid={Boolean(errors.subject)} aria-describedby={errors.subject ? "subject-error" : undefined} {...register("subject")}>
          <option value="" disabled>Choose a subject</option>
          {subjects.map((s) =>
          <option key={s.value} value={s.value}>{s.label}</option>
          )}
        </select>
        <FieldError id="subject-error" message={errors.subject?.message} />
      </div>
      <div>
        <label htmlFor="message" className="text-sm font-semibold text-foreground">Message</label>
        <textarea id="message" rows={6} placeholder="How can we help?" className={cn(inputClass, "mt-1.5 resize-y py-3")} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "message-error" : undefined} {...register("message")} />
        <FieldError id="message-error" message={errors.message?.message} />
      </div>
      <button type="submit" disabled={isSubmitting} className={buttonVariants({ size: "lg", className: "w-full sm:w-auto" })}>
        {isSubmitting ? <Loader2Icon className="h-4 w-4 animate-spin" aria-hidden="true" /> : <SendIcon className="h-4 w-4" aria-hidden="true" />}
        {isSubmitting ? "Sending…" : "Send message"}
      </button>
    </form>);

}