'use client'

import BottomTab from "@/components/commons/BottomTab/BottomTab";
import Container from "@/components/commons/Container/Container";
import Header from "@/components/commons/Header";
import Spacer from "@/components/commons/Spacer";
import DabarHeader from "@/components/domains/dabar/DabarHeader";
import DabarMemorizedList from "@/components/domains/dabar/DabarMemorizedList";
import DabarTabs from "@/components/domains/dabar/DabarTabs/DabarTabs";

const MemorizedPage = () => {

  return (
    <>
      <Header />
      <Container>
        <Spacer className='h-4' />
        <DabarTabs />
        <DabarHeader title={'외웠던 말씀들'} />
        <DabarMemorizedList />
      </Container>
      <BottomTab />
    </>
  );
};

export default MemorizedPage;
