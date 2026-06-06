import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { supabase } from '../lib/supabaseClient';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import TopBar from '../components/dashboard/TopBar';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Cell, ResponsiveContainer,
} from 'recharts';

const BOOKINGS = [
  { booth: 'A-12', exhibitor: 'Global Innovations Inc.',  event: 'Tech Expo 2024',          status: 'CONFIRMED', amount: 'SAR 15,000', date: 'Oct 12, 2024' },
  { booth: 'C-08', exhibitor: 'Future Med',               event: 'Health & Wellness Summit', status: 'PENDING',   amount: 'SAR 8,500',  date: 'Oct 14, 2024' },
  { booth: 'B-22', exhibitor: 'Data Dynamics',            event: 'Tech Expo 2024',           status: 'CONFIRMED', amount: 'SAR 12,000', date: 'Oct 15, 2024' },
  { booth: 'D-15', exhibitor: 'Cyber Systems Group',      event: 'Tech Expo 2024',           status: 'RESERVED',  amount: 'SAR 22,000', date: 'Oct 16, 2024' },
  { booth: 'L-09', exhibitor: 'Eco-Friendly Logistics',   event: 'Global Logistics Summit',  status: 'PENDING',   amount: 'SAR 45,000', date: 'Oct 17, 2024' },
  { booth: 'E-04', exhibitor: 'MedTech Arabia',           event: 'Health & Wellness Summit', status: 'CONFIRMED', amount: 'SAR 18,000', date: 'Oct 18, 2024' },
  { booth: 'F-11', exhibitor: 'NovaTech Solutions',       event: 'Tech Expo 2024',           status: 'RESERVED',  amount: 'SAR 9,500',  date: 'Oct 19, 2024' },
  { booth: 'G-03', exhibitor: 'Gulf Trading Co.',         event: 'Global Logistics Summit',  status: 'CONFIRMED', amount: 'SAR 32,000', date: 'Oct 20, 2024' },
];

const STATUS_COLORS = {
  CONFIRMED: { background: '#DCFCE7', color: '#16A34A' },
  RESERVED:  { background: '#FFF7ED', color: '#EA580C' },
  PENDING:   { background: '#F3F4F6', color: '#6B7280' },
};

const STATUS_BAR_COLORS = {
  CONFIRMED: '#22C55E',
  RESERVED:  '#6366F1',
  PENDING:   '#F59E0B',
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

function StatusBarTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: 'white', border: '1px solid #E5E7EB', borderRadius: '8px', padding: '8px 12px', fontSize: '12px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
      <p style={{ margin: 0, fontWeight: '600', color: '#111827' }}>{label}: {payload[0].value}</p>
    </div>
  );
}

export default function Bookings() {
  const navigate = useNavigate();
  const shouldReduce = useReducedMotion();
  const [checking, setChecking] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

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

  const counts = {
    CONFIRMED: BOOKINGS.filter(b => b.status === 'CONFIRMED').length,
    RESERVED:  BOOKINGS.filter(b => b.status === 'RESERVED').length,
    PENDING:   BOOKINGS.filter(b => b.status === 'PENDING').length,
  };

  const statusBarData = [
    { status: 'Confirmed', count: counts.CONFIRMED },
    { status: 'Reserved',  count: counts.RESERVED  },
    { status: 'Pending',   count: counts.PENDING   },
  ];

  const filtered = BOOKINGS.filter(b => {
    const q = search.toLowerCase();
    const matchSearch = b.exhibitor.toLowerCase().includes(q) ||
                        b.event.toLowerCase().includes(q) ||
                        b.booth.toLowerCase().includes(q);
    const matchStatus = statusFilter === 'All' || b.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const summaryCards = [
    { label: 'Total Bookings', value: BOOKINGS.length },
    { label: 'Confirmed',      value: counts.CONFIRMED },
    { label: 'Reserved',       value: counts.RESERVED  },
    { label: 'Pending',        value: counts.PENDING   },
  ];

  const exportBtn = (
    <button
      style={{
        border: '1px solid #E5E7EB', background: 'white', color: '#374151',
        fontWeight: '500', fontSize: '13px', padding: '8px 16px',
        borderRadius: '8px', cursor: 'pointer',
      }}
      onMouseEnter={e => { e.currentTarget.style.background = '#F9FAFB'; }}
      onMouseLeave={e => { e.currentTarget.style.background = 'white'; }}
    >
      Export CSV
    </button>
  );

  return (
    <DashboardLayout>
      <TopBar title="Bookings" rightContent={exportBtn} />
      <div style={{ padding: '32px', background: '#F8F9FA', flex: 1 }}>

        {/* Summary cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
          {summaryCards.map(({ label, value }, i) => (
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

        {/* Chart 5: Bookings by Status bar chart */}
        <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', padding: '24px', marginBottom: '24px' }}>
          <p style={{ fontSize: '16px', fontWeight: '600', color: '#111111', margin: '0 0 16px 0' }}>Bookings by Status</p>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={statusBarData} margin={{ top: 4, right: 8, left: 0, bottom: 0 }} barCategoryGap="50%">
              <XAxis
                dataKey="status"
                tick={{ fontSize: 12, fill: '#6B7280' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                domain={[0, 5]}
                tick={{ fontSize: 11, fill: '#9CA3AF' }}
                axisLine={false}
                tickLine={false}
                allowDecimals={false}
              />
              <Tooltip content={<StatusBarTooltip />} cursor={{ fill: 'rgba(0,0,0,0.04)' }} />
              <Bar dataKey="count" radius={[4, 4, 0, 0]} isAnimationActive={!shouldReduce}>
                {statusBarData.map((entry, i) => (
                  <Cell
                    key={i}
                    fill={STATUS_BAR_COLORS[entry.status.toUpperCase()] || '#6B7280'}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="Search bookings..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              flex: 1, maxWidth: '320px', padding: '8px 12px',
              border: '1px solid #E5E7EB', borderRadius: '8px',
              fontSize: '13px', outline: 'none', background: 'white',
            }}
          />
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            style={{
              padding: '8px 12px', border: '1px solid #E5E7EB', borderRadius: '8px',
              fontSize: '13px', outline: 'none', background: 'white', cursor: 'pointer',
            }}
          >
            {['All', 'CONFIRMED', 'RESERVED', 'PENDING'].map(s => <option key={s}>{s}</option>)}
          </select>
        </div>

        {/* Table */}
        <div style={{ background: 'white', border: '1px solid #F3F4F6', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.06)', overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead>
                <tr>
                  {['Booth ID', 'Exhibitor', 'Event', 'Status', 'Amount', 'Date'].map(h => (
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
                    <td style={{ ...tdStyle, fontWeight: '600', color: '#111827' }}>{row.booth}</td>
                    <td style={tdStyle}>{row.exhibitor}</td>
                    <td style={{ ...tdStyle, color: '#6B7280' }}>{row.event}</td>
                    <td style={tdStyle}>
                      <span style={{
                        ...STATUS_COLORS[row.status],
                        fontSize: '11px', fontWeight: '600',
                        padding: '3px 10px', borderRadius: '20px', display: 'inline-block',
                      }}>
                        {row.status}
                      </span>
                    </td>
                    <td style={{ ...tdStyle, fontWeight: '500' }}>{row.amount}</td>
                    <td style={{ ...tdStyle, color: '#9CA3AF' }}>{row.date}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ padding: '12px 16px', borderTop: '1px solid #F3F4F6', fontSize: '12px', color: '#9CA3AF' }}>
            Showing {filtered.length} of {BOOKINGS.length} bookings
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
