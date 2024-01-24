'use client'

import { getBibleScriptList } from "@/supabase/worships";
import { Enums } from "@/types/database.types";
import { useQuery } from "@tanstack/react-query";

type BibleScriptListProps = {
  script: string;
  book: Enums<'BOOK_TYPE'>
  firstChapter: string;
  secondChapter?: string;
  firstStart: string;
  firstEnd?: string;
  secondStart?: string;
  secondEnd?: string;
}

const BibleScriptList = ({ script, book, firstChapter, secondChapter, firstStart, firstEnd, secondStart, secondEnd}: BibleScriptListProps) => {
  const { isLoading, isFetching, data } = useQuery({
    queryKey: ['getBibleScriptList', book, firstChapter, secondChapter, firstStart, firstEnd, secondStart, secondEnd],
    queryFn: () => getBibleScriptList({book, firstChapter, secondChapter, firstStart, firstEnd, secondStart, secondEnd}),
    enabled: !!firstChapter,
    staleTime: 15 * 60 * 1000,
    gcTime: 30 * 60 * 1000
  })

  return (
    <div>
      {isLoading || isFetching ? (
        <div>로딩중...</div>
      ) : (
        <>
          <div className="py-5 my-2 border text-sm text-center">
            본문: {script}
          </div>
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
