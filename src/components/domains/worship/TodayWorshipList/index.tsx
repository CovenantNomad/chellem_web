'use client'

import { worshipState } from "@/stores/worshipState";
import { useRecoilState } from "recoil";
import WorshipCard from "../WorshipCard";
import { useQuery } from "@tanstack/react-query";
import { getTodayWorships } from "@/lib/supabase/worships";
import { format } from "date-fns";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

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
        <Card className="h-[148px]">
          <CardHeader>
            <CardTitle>
              <Skeleton className="w-[110px] h-6"/>
            </CardTitle>
            <CardDescription>
              <Skeleton className="w-[230px] h-5"/>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Skeleton className="w-[110px] h-[19px]"/>  
          </CardContent>
        </Card>
      ) : (
        <>
          {data && data.length !== 0 ? (
            <div className="flex flex-col space-y-3">
              {data.map(worship => <WorshipCard key={worship.id} worship={worship} />)}
            </div>
          ) : (
            <Card className="h-[148px]">
              <CardContent className="h-full flex justify-center items-center">
                <span>예배 데이터가 없습니다</span>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
};

export default TodayWorshipList;
