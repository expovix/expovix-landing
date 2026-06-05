import Sidebar from './Sidebar';
import TopBar from './TopBar';
import InventoryOverview from './InventoryOverview';
import KpiStats from './KpiStats';
import YourEvents from './YourEvents';
import RecentBookings from './RecentBookings';
import BoothBreakdown from './BoothBreakdown';
import SalesPipeline from './SalesPipeline';

function DefaultDashboardContent() {
  return (
    <div className="max-w-full">
      <InventoryOverview />
      <KpiStats />
      <YourEvents />
      <RecentBookings />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-6">
        <BoothBreakdown />
        <SalesPipeline />
      </div>
    </div>
  );
}

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen flex">
      <aside className="hidden md:block w-56 lg:w-60 bg-white border-r border-gray-200">
        <Sidebar />
      </aside>

      <div className="flex-1 p-4 md:p-6 lg:p-8">
        <TopBar />
        {children ?? <DefaultDashboardContent />}
      </div>
    </div>
  );
}
