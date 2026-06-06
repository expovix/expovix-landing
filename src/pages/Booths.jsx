import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { supabase } from '../lib/supabaseClient';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import TopBar from '../components/dashboard/TopBar';
import {
  PieChart, Pie, Cell, ResponsiveContainer,
} from 'recharts';

const BOOTHS = [
  { number: 'A-01', size: 9,  type: 'Standard', status: 'Available', price: 'SAR 8,000',  event: 'Tech Expo 2024'           },
  { number: 'A-12', size: 12, type: 'Standard', status: 'Booked',    price: 'SAR 15,000', event: 'Tech Expo 2024'           },
  { number: 'B-04', size: 18, type: 'Corner',   status: 'Reserved',  price: 'SAR 22,000', event: 'Tech Expo 2024'           },
  { number: 'B-22', size: 9,  type: 'Standard', status: 'Booked',    price: 'SAR 12,000', event: 'Tech Expo 2024'           },
  { number: 'C-08', size: 24, type: 'Island',   status: 'Booked',    price: 'SAR 30,000', event: 'Health & Wellness Summit' },
  { number: 'D-01', size: 9,  type: 'Standard', status: 'Available', price: 'SAR 8,000',  event: 'Health & Wellness Summit' },
  { number: 'D-15', size: 18, type: 'Corner',   status: 'Reserved',  price: 'SAR 22,000', event: 'Tech Expo 2024'           },
  { number: 'E-04', size: 12, type: 'Standard', status: 'Booked',    price: 'SAR 18,000', event: 'Health & Wellness Summit' },
  { number: 'L-09', size: 36, type: 'Island',   status: 'Booked',    price: 'SAR 45,000', event: 'Global Logistics Summit'  },
  { number: 'M-02', size: 9,  type: 'Standard', status: 'Available', price: 'SAR 9,000',  event: 'Global Logistics Summit'  },
];

const EVENTS = ['All Events', 'Tech Expo 2024', 'Health & Wellness Summit', 'Global Logistics Summit'];

const STATUS_COLORS = {
  Available: { background: '#DCFCE7', color: '#16A34A' },
  Booked:    { background: '#FFF7ED', color: '#EA580C' },
  Reserved:  { background: '#DBEAFE', color: '#1D4ED8' },
};

const thStyle = {
  padding: '10px 16px', fontSize: '11px', fontWeight: '600', color: '#6B7280',
  textTransform: 'uppercase', letterSpacing: '0.06em',
  background: '#F9FAFB', borderBottom: '1px solid #E5E7EB',
  textAlign: 'left', whiteSpace: 'nowrap',
};
const tdStyle = {
  padding: '12px 16px', fontSize: '13px', color: '#374151',
  borderBottom: '1px solid #F9FAFB', verticalAlign: 'middle',
};

function DonutCenterLabel({ cx, cy, total }) {
  return (
    <text textAnchor="middle" dominantBaseline="central">
      <tspan x={cx} dy="-6" fontSize="20" fontWeight="700" fill="#111827">{total}</tspan>
      <tspan x={cx} dy="18" fontSize="10" fill="#6B7280">Booths</tspan>
    </text>
  );
}

export default function Booths() {
  const navigate = useNavigate();
  const shouldReduce = useReducedMotion();
  const [checking, setChecking] = useState(true);
  const [search, setSearch] = useState('');
  const [eventFilter, setEventFilter] = useState('All Events');

  useEffect(() => {
    let mounted = true;
    async function check() {
      try {
        const { data } = await supabase.auth.getSession();
        if (!data?.session && mounted) navigate('/login');
      } catch {
        if (mounted) navigate('/login');
      } finally {
        if (mounted) setChecking(false);
      }
    }
    check();
    return () => { mounted = false; };
  }, [navigate]);

  if (checking) return null;

  const available = BOOTHS.filter(b => b.status === 'Available').length;
  const reserved  = BOOTHS.filter(b => b.status === 'Reserved').length;
  const booked    = BOOTHS.filter(b => b.status === 'Booked').length;
  const total     = BOOTHS.length;

  const donutData = [
    { name: 'Available', value: available, color: '#22C55E' },
    { name: 'Booked',    value: booked,    color: '#FF5F29' },
    { name: 'Reserved',  value: reserved,  color: '#6366F1' },
  ];

  const filtered = BOOTHS.filter(b => {
    const q = search.toLowerCase();
    const matchSearch = b.number.toLowerCase().includes(q) || b.type.toLowerCase().includes(q);
    const matchEvent  = eventFilter === 'All Events' || b.event === eventFilter;
    return matchSearch && matchEvent;
  });

  return (
    <DashboardLayout>
      <TopBar title="Booths" rightContent={null} />
      <div style={{ padding: '32px', background: '#F8F9FA', flex: 1 }}>

        {/* Summary cards + Donut chart — 2/3 + 1/3 layout */}
        <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', alignItems: 'flex-start', flexWrap: 'wrap' }}>

          {/* Left: summary cards (2/3) */}
          <div style={{ flex: '2', minWidth: '220px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            {[
              { label: 'Total Booths', value: total     },
              { label: 'Available',    value: available  },
              { label: 'Booked',       value: booked + reserved },
            ].map(({ label, value }, i) => (
              <motion.div
                key={label}
                style={{ background: 'white', border: '1px solid #F3F4F6', borderRadius: '12px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}
                initial={shouldReduce ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: 'easeOut', delay: i * 0.1 }}
                whileHover={shouldReduce ? {} : { scale: 1.02, transition: { duration: 0.2 } }}
              >
                <p style={{ fontSize: '11px', fontWeight: '600', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>
                  {label}
                </p>
                <p style={{ fontSize: '28px', fontWeight: '700', color: '#111827' }}>{value}</p>
              </motion.div>
            ))}
          </div>

          {/* Right: donut chart (1/3) */}
          <div style={{ flex: '1', minWidth: '200px', background: 'white', border: '1px solid #F3F4F6', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
            <p style={{ fontSize: '13px', fontWeight: '600', color: '#111111', marginBottom: '12px' }}>Status Breakdown</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
              <div style={{ width: 120, height: 120, flexShrink: 0 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={donutData}
                      cx="50%"
                      cy="50%"
                      innerRadius={36}
                      outerRadius={52}
                      dataKey="value"
                      strokeWidth={0}
                      label={false}
                      labelLine={false}
                    >
                      {donutData.map((entry, i) => (
                        <Cell key={i} fill={entry.color} />
                      ))}
                    </Pie>
                    <DonutCenterLabel cx={60} cy={60} total={total} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {donutData.map(entry => (
                  <div key={entry.name} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: entry.color, flexShrink: 0 }} />
                    <span style={{ fontSize: '12px', color: '#6B7280', minWidth: '60px' }}>{entry.name}</span>
                    <span style={{ fontSize: '12px', fontWeight: '700', color: '#111827' }}>{entry.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="Search booths..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              flex: 1, maxWidth: '320px', padding: '8px 12px',
              border: '1px solid #E5E7EB', borderRadius: '8px',
              fontSize: '13px', outline: 'none', background: 'white',
            }}
          />
          <select
            value={eventFilter}
            onChange={e => setEventFilter(e.target.value)}
            style={{
              padding: '8px 12px', border: '1px solid #E5E7EB', borderRadius: '8px',
              fontSize: '13px', outline: 'none', background: 'white', cursor: 'pointer',
            }}
          >
            {EVENTS.map(ev => <option key={ev}>{ev}</option>)}
          </select>
        </div>

        {/* Table */}
        <div style={{ background: 'white', border: '1px solid #F3F4F6', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.06)', overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead>
                <tr>
                  {['Booth #', 'Size (sqm)', 'Type', 'Status', 'Price', 'Event'].map(h => (
                    <th key={h} style={thStyle}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((row, i) => (
                  <motion.tr
                    key={i}
                    initial={shouldReduce ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.25, ease: 'easeOut', delay: i * 0.03 }}
                    style={{ cursor: 'default' }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#FFF7F5'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
                  >
                    <td style={{ ...tdStyle, fontWeight: '600', color: '#111827' }}>{row.number}</td>
                    <td style={tdStyle}>{row.size}</td>
                    <td style={tdStyle}>{row.type}</td>
                    <td style={tdStyle}>
                      <span style={{
                        ...STATUS_COLORS[row.status],
                        fontSize: '11px', fontWeight: '600',
                        padding: '3px 10px', borderRadius: '20px', display: 'inline-block',
                      }}>
                        {row.status}
                      </span>
                    </td>
                    <td style={{ ...tdStyle, fontWeight: '500' }}>{row.price}</td>
                    <td style={{ ...tdStyle, color: '#9CA3AF', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '180px' }}>{row.event}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ padding: '12px 16px', borderTop: '1px solid #F3F4F6', fontSize: '12px', color: '#9CA3AF' }}>
            Showing {filtered.length} of {BOOTHS.length} booths
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
