import hyrequest from '../request/index'
//获取房子详情数据
export function getDetailList(houseId) {
    return hyrequest.get({
        url: "/detail/infos",
        params: {
            houseId
        }
    })
}