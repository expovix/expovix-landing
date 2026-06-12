import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import TopBar from '../components/dashboard/TopBar';
import { useTheme } from '@/lib/ThemeContext';
import { cn } from '@/lib/utils';
import ThemedCard from '@/components/ui/ThemedCard';
import PageHeader from '@/components/ui/PageHeader';
import EmptyState from '@/components/EmptyState';
import { SERVICE_ORDERS } from '@/pages/ExhibitorServices';
import { Package } from 'lucide-react';

const COLUMNS = ['Received', 'In Production', 'Ready', 'Installed'];

const PRODUCTION_BOARD = {
  'Received':       [SERVICE_ORDERS[0], SERVICE_ORDERS[5]],
  'In Production':  [SERVICE_ORDERS[1], SERVICE_ORDERS[2], SERVICE_ORDERS[7]],
  'Ready':          [SERVICE_ORDERS[3]],
  'Installed':      [SERVICE_ORDERS[4], SERVICE_ORDERS[6]],
};

const catColors = {
  'Power & Electricity':      { bg: 'bg-[#F59E0B]/10', text: 'text-[#F59E0B]' },
  'Furniture & Fittings':     { bg: 'bg-[#3B82F6]/10', text: 'text-[#3B82F6]' },
  'Stand Design & Build':     { bg: 'bg-[#10B981]/10', text: 'text-[#10B981]' },
  'Graphics & Printing':      { bg: 'bg-[#FF5F29]/10', text: 'text-[#FF5F29]' },
  'Internet & AV':            { bg: 'bg-[#7DD3FC]/10', text: 'text-[#7DD3FC]' },
};

export default function Production() {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);
  const { isDark } = useTheme();
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

  const board = isEmpty ? {} : PRODUCTION_BOARD;

  if (checking) return null;

  return (
    <DashboardLayout>
      <TopBar title="Production" rightContent={null} />
      <div className={cn('flex-1', isDark ? 'bg-[#111111]' : 'bg-[#F9F9FB]')}>
        <div className="p-4 md:p-5 max-w-[1800px] mx-auto">
          <button onClick={() => setViewMode(isEmpty ? 'data' : 'empty')} className={cn('text-[10px] underline mb-2 inline-block', muted)}>{isEmpty ? '← Show sample data' : 'Preview empty state'}</button>
          <PageHeader
            title="Production"
            subtitle="Fulfillment queue for exhibitor services"
          />

          {isEmpty ? (
            <div className="flex justify-center py-16">
              <EmptyState
                icon={Package}
                title="No production orders yet"
                subtitle="Production queue will appear once service orders are placed"
              />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {COLUMNS.map((col) => {
                const items = board[col] || [];
                return (
                  <div key={col}>
                    <div className={cn('flex items-center justify-between mb-3 px-1', muted)}>
                      <span className="text-[10px] font-semibold uppercase tracking-wider">{col}</span>
                      <span className={cn('text-[9px] font-mono px-1.5 py-0.5 rounded', isDark ? 'bg-white/[0.06]' : 'bg-black/[0.06]')}>{items.length}</span>
                    </div>
                    <div className="space-y-2">
                      {items.map((item, i) => {
                        const cat = catColors[item.category] || {};
                        return (
                          <ThemedCard key={`${col}-${i}`} className="p-3">
                            <div className="flex items-center gap-1.5 mb-1.5">
                              <span className={cn('text-xs font-bold font-mono', text)}>{item.booth}</span>
                              <span className={cn('text-[10px]', muted)}>·</span>
                              <span className={cn('text-[10px] font-medium truncate', muted)}>{item.company}</span>
                            </div>
                            <p className={cn('text-[10px] mb-2', muted)}>{item.event}</p>
                            <div className="flex items-center gap-2">
                              <span className={cn('text-[9px] font-medium px-1.5 py-0.5 rounded-md', cat.bg, cat.text)}>{item.category}</span>
                              <span className={cn('text-[10px]', muted)}>{item.description}</span>
                            </div>
                          </ThemedCard>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
