import { motion, useReducedMotion } from 'framer-motion';

const rows = [
  { status: 'CONFIRMED', stands: 0,  sqm: 0,    sponsors: 0,  exhibitors: 0  },
  { status: 'RESERVED',  stands: 0,  sqm: 0,    sponsors: 0,  exhibitors: 0  },
  { status: 'AVAILABLE', stands: 59, sqm: 1347, sponsors: 26, exhibitors: 33 },
];

const totals = {
  stands:     rows.reduce((s, r) => s + r.stands, 0),
  sqm:        rows.reduce((s, r) => s + r.sqm, 0),
  sponsors:   rows.reduce((s, r) => s + r.sponsors, 0),
  exhibitors: rows.reduce((s, r) => s + r.exhibitors, 0),
};

function StatusBadge({ status }) {
  if (status === 'CONFIRMED') {
    return <span className="bg-on-surface text-white px-2 py-1 text-[12px] font-bold uppercase rounded-xl">{status}</span>;
  }
  if (status === 'RESERVED') {
    return <span className="border border-[#FF5F29] text-[#FF5F29] px-2 py-1 text-[12px] font-bold uppercase rounded-xl">{status}</span>;
  }
  return <span className="bg-surface-variant text-secondary px-2 py-1 text-[12px] font-bold uppercase rounded-xl">{status}</span>;
}

export default function InventoryOverview() {
  const shouldReduce = useReducedMotion();

  return (
    <motion.section
      className="bg-surface border border-outline-variant shadow-sm overflow-hidden flex flex-col rounded-xl mb-4"
      initial={shouldReduce ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
    >
      <div className="p-4 border-b border-outline-variant flex justify-between items-center bg-white">
        <h2 className="text-[20px] font-bold text-on-surface">Inventory Overview</h2>
      </div>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-[#FF5F29] text-white">
            <th className="p-4 text-[12px] font-bold text-white border-b border-outline-variant uppercase">Status</th>
            <th className="p-4 text-[12px] font-bold text-white border-b border-outline-variant uppercase">Total Stands</th>
            <th className="p-4 text-[12px] font-bold text-white border-b border-outline-variant uppercase">Total SQM</th>
            <th className="p-4 text-[12px] font-bold text-white border-b border-outline-variant uppercase border-l border-[#ff8b6b]">Sponsors Stands</th>
            <th className="p-4 text-[12px] font-bold text-white border-b border-outline-variant uppercase border-l border-[#ff8b6b]">Exhibitors Stands</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <motion.tr
              key={row.status}
              className="hover:bg-surface-container-low transition-colors"
              initial={shouldReduce ? false : { opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, ease: 'easeOut', delay: 0.3 + i * 0.05 }}
            >
              <td className="p-4"><StatusBadge status={row.status} /></td>
              <td className="p-4 text-right text-[20px] font-bold text-on-surface">{row.stands}</td>
              <td className="p-4 text-right text-[20px] font-bold text-on-surface">{row.sqm}</td>
              <td className="p-4 text-right text-[20px] font-bold text-on-surface border-l border-outline-variant">{row.sponsors}</td>
              <td className="p-4 text-right text-[20px] font-bold text-on-surface border-l border-outline-variant">{row.exhibitors}</td>
            </motion.tr>
          ))}
          <motion.tr
            className="bg-surface-variant font-bold border-t-2 border-outline"
            initial={shouldReduce ? false : { opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut', delay: 0.3 + rows.length * 0.05 }}
          >
            <td className="p-4 text-[12px] font-bold text-secondary uppercase">TOTAL</td>
            <td className="p-4 text-right text-[20px] font-bold text-on-surface">{totals.stands}</td>
            <td className="p-4 text-right text-[20px] font-bold text-on-surface">{totals.sqm}</td>
            <td className="p-4 text-right text-[20px] font-bold text-on-surface border-l border-outline-variant">{totals.sponsors}</td>
            <td className="p-4 text-right text-[20px] font-bold text-on-surface border-l border-outline-variant">{totals.exhibitors}</td>
          </motion.tr>
        </tbody>
      </table>
    </motion.section>
  );
}
