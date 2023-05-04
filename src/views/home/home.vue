<template>
    <div class="home">
        <TabNav />
        <div class="banner">
            <img src="@/assets/img/home/banner.webp" alt="">
        </div>
        <HomeSearchBox :hostSugessts="suggests" />
        <HomeCategories />
        <div class="search-bar" v-if="isShowSearchBar">
            <SearchBar/>
        </div>
        <HomeContent />
    </div>
</template>

<script setup>
import TabNav from './cmpn/home-nav-banner.vue'
import HomeSearchBox from './cmpn/home-search-box.vue'
import HomeCategories from "./cmpn/home-categories.vue";
import HomeContent from './cmpn/home-content.vue'
import SearchBar from "@/components/search-bar/search-bar.vue";

import hyrequest from '@/services/request/index'
import { ref, watch, computed } from 'vue';
import useHomeStore from "@/stores/modules/home";
import { storeToRefs } from 'pinia';
import useScroll from '@/hooks/useScroll'
// import { computed } from '@vue/reactivity';
//热门建议数据获取
/* const hostSugessts = ref([])
hyrequest.get({
    url: "/home/hotSuggests"
}).then((result) => {
    hostSugessts.value = result.data
}) */

//2. 仓库中存储数据，设置单独文件夹管理请求的方法,并在仓库的action中调用此方法
const HomeStore = useHomeStore()
HomeStore.fetchSuggestsData()
const { suggests } = storeToRefs(HomeStore)


// 推荐类别数据获取
HomeStore.fetchCategotier()
const { categories } = storeToRefs(HomeStore)

//获取房子列表数据
HomeStore.fetchHouseList()
const { housList } = storeToRefs(HomeStore)

/* window.addEventListener("scroll", () => {
    const clientHeight = document.documentElement.clientHeight
    const scrollTop = document.documentElement.scrollTop
    const scrollHeight = document.documentElement.scrollHeight
    if (clientHeight + scrollTop >= scrollHeight-1) {
        HomeStore.fetchHouseList()
        // window.removeEventListener("scroll", scrollListenerHandler)
        console.log("到达底部");
    }
}) */


const { isReachBottom, scrollTop } = useScroll()
watch(isReachBottom, (newValue) => {
    if (newValue) {
        HomeStore.fetchHouseList().then(() => {
            isReachBottom.value = false
        })
    }
})

const isShowSearchBar = computed(() => {
    return scrollTop.value >= 360
})

</script>

<style lang="less" scoped>
.home {
    padding-bottom: 100px;
}

.banner {
    img {
        width: 100%;
    }
}

.search-bar {
  position: fixed;
  z-index: 9;
  top: 0;
  left: 0;
  right: 0;
  height: 45px;
  padding: 16px 16px 10px;
  background-color: #fff;
}
</style>