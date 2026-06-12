import { cn } from '@/lib/utils';

export default function PrimaryButton({ children, className, ...props }) {
  return (
    <button
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FF5F29] text-white text-xs font-medium hover:bg-[#e54e20] transition-colors',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
