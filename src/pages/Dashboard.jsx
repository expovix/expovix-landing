import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import TopBar from '../components/dashboard/TopBar';
import InventoryOverview from '../components/dashboard/InventoryOverview';
import KpiStats from '../components/dashboard/KpiStats';
import YourEvents from '../components/dashboard/YourEvents';
import RecentBookings from '../components/dashboard/RecentBookings';
import BoothBreakdown from '../components/dashboard/BoothBreakdown';
import SalesPipeline from '../components/dashboard/SalesPipeline';
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from 'recharts';

/* ── Chart 1 data ─────────────────────────────────────────── */
const DONUT_DATA = [
  { name: 'Available', value: 59, color: '#22C55E' },
  { name: 'Booked',    value: 0,  color: '#FF5F29' },
  { name: 'Reserved',  value: 0,  color: '#6366F1' },
];
const TOTAL_BOOTHS = DONUT_DATA.reduce((s, d) => s + d.value, 0);

/* ── Chart 2 data ─────────────────────────────────────────── */
const REVENUE_DATA = [
  { month: 'Jan', sar: 0       },
  { month: 'Feb', sar: 0       },
  { month: 'Mar', sar: 45000   },
  { month: 'Apr', sar: 82000   },
  { month: 'May', sar: 128000  },
  { month: 'Jun', sar: 95000   },
  { month: 'Jul', sar: 0       },
  { month: 'Aug', sar: 0       },
  { month: 'Sep', sar: 142000  },
  { month: 'Oct', sar: 168000  },
  { month: 'Nov', sar: 0       },
  { month: 'Dec', sar: 0       },
];

const cardStyle = {
  background: 'white',
  borderRadius: '12px',
  boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
  padding: '24px',
  marginBottom: '24px',
};

const sectionTitle = {
  fontSize: '16px',
  fontWeight: '600',
  color: '#111111',
  marginBottom: '16px',
  margin: 0,
};

/* Custom center label rendered inside the donut */
function DonutCenterLabel({ cx, cy }) {
  return (
    <text textAnchor="middle" dominantBaseline="central">
      <tspan x={cx} dy="-6" fontSize="22" fontWeight="700" fill="#111827">{TOTAL_BOOTHS}</tspan>
      <tspan x={cx} dy="20" fontSize="11" fill="#6B7280">Total Booths</tspan>
    </text>
  );
}

/* Revenue tooltip */
function RevenueTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: 'white', border: '1px solid #E5E7EB', borderRadius: '8px', padding: '8px 12px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)', fontSize: '13px' }}>
      <p style={{ margin: 0, fontWeight: '600', color: '#111827' }}>SAR {payload[0].value.toLocaleString()}</p>
    </div>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function check() {
      try {
        const { data } = await supabase.auth.getSession();
        const session = data?.session;
        if (!session && mounted) navigate('/login');
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

  return (
    <DashboardLayout>
      <TopBar />
      <main className="p-8 max-w-[1440px] mx-auto w-full flex flex-col gap-4">
        <InventoryOverview />
        <KpiStats />

        {/* ── Chart 1: Booth Status Donut ──────────────────────── */}
        <div style={cardStyle}>
          <p style={sectionTitle}>Booth Status Overview</p>
          <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '32px' }}>
            {/* Donut */}
            <div style={{ width: '160px', height: '160px', flexShrink: 0 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={DONUT_DATA}
                    cx="50%"
                    cy="50%"
                    innerRadius={44}
                    outerRadius={66}
                    dataKey="value"
                    strokeWidth={0}
                    labelLine={false}
                    label={false}
                  >
                    {DONUT_DATA.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <DonutCenterLabel cx={80} cy={80} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Legend */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {DONUT_DATA.map(entry => (
                <div key={entry.name} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: entry.color, flexShrink: 0 }} />
                  <span style={{ fontSize: '14px', color: '#374151' }}>{entry.name}</span>
                  <span style={{ fontSize: '14px', fontWeight: '700', color: '#111111', marginLeft: 'auto' }}>{entry.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Chart 2: Revenue Bar Chart ───────────────────────── */}
        <div style={cardStyle}>
          <p style={sectionTitle}>Revenue Overview</p>
          <div style={{ marginTop: '16px' }}>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={REVENUE_DATA} margin={{ top: 4, right: 8, left: 8, bottom: 0 }} barCategoryGap="35%">
                <CartesianGrid vertical={false} stroke="#F3F4F6" />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 11, fill: '#9CA3AF' }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: '#9CA3AF' }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={v => v === 0 ? '0' : `${(v / 1000).toFixed(0)}k`}
                />
                <Tooltip content={<RevenueTooltip />} cursor={{ fill: 'rgba(255,95,41,0.05)' }} />
                <Bar dataKey="sar" fill="#FF5F29" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <YourEvents />
        <RecentBookings />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <BoothBreakdown />
          <SalesPipeline />
        </div>
      </main>
    </DashboardLayout>
  );
}
