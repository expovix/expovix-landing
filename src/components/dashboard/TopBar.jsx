import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Sun, Moon, Search, Bell, ChevronDown } from 'lucide-react';
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
  if (fullName && fullName.trim()) return fullName.trim().split(' ')[0];
  const email = user?.email || '';
  const prefix = email.split('@')[0];
  if (!prefix) return 'there';
  return prefix.charAt(0).toUpperCase() + prefix.slice(1).toLowerCase();
};

const CURRENCIES = ['SAR', 'USD', 'AED', 'EUR'];

export default function TopBar({ title = 'Dashboard', rightContent }) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const [greeting, setGreeting] = useState(getGreeting());
  const [currency, setCurrency] = useState('SAR');
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const currencyRef = useRef(null);

  useEffect(() => {
    setGreeting(getGreeting());
    const interval = setInterval(() => setGreeting(getGreeting()), 60_000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!currencyOpen) return;
    function onClickOutside(e) {
      if (currencyRef.current && !currencyRef.current.contains(e.target)) {
        setCurrencyOpen(false);
      }
    }
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, [currencyOpen]);

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
    <header className="sticky top-0 flex justify-between items-center w-full h-16 px-8 bg-background border-b border-border z-10 gap-6">
      <div className="flex items-center gap-6 flex-1 min-w-0">
        <div className="flex-shrink-0">
          <h1 className="text-[18px] font-bold text-foreground">{title}</h1>
          <p className="text-[13px] text-muted-foreground">
            {greeting}{firstName ? `, ${firstName}` : ''}
          </p>
        </div>
        <div className="relative hidden lg:block w-full max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-card border border-border rounded-xl pl-9 pr-3 py-2 text-[13px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-[#FF5F29]"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 flex-shrink-0">
        <div className="relative" ref={currencyRef}>
          <button
            onClick={() => setCurrencyOpen((v) => !v)}
            className="h-9 px-3 flex items-center gap-1 rounded-xl border border-border text-foreground text-[13px] font-medium hover:bg-card transition-colors"
          >
            {currency}
            <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
          </button>
          {currencyOpen && (
            <div className="absolute right-0 mt-1 w-24 bg-card border border-border rounded-xl shadow-lg py-1 z-30">
              {CURRENCIES.map((c) => (
                <button
                  key={c}
                  onClick={() => { setCurrency(c); setCurrencyOpen(false); }}
                  className={`w-full text-left px-3 py-1.5 text-[13px] hover:bg-background transition-colors ${
                    c === currency ? 'text-[#FF5F29] font-semibold' : 'text-foreground'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          className="w-9 h-9 flex items-center justify-center rounded-xl border border-border text-muted-foreground hover:bg-card transition-colors"
        >
          {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        <button
          aria-label="Notifications"
          className="relative w-9 h-9 flex items-center justify-center rounded-xl border border-border text-muted-foreground hover:bg-card transition-colors"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#FF5F29]" />
        </button>

        {rightContent !== undefined ? rightContent : defaultRight}
      </div>
    </header>
  );
}
