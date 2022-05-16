import React from 'react';
import {PageContainer} from '@ant-design/pro-layout';
import Crud from "@/components/Crud";

const Welcome = () => {
  const params = {
    url: '/api/user',
    data: {},
    headerColums: [
      {
        title: '用户名',
        dataIndex: 'username',
        ellipsis: true,
        editable: false
      },
      {
        title: '手机号',
        dataIndex: 'phone',
        ellipsis: true,
      },
      {
        title: '邮箱',
        dataIndex: 'email',
        ellipsis: true,
      },
    ]
  }
  return (
    <PageContainer>
      <Crud {...params}></Crud>
    </PageContainer>
  );
};

export default Welcome;
