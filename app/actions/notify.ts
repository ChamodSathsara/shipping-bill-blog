"use server";
export async function notifyAction(_previousState: unknown, formData: FormData) { const email = String(formData.get("email") ?? ""); return { success: false, message: email ? "Notifications are not connected yet." : "Enter an email address." }; }
