import type { Metadata } from "next";
import { ConfirmationClient } from "./confirmation-client";

export const metadata: Metadata = {
  title: "Order Confirmed",
  robots: { index: false, follow: false },
};

export default function ConfirmationPage() {
  return <ConfirmationClient />;
}
