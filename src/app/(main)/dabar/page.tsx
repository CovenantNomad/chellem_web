import React from 'react';
import DabarCollectionCards from '@/components/domains/dabar/DabarCollectionCards';
import Header from '@/components/commons/Header';
import Container from '@/components/commons/Container/Container';
import BottomTab from '@/components/commons/BottomTab/BottomTab';
import DabarTabs from '@/components/domains/dabar/DabarTabs/DabarTabs';
import Spacer from '@/components/commons/Spacer';
import DabarHeader from '@/components/domains/dabar/DabarHeader';


const DabarPage = () => {  
  return (
    <>
      <Header />
      <Container>
        <div>
          <Spacer className='h-4' />
          <DabarTabs />
          <DabarHeader title={'다바르 암송 카드'} />
          <DabarCollectionCards baseUrl={'/dabar/collections/'}/>
        </div>
      </Container>
      <BottomTab />
    </>
  );
};

export default DabarPage;
