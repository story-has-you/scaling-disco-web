// @ts-ignore

/* eslint-disable */
import {request} from 'umi';

const baseUrl = '/api/menu';

/**
 * 根据当前登录用户构建菜单树
 */
export async function tree() {
  return request(baseUrl + '/tree', {
    method: 'GET',
  })
}
