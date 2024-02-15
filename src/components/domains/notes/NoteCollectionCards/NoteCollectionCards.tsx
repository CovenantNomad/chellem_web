'use client'

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { getNoteCollections } from "@/lib/supabase/notes";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

type NoteCollectionCardsProps = {}

const NoteCollectionCards = ({}: NoteCollectionCardsProps) => {
  const { isLoading, isFetching, data } = useQuery({
    queryKey: ['getNoteCollections'],
    queryFn: () => getNoteCollections(),
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
            <Link 
              key={collection.id}
              href={{
                pathname: `/notes/${collection.type}`,
                query: { 'numberOfNotes': collection.num }
              }}
              as={`/notes/${collection.type}`}
            >
              <div className={cn(
                'h-[210px] w-full flex items-center justify-center rounded-lg shadow-md',
                collection.type === 'QT' && 'bg-[#C0C7E1]',
                collection.type === 'SERMON' && 'bg-[#F2E8DA]',
                collection.type === 'THANKS' && 'bg-[#EFD3D3]',
                collection.type === 'DIARY' && 'bg-[#F8EBC6]',
                collection.type === 'CONTEMPLATION' && 'bg-[#D0DCCC]',
                )}
              >
                <span className="text-sm text-gray-700 font-semibold">{collection.name}</span>
              </div>
              <div className='py-2'>
                <p className='text-sm'>{collection.num.toLocaleString('KR-kr')} Notes</p>
              </div>
            </Link>
          ))}
        </section>
      )}
    </>
  );
};

export default NoteCollectionCards;
