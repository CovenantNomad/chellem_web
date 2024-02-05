import BottomTab from "@/components/commons/BottomTab";
import Container from "@/components/commons/Container/Container";
import InnerContainer from "@/components/commons/Container/InnerContainer/InnerContainer";
import Header from "@/components/commons/Header";
import MainContainer from "@/components/commons/MainContainer/MainContainer";
import Spacer from "@/components/commons/Spacer";
import NoteCollectionCards from "@/components/domains/notes/NoteCollectionCards/NoteCollectionCards";
import NoteHeader from "@/components/domains/notes/NoteHeader/NoteHeader";

type NotesProps = {}

const NotesPage = async ({}: NotesProps) => {

  return (
    <MainContainer>
      <Header />
      <Container>
        <InnerContainer>
          <NoteHeader />
          <Spacer className="h-4" />
          <NoteCollectionCards />
        </InnerContainer>
      </Container>
      <BottomTab />
    </MainContainer>
  );
};

export default NotesPage;
