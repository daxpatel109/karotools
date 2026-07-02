import React from "react";
import { Clock } from "lucide-react";

export default function LastUpdatedBadge({ date = "FY 2025-26", label = "Updated for" }) {
  return (
    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--glass-bg)] border border-[var(--glass-border)] text-xs md:text-sm text-[var(--text-secondary)] mb-6 mt-2">
      <Clock className="w-3.5 h-3.5 text-[#38bdf8]" />
      <span>{label} <strong className="text-[var(--text-primary)]">{date}</strong></span>
    </div>
  );
}
