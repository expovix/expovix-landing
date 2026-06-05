import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { useAuth } from '../../lib/AuthContext';

function getGreeting() {
  const hour = new Date().getHours();
  if (hour >= 5 && hour <= 11) return 'Good morning';
  if (hour >= 12 && hour <= 16) return 'Good afternoon';
  if (hour >= 17 && hour <= 21) return 'Good evening';
  return 'Good evening';
}

function getFirstName(user) {
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

  const firstName = getFirstName(user);
  const greeting  = getGreeting();

  return (
    <header className="sticky top-0 flex justify-between items-center w-full h-16 px-8 bg-white border-b border-outline-variant z-10">
      <div>
        <h1 className="text-[20px] font-bold text-on-surface">Dashboard</h1>
        <p className="text-[14px] text-secondary">{greeting}{firstName ? `, ${firstName}` : ''}</p>
      </div>
      <button
        onClick={() => navigate('/create-event')}
        className="bg-[#FF5F29] hover:bg-[#e54e1b] text-white font-bold py-2 px-4 rounded-xl flex items-center gap-2 text-[14px] transition-colors"
      >
        <Plus size={18} />
        Create Event
      </button>
    </header>
  );
}
