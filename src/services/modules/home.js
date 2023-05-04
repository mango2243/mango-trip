import hyrequest from '../request/index.js'
export function getSuggestsData() {
    return hyrequest.get({ url: "/home/hotSuggests" })
}

export function getCategories() {
    return hyrequest.get({ url: "/home/categories" })
}

export function getHouseList(currentPage) {
    return hyrequest.get({
        url: "/home/houselist",
        params: {
            page:currentPage
        }
    })
}

