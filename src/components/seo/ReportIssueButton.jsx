import React from "react";
import { AlertCircle } from "lucide-react";

export default function ReportIssueButton({ 
  email = "daxpatel093@gmail.com",
  subject = "Issue Report on KaroTools" 
}) {
  const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}`;
  
  return (
    <div className="mt-8 mb-4">
      <a 
        href={mailtoLink}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--glass-bg)] border border-[var(--border-color)] hover:border-red-400 hover:text-red-400 text-[var(--text-secondary)] transition-colors text-sm no-underline"
      >
        <AlertCircle className="w-4 h-4" />
        <span>Report an incorrect calculation or outdated rule</span>
      </a>
    </div>
  );
}
