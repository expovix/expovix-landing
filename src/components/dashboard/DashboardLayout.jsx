import Sidebar from './Sidebar';
import TopBar from './TopBar';
import InventoryOverview from './InventoryOverview';
import KpiStats from './KpiStats';
import YourEvents from './YourEvents';
import RecentBookings from './RecentBookings';
import BoothBreakdown from './BoothBreakdown';
import SalesPipeline from './SalesPipeline';

function SectionHeader({ title, viewAll, onViewAll, first }) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '16px',
      marginTop: first ? '0' : '28px',
    }}>
      <h2 style={{ fontSize: '15px', fontWeight: '700', color: '#111827', margin: 0 }}>
        {title}
      </h2>
      {viewAll && (
        <span
          onClick={onViewAll}
          style={{
            fontSize: '13px',
            color: '#FF5F29',
            fontWeight: '500',
            cursor: 'pointer',
            textDecoration: 'none',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.textDecoration = 'underline'; }}
          onMouseLeave={(e) => { e.currentTarget.style.textDecoration = 'none'; }}
        >
          View All →
        </span>
      )}
    </div>
  );
}

function DefaultDashboardContent() {
  return (
    <div className="max-w-full">
      <SectionHeader title="Inventory Overview" first />
      <InventoryOverview />

      <SectionHeader title="Overview" />
      <KpiStats />

      <SectionHeader title="Your Events" viewAll />
      <YourEvents />

      <SectionHeader title="Recent Bookings" viewAll />
      <RecentBookings />

      <SectionHeader title="Analytics" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <BoothBreakdown />
        <SalesPipeline />
      </div>
    </div>
  );
}

export default function DashboardLayout({ children }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: '#F9FAFB' }}>
      <aside className="hidden md:block" style={{ flexShrink: 0 }}>
        <Sidebar />
      </aside>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <TopBar />
        <div style={{ flex: 1, padding: '32px', background: '#F9FAFB' }}>
          {children ?? <DefaultDashboardContent />}
        </div>
      </div>
    </div>
  );
}
