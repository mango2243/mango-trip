import { defineStore } from "pinia";
const nowDate = new Date()
const newDate = new Date()
newDate.setDate(nowDate.getDate() + 1)
export default defineStore("main", {
    state: () => ({
        nowDate: nowDate,
        newDate:newDate
    }),
})