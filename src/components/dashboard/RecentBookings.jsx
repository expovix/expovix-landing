const rows = [
  { company: 'Global Innovations Inc.',           event: 'Tech Expo 2024',             booth: 'A-12', category: 'Exhibitor', sqm: 12, amount: 'SAR 15,000', status: 'CONFIRMED' },
  { company: 'Future Med',                        event: 'Health & Wellness Summit',   booth: 'C-08', category: 'Sponsor',   sqm: 24, amount: 'SAR 8,500',  status: 'PENDING'   },
  { company: 'Data Dynamics',                     event: 'Tech Expo 2024',             booth: 'B-22', category: 'Exhibitor', sqm: 9,  amount: 'SAR 12,000', status: 'CONFIRMED' },
  { company: 'Cyber Systems Group',               event: 'Tech Expo 2024',             booth: 'D-15', category: 'Exhibitor', sqm: 18, amount: 'SAR 22,000', status: 'RESERVED'  },
  { company: 'Eco-Friendly Logistics Solutions',  event: 'Global Logistics Summit',    booth: 'L-09', category: 'Exhibitor', sqm: 36, amount: 'SAR 45,000', status: 'PENDING'   },
];

const badgeStyle = {
  CONFIRMED: {
    background: '#DCFCE7',
    color: '#16A34A',
    borderRadius: '20px',
    padding: '4px 10px',
    fontSize: '11px',
    fontWeight: '600',
    display: 'inline-block',
  },
  PENDING: {
    background: '#FEF9C3',
    color: '#CA8A04',
    borderRadius: '20px',
    padding: '4px 10px',
    fontSize: '11px',
    fontWeight: '600',
    display: 'inline-block',
  },
  RESERVED: {
    background: '#EFF6FF',
    color: '#2563EB',
    border: '1px solid #BFDBFE',
    borderRadius: '20px',
    padding: '4px 10px',
    fontSize: '11px',
    fontWeight: '600',
    display: 'inline-block',
  },
};

const thStyle = {
  padding: '12px 16px',
  fontSize: '11px',
  fontWeight: '600',
  color: '#6B7280',
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  textAlign: 'left',
  background: '#F9FAFB',
  borderBottom: '1px solid #E5E7EB',
  whiteSpace: 'nowrap',
};

const tdStyle = {
  padding: '14px 16px',
  borderBottom: '1px solid #F9FAFB',
  verticalAlign: 'middle',
};

export default function RecentBookings() {
  return (
    <div style={{
      background: 'white',
      border: '1px solid #F3F4F6',
      borderRadius: '12px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
      overflow: 'hidden',
    }}>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
          <thead>
            <tr>
              <th style={thStyle}>Company</th>
              <th style={thStyle}>Booth</th>
              <th style={thStyle}>Category</th>
              <th style={thStyle}>SQM</th>
              <th style={thStyle}>Amount</th>
              <th style={thStyle}>Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr
                key={i}
                style={{ transition: 'background 0.1s ease', cursor: 'default' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#FAFAFA'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
              >
                <td style={tdStyle}>
                  <div style={{ fontWeight: '600', color: '#111827', fontSize: '14px' }}>{r.company}</div>
                  <div style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '2px' }}>{r.event}</div>
                </td>
                <td style={{ ...tdStyle, color: '#374151' }}>{r.booth}</td>
                <td style={{ ...tdStyle, color: '#374151' }}>{r.category}</td>
                <td style={{ ...tdStyle, color: '#374151' }}>{r.sqm} sqm</td>
                <td style={{ ...tdStyle, color: '#374151', fontWeight: '500' }}>{r.amount}</td>
                <td style={tdStyle}>
                  <span style={badgeStyle[r.status]}>{r.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '14px 16px',
        borderTop: '1px solid #F3F4F6',
      }}>
        <span style={{ fontSize: '13px', color: '#6B7280' }}>Showing 5 of 56 bookings</span>
        <div style={{ display: 'flex', gap: '8px' }}>
          {['Prev', 'Next'].map((label) => (
            <button
              key={label}
              style={{
                border: '1px solid #E5E7EB',
                borderRadius: '6px',
                padding: '6px 14px',
                fontSize: '13px',
                color: '#374151',
                background: 'white',
                cursor: 'pointer',
                transition: 'background 0.1s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#F9FAFB'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'white'; }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
