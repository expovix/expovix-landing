const events = [
  { title: 'Tech Expo 2024', venue: 'ExCeL London', status: 'ACTIVE', occupancy: '45/120', dates: 'Nov 15–18 2024' },
  { title: 'Health & Wellness Summit', venue: 'Messe Frankfurt', status: 'UPCOMING', occupancy: '12/50', dates: 'Jan 10–12 2025' },
  { title: 'Global Logistics Summit', venue: 'McCormick Place Chicago', status: 'UPCOMING', occupancy: '0/200', dates: 'March 12–15 2025' },
];

export default function YourEvents(){
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
      {events.map((e)=> (
        <div key={e.title} className="bg-white rounded-xl border p-4" style={{borderColor:'var(--color-border)'}}>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold">{e.title}</div>
              <div className="text-sm text-[var(--color-text-muted)]">{e.venue}</div>
            </div>
            <div>
              <span className={`px-2 py-1 text-xs rounded ${e.status==='ACTIVE' ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'}`}>{e.status}</span>
            </div>
          </div>

          <div className="mt-3">
            <div className="flex items-center justify-between text-sm">
              <div className="text-[var(--color-text-muted)]">Occupancy</div>
              <div className="font-semibold">{e.occupancy}</div>
            </div>
            <div className="w-full bg-[var(--color-border-light)] h-1 mt-2 rounded">
              <div className="h-1 rounded" style={{width:'36%', backgroundColor:'var(--color-primary)'}} />
            </div>
            <div className="text-sm text-[var(--color-text-muted)] mt-2">{e.dates}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
