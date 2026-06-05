import { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, CalendarDays, Grid2x2, ClipboardList, Settings } from 'lucide-react';
import { useAuth } from '../../lib/AuthContext';
import { supabase } from '../../lib/supabaseClient';

const nav = [
  { label: 'Dashboard', icon: LayoutDashboard, to: '/dashboard' },
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

  const fullName    = user?.user_metadata?.full_name;
  const email       = user?.email || '';
  const displayName = fullName || email;
  const initials    = getInitials(fullName || email.split('@')[0]);

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
    <nav
      className="hidden md:flex flex-col h-full py-6 fixed left-0 top-0 w-[240px] bg-surface border-r border-outline-variant z-20 shadow-sm"
      style={{ borderRadius: '12px' }}
    >
      {/* Logo */}
      <div
        className="flex items-center border-b border-[#e5e7eb]"
        style={{ height: '64px', paddingLeft: '12px' }}
      >
        <img
          src="/assets/logo/main-logo.png"
          alt="ExpoVix"
          style={{ height: '32px', width: 'auto' }}
        />
      </div>

      {/* Nav links */}
      <div className="flex-1 flex flex-col gap-1 mt-4">
        {nav.map(({ label, icon: Icon, to }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              isActive
                ? 'flex items-center gap-3 border-l-4 border-[#FF5F29] bg-orange-50 text-on-surface text-[13px] font-semibold px-3 py-2'
                : 'flex items-center gap-3 text-secondary text-[13px] font-medium px-3 py-2 hover:bg-surface-container-low transition-colors'
            }
          >
            <Icon className="w-4 h-4 flex-shrink-0" />
            {label}
          </NavLink>
        ))}
      </div>

      {/* Bottom user section */}
      <div className="px-6 mt-auto relative" ref={dropdownRef}>
        {dropdownOpen && (
          <div className="absolute bottom-14 left-0 right-0 mx-2 bg-white border border-outline-variant rounded-xl shadow-lg py-2 z-50">
            <p className="text-[11px] text-secondary px-4 py-1 truncate">{email}</p>
            <div className="border-t border-outline-variant my-1" />
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-surface-container-low transition-colors"
            >
              Log out
            </button>
          </div>
        )}

        <button
          onClick={() => setDropdownOpen((v) => !v)}
          className="flex items-center gap-3 w-full"
        >
          <div className="w-7 h-7 rounded-full bg-surface-variant flex items-center justify-center font-bold text-on-surface text-xs flex-shrink-0">
            {initials}
          </div>
          <div className="min-w-0 text-left">
            <p className="text-[13px] font-semibold text-on-surface truncate">{displayName}</p>
            <p className="text-[11px] font-normal text-secondary">Event Organizer</p>
          </div>
        </button>
      </div>
    </nav>
  );
}
