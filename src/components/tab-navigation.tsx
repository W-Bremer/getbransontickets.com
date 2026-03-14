"use client";

import { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface Tab {
  id: string;
  label: string;
}

interface TabNavigationProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (id: string) => void;
}

export function TabNavigation({
  tabs,
  activeTab,
  onTabChange,
}: TabNavigationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const activeEl = container.querySelector<HTMLButtonElement>(
      `[data-tab-id="${activeTab}"]`
    );
    if (activeEl) {
      setIndicatorStyle({
        left: activeEl.offsetLeft,
        width: activeEl.offsetWidth,
      });
    }
  }, [activeTab]);

  return (
    <div className="sticky top-16 z-30 border-b border-gray-200 bg-white/95 backdrop-blur-sm">
      <div
        ref={containerRef}
        className="relative flex overflow-x-auto scrollbar-none"
        role="tablist"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            data-tab-id={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "shrink-0 px-5 py-3.5 text-sm font-medium transition-colors whitespace-nowrap",
              activeTab === tab.id
                ? "text-[#037B98]"
                : "text-gray-500 hover:text-[#333333]"
            )}
          >
            {tab.label}
          </button>
        ))}

        {/* Active underline indicator */}
        <div
          className="absolute bottom-0 h-0.5 bg-[#037B98] transition-all duration-300 ease-out"
          style={{
            left: indicatorStyle.left,
            width: indicatorStyle.width,
          }}
        />
      </div>
    </div>
  );
}
