const cards = [
  { label: 'TOTAL BOOTHS', value: '59', sub: 'Available inventory' },
  { label: 'CONFIRMED', value: '0', sub: 'Signed contracts' },
  { label: 'RESERVED', value: '0', sub: 'Deposits pending' },
  { label: 'AVAILABLE', value: '59', sub: 'Open for sale — 0% sold' },
  { label: 'REVENUE COLLECTED', value: 'SAR 0', sub: 'Payments received' },
  { label: 'COLLECTION RATE', value: '0%', sub: 'Payment progress' },
];

export default function KpiStats(){
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-6">
      {cards.map((c)=> (
        <div key={c.label} className="bg-white rounded-xl border p-4" style={{borderColor:'var(--color-border)'}}>
          <div className="text-xs font-semibold uppercase text-[var(--color-text-muted)]">{c.label}</div>
          <div className="text-2xl font-bold text-[var(--color-text)]">{c.value}</div>
          <div className="text-xs text-[var(--color-text-muted)]">{c.sub}</div>
          {c.label === 'COLLECTION RATE' && (
            <div className="w-full bg-[var(--color-border-light)] h-2 rounded mt-3">
              <div className="bg-gray-300 h-2 rounded" style={{width:'0%'}} />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
