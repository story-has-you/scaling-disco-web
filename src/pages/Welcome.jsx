import React from 'react';
import {PageContainer} from '@ant-design/pro-layout';
import Crud from "@/components/Crud";

const Welcome = () => {
  const params = {
    url: '/api/user',
    data: {}
  }
  return (
    <PageContainer>
      <Crud {...params}></Crud>
    </PageContainer>
  );
};

export default Welcome;
