import type { ActionResult, ContactFormValues } from "../types/site";

// Placeholder actions. Replace the bodies with real API / server calls later.
// They intentionally simulate network latency so loading states are visible.

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function submitContact(values: ContactFormValues): Promise<ActionResult> {
  await wait(900);
  if (!values.email) return { ok: false, message: "Something went wrong. Please try again." };
  return { ok: true, message: "Thanks — your message is on its way. We usually reply within 1–2 business days." };
}

export async function subscribeNotify(email: string, productSlug: string): Promise<ActionResult> {
  await wait(800);
  if (!email || !productSlug) return { ok: false, message: "We couldn't save your email. Please try again." };
  return { ok: true, message: "You're on the list. We'll email you the day this tool goes live." };
}
