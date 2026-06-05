const cards = [
  { label: 'Total Booths',      value: '59',    sub: 'Available inventory',       showBar: false },
  { label: 'Confirmed',         value: '0',     sub: 'Signed contracts',           showBar: false },
  { label: 'Reserved',          value: '0',     sub: 'Deposits pending',           showBar: false },
  { label: 'Available',         value: '59',    sub: 'Open for sale — 0% sold',    showBar: true,  barPct: 0   },
  { label: 'Revenue Collected', value: 'SAR 0', sub: 'Payments received',          showBar: false },
  { label: 'Collection Rate',   value: '0%',    sub: 'Payment progress',           showBar: true,  barPct: 0   },
];

export default function KpiStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {cards.map((card) => {
        const pct = card.barPct ?? parseFloat(card.value);
        return (
          <div
            key={card.label}
            className="bg-white border border-outline-variant p-4 flex flex-col justify-between rounded-xl shadow-sm"
          >
            <p className="text-[12px] font-bold text-secondary uppercase tracking-wide mb-2">{card.label}</p>
            <p className="text-[40px] leading-tight text-on-surface font-bold tracking-tight">{card.value}</p>
            <p className="text-[12px] text-secondary mt-1">{card.sub}</p>
            {card.showBar && pct > 0 && (
              <div className="bg-surface-variant h-1.5 rounded-full mt-2">
                <div
                  className="bg-[#FF5F29] h-1.5 rounded-full"
                  style={{ width: `${pct}%` }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
