import React from "react";
import { UserCheck } from "lucide-react";

export default function FreelancerScenarioBox({ title = "Real Indian Freelancer Scenario", children }) {
  return (
    <div className="glass-panel rounded-xl p-6 my-8 border border-dashed border-[#38bdf8] bg-[#38bdf8] bg-opacity-5">
      <div className="flex items-center gap-2 mb-3 text-[var(--text-primary)]">
        <UserCheck className="w-5 h-5 text-[#38bdf8]" />
        <h3 className="text-lg font-bold m-0">{title}</h3>
      </div>
      <div className="text-[var(--text-secondary)] text-base leading-relaxed italic">
        {children}
      </div>
    </div>
  );
}
