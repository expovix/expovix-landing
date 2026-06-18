import { BarChart3 } from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import TopBar from '@/components/dashboard/TopBar';
import PageHeader from '@/components/ui/PageHeader';
import EmptyState from '@/components/EmptyState';
import { useTheme } from '@/lib/ThemeContext';
import { cn } from '@/lib/utils';

export default function Analytics() {
  const { isDark } = useTheme();

  return (
    <DashboardLayout>
      <TopBar title="Analytics" rightContent={null} />
      <div className={cn('flex-1', isDark ? 'bg-[#111111]' : 'bg-[#F9F9FB]')}>
        <div className="p-4 md:p-5 max-w-[1800px] mx-auto">
          <PageHeader
            title="Analytics"
            subtitle="Review booking performance, booth inventory, and revenue trends"
          />
          <div className="flex justify-center py-16">
            <EmptyState
              icon={BarChart3}
              title="Analytics page is ready"
              subtitle="Reports will appear here once analytics data is connected"
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
