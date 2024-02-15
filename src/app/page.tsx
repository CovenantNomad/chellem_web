import BottomTab from "@/components/commons/BottomTab";
import Container from "@/components/commons/Container/Container";
import { FeedCard, FeedCardContent, FeedCardHeader } from "@/components/commons/FeedCard";
import Header from "@/components/commons/Header";
import MainContainer from "@/components/commons/MainContainer/MainContainer";
import SectionHeader from "@/components/commons/SectionHeader";
import Spacer from "@/components/commons/Spacer";
import LinkNewNote from "@/components/domains/notes/LinkNewNote";
import TodayWorshipList from "@/components/domains/worship/TodayWorshipList";

export default async function Home() {

  return (
    <MainContainer>
      <Header />
      <Container>
        <Spacer className='h-2' />
        <LinkNewNote />
        <Spacer className='h-2' />
        <FeedCard>
          <FeedCardHeader>
            <SectionHeader title={'오늘의 예배'} date={new Date()} />
          </FeedCardHeader>
          <FeedCardContent>
            <TodayWorshipList />
            <Spacer className='h-[16px]' />
          </FeedCardContent>
        </FeedCard>
      </Container>
      <BottomTab />
    </MainContainer>
  )
}