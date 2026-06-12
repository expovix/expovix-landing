import { useTheme } from '@/lib/ThemeContext';
import { cn } from '@/lib/utils';

export default function ThemedCard({ className, children, ...props }) {
  const { isDark } = useTheme();
  return (
    <div
      className={cn(
        'rounded-xl border',
        isDark ? 'bg-[#18181B] border-[#27272A]' : 'bg-white border-black/[0.08]',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
