'use client'

import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { getDabarCollections } from "@/lib/supabase/dabar";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

const DabarCollectionCards = ({ baseUrl }:{baseUrl: string}) => {
  const { isLoading, isFetching, data } = useQuery({
    queryKey: ['getDabarCollections'],
    queryFn: () => getDabarCollections(),
    staleTime: 15 * 60 * 1000,
    gcTime: 30 * 60 * 1000
  })
  
  return (
    <>
      {isLoading || isFetching ? (
        <div className='grid grid-cols-2 gap-x-3 gap-y-6 sm:grid-cols-3'>
          {Array.from({ length: 6}).map((_, index) =>  <Skeleton key={index} className="h-[210px] w-full rounded-lg" /> )}
        </div>
      ) : (
        <section className='grid grid-cols-2 gap-x-3 gap-y-6 sm:grid-cols-3'>
          {data && data.map(collection => (
            <Link key={collection.id} href={`${baseUrl}${collection.id}`} aria-disabled={!collection.releaseStatus} className={`${!collection.releaseStatus && 'pointer-events-none'}`} >
              <div className={cn(
                'h-[210px] w-full flex items-center justify-center border rounded-lg',
                collection.releaseStatus ? 'border-solid bg-[#2E406B]' : 'border-dashed'
              )}>
                {collection.releaseStatus && <p className="text-white font-semibold"><span className="text-yellow-500">25차</span> 다바르 암송카드</p>}
              </div>
              <div className='py-2'>
                <p className='text-sm'>{collection.name}</p>
                <Badge variant={collection.releaseStatus ? 'outline': 'secondary'}>{collection.releaseStatus ? '오픈' : '시작전'}</Badge>
              </div>
            </Link>
          ))}
        </section>
      )}
    </>
  );
};

export default DabarCollectionCards;
