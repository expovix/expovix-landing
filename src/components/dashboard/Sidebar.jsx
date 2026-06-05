import { useState } from 'react';

const nav = [
  { key: 'dashboard', label: 'Dashboard' },
  { key: 'events', label: 'My Events' },
  { key: 'booths', label: 'Booths' },
  { key: 'bookings', label: 'Bookings' },
  { key: 'settings', label: 'Settings' },
];

export default function Sidebar() {
  const [active] = useState('dashboard');

  return (
    <div className="flex flex-col h-screen">
      <div className="px-4 pt-5 pb-4 border-b" style={{borderColor: 'var(--color-border)'}}>
        <img src="/assets/logo/main-logo.png" alt="ExpoVix" height="36" style={{width:'auto'}} onError={(e)=>{e.target.onerror=null;e.target.style.display='none'}} />
        <div className="hidden" />
        <div className="mt-2 text-sm font-bold text-[#FF5F29]" style={{display:'none'}}>ExpoVix</div>
      </div>

      <nav className="flex-1 px-2 py-4">
        {nav.map((n) => (
          <div key={n.key} className={`flex items-center h-11 px-4 rounded-md mb-1 cursor-pointer ${n.key===active? 'bg-[#fff7f4] border-l-3 border-[#FF5F29] font-semibold text-[#FF5F29]':'hover:bg-gray-50 text-gray-600'}`}>
            <div className="w-5 h-5 mr-3 bg-gray-200 rounded" />
            <div className="text-sm">{n.label}</div>
          </div>
        ))}
      </nav>

      <div className="px-4 py-4 border-t" style={{borderColor: 'var(--color-border)'}}>
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold">AM</div>
          <div>
            <div className="text-sm font-semibold">Alex Mitchell</div>
            <div className="text-xs text-gray-400">Event Organizer</div>
          </div>
        </div>
      </div>
    </div>
  )
}
