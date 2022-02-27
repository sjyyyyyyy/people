import request from '@/utils/request'

export function getMessage() {
  return request({
    url: '/showMessage',
    method: 'get',

  })
}

export function searchInfo(data) {
  return request({
    url: '/searchaddressid',
    method: 'post',
    data
  })
}
//添加信息
export function addInfo(data) {
  return request({
    url: '/insertAllMessage',
    method: 'post',
    data
  })
}
export function showInfo(params) {
  return request({
    url: '/showOneMessage',
    method: 'get',
    params
  })
}
export function updateInfo(data) {
  return request({
    url: '/updateMessage',
    method: 'post',
    data
  })
}
export function delInfo(params) {
  return request({
    url: '/delOneMessage',
    method: 'get',
    params
  })
}