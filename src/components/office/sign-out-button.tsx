"use client";

import { useRouter } from "next/navigation";

export function OfficeSignOutButton() {
  const router = useRouter();
  return (
    <button
      onClick={async () => {
        await fetch("/api/office/login", { method: "DELETE" });
        router.refresh();
      }}
      className="text-sm text-gray-500 underline-offset-2 hover:text-[#13264D] hover:underline"
    >
      Sign out
    </button>
  );
}
