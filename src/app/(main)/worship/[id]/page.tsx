import DetailPageHeader from "@/components/commons/DetailPageHeader";
import BibleScriptList from "@/components/domains/bibles/BibleScript/BibleScriptList";
import QtAndSermonNoteBlock from "@/components/domains/notes/QtAndSermonNoteBlock";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const WorshipDetailPage = async ({ params }: { params: { id: string } }) => {
  const supabase = createServerComponentClient({ cookies })
  const worshipQuery = supabase.from('worships').select(`*, pastors(id, name, position)`).eq('id', params.id).single()
  const { data } = await worshipQuery

  return (
    <div className="overflow-y-hidden">
      <DetailPageHeader title={'오늘의 예배'}/>
      <Tabs defaultValue="script" className="w-full max-w-[600px] mt-4">
        <TabsList className="w-full rounded-none">
          <TabsTrigger value="script">예배정보</TabsTrigger>
          <TabsTrigger value="notes">노트</TabsTrigger>
        </TabsList>
        <TabsContent value="script">
          {data ? (
            <div className="mt-8 px-4">
              <h2 className="text-xl font-bold text-center">{data.title}</h2>
              <p className="text-center mt-2">말씀: {data.pastors.name} {data.pastors.position}</p>
              <div className="flex flex-col items-center mt-5">
                {data.youtube_url ? (
                  <Button size={'sm'}>
                    <a href={data.youtube_url} target="_blank">예배링크 바로가기</a>
                  </Button>
                ) : (
                  <Button size={'sm'} disabled={true} variant="destructive">
                    예배링크 없습니다
                  </Button>
                )}
                <span className="text-sm text-gray-500 mt-2">예배링크는 채널 관리자에 의해 비공개처리 될 수 있습니다</span>
              </div>
              <div className="py-5 mt-8 mb-2 border text-sm text-center">
                본문: {data.script}
              </div>
              <ScrollArea className="w-full h-[480px]">
                {data.script && data.book && data.chapter && data.verses ? (
                  <BibleScriptList 
                    script={data.script}
                    book={data.book}
                    firstChapter={data.chapter[0]}
                    firstStart={data.verses[0]}
                    firstEnd={data.verses[1]}
                  />
                ) : (
                  <div>본문이 없어요.. 나중에 업데이트하는거 만들게요..</div>
                )}
              </ScrollArea>
            </div>
          ) : (
            <div>예배정보가 없습니다</div>
          )}
        </TabsContent>
        <TabsContent value="notes">
          {data && <QtAndSermonNoteBlock worship={data} />}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WorshipDetailPage;
