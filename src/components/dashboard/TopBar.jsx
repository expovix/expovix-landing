import { useNavigate } from 'react-router-dom';

export default function TopBar() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <div className="text-2xl font-bold text-[var(--color-text)]">Dashboard</div>
        <div className="text-sm text-[var(--color-text-secondary)]">Your exhibition overview</div>
      </div>

      <div>
        <button
          onClick={() => navigate('/create-event')}
          className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white rounded-lg px-4 py-2 font-semibold"
        >
          + Create Event
        </button>
      </div>
    </div>
  );
}
