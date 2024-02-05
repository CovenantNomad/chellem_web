import { cn } from "@/lib/utils";
import DateString from "../DateString/DateString";

const SectionHeader = ({ title, date }: { title: string, date?: Date }) => {
  return (
    <h3 className={cn('flex pt-[14px] pb-[10px] lg:pt-5', date ? 'flex-col' : 'flex-row')}>
      <span className="text-lg tracking-[-0.5px] font-bold">{title}</span>
      {date && (<DateString date={date} className='mt-[2px]'/>)}
    </h3>
  );
};

export default SectionHeader;
