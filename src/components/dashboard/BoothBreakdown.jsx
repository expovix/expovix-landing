const breakdown = [
  ['Exhibitor',        33],
  ['Diamond Sponsor',   8],
  ['Platinum Sponsor',  6],
  ['Strategic Sponsor', 4],
  ['Gold Sponsor',      4],
];

const MAX = 33;

export default function BoothBreakdown() {
  return (
    <div className="bg-white border border-outline-variant p-4 rounded-xl shadow-sm">
      <h2 className="text-[20px] font-bold text-on-surface mb-4">Booth Category Breakdown</h2>
      {breakdown.map(([label, count]) => (
        <div key={label} className="mb-3">
          <div className="flex justify-between text-[14px] mb-1">
            <span className="text-on-surface font-bold">{label}</span>
            <span className="text-secondary">{count}</span>
          </div>
          <div className="bg-surface-variant h-3 rounded-full">
            <div
              className="bg-[#FF5F29] h-3 rounded-full"
              style={{ width: `${(count / MAX) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
