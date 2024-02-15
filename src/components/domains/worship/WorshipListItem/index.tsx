import { TWorshipCard } from "@/types/worship.types";
import { format } from "date-fns";
import Link from "next/link";

type WorshipListItemProps = {
  worship: TWorshipCard
}

const WorshipListItem = ({ worship }: WorshipListItemProps) => {
  return (
    <Link href={`/worship/${worship.id}`}>
      <div className="py-5">
        <span className="relative block text-xs mb-[4px] font-medium text-[#9096a1]">{format(worship.serviceDate, 'yyyy.MM.dd')}</span>
        <span className="text-base font-bold">{worship.title}</span>
        <span className="block space-x-2 mt-[5px]">
          <span className="text-sm font-medium text-[#707884]">
            {worship.pastors?.id === 999 ? worship.invited_lecturer : `${worship.pastors?.name}${' '}${worship.pastors?.position}`}
          </span>
          <span className="relative inline-block text-sm font-medium text-[#707884] px-2">
            <span className="w-[1px] h-[10px] absolute top-[5px] left-0 bg-[#9096a1]"/>
            {worship.script}
          </span>
        </span>
      </div>
    </Link>
  );
};

export default WorshipListItem;
