import BottomTab from "@/components/commons/BottomTab";
import Container from "@/components/commons/Container/Container";
import InnerContainer from "@/components/commons/Container/InnerContainer/InnerContainer";
import Header from "@/components/commons/Header";
import MainContainer from "@/components/commons/MainContainer/MainContainer";
import NoteCollectionCards from "@/components/domains/notes/NoteCollectionCards/NoteCollectionCards";
import Link from "next/link";

type NotesProps = {}

const NotesPage = async ({}: NotesProps) => {

  return (
    <MainContainer className="bg-white">
      <Header />
      <Container>
        <InnerContainer>
          <div className="py-4">
            <Link href={'/search-notes'}>
              <button className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-start text-muted-foreground">노트를 검색하세요</button>
            </Link>
          </div>
          <NoteCollectionCards />
        </InnerContainer>
      </Container>
      <BottomTab />
    </MainContainer>
  );
};

export default NotesPage;
