import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import TopBar from '../components/dashboard/TopBar';
import { useTheme } from '@/lib/ThemeContext';
import { cn } from '@/lib/utils';
import ThemedCard from '@/components/ui/ThemedCard';
import PageHeader from '@/components/ui/PageHeader';
import SearchInput from '@/components/ui/SearchInput';
import FilterTabs from '@/components/ui/FilterTabs';
import StatusBadge from '@/components/ui/StatusBadge';
import { CheckCircle, XCircle, Inbox } from 'lucide-react';
import EmptyState from '@/components/EmptyState';

const INITIAL_REQUESTS = [
  { id: 1, company: 'Al-Rajhi Holding', contact: 'Khalid Al-Rajhi', email: 'khalid@alrajhi-holding.com', event: 'Saudi Food Expo 2025', booth: 'E-201', category: 'Gold Sponsor', sqm: 24, submitted: '2026-06-02', status: 'Pending' },
  { id: 2, company: 'Bin Laden Group', contact: 'Omar Bin Laden', email: 'o.binladen@sbl.com.sa', event: 'Gulf Tech Summit', booth: 'A-105', category: 'Diamond Sponsor', sqm: 48, submitted: '2026-06-04', status: 'Pending' },
  { id: 3, company: 'Almarai Company', contact: 'Faisal Al-Subaie', email: 'faisal@almarai.com', event: 'Saudi Food Expo 2025', booth: 'B-312', category: 'Strategic Sponsor', sqm: 36, submitted: '2026-06-05', status: 'Pending' },
  { id: 4, company: 'Majid Al Futtaim', contact: 'Laila Khalil', email: 'l.khalil@maf.ae', event: 'MENA Auto Show', booth: 'C-210', category: 'Platinum Sponsor', sqm: 54, submitted: '2026-05-28', status: 'Approved' },
  { id: 5, company: 'Dubai Investments', contact: 'Rami Haddad', email: 'r.haddad@di.ae', event: 'Arab Health Conference', booth: 'D-401', category: 'Gold Sponsor', sqm: 18, submitted: '2026-05-25', status: 'Rejected' },
];

const FILTERS = ['All', 'Pending', 'Approved', 'Rejected'];

export default function Requests() {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);
  const { isDark } = useTheme();
  const [requests, setRequests] = useState(INITIAL_REQUESTS);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
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

  const text = isDark ? 'text-white' : 'text-[#1A1A1E]';
  const muted = isDark ? 'text-[#A1A1AA]' : 'text-[#64748B]';
  const border = isDark ? 'border-white/[0.06]' : 'border-black/[0.05]';

  const handleAction = (id, action) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: action === 'approve' ? 'Approved' : 'Rejected' } : r))
    );
  };

  const data = isEmpty ? [] : requests;
  const filtered = data.filter((r) => {
    const q = search.toLowerCase();
    const matchFilter = filter === 'All' || r.status === filter;
    const matchSearch = r.company.toLowerCase().includes(q) || r.event.toLowerCase().includes(q) || r.booth.toLowerCase().includes(q);
    return matchFilter && matchSearch;
  });

  if (checking) return null;

  return (
    <DashboardLayout>
      <TopBar title="Requests" rightContent={null} />
      <div className={cn('flex-1', isDark ? 'bg-[#111111]' : 'bg-[#F9F9FB]')}>
        <div className="p-4 md:p-5 max-w-[1800px] mx-auto">
          <button onClick={() => setViewMode(isEmpty ? 'data' : 'empty')} className={cn('text-[10px] underline mb-2 inline-block', muted)}>{isEmpty ? '← Show sample data' : 'Preview empty state'}</button>
          <PageHeader title="Booth Requests" subtitle="Incoming requests awaiting your approval" />

          <div className="flex flex-col sm:flex-row gap-3 mb-5">
            <SearchInput value={search} onChange={setSearch} placeholder="Search by company, event or booth..." className="flex-1 max-w-xs" />
            <FilterTabs tabs={FILTERS} active={filter} onChange={setFilter} />
          </div>

          {isEmpty ? (
            <div className="flex justify-center py-16">
              <EmptyState icon={Inbox} title="No requests yet" subtitle="Requests will appear here once your event is live and shared" />
            </div>
          ) : (
            <ThemedCard className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[900px]">
                  <thead>
                    <tr className={cn('border-b', border)}>
                      {['Company', 'Contact', 'Event', 'Booth #', 'Category', 'SQM', 'Submitted', 'Status', 'Actions'].map((h) => (
                        <th key={h} className={cn('text-[9px] font-medium uppercase tracking-wider px-4 py-3 text-left', muted)}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((r) => (
                      <tr key={r.id} className={cn('border-b last:border-0 transition-colors', isDark ? 'border-white/[0.03] hover:bg-white/[0.02]' : 'border-black/[0.03] hover:bg-black/[0.02]')}>
                        <td className="px-4 py-3"><span className={cn('text-xs font-medium', text)}>{r.company}</span></td>
                        <td className="px-4 py-3">
                          <p className={cn('text-xs font-medium', text)}>{r.contact}</p>
                          <p className={cn('text-[10px]', muted)}>{r.email}</p>
                        </td>
                        <td className="px-4 py-3"><span className={cn('text-xs', muted)}>{r.event}</span></td>
                        <td className="px-4 py-3"><span className={cn('text-[10px] font-mono', muted)}>{r.booth}</span></td>
                        <td className="px-4 py-3"><span className={cn('text-[10px]', muted)}>{r.category}</span></td>
                        <td className="px-4 py-3"><span className={cn('text-[10px] font-mono', muted)}>{r.sqm}m²</span></td>
                        <td className="px-4 py-3"><span className={cn('text-[10px]', muted)}>{r.submitted}</span></td>
                        <td className="px-4 py-3"><StatusBadge status={r.status} /></td>
                        <td className="px-4 py-3">
                          {r.status === 'Pending' ? (
                            <div className="flex items-center gap-2">
                              <button onClick={() => handleAction(r.id, 'approve')} className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#FF5F29] text-white text-[10px] font-medium hover:bg-[#e54e20] transition-colors">
                                <CheckCircle className="w-3 h-3" /> Approve
                              </button>
                              <button onClick={() => handleAction(r.id, 'reject')} className={cn('flex items-center gap-1 px-2.5 py-1 rounded-lg border text-[10px] font-medium transition-colors', border, muted, isDark ? 'hover:bg-white/[0.04]' : 'hover:bg-black/[0.04]')}>
                                <XCircle className="w-3 h-3" /> Reject
                              </button>
                            </div>
                          ) : (
                            <span className={cn('text-[10px]', muted)}>—</span>
                          )}
                        </td>
                      </tr>
                    ))}
                    {filtered.length === 0 && !isEmpty && (
                      <tr><td colSpan={9} className={cn('px-4 py-8 text-center text-xs', muted)}>No requests found.</td></tr>
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
