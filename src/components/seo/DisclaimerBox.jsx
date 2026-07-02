import React from "react";
import { AlertTriangle } from "lucide-react";

export default function DisclaimerBox({ 
  text = "This tool is for educational purposes only. Tax rules may change. Please verify with official government sources or consult a qualified professional before making financial decisions." 
}) {
  return (
    <div className="bg-yellow-500 bg-opacity-10 border border-yellow-500 border-opacity-30 rounded-xl p-5 my-8 flex items-start gap-3">
      <AlertTriangle className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-0.5" />
      <div className="text-yellow-200 text-sm md:text-base leading-relaxed">
        <strong className="text-yellow-500">Disclaimer:</strong> {text}
      </div>
    </div>
  );
}
