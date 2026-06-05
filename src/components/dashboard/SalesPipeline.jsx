const pipeline = [
  { status: 'Available',  booths: 59, detail: '1,347 SQM — SAR 0', highlight: true },
  { status: 'Reserved',   booths: 0,  detail: '0 SQM — SAR 0',     highlight: false },
  { status: 'Confirmed',  booths: 0,  detail: '0 SQM — SAR 0',     highlight: false },
];

export default function SalesPipeline() {
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
        Sales Pipeline
      </div>

      {/* Table */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 80px 1fr',
          gap: '8px',
          padding: '0 0 8px 0',
          borderBottom: '1px solid #F3F4F6',
          marginBottom: '8px',
        }}>
          {['Status', 'Booths', 'SQM / SAR'].map((h) => (
            <span key={h} style={{
              fontSize: '11px',
              fontWeight: '600',
              color: '#6B7280',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
            }}>{h}</span>
          ))}
        </div>

        {pipeline.map(({ status, booths, detail, highlight }) => (
          <div key={status} style={{
            display: 'grid',
            gridTemplateColumns: '1fr 80px 1fr',
            gap: '8px',
            padding: '10px 0',
            borderBottom: '1px solid #F9FAFB',
          }}>
            <span style={{ fontSize: '14px', color: '#374151' }}>{status}</span>
            <span style={{
              fontSize: '14px',
              fontWeight: highlight ? '700' : '400',
              color: highlight ? '#FF5F29' : '#374151',
            }}>{booths}</span>
            <span style={{ fontSize: '13px', color: '#9CA3AF' }}>{detail}</span>
          </div>
        ))}
      </div>

      {/* Collection rate */}
      <div>
        <div style={{ fontSize: '11px', fontWeight: '600', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>
          Collection Rate
        </div>
        <div style={{ fontSize: '28px', fontWeight: '700', color: '#111827', lineHeight: '1.1', marginBottom: '2px' }}>
          0%
        </div>
        <div style={{ fontSize: '12px', color: '#16A34A', marginBottom: '10px' }}>
          +2.5% this month
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
            width: '0%',
          }} />
        </div>
      </div>
    </div>
  );
}
