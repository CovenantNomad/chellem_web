import React from 'react';
import DabarCollectionCards from '@/components/domains/dabar/DabarCollectionCards';

const DabarPage = () => {  
  return (
    <div>
      <div className='pt-4 pb-2 my-2'>
        <h2 className='text-xl'>다바르 암송카드</h2>
      </div>
      <DabarCollectionCards baseUrl={'/dabar/collections/'}/>
    </div>
  );
};

export default DabarPage;
