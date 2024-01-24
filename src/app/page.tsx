import BottomTab from "@/components/commons/BottomTab";
import Container from "@/components/commons/Container/Container";
import Header from "@/components/commons/Header";
import MainContainer from "@/components/commons/MainContainer/MainContainer";

export default function Home() {

  return (
    <MainContainer>
      <Header />
      <Container>
        홈화면
      </Container>
      <BottomTab />
    </MainContainer>
  )
}