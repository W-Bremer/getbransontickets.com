"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Quote } from "lucide-react";
import { cn } from "@/lib/utils";
import { RatingDisplay } from "@/components/rating-display";

interface Testimonial {
  name: string;
  location: string;
  rating: number;
  text: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Karen M.",
    location: "Dallas, TX",
    rating: 5,
    text: "We've been coming to Branson for 15 years and this was our best trip yet. Booking through here was so easy and the seats we got were incredible. Already planning next year!",
  },
  {
    name: "Robert & Linda S.",
    location: "Tulsa, OK",
    rating: 5,
    text: "The Haygoods blew us away! We had no idea what to expect but the energy, talent, and showmanship were absolutely world-class. Our grandkids are still talking about it.",
  },
  {
    name: "James T.",
    location: "Springfield, MO",
    rating: 4.5,
    text: "Took the family to three shows in two days. The dinner show combo was an amazing value. Great food and entertainment all in one. Highly recommend the package deals.",
  },
  {
    name: "Patricia W.",
    location: "Little Rock, AR",
    rating: 5,
    text: "As a first-time Branson visitor, I was impressed by the quality of every show we attended. The variety is unbelievable - comedy, music, magic, all top-notch.",
  },
  {
    name: "David & Carol H.",
    location: "Kansas City, MO",
    rating: 5,
    text: "Best customer service we've experienced. They helped us pick shows perfect for our family - including our teenager who ended up loving every minute. Thank you!",
  },
  {
    name: "Susan B.",
    location: "Memphis, TN",
    rating: 4.5,
    text: "The holiday Christmas shows are pure magic. We drove 5 hours and it was absolutely worth it. The whole strip was decorated beautifully. A wonderful tradition for our family.",
  },
];

interface TestimonialCarouselProps {
  className?: string;
}

export function TestimonialCarousel({ className }: TestimonialCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", slidesToScroll: 1 },
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  );
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className={cn("", className)}>
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex -ml-4">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="flex-[0_0_100%] min-w-0 pl-4 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
              >
                <div className="h-full rounded-2xl border border-gray-100 bg-[#FAF8F5] p-6 flex flex-col">
                  <Quote className="h-8 w-8 text-[#7B1A1A]/20 mb-3 shrink-0" />
                  <p className="text-[#333333]/80 text-sm leading-relaxed flex-1">
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <RatingDisplay rating={t.rating} showCount={false} size="sm" />
                    <p className="mt-1.5 font-semibold text-[#333333] text-sm">
                      {t.name}
                    </p>
                    <p className="text-xs text-gray-500">{t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {scrollSnaps.map((_, i) => (
            <button
              key={i}
              onClick={() => emblaApi?.scrollTo(i)}
              className={cn(
                "h-2.5 rounded-full transition-all duration-300",
                i === selectedIndex
                  ? "w-8 bg-[#7B1A1A]"
                  : "w-2.5 bg-[#7B1A1A]/20 hover:bg-[#7B1A1A]/40"
              )}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
    </div>
  );
}
