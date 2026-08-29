import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { Breadcrumbs } from "@/components/breadcrumbs";

export const metadata: Metadata = {
  title: `Terms and Conditions`,
  description:
    "Terms and conditions for using GetBransonTickets.com including ticket purchases, data collection, and promotional offers.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <>
      <section className="bg-[#13264D] pt-12 pb-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Terms and Conditions", href: "/terms" },
            ]}
            className="text-white/60 mb-6 [&_span]:text-white"
          />
          <h1 className="text-3xl sm:text-4xl font-bold text-white font-heading">
            Terms and Conditions
          </h1>
          <p className="mt-3 text-white/70">
            Last updated: April 16, 2026
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 prose prose-lg max-w-none prose-headings:text-[#13264D] prose-headings:font-heading">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing, browsing, or using the {siteConfig.name} website
            (&quot;Site&quot;), located at{" "}
            <Link href="/" className="text-[#E8C65A]">
              {siteConfig.url}
            </Link>
            , or by purchasing any tickets, products, or services through the
            Site, you (&quot;User,&quot; &quot;you,&quot; or &quot;your&quot;)
            agree to be bound by these Terms and Conditions (&quot;Terms&quot;).
            If you do not agree to these Terms, do not use the Site or purchase
            any tickets or services.
          </p>

          <h2>2. About Our Services</h2>
          <p>
            {siteConfig.name} operates as an authorized ticket reseller for
            select live entertainment shows, attractions, and events in Branson,
            Missouri. We sell tickets on behalf of partnered theaters and venues
            under Fully Independent Traveler (FIT) agreements. For shows and
            attractions where we do not hold a direct reseller agreement, we
            provide informational listings and link to the official venue website
            for ticket purchases.
          </p>

          <h2>3. Ticket Purchases</h2>
          <p>
            All ticket sales are final unless otherwise specified in our{" "}
            <Link href="/refund-policy" className="text-[#E8C65A]">
              Refund Policy
            </Link>
            . Prices listed on the Site are inclusive of all applicable taxes
            unless otherwise stated. {siteConfig.name} reserves the right to
            modify ticket prices at any time. Ticket availability is subject to
            change without notice and is not guaranteed until a confirmed
            reservation or purchase is completed.
          </p>
          <p>
            Purchased tickets are vouchers that must be exchanged for actual
            seating tickets at the venue box office. We recommend arriving at
            least 30 minutes prior to show time to pick up your tickets. There
            shall be no resale of tickets on theater property.
          </p>

          <h2>4. Collection, Use, and Sale of Personal Information</h2>
          <p>
            <strong>
              By using this Site, making a purchase, submitting a form, or
              providing your personal information in any way, you expressly
              acknowledge and consent to the following:
            </strong>
          </p>
          <ul>
            <li>
              <strong>Information We Collect:</strong> We collect personal
              information including but not limited to your name, email address,
              phone number, mailing address, billing information, travel dates,
              party size, and browsing behavior on the Site.
            </li>
            <li>
              <strong>How We Use Your Information:</strong> Your information may
              be used to process ticket orders, communicate with you about your
              reservations, send marketing and promotional communications, improve
              our Site and services, and share with our theater and venue partners
              for reservation fulfillment.
            </li>
            <li>
              <strong>Sale and Sharing of Information:</strong> You acknowledge
              and agree that {siteConfig.name} may sell, share, rent, or
              otherwise transfer your personal information to third parties,
              including but not limited to marketing partners, advertising
              networks, data brokers, affiliated businesses, and promotional
              partners. This includes sharing your contact information with third
              parties who may contact you regarding products, services, and offers
              that may be of interest to you.
            </li>
            <li>
              <strong>Opt-Out:</strong> You may opt out of future marketing
              communications from {siteConfig.name} by contacting us at{" "}
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-[#E8C65A]"
              >
                {siteConfig.email}
              </a>
              . However, opting out does not retroactively affect information
              already shared with third parties prior to your opt-out request.
            </li>
          </ul>

          <h2>5. Timeshare and Vacation Presentation Solicitation</h2>
          <p>
            <strong>
              By using this Site or making a purchase, you acknowledge and agree
              that:
            </strong>
          </p>
          <ul>
            <li>
              You may be contacted by {siteConfig.name}, our partners, or
              affiliated third parties regarding timeshare, vacation ownership, or
              vacation presentation opportunities in the Branson, Missouri area.
            </li>
            <li>
              Contact may occur by phone, text message, email, or direct mail
              using the information you have provided.
            </li>
            <li>
              Promotional offers, discounted tickets, or special packages offered
              through the Site may be contingent upon your attendance at a
              timeshare or vacation presentation tour. If a specific offer
              requires attendance at a presentation, this requirement will be
              disclosed at the time of the offer or at the time of ticket pickup.
            </li>
            <li>
              Participation in any timeshare or vacation presentation tour is
              voluntary unless explicitly stated as a condition of a specific
              promotional offer you accept.
            </li>
          </ul>

          <h2>6. Communication Consent</h2>
          <p>
            By providing your phone number, email address, or other contact
            information, you consent to receive communications from{" "}
            {siteConfig.name} and its partners via phone calls, text messages
            (SMS/MMS), emails, and direct mail. These communications may include
            transactional messages related to your purchases, as well as
            marketing and promotional messages. Message and data rates may apply.
            You may opt out of text messages by replying STOP at any time.
          </p>

          <h2>7. Disclaimer of Warranties</h2>
          <p>
            The Site and all tickets, services, and information provided through
            the Site are provided &quot;as is&quot; and &quot;as available&quot;
            without warranties of any kind, whether express or implied.{" "}
            {siteConfig.name} does not guarantee the accuracy of show times,
            dates, availability, descriptions, or other information listed on the
            Site. Shows and events are produced and managed by independent
            theaters and venues, and {siteConfig.name} is not responsible for
            changes, cancellations, or the quality of any performance.
          </p>

          <h2>8. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, {siteConfig.name}, its
            owners, officers, employees, agents, and affiliates shall not be
            liable for any indirect, incidental, special, consequential, or
            punitive damages, including but not limited to loss of enjoyment, loss
            of travel expenses, or emotional distress, arising out of or related
            to your use of the Site, purchase of tickets, attendance at any show
            or event, or participation in any promotional offer or timeshare
            presentation.
          </p>

          <h2>9. Indemnification</h2>
          <p>
            You agree to indemnify, defend, and hold harmless {siteConfig.name},
            its owners, officers, employees, agents, and affiliates from and
            against any and all claims, damages, losses, liabilities, costs, and
            expenses (including reasonable attorneys&apos; fees) arising out of or
            related to your use of the Site, breach of these Terms, or any dispute
            with a third party arising from information shared pursuant to these
            Terms.
          </p>

          <h2>10. Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the
            laws of the State of Missouri, without regard to its conflict of law
            provisions. Any disputes arising under these Terms shall be subject
            to the exclusive jurisdiction of the courts located in Taney County,
            Missouri.
          </p>

          <h2>11. Changes to These Terms</h2>
          <p>
            {siteConfig.name} reserves the right to modify these Terms at any
            time. Changes will be effective immediately upon posting on the Site.
            Your continued use of the Site after any changes constitutes
            acceptance of the revised Terms.
          </p>

          <h2>12. Contact Us</h2>
          <p>
            If you have questions about these Terms, please contact us:
          </p>
          <ul>
            <li>
              Email:{" "}
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-[#E8C65A]"
              >
                {siteConfig.email}
              </a>
            </li>
            <li>
              Phone:{" "}
              <a href={`tel:${siteConfig.phoneRaw}`} className="text-[#E8C65A]">
                {siteConfig.phone}
              </a>
            </li>
            <li>Address: {siteConfig.address}</li>
          </ul>
        </div>
      </section>
    </>
  );
}
