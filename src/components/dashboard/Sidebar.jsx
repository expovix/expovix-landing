import { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, CalendarDays, Grid2x2, ClipboardList, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../../lib/AuthContext';
import { supabase } from '../../lib/supabaseClient';

const nav = [
  { label: 'Dashboard',  icon: LayoutDashboard, to: '/dashboard' },
  { label: 'My Events',  icon: CalendarDays,    to: '/my-events' },
  { label: 'Booths',     icon: Grid2x2,         to: '/booths'    },
  { label: 'Bookings',   icon: ClipboardList,   to: '/bookings'  },
  { label: 'Settings',   icon: Settings,        to: '/settings'  },
];

function getInitials(str) {
  if (!str) return '?';
  const parts = str.trim().split(' ').filter(Boolean);
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default function Sidebar() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const fullName   = user?.user_metadata?.full_name;
  const email      = user?.email || '';
  const displayName = fullName || email;
  const subLabel   = fullName ? email : 'Event Organizer';
  const initials   = getInitials(fullName || email.split('@')[0]);

  useEffect(() => {
    if (!dropdownOpen) return;
    function onClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, [dropdownOpen]);

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate('/login');
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Logo */}
      <div className="px-4 pt-5 pb-4 border-b" style={{ borderColor: 'var(--color-border)' }}>
        <div style={{ background: 'transparent' }}>
          <img
            src="/assets/logo/main-logo.png"
            alt="ExpoVix"
            style={{ height: '32px', width: 'auto', objectFit: 'contain' }}
            onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; }}
          />
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 py-4">
        {nav.map((n) => (
          <NavLink
            key={n.to}
            to={n.to}
            className={({ isActive }) =>
              `flex items-center h-11 px-4 rounded-md mb-1 text-sm transition-colors ${
                isActive
                  ? 'bg-[#fff7f4] border-l-[3px] border-[#FF5F29] font-semibold text-[#FF5F29]'
                  : 'text-[#6B7280] hover:bg-gray-50'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <n.icon
                  size={18}
                  className="mr-3 flex-shrink-0"
                  color={isActive ? '#FF5F29' : '#6B7280'}
                />
                {n.label}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User / Logout */}
      <div
        ref={dropdownRef}
        className="relative px-4 py-4 border-t"
        style={{ borderColor: 'var(--color-border)' }}
      >
        {dropdownOpen && (
          <div className="absolute bottom-full left-4 right-4 mb-2 bg-white rounded-lg shadow-lg border border-gray-100 p-2 min-w-[200px] z-50">
            <div className="text-xs text-gray-400 px-2 py-1 truncate">{email}</div>
            <div className="border-t border-gray-100 my-1" />
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-2 py-2 text-sm text-[#EF4444] rounded-md hover:bg-red-50 transition-colors"
            >
              <LogOut size={15} className="mr-2 flex-shrink-0" />
              Log out
            </button>
          </div>
        )}

        <button
          onClick={() => setDropdownOpen((v) => !v)}
          className="flex items-center space-x-3 w-full text-left"
        >
          <div className="w-8 h-8 rounded-full bg-[#FF5F29] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            {initials}
          </div>
          <div className="min-w-0">
            <div className="text-sm font-semibold truncate">{displayName}</div>
            <div className="text-xs text-gray-400 truncate">{subLabel}</div>
          </div>
        </button>
      </div>
    </div>
  );
}
