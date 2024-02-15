import Container from "@/components/commons/Container/Container";
import InnerContainer from "@/components/commons/Container/InnerContainer/InnerContainer";
import DetailPageHeader from "@/components/commons/DetailPageHeader";
import { Tables } from "@/types/database.types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { format } from "date-fns";
import { cookies } from "next/headers";

const NoteDetailpage = async ({ params }: { params: { id: string } }) => {
  const cookieStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookieStore })
  const noteQuery = supabase
    .from('notes')
    .select(`*`)
    .eq('id', params.id)
    .single<Tables<'notes'>>()

  const { data } = await noteQuery


  return (
    <Container>
      <DetailPageHeader title="노트목록" className="bg-white"/>
      <InnerContainer className="h-full bg-white">
        {data ? (
          <div>
            <div>
              {data.type === 'QT' || data.type === 'SERMON' ? (
                <span className="text-sm text-gray-600">{format(data.date, 'yyyy. MM. dd HH:mm')}</span>
              ) : (
                <span className="text-sm text-gray-600">{format(data.updated_at, 'yyyy. MM. dd HH:mm')}</span>
              )}
            </div>
            {data.title && (
              <div className="mt-2">
                <span className="text-2xl font-bold">{data.title}</span>
              </div>
            )}
            {data.script && (
              <div className="mt-1">
                <span className="text-sm text-gray-600">{data.script}</span>
              </div>
            )}
            <div className="mt-4">
              <p className="">{data.content}</p>
            </div>
          </div>
        ) : (
          <div>
            데이터가 없어요
          </div>
        )}
      </InnerContainer>
    </Container>
  );
};

export default NoteDetailpage;
