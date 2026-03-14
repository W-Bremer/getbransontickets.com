"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { JsonLd } from "@/components/json-ld";

const faqCategories = [
  {
    name: "Booking",
    faqs: [
      {
        question: "How do I book show tickets through GetBransonTickets.com?",
        answer:
          "You can book tickets directly on our website by browsing shows, selecting your preferred date and time, and completing the checkout process. You can also call us at 1-800-555-SHOW and one of our entertainment experts will help you book.",
      },
      {
        question: "Can I cancel or change my ticket reservation?",
        answer:
          "Yes! Most shows allow cancellations or changes up to 24 hours before the performance. Some limited engagement shows may have stricter policies. Contact us and we'll help you make any changes.",
      },
      {
        question: "Do I need to print my tickets?",
        answer:
          "Most Branson theaters accept digital tickets on your phone. After booking, you'll receive a confirmation email with your tickets. We recommend arriving 15-30 minutes early to pick up your seats.",
      },
      {
        question: "Are group discounts available?",
        answer:
          "Yes! Groups of 10 or more can receive special pricing on most Branson shows. Call us at 1-800-555-SHOW to discuss group rates and available packages.",
      },
    ],
  },
  {
    name: "Shows",
    faqs: [
      {
        question: "What is the most popular show in Branson?",
        answer:
          "The Haygoods is consistently Branson's #1 most-attended show, drawing over 7 million fans with their high-energy variety performance featuring 20+ instruments, lasers, and pyrotechnics. However, Branson has 50+ shows and the 'best' show depends on your personal preferences.",
      },
      {
        question: "How long do Branson shows typically last?",
        answer:
          "Most Branson shows run between 1.5 to 2.5 hours, including intermission. Dinner shows may run longer, typically 2.5 to 3 hours, as they include a full meal before or during the performance.",
      },
      {
        question: "Are Branson shows appropriate for children?",
        answer:
          "Most Branson shows are family-friendly and suitable for all ages. Each show listing on our site includes an age recommendation so you can make the best choice for your family. Some comedy shows may contain mild adult humor.",
      },
      {
        question: "What should I wear to a Branson show?",
        answer:
          "Branson shows are casual and comfortable. There's no dress code — jeans and comfortable clothing are perfectly fine. For dinner shows, some guests prefer to dress up a bit, but it's not required.",
      },
    ],
  },
  {
    name: "Deals",
    faqs: [
      {
        question: "What kind of deals do you offer?",
        answer:
          "We offer a variety of deals including BOGO (buy one, get one free) tickets, kids-free specials, family packages, early bird discounts, and seasonal promotions. Check our Deals page for current offers.",
      },
      {
        question: "How do BOGO offers work?",
        answer:
          "With BOGO deals, you purchase one full-price ticket and receive a second ticket free. Some BOGO offers apply to specific dates or show times. Check the deal details on each show listing for specifics.",
      },
      {
        question: "Do you price match?",
        answer:
          "We work directly with Branson theaters to offer competitive pricing. If you find a lower published price for the same show, date, and seat category, contact us and we'll do our best to match it.",
      },
    ],
  },
  {
    name: "Travel",
    faqs: [
      {
        question: "When is the best time to visit Branson?",
        answer:
          "Branson's show season runs from March through December. Spring (April-May) and fall (September-October) offer pleasant weather, fewer crowds, and great deals. Summer is peak season with the most shows running. November-December is magical with holiday shows and Silver Dollar City's Festival of Lights.",
      },
      {
        question: "How many shows can I see in one day?",
        answer:
          "Most visitors can comfortably see 2-3 shows per day — a morning or afternoon show and an evening performance. If you add a dinner show, you can potentially see 3 shows. We recommend not over-scheduling so you can enjoy other Branson attractions too.",
      },
      {
        question: "Where should I stay in Branson?",
        answer:
          "The 76 Country Boulevard (Highway 76) corridor puts you closest to most theaters. Table Rock Lake area is great for a more relaxed vacation. Downtown Branson Landing offers shopping and dining. Most hotels are within 15-20 minutes of all major shows.",
      },
      {
        question: "Is Branson easy to get to?",
        answer:
          "Branson has its own airport (Branson Airport, BKG) with limited service. Springfield-Branson National Airport (SGF) is about 45 minutes north and has more flight options. Branson is also easily accessible by car via US-65 from Springfield or AR-62 from Arkansas.",
      },
    ],
  },
  {
    name: "About Branson",
    faqs: [
      {
        question: "Why is Branson called the 'Live Entertainment Capital of the World'?",
        answer:
          "Branson, Missouri hosts more than 50 live performance theaters and over 100 shows, offering more live entertainment per capita than any other city on Earth. With roots going back to the 1960s, Branson has grown into a premier entertainment destination attracting over 7 million visitors annually.",
      },
      {
        question: "What else is there to do in Branson besides shows?",
        answer:
          "Branson offers Silver Dollar City theme park, Table Rock Lake water activities, the Branson Strip shopping, Dolly Parton's Stampede, scenic drives through the Ozarks, museums, zip lines, go-karts, and much more. It's a full vacation destination.",
      },
      {
        question: "Is Branson only for older visitors?",
        answer:
          "Not at all! While Branson has long been popular with retirees, the entertainment has evolved significantly. Today you'll find high-energy variety shows, acrobatics, magic, adventure attractions, theme parks, and water sports that appeal to visitors of all ages, especially families with children.",
      },
      {
        question: "How many visitors does Branson get each year?",
        answer:
          "Branson welcomes approximately 7-8 million visitors annually, making it one of the top vacation destinations in the Midwest. The city's 50+ theaters have a combined seating capacity of over 60,000.",
      },
    ],
  },
];

const allFaqs = faqCategories.flatMap((cat) => cat.faqs);

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const toggleItem = (question: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(question)) {
        next.delete(question);
      } else {
        next.add(question);
      }
      return next;
    });
  };

  const displayCategories =
    activeCategory === "all"
      ? faqCategories
      : faqCategories.filter((c) => c.name === activeCategory);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <JsonLd data={faqSchema} />

      {/* Header */}
      <section className="bg-[#7B1A1A] pt-12 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-white/60 mb-6">
            <Link href="/" className="hover:text-[#d4a843] transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">FAQ</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-heading">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 text-lg text-white/70 max-w-2xl">
            Find answers to common questions about booking Branson shows,
            planning your trip, and getting the best deals.
          </p>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto py-4 -mx-4 px-4 sm:mx-0 sm:px-0">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeCategory === "all"
                  ? "bg-[#7B1A1A] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              All Questions
            </button>
            {faqCategories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  activeCategory === cat.name
                    ? "bg-[#7B1A1A] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-10">
          {displayCategories.map((category) => (
            <div key={category.name}>
              <h2 className="text-xl font-bold text-[#7B1A1A] font-heading mb-4">
                {category.name}
              </h2>
              <div className="space-y-2">
                {category.faqs.map((faq) => {
                  const isOpen = openItems.has(faq.question);
                  return (
                    <div
                      key={faq.question}
                      className="rounded-xl border border-gray-200 overflow-hidden"
                    >
                      <button
                        onClick={() => toggleItem(faq.question)}
                        className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-gray-50 transition-colors"
                      >
                        <span className="font-semibold text-[#7B1A1A]">
                          {faq.question}
                        </span>
                        <ChevronDown
                          className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-200 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-5 pb-5 text-gray-600 leading-relaxed">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-16 bg-[#faf8f5]">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-[#7B1A1A] font-heading">
            Still Have Questions?
          </h2>
          <p className="mt-3 text-gray-600">
            Our Branson entertainment experts are happy to help.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#d4a843] text-white rounded-lg font-semibold hover:bg-[#b8922e] transition-colors"
            >
              Contact Us
            </Link>
            <Link
              href={`tel:${siteConfig.phoneRaw}`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-[#7B1A1A] text-[#7B1A1A] rounded-lg font-semibold hover:bg-[#7B1A1A] hover:text-white transition-all"
            >
              Call {siteConfig.phone}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
