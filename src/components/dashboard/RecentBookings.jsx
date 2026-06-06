import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const rows = [
  { company: 'Global Innovations Inc.',          event: 'Tech Expo 2024',           booth: 'A-12', category: 'Exhibitor', sqm: 12, amount: 'SAR 15,000', status: 'CONFIRMED' },
  { company: 'Future Med',                       event: 'Health & Wellness Summit',  booth: 'C-08', category: 'Sponsor',   sqm: 24, amount: 'SAR 8,500',  status: 'PENDING'   },
  { company: 'Data Dynamics',                    event: 'Tech Expo 2024',            booth: 'B-22', category: 'Exhibitor', sqm: 9,  amount: 'SAR 12,000', status: 'CONFIRMED' },
  { company: 'Cyber Systems Group',              event: 'Tech Expo 2024',            booth: 'D-15', category: 'Exhibitor', sqm: 18, amount: 'SAR 22,000', status: 'RESERVED'  },
  { company: 'Eco-Friendly Logistics Solutions', event: 'Global Logistics Summit',   booth: 'L-09', category: 'Exhibitor', sqm: 36, amount: 'SAR 45,000', status: 'PENDING'   },
];

function StatusBadge({ status }) {
  if (status === 'CONFIRMED') {
    return <span className="bg-on-surface text-white px-2 py-0.5 text-[10px] font-bold uppercase rounded-xl">{status}</span>;
  }
  if (status === 'PENDING') {
    return <span className="bg-[#FF5F29] text-white px-2 py-0.5 text-[10px] font-bold uppercase rounded-xl">{status}</span>;
  }
  return <span className="border border-[#FF5F29] text-[#FF5F29] px-2 py-0.5 text-[10px] font-bold uppercase rounded-xl">{status}</span>;
}

export default function RecentBookings() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 1;
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      className="bg-white border border-outline-variant flex flex-col rounded-xl shadow-sm overflow-hidden"
      initial={shouldReduce ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
    >
      <div className="p-4 border-b border-outline-variant flex justify-between items-center">
        <h2 className="text-[20px] font-bold text-on-surface">Recent Bookings</h2>
        <button className="text-[#FF5F29] font-bold text-[14px]">View All</button>
      </div>
      <table className="w-full text-left border-collapse table-fixed" style={{ fontSize: '12px' }}>
        <thead>
          <tr className="bg-surface-container-low text-secondary">
            <th className="p-2 px-[8px] text-[12px] font-bold border-b border-outline-variant uppercase w-1/4">Company</th>
            <th className="p-2 px-[8px] text-[12px] font-bold border-b border-outline-variant uppercase">Booth</th>
            <th className="p-2 px-[8px] text-[12px] font-bold border-b border-outline-variant uppercase">Category</th>
            <th className="p-2 px-[8px] text-[12px] font-bold border-b border-outline-variant uppercase">SQM</th>
            <th className="p-2 px-[8px] text-[12px] font-bold border-b border-outline-variant uppercase">Amount</th>
            <th className="p-2 px-[8px] text-[12px] font-bold border-b border-outline-variant uppercase">Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <motion.tr
              key={i}
              initial={shouldReduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, ease: 'easeOut', delay: 0.4 + i * 0.04 }}
              whileHover={shouldReduce ? {} : { backgroundColor: 'rgba(255,95,41,0.04)' }}
            >
              <td className="p-2 px-[8px]">
                <p className="font-bold text-on-surface truncate">{row.company}</p>
                <p className="text-[10px] text-secondary">{row.event}</p>
              </td>
              <td className="p-2 px-[8px] text-on-surface">{row.booth}</td>
              <td className="p-2 px-[8px] text-on-surface">{row.category}</td>
              <td className="p-2 px-[8px] text-on-surface">{row.sqm} sqm</td>
              <td className="p-2 px-[8px] text-on-surface">{row.amount}</td>
              <td className="p-2 px-[8px]"><StatusBadge status={row.status} /></td>
            </motion.tr>
          ))}
        </tbody>
      </table>
      <div className="p-4 bg-white border-t border-outline-variant flex justify-between items-center text-[12px] text-secondary">
        <span>Showing {rows.length} of 56 bookings</span>
        <div className="flex gap-4">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className={`font-bold transition-colors ${currentPage === 1 ? 'opacity-40 cursor-not-allowed' : 'hover:text-[#FF5F29]'}`}
          >
            Prev
          </button>
          <button
            onClick={() => setCurrentPage((p) => p + 1)}
            className="font-bold hover:text-[#FF5F29] transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    </motion.div>
  );
}
