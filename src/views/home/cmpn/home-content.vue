<template>
    <div class="content">
        <div class="title">热门精选</div>
        <div class="list">
            <template v-for="item in housList">
               <!-- <h3 v-if="item.discoveryContentType===9">type-9 {{ item.data.houseName }}</h3>
               <h2 v-if="item.discoveryContentType===3">type-3 {{ item.data.houseName }}</h2> -->
                <HomeItemV3 v-if="item.discoveryContentType===3" :item-data="item.data" @click="itemClick(item.data)"/>
                <HomeItemV9 v-if="item.discoveryContentType===9" :item-data="item.data" @click="itemClick(item.data)"/>
            </template>
        </div>
    </div>
</template>

<script setup>
import useHomeStore from "@/stores/modules/home";
import HomeItemV3 from "@/components/home-item-v3/home-item-v3.vue";
import HomeItemV9 from "@/components/home-item-v9/home-item-v9.vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";

const router=useRouter()
const HomeStore = useHomeStore()
const {housList}=storeToRefs(HomeStore)
const itemClick = (item) => {
    router.push("/detail/"+item.houseId)
}
</script >

<style lang="less" scoped>
.content {
    padding: 10px;
    .title {
        font-weight: 700;
        padding: 10px;
        font-size: 18px;
    }

}
.list{
    display: flex;
    flex-wrap: wrap;
}
</style>