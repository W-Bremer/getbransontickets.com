"use client";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { JsonLd } from "@/components/json-ld";

interface FAQ {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQ[];
  title?: string;
}

export function FAQSection({ faqs, title = "Frequently Asked Questions" }: FAQSectionProps) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <section className="py-8">
      <JsonLd data={faqSchema} />

      <h2 className="text-2xl font-bold text-[#333333]">{title}</h2>

      <Accordion className="mt-6">
        {faqs.map((faq, i) => (
          <AccordionItem key={i} value={i}>
            <AccordionTrigger className="text-base font-semibold text-[#333333] hover:text-[#037B98] hover:no-underline [&>svg]:text-[#037B98]">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-[#333333]/70 leading-relaxed">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
