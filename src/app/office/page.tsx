import Link from "next/link";
import { hasOfficeAccess, officeConfigured } from "@/lib/office-auth";
import { listOfficeOrders, officeTime, type OfficeOrder } from "@/lib/office-orders";
import { OfficeLoginForm } from "@/components/office/login-form";
import { OfficeSignOutButton } from "@/components/office/sign-out-button";
import { formatQuantity } from "@/lib/email-format";

export const dynamic = "force-dynamic";

function OrderCard({ order }: { order: OfficeOrder }) {
  return (
    <Link
      href={`/office/orders/${order.paymentIntentId}`}
      className="block rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:border-[#13264D] hover:shadow-md"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <span className="font-bold text-[#13264D]">{order.orderNumber}</span>
        <span className="text-sm text-gray-500">{officeTime(order.created)}</span>
      </div>
      <p className="mt-1 text-sm text-[#1A1614]">
        <span className="font-medium">{order.customerName || "No name on file"}</span>
        {order.customerEmail && <span className="text-gray-500"> · {order.customerEmail}</span>}
      </p>
      <ul className="mt-3 space-y-1">
        {order.items.map((item, i) => (
          <li key={i} className="text-sm text-gray-700">
            {item.name} · {item.date}
            {item.time ? ` at ${item.time}` : ""} · {formatQuantity(item.adults, item.children)}
          </li>
        ))}
      </ul>
      <div className="mt-3 flex items-center justify-between">
        <span className="text-sm font-semibold text-[#1A1614]">
          ${order.totalAmount.toFixed(2)}
        </span>
        {order.voucherSentAt ? (
          <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-800">
            Voucher sent
          </span>
        ) : (
          <span className="rounded-full bg-[#C8102E] px-2.5 py-0.5 text-xs font-semibold text-white">
            Needs voucher
          </span>
        )}
      </div>
    </Link>
  );
}

export default async function OfficePage() {
  if (!officeConfigured()) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16">
        <div className="rounded-xl border border-amber-300 bg-amber-50 p-6 text-amber-900">
          <h1 className="font-bold">Voucher Desk is not set up</h1>
          <p className="mt-2 text-sm">
            Set the OFFICE_PASSWORD environment variable (8+ characters) and redeploy.
          </p>
        </div>
      </div>
    );
  }

  if (!(await hasOfficeAccess())) {
    return <OfficeLoginForm />;
  }

  const orders = await listOfficeOrders();
  const pending = orders.filter((o) => !o.voucherSentAt);
  const sent = orders.filter((o) => o.voucherSentAt);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold tracking-widest text-[#C8102E] uppercase">
            Get Branson Tickets
          </p>
          <h1 className="text-3xl font-bold text-[#13264D]">Voucher Desk</h1>
        </div>
        <OfficeSignOutButton />
      </div>
      <p className="mt-2 text-sm text-gray-600">
        Paid ticket orders from Stripe, newest first. Open an order to check the
        details and send the voucher after the theater confirms the seats.
      </p>
      <p className="mt-2 flex flex-wrap gap-4 text-sm">
        <Link href="/office/passport" className="font-semibold text-[#C8102E] hover:underline">
          Passport QR tracking
        </Link>
        <Link href="/office/showtimes" className="font-semibold text-[#C8102E] hover:underline">
          Showtimes
        </Link>
      </p>

      <h2 className="mt-8 text-lg font-bold text-[#13264D]">
        Needs a voucher {pending.length > 0 && `(${pending.length})`}
      </h2>
      {pending.length === 0 ? (
        <p className="mt-3 rounded-xl border border-gray-200 bg-white p-5 text-sm text-gray-500">
          All caught up. New orders appear here as soon as they are paid.
        </p>
      ) : (
        <div className="mt-3 space-y-3">
          {pending.map((o) => (
            <OrderCard key={o.paymentIntentId} order={o} />
          ))}
        </div>
      )}

      {sent.length > 0 && (
        <>
          <h2 className="mt-10 text-lg font-bold text-[#13264D]">Voucher sent</h2>
          <div className="mt-3 space-y-3">
            {sent.map((o) => (
              <OrderCard key={o.paymentIntentId} order={o} />
            ))}
          </div>
        </>
      )}

      <p className="mt-10 text-xs text-gray-400">
        Showing the most recent 100 Stripe payments. Older orders live in the
        Stripe dashboard.
      </p>
    </div>
  );
}
