"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Fuse from "fuse.js";
import { Search, X, MapPin, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { shows, type Show } from "@/data/shows";

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
}

export function SearchModal({ open, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const fuse = useMemo(
    () =>
      new Fuse(shows, {
        keys: [
          { name: "name", weight: 3 },
          { name: "theater", weight: 1.5 },
          { name: "tags", weight: 1 },
          { name: "category", weight: 1 },
          { name: "shortDescription", weight: 0.5 },
        ],
        threshold: 0.35,
        includeScore: true,
      }),
    []
  );

  const results: Show[] = useMemo(() => {
    if (!query.trim()) return shows.filter((s) => s.isFeatured).slice(0, 6);
    return fuse.search(query).slice(0, 8).map((r) => r.item);
  }, [query, fuse]);

  const handleSelect = useCallback(
    (show: Show) => {
      onClose();
      setQuery("");
      router.push(`/shows/${show.slug}`);
    },
    [onClose, router]
  );

  // Focus input on open
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery("");
    }
  }, [open]);

  // Esc to close
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  // Prevent body scroll
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#0f172a]/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl mx-4 rounded-2xl bg-white shadow-2xl overflow-hidden">
        {/* Search input */}
        <div className="flex items-center gap-3 border-b border-gray-100 px-5 py-4">
          <Search className="h-5 w-5 text-[#d4a843] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search shows, theaters, categories..."
            className="flex-1 bg-transparent text-[#0f172a] text-lg placeholder:text-[#0f172a]/30 outline-none"
          />
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-[#0f172a]/40 transition-colors hover:bg-gray-100 hover:text-[#0f172a]"
            aria-label="Close search"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto">
          {!query.trim() && (
            <p className="px-5 pt-3 pb-1 text-xs font-medium uppercase tracking-wider text-[#0f172a]/40">
              Featured Shows
            </p>
          )}
          {results.length === 0 ? (
            <div className="px-5 py-12 text-center">
              <p className="text-[#0f172a]/50">No shows found for &ldquo;{query}&rdquo;</p>
            </div>
          ) : (
            <ul className="py-2">
              {results.map((show) => (
                <li key={show.slug}>
                  <button
                    onClick={() => handleSelect(show)}
                    className={cn(
                      "w-full flex items-start gap-3 px-5 py-3 text-left transition-colors",
                      "hover:bg-[#faf8f5] focus:bg-[#faf8f5] outline-none"
                    )}
                  >
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-[#0f172a] text-sm truncate">
                        {show.name}
                      </p>
                      <div className="mt-0.5 flex items-center gap-3 text-xs text-[#0f172a]/50">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {show.theater}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {show.duration}
                        </span>
                      </div>
                    </div>
                    <span className="shrink-0 text-sm font-bold text-[#d4a843]">
                      ${show.priceFrom}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer hint */}
        <div className="border-t border-gray-100 px-5 py-2.5 flex items-center gap-4 text-xs text-[#0f172a]/30">
          <span>
            <kbd className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-[10px]">ESC</kbd> to close
          </span>
        </div>
      </div>
    </div>
  );
}
