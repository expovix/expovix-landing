import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import TopBar from '../components/dashboard/TopBar';

const labelStyle = {
  display: 'block',
  fontSize: '11px',
  fontWeight: '600',
  color: '#6b7280',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  marginBottom: '6px',
};

const inputBase = {
  width: '100%',
  padding: '10px 14px',
  border: '1px solid #e5e7eb',
  borderRadius: '8px',
  fontSize: '14px',
  color: '#111827',
  background: 'white',
  outline: 'none',
  boxSizing: 'border-box',
  transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
};

const rowStyle   = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' };
const fieldStyle = { marginBottom: '20px' };

export default function CreateEvent() {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);
  const [form, setForm] = useState({
    name: '', venue: '', city: '', country: '', type: '',
    startDate: '', endDate: '', booths: '', price: '', description: '',
  });
  const [focused, setFocused] = useState('');

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

  if (checking) return null;

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const focusStyle = (key) =>
    focused === key
      ? { ...inputBase, borderColor: '#FF5F29', boxShadow: '0 0 0 3px rgba(255,95,41,0.1)' }
      : inputBase;

  const handlers = (key) => ({
    value: form[key],
    onChange: set(key),
    onFocus: () => setFocused(key),
    onBlur: () => setFocused(''),
    style: focusStyle(key),
  });

  const cancelBtn = (
    <button
      onClick={() => navigate('/my-events')}
      style={{ fontSize: '14px', color: '#6b7280', background: 'none', border: 'none', cursor: 'pointer', fontWeight: '500' }}
    >
      Cancel
    </button>
  );

  return (
    <DashboardLayout>
      <TopBar title="Create Event" rightContent={cancelBtn} />
      <div style={{ padding: '32px', background: '#F8F9FA', flex: 1 }}>

        {/* Page header */}
        <div style={{ marginBottom: '24px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: '600', color: '#111111', margin: 0 }}>Create Event</h1>
        </div>

        <div style={{
          background: 'white',
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
          border: '1px solid #F3F4F6',
          padding: '32px',
          maxWidth: '800px',
          margin: '0 auto',
        }}>

          {/* Row 1: Event Name */}
          <div style={fieldStyle}>
            <label style={labelStyle}>Event Name</label>
            <input type="text" placeholder="e.g. Tech Expo 2025" {...handlers('name')} />
          </div>

          {/* Row 2: Venue | City */}
          <div style={rowStyle}>
            <div>
              <label style={labelStyle}>Venue Name</label>
              <input type="text" placeholder="e.g. ExCeL London" {...handlers('venue')} />
            </div>
            <div>
              <label style={labelStyle}>City</label>
              <input type="text" placeholder="e.g. London" {...handlers('city')} />
            </div>
          </div>

          {/* Row 3: Country | Event Type */}
          <div style={rowStyle}>
            <div>
              <label style={labelStyle}>Country</label>
              <input type="text" placeholder="e.g. United Kingdom" {...handlers('country')} />
            </div>
            <div>
              <label style={labelStyle}>Event Type</label>
              <select
                value={form.type}
                onChange={set('type')}
                onFocus={() => setFocused('type')}
                onBlur={() => setFocused('')}
                style={focusStyle('type')}
              >
                <option value="">Select type…</option>
                <option>Exhibition</option>
                <option>Conference</option>
                <option>Trade Show</option>
                <option>Product Launch</option>
                <option>Corporate Event</option>
              </select>
            </div>
          </div>

          {/* Row 4: Start Date | End Date */}
          <div style={rowStyle}>
            <div>
              <label style={labelStyle}>Start Date</label>
              <input type="date" {...handlers('startDate')} />
            </div>
            <div>
              <label style={labelStyle}>End Date</label>
              <input type="date" {...handlers('endDate')} />
            </div>
          </div>

          {/* Row 5: Total Booths | Ticket Price */}
          <div style={rowStyle}>
            <div>
              <label style={labelStyle}>Total Booths</label>
              <input type="number" min="1" placeholder="e.g. 60" {...handlers('booths')} />
            </div>
            <div>
              <label style={labelStyle}>Ticket Price in SAR <span style={{ fontWeight: '400', textTransform: 'none', letterSpacing: 0 }}>(optional)</span></label>
              <input type="number" min="0" placeholder="e.g. 5000" {...handlers('price')} />
            </div>
          </div>

          {/* Row 6: Description */}
          <div style={fieldStyle}>
            <label style={labelStyle}>Description <span style={{ fontWeight: '400', textTransform: 'none', letterSpacing: 0 }}>(optional)</span></label>
            <textarea
              rows={4}
              placeholder="Brief description of your event…"
              value={form.description}
              onChange={set('description')}
              onFocus={() => setFocused('description')}
              onBlur={() => setFocused('')}
              style={{ ...focusStyle('description'), resize: 'vertical', fontFamily: 'inherit' }}
            />
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginTop: '8px' }}>
            <button
              onClick={() => navigate('/my-events')}
              style={{
                background: '#FF5F29', color: 'white', border: 'none',
                padding: '12px 28px', borderRadius: '8px',
                fontWeight: '600', fontSize: '14px', cursor: 'pointer',
                transition: 'background 0.15s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#e54e1b'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#FF5F29'; }}
            >
              Create Event
            </button>
            <button
              onClick={() => navigate('/my-events')}
              style={{
                background: 'white', color: '#374151',
                border: '1px solid #E5E7EB',
                padding: '12px 28px', borderRadius: '8px',
                fontWeight: '600', fontSize: '14px', cursor: 'pointer',
                transition: 'background 0.15s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#F9FAFB'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'white'; }}
            >
              Cancel
            </button>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}
