import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import TopBar from '../components/dashboard/TopBar';
import InventoryOverview from '../components/dashboard/InventoryOverview';
import KpiStats from '../components/dashboard/KpiStats';
import YourEvents from '../components/dashboard/YourEvents';
import RecentBookings from '../components/dashboard/RecentBookings';
import BoothBreakdown from '../components/dashboard/BoothBreakdown';
import SalesPipeline from '../components/dashboard/SalesPipeline';

export default function Dashboard() {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function check() {
      try {
        const { data } = await supabase.auth.getSession();
        const session = data?.session;
        if (!session && mounted) navigate('/login');
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
      <TopBar />
      <main className="p-8 max-w-[1440px] mx-auto w-full flex flex-col gap-4">
        <InventoryOverview />
        <KpiStats />
        <YourEvents />
        <RecentBookings />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <BoothBreakdown />
          <SalesPipeline />
        </div>
      </main>
    </DashboardLayout>
  );
}
