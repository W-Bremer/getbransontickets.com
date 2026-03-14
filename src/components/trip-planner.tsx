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
        "rounded-2xl bg-white p-6 shadow-lg shadow-black/5",
        className
      )}
    >
      <h3 className="text-lg font-bold text-[#333333]">Plan Your Trip</h3>
      <p className="mt-1 text-sm text-gray-500">
        Find the perfect shows for your Branson vacation.
      </p>

      <form onSubmit={handleSubmit} className="mt-5 space-y-4">
        {/* Arrival Date */}
        <div>
          <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-[#333333]">
            <Calendar className="h-4 w-4 text-[#037B98]" />
            Arrival Date
          </label>
          <input
            type="date"
            value={arrivalDate}
            onChange={(e) => setArrivalDate(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-[#333333] outline-none transition-colors focus:border-[#037B98] focus:ring-2 focus:ring-[#037B98]/20"
          />
        </div>

        {/* Length of Stay */}
        <div>
          <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-[#333333]">
            <Moon className="h-4 w-4 text-[#037B98]" />
            Length of Stay
          </label>
          <select
            value={nights}
            onChange={(e) => setNights(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-[#333333] outline-none transition-colors focus:border-[#037B98] focus:ring-2 focus:ring-[#037B98]/20"
          >
            {[1, 2, 3, 4, 5, 6, 7].map((n) => (
              <option key={n} value={n}>
                {n} {n === 1 ? "Night" : "Nights"}
              </option>
            ))}
          </select>
        </div>

        {/* Adults & Children */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-[#333333]">
              <Users className="h-4 w-4 text-[#037B98]" />
              Adults
            </label>
            <div className="flex items-center rounded-lg border border-gray-300">
              <button
                type="button"
                onClick={() => setAdults((v) => Math.max(1, v - 1))}
                className="px-3 py-2.5 text-lg text-gray-500 transition-colors hover:text-[#333333]"
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
                className="px-3 py-2.5 text-lg text-gray-500 transition-colors hover:text-[#333333]"
                aria-label="Increase adults"
              >
                +
              </button>
            </div>
          </div>

          <div>
            <label className="mb-1.5 text-sm font-medium text-[#333333]">
              Children
            </label>
            <div className="flex items-center rounded-lg border border-gray-300">
              <button
                type="button"
                onClick={() => setChildren((v) => Math.max(0, v - 1))}
                className="px-3 py-2.5 text-lg text-gray-500 transition-colors hover:text-[#333333]"
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
                className="px-3 py-2.5 text-lg text-gray-500 transition-colors hover:text-[#333333]"
                aria-label="Increase children"
              >
                +
              </button>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-[#018941] px-4 py-3 text-sm font-bold text-white shadow-sm transition-colors hover:bg-[#017035]"
        >
          Plan My Trip
        </button>
      </form>
    </div>
  );
}
