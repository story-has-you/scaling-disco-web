import React, {useRef} from 'react';
import {PlusOutlined} from '@ant-design/icons';
import {Button} from 'antd';
import ProTable, {TableDropdown} from '@ant-design/pro-table';
import {page} from '@/services/base';

const firstColumn = {
  dataIndex: 'index',
  valueType: 'indexBorder',
  width: 50,
}

const optionColumn = {
  title: '操作',
  valueType: 'option',
  key: 'option',
  render: (text, record, _, action) => [
    <a key="editable" onClick={() => {
      let _a;
      (_a = action === null || action === void 0 ? void 0 : action.startEditable) === null || _a === void 0 ? void 0 : _a.call(action, record.id);
    }}>
      编辑
    </a>,
    <a href={record.url} target="_blank" rel="noopener noreferrer" key="view">
      查看
    </a>,
    <TableDropdown key="actionGroup" onSelect={() => action === null || action === void 0 ? void 0 : action.reload()}
                   menus={[
                     {key: 'copy', name: '复制'},
                     {key: 'delete', name: '删除'},
                   ]}/>,
  ],
};

const columns = [
  {
    title: '用户名',
    dataIndex: 'username',
    ellipsis: true,
  },
]

export default (props) => {
  const actionRef = useRef();
  columns.unshift(firstColumn)
  columns.push(optionColumn)
  return (<ProTable columns={columns} actionRef={actionRef} cardBordered request={async (params = {}, sort, filter) => {
    const obj = Object.assign({}, props);
    if (!obj.data.current) {
      obj.data.current = 1;
      obj.data.limit = 10;
    }
    const res = await pageData(obj);
    return {
      data: res.rows,
      success: true,
      total: res.records
    }
  }} editable={{
    type: 'multiple',
  }} columnsState={{
    persistenceKey: 'pro-table-singe-demos',
    persistenceType: 'localStorage',
    onChange(value) {
      console.log('value: ', value);
    },
  }} rowKey="id" search={{
    labelWidth: 'auto',
  }} form={{
    // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
    syncToUrl: (values, type) => {
      if (type === 'get') {
        return Object.assign(Object.assign({}, values), {created_at: [values.startTime, values.endTime]});
      }
      return values;
    },
  }} pagination={{
    pageSize: 5,
    onChange: (page) => console.log(page),
  }} dateFormatter="string" headerTitle="高级表格" toolBarRender={() => [
    <Button key="button" icon={<PlusOutlined/>} type="primary">
      新建
    </Button>,
    //@ts-expect-error
  ]}/>);
};

export const pageData = async params => await page(params)
