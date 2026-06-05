const thStyle = {
  padding: '12px 16px',
  fontSize: '12px',
  fontWeight: '600',
  color: 'white',
  textTransform: 'uppercase',
  textAlign: 'left',
  background: '#FF5F29',
  whiteSpace: 'nowrap',
};

const tdStyle = {
  padding: '14px 16px',
  borderBottom: '1px solid #F9FAFB',
  fontSize: '14px',
  color: '#374151',
  verticalAlign: 'middle',
};

const statusBadge = {
  CONFIRMED: {
    background: '#DCFCE7',
    color: '#16A34A',
    borderRadius: '20px',
    padding: '4px 10px',
    fontSize: '11px',
    fontWeight: '600',
    display: 'inline-block',
  },
  RESERVED: {
    background: '#EFF6FF',
    color: '#2563EB',
    borderRadius: '20px',
    padding: '4px 10px',
    fontSize: '11px',
    fontWeight: '600',
    display: 'inline-block',
  },
  AVAILABLE: {
    background: '#F3F4F6',
    color: '#374151',
    borderRadius: '20px',
    padding: '4px 10px',
    fontSize: '11px',
    fontWeight: '600',
    display: 'inline-block',
  },
};

const rows = [
  { status: 'CONFIRMED', stands: 0,  sqm: 0,    sponsors: 0,  exhibitors: 0  },
  { status: 'RESERVED',  stands: 0,  sqm: 0,    sponsors: 0,  exhibitors: 0  },
  { status: 'AVAILABLE', stands: 59, sqm: 1347, sponsors: 26, exhibitors: 33 },
];

export default function InventoryOverview() {
  return (
    <div style={{
      background: 'white',
      border: '1px solid #F3F4F6',
      borderRadius: '12px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
      overflow: 'hidden',
    }}>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Total Stands</th>
              <th style={thStyle}>Total SQM</th>
              <th style={thStyle}>Sponsor Stands</th>
              <th style={thStyle}>Exhibitor Stands</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr
                key={r.status}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#FAFAFA'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                style={{ transition: 'background 0.1s ease' }}
              >
                <td style={tdStyle}>
                  <span style={statusBadge[r.status]}>{r.status}</span>
                </td>
                <td style={tdStyle}>{r.stands}</td>
                <td style={tdStyle}>{r.sqm}</td>
                <td style={tdStyle}>{r.sponsors}</td>
                <td style={tdStyle}>{r.exhibitors}</td>
              </tr>
            ))}
            <tr style={{ background: '#F9FAFB' }}>
              <td style={{ ...tdStyle, fontWeight: '700', color: '#111827', borderBottom: 'none' }}>TOTAL</td>
              <td style={{ ...tdStyle, fontWeight: '700', color: '#111827', borderBottom: 'none' }}>59</td>
              <td style={{ ...tdStyle, fontWeight: '700', color: '#111827', borderBottom: 'none' }}>1347</td>
              <td style={{ ...tdStyle, fontWeight: '700', color: '#111827', borderBottom: 'none' }}>26</td>
              <td style={{ ...tdStyle, fontWeight: '700', color: '#111827', borderBottom: 'none' }}>33</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
