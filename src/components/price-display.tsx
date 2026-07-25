import { cn } from "@/lib/utils";

interface PriceDisplayProps {
  priceFrom: number;
  priceTo?: number;
  showPerPerson?: boolean;
  variant?: "teal" | "green" | "light";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeStyles = {
  sm: { label: "text-xs", price: "text-lg", sub: "text-[10px]", range: "text-sm" },
  md: { label: "text-xs", price: "text-3xl", sub: "text-xs", range: "text-base" },
  lg: { label: "text-sm", price: "text-4xl", sub: "text-sm", range: "text-lg" },
};

const variantStyles = {
  teal: { label: "text-[#13264D]", price: "text-[#1A1614]" },
  green: { label: "text-[#C8102E]", price: "text-[#C8102E]" },
  light: { label: "text-[#E8C65A]", price: "text-white" },
};

export function PriceDisplay({
  priceFrom,
  priceTo,
  showPerPerson = true,
  variant = "teal",
  size = "md",
  className,
}: PriceDisplayProps) {
  const styles = sizeStyles[size];
  const colors = variantStyles[variant];

  return (
    <div className={cn("flex flex-col", className)}>
      <span className={cn("font-medium uppercase tracking-wider", styles.label, colors.label)}>
        Tickets From
      </span>
      <div className="flex items-baseline gap-2">
        <span className={cn("font-bold leading-none", styles.price, colors.price)}>
          ${priceFrom}
        </span>
        {priceTo && priceTo !== priceFrom && (
          <span className={cn(variant === "light" ? "text-white/60" : "text-gray-400", styles.range)}>– ${priceTo}</span>
        )}
      </div>
      {showPerPerson && (
        <span className={cn(variant === "light" ? "text-white/60" : "text-gray-500", "mt-1", styles.sub)}>per person</span>
      )}
    </div>
  );
}
