// @ts-ignore

/* eslint-disable */
import {request} from 'umi';

/** 获取当前的用户 GET /api/currentUser */

const baseUrl = '/api/user';

export async function currentUser(options) {
  return request(baseUrl + '/current', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 登录接口 POST /api/login/account */

export async function login(body, options) {
  return request(baseUrl + '/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
