import { cn } from '@/lib/utils';
import { useTheme } from '@/lib/ThemeContext';

export default function PageHeader({ title, subtitle, action }) {
  const { isDark } = useTheme();
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
      <div>
        <h1 className={cn('text-xl font-bold tracking-tight', isDark ? 'text-white' : 'text-[#1A1A1E]')}>{title}</h1>
        {subtitle && <p className={cn('text-xs mt-0.5', isDark ? 'text-[#A1A1AA]' : 'text-[#64748B]')}>{subtitle}</p>}
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  );
}
