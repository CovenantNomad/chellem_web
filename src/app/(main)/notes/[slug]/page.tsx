'use client'

import Container from "@/components/commons/Container/Container";
import DetailPageHeader from "@/components/commons/DetailPageHeader";
import { Input } from "@/components/ui/input";
import { Enums, Tables } from "@/types/database.types";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { cookies } from "next/headers";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ko } from 'date-fns/locale';
import { filterItemsByDate } from "@/lib/utils";
import { getNotes } from "@/supabase/notes";
import Link from "next/link";

const NotePage = ({ params }: { params: { slug: Enums<'NOTE_TYPE'> } }) => {
  // const searchParams = useSearchParams();
  // const numberOfNotes = searchParams.get('numberOfNotes');
  const [ lastSevenDaysItemLists, setLastSevenDaysItemLists ] = useState<Tables<'notes'>[] | null>(null)
  const [ lastThirtyDaysItemLists, setLastThirtyDayItemLists ] = useState<Tables<'notes'>[] | null>(null)
  const [ olderThanThirtyDaysItemLists, setOlderThanThirtyDaysItemLists ] = useState<Tables<'notes'>[] | null>(null)
  const { isLoading, isFetching, data } = useQuery({
    queryKey: ['getNotes', params.slug],
    queryFn: () => getNotes(params.slug),
    staleTime: 15 * 60 * 1000,
    gcTime: 30 * 60 * 1000
  })

  useEffect(() => {
    if (!isLoading || !isFetching) {
      if (data) {
        const { lastSevenDaysItems, lastThirtyDaysItems, olderThanThirtyDaysItems } = filterItemsByDate(data)
        setLastSevenDaysItemLists(lastSevenDaysItems)
        setLastThirtyDayItemLists(lastThirtyDaysItems)
        setOlderThanThirtyDaysItemLists(olderThanThirtyDaysItems)
      }
    }
  }, [data, isFetching, isLoading])

  const getPageTite = (slug: Enums<'NOTE_TYPE'>) => {
    switch (slug) {
      case 'QT':
        return '큐티노트'
      case 'SERMON':
        return '설교노트'  
      case 'THANKS':
        return '감사노트'
      case 'DIARY':
        return '영성일기'
      case 'CONTEMPLATION':
        return '묵상노트'

      default:
        break;
    }
  }

  return (
    <Container>
      <DetailPageHeader title="폴더" />
      <h1 className="text-xl font-bold">{getPageTite(params.slug)} {data && <span className="text-sm ml-1 font-normal">{data.length}</span>}</h1>
      <div className="my-3">
        <Input type="text" placeholder="검색 (개발중..)" />
      </div>
      {isLoading || isFetching ? (
        <div>로딩중..</div>
      ) : (
        <>
          {data && data.length !== 0 ? (
            <>
              {lastSevenDaysItemLists && (
                <div className="mt-5">
                  <h4 className="font-medium">이전 7일</h4>
                  <div className="flex flex-col space-y-2 mt-2">
                    {lastSevenDaysItemLists.map(note => (
                      <Link key={note.id} href={`/notes/${params.slug}/${note.id}`}>
                        <div className="border px-4 py-2 rounded-lg">
                          <div className="font-semibold">{note.title}</div>
                          <div className="text-sm text-gray-500 overflow-hidden text-ellipsis whitespace-nowrap mt-1">
                            <span className="mr-3">{format(note.date, 'EEEE', {locale: ko})}</span>
                            <span>{note.content}</span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
              {lastThirtyDaysItemLists && lastThirtyDaysItemLists.length !== 0 && (
                <div className="mt-5">
                  <h4 className="font-medium">이전 30일</h4>
                  <div className="flex flex-col space-y-2 mt-2">
                    {lastThirtyDaysItemLists.map(note => (
                      <Link key={note.id} href={`/notes/${params.slug}/${note.id}`}>
                        <div className="border px-4 py-2 rounded-lg">
                          <div>{note.title}</div>
                          <div className="text-sm text-gray-500 overflow-hidden text-ellipsis whitespace-nowrap mt-1">
                            <span className="mr-3">{format(note.date, 'yyyy. MM. dd')}</span>
                            <span>{note.content}</span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
              {olderThanThirtyDaysItemLists && olderThanThirtyDaysItemLists.length !== 0 &&(
                <div className="mt-5">
                  <h4 className="font-medium">모든 데이터</h4>
                  <div className="flex flex-col space-y-2 mt-2">
                    {olderThanThirtyDaysItemLists.map(note => (
                      <Link key={note.id} href={`/notes/${params.slug}/${note.id}`}>
                        <div className="border px-4 py-2 rounded-lg">
                          <div className="font-semibold">{note.title}</div>
                          <div className="text-sm text-gray-500 overflow-hidden text-ellipsis whitespace-nowrap mt-1">
                            <span className="mr-2">{format(note.date, 'EEEE', {locale: ko})}</span>
                            <span className="">{note.content}</span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="py-2 mt-5 rounded-lg ">
              <span className="text-sm">작성 된 노트가 없습니다</span>
            </div>
          )}
        </>
      )}
    </Container>
  );
};

export default NotePage;
