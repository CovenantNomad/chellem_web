import DetailPageHeader from "@/components/commons/DetailPageHeader";
import BibleScriptList from "@/components/domains/bibles/BibleScript/BibleScriptList";
import QtAndSermonNoteBlock from "@/components/domains/notes/QtAndSermonNoteBlock";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { parseScriptureInput } from "@/lib/utils";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const WorshipDetailPage = async ({ params }: { params: { id: string } }) => {
  const supabase = createServerComponentClient({ cookies })
  const worshipQuery = supabase.from('worships').select(`*, pastors(id, name, position)`).eq('id', params.id).single()
  const { data } = await worshipQuery

  return (
    <div className="h-screen overflow-hidden">
      <DetailPageHeader title={'오늘의 예배'} className="bg-white" />
      <Tabs defaultValue="script" className="h-full w-full max-w-[600px] mt-2">
        <TabsList className="h-8 w-full rounded-none">
          <TabsTrigger value="script">예배정보</TabsTrigger>
          <TabsTrigger value="notes">노트</TabsTrigger>
        </TabsList>
        <TabsContent value="script">
          {data ? (
            <div>
              <div className="flex flex-col pt-[14px] pb-[10px] px-5 bg-white">
                <h4 className="text-xl font-bold text-center">{data.title}</h4>
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
                  <span className="text-xs text-gray-500 mt-2">예배링크는 채널 관리자에 의해 비공개처리 될 수 있습니다</span>
                </div>
              </div>
              <div className="flex flex-col pt-[14px] pb-[10px] px-5 mt-2 bg-white">
                <div className="py-5 mb-2 border text-sm text-center">
                  본문: {data.script}
                </div>
                <ScrollArea className="w-full h-[calc(100vh-378px)]">
                  {data.script && data.book && data.chapter && data.verses ? (
                    <BibleScriptList 
                      script={data.script}
                      book={data.book}
                      firstChapter={data.chapter[0]}
                      firstStart={data.verses[0]}
                      firstEnd={data.verses[1]}
                      secondChapter={data.chapter.length == 2 ? data.chapter[1] : undefined}
                      secondStart={data.chapter.length > 2 || data.chapter.length <= 4 ? data.verses[2] : undefined}
                      secondEnd={data.chapter.length == 4 ? data.verses[3] : undefined}
                    />
                  ) : (
                    <div>본문이 없어요.. 나중에 업데이트하는거 만들게요..</div>
                  )}
                </ScrollArea>
              </div>
            </div>
          ) : (
            <div>예배정보가 없습니다</div>
          )}
        </TabsContent>
        <TabsContent value="notes" className='h-full'>
          {data && <QtAndSermonNoteBlock worship={data} />}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WorshipDetailPage;
