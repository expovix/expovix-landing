export default function SalesPipeline(){
  return (
    <div className="bg-white rounded-xl border p-5" style={{borderColor:'var(--color-border)'}}>
      <h3 className="font-semibold mb-3">Sales Pipeline</h3>
      <div className="text-sm grid grid-cols-3 gap-2">
        <div className="text-[var(--color-text-muted)]">Status</div>
        <div className="text-[var(--color-text-muted)]">Booths</div>
        <div className="text-[var(--color-text-muted)]">SQM / SAR</div>

        <div>Available</div>
        <div className="text-[var(--color-primary)] font-semibold">59</div>
        <div>1,347 SQM — SAR 0</div>

        <div>Reserved</div>
        <div>0</div>
        <div>0 SQM — SAR 0</div>

        <div>Confirmed</div>
        <div>0</div>
        <div>0 SQM — SAR 0</div>
      </div>

      <div className="mt-4">
        <div className="text-sm text-[var(--color-text-muted)]">COLLECTION RATE</div>
        <div className="text-3xl font-bold">0%</div>
        <div className="text-sm text-green-600">+2.5% this month</div>
        <div className="w-full bg-[var(--color-border-light)] h-2 rounded mt-3">
          <div className="h-2 rounded" style={{width:'0%', backgroundColor:'green'}} />
        </div>
      </div>
    </div>
  )
}
