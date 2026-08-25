import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { Breadcrumbs } from "@/components/breadcrumbs";

export const metadata: Metadata = {
  title: `Refund Policy`,
  description:
    "Refund and cancellation policy for tickets purchased through GetBransonTickets.com. Learn about cancellation windows, no-show policies, and refund procedures.",
  alternates: { canonical: "/refund-policy" },
};

export default function RefundPolicyPage() {
  return (
    <>
      <section className="bg-[#13264D] pt-12 pb-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Refund Policy", href: "/refund-policy" },
            ]}
            className="text-white/60 mb-6 [&_span]:text-white"
          />
          <h1 className="text-3xl sm:text-4xl font-bold text-white font-heading">
            Refund &amp; Cancellation Policy
          </h1>
          <p className="mt-3 text-white/70">
            Last updated: April 16, 2026
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 prose prose-lg max-w-none prose-headings:text-[#13264D] prose-headings:font-heading">
          <h2>Overview</h2>
          <p>
            {siteConfig.name} is committed to providing a fair and transparent
            refund and cancellation policy for all ticket purchases. Because we
            work with multiple theaters and venues, each with their own policies,
            the specific terms may vary depending on the show. The policies below
            reflect our general terms and the requirements of our venue partners.
          </p>

          <h2>Cancellation Windows</h2>
          <p>
            Cancellations and refund eligibility depend on how far in advance you
            notify us before the scheduled show time:
          </p>

          <h3>Grand Country Music Hall Shows</h3>
          <p>
            Includes: Grand Jubilee, Comedy Jamboree, Down Home Country, Pets
            &amp; Giggles, New South Gospel, Ozarks Gospel, and Ozarks Country.
          </p>
          <ul>
            <li>
              <strong>2+ hours before show time:</strong> Full refund or
              rescheduling available at no charge.
            </li>
            <li>
              <strong>Less than 2 hours before show time:</strong> No refund
              available. You will be charged the full ticket price.
            </li>
            <li>
              <strong>No-shows:</strong> Customers who do not arrive for their
              reserved show without prior cancellation will be charged the full
              ticket price with no refund.
            </li>
          </ul>

          <h3>The Duttons at Dutton Family Theater</h3>
          <ul>
            <li>
              <strong>24+ hours before show time:</strong> Full refund or
              rescheduling available.
            </li>
            <li>
              <strong>Less than 24 hours before show time:</strong> No refund
              available. You will be charged the full ticket price.
            </li>
            <li>
              <strong>No-shows:</strong> Full ticket price will be charged with
              no refund.
            </li>
          </ul>

          <h3>Mickey Gilley Grand Shanghai Theatre Shows</h3>
          <p>
            Includes: Amazing Acrobats of Shanghai (Grand Shanghai Circus) and
            The Texas Tenors.
          </p>
          <ul>
            <li>
              <strong>24+ hours before show time:</strong> Full refund or
              rescheduling available.
            </li>
            <li>
              <strong>Less than 24 hours before show time:</strong> No refund
              available.
            </li>
            <li>
              <strong>No-shows:</strong> Full ticket price will be charged with
              no refund.
            </li>
          </ul>

          <h2>How to Request a Cancellation or Refund</h2>
          <p>
            To cancel a reservation or request a refund, please contact us as
            soon as possible using one of the following methods:
          </p>
          <ul>
            <li>
              <strong>Phone:</strong>{" "}
              <a href={`tel:${siteConfig.phoneRaw}`} className="text-[#d4a843]">
                {siteConfig.phone}
              </a>{" "}
              (available during business hours)
            </li>
            <li>
              <strong>Email:</strong>{" "}
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-[#d4a843]"
              >
                {siteConfig.email}
              </a>
            </li>
          </ul>
          <p>
            When requesting a cancellation, please provide your confirmation
            number, the name on the reservation, the show name, and the date and
            time of the performance.
          </p>

          <h2>Refund Processing</h2>
          <ul>
            <li>
              Approved refunds will be processed to the original payment method
              within 5-10 business days.
            </li>
            <li>
              Refunds for credit card purchases may take an additional 3-5
              business days to appear on your statement depending on your
              financial institution.
            </li>
          </ul>

          <h2>Show Cancellations by Venues</h2>
          <p>
            In the rare event that a show is cancelled by the theater or venue
            (due to weather, performer illness, or other unforeseen
            circumstances), you will receive a full refund or the option to
            reschedule at no additional charge. {siteConfig.name} is not
            responsible for any additional expenses incurred due to a venue
            cancellation, including but not limited to travel, lodging, or meal
            costs.
          </p>

          <h2>Exchanges and Rescheduling</h2>
          <p>
            Subject to availability, we may be able to reschedule your
            reservation to a different date or time for the same show. Exchanges
            are subject to the same cancellation windows listed above. Please
            contact us as early as possible to arrange an exchange.
          </p>

          <h2>Non-Refundable Situations</h2>
          <ul>
            <li>
              Failure to arrive at the venue on time (late arrivals may be denied
              entry at the venue&apos;s discretion)
            </li>
            <li>
              Dissatisfaction with the show content or performance quality
            </li>
            <li>
              Cancellations requested after the applicable cancellation deadline
            </li>
            <li>No-shows without prior notice</li>
            <li>
              Tickets purchased through a promotional offer where
              &quot;non-refundable&quot; was stated at the time of purchase
            </li>
          </ul>

          <h2>Important Reminders</h2>
          <ul>
            <li>
              Tickets are vouchers and must be exchanged for actual seating
              tickets at the box office. Please arrive at least 30 minutes before
              show time.
            </li>
            <li>
              There is no resale of tickets on theater property.
            </li>
            <li>
              Special promotional tickets or packages may have additional
              restrictions. These will be communicated at the time of purchase.
            </li>
          </ul>

          <h2>Contact Us</h2>
          <p>
            If you have questions about our refund policy, please don&apos;t
            hesitate to reach out:
          </p>
          <ul>
            <li>
              Email:{" "}
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-[#d4a843]"
              >
                {siteConfig.email}
              </a>
            </li>
            <li>
              Phone:{" "}
              <a href={`tel:${siteConfig.phoneRaw}`} className="text-[#d4a843]">
                {siteConfig.phone}
              </a>
            </li>
            <li>Address: {siteConfig.address}</li>
          </ul>

          <div className="mt-8 p-6 rounded-xl bg-[#faf8f5] border border-gray-100">
            <p className="text-sm text-gray-600">
              By purchasing tickets through {siteConfig.name}, you acknowledge
              that you have read and agree to this Refund Policy as well as our{" "}
              <Link href="/terms" className="text-[#d4a843] font-medium">
                Terms and Conditions
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
