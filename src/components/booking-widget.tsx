"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Check, ChevronLeft, ChevronRight, Loader2, Minus, Plus } from "lucide-react";
import { useCartStore } from "@/stores/cart";
import { formatPrice } from "@/lib/utils";

interface BookingWidgetProps {
  showId: string;
  showName: string;
  pricePerAdult: number;
  pricePerChild: number;
  imageUrl?: string;
  /** Kids at or under this age enter free and need no ticket, so the child selector starts above it. */
  kidsFreeUnderAge?: number;
}

interface ScheduleResponse {
  slug: string;
  bookingDisabled: boolean;
  scheduleNote: string | null;
  dates: { date: string; times: string[] }[];
}

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const DAYS_OF_WEEK = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const pad = (n: number) => String(n).padStart(2, "0");

export default function BookingWidget({
  showId,
  showName,
  pricePerAdult,
  pricePerChild,
  imageUrl,
  kidsFreeUnderAge,
}: BookingWidgetProps) {
  const router = useRouter();
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  /** ISO "YYYY-MM-DD"; string on purpose so month browsing cannot desync it. */
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [childAges, setChildAges] = useState<number[]>([]);

  // The dates a customer can actually book: the show's real performance
  // calendar (weekly pattern, dark days, seasonal pauses, sold-out dates)
  // served by /api/schedule/[slug]. Until it loads, no date is clickable.
  const [availability, setAvailability] = useState<Map<string, string[]> | null>(null);
  const [bookingDisabled, setBookingDisabled] = useState(false);
  const [loadFailed, setLoadFailed] = useState(false);

  // Reserve flow: re-verifies the chosen showtime against the schedule API at
  // click time, so "checking availability" is a real request, not theater.
  const [phase, setPhase] = useState<"idle" | "checking" | "confirmed">("idle");
  const [checkError, setCheckError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch(`/api/schedule/${showId}`);
        if (!res.ok) throw new Error(`schedule ${res.status}`);
        const data = (await res.json()) as ScheduleResponse;
        if (cancelled) return;
        setAvailability(new Map(data.dates.map((d) => [d.date, d.times])));
        setBookingDisabled(data.bookingDisabled);
        // Open on the first month that can actually be booked. At a month
        // boundary (or during a seasonal pause) the current month renders as
        // a wall of grayed-out days and every visitor has to know to click
        // the next-month arrow; jump for them instead.
        if (data.dates.length > 0) {
          const now = new Date();
          const currentPrefix = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-`;
          if (!data.dates.some((d) => d.date.startsWith(currentPrefix))) {
            const [y, m] = data.dates[0].date.split("-").map(Number);
            setCurrentYear(y);
            setCurrentMonth(m - 1);
          }
        }
      } catch {
        if (!cancelled) setLoadFailed(true);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [showId]);

  // Checkout is the very next page for most buyers; have it warm.
  useEffect(() => {
    router.prefetch("/checkout");
  }, [router]);

  const addItem = useCartStore((s) => s.addItem);

  const calendarDays = useMemo(() => {
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const days: (number | null)[] = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let d = 1; d <= daysInMonth; d++) days.push(d);
    return days;
  }, [currentMonth, currentYear]);

  const dateStrOf = (day: number) =>
    `${currentYear}-${pad(currentMonth + 1)}-${pad(day)}`;

  const isPast = (day: number) => {
    const d = new Date(currentYear, currentMonth, day);
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    return d < t;
  };

  const monthHasDates = useMemo(() => {
    if (!availability) return true;
    const prefix = `${currentYear}-${pad(currentMonth + 1)}-`;
    for (const date of availability.keys()) {
      if (date.startsWith(prefix)) return true;
    }
    return false;
  }, [availability, currentMonth, currentYear]);

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  const selectDate = (dateStr: string) => {
    setSelectedDate(dateStr);
    setCheckError(null);
    const times = availability?.get(dateStr) ?? [];
    setSelectedTime((prev) => (times.includes(prev) ? prev : times[0] ?? ""));
  };

  const friendlyDate = (iso: string) => {
    const [y, m, d] = iso.split("-").map(Number);
    return new Date(y, m - 1, d).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  // One-tap date+time shortcuts for the next few performances. Most buyers
  // book tonight or the next day or two while they're in town; the chips cut
  // the calendar-hunt down to a single tap. Data comes straight from the
  // schedule API, so a chip can only ever offer a real, on-sale showtime.
  const quickPicks = useMemo(() => {
    if (!availability) return [];
    return [...availability.entries()]
      .slice(0, 3)
      .map(([date, times]) => ({ date, time: times[0] }));
  }, [availability]);

  const localIso = (d: Date) =>
    `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

  const quickLabel = (pick: { date: string; time: string }) => {
    const now = new Date();
    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    if (pick.date === localIso(now)) {
      const hour = parseInt(pick.time, 10);
      const evening = /PM$/i.test(pick.time) && hour >= 5 && hour !== 12;
      return evening ? "Tonight" : "Today";
    }
    if (pick.date === localIso(tomorrow)) return "Tomorrow";
    return friendlyDate(pick.date);
  };

  const selectQuickPick = (pick: { date: string; time: string }) => {
    const [y, m] = pick.date.split("-").map(Number);
    setCurrentYear(y);
    setCurrentMonth(m - 1);
    setSelectedDate(pick.date);
    setSelectedTime(pick.time);
    setCheckError(null);
  };

  const timesForSelected = selectedDate
    ? (availability?.get(selectedDate) ?? [])
    : [];

  const handleChildrenChange = (newCount: number) => {
    setChildren(newCount);
    const defaultAge = Math.max(5, (kidsFreeUnderAge ?? -1) + 1);
    setChildAges((prev) => {
      if (newCount > prev.length) {
        return [...prev, ...Array(newCount - prev.length).fill(defaultAge)];
      }
      return prev.slice(0, newCount);
    });
  };

  const setChildAge = (index: number, age: number) => {
    setChildAges((prev) => {
      const next = [...prev];
      next[index] = age;
      return next;
    });
  };

  const handleSubmit = async () => {
    if (!selectedDate || !selectedTime || phase !== "idle") return;
    setCheckError(null);
    setPhase("checking");

    // Real re-check: pull a fresh schedule and confirm the showtime is still
    // on sale. If the network hiccups, fall back to the schedule we already
    // loaded rather than blocking the sale.
    const started = Date.now();
    let stillAvailable = true;
    let fresh: ScheduleResponse | null = null;
    try {
      const res = await fetch(`/api/schedule/${showId}`, { cache: "no-store" });
      if (res.ok) {
        fresh = (await res.json()) as ScheduleResponse;
        const times = fresh.dates.find((d) => d.date === selectedDate)?.times ?? [];
        stillAvailable = !fresh.bookingDisabled && times.includes(selectedTime);
      }
    } catch {
      // keep stillAvailable = true
    }
    // Hold the spinner long enough that the check reads as a check.
    const remaining = 900 - (Date.now() - started);
    if (remaining > 0) await new Promise((r) => setTimeout(r, remaining));

    if (!stillAvailable) {
      if (fresh) {
        setAvailability(new Map(fresh.dates.map((d) => [d.date, d.times])));
        setBookingDisabled(fresh.bookingDisabled);
      }
      setSelectedTime("");
      setPhase("idle");
      setCheckError("That showtime just went off sale. Please pick another date or time.");
      return;
    }

    setPhase("confirmed");
    // Straight to checkout: for a single-show buyer the cart drawer was one
    // extra tap plus a "Continue Shopping" escape hatch. Checkout itself
    // offers "Add another show" for multi-show trips.
    window.setTimeout(() => {
      addItem({
        type: "show",
        id: showId,
        name: showName,
        date: selectedDate,
        time: selectedTime,
        adults,
        children,
        childAges,
        pricePerAdult,
        pricePerChild,
        imageUrl,
      });
      router.push("/checkout");
    }, 700);
  };

  const total = adults * pricePerAdult + children * pricePerChild;

  if (bookingDisabled) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <h3 className="mb-2 text-lg font-bold text-[#1A1614]">Book This Show</h3>
        <p className="text-sm text-gray-600">
          Online booking for this show is paused while we confirm the schedule
          with the theater. Please call us and we will get you seats.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 lg:p-4 shadow-sm">
      {/* On desktop the widget lives inside the sticky panel where every
          pixel of height fights the viewport; the heading is redundant there
          (the panel header above it already frames the booking). */}
      <h3 className="mb-4 text-lg font-bold text-[#1A1614] lg:hidden">Book This Show</h3>

      {/* Next-available shortcuts */}
      {quickPicks.length > 0 && (
        <div className="mb-4">
          <span className="text-xs font-medium text-gray-500">Next available</span>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {quickPicks.map((pick) => {
              const isActive =
                selectedDate === pick.date && selectedTime === pick.time;
              return (
                <button
                  key={pick.date}
                  onClick={() => selectQuickPick(pick)}
                  className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
                    isActive
                      ? "border-[#13264D] bg-[#13264D] text-white"
                      : "border-gray-300 text-[#1A1614] hover:border-[#13264D] hover:text-[#13264D]"
                  }`}
                >
                  {quickLabel(pick)} &middot; {pick.time}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Month navigation */}
      <div className="mb-2 flex items-center justify-between">
        <button onClick={prevMonth} className="rounded p-1 hover:bg-gray-100" aria-label="Previous month">
          <ChevronLeft className="h-4 w-4 text-[#1A1614]" />
        </button>
        <span className="text-sm font-semibold text-[#1A1614]">
          {MONTHS[currentMonth]} {currentYear}
        </span>
        <button onClick={nextMonth} className="rounded p-1 hover:bg-gray-100" aria-label="Next month">
          <ChevronRight className="h-4 w-4 text-[#1A1614]" />
        </button>
      </div>

      {/* Day grid */}
      <div className="mb-2 grid grid-cols-7 gap-1 text-center text-xs">
        {DAYS_OF_WEEK.map((d) => (
          <div key={d} className="py-1 font-medium text-gray-500">{d}</div>
        ))}
        {calendarDays.map((day, i) => {
          if (day === null) return <div key={`e-${i}`} />;
          const dateStr = dateStrOf(day);
          const hasShow = !!availability?.get(dateStr)?.length;
          const disabled = isPast(day) || !hasShow;
          const isSelected = selectedDate === dateStr;

          return (
            <button
              key={day}
              disabled={disabled}
              onClick={() => selectDate(dateStr)}
              className={`rounded py-1.5 lg:py-1 text-sm lg:text-xs transition-colors ${
                disabled
                  ? "cursor-not-allowed text-gray-300"
                  : isSelected
                    ? "bg-[#13264D] font-semibold text-white"
                    : "text-[#1A1614] hover:bg-[#13264D]/10"
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>

      <div className="mb-4 lg:mb-2 min-h-[1rem] text-center text-xs text-gray-500">
        {loadFailed
          ? "We could not load show dates. Please refresh the page, or call us to book."
          : !availability
            ? "Loading available dates..."
            : !monthHasDates
              ? "No performances this month. Try another month."
              : null}
      </div>

      {/* Show time */}
      {selectedDate && timesForSelected.length > 1 && (
        <div className="mb-4">
          <label className="mb-1 block text-xs font-medium text-gray-600">Show Time</label>
          <select
            value={selectedTime}
            onChange={(e) => {
              setSelectedTime(e.target.value);
              setCheckError(null);
            }}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-[#1A1614] focus:border-[#13264D] focus:ring-1 focus:ring-[#13264D] focus:outline-none"
          >
            {timesForSelected.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      )}
      {selectedDate && timesForSelected.length === 1 && (
        <p className="mb-4 text-sm text-gray-600">
          Show time: <span className="font-semibold text-[#1A1614]">{timesForSelected[0]}</span>
        </p>
      )}

      {/* Guest selectors */}
      <div className="mb-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-[#1A1614]">Adults</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setAdults((a) => Math.max(1, a - 1))}
              className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:border-[#13264D] hover:text-[#13264D]"
              aria-label="Remove adult"
            >
              <Minus className="h-3 w-3" />
            </button>
            <span className="w-6 text-center text-sm font-medium">{adults}</span>
            <button
              onClick={() => setAdults((a) => Math.min(10, a + 1))}
              className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:border-[#13264D] hover:text-[#13264D]"
              aria-label="Add adult"
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-[#1A1614]">Children</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleChildrenChange(Math.max(0, children - 1))}
              className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:border-[#13264D] hover:text-[#13264D]"
              aria-label="Remove child"
            >
              <Minus className="h-3 w-3" />
            </button>
            <span className="w-6 text-center text-sm font-medium">{children}</span>
            <button
              onClick={() => handleChildrenChange(Math.min(8, children + 1))}
              className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:border-[#13264D] hover:text-[#13264D]"
              aria-label="Add child"
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>
        </div>

        {/* Child age dropdowns. Ages at or under the free cutoff aren't
            offered: those kids enter free without a ticket, and offering the
            age here would quietly charge full child price for them. */}
        {children > 0 && (
          <div className="space-y-2 rounded-lg bg-gray-50 p-3">
            <span className="text-xs font-medium text-gray-500">Child Ages</span>
            <div className="grid grid-cols-2 gap-2">
              {childAges.map((age, i) => {
                const minAge = (kidsFreeUnderAge ?? -1) + 1;
                return (
                  <div key={i} className="flex items-center gap-1.5">
                    <span className="text-xs text-gray-500">#{i + 1}</span>
                    <select
                      value={Math.max(age, minAge)}
                      onChange={(e) => setChildAge(i, Number(e.target.value))}
                      className="w-full rounded border border-gray-300 px-2 py-1 text-xs focus:border-[#13264D] focus:outline-none"
                    >
                      {Array.from({ length: 18 - minAge }, (_, a) => {
                        const val = a + minAge;
                        return (
                          <option key={val} value={val}>{val} yr{val !== 1 ? "s" : ""}</option>
                        );
                      })}
                    </select>
                  </div>
                );
              })}
            </div>
            {kidsFreeUnderAge !== undefined && (
              <p className="text-[11px] leading-relaxed text-gray-500">
                Ages {kidsFreeUnderAge} &amp; under attend free &mdash; no ticket needed.
              </p>
            )}
          </div>
        )}
      </div>

      {/* Price summary */}
      <div className="mb-4 rounded-lg bg-gray-50 p-3 text-sm">
        <div className="flex justify-between text-gray-600">
          <span>{adults} Adult{adults !== 1 ? "s" : ""} x ${formatPrice(pricePerAdult)}</span>
          <span>${formatPrice(adults * pricePerAdult)}</span>
        </div>
        {children > 0 && (
          <div className="flex justify-between text-gray-600">
            {pricePerChild === 0 ? (
              <>
                <span>{children} Child{children !== 1 ? "ren" : ""}</span>
                <span className="font-bold text-emerald-700 uppercase">Free</span>
              </>
            ) : (
              <>
                <span>{children} Child{children !== 1 ? "ren" : ""} x ${formatPrice(pricePerChild)}</span>
                <span>${formatPrice(children * pricePerChild)}</span>
              </>
            )}
          </div>
        )}
        <div className="mt-2 flex justify-between border-t border-gray-200 pt-2 font-bold text-[#1A1614]">
          <span>Total</span>
          <span>${formatPrice(total)}</span>
        </div>
        {children > 0 && pricePerChild < pricePerAdult && (
          <p className="mt-1.5 text-right text-xs font-semibold text-emerald-700">
            You save ${formatPrice(children * (pricePerAdult - pricePerChild))} vs. adult
            pricing for the kids
          </p>
        )}
      </div>

      {/* Availability + reserve */}
      {selectedDate && selectedTime && phase === "idle" && !checkError && (
        <p className="mb-3 flex items-center justify-center gap-1.5 text-xs font-semibold text-emerald-700">
          <Check className="h-3.5 w-3.5" aria-hidden />
          Available on {friendlyDate(selectedDate)} at {selectedTime}
        </p>
      )}
      {checkError && (
        <p role="alert" className="mb-3 text-center text-xs font-semibold text-[#C8102E]">
          {checkError}
        </p>
      )}
      <button
        onClick={handleSubmit}
        disabled={!selectedDate || !selectedTime || phase !== "idle"}
        aria-busy={phase === "checking"}
        aria-live="polite"
        className={`w-full rounded-lg py-3 text-sm font-bold text-white transition-colors disabled:cursor-not-allowed ${
          phase === "confirmed"
            ? "bg-emerald-600"
            : phase === "checking"
              ? "bg-[#C8102E]/90"
              : "bg-[#C8102E] hover:bg-[#A50D26] disabled:opacity-50"
        }`}
      >
        {phase === "checking" ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 className="h-4 w-4 motion-safe:animate-spin" aria-hidden />
            Checking availability&hellip;
          </span>
        ) : phase === "confirmed" ? (
          <span className="flex items-center justify-center gap-2">
            <Check className="h-4 w-4" aria-hidden />
            Available &mdash; taking you to checkout
          </span>
        ) : selectedDate ? (
          "Reserve My Seats"
        ) : (
          "Select a Date"
        )}
      </button>

      {/* Desktop hides this line: the panel's trust bullets right above the
          widget already say it, and the duplicate costs sticky height. */}
      <p className="mt-3 text-center text-[11px] leading-relaxed text-gray-500 lg:hidden">
        Free cancellation with 24+ hrs notice &middot; No hidden fees &middot; E-tickets by email
      </p>
    </div>
  );
}
