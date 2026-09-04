import { Suspense } from "react";
import type { Metadata } from "next";
import { ResumeCartClient } from "./resume-client";

export const metadata: Metadata = {
  title: "Restoring Your Cart",
  robots: { index: false },
};

export default function ResumeCartPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#13264D] border-t-transparent" />
        </div>
      }
    >
      <ResumeCartClient />
    </Suspense>
  );
}
