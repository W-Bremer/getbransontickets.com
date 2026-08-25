"use client";

import { Check } from "lucide-react";

export type Step = 1 | 2 | 3;

export const stepLabels = ["Contact Info", "Payment", "Confirmation"];

export function StepIndicator({ current }: { current: Step }) {
  return (
    <div className="flex items-center justify-center gap-0">
      {stepLabels.map((label, i) => {
        const stepNum = (i + 1) as Step;
        const isActive = stepNum === current;
        const isComplete = stepNum < current;

        return (
          <div key={label} className="flex items-center">
            {i > 0 && (
              <div
                className={`h-0.5 w-8 sm:w-16 ${
                  isComplete ? "bg-[#C8102E]" : "bg-gray-200"
                }`}
              />
            )}
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition-all ${
                  isComplete
                    ? "bg-[#C8102E] text-white"
                    : isActive
                      ? "bg-[#13264D] text-white ring-4 ring-[#13264D]/20"
                      : "bg-gray-100 text-[#1A1614]/40"
                }`}
              >
                {isComplete ? <Check className="h-5 w-5" /> : stepNum}
              </div>
              <span
                className={`text-xs font-semibold whitespace-nowrap ${
                  isActive
                    ? "text-[#13264D]"
                    : isComplete
                      ? "text-[#C8102E]"
                      : "text-[#1A1614]/40"
                }`}
              >
                {label}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
