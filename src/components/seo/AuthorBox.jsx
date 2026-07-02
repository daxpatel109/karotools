import React from "react";
import { User, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function AuthorBox({ 
  name = "KaroTools Team", 
  role = "Maintained by KaroTools",
  description = "Free online tools for Indian freelancers & small businesses.",
  href = "/about"
}) {
  return (
    <div className="glass-panel rounded-xl p-6 my-8 border border-[var(--glass-border)] bg-[var(--glass-bg)] flex flex-col sm:flex-row gap-4 items-start sm:items-center">
      <div className="w-16 h-16 rounded-full bg-[var(--border-color)] flex items-center justify-center flex-shrink-0">
        <User className="w-8 h-8 text-[var(--text-secondary)]" />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <strong className="text-[var(--text-primary)] text-lg">{name}</strong>
          <ShieldCheck className="w-4 h-4 text-green-400" title="Verified Maintainer" />
        </div>
        <div className="text-[#38bdf8] text-sm mb-2">{role}</div>
        <p className="text-[var(--text-secondary)] text-sm m-0 leading-relaxed">{description}</p>
      </div>
      <Link href={href} className="interactive-btn px-4 py-2 rounded-lg text-sm whitespace-nowrap mt-4 sm:mt-0 no-underline text-white text-center">
        Read More
      </Link>
    </div>
  );
}
