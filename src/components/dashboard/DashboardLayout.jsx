import Sidebar from './Sidebar';

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-background">
      <div className="fixed left-0 top-0 w-[240px] h-screen z-20">
        <Sidebar />
      </div>
      <div className="flex-1 ml-[240px] flex flex-col min-h-screen">
        {children}
      </div>
    </div>
  );
}
