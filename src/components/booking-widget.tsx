"use client";

import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, Minus, Plus, X } from "lucide-react";
import { useCartStore } from "@/stores/cart";

interface BookingWidgetProps {
  showId: string;
  showName: string;
  pricePerAdult: number;
  pricePerChild: number;
  imageUrl?: string;
  showTimes: string[];
}

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const DAYS_OF_WEEK = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export default function BookingWidget({
  showId,
  showName,
  pricePerAdult,
  pricePerChild,
  imageUrl,
  showTimes,
}: BookingWidgetProps) {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState(showTimes[0] || "");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [childAges, setChildAges] = useState<number[]>([]);

  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);

  const calendarDays = useMemo(() => {
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const days: (number | null)[] = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let d = 1; d <= daysInMonth; d++) days.push(d);
    return days;
  }, [currentMonth, currentYear]);

  const isPast = (day: number) => {
    const d = new Date(currentYear, currentMonth, day);
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    return d < t;
  };

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

  const handleChildrenChange = (newCount: number) => {
    setChildren(newCount);
    setChildAges((prev) => {
      if (newCount > prev.length) {
        return [...prev, ...Array(newCount - prev.length).fill(5)];
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

  const handleSubmit = () => {
    if (!selectedDate) return;

    const dateStr = `${currentYear}-${String(selectedDate.getMonth() + 1).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(2, "0")}`;

    addItem({
      type: "show",
      id: showId,
      name: showName,
      date: dateStr,
      time: selectedTime,
      adults,
      children,
      childAges,
      pricePerAdult,
      pricePerChild,
      imageUrl,
    });

    openCart();
  };

  const total = adults * pricePerAdult + children * pricePerChild;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <h3 className="mb-4 text-lg font-bold text-[#333333]">Book This Show</h3>

      {/* Month navigation */}
      <div className="mb-2 flex items-center justify-between">
        <button onClick={prevMonth} className="rounded p-1 hover:bg-gray-100" aria-label="Previous month">
          <ChevronLeft className="h-4 w-4 text-[#333333]" />
        </button>
        <span className="text-sm font-semibold text-[#333333]">
          {MONTHS[currentMonth]} {currentYear}
        </span>
        <button onClick={nextMonth} className="rounded p-1 hover:bg-gray-100" aria-label="Next month">
          <ChevronRight className="h-4 w-4 text-[#333333]" />
        </button>
      </div>

      {/* Day grid */}
      <div className="mb-4 grid grid-cols-7 gap-1 text-center text-xs">
        {DAYS_OF_WEEK.map((d) => (
          <div key={d} className="py-1 font-medium text-gray-500">{d}</div>
        ))}
        {calendarDays.map((day, i) => {
          if (day === null) return <div key={`e-${i}`} />;
          const date = new Date(currentYear, currentMonth, day);
          const past = isPast(day);
          const isSelected =
            selectedDate &&
            selectedDate.getDate() === day &&
            selectedDate.getMonth() === currentMonth &&
            selectedDate.getFullYear() === currentYear;

          return (
            <button
              key={day}
              disabled={past}
              onClick={() => setSelectedDate(date)}
              className={`rounded py-1.5 text-sm transition-colors ${
                past
                  ? "cursor-not-allowed text-gray-300"
                  : isSelected
                    ? "bg-[#7B1A1A] font-semibold text-white"
                    : "text-[#333333] hover:bg-[#7B1A1A]/10"
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>

      {/* Show time */}
      {showTimes.length > 1 && (
        <div className="mb-4">
          <label className="mb-1 block text-xs font-medium text-gray-600">Show Time</label>
          <select
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-[#333333] focus:border-[#7B1A1A] focus:ring-1 focus:ring-[#7B1A1A] focus:outline-none"
          >
            {showTimes.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      )}

      {/* Guest selectors */}
      <div className="mb-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-[#333333]">Adults</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setAdults((a) => Math.max(1, a - 1))}
              className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:border-[#7B1A1A] hover:text-[#7B1A1A]"
              aria-label="Remove adult"
            >
              <Minus className="h-3 w-3" />
            </button>
            <span className="w-6 text-center text-sm font-medium">{adults}</span>
            <button
              onClick={() => setAdults((a) => Math.min(10, a + 1))}
              className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:border-[#7B1A1A] hover:text-[#7B1A1A]"
              aria-label="Add adult"
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-[#333333]">Children</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleChildrenChange(Math.max(0, children - 1))}
              className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:border-[#7B1A1A] hover:text-[#7B1A1A]"
              aria-label="Remove child"
            >
              <Minus className="h-3 w-3" />
            </button>
            <span className="w-6 text-center text-sm font-medium">{children}</span>
            <button
              onClick={() => handleChildrenChange(Math.min(8, children + 1))}
              className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:border-[#7B1A1A] hover:text-[#7B1A1A]"
              aria-label="Add child"
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>
        </div>

        {/* Child age dropdowns */}
        {children > 0 && (
          <div className="space-y-2 rounded-lg bg-gray-50 p-3">
            <span className="text-xs font-medium text-gray-500">Child Ages</span>
            <div className="grid grid-cols-2 gap-2">
              {childAges.map((age, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <span className="text-xs text-gray-500">#{i + 1}</span>
                  <select
                    value={age}
                    onChange={(e) => setChildAge(i, Number(e.target.value))}
                    className="w-full rounded border border-gray-300 px-2 py-1 text-xs focus:border-[#7B1A1A] focus:outline-none"
                  >
                    {Array.from({ length: 18 }, (_, a) => (
                      <option key={a} value={a}>{a} yr{a !== 1 ? "s" : ""}</option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Price summary */}
      <div className="mb-4 rounded-lg bg-gray-50 p-3 text-sm">
        <div className="flex justify-between text-gray-600">
          <span>{adults} Adult{adults !== 1 ? "s" : ""} x ${pricePerAdult}</span>
          <span>${adults * pricePerAdult}</span>
        </div>
        {children > 0 && (
          <div className="flex justify-between text-gray-600">
            <span>{children} Child{children !== 1 ? "ren" : ""} x ${pricePerChild}</span>
            <span>${children * pricePerChild}</span>
          </div>
        )}
        <div className="mt-2 flex justify-between border-t border-gray-200 pt-2 font-bold text-[#333333]">
          <span>Total</span>
          <span>${total}</span>
        </div>
      </div>

      {/* Submit button */}
      <button
        onClick={handleSubmit}
        disabled={!selectedDate}
        className="w-full rounded-lg bg-[#8B6914] py-3 text-sm font-bold text-white transition-colors hover:bg-[#6B5210] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {selectedDate ? "Check Availability" : "Select a Date"}
      </button>
    </div>
  );
}
