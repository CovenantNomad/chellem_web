'use client'

import { useQuery } from "@tanstack/react-query";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";
import DabarViewController from "@/components/domains/dabar/DabarViewController/DabarViewController";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import DabarViewer from "@/components/domains/dabar/DabarViewer/DabarViewer";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { getDabarsByCollectionId } from "@/supabase/dabar";

const DabarCollectionPage = ({ params }: { params: { slug: string } }) => {
  const [ selectedVerse, setSelectedVerse ] = useState<{scripture_passage: string, bible_reference: string}>({
    scripture_passage: "",
    bible_reference: ""
  })
  const [ isHorizontalView, setIsHorizontalView ] = useState(true)
  const router = useRouter()
  const { isLoading, isFetching, data } = useQuery({
    queryKey: ['getDabarsByCollectionId', params.slug],
    queryFn: () => getDabarsByCollectionId(params.slug),
    staleTime: 15 * 60 * 1000,
    gcTime: 30 * 60 * 1000
  })


  return (
    <div className="">
      <div className='flex items-center pt-4 my-2'>
        <ChevronLeftIcon className='h-6 w-6 mr-2' onClick={() => router.back()}/>
        <h2 className='text-xl'>다바르 암송카드</h2>
      </div>
      <div className="mb-3">
        <DabarViewController setIsHorizontalView={setIsHorizontalView}/>
      </div>
      {isLoading || isFetching ? (
          <div>
            <Skeleton className="h-[360px] w-full" />
          </div>
        ) : (
          <>
            {data ? (
              <>
              {isHorizontalView ? (
                <Carousel>
                  <CarouselContent>
                    {data.map(item => (
                      <CarouselItem key={item.id}>
                        <Card>
                          <CardContent className="relative flex flex-col aspect-square items-center justify-center p-6">
                            <div>
                              <p className="whitespace-pre-line text-center text-base leading-7">{item.scripture_passage}</p>
                              <span className="block text-sm text-center mt-4">{item.bible_reference}</span>
                            </div>
                          </CardContent>
                        </Card>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="ml-14" />
                  <CarouselNext className="mr-14"/>
                </Carousel>
              ) : (
                <Dialog>
                  <div className="grid grid-cols-3 gap-3">
                    {data.map((item) => (
                      <DialogTrigger key={item.id} onClick={() => setSelectedVerse({scripture_passage: item.scripture_passage, bible_reference: item.bible_reference})}>
                        <div className="relative flex flex-col items-center border p-4 rounded-lg hover:bg-gray-100">
                          <p className="text-center text-[15px] font-semibold whitespace-pre-line">{item.bible_reference.replace(/ /g, '\n')}</p>
                        </div>
                      </DialogTrigger>
                    ))}
                  </div>
                  <DabarViewer
                    bible_reference={selectedVerse.bible_reference}
                    scripture_passage={selectedVerse.scripture_passage}
                  />
                </Dialog>
              )}
              </>
            ) : (
              <div>데이터 없어요</div>
            )}
          </>
        )}
    </div>
  );
};

export default DabarCollectionPage;
