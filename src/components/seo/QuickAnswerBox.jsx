import React from "react";
import { Info, Calendar } from "lucide-react";

export default function QuickAnswerBox({ title = "Quick Answer", children, updatedDate }) {
  return (
    <div className="glass-panel rounded-xl p-6 mb-8 border border-[var(--glass-border)] bg-[var(--glass-bg)] shadow-sm">
      <div className="flex items-center gap-2 mb-3 text-[var(--text-primary)]">
        <Info className="w-5 h-5 text-[#38bdf8]" />
        <h2 className="text-xl font-bold m-0">{title}</h2>
      </div>
      
      <div className="text-[var(--text-secondary)] leading-relaxed text-base">
        {children}
      </div>

      {updatedDate && (
        <div className="mt-4 pt-3 border-t border-[var(--border-color)] flex items-center gap-2 text-sm text-[var(--text-secondary)] opacity-80">
          <Calendar className="w-4 h-4" />
          <span>Last Updated: {updatedDate}</span>
        </div>
      )}
    </div>
  );
}
