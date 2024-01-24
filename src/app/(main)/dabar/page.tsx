import React from 'react';
import DabarCollectionCards from '@/components/domains/dabar/DabarCollectionCards';
import Header from '@/components/commons/Header';
import Container from '@/components/commons/Container/Container';
import BottomTab from '@/components/commons/BottomTab';
import DabarTabs from '@/components/domains/dabar/DabarTabs/DabarTabs';
import Spacer from '@/components/commons/Spacer';
import SectionHeader from '@/components/commons/SectionHeader';
import MainContainer from '@/components/commons/MainContainer/MainContainer';


const DabarPage = () => {  
  return (
    <MainContainer>
      <Header />
      <Container>
        <div>
          <Spacer className='h-4' />
          <DabarTabs />
          <SectionHeader title={'다바르 암송 카드'} />
          <DabarCollectionCards baseUrl={'/dabar/collections/'}/>
        </div>
      </Container>
      <BottomTab />
    </MainContainer>
  );
};

export default DabarPage;
