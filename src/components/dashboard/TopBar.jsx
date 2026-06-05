import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { useAuth } from '../../lib/AuthContext';

function getGreeting() {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return 'Good morning';
  if (hour >= 12 && hour < 17) return 'Good afternoon';
  return 'Good evening';
}

function getDisplayName(user) {
  const fullName = user?.user_metadata?.full_name;
  if (fullName) {
    const first = fullName.trim().split(' ')[0];
    return first.charAt(0).toUpperCase() + first.slice(1);
  }
  const email = user?.email || '';
  const local = email.split('@')[0];
  if (!local) return '';
  return local.charAt(0).toUpperCase() + local.slice(1);
}

export default function TopBar() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [greeting, setGreeting] = useState(getGreeting());

  // Recalculate greeting on mount and keep it fresh every minute
  useEffect(() => {
    setGreeting(getGreeting());
    const interval = setInterval(() => setGreeting(getGreeting()), 60_000);
    return () => clearInterval(interval);
  }, []);

  const displayName = getDisplayName(user);

  return (
    <header className="sticky top-0 flex justify-between items-center w-full h-16 px-8 bg-white border-b border-outline-variant z-10">
      <div>
        <h1 className="text-[18px] font-bold text-on-surface">Dashboard</h1>
        <p className="text-[13px] text-secondary">
          {greeting}{displayName ? `, ${displayName}` : ''}
        </p>
      </div>
      <button
        onClick={() => navigate('/create-event')}
        className="bg-[#FF5F29] hover:bg-[#e54e1b] text-white font-semibold py-2 px-4 rounded-xl flex items-center gap-2 text-[13px] transition-colors"
      >
        <Plus className="w-4 h-4" />
        Create Event
      </button>
    </header>
  );
}
