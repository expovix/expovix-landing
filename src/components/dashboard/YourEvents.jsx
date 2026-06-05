const events = [
  { title: 'Tech Expo 2024',           venue: 'ExCeL London',              status: 'ACTIVE',    occupancy: '45/120', pct: 37.5, dates: 'Nov 15–18, 2024' },
  { title: 'Health & Wellness Summit', venue: 'Messe Frankfurt',            status: 'UPCOMING',  occupancy: '12/50',  pct: 24,   dates: 'Jan 10–12, 2025' },
  { title: 'Global Logistics Summit',  venue: 'McCormick Place, Chicago',   status: 'UPCOMING',  occupancy: '0/200',  pct: 0,    dates: 'Mar 12–15, 2025'  },
];

const statusStyle = {
  ACTIVE: {
    background: '#DCFCE7',
    color: '#16A34A',
    fontSize: '11px',
    fontWeight: '600',
    padding: '3px 8px',
    borderRadius: '20px',
  },
  UPCOMING: {
    background: '#EFF6FF',
    color: '#2563EB',
    fontSize: '11px',
    fontWeight: '600',
    padding: '3px 8px',
    borderRadius: '20px',
  },
};

const cardBase = {
  background: 'white',
  border: '1px solid #F3F4F6',
  borderRadius: '12px',
  boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
  overflow: 'hidden',
  padding: '20px 24px',
  cursor: 'pointer',
  transition: 'transform 0.15s ease, box-shadow 0.15s ease',
};

export default function YourEvents() {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
      gap: '16px',
    }}>
      {events.map((e) => (
        <div
          key={e.title}
          style={cardBase}
          onMouseEnter={(el) => {
            el.currentTarget.style.transform = 'translateY(-2px)';
            el.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
          }}
          onMouseLeave={(el) => {
            el.currentTarget.style.transform = 'translateY(0)';
            el.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.06)';
          }}
        >
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
            <div style={{ minWidth: 0, marginRight: '12px' }}>
              <div style={{
                fontSize: '15px',
                fontWeight: '700',
                color: '#111827',
                marginBottom: '2px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}>
                {e.title}
              </div>
              <div style={{ fontSize: '13px', color: '#6B7280' }}>{e.venue}</div>
            </div>
            <span style={statusStyle[e.status]}>{e.status}</span>
          </div>

          {/* Occupancy */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <span style={{ fontSize: '12px', color: '#6B7280' }}>Occupancy</span>
            <span style={{ fontSize: '12px', fontWeight: '600', color: '#111827' }}>{e.occupancy}</span>
          </div>

          {/* Progress bar */}
          <div style={{
            width: '100%',
            background: '#F3F4F6',
            borderRadius: '99px',
            height: '6px',
            marginBottom: '10px',
          }}>
            <div style={{
              height: '6px',
              borderRadius: '99px',
              background: 'linear-gradient(90deg, #FF5F29, #FF8A65)',
              width: `${e.pct}%`,
              transition: 'width 0.4s ease',
            }} />
          </div>

          <div style={{ fontSize: '12px', color: '#9CA3AF' }}>{e.dates}</div>
        </div>
      ))}
    </div>
  );
}
