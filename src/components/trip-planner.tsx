"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar, Users, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

export function TripPlanner({ className }: { className?: string }) {
  const router = useRouter();
  const [arrivalDate, setArrivalDate] = useState("");
  const [nights, setNights] = useState("3");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (arrivalDate) params.set("arrival", arrivalDate);
    params.set("nights", nights);
    params.set("adults", String(adults));
    params.set("children", String(children));
    router.push(`/shows?${params.toString()}`);
  }

  return (
    <div
      className={cn(
        "rounded-2xl bg-white p-4 sm:p-6 shadow-lg shadow-black/5",
        className
      )}
    >
      <h3 className="text-base sm:text-lg font-bold text-[#333333]">Plan Your Trip</h3>
      <p className="mt-0.5 text-xs sm:text-sm text-gray-500">
        Find the perfect shows for your Branson vacation.
      </p>

      <form onSubmit={handleSubmit} className="mt-3 sm:mt-5 space-y-3 sm:space-y-4">
        {/* Date & Nights */}
        <div className="grid grid-cols-1 gap-3 sm:gap-4">
          <div>
            <label className="mb-1 flex items-center gap-1.5 text-xs sm:text-sm font-medium text-[#333333]">
              <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#7B1A1A] shrink-0" />
              Arrival Date
            </label>
            <input
              type="date"
              value={arrivalDate}
              onChange={(e) => setArrivalDate(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-2.5 py-2 sm:px-3 sm:py-2.5 text-sm text-[#333333] outline-none transition-colors focus:border-[#7B1A1A] focus:ring-2 focus:ring-[#7B1A1A]/20"
            />
          </div>

          <div>
            <label className="mb-1 flex items-center gap-1.5 text-xs sm:text-sm font-medium text-[#333333]">
              <Moon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#7B1A1A] shrink-0" />
              Length of Stay
            </label>
            <select
              value={nights}
              onChange={(e) => setNights(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-2.5 py-2 sm:px-3 sm:py-2.5 text-sm text-[#333333] outline-none transition-colors focus:border-[#7B1A1A] focus:ring-2 focus:ring-[#7B1A1A]/20"
            >
              {[1, 2, 3, 4, 5, 6, 7].map((n) => (
                <option key={n} value={n}>
                  {n} {n === 1 ? "Night" : "Nights"}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Adults & Children */}
        <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
          <div>
            <label className="mb-1 flex items-center gap-1.5 text-xs sm:text-sm font-medium text-[#333333]">
              <Users className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#7B1A1A]" />
              Adults
            </label>
            <div className="flex items-center rounded-lg border border-gray-300">
              <button
                type="button"
                onClick={() => setAdults((v) => Math.max(1, v - 1))}
                className="px-2.5 py-1.5 sm:px-3 sm:py-2.5 text-lg text-gray-500 transition-colors hover:text-[#333333]"
                aria-label="Decrease adults"
              >
                -
              </button>
              <span className="flex-1 text-center text-sm font-semibold text-[#333333]">
                {adults}
              </span>
              <button
                type="button"
                onClick={() => setAdults((v) => Math.min(10, v + 1))}
                className="px-2.5 py-1.5 sm:px-3 sm:py-2.5 text-lg text-gray-500 transition-colors hover:text-[#333333]"
                aria-label="Increase adults"
              >
                +
              </button>
            </div>
          </div>

          <div>
            <label className="mb-1 text-xs sm:text-sm font-medium text-[#333333]">
              Children
            </label>
            <div className="flex items-center rounded-lg border border-gray-300">
              <button
                type="button"
                onClick={() => setChildren((v) => Math.max(0, v - 1))}
                className="px-2.5 py-1.5 sm:px-3 sm:py-2.5 text-lg text-gray-500 transition-colors hover:text-[#333333]"
                aria-label="Decrease children"
              >
                -
              </button>
              <span className="flex-1 text-center text-sm font-semibold text-[#333333]">
                {children}
              </span>
              <button
                type="button"
                onClick={() => setChildren((v) => Math.min(10, v + 1))}
                className="px-2.5 py-1.5 sm:px-3 sm:py-2.5 text-lg text-gray-500 transition-colors hover:text-[#333333]"
                aria-label="Increase children"
              >
                +
              </button>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-[#8B6914] px-4 py-2.5 sm:py-3 text-sm font-bold text-white shadow-sm transition-colors hover:bg-[#6B5210]"
        >
          Plan My Trip
        </button>
      </form>
    </div>
  );
}
