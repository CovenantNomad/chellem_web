import BottomTab from "@/components/commons/BottomTab";
import Container from "@/components/commons/Container/Container";
import Header from "@/components/commons/Header";
import Spacer from "@/components/commons/Spacer";
import DabarCollectionCards from "@/components/domains/dabar/DabarCollectionCards";
import DabarTabs from "@/components/domains/dabar/DabarTabs/DabarTabs";
import SectionHeader from "@/components/commons/SectionHeader";

type QuizMainPageProps = {}

const QuizMainPage = async ({}: QuizMainPageProps) => {

  return (
    <>
      <Header />
      <Container>
        <Spacer className='h-4' />
        <DabarTabs />
        <SectionHeader title={'다바르 암송 테스트'} />
        <DabarCollectionCards baseUrl={'/dabar/quiz/collections/'} />
      </Container>
      <BottomTab />
    </>
  );
};

export default QuizMainPage;
