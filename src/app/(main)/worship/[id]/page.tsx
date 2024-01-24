import DetailPageHeader from "@/components/commons/DetailPageHeader";
import BibleScriptList from "@/components/domains/bibles/BibleScript/BibleScriptList";
import QtAndSermonNoteBlock from "@/components/domains/notes/QtAndSermonNoteBlock";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { QueryData } from "@supabase/supabase-js";
import { cookies } from "next/headers";

const WorshipDetailPage = async ({ params }: { params: { id: string } }) => {
  const cookieStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookieStore })
  const worshipQuery = supabase.from('worships').select(`*, pastors(id, name, position)`).eq('id', params.id).single()
  const { data } = await worshipQuery

  return (
    <div className="overflow-y-hidden">
      <DetailPageHeader title={'오늘의 예배'}/>
      <div className="aspect-video">
        <iframe width={'100%'} height={'100%'} src={data.youtube_url}></iframe>
      </div>
      <Tabs defaultValue="script" className="w-full max-w-[600px] mt-4">
        <TabsList className="w-full rounded-none">
          <TabsTrigger value="script">본문</TabsTrigger>
          <TabsTrigger value="notes">노트</TabsTrigger>
        </TabsList>
        <TabsContent value="script">
          <ScrollArea className="h-[480px] w-full p-4">
            {data && data.script && data.book && data.chapter && data.verses ? (
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
        </TabsContent>
        <TabsContent value="notes">
          <ScrollArea className="h-[480px] w-full">
            <QtAndSermonNoteBlock worship={data} />
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WorshipDetailPage;
