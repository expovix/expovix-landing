import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../lib/AuthContext';

function getGreeting() {
  const hour = new Date().getHours();
  if (hour >= 5 && hour <= 11) return 'Good morning';
  if (hour >= 12 && hour <= 16) return 'Good afternoon';
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
  const [greeting, setGreeting] = useState(getGreeting());

  useEffect(() => {
    const interval = setInterval(() => setGreeting(getGreeting()), 60000);
    return () => clearInterval(interval);
  }, []);

  const firstName = getFirstName(user);

  return (
    <div style={{
      background: 'white',
      borderBottom: '1px solid #E5E7EB',
      padding: '20px 32px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '0',
    }}>
      <div>
        <div style={{
          fontSize: '22px',
          fontWeight: '700',
          color: '#111827',
          lineHeight: '1.2',
        }}>
          {greeting}{firstName ? `, ${firstName}` : ''}
        </div>
        <div style={{
          fontSize: '14px',
          color: '#6B7280',
          marginTop: '2px',
        }}>
          Your exhibition overview
        </div>
      </div>

      <button
        onClick={() => navigate('/create-event')}
        style={{
          background: '#FF5F29',
          color: 'white',
          fontWeight: '600',
          fontSize: '14px',
          padding: '10px 20px',
          borderRadius: '8px',
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0 1px 3px rgba(255,95,41,0.3)',
          transition: 'all 0.15s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = '#E54E1B';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(255,95,41,0.4)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = '#FF5F29';
          e.currentTarget.style.boxShadow = '0 1px 3px rgba(255,95,41,0.3)';
        }}
      >
        + Create Event
      </button>
    </div>
  );
}
