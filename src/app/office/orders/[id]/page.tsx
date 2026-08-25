import Link from "next/link";
import { hasOfficeAccess, officeConfigured } from "@/lib/office-auth";
import { getOfficeOrder, officeTime } from "@/lib/office-orders";
import { OfficeLoginForm } from "@/components/office/login-form";
import { VoucherEditor } from "@/components/office/voucher-editor";

export const dynamic = "force-dynamic";

export default async function OfficeOrderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  if (!officeConfigured() || !(await hasOfficeAccess())) {
    return <OfficeLoginForm />;
  }

  const { id } = await params;
  const order = await getOfficeOrder(id);

  if (!order) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16">
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <h1 className="font-bold text-[#13264D]">Order not found</h1>
          <p className="mt-2 text-sm text-gray-600">
            No paid ticket order matches this link. It may be a Passport
            subscription payment, or the payment id is wrong.
          </p>
          <Link
            href="/office"
            className="mt-4 inline-block text-sm font-semibold text-[#C8102E] hover:underline"
          >
            Back to the Voucher Desk
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <Link href="/office" className="text-sm text-gray-500 hover:text-[#13264D]">
        &larr; Voucher Desk
      </Link>
      <div className="mt-2 flex flex-wrap items-baseline justify-between gap-2">
        <h1 className="text-3xl font-bold text-[#13264D]">{order.orderNumber}</h1>
        <span className="text-sm text-gray-500">Paid {officeTime(order.created)}</span>
      </div>
      <p className="mt-1 text-sm text-gray-600">
        Box office confirmation number: <span className="font-mono">{order.confirmationNumber}</span>
      </p>
      <VoucherEditor order={order} />
    </div>
  );
}
