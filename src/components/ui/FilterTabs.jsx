import { useTheme } from '@/lib/ThemeContext';
import { cn } from '@/lib/utils';

export default function FilterTabs({ tabs, active, onChange }) {
  const { isDark } = useTheme();
  const muted = isDark ? 'text-[#A1A1AA]' : 'text-[#64748B]';
  const border = isDark ? 'border-[#27272A]' : 'border-black/[0.08]';

  return (
    <div className="flex items-center gap-1.5 flex-wrap">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={cn(
            'px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors',
            active === tab
              ? 'bg-[#FF5F29] text-white border-[#FF5F29]'
              : cn(border, muted, isDark ? 'hover:bg-white/[0.04]' : 'hover:bg-black/[0.04]')
          )}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
