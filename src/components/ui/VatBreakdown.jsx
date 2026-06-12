import { useCurrency } from '@/lib/CurrencyContext';
import { calcVat } from '@/lib/vat';
import { useTheme } from '@/lib/ThemeContext';
import { cn } from '@/lib/utils';

export default function VatBreakdown({ amountBeforeVat, compact = false }) {
  const { format } = useCurrency();
  const { isDark } = useTheme();
  const { before, vat, after } = calcVat(amountBeforeVat);

  const muted = isDark ? 'text-[#A1A1AA]' : 'text-[#64748B]';
  const text = isDark ? 'text-white' : 'text-[#1A1A1E]';

  if (compact) {
    return (
      <div className="flex flex-col gap-0.5">
        <span className={cn('text-xs font-semibold font-mono', text)}>{format(after)}</span>
        <span className={cn('text-[10px]', muted)}>+VAT {format(vat)}</span>
      </div>
    );
  }

  return (
    <div className={cn('rounded-xl border p-3 space-y-1.5 text-xs', isDark ? 'bg-white/[0.02] border-white/[0.06]' : 'bg-black/[0.02] border-black/[0.05]')}>
      <div className="flex justify-between">
        <span className={muted}>Before VAT</span>
        <span className={cn('font-mono font-medium', text)}>{format(before)}</span>
      </div>
      <div className="flex justify-between">
        <span className={muted}>VAT 15%</span>
        <span className="font-mono text-[#F59E0B]">+{format(vat)}</span>
      </div>
      <div className={cn('flex justify-between font-semibold pt-1.5 border-t', isDark ? 'border-white/[0.06]' : 'border-black/[0.05]')}>
        <span className={text}>After VAT</span>
        <span className={cn('font-mono', text)}>{format(after)}</span>
      </div>
    </div>
  );
}
