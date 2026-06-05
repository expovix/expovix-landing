const cards = [
  { label: 'Total Booths',       value: '59',      sub: 'Available inventory'   },
  { label: 'Confirmed',          value: '0',       sub: 'Signed contracts'       },
  { label: 'Reserved',           value: '0',       sub: 'Deposits pending'       },
  { label: 'Available',          value: '59',      sub: 'Open for sale — 0% sold'},
  { label: 'Revenue Collected',  value: 'SAR 0',   sub: 'Payments received'      },
  { label: 'Collection Rate',    value: '0%',      sub: 'Payment progress'       },
];

const cardStyle = {
  background: 'white',
  border: '1px solid #F3F4F6',
  borderRadius: '12px',
  boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
  padding: '24px',
  overflow: 'hidden',
};

export default function KpiStats() {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
      gap: '16px',
    }}>
      {cards.map((c) => (
        <div key={c.label} style={cardStyle}>
          <div style={{
            fontSize: '12px',
            fontWeight: '500',
            color: '#6B7280',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '8px',
          }}>
            {c.label}
          </div>
          <div style={{
            fontSize: '28px',
            fontWeight: '700',
            color: '#111827',
            lineHeight: '1.1',
            marginBottom: '4px',
          }}>
            {c.value}
          </div>
          <div style={{ fontSize: '12px', color: '#9CA3AF' }}>
            {c.sub}
          </div>
          {c.label === 'Collection Rate' && (
            <div style={{
              width: '100%',
              background: '#F3F4F6',
              borderRadius: '99px',
              height: '6px',
              marginTop: '12px',
            }}>
              <div style={{
                height: '6px',
                borderRadius: '99px',
                background: 'linear-gradient(90deg, #FF5F29, #FF8A65)',
                width: '0%',
              }} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
