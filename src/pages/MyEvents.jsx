import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import TopBar from '../components/dashboard/TopBar';

const EVENTS = [
  { id: 1, name: 'Tech Expo 2024',           venue: 'ExCeL London',                         status: 'ACTIVE',   booked: 45, total: 120, dates: 'Nov 15–18, 2024' },
  { id: 2, name: 'Health & Wellness Summit', venue: 'Messe Frankfurt',                       status: 'UPCOMING', booked: 12, total: 50,  dates: 'Jan 10–12, 2025' },
  { id: 3, name: 'Global Logistics Summit',  venue: 'McCormick Place, Chicago',              status: 'UPCOMING', booked: 0,  total: 200, dates: 'Mar 12–15, 2025' },
  { id: 4, name: 'Saudi Food Expo 2025',     venue: 'Riyadh Intl. Convention Center',        status: 'DRAFT',    booked: 0,  total: 80,  dates: 'Apr 5–7, 2025'   },
  { id: 5, name: 'Pharma & Life Sciences',   venue: 'Dubai World Trade Centre',              status: 'UPCOMING', booked: 8,  total: 60,  dates: 'May 20–22, 2025' },
  { id: 6, name: 'Smart City Summit',        venue: 'KAPSARC, Riyadh',                       status: 'DRAFT',    booked: 0,  total: 100, dates: 'Jun 10–12, 2025' },
];

const STATUS_COLORS = {
  ACTIVE:   { background: '#DCFCE7', color: '#16A34A' },
  UPCOMING: { background: '#DBEAFE', color: '#1D4ED8' },
  DRAFT:    { background: '#F3F4F6', color: '#6B7280' },
};

export default function MyEvents() {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);
  const [search, setSearch] = useState('');

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

  const filtered = EVENTS.filter(e =>
    e.name.toLowerCase().includes(search.toLowerCase()) ||
    e.venue.toLowerCase().includes(search.toLowerCase())
  );

  const createBtn = (
    <button
      onClick={() => navigate('/create-event')}
      style={{
        background: '#FF5F29', color: 'white', fontWeight: '600',
        fontSize: '13px', padding: '8px 16px', borderRadius: '8px',
        border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px',
      }}
      onMouseEnter={e => { e.currentTarget.style.background = '#e54e1b'; }}
      onMouseLeave={e => { e.currentTarget.style.background = '#FF5F29'; }}
    >
      + Create Event
    </button>
  );

  return (
    <DashboardLayout>
      <TopBar title="My Events" rightContent={createBtn} />
      <div style={{ padding: '32px', background: '#F8F9FA', flex: 1 }}>

        {/* Search */}
        <input
          type="text"
          placeholder="Search events..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            width: '100%', maxWidth: '360px', padding: '9px 14px',
            border: '1px solid #E5E7EB', borderRadius: '8px', fontSize: '13px',
            outline: 'none', background: 'white', marginBottom: '24px',
            display: 'block',
          }}
        />

        {/* Empty state */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0', color: '#6B7280' }}>
            <Calendar size={40} style={{ margin: '0 auto 12px', color: '#D1D5DB' }} />
            <p style={{ fontSize: '16px', fontWeight: '600', color: '#111827', marginBottom: '6px' }}>
              No events yet
            </p>
            <p style={{ fontSize: '13px', marginBottom: '20px' }}>
              Get started by creating your first event.
            </p>
            <button
              onClick={() => navigate('/create-event')}
              style={{
                background: '#FF5F29', color: 'white', fontWeight: '600',
                fontSize: '13px', padding: '10px 20px', borderRadius: '8px',
                border: 'none', cursor: 'pointer',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#e54e1b'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#FF5F29'; }}
            >
              + Create your first event
            </button>
          </div>
        ) : (
          /* Events grid */
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '16px',
          }}>
            {filtered.map(event => {
              const pct = event.total > 0 ? Math.round((event.booked / event.total) * 100) : 0;
              return (
                <div
                  key={event.id}
                  style={{
                    background: 'white', borderRadius: '12px', padding: '20px',
                    border: '1px solid #F3F4F6', boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                    cursor: 'pointer', transition: 'box-shadow 0.15s ease',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)'; }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.06)'; }}
                >
                  {/* Name + badge */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <div style={{ minWidth: 0, marginRight: '10px' }}>
                      <p style={{ fontSize: '14px', fontWeight: '700', color: '#111827', marginBottom: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {event.name}
                      </p>
                      <p style={{ fontSize: '12px', color: '#6B7280' }}>{event.venue}</p>
                    </div>
                    <span style={{
                      ...STATUS_COLORS[event.status],
                      fontSize: '11px', fontWeight: '600',
                      padding: '3px 8px', borderRadius: '20px', whiteSpace: 'nowrap',
                    }}>
                      {event.status}
                    </span>
                  </div>

                  {/* Occupancy */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <span style={{ fontSize: '12px', color: '#6B7280' }}>Occupancy</span>
                    <span style={{ fontSize: '12px', fontWeight: '600', color: '#111827' }}>
                      {event.booked}/{event.total}
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div style={{ width: '100%', background: '#F3F4F6', borderRadius: '99px', height: '6px', margin: '4px 0 12px' }}>
                    <div style={{ height: '6px', borderRadius: '99px', background: '#FF5F29', width: `${pct}%`, transition: 'width 0.4s ease' }} />
                  </div>

                  {/* Date */}
                  <div style={{ fontSize: '12px', color: '#9CA3AF', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Calendar size={12} />
                    {event.dates}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
