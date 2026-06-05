import { Calendar } from 'lucide-react';

const events = [
  { title: 'Tech Expo 2024',           venue: 'ExCeL London',             status: 'ACTIVE',   occupancy: '45/120', pct: 37.5, dates: 'Nov 15–18, 2024' },
  { title: 'Health & Wellness Summit', venue: 'Messe Frankfurt',           status: 'UPCOMING', occupancy: '12/50',  pct: 24,   dates: 'Jan 10–12, 2025' },
  { title: 'Global Logistics Summit',  venue: 'McCormick Place, Chicago',  status: 'UPCOMING', occupancy: '0/200',  pct: 0,    dates: 'Mar 12–15, 2025' },
];

function StatusBadge({ status }) {
  if (status === 'ACTIVE') {
    return (
      <span className="bg-green-100 text-green-800 px-2 py-1 text-[12px] font-bold uppercase rounded-xl">
        {status}
      </span>
    );
  }
  return (
    <span className="bg-blue-100 text-blue-800 px-2 py-1 text-[12px] font-bold uppercase rounded-xl">
      {status}
    </span>
  );
}

export default function YourEvents() {
  return (
    <div className="bg-white border border-outline-variant flex flex-col rounded-xl shadow-sm">
      <div className="p-4 border-b border-outline-variant flex justify-between items-center">
        <h2 className="text-[20px] font-bold text-on-surface">Your Events</h2>
        <button className="text-[#FF5F29] hover:text-primary text-[14px] font-bold transition-colors">
          View All
        </button>
      </div>
      <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        {events.map((event) => (
          <div
            key={event.title}
            className="flex flex-col gap-2 p-3 border border-outline-variant hover:bg-surface-container-low transition-colors rounded-xl"
          >
            <div className="flex justify-between items-start">
              <div className="min-w-0 mr-2">
                <p className="font-bold text-on-surface truncate">{event.title}</p>
                <p className="text-[12px] text-secondary">{event.venue}</p>
              </div>
              <StatusBadge status={event.status} />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-[12px] text-secondary">Occupancy</span>
                <span className="font-bold text-on-surface text-[12px]">{event.occupancy}</span>
              </div>
              <div className="bg-surface-variant h-2 rounded-full">
                <div
                  className="bg-[#FF5F29] h-2 rounded-full"
                  style={{ width: `${event.pct}%` }}
                />
              </div>
            </div>
            <p className="text-[12px] text-secondary flex items-center gap-1">
              <Calendar size={14} />
              {event.dates}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
