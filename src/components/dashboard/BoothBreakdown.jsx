const breakdown = [
  ['Exhibitor',33],
  ['Diamond Sponsor',8],
  ['Platinum Sponsor',6],
  ['Strategic Sponsor',4],
  ['Gold Sponsor',4],
];

export default function BoothBreakdown(){
  const max = 33;
  return (
    <div className="bg-white rounded-xl border p-5" style={{borderColor:'var(--color-border)'}}>
      <h3 className="font-semibold mb-3">Booth Category Breakdown</h3>
      <div className="space-y-3">
        {breakdown.map(([label,count])=> (
          <div key={label}>
            <div className="flex justify-between text-sm">
              <div className="text-[var(--color-text-muted)]">{label}</div>
              <div className="font-semibold">{count}</div>
            </div>
            <div className="w-full bg-[var(--color-border-light)] h-1 rounded mt-2">
              <div className="h-1 rounded" style={{width:`${(count/max)*100}%`, backgroundColor:'var(--color-primary)'}} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
