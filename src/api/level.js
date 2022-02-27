import request from '@/utils/request'
//获取等级列表
export function getLevel(){
    return request({
        url:'/showLevel',
        method:'get'
    })
}
//添加等级
export function addLevel(data){
    return request({
        url:'/insertOneLevel',
        method:'post',
        data:data
    })
}
//删除等级
export function delLevel(params){
    return request({
        url:'/delOneLevel',
        method:'get',
        params
    })
}
