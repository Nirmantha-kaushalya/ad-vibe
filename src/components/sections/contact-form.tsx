"use client";

import { Send } from "lucide-react";
import { useState, type FormEvent } from "react";

type ResponseBody = { error?: string; success?: boolean };

const fieldClassName = "w-full border-b border-[var(--border)] bg-transparent px-1 py-3 text-sm text-[var(--ivory)] outline-none transition-colors placeholder:text-[#999990] focus:border-[var(--gold)]";

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ kind: "success" | "error"; text: string } | null>(null);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting) return;
    const form = event.currentTarget;
    const fields = new FormData(form);
    setIsSubmitting(true);
    setStatus(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fields.get("name"),
          email: fields.get("email"),
          subject: fields.get("subject"),
          message: fields.get("message"),
          company: fields.get("company"),
        }),
      });
      const result = (await response.json()) as ResponseBody;
      if (!response.ok) {
        setStatus({ kind: "error", text: result.error ?? "We couldn’t send your note. Please try again." });
        return;
      }
      form.reset();
      setStatus({ kind: "success", text: "Your note is with us. We’ll be in touch soon." });
    } catch {
      setStatus({ kind: "error", text: "We couldn’t reach the studio just now. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="border-t border-[var(--border)] pt-6 md:pt-9" onSubmit={submit}>
      <div className="grid gap-7 sm:grid-cols-2">
        <label className="block text-[10px] uppercase tracking-[0.15em] text-[var(--muted)]">
          Your name
          <input className={fieldClassName} autoComplete="name" maxLength={120} name="name" placeholder="What should we call you?" required />
        </label>
        <label className="block text-[10px] uppercase tracking-[0.15em] text-[var(--muted)]">
          Email address
          <input className={fieldClassName} autoComplete="email" maxLength={254} name="email" placeholder="you@example.com" required type="email" />
        </label>
      </div>

      <label className="mt-7 block text-[10px] uppercase tracking-[0.15em] text-[var(--muted)]">
        What do you need?
        <input className={fieldClassName} maxLength={160} name="subject" placeholder="Identity, packaging, a good idea..." required />
      </label>

      <label className="mt-7 block text-[10px] uppercase tracking-[0.15em] text-[var(--muted)]">
        Tell us a little about it
        <textarea className={`${fieldClassName} min-h-36 resize-y`} maxLength={5000} minLength={10} name="message" placeholder="What are you making? What would success look like?" required />
      </label>

      <label aria-hidden="true" className="absolute -left-[10000px] h-px w-px overflow-hidden">
        Company
        <input autoComplete="off" name="company" tabIndex={-1} />
      </label>

      {status && (
        <p aria-live="polite" className={`mt-5 text-sm ${status.kind === "success" ? "text-emerald-800" : "text-red-700"}`} role={status.kind === "error" ? "alert" : "status"}>
          {status.text}
        </p>
      )}

      <button
        className="group mt-8 inline-flex items-center justify-center gap-6 rounded-full bg-[#252620] px-6 py-4 text-[10px] uppercase tracking-[0.17em] text-white transition hover:bg-[var(--gold)] disabled:cursor-wait disabled:opacity-60"
        disabled={isSubmitting}
        type="submit"
      >
        {isSubmitting ? "Sending your note..." : "Send us a note"}
        {!isSubmitting && <Send size={14} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5" />}
      </button>
    </form>
  );
}
