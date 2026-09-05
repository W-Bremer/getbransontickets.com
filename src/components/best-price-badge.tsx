/**
 * The Get Branson Tickets Best Price Guarantee seal. Pure inline SVG in the
 * site palette so it stays crisp at any size with zero image weight.
 */
export function BestPriceBadge({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm ${className}`}
    >
      <svg
        viewBox="0 0 120 120"
        className="h-24 w-24 shrink-0"
        role="img"
        aria-label="Get Branson Tickets Best Price Guarantee seal"
      >
        {/* Scalloped seal edge */}
        <g fill="#C8102E">
          {Array.from({ length: 24 }, (_, i) => {
            const a = (i / 24) * 2 * Math.PI;
            return (
              <circle
                key={i}
                cx={60 + 54 * Math.cos(a)}
                cy={60 + 54 * Math.sin(a)}
                r={7}
              />
            );
          })}
        </g>
        <circle cx="60" cy="60" r="54" fill="#C8102E" />
        <circle cx="60" cy="60" r="47" fill="#13264D" stroke="#E8C65A" strokeWidth="2.5" />
        <circle
          cx="60"
          cy="60"
          r="41"
          fill="none"
          stroke="#E8C65A"
          strokeWidth="1"
          strokeDasharray="2.5 3"
        />
        {/* Star */}
        <path
          d="M60 26 l3.5 7.5 8.2 1 -6 5.7 1.6 8.1 -7.3-4 -7.3 4 1.6-8.1 -6-5.7 8.2-1z"
          fill="#E8C65A"
        />
        <text
          x="60"
          y="63"
          textAnchor="middle"
          fill="#FFFFFF"
          fontFamily="Arial, sans-serif"
          fontSize="13.5"
          fontWeight="bold"
          letterSpacing="0.5"
        >
          BEST PRICE
        </text>
        <text
          x="60"
          y="78"
          textAnchor="middle"
          fill="#E8C65A"
          fontFamily="Arial, sans-serif"
          fontSize="11"
          fontWeight="bold"
          letterSpacing="1"
        >
          GUARANTEE
        </text>
        <text
          x="60"
          y="92"
          textAnchor="middle"
          fill="#FFFFFF"
          fontFamily="Arial, sans-serif"
          fontSize="6.5"
          letterSpacing="1.5"
        >
          GET BRANSON TICKETS
        </text>
      </svg>
      <div className="min-w-0">
        <p className="text-sm font-bold text-[#1A1614]">Best Price Guarantee</p>
        <p className="mt-1 text-xs leading-relaxed text-[#1A1614]/70">
          Find a better price on the same show, date, and seats? Call us before
          you book and we will match it.
        </p>
      </div>
    </div>
  );
}
