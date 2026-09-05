"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Fuse from "fuse.js";
import { Search, X, MapPin, Ticket, Landmark, FerrisWheel } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatBasePrice } from "@/lib/tax";
import type { SearchRecord } from "@/app/api/search-index/route";

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
}

// One fetch per session: the index covers every show, attraction, and
// theater, and it stays out of the page bundle entirely.
let indexPromise: Promise<SearchRecord[]> | null = null;
function loadIndex(): Promise<SearchRecord[]> {
  indexPromise ??= fetch("/api/search-index")
    .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
    .then((d: { records: SearchRecord[] }) => d.records)
    .catch((err) => {
      indexPromise = null;
      throw err;
    });
  return indexPromise;
}

const TYPE_META = {
  show: { label: "Show", icon: Ticket, href: (slug: string) => `/shows/${slug}` },
  attraction: {
    label: "Attraction",
    icon: FerrisWheel,
    href: (slug: string) => `/attractions/${slug}`,
  },
  theater: {
    label: "Theater",
    icon: Landmark,
    href: (slug: string) => `/theaters/${slug}`,
  },
} as const;

export function SearchModal({ open, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [records, setRecords] = useState<SearchRecord[] | null>(null);
  const [failed, setFailed] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    loadIndex()
      .then((r) => {
        if (!cancelled) setRecords(r);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, [open]);

  const fuse = useMemo(
    () =>
      records
        ? new Fuse(records, {
            keys: [
              { name: "name", weight: 3 },
              { name: "subtitle", weight: 1.5 },
              { name: "tags", weight: 1 },
            ],
            threshold: 0.35,
            includeScore: true,
          })
        : null,
    [records]
  );

  const results: SearchRecord[] = useMemo(() => {
    if (!records) return [];
    if (!query.trim()) {
      return records.filter((r) => r.featured).slice(0, 6);
    }
    return fuse ? fuse.search(query).slice(0, 8).map((r) => r.item) : [];
  }, [query, fuse, records]);

  const handleSelect = useCallback(
    (record: SearchRecord) => {
      onClose();
      setQuery("");
      router.push(TYPE_META[record.type].href(record.slug));
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

  // Enter jumps to the top result; also supports "see all shows" fallback.
  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (results.length > 0) {
        handleSelect(results[0]);
      } else if (query.trim()) {
        onClose();
        router.push(`/shows?q=${encodeURIComponent(query.trim())}`);
        setQuery("");
      }
    },
    [results, handleSelect, query, onClose, router]
  );

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
    <div className="fixed inset-0 z-[70] flex items-start justify-center pt-[8vh] sm:pt-[10vh]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#13264D]/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl mx-4 rounded-2xl bg-white shadow-2xl overflow-hidden">
        {/* Search input */}
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-3 border-b border-gray-100 px-5 py-4"
        >
          <Search className="h-5 w-5 text-[#E8C65A] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search shows, attractions, theaters..."
            className="flex-1 bg-transparent text-[#13264D] text-lg placeholder:text-[#13264D]/30 outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-[#13264D]/40 transition-colors hover:bg-gray-100 hover:text-[#13264D]"
            aria-label="Close search"
          >
            <X className="h-5 w-5" />
          </button>
        </form>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto">
          {failed && (
            <div className="px-5 py-12 text-center">
              <p className="text-[#13264D]/50">
                Search is unavailable right now. Please refresh and try again.
              </p>
            </div>
          )}
          {!failed && !records && (
            <div className="px-5 py-12 text-center">
              <p className="text-[#13264D]/50">Loading...</p>
            </div>
          )}
          {records && !query.trim() && (
            <p className="px-5 pt-3 pb-1 text-xs font-medium uppercase tracking-wider text-[#13264D]/40">
              Featured Shows
            </p>
          )}
          {records &&
            (results.length === 0 && query.trim() ? (
              <div className="px-5 py-12 text-center">
                <p className="text-[#13264D]/50">
                  No matches for &ldquo;{query}&rdquo;
                </p>
              </div>
            ) : (
              <ul className="py-2">
                {results.map((record) => {
                  const meta = TYPE_META[record.type];
                  const Icon = meta.icon;
                  return (
                    <li key={`${record.type}-${record.slug}`}>
                      <button
                        onClick={() => handleSelect(record)}
                        className={cn(
                          "w-full flex items-start gap-3 px-5 py-3 text-left transition-colors",
                          "hover:bg-[#faf8f5] focus:bg-[#faf8f5] outline-none"
                        )}
                      >
                        <Icon className="mt-0.5 h-4 w-4 shrink-0 text-[#13264D]/40" />
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-[#13264D] text-sm truncate">
                            {record.name}
                          </p>
                          <div className="mt-0.5 flex items-center gap-3 text-xs text-[#13264D]/50">
                            <span className="rounded bg-[#13264D]/5 px-1.5 py-0.5 font-medium">
                              {meta.label}
                            </span>
                            {record.type === "show" && (
                              <span className="flex items-center gap-1 truncate">
                                <MapPin className="h-3 w-3 shrink-0" />
                                <span className="truncate">{record.subtitle}</span>
                              </span>
                            )}
                          </div>
                        </div>
                        {record.type === "show" && record.price !== undefined && (
                          <span className="shrink-0 text-sm font-bold text-[#E8C65A]">
                            ${formatBasePrice(record.price)}
                          </span>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            ))}
        </div>

        {/* Footer hint */}
        <div className="border-t border-gray-100 px-5 py-2.5 flex items-center gap-4 text-xs text-[#13264D]/30">
          <span>
            <kbd className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-[10px]">ESC</kbd> to close
          </span>
        </div>
      </div>
    </div>
  );
}
