'use client'

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
        <span className="text-sm font-bold">{worship.title}</span>
        <span className="block space-x-2 mt-[5px]">
          <span className="text-sm font-medium text-[#929294]">
            {worship.pastors?.id === 999 ? worship.invited_lecturer : `${worship.pastors?.name}${' '}${worship.pastors?.position}`}
          </span>
          <span className="relative inline-block text-sm font-medium text-[#929294] px-2 before:content-none before:w-[1px] before:h-[10px] before:bg-red-50 before:absolute before:top-[5px] before:left-0">{worship.script}</span>
          <span className="relative inline-block text-sm font-medium text-[#929294]">{format(worship.serviceDate, 'yyyy.MM.dd')}</span>
        </span>
      </div>
    </Link>
  );
};

export default WorshipListItem;
