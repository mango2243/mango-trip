import hyrequest from '../request/index'
//获取城市数据
export function getCityAll() {
    return hyrequest.get({ url: "/city/all" })
}