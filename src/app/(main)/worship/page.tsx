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
          className="h-full w-full max-w-[600px]"
        >
          <div className="flex justify-center bg-white py-2">
            <TabsList className="bg-muted rounded-[20px] p-1">
              <TabsTrigger value="weekly" className="rounded-[20px]">이번주예배</TabsTrigger>
              <TabsTrigger value="overview" className="rounded-[20px]">전체목록</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="weekly" className="pt-[14px] pb-[20px] px-5 -mt-2 bg-white">
            <Spacer className="h-2"/>
            <CalendarStrip />
            <Spacer className="h-4"/>
            <SectionHeader title={'예배 리스트'} />
            <div className="h-[calc(100vh-256px)]">
              <TodayWorshipList />
            </div>
          </TabsContent>
          <TabsContent value="overview" className="pt-[14px] pb-[20px] px-5 -mt-2 bg-white">
            <Spacer className="h-2"/>
            <WorshipList />
          </TabsContent>
        </Tabs>
      </Container>
      <BottomTab />
    </>
  );
};

export default WorshipPage;
