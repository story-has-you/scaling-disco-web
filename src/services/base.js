import {request} from 'umi';

/**
 * 新增
 */
export async function save(params, options) {
  return request(`${params.url}/save`, {
    method: 'POST',
    data: params.data,
    ...(options || {}),
  })
}

/**
 * 根据id删除
 */
export async function remove(params, options) {
  return request(`${params.url}/${params.id}`, {
    method: 'DELETE',
    ...(options || {}),
  })
}

/**
 * 根据id批量新增
 */
export async function removeBatch(params, options) {
  return request(`${params.url}/batch/remove`, {
    method: 'DELETE',
    params: params.data,
    ...(options || {}),
  })
}

/**
 * 更新
 */
export async function update(params, options) {
  return request(`${params.url}/update`, {
    method: 'PUT',
    data: params.data,
    ...(options || {}),
  })
}

/**
 * 根据id查询
 */
export async function get(params, options) {
  return request(`${params.url}/${params.id}`, {
    method: 'GET',
    ...(options || {}),
  })
}


/**
 * 根据id查询
 */
export async function page(params, options) {
  return request(`${params.url}/page`, {
    method: 'GET',
    params: params.data,
    ...(options || {}),
  })
}

