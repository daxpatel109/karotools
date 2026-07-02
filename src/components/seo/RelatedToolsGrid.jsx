import React from "react";
import Link from "next/link";
import { Wrench } from "lucide-react";

export default function RelatedToolsGrid({ tools = [] }) {
  if (!tools || tools.length === 0) return null;

  return (
    <div className="my-10 pt-6 border-t border-[var(--border-color)]">
      <div className="flex items-center gap-2 mb-6">
        <Wrench className="w-5 h-5 text-[#38bdf8]" />
        <h3 className="text-2xl font-bold m-0 text-[var(--text-primary)]">Related Tools</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tools.map((tool, idx) => (
          <Link 
            key={idx} 
            href={tool.href}
            className="glass-panel p-5 rounded-xl border border-[var(--glass-border)] hover:border-[#38bdf8] transition-all group flex flex-col gap-2 no-underline"
          >
            <div className="text-2xl">{tool.icon || "🔧"}</div>
            <strong className="text-[var(--text-primary)] text-lg group-hover:text-[#38bdf8] transition-colors">{tool.title}</strong>
            <span className="text-[var(--text-secondary)] text-sm">{tool.description}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
