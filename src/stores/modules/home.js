import { getSuggestsData, getCategories,getHouseList } from "@/services/modules/home";
import { defineStore } from "pinia";
const useHomeStore = defineStore("home", {
    state: () => ({
        suggests: [],
        categories: [],
        currentPage:1,
        housList:[]
    }),
    actions: {
        async fetchSuggestsData() {
            const res = await getSuggestsData()
            this.suggests = res.data
        },
        async fetchCategotier() {
            const res = await getCategories()
            this.categories=res.data
        },
        async fetchHouseList() {
            const res = await getHouseList(this.currentPage)
            this.housList.push(...res.data)
            this.currentPage++
        }
    }
})

export default useHomeStore