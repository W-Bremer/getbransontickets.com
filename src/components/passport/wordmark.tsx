import { cn } from "@/lib/utils";

/**
 * "TIX BR★NSON" lockup used on Passport surfaces and printed partner kits,
 * matching the counter-card artwork.
 */
export function TixBransonWordmark({
  className,
  starClassName,
  subline = true,
}: {
  className?: string;
  starClassName?: string;
  subline?: boolean;
}) {
  return (
    <span className={cn("inline-flex flex-col items-center leading-none", className)}>
      <span className="marquee flex items-center whitespace-nowrap">
        TIX BR
        <svg
          viewBox="0 0 24 24"
          className={cn("mx-[0.06em] h-[0.72em] w-[0.72em] shrink-0", starClassName)}
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12 2.2l2.83 6.34 6.9.72-5.15 4.63 1.45 6.78L12 17.3l-6.03 3.37 1.45-6.78L2.27 9.26l6.9-.72z" />
        </svg>
        NSON
      </span>
      {subline && (
        <span className="mt-[0.35em] text-[0.28em] font-semibold tracking-[0.42em] opacity-80">
          YOUR BRANSON CONNECTION
        </span>
      )}
    </span>
  );
}
