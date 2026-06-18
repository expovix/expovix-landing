import { Star } from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import TopBar from '@/components/dashboard/TopBar';
import PageHeader from '@/components/ui/PageHeader';
import EmptyState from '@/components/EmptyState';
import { useTheme } from '@/lib/ThemeContext';
import { cn } from '@/lib/utils';

export default function Sponsors() {
  const { isDark } = useTheme();

  return (
    <DashboardLayout>
      <TopBar title="Sponsors" rightContent={null} />
      <div className={cn('flex-1', isDark ? 'bg-[#111111]' : 'bg-[#F9F9FB]')}>
        <div className="p-4 md:p-5 max-w-[1800px] mx-auto">
          <PageHeader
            title="Sponsors"
            subtitle="Track sponsor packages, status, and assigned benefits"
          />
          <div className="flex justify-center py-16">
            <EmptyState
              icon={Star}
              title="Sponsors page is ready"
              subtitle="Sponsor records will appear here once sponsorship data is connected"
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
