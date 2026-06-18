import { Users } from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import TopBar from '@/components/dashboard/TopBar';
import PageHeader from '@/components/ui/PageHeader';
import EmptyState from '@/components/EmptyState';
import { useTheme } from '@/lib/ThemeContext';
import { cn } from '@/lib/utils';

export default function Exhibitors() {
  const { isDark } = useTheme();

  return (
    <DashboardLayout>
      <TopBar title="Exhibitors" rightContent={null} />
      <div className={cn('flex-1', isDark ? 'bg-[#111111]' : 'bg-[#F9F9FB]')}>
        <div className="p-4 md:p-5 max-w-[1800px] mx-auto">
          <PageHeader
            title="Exhibitors"
            subtitle="Manage exhibitor profiles, contacts, and booth assignments"
          />
          <div className="flex justify-center py-16">
            <EmptyState
              icon={Users}
              title="Exhibitors page is ready"
              subtitle="Exhibitor records will appear here once connected to live event data"
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
