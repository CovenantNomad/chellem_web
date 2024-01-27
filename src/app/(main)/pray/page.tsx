import BottomTab from "@/components/commons/BottomTab";
import Container from "@/components/commons/Container/Container";
import Header from "@/components/commons/Header";

type PrayPageProps = {}

const PrayPage = async ({}: PrayPageProps) => {

  return (
    <>
      <Header />
      <Container>
        기도화면
      </Container>
      <BottomTab />
    </>
  );
};

export default PrayPage;
