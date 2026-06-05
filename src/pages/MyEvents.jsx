import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import DashboardLayout from '../components/dashboard/DashboardLayout';

export default function MyEvents() {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);

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

  return (
    <DashboardLayout>
      <h1 className="text-[18px] font-bold text-on-surface">My Events</h1>
      <p className="text-[13px] text-secondary mt-1">Your events will appear here.</p>
    </DashboardLayout>
  );
}
