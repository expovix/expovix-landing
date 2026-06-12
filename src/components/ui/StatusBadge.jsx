import { cn } from '@/lib/utils';

const STATUS_STYLES = {
  Pending:   'bg-[#F59E0B]/10 text-[#F59E0B]',
  Approved:  'bg-[#10B981]/10 text-[#10B981]',
  Rejected:  'bg-[#EF4444]/10 text-[#EF4444]',
  Quoted:    'bg-[#3B82F6]/10 text-[#3B82F6]',
  Accepted:  'bg-[#10B981]/10 text-[#10B981]',
  Paid:      'bg-[#10B981]/10 text-[#10B981]',
  Confirmed: 'bg-[#10B981]/10 text-[#10B981]',
  Reserved:  'bg-[#EC4899]/10 text-[#EC4899]',
  Available: 'bg-[#F59E0B]/10 text-[#F59E0B]',
};

export default function StatusBadge({ status }) {
  return (
    <span className={cn('inline-block px-2 py-0.5 rounded-md text-[10px] font-medium', STATUS_STYLES[status] || 'bg-[#A1A1AA]/10 text-[#A1A1AA]')}>
      {status}
    </span>
  );
}
