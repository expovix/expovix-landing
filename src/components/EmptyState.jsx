import { useTheme } from '@/lib/ThemeContext';
import { cn } from '@/lib/utils';

export default function EmptyState({ icon: Icon, title, subtitle, action }) {
  const { isDark } = useTheme();
  const text = isDark ? 'text-white' : 'text-[#1A1A1E]';
  const muted = isDark ? 'text-[#52525B]' : 'text-[#94A3B8]';

  return (
    <div className="flex flex-col items-center justify-center text-center py-10 gap-2">
      {Icon && <Icon className={cn('w-8 h-8 mb-1', muted)} />}
      <p className={cn('text-sm font-semibold', text)}>{title}</p>
      {subtitle && <p className={cn('text-xs', isDark ? 'text-[#A1A1AA]' : 'text-[#64748B]')}>{subtitle}</p>}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
