import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Sun, Moon } from 'lucide-react';
import { useAuth } from '../../lib/AuthContext';
import { useTheme } from '../../lib/ThemeContext';

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

const getFirstName = (user) => {
  if (!user) return 'there';
  const fullName = user?.user_metadata?.full_name;
  if (fullName && fullName.trim()) {
    return fullName.trim().split(' ')[0];
  }
  const email = user?.email || '';
  const prefix = email.split('@')[0];
  if (!prefix) return 'there';
  return prefix.charAt(0).toUpperCase() + prefix.slice(1).toLowerCase();
};

export default function TopBar({ title = 'Dashboard', rightContent }) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const [greeting, setGreeting] = useState(getGreeting());

  // Recalculate on mount and refresh every minute
  useEffect(() => {
    setGreeting(getGreeting());
    const interval = setInterval(() => setGreeting(getGreeting()), 60_000);
    return () => clearInterval(interval);
  }, []);

  const firstName = getFirstName(user);

  const defaultRight = (
    <button
      onClick={() => navigate('/create-event')}
      className="bg-[#FF5F29] hover:bg-[#e54e1b] text-white font-semibold py-2 px-4 rounded-xl flex items-center gap-2 text-[13px] transition-colors"
    >
      <Plus className="w-4 h-4" />
      Create Event
    </button>
  );

  return (
    <header className="sticky top-0 flex justify-between items-center w-full h-16 px-8 bg-white border-b border-outline-variant z-10">
      <div>
        <h1 className="text-[18px] font-bold text-on-surface">{title}</h1>
        <p className="text-[13px] text-secondary">
          {greeting}{firstName ? `, ${firstName}` : ''}
        </p>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          className="w-9 h-9 flex items-center justify-center rounded-xl border border-outline-variant text-secondary hover:bg-black/[0.04] transition-colors"
        >
          {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
        {rightContent !== undefined ? rightContent : defaultRight}
      </div>
    </header>
  );
}
