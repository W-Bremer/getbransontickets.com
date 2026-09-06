import type { Show } from "@/data/shows";
import { siteConfig } from "@/lib/config";
import { VOUCHER_SLA_HOURS } from "@/lib/order-confirmation-template";
import { formatBasePrice } from "@/lib/tax";

export interface ShowFaq {
  question: string;
  answer: string;
}

type Topic = "duration" | "price" | "showtimes" | "location" | "refund" | "delivery";

/**
 * A curated FAQ in shows.ts that clearly covers one of these topics wins over
 * the generated one, so hand-written answers (the Acrobats set, a theater's
 * quirks) are never duplicated. Patterns are deliberately narrow: "When is
 * the season?" should not swallow the showtimes entry.
 */
const TOPIC_PATTERNS: Record<Topic, RegExp> = {
  duration: /how long|duration|run ?time/i,
  price: /how much|cost|price/i,
  showtimes: /show ?times?|what time|when does .* play|when are|schedule/i,
  location: /where (does|is|do)|located|address|parking|directions/i,
  refund: /cancel|refund|plans change/i,
  delivery: /get (my|our|the) tickets|deliver|print/i,
};

/** Sentences in scheduleNote written for the office, not for customers. */
const INTERNAL_NOTE =
  /verified|office confirms|deliberately|not loaded|refresh from|we do not sell|separate theater product|listed explicitly|sold by phone only/i;

function customerScheduleNote(note: string | undefined): string | null {
  if (!note) return null;
  const kept = note
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter((s) => s && !INTERNAL_NOTE.test(s));
  return kept.length ? kept.join(" ") : null;
}

function listWords(items: string[]): string {
  if (items.length <= 1) return items.join("");
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
}

function generated(show: Show): { topic: Topic; faq: ShowFaq }[] {
  const out: { topic: Topic; faq: ShowFaq }[] = [];
  const sells = show.isFeaturedPartner;

  const shortName = show.name.replace(/^The /, "");
  out.push({
    topic: "duration",
    faq: {
      question: `How long is the ${shortName} show?`,
      answer: `About ${show.duration}. Plan to arrive 30 minutes early to park and find your seats.`,
    },
  });

  if (sells) {
    const adult = `$${formatBasePrice(show.priceFrom)} plus tax`;
    let kids = "";
    if (show.childPriceFrom === 0) {
      kids = ", and kids' tickets are free";
    } else if (show.childPriceFrom !== undefined && show.childPriceFrom < show.priceFrom) {
      kids = `, and kids' tickets are $${formatBasePrice(show.childPriceFrom)} plus tax`;
    }
    const student =
      show.studentPriceFrom !== undefined
        ? ` Students pay $${formatBasePrice(show.studentPriceFrom)} plus tax.`
        : "";
    const under =
      show.kidsFreeUnderAge !== undefined
        ? ` Children ${show.kidsFreeUnderAge} and under are free.`
        : "";
    out.push({
      topic: "price",
      faq: {
        question: `How much are ${show.name} tickets?`,
        answer: `Adult tickets are ${adult}${kids}.${student}${under} There are no added fees, and your total never tops the theater box office rate.`,
      },
    });
  }

  const note = customerScheduleNote(show.scheduleNote);
  const times = note
    ? note
    : `Showtimes are typically ${listWords(show.showTimes)}.${
        show.darkDays.length ? ` The show is dark on ${listWords(show.darkDays)}.` : ""
      } The season runs ${show.seasonStart} through ${show.seasonEnd}.`;
  out.push({
    topic: "showtimes",
    faq: {
      question: `When are ${show.name} showtimes?`,
      answer: sells
        ? `${times} The booking calendar on this page shows every date and time the theater has on sale.`
        : `${times} Tickets are sold by the theater, so check its official site for exact dates.`,
    },
  });

  out.push({
    topic: "location",
    faq: {
      question: `Where does ${show.name} play?`,
      answer: `At ${show.theater}, ${show.theaterAddress}. Parking is available at the theater.`,
    },
  });

  if (sells) {
    out.push({
      topic: "refund",
      faq: {
        question: "What if our plans change?",
        answer: `You can cancel for a full refund up to 24 hours before showtime. Need a different date instead? Call us at ${siteConfig.phone} and we will switch it.`,
      },
    });
    out.push({
      topic: "delivery",
      faq: {
        question: "How do we get our tickets?",
        answer: `Your confirmation email arrives within minutes, and your tickets follow in a second email within ${VOUCHER_SLA_HOURS} hours. Show them at the theater box office on your phone or printed.`,
      },
    });
  }

  return out;
}

/**
 * The FAQ list for a show page: the curated questions from shows.ts first,
 * then the evergreen booking questions (price, showtimes, location, refunds,
 * delivery, duration) generated from the same data the page renders, so they
 * can never drift from the sticker price or the schedule. Every entry lands
 * in the page's FAQPage markup.
 */
export function buildShowFaqs(show: Show): ShowFaq[] {
  const curated = show.faqs;
  const extras = generated(show)
    .filter(({ topic }) => !curated.some((f) => TOPIC_PATTERNS[topic].test(f.question)))
    .map(({ faq }) => faq);
  return [...curated, ...extras];
}
