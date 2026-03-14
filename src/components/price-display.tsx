import { cn } from "@/lib/utils";

interface PriceDisplayProps {
  priceFrom: number;
  priceTo?: number;
  showPerPerson?: boolean;
  variant?: "teal" | "green";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeStyles = {
  sm: { label: "text-xs", price: "text-lg", sub: "text-[10px]", range: "text-sm" },
  md: { label: "text-xs", price: "text-3xl", sub: "text-xs", range: "text-base" },
  lg: { label: "text-sm", price: "text-4xl", sub: "text-sm", range: "text-lg" },
};

const variantStyles = {
  teal: { label: "text-[#037B98]", price: "text-[#333333]" },
  green: { label: "text-[#018941]", price: "text-[#018941]" },
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
          <span className={cn("text-gray-400", styles.range)}>– ${priceTo}</span>
        )}
      </div>
      {showPerPerson && (
        <span className={cn("text-gray-500 mt-1", styles.sub)}>per person</span>
      )}
    </div>
  );
}
