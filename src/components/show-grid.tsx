"use client";

import { Ticket } from "lucide-react";
import { cn } from "@/lib/utils";
import { ShowCard } from "@/components/show-card";
import type { Show } from "@/data/shows";

interface ShowGridProps {
  shows: Show[];
  emptyMessage?: string;
  className?: string;
}

export function ShowGrid({
  shows,
  emptyMessage = "No shows match your criteria. Try adjusting your filters.",
  className,
}: ShowGridProps) {
  if (shows.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="rounded-full bg-[#7B1A1A]/5 p-6 mb-4">
          <Ticket className="h-10 w-10 text-[#d4a843]/50" />
        </div>
        <p className="text-lg font-medium text-muted-foreground">
          {emptyMessage}
        </p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3",
        className
      )}
    >
      {shows.map((show, i) => (
        <ShowCard key={show.slug} show={show} index={i} />
      ))}
    </div>
  );
}
