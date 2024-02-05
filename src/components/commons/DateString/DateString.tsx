import { format } from "date-fns";

const DateString = ({ date }: { date: Date, className?: React.ComponentProps<'span'>['className'] }) => {
  return <span className="inline-blokc text-xs font-normal text-[#9096a1] tracking-[-0.3px]">{format(date, 'yyyy.MM.dd')}</span>
};

export default DateString;
