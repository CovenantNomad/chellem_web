'use client'

import CustomLoading from "@/components/commons/CustomLoading";
import { getBibleScriptList } from "@/lib/supabase/worships";
import { Enums } from "@/types/database.types";
import { useQuery } from "@tanstack/react-query";

type BibleScriptListProps = {
  script: string;
  book: Enums<'BOOK_TYPE'>
  firstChapter: string;
  secondChapter?: string;
  firstStart: number;
  firstEnd?: number;
  secondStart?: number;
  secondEnd?: number;
}

const BibleScriptList = ({ book, firstChapter, secondChapter, firstStart, firstEnd, secondStart, secondEnd}: BibleScriptListProps) => {
  const { isLoading, isFetching, data } = useQuery({
    queryKey: ['getBibleScriptList', book, firstChapter, secondChapter, firstStart, firstEnd, secondStart, secondEnd],
    queryFn: () => getBibleScriptList({book, firstChapter, secondChapter, firstStart, firstEnd, secondStart, secondEnd}),
    enabled: !!firstChapter,
    staleTime: 15 * 60 * 1000,
    gcTime: 30 * 60 * 1000
  })

  return (
    <div className="pb-16">
      {isLoading || isFetching ? (
        <CustomLoading text={'본문을 가져오고 있습니다..'} />
      ) : (
        <>
          {data ? (
            <div className="divide-y">
              {data.map(verse => (
                <div key={verse.id} className="flex">
                  <div className="w-[8%] py-5 text-sm">{verse.verse}</div>
                  <div className="w-[87%] py-5 ml-[3%] text-sm">{verse.content}</div>
                </div>
              ))}
            </div>
          ) : (
            <div>데이터가 없습니다</div>
          )}
        </>
      )}
    </div>
  );
};

export default BibleScriptList;
