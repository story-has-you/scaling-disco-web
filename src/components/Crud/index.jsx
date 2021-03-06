import React, {useRef} from 'react';
import {PlusOutlined} from '@ant-design/icons';
import {Button} from 'antd';
import ProTable, {TableDropdown} from '@ant-design/pro-table';
import {page, update} from '@/services/base';

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

export default (props) => {
  const actionRef = useRef();
  const headerColums = props.headerColums
  const baseUrl = props.url
  headerColums.unshift(firstColumn)
  headerColums.push(optionColumn)
  return (
    <ProTable columns={headerColums} actionRef={actionRef} cardBordered request={async (params = {}, sort, filter) => {
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
      onSave: async (rowKey, data, row) => {
        if (diff(data, row)) {
          return
        }
        await updateData({
          data: data,
          url: baseUrl
        });
      }
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
export const updateData = async params => await update(params)
/**
 * 比较两个对象是否相同
 */
export const diff = function (obj1, obj2) {
  const o1 = obj1 instanceof Object;
  const o2 = obj2 instanceof Object;
  // 判断是不是对象
  if (!o1 || !o2) {
    return obj1 === obj2;
  }

  //Object.keys() 返回一个由对象的自身可枚举属性(key值)组成的数组,
  //例如：数组返回下表：let arr = ["a", "b", "c"];console.log(Object.keys(arr))->0,1,2;
  if (Object.keys(obj1).length !== Object.keys(obj2).length) {
    return false;
  }

  for (const o in obj1) { // 遍历对象 fon in 循环 o 为 对象的属性名
    const t1 = obj1[o] instanceof Object;
    const t2 = obj2[o] instanceof Object;
    if (t1 && t2) {
      return diff(obj1[o], obj2[o]);
    } else if (obj1[o] !== obj2[o]) {
      return false;
    }
  }
  return true;
}
