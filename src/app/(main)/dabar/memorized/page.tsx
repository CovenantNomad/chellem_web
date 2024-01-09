'use client'

import { Badge } from "@/components/ui/badge";
import { getDabarRecords } from "@/supabase/dabar";
import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from 'date-fns'

type MemorizedPageProps = {}

const MemorizedPage = ({}: MemorizedPageProps) => {
  const { isLoading, isFetching, data } = useQuery({
    queryKey: ['getDabarRecords'],
    queryFn: () => getDabarRecords(),
    staleTime: 15 * 60 * 1000,
    gcTime: 30 * 60 * 1000
  })

  console.log(data)



  return (
    <div>
      <div className='flex pt-4 pb-3 my-2'>
        <h2 className='text-xl'>외웠던 말씀들</h2>
      </div>
      <div>
        {isLoading || isFetching ? (
          <div></div>
        ) : (
          <>
            {data ? (
              <div>
                {data.data && data.data.map((item, index) => (
                  <div key={item.id} className="border rounded-lg p-3">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">
                        {item.dabar?.bible_reference}
                      </span>
                      <span className="ml-auto text-xs">
                        {formatDistanceToNow(new Date(item.created_at), { addSuffix: true })}
                      </span>
                    </div>
                    <div className="text-sm mt-3">
                      {item.dabar?.dabar_collections?.name} <Badge variant="outline" className="ml-2">{item.dabar?.dabar_collections?.theme}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div>데이터 없음</div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MemorizedPage;
