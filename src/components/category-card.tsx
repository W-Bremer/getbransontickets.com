"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Music, Laugh, Wand2, UtensilsCrossed, Guitar, Star, Users, Dumbbell, Drama } from "lucide-react";

interface CategoryCardProps {
  name: string;
  slug: string;
  description: string;
  showCount: number;
  index?: number;
  className?: string;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "variety-music": Music,
  comedy: Laugh,
  magic: Wand2,
  "dinner-shows": UtensilsCrossed,
  "country-gospel": Guitar,
  tribute: Star,
  family: Users,
  acrobats: Dumbbell,
  theatrical: Drama,
};

export function CategoryCard({
  name,
  slug,
  description,
  showCount,
  index = 0,
  className,
}: CategoryCardProps) {
  const Icon = iconMap[slug] || Star;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: "easeOut" }}
      className={cn("group", className)}
    >
      <Link href={`/shows/category/${slug}`} className="block">
        <div className="relative overflow-hidden rounded-2xl border border-[#037B98]/10 bg-white p-5 sm:p-6 transition-all duration-300 group-hover:scale-[1.02] group-hover:border-[#037B98]/30 group-hover:shadow-xl group-hover:shadow-[#037B98]/5">
          <div className="mb-3 inline-flex rounded-xl bg-[#037B98] p-3">
            <Icon className="h-5 w-5 text-white" />
          </div>
          <span className="absolute top-3 right-3 rounded-full bg-[#F76E00]/10 px-2 py-0.5 text-xs font-semibold text-[#F76E00]">
            {showCount}
          </span>
          <h3 className="text-sm sm:text-base font-bold text-[#333333] group-hover:text-[#037B98] transition-colors leading-tight">
            {name}
          </h3>
          <p className="mt-1 text-xs text-gray-500 line-clamp-2 hidden sm:block">
            {description}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
