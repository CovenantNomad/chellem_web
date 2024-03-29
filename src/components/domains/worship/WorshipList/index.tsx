'use client'

import { useState } from "react";
import WorshipTypeChips from "../WorshipTypeChips";
import { useQuery } from "@tanstack/react-query";
import { getWorshipsByType } from "@/lib/supabase/worships";
import WorshipListItem from "../WorshipListItem";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import CustomLoading from "@/components/commons/CustomLoading";

type WorshipListProps = {}

const WorshipList = ({}: WorshipListProps) => {
  const [ selectedService, setSelectedService] = useState<string>('SUNDAY SERVICE')

  const { isLoading, isFetching, data } = useQuery({
    queryKey: ['getDabarCollections', selectedService],
    queryFn: () => getWorshipsByType(selectedService),
    staleTime: 15 * 60 * 1000,
    gcTime: 30 * 60 * 1000
  })

  return (
    <div>
      <WorshipTypeChips selectedService={selectedService} setSelectedService={setSelectedService} />
      {isLoading || isFetching ? (
        <CustomLoading text={'예배목록을 불러오고 있습니다..'}/>
      ) : (
        <ScrollArea className="h-[calc(100vh-224px)] pt-[14px] pb-[60px] scrollbar-hide">
          {data && data.length !== 0 ? (
            <div className="flex flex-col divide-y">
              {data.map(service => <WorshipListItem key={service.id} worship={service}/>)}
            </div>
          ) : (
            <div>데이터 없어요</div>
          )}
          <ScrollBar className="scrollbar-hide" />
        </ScrollArea>
      )}
    </div>
  );
};

export default WorshipList;
