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
      className="hidden md:flex flex-col h-full fixed left-0 top-0 w-[240px] z-20"
      style={{
        background: '#111111',
        borderRight: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '0',
      }}
    >
      {/* Logo */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          height: '64px',
          paddingLeft: '20px',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <img
          src="/assets/logo/main-logo.png"
          alt="ExpoVix"
          style={{ width: '28px', height: '28px', objectFit: 'contain' }}
        />
        <div>
          <p style={{ fontSize: '15px', fontWeight: '700', color: '#ffffff', letterSpacing: '-0.3px', margin: 0 }}>
            ExpoVix
          </p>
          <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', margin: 0 }}>
            Exhibition Platform
          </p>
        </div>
      </div>

      {/* Nav links */}
      <div className="flex-1 flex flex-col gap-1 mt-4">
        {nav.map(({ label, icon: Icon, to }) => (
          <NavLink
            key={to}
            to={to}
          >
            {({ isActive }) => (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '8px 12px',
                  margin: '0 8px',
                  borderRadius: '8px',
                  borderLeft: isActive ? '3px solid #FF5F29' : '3px solid transparent',
                  background: isActive ? 'rgba(255,95,41,0.15)' : 'transparent',
                  color: isActive ? '#ffffff' : 'rgba(255,255,255,0.6)',
                  fontWeight: isActive ? '600' : '400',
                  fontSize: '13px',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  textDecoration: 'none',
                }}
                onMouseEnter={e => {
                  if (!isActive) {
                    e.currentTarget.style.color = 'rgba(255,255,255,0.9)';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                  }
                }}
                onMouseLeave={e => {
                  if (!isActive) {
                    e.currentTarget.style.color = 'rgba(255,255,255,0.6)';
                    e.currentTarget.style.background = 'transparent';
                  }
                }}
              >
                <Icon
                  className="flex-shrink-0"
                  style={{
                    width: '16px',
                    height: '16px',
                    color: isActive ? '#FF5F29' : 'rgba(255,255,255,0.5)',
                  }}
                />
                {label}
              </div>
            )}
          </NavLink>
        ))}
      </div>

      {/* Bottom user section */}
      <div style={{ padding: '0 16px 24px', marginTop: 'auto', position: 'relative' }} ref={dropdownRef}>
        {dropdownOpen && (
          <div style={{
            position: 'absolute',
            bottom: '72px',
            left: '8px',
            right: '8px',
            background: '#1a1a1a',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: '10px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
            padding: '6px',
            zIndex: 50,
          }}>
            <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', padding: '6px 12px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {email}
            </p>
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', margin: '4px 0' }} />
            <button
              onClick={handleLogout}
              style={{
                display: 'block', width: '100%', textAlign: 'left',
                padding: '8px 12px', borderRadius: '6px',
                fontSize: '13px', color: '#f87171',
                background: 'transparent', border: 'none', cursor: 'pointer',
                transition: 'background 0.1s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(248,113,113,0.1)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
            >
              Log out
            </button>
          </div>
        )}

        <button
          onClick={() => setDropdownOpen((v) => !v)}
          style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            width: '100%', background: 'transparent', border: 'none',
            cursor: 'pointer', padding: '8px',
            borderRadius: '8px', transition: 'background 0.15s ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
        >
          <div style={{
            width: '28px', height: '28px', borderRadius: '50%',
            background: '#FF5F29', color: 'white',
            fontSize: '11px', fontWeight: '700',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            {initials}
          </div>
          <div style={{ minWidth: 0, textAlign: 'left' }}>
            <p style={{ fontSize: '13px', fontWeight: '600', color: 'rgba(255,255,255,0.7)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {displayName}
            </p>
            <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>Event Organizer</p>
          </div>
        </button>
      </div>
    </nav>
  );
}
