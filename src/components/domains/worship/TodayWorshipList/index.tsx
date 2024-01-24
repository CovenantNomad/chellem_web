'use client'

import { worshipState } from "@/stores/worshipState";
import { useRecoilState } from "recoil";
import WorshipCard from "../WorshipCard";
import { useQuery } from "@tanstack/react-query";
import { getTodayWorships } from "@/supabase/worships";
import { format } from "date-fns";

type TodayWorshipListProps = {}

const TodayWorshipList = ({}: TodayWorshipListProps) => {
  const [ worship, setWorship] = useRecoilState(worshipState)

  const { isLoading, isFetching, data } = useQuery({
    queryKey: ['getDabarCollections', format(worship.selectedDate, 'yyyy-MM-dd')],
    queryFn: () => getTodayWorships(format(worship.selectedDate, 'yyyy-MM-dd')),
    staleTime: 15 * 60 * 1000,
    gcTime: 30 * 60 * 1000
  })

  return (
    <div>
      {isLoading || isFetching ? (
        <div>로딩중..</div>
      ) : (
        <>
          {data ? (
            <div className="flex flex-col space-y-3">
              {data.map(worship => <WorshipCard key={worship.id} worship={worship} />)}
            </div>
          ) : (
            <div>데이터 없어요</div>
          )}
        </>
      )}
    </div>
  );
};

export default TodayWorshipList;
