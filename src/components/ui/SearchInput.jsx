import { Search } from 'lucide-react';
import { useTheme } from '@/lib/ThemeContext';
import { cn } from '@/lib/utils';

export default function SearchInput({ value, onChange, placeholder, className }) {
  const { isDark } = useTheme();
  return (
    <div className={cn('relative', className)}>
      <Search className={cn('absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5', isDark ? 'text-[#52525B]' : 'text-[#94A3B8]')} />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          'w-full pl-9 pr-3 py-2 rounded-lg border text-xs transition-colors outline-none',
          isDark
            ? 'bg-[#18181B] border-[#27272A] text-white placeholder:text-[#52525B] focus:border-[#FF5F29]/50'
            : 'bg-white border-black/[0.08] text-[#1A1A1E] placeholder:text-[#94A3B8] focus:border-[#FF5F29]/50'
        )}
      />
    </div>
  );
}
