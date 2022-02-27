import request from '@/utils/request'

export function getLocation() {
  return request({
    url: '/showAddresses',
    method: 'get',
  
  })
}
//添加地址
export function addLocation(data) {
    return request({
      url: '/insertOneAddress',
      method: 'post',
    data
    })
  }
  export function delAddress(params) {
    return request({
      url: '/delOneAddress',
      method: 'get',
    params
    })
  }

