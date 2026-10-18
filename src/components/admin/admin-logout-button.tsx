"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function AdminLogoutButton() {
  const router = useRouter();
  const [error, setError] = useState("");

  async function logout() {
    setError("");
    try {
      const response = await fetch("/api/auth/logout", { method: "POST" });
      if (!response.ok) {
        setError("Could not log out. Please try again.");
        return;
      }
      router.replace("/admin/login");
      router.refresh();
    } catch {
      setError("Could not log out. Please try again.");
    }
  }

  return (
    <div>
      <button
        className="flex w-full items-center justify-between rounded-full border border-transparent px-4 py-3 text-left text-sm uppercase tracking-[0.18em] text-[var(--muted)] transition hover:border-[var(--border)] hover:bg-[var(--panel-hover)] hover:text-[var(--ivory)]"
        onClick={logout}
        type="button"
      >
        Logout
      </button>
      {error && <p className="px-4 text-xs text-red-700" role="alert">{error}</p>}
    </div>
  );
}
