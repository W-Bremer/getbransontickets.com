"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Calendar, Ticket, Star, Theater } from "lucide-react";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface Stat {
  icon: LucideIcon;
  value: number;
  suffix: string;
  label: string;
}

const stats: Stat[] = [
  { icon: Calendar, value: 60, suffix: "+", label: "Years of Shows" },
  { icon: Ticket, value: 500000, suffix: "+", label: "Shows Booked" },
  { icon: Star, value: 15000, suffix: "+", label: "5-Star Reviews" },
  { icon: Theater, value: 100, suffix: "+", label: "Shows Available" },
];

function formatNumber(n: number): string {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1).replace(/\.0$/, "")}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(0)}K`;
  return n.toString();
}

function AnimatedCounter({ value, suffix, inView }: { value: number; suffix: string; inView: boolean }) {
  return (
    <motion.span
      className="text-3xl font-bold text-white sm:text-4xl"
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
    >
      {inView ? (
        <motion.span
          key="counter"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {formatNumber(value)}{suffix}
        </motion.span>
      ) : (
        "0"
      )}
    </motion.span>
  );
}

interface TrustBarProps {
  className?: string;
}

export function TrustBar({ className }: TrustBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className={cn(
        "bg-[#7B1A1A] py-12 sm:py-16",
        className
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col items-center text-center"
              >
                <div className="mb-3 rounded-full bg-white/10 p-3">
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  inView={inView}
                />
                <span className="mt-1 text-sm text-white/70 font-medium">
                  {stat.label}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
