'use client'

import { useQuery } from "@tanstack/react-query";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { DialogTrigger } from "@/components/ui/dialog";
import { getDabarsByCollectionId } from "@/supabase/dabar";
import Link from "next/link";

const DabarCollectionQuizPage = ({ params }: { params: { slug: string }}) => {
  const router = useRouter()
  const { isLoading, isFetching, data } = useQuery({
    queryKey: ['getDabarsByCollectionId', params.slug],
    queryFn: () => getDabarsByCollectionId(params.slug),
    staleTime: 15 * 60 * 1000,
    gcTime: 30 * 60 * 1000
  })

  return (
    <div className="">
      <div className='flex items-center pt-4 pb-3 my-2'>
        <ChevronLeftIcon className='h-6 w-6 mr-2' onClick={() => router.back()}/>
        <h2 className='text-xl'>퀴즈</h2>
      </div>
      {isLoading || isFetching ? (
          <div>
            <Skeleton className="h-[360px] w-full" />
          </div>
        ) : (
          <>
            {data ? (
              <div className="grid grid-cols-3 gap-3">
                {data.map((item) => (
                  <Link key={item.id} href={`/dabar/quiz/${item.id}`}>
                    <div className="relative flex flex-col items-center border p-4 rounded-lg hover:bg-gray-100">
                      <p className="text-center text-[15px] font-semibold whitespace-pre-line">{item.bible_reference.replace(/ /g, '\n')}</p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div>데이터 없어요</div>
            )}
          </>
        )}
    </div>
  );
};

export default DabarCollectionQuizPage;



