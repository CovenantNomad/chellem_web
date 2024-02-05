import BottomTab from "@/components/commons/BottomTab";
import CalendarStrip from "@/components/commons/CalendarStrip";
import Container from "@/components/commons/Container/Container";
import Header from "@/components/commons/Header";
import Spacer from "@/components/commons/Spacer";
import SectionHeader from "@/components/commons/SectionHeader";
import TodayWorshipList from "@/components/domains/worship/TodayWorshipList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WorshipList from "@/components/domains/worship/WorshipList";

type WorshipPageProps = {}

const WorshipPage = async ({}: WorshipPageProps) => {

  return (
    <>
      <Header />
      <Container>
        <Tabs 
          defaultValue="weekly" 
          className="h-full w-full max-w-[600px] mt-2"
        >
          <TabsList className="h-8 w-full rounded-none">
            <TabsTrigger value="weekly">이번주예배</TabsTrigger>
            <TabsTrigger value="overview">전체목록</TabsTrigger>
          </TabsList>
          <TabsContent value="weekly" className="pt-[14px] pb-[20px] px-5 mt-4 bg-white">
            <CalendarStrip />
            <Spacer className="h-4"/>
            <SectionHeader title={'예배 리스트'} />
            <TodayWorshipList />
          </TabsContent>
          <TabsContent value="overview" className="pt-[14px] pb-[20px] px-5 mt-4 bg-white">
            <WorshipList />
          </TabsContent>
        </Tabs>
      </Container>
      <BottomTab />
    </>
  );
};

export default WorshipPage;
