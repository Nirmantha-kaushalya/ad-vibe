"use client";

import { ArrowUpRight, Mail, MessageCircle, Send } from "lucide-react";
import { useState, type FormEvent } from "react";

type ResponseBody = { error?: string; success?: boolean };
type ContactMethod = "email" | "whatsapp";

const fieldClassName = "w-full border-b border-[var(--border)] bg-transparent px-1 py-3 text-sm text-[var(--ivory)] outline-none transition-colors placeholder:text-[#999990] focus:border-[var(--gold)]";

export function ContactForm() {
  const [method, setMethod] = useState<ContactMethod>("email");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ kind: "success" | "error"; text: string } | null>(null);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting) return;
    const form = event.currentTarget;
    const fields = new FormData(form);
    if (method === "whatsapp") {
      const name = String(fields.get("name") ?? "").trim();
      const subject = String(fields.get("subject") ?? "").trim();
      const email = String(fields.get("email") ?? "").trim();
      const message = String(fields.get("message") ?? "").trim();
      const contactMessage = [
        `Hi, I'm ${name}.`,
        subject ? `I'm interested in: ${subject}.` : "",
        message,
        email ? `My email: ${email}` : "",
      ].filter(Boolean).join("\n\n");
      window.location.assign(`https://wa.me/94728125502?text=${encodeURIComponent(contactMessage)}`);
      return;
    }

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
      <fieldset>
        <legend className="mb-3 text-[10px] font-medium uppercase tracking-[0.15em] text-[var(--muted)]">How would you like to connect?</legend>
        <div className="grid grid-cols-2 gap-3">
          {([
            { value: "email", label: "Email", icon: Mail },
            { value: "whatsapp", label: "WhatsApp", icon: MessageCircle },
          ] as const).map(({ value, label, icon: Icon }) => {
            const active = method === value;
            return (
              <button
                key={value}
                type="button"
                aria-pressed={active}
                onClick={() => { setMethod(value); setStatus(null); }}
                className={`flex min-h-12 items-center justify-center gap-2 rounded-xl border px-3 text-sm transition-colors ${
                  active
                    ? "border-[#252620] bg-[#252620] text-white"
                    : "border-[var(--border)] text-[var(--muted)] hover:border-[var(--gold)]"
                }`}
              >
                <Icon size={16} aria-hidden="true" />
                {label}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="mt-7 grid gap-6 sm:grid-cols-2">
        <label className="block text-[10px] uppercase tracking-[0.15em] text-[var(--muted)]">
          Your name
          <input className={fieldClassName} autoComplete="name" maxLength={120} name="name" placeholder="What should we call you?" required />
        </label>
        <label className="block text-[10px] uppercase tracking-[0.15em] text-[var(--muted)]">
          Email address
          <input className={fieldClassName} autoComplete="email" maxLength={254} name="email" placeholder="you@example.com" required={method === "email"} type="email" />
        </label>
      </div>

      <label className="mt-7 block text-[10px] uppercase tracking-[0.15em] text-[var(--muted)]">
        What do you need?
        <input className={fieldClassName} maxLength={160} name="subject" placeholder="A post, cover, reel..." required={method === "email"} />
      </label>

      <label className="mt-7 block text-[10px] uppercase tracking-[0.15em] text-[var(--muted)]">
        Your message
        <textarea className={`${fieldClassName} min-h-32 resize-y`} maxLength={5000} minLength={10} name="message" placeholder="Tell me a little about your project." required />
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
        className="group mt-7 inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-[#252620] px-6 text-xs font-medium text-white transition hover:bg-[var(--gold)] disabled:cursor-wait disabled:opacity-60"
        disabled={isSubmitting}
        type="submit"
      >
        {isSubmitting ? "Sending..." : method === "email" ? "Send email" : "Continue to WhatsApp"}
        {method === "email" ? (
          <Send size={14} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5" />
        ) : (
          <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        )}
      </button>
    </form>
  );
}
