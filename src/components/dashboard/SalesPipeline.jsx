import { TrendingUp } from 'lucide-react';

const pipeline = [
  { status: 'Available',  booths: 59, sqm: '1,347 SQM', sar: 'SAR 0'   },
  { status: 'Reserved',   booths: 0,  sqm: '0 SQM',     sar: 'SAR 0'   },
  { status: 'Confirmed',  booths: 0,  sqm: '0 SQM',     sar: 'SAR 0'   },
];

export default function SalesPipeline() {
  return (
    <div className="bg-white border border-outline-variant p-4 flex flex-col justify-between rounded-xl shadow-sm">
      <div>
        <h2 className="text-[20px] font-bold text-on-surface mb-4">Sales Pipeline</h2>
        {/* Header row */}
        <div className="grid grid-cols-3 gap-2 p-3 bg-surface-container-low font-bold text-[12px] text-secondary uppercase rounded-xl mb-2">
          <span>Status</span>
          <span className="text-center">Booths</span>
          <span className="text-right">SQM/SAR</span>
        </div>
        {/* Pipeline rows */}
        <div className="flex flex-col gap-2">
          {pipeline.map((row) => (
            <div
              key={row.status}
              className="flex justify-between items-center p-3 bg-surface-container-low rounded-xl"
            >
              <span className="text-[14px] font-bold text-on-surface">{row.status}</span>
              <span className="text-[14px] font-bold text-[#FF5F29]">{row.booths}</span>
              <div className="text-right">
                <p className="text-[12px] text-on-surface">{row.sqm}</p>
                <p className="text-[10px] text-secondary">{row.sar}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Bottom section */}
      <div className="border-t border-outline-variant pt-4 mt-4 flex justify-between items-end">
        <div>
          <p className="text-[12px] text-secondary uppercase">Collection Rate</p>
          <p className="text-[30px] font-bold text-on-surface">0%</p>
          <p className="text-[10px] text-secondary">Of total pipeline value</p>
        </div>
        <div className="text-[12px] text-green-600 font-bold flex items-center gap-1">
          <TrendingUp size={16} />
          +2.5% this month
        </div>
      </div>
    </div>
  );
}
