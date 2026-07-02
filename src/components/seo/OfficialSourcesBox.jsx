import React from "react";
import { Link, ExternalLink } from "lucide-react";

export default function OfficialSourcesBox({ sources = [] }) {
  if (!sources || sources.length === 0) return null;

  return (
    <div className="glass-panel rounded-xl p-6 my-8 border border-[var(--glass-border)] bg-[var(--glass-bg)]">
      <div className="flex items-center gap-2 mb-4 text-[var(--text-primary)]">
        <Link className="w-5 h-5 text-[#38bdf8]" />
        <h3 className="text-lg font-bold m-0">Official Sources Used</h3>
      </div>
      <ul className="space-y-3 m-0 p-0 list-none">
        {sources.map((source, index) => (
          <li key={index} className="flex items-start gap-2">
            <ExternalLink className="w-4 h-4 mt-1 text-[var(--text-secondary)] opacity-70 flex-shrink-0" />
            <a 
              href={source.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[var(--text-primary)] hover:text-[#38bdf8] transition-colors text-sm md:text-base underline underline-offset-4 decoration-[var(--border-color)] hover:decoration-[#38bdf8]"
            >
              {source.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
