import BottomTab from "@/components/commons/BottomTab";
import CalendarStrip from "@/components/commons/CalendarStrip";
import Container from "@/components/commons/Container/Container";
import Header from "@/components/commons/Header";
import Spacer from "@/components/commons/Spacer";
import SectionHeader from "@/components/commons/SectionHeader";
import TodayWorshipList from "@/components/domains/worship/TodayWorshipList";

type WorshipPageProps = {}

const WorshipPage = async ({}: WorshipPageProps) => {

  return (
    <>
      <Header />
      <Container>
        <Spacer className="h-4"/>
        <CalendarStrip />
        <Spacer className="h-4"/>
        <SectionHeader title={'오늘의 예배'} />
        <TodayWorshipList />
      </Container>
      <BottomTab />
    </>
  );
};

export default WorshipPage;
