"use server";
export async function contactAction(_previousState: unknown, formData: FormData) { const email = String(formData.get("email") ?? ""); return { success: false, message: email ? "Contact delivery is not connected yet." : "Enter your contact details." }; }
