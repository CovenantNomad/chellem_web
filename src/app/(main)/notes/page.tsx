import BottomTab from "@/components/commons/BottomTab";
import Container from "@/components/commons/Container/Container";
import Header from "@/components/commons/Header";

type NotesProps = {}

const NotesPage = ({}: NotesProps) => {
  return (
    <>
      <Header />
      <Container>
        노트화면
      </Container>
      <BottomTab />
    </>
  );
};

export default NotesPage;
