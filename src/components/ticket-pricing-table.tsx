interface TicketPricingTableProps {
  adultPrice: number;
  childPrice: number;
  seniorPrice?: number;
  showName: string;
}

export function TicketPricingTable({
  adultPrice,
  childPrice,
  seniorPrice,
  showName,
}: TicketPricingTableProps) {
  const rows = [
    { label: "Adult", age: "13+", price: adultPrice },
    { label: "Child", age: "3–12", price: childPrice },
    ...(seniorPrice !== undefined
      ? [{ label: "Senior", age: "65+", price: seniorPrice }]
      : []),
  ];

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      {/* Header */}
      <div className="bg-[#037B98] px-5 py-3">
        <h3 className="text-lg font-bold text-white">
          {showName} — Ticket Prices
        </h3>
      </div>

      {/* Table */}
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-gray-200 bg-[#037B98]/5 text-sm font-semibold text-[#333333]">
            <th className="px-5 py-3">Ticket Type</th>
            <th className="px-5 py-3">Age</th>
            <th className="px-5 py-3 text-right">Price</th>
            <th className="px-5 py-3 text-right" />
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={row.label}
              className={
                i < rows.length - 1 ? "border-b border-gray-100" : ""
              }
            >
              <td className="px-5 py-3.5 font-medium text-[#333333]">
                {row.label}
              </td>
              <td className="px-5 py-3.5 text-sm text-[#333333]/60">
                {row.age}
              </td>
              <td className="px-5 py-3.5 text-right text-lg font-bold text-[#333333]">
                ${row.price}
              </td>
              <td className="px-5 py-3.5 text-right">
                <button
                  type="button"
                  className="rounded-lg bg-[#018941] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#018941]/90"
                >
                  Book
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Footer note */}
      <div className="border-t border-gray-200 bg-gray-50 px-5 py-3">
        <p className="text-xs text-[#333333]/50">
          Group discounts available for parties of 10 or more. Contact us for
          special pricing. Children under 3 admitted free.
        </p>
      </div>
    </div>
  );
}
