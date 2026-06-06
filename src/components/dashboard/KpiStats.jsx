import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  LineChart, Line, ResponsiveContainer,
} from 'recharts';

const REVENUE_SPARKLINE = [0,0,45,82,128,95,0,0,142,168,0,0].map((v, i) => ({ v }));
const RATE_SPARKLINE    = [0,0,12,24,38,28,0,0,42,51,0,0].map((v, i)    => ({ v }));

const cards = [
  { label: 'Total Booths',      value: '59',    numeric: 59, prefix: '',     suffix: '',  sub: 'Available inventory',    showBar: false, sparkline: null },
  { label: 'Confirmed',         value: '0',     numeric: 0,  prefix: '',     suffix: '',  sub: 'Signed contracts',        showBar: false, sparkline: null },
  { label: 'Reserved',          value: '0',     numeric: 0,  prefix: '',     suffix: '',  sub: 'Deposits pending',        showBar: false, sparkline: null },
  { label: 'Available',         value: '59',    numeric: 59, prefix: '',     suffix: '',  sub: 'Open for sale — 0% sold', showBar: true,  barPct: 0, sparkline: null },
  { label: 'Revenue Collected', value: 'SAR 0', numeric: 0,  prefix: 'SAR ', suffix: '',  sub: 'Payments received',       showBar: false, sparkline: REVENUE_SPARKLINE, sparkColor: '#FF5F29' },
  { label: 'Collection Rate',   value: '0%',    numeric: 0,  prefix: '',     suffix: '%', sub: 'Payment progress',        showBar: true,  barPct: 0, sparkline: RATE_SPARKLINE, sparkColor: '#22C55E' },
];

function useCountUp(target, duration = 1200, enabled = true) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!enabled || target === 0) { setCount(target); return; }
    const start = performance.now();
    let raf;
    function tick(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, enabled]);
  return count;
}

function KpiCard({ card, index, shouldReduce }) {
  const count = useCountUp(card.numeric, 1200, !shouldReduce);
  const displayValue = shouldReduce
    ? card.value
    : `${card.prefix}${count}${card.suffix}`;

  const pct = card.barPct ?? parseFloat(card.value);

  return (
    <motion.div
      className="bg-white border border-outline-variant p-4 flex flex-col justify-between rounded-xl shadow-sm"
      initial={shouldReduce ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut', delay: index * 0.1 }}
      whileHover={shouldReduce ? {} : {
        scale: 1.02,
        y: -3,
        boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
        transition: { duration: 0.2 },
      }}
    >
      <p className="text-[11px] font-semibold text-secondary uppercase tracking-wide mb-2">{card.label}</p>
      <p className="text-[28px] leading-tight text-on-surface font-bold tracking-tight">{displayValue}</p>
      <p className="text-[12px] font-normal text-secondary mt-1">{card.sub}</p>

      {card.showBar && pct > 0 && (
        <div className="bg-surface-variant h-1.5 rounded-full mt-2">
          <div className="bg-[#FF5F29] h-1.5 rounded-full" style={{ width: `${pct}%` }} />
        </div>
      )}

      {/* Sparkline — bottom-right of card, Revenue Collected and Collection Rate only */}
      {card.sparkline && (
        <div style={{ width: '100%', height: 32, marginTop: 8 }}>
          <ResponsiveContainer width="100%" height={32}>
            <LineChart data={card.sparkline} margin={{ top: 2, right: 2, left: 2, bottom: 2 }}>
              <Line
                type="monotone"
                dataKey="v"
                stroke={card.sparkColor}
                strokeWidth={2}
                dot={false}
                isAnimationActive={!shouldReduce}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </motion.div>
  );
}

export default function KpiStats() {
  const shouldReduce = useReducedMotion();
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {cards.map((card, i) => (
        <KpiCard key={card.label} card={card} index={i} shouldReduce={shouldReduce} />
      ))}
    </div>
  );
}
