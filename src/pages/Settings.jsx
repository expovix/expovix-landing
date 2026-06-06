import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../lib/AuthContext';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import TopBar from '../components/dashboard/TopBar';

function getInitials(str) {
  if (!str) return '?';
  const parts = str.trim().split(' ').filter(Boolean);
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

const labelStyle = {
  display: 'block', fontSize: '11px', fontWeight: '600', color: '#6B7280',
  textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px',
};
const inputStyle = {
  width: '100%', padding: '9px 12px', border: '1px solid #E5E7EB',
  borderRadius: '8px', fontSize: '13px', outline: 'none',
  boxSizing: 'border-box', color: '#111827', background: 'white',
};
const disabledStyle = {
  ...inputStyle, background: '#F9FAFB', color: '#9CA3AF', cursor: 'not-allowed',
};
const fieldStyle  = { marginBottom: '16px' };
const cardStyle   = {
  background: 'white', border: '1px solid #F3F4F6', borderRadius: '12px',
  padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.06)', flex: '1 1 300px',
  alignSelf: 'flex-start',
};
const cardTitle   = { fontSize: '15px', fontWeight: '700', color: '#111827', marginBottom: '20px' };
const orangeBtn   = {
  background: '#FF5F29', color: 'white', fontWeight: '600',
  fontSize: '13px', padding: '10px 20px', borderRadius: '8px',
  border: 'none', cursor: 'pointer', marginTop: '8px',
};

export default function Settings() {
  const navigate     = useNavigate();
  const { user }     = useAuth();
  const shouldReduce = useReducedMotion();
  const [checking, setChecking] = useState(true);
  const [fullName, setFullName] = useState('');
  const fileInputRef = useRef(null);

  useEffect(() => {
    let mounted = true;
    async function check() {
      try {
        const { data } = await supabase.auth.getSession();
        if (!data?.session && mounted) navigate('/login');
      } catch {
        if (mounted) navigate('/login');
      } finally {
        if (mounted) setChecking(false);
      }
    }
    check();
    return () => { mounted = false; };
  }, [navigate]);

  // Populate name field once user loads
  useEffect(() => {
    setFullName(user?.user_metadata?.full_name || '');
  }, [user]);

  if (checking) return null;

  const email    = user?.email || '';
  const initials = getInitials(user?.user_metadata?.full_name || email.split('@')[0]);

  return (
    <DashboardLayout>
      <TopBar title="Settings" rightContent={null} />
      <div style={{ padding: '32px', background: '#F8F9FA', flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '24px', flexWrap: 'wrap' }}>

          {/* Profile Card */}
          <motion.div
            style={cardStyle}
            initial={shouldReduce ? false : { opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <h2 style={cardTitle}>Profile</h2>

            {/* Avatar row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '24px' }}>
              {/* Avatar with camera overlay */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                <div style={{ position: 'relative', display: 'inline-block' }}>
                  {/* Circle */}
                  <div style={{
                    width: '80px', height: '80px', borderRadius: '50%',
                    background: '#FF5F29', color: 'white',
                    fontSize: '28px', fontWeight: '700',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    {initials}
                  </div>
                  {/* Camera overlay */}
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    style={{
                      position: 'absolute', bottom: 0, right: 0,
                      width: '26px', height: '26px', borderRadius: '50%',
                      background: 'white', border: '2px solid #e5e7eb',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      cursor: 'pointer',
                    }}
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#FF5F29" strokeWidth="2.5">
                      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                      <circle cx="12" cy="13" r="4"/>
                    </svg>
                  </div>
                </div>
                {/* Hidden file input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                />
                {/* Upload text */}
                <span
                  onClick={() => fileInputRef.current?.click()}
                  style={{ fontSize: '12px', color: '#6b7280', cursor: 'pointer' }}
                >
                  Upload Photo
                </span>
              </div>
              {/* Name / role */}
              <div>
                <p style={{ fontSize: '14px', fontWeight: '600', color: '#111827' }}>
                  {user?.user_metadata?.full_name || email}
                </p>
                <p style={{ fontSize: '12px', color: '#6B7280' }}>Event Organizer</p>
              </div>
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                placeholder="Your full name"
                style={inputStyle}
              />
            </div>
            <div style={fieldStyle}>
              <label style={labelStyle}>Email</label>
              <input type="email" value={email} disabled style={disabledStyle} />
            </div>
            <div style={fieldStyle}>
              <label style={labelStyle}>Role</label>
              <input type="text" value="Event Organizer" disabled style={disabledStyle} />
            </div>

            <button
              style={orangeBtn}
              onMouseEnter={e => { e.currentTarget.style.background = '#e54e1b'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#FF5F29'; }}
            >
              Save Changes
            </button>
          </motion.div>

          {/* Security Card */}
          <motion.div
            style={cardStyle}
            initial={shouldReduce ? false : { opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut', delay: 0.1 }}
          >
            <h2 style={cardTitle}>Security</h2>

            <div style={fieldStyle}>
              <label style={labelStyle}>Current Password</label>
              <input type="password" placeholder="••••••••" style={inputStyle} />
            </div>
            <div style={fieldStyle}>
              <label style={labelStyle}>New Password</label>
              <input type="password" placeholder="••••••••" style={inputStyle} />
            </div>
            <div style={fieldStyle}>
              <label style={labelStyle}>Confirm New Password</label>
              <input type="password" placeholder="••••••••" style={inputStyle} />
            </div>

            <button
              style={orangeBtn}
              onMouseEnter={e => { e.currentTarget.style.background = '#e54e1b'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#FF5F29'; }}
            >
              Update Password
            </button>
          </motion.div>

        </div>
      </div>
    </DashboardLayout>
  );
}
