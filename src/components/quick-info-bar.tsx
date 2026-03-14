import { Clock, DollarSign, MapPin, Users } from "lucide-react";

interface QuickInfoBarProps {
  hours: string;
  priceRange: string;
  location: string;
  ageRange?: string;
}

export function QuickInfoBar({
  hours,
  priceRange,
  location,
  ageRange,
}: QuickInfoBarProps) {
  const items = [
    { icon: Clock, label: "Hours", value: hours },
    { icon: DollarSign, label: "Price", value: priceRange },
    { icon: MapPin, label: "Location", value: location },
    ...(ageRange
      ? [{ icon: Users, label: "Ages", value: ageRange }]
      : []),
  ];

  return (
    <div className="rounded-xl bg-[#F5F5F5] px-4 py-3 sm:px-6 sm:py-4">
      <div className="flex flex-wrap items-center gap-y-3">
        {items.map((item, i) => (
          <div key={item.label} className="flex items-center">
            {i > 0 && (
              <div className="mx-3 hidden h-6 w-px bg-[#333333]/15 sm:mx-4 sm:block" />
            )}
            <div className="flex items-center gap-2">
              <item.icon className="h-4.5 w-4.5 shrink-0 text-[#037B98]" />
              <div className="flex items-baseline gap-1.5">
                <span className="text-xs font-semibold uppercase tracking-wide text-[#333333]/40">
                  {item.label}
                </span>
                <span className="text-sm font-medium text-[#333333]">
                  {item.value}
                </span>
              </div>
            </div>
            {i < items.length - 1 && (
              <div className="mx-3 block h-6 w-px bg-[#333333]/15 sm:mx-4 sm:hidden" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
