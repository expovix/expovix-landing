import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Zap, Sofa, PenTool, Palette, Wifi } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import TopBar from '../components/dashboard/TopBar';
import { useTheme } from '@/lib/ThemeContext';
import { useCurrency } from '@/lib/CurrencyContext';
import { cn } from '@/lib/utils';
import ThemedCard from '@/components/ui/ThemedCard';
import PageHeader from '@/components/ui/PageHeader';
import SearchInput from '@/components/ui/SearchInput';
import FilterTabs from '@/components/ui/FilterTabs';
import StatusBadge from '@/components/ui/StatusBadge';
import PrimaryButton from '@/components/ui/PrimaryButton';
import VatBreakdown from '@/components/ui/VatBreakdown';
import EmptyState from '@/components/EmptyState';

export const SERVICE_ORDERS = [
  { id: 1, booth: 'A-101', company: 'Al-Futtaim Group', event: 'Saudi Food Expo', category: 'Power & Electricity', description: '10kW connection', qty: 1, price: 1200, status: 'Quoted' },
  { id: 2, booth: 'A-101', company: 'Al-Futtaim Group', event: 'Saudi Food Expo', category: 'Furniture & Fittings', description: 'Premium lounge set', qty: 2, price: 3000, status: 'Accepted' },
  { id: 3, booth: 'B-201', company: 'STC Solutions', event: 'Gulf Tech Summit', category: 'Stand Design & Build', description: 'Custom 24m² stand', qty: 1, price: 4500, status: 'Accepted' },
  { id: 4, booth: 'B-204', company: 'Emaar Properties', event: 'Saudi Food Expo', category: 'Graphics & Printing', description: 'Backlit wall graphics', qty: 1, price: 2500, status: 'Paid' },
  { id: 5, booth: 'C-312', company: 'STC Solutions', event: 'Gulf Tech Summit', category: 'Internet & AV', description: 'Dedicated 100Mbps line', qty: 1, price: 800, status: 'Paid' },
  { id: 6, booth: 'A-108', company: 'SABIC Industries', event: 'Arab Health Conference', category: 'Power & Electricity', description: '15kW 3-phase', qty: 1, price: 1800, status: 'Quoted' },
  { id: 7, booth: 'D-415', company: 'Noon Marketplace', event: 'Saudi Food Expo', category: 'Furniture & Fittings', description: 'Display counters x4', qty: 4, price: 1600, status: 'Paid' },
  { id: 8, booth: 'B-210', company: 'Careem Mobility', event: 'Gulf Tech Summit', category: 'Graphics & Printing', description: 'Stand banner printing', qty: 2, price: 1200, status: 'Accepted' },
];

const CATEGORIES = [
  { name: 'Power & Electricity', icon: Zap, color: '#F59E0B' },
  { name: 'Furniture & Fittings', icon: Sofa, color: '#3B82F6' },
  { name: 'Stand Design & Build', icon: PenTool, color: '#10B981' },
  { name: 'Graphics & Printing', icon: Palette, color: '#FF5F29' },
  { name: 'Internet & AV', icon: Wifi, color: '#7DD3FC' },
];

const STATUS_FILTERS = ['All', 'Quoted', 'Accepted', 'Paid'];

export default function ExhibitorServices() {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);
  const { isDark } = useTheme();
  const { format } = useCurrency();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [viewMode, setViewMode] = useState('data');
  const isEmpty = viewMode === 'empty';

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

  const muted = isDark ? 'text-[#A1A1AA]' : 'text-[#64748B]';
  const text = isDark ? 'text-white' : 'text-[#1A1A1E]';
  const border = isDark ? 'border-white/[0.06]' : 'border-black/[0.05]';

  const orders = isEmpty ? [] : SERVICE_ORDERS;
  const filtered = orders.filter((o) => {
    const q = search.toLowerCase();
    const matchFilter = statusFilter === 'All' || o.status === statusFilter;
    const matchSearch = o.booth.toLowerCase().includes(q) || o.company.toLowerCase().includes(q) || o.event.toLowerCase().includes(q) || o.category.toLowerCase().includes(q);
    return matchFilter && matchSearch;
  });

  if (checking) return null;

  return (
    <DashboardLayout>
      <TopBar title="Exhibitor Services" rightContent={null} />
      <div className={cn('flex-1', isDark ? 'bg-[#111111]' : 'bg-[#F9F9FB]')}>
        <div className="p-4 md:p-5 max-w-[1800px] mx-auto">
          <button onClick={() => setViewMode(isEmpty ? 'data' : 'empty')} className={cn('text-[10px] underline mb-2 inline-block', muted)}>{isEmpty ? '← Show sample data' : 'Preview empty state'}</button>
          <PageHeader
            title="Exhibitor Services"
            subtitle="Manage extra services and orders per event"
            action={<PrimaryButton><Plus className="w-4 h-4" />Add Service Order</PrimaryButton>}
          />

          {/* Service catalog cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-5">
            {CATEGORIES.map((cat) => {
              const catOrders = (isEmpty ? [] : SERVICE_ORDERS).filter((o) => o.category === cat.name);
              const activeCount = catOrders.filter((o) => o.status !== 'Paid').length;
              return (
                <ThemedCard key={cat.name} className="p-4 flex flex-col items-center text-center gap-2">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${cat.color}18` }}>
                    <cat.icon className="w-5 h-5" style={{ color: cat.color }} />
                  </div>
                  <p className={cn('text-[11px] font-medium leading-tight', text)}>{cat.name}</p>
                  <span className={cn('text-[10px] font-mono', muted)}>{activeCount} active</span>
                </ThemedCard>
              );
            })}
          </div>

          {/* Search + Filters */}
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <SearchInput value={search} onChange={setSearch} placeholder="Search by booth, company or event..." className="flex-1 max-w-xs" />
            <FilterTabs tabs={STATUS_FILTERS} active={statusFilter} onChange={setStatusFilter} />
          </div>

          {/* Table */}
          {isEmpty ? (
            <div className="flex justify-center py-16">
              <EmptyState
                icon={Zap}
                title="No service orders yet"
                subtitle="Orders appear here once exhibitors request extra services"
              />
            </div>
          ) : (
            <ThemedCard className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[800px]">
                  <thead>
                    <tr className={cn('border-b', border)}>
                      {['Booth #', 'Company', 'Event', 'Service', 'Description', 'Qty', 'Price', 'After VAT', 'Status'].map((h) => (
                        <th key={h} className={cn('text-[9px] font-medium uppercase tracking-wider px-4 py-3 text-left', muted)}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((o) => (
                      <tr key={o.id} className={cn('border-b last:border-0 transition-colors', isDark ? 'border-white/[0.03] hover:bg-white/[0.02]' : 'border-black/[0.03] hover:bg-black/[0.02]')}>
                        <td className="px-4 py-3"><span className={cn('text-xs font-bold font-mono', text)}>{o.booth}</span></td>
                        <td className="px-4 py-3"><span className={cn('text-xs font-medium', text)}>{o.company}</span></td>
                        <td className="px-4 py-3"><span className={cn('text-[10px]', muted)}>{o.event}</span></td>
                        <td className="px-4 py-3"><span className={cn('text-[10px]', muted)}>{o.category}</span></td>
                        <td className="px-4 py-3"><span className={cn('text-[10px]', muted)}>{o.description}</span></td>
                        <td className="px-4 py-3"><span className={cn('text-[10px] font-mono', muted)}>{o.qty}</span></td>
                        <td className="px-4 py-3"><span className={cn('text-[10px] font-mono', muted)}>{format(o.price)}</span></td>
                        <td className="px-4 py-3"><VatBreakdown amountBeforeVat={o.price * o.qty} compact /></td>
                        <td className="px-4 py-3"><StatusBadge status={o.status} /></td>
                      </tr>
                    ))}
                    {filtered.length === 0 && (
                      <tr><td colSpan={9} className={cn('px-4 py-8 text-center text-xs', muted)}>No orders found.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </ThemedCard>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
