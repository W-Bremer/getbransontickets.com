"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import type { OpenBookingDetail } from "@/components/book-now-button";

const BookingModalInner = dynamic(
  () => import("./booking-modal").then((m) => ({ default: m.BookingModal })),
  { ssr: false }
);

interface LazyBookingModalProps {
  showId: string;
  showName: string;
  pricePerAdult: number;
  pricePerChild: number;
  imageUrl?: string;
  kidsFreeUnderAge?: number;
  competitorPrice?: number;
  bogo50?: boolean;
}

/**
 * Keeps the booking widget (the page's biggest client chunk) out of the
 * initial route JS. The chunk is warmed during idle time; the first
 * gbt:open-booking event mounts the real modal and is replayed to it via
 * initialEvent, so the first tap is never lost. After that first mount, the
 * modal's own listener handles every subsequent open.
 */
export function LazyBookingModal(props: LazyBookingModalProps) {
  const [firstEvent, setFirstEvent] = useState<OpenBookingDetail | null>(null);

  useEffect(() => {
    if (firstEvent) return;
    const onOpen = (e: Event) =>
      setFirstEvent((e as CustomEvent<OpenBookingDetail>).detail ?? {});
    window.addEventListener("gbt:open-booking", onOpen);

    // Warm the chunk while the phone is idle so the first tap feels instant.
    let idleId: number | undefined;
    let timeoutId: number | undefined;
    if (typeof window.requestIdleCallback === "function") {
      idleId = window.requestIdleCallback(() => {
        import("./booking-modal");
      });
    } else {
      timeoutId = window.setTimeout(() => {
        import("./booking-modal");
      }, 2500);
    }

    return () => {
      window.removeEventListener("gbt:open-booking", onOpen);
      if (idleId !== undefined && typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    };
  }, [firstEvent]);

  if (!firstEvent) return null;
  return <BookingModalInner {...props} initialEvent={firstEvent} />;
}
