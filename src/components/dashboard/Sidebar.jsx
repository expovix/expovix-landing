import { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, CalendarDays, Grid2x2, ClipboardList, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../../lib/AuthContext';
import { supabase } from '../../lib/supabaseClient';

const nav = [
  { label: 'Dashboard', icon: LayoutDashboard, to: '/dashboard' },
  { label: 'My Events', icon: CalendarDays,    to: '/my-events' },
  { label: 'Booths',    icon: Grid2x2,         to: '/booths'    },
  { label: 'Bookings',  icon: ClipboardList,   to: '/bookings'  },
  { label: 'Settings',  icon: Settings,        to: '/settings'  },
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
  const subLabel    = fullName ? email : 'Event Organizer';
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
    <div style={{
      width: '220px',
      height: '100vh',
      background: '#F8F9FA',
      borderRight: '1px solid #E5E7EB',
      display: 'flex',
      flexDirection: 'column',
    }}>

      {/* Logo */}
      <div style={{
        padding: '20px 16px 16px 16px',
        borderBottom: '1px solid #E5E7EB',
      }}>
        <img
          src="/assets/logo/main-logo.png"
          alt="ExpoVix"
          height="28"
          style={{ height: '28px', width: 'auto', objectFit: 'contain' }}
          onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; }}
        />
      </div>

      {/* Nav */}
      <nav style={{ padding: '12px 8px', flex: 1 }}>
        {nav.map((n) => (
          <NavLink
            key={n.to}
            to={n.to}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: isActive ? '8px 12px 8px 9px' : '8px 12px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: isActive ? '600' : '500',
              color: isActive ? '#FF5F29' : '#4B5563',
              cursor: 'pointer',
              textDecoration: 'none',
              background: isActive ? '#FFF4F0' : 'transparent',
              borderLeft: isActive ? '3px solid #FF5F29' : '3px solid transparent',
              transition: 'all 0.15s ease',
              marginBottom: '2px',
            })}
            onMouseEnter={(e) => {
              if (!e.currentTarget.dataset.active) {
                e.currentTarget.style.background = '#F3F4F6';
                e.currentTarget.style.color = '#111827';
              }
            }}
            onMouseLeave={(e) => {
              if (!e.currentTarget.dataset.active) {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#4B5563';
              }
            }}
          >
            {({ isActive }) => (
              <>
                <n.icon
                  size={18}
                  color={isActive ? '#FF5F29' : '#4B5563'}
                  style={{ flexShrink: 0 }}
                />
                {n.label}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User / Logout */}
      <div ref={dropdownRef} style={{ position: 'relative' }}>
        {dropdownOpen && (
          <div style={{
            position: 'absolute',
            bottom: '60px',
            left: '16px',
            background: 'white',
            borderRadius: '10px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
            border: '1px solid #F3F4F6',
            minWidth: '200px',
            padding: '6px',
            zIndex: 50,
          }}>
            <div style={{
              fontSize: '12px',
              color: '#6B7280',
              padding: '6px 12px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}>
              {email}
            </div>
            <div style={{ borderTop: '1px solid #F3F4F6', margin: '4px 0' }} />
            <button
              onClick={handleLogout}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                width: '100%',
                padding: '8px 12px',
                borderRadius: '6px',
                fontSize: '14px',
                color: '#EF4444',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'background 0.1s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#FEF2F2'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
            >
              <LogOut size={15} />
              Log out
            </button>
          </div>
        )}

        <button
          onClick={() => setDropdownOpen((v) => !v)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            width: '100%',
            padding: '12px 16px',
            borderTop: '1px solid #E5E7EB',
            background: 'transparent',
            border: 'none',
            borderTop: '1px solid #E5E7EB',
            cursor: 'pointer',
            textAlign: 'left',
          }}
        >
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: '#FF5F29',
            color: 'white',
            fontSize: '13px',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}>
            {initials}
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{
              fontSize: '13px',
              fontWeight: '600',
              color: '#111827',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}>
              {displayName}
            </div>
            <div style={{
              fontSize: '11px',
              color: '#6B7280',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}>
              {subLabel}
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}
