import BottomTab from "@/components/commons/BottomTab/BottomTab";
import Container from "@/components/commons/Container/Container";
import Header from "@/components/commons/Header";

type BiblePageProps = {}

const BiblePage = ({}: BiblePageProps) => {
  return (
    <>
      <Header />
      <Container>
        설교/QT화면
      </Container>
      <BottomTab />
    </>
  );
};

export default BiblePage;
