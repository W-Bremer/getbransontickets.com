import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { JsonLd } from "@/components/json-ld";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items
      .filter((item) => item.href)
      .map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.label,
        item: `https://getbransontickets.com${item.href}`,
      })),
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <nav
        aria-label="Breadcrumb"
        className={cn("flex items-center text-sm", className)}
      >
        <ol className="flex items-center gap-1.5">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={`${item.label}-${index}`} className="flex items-center gap-1.5">
                {index > 0 && (
                  <ChevronRight className="h-3.5 w-3.5 shrink-0 text-white/40" />
                )}
                {isLast || !item.href ? (
                  <span className="font-medium text-white truncate max-w-[200px]">
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="text-white/70 hover:text-[#D4A843] transition-colors truncate max-w-[200px]"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
