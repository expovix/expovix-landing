import { useState } from 'react';
import Sidebar from './Sidebar';

export default function DashboardLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-background">
      <div
        className="fixed left-0 top-0 h-screen z-20"
        style={{ width: collapsed ? '72px' : '240px', transition: 'width 0.2s ease' }}
      >
        <Sidebar collapsed={collapsed} onToggleCollapse={() => setCollapsed((c) => !c)} />
      </div>
      <div
        className="flex-1 flex flex-col min-h-screen transition-[margin] duration-200"
        style={{ marginLeft: collapsed ? '72px' : '240px' }}
      >
        {children}
      </div>
    </div>
  );
}
