export default function RecentBookings(){
  const rows = [
    { company: 'Global Innovations Inc.', event: 'Tech Expo 2024', booth: 'A-12', category: 'Exhibitor', sqm: 12, amount: 'SAR 15,000', status: 'CONFIRMED' },
    { company: 'Future Med', event: 'Health & Wellness Summit', booth: 'C-08', category: 'Sponsor', sqm: 24, amount: 'SAR 8,500', status: 'PENDING' },
    { company: 'Data Dynamics', event: 'Tech Expo 2024', booth: 'B-22', category: 'Exhibitor', sqm: 9, amount: 'SAR 12,000', status: 'CONFIRMED' },
    { company: 'Cyber Systems Group', event: 'Tech Expo 2024', booth: 'D-15', category: 'Exhibitor', sqm: 18, amount: 'SAR 22,000', status: 'RESERVED' },
    { company: 'Eco-Friendly Logistics Solutions Ltd', event: 'Global Logistics Summit', booth: 'L-09', category: 'Exhibitor', sqm: 36, amount: 'SAR 45,000', status: 'PENDING' },
  ];

  const badge = (s) => {
    if (s === 'CONFIRMED') return <span className="bg-black text-white px-3 py-1 rounded text-xs">CONFIRMED</span>
    if (s === 'PENDING') return <span className="bg-[var(--color-primary)] text-white px-3 py-1 rounded text-xs">PENDING</span>
    return <span className="bg-white border border-[var(--color-primary)] text-[var(--color-primary)] px-3 py-1 rounded text-xs">RESERVED</span>
  }

  return (
    <div className="bg-white rounded-xl border p-5 mt-6" style={{borderColor:'var(--color-border)'}}>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-[var(--color-text-muted)] text-xs">
              <th className="px-3 py-2">Company</th>
              <th className="px-3 py-2">Booth</th>
              <th className="px-3 py-2">Category</th>
              <th className="px-3 py-2">SQM</th>
              <th className="px-3 py-2">Amount</th>
              <th className="px-3 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-b" style={{borderColor:'var(--color-border-light)'}}>
                <td className="px-3 py-3">
                  <div className="font-semibold">{r.company}</div>
                  <div className="text-xs text-[var(--color-text-muted)]">{r.event}</div>
                </td>
                <td className="px-3 py-3">{r.booth}</td>
                <td className="px-3 py-3">{r.category}</td>
                <td className="px-3 py-3">{r.sqm} sqm</td>
                <td className="px-3 py-3">{r.amount}</td>
                <td className="px-3 py-3">{badge(r.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between text-sm text-[var(--color-text-muted)] mt-4">
        <div>Showing 5 of 56 bookings</div>
        <div className="space-x-2">
          <button className="px-3 py-1 border rounded">Prev</button>
          <button className="px-3 py-1 border rounded">Next</button>
        </div>
      </div>
    </div>
  )
}
