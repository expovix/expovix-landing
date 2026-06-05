const breakdown = [
  ['Exhibitor',        33],
  ['Diamond Sponsor',   8],
  ['Platinum Sponsor',  6],
  ['Strategic Sponsor', 4],
  ['Gold Sponsor',      4],
];

const MAX = 33;

export default function BoothBreakdown() {
  return (
    <div style={{
      background: 'white',
      border: '1px solid #F3F4F6',
      borderRadius: '12px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
      overflow: 'hidden',
      padding: '24px',
    }}>
      <div style={{ fontSize: '15px', fontWeight: '700', color: '#111827', marginBottom: '20px' }}>
        Booth Category Breakdown
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {breakdown.map(([label, count]) => (
          <div key={label}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '6px',
            }}>
              <span style={{ fontSize: '13px', color: '#6B7280' }}>{label}</span>
              <span style={{ fontSize: '13px', fontWeight: '600', color: '#111827' }}>{count}</span>
            </div>
            <div style={{
              width: '100%',
              background: '#F3F4F6',
              borderRadius: '99px',
              height: '6px',
            }}>
              <div style={{
                height: '6px',
                borderRadius: '99px',
                background: 'linear-gradient(90deg, #FF5F29, #FF8A65)',
                width: `${(count / MAX) * 100}%`,
                transition: 'width 0.4s ease',
              }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
