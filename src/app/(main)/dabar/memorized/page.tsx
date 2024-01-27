import BottomTab from "@/components/commons/BottomTab";
import Container from "@/components/commons/Container/Container";
import Header from "@/components/commons/Header";
import Spacer from "@/components/commons/Spacer";
import DabarMemorizedList from "@/components/domains/dabar/DabarMemorizedList";
import DabarTabs from "@/components/domains/dabar/DabarTabs/DabarTabs";
import SectionHeader from "@/components/commons/SectionHeader";
import { cookies } from "next/headers";

const MemorizedPage = async () => {

  return (
    <>
      <Header />
      <Container>
        <Spacer className='h-4' />
        <DabarTabs />
        <SectionHeader title={'외웠던 말씀들'} />
        <DabarMemorizedList />
      </Container>
      <BottomTab />
    </>
  );
};

export default MemorizedPage;
