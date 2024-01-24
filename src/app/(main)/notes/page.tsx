import BottomTab from "@/components/commons/BottomTab";
import Container from "@/components/commons/Container/Container";
import Header from "@/components/commons/Header";
import MainContainer from "@/components/commons/MainContainer/MainContainer";
import Spacer from "@/components/commons/Spacer";
import NoteCollectionCards from "@/components/domains/notes/NoteCollectionCards/NoteCollectionCards";
import NoteHeader from "@/components/domains/notes/NoteHeader/NoteHeader";

type NotesProps = {}

const NotesPage = ({}: NotesProps) => {
  return (
    <MainContainer>
      <Header />
      <Container>
        <NoteHeader />
        <Spacer className="h-4" />
        <NoteCollectionCards />
      </Container>
      <BottomTab />
    </MainContainer>
  );
};

export default NotesPage;
