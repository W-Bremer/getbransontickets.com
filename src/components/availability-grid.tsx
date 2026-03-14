"use client";

import { useMemo } from "react";

interface AvailabilityGridProps {
  showTimes: string[];
  showName: string;
  pricePerAdult: number;
  darkDays?: string[];
}

export default function AvailabilityGrid({
  showTimes,
  showName,
  pricePerAdult,
  darkDays = [],
}: AvailabilityGridProps) {
  const days = useMemo(() => {
    const result: Date[] = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      result.push(d);
    }
    return result;
  }, []);

  const darkDayNames = useMemo(
    () => new Set(darkDays.map((d) => d.toLowerCase())),
    [darkDays]
  );

  const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const isDark = (date: Date) => {
    const dayName = DAY_NAMES[date.getDay()].toLowerCase();
    return darkDayNames.has(dayName);
  };

  const formatHeader = (date: Date) => {
    const dayShort = date.toLocaleDateString("en-US", { weekday: "short" });
    const month = date.toLocaleDateString("en-US", { month: "short" });
    const day = date.getDate();
    return { dayShort, dateStr: `${month} ${day}` };
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
      <div className="border-b border-gray-200 bg-gray-50 px-5 py-3">
        <h3 className="text-sm font-bold text-[#333333]">
          Upcoming Availability &mdash; {showName}
        </h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px] text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">
                Show Time
              </th>
              {days.map((date, i) => {
                const { dayShort, dateStr } = formatHeader(date);
                const dark = isDark(date);
                return (
                  <th
                    key={i}
                    className={`px-2 py-3 text-center text-xs ${
                      dark ? "text-gray-400" : "text-[#333333]"
                    }`}
                  >
                    <div className="font-semibold">{dayShort}</div>
                    <div className="font-normal text-gray-500">{dateStr}</div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {showTimes.map((time) => (
              <tr key={time} className="border-b border-gray-100 last:border-0">
                <td className="px-4 py-3 font-medium text-[#333333]">{time}</td>
                {days.map((date, i) => {
                  const dark = isDark(date);
                  return (
                    <td key={i} className="px-2 py-3 text-center">
                      {dark ? (
                        <span className="inline-block rounded bg-gray-100 px-3 py-1.5 text-xs text-gray-400">
                          N/A
                        </span>
                      ) : (
                        <button className="inline-block rounded bg-[#8B6914] px-3 py-1.5 text-xs font-bold text-white transition-colors hover:bg-[#6B5210]">
                          BOOK
                        </button>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="border-t border-gray-200 bg-gray-50 px-5 py-2 text-xs text-gray-500">
        Starting from ${pricePerAdult}/adult
      </div>
    </div>
  );
}
