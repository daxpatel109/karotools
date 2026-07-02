import React from "react";
import { Calculator } from "lucide-react";

export default function CalculatorFormulaBox({ title = "How is this calculated?", formula, explanation, example }) {
  return (
    <div className="glass-panel rounded-xl p-6 my-8 border border-[var(--glass-border)] bg-opacity-50">
      <div className="flex items-center gap-2 mb-4 text-[var(--text-primary)]">
        <Calculator className="w-5 h-5 text-green-400" />
        <h3 className="text-lg font-bold m-0">{title}</h3>
      </div>
      
      {formula && (
        <div className="bg-black bg-opacity-40 rounded-lg p-4 mb-4 border border-[var(--border-color)] font-mono text-sm text-[#38bdf8] overflow-x-auto whitespace-pre-wrap">
          {formula}
        </div>
      )}

      {explanation && (
        <div className="text-[var(--text-secondary)] mb-4 text-sm md:text-base leading-relaxed">
          {explanation}
        </div>
      )}

      {example && (
        <div className="bg-white bg-opacity-5 rounded-lg p-4 border-l-2 border-[#38bdf8]">
          <strong className="text-[var(--text-primary)] text-sm uppercase tracking-wider mb-2 block">Example</strong>
          <div className="text-[var(--text-secondary)] text-sm md:text-base leading-relaxed">
            {example}
          </div>
        </div>
      )}
    </div>
  );
}
